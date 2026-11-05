/**
 * Host half of the sticky-notes bundle.
 *
 * Serves the notes JSON and the locally stored note images under the Web
 * carrier, so the browser wall has durable storage that survives a changed
 * port or a restarted app. The Client half falls back to localStorage when the
 * notes route is unavailable.
 */
import { createHash } from 'node:crypto';
import {
  chmod,
  copyFile,
  mkdir,
  readFile,
  readdir,
  rename,
  stat,
  unlink,
  writeFile,
} from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';

const ROUTE_PATH = '/sticky-notes/api';
const NOTES_PATH = `${ROUTE_PATH}/notes`;
const IMAGES_PATH = `${ROUTE_PATH}/images`;
const COLORS = new Set(['sun', 'mint', 'sky', 'peach', 'lilac']);
const IMAGE_TYPES = new Map([
  ['image/png', 'png'],
  ['image/jpeg', 'jpg'],
  ['image/webp', 'webp'],
  ['image/gif', 'gif'],
]);
const IMAGE_EXT_TYPES = new Map([
  ['png', 'image/png'],
  ['jpg', 'image/jpeg'],
  ['webp', 'image/webp'],
  ['gif', 'image/gif'],
]);
const IMAGE_NAME = /^([a-f0-9]{64})\.(png|jpg|webp|gif)$/;
const IMAGE_ID = /^[a-f0-9]{64}$/;
const SESSION_ID = /^[A-Za-z0-9._:-]{1,128}$/;
const MAX_NOTES = 500;
const MAX_TEXT = 4000;
const MAX_IMAGES = 6;
const MAX_SESSIONS = 8;
const MAX_BODY = 8 * 1024 * 1024;
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const ORPHAN_AGE_MS = 24 * 60 * 60 * 1000;
const BACKUP_LIMIT = 20;
const DIRECTORY_MODE = 0o700;
const FILE_MODE = 0o600;

function storeDir() {
  const home = process.env.DSH_HOME || join(homedir(), '.dsh');
  return join(home, 'storages', 'sticky-notes');
}

function storeFile() {
  return join(storeDir(), 'notes.json');
}

function imagesDir() {
  return join(storeDir(), 'images');
}

function backupsDir() {
  return join(storeDir(), 'backups');
}

/**
 * Deleted and pruned images are moved here instead of being unlinked, so the
 * live images/ directory plus notes backups plus this trash form the recovery
 * set. The wall never serves files from this directory.
 */
function trashDir() {
  return join(backupsDir(), 'images-trash');
}

function backupName() {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `notes-${stamp}-${process.pid}-${Math.random().toString(36).slice(2, 6)}.json`;
}

function trashName(name) {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const random = Math.random().toString(36).slice(2, 8);
  return `${stamp}-${process.pid}-${random}-${name}`;
}

async function fileExists(file) {
  try {
    await stat(file);
    return true;
  } catch (error) {
    if (error && error.code === 'ENOENT') return false;
    throw error;
  }
}

/** Move one stored image into backups/images-trash without deleting its bytes. */
async function moveImageToTrash(name) {
  const source = join(imagesDir(), name);
  const directory = trashDir();
  await mkdir(directory, { recursive: true, mode: DIRECTORY_MODE });
  const target = join(directory, trashName(name));
  try {
    await rename(source, target);
  } catch (error) {
    if (!error || error.code !== 'EXDEV') throw error;
    // Different filesystem: fall back to a copy, then drop the live file.
    await copyFile(source, target);
    try {
      await chmod(target, FILE_MODE);
    } catch {
      // The copy is still usable even if its mode cannot be tightened.
    }
    await unlink(source);
  }
  return target;
}

/** Keep the newest backups; pruning failures must not block a save. */
async function pruneBackups() {
  const directory = backupsDir();
  let names;
  try {
    names = await readdir(directory);
  } catch {
    return;
  }
  const files = [];
  for (const name of names) {
    if (!name.startsWith('notes-') || !name.endsWith('.json')) continue;
    try {
      const info = await stat(join(directory, name));
      files.push({ name, mtime: info.mtimeMs });
    } catch {
      // A file removed between readdir and stat is already gone.
    }
  }
  files.sort((left, right) => right.mtime - left.mtime);
  await Promise.all(
    files.slice(BACKUP_LIMIT).map(({ name }) =>
      unlink(join(directory, name)).catch(() => {}),
    ),
  );
}

/**
 * Copy the current notes file before replacing it. A failed backup aborts the
 * write so a save can never overwrite the only copy of the wall.
 */
async function backupNotes() {
  const file = storeFile();
  const directory = backupsDir();
  await mkdir(directory, { recursive: true, mode: DIRECTORY_MODE });
  const target = join(directory, backupName());
  try {
    await copyFile(file, target);
  } catch (error) {
    if (error && error.code === 'ENOENT') return;
    throw error;
  }
  try {
    await chmod(target, FILE_MODE);
  } catch {
    // A backup that cannot be tightened is still better than no backup.
  }
  await pruneBackups();
}

function normalizeImage(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const id = typeof raw.id === 'string' ? raw.id : '';
  const mime = typeof raw.mime === 'string' ? raw.mime : '';
  if (!IMAGE_ID.test(id) || !IMAGE_TYPES.has(mime)) return null;
  return { id, mime };
}

function normalizeImages(input) {
  if (!Array.isArray(input)) return [];
  const images = [];
  const seen = new Set();
  for (const raw of input) {
    if (images.length >= MAX_IMAGES) break;
    const image = normalizeImage(raw);
    if (!image || seen.has(image.id)) continue;
    seen.add(image.id);
    images.push(image);
  }
  return images;
}

function normalizeSessions(input) {
  if (!Array.isArray(input)) return [];
  const sessions = [];
  const seen = new Set();
  for (const raw of input) {
    if (sessions.length >= MAX_SESSIONS) break;
    if (!raw || typeof raw !== 'object') continue;
    const id = typeof raw.id === 'string' ? raw.id : '';
    if (!SESSION_ID.test(id) || seen.has(id)) continue;
    seen.add(id);
    const title =
      typeof raw.title === 'string'
        ? raw.title.replace(/\s+/g, ' ').trim().slice(0, 200)
        : '';
    sessions.push({ id, title });
  }
  return sessions;
}

function normalizeNotes(input) {
  if (!Array.isArray(input)) return [];
  const notes = [];
  const seen = new Set();
  for (const raw of input.slice(0, MAX_NOTES)) {
    if (!raw || typeof raw !== 'object') continue;
    const text =
      typeof raw.text === 'string'
        ? raw.text.replace(/\r\n/g, '\n').trim().slice(0, MAX_TEXT)
        : '';
    const images = normalizeImages(raw.images);
    const sessions = normalizeSessions(raw.sessions);
    if (!text && images.length === 0) continue;
    let id =
      typeof raw.id === 'string' && /^[A-Za-z0-9._-]{1,80}$/.test(raw.id) ? raw.id : '';
    if (!id || seen.has(id)) {
      id = `note-${seen.size + 1}-${Date.now().toString(36)}`;
    }
    seen.add(id);
    const createdAt = Number.isFinite(raw.createdAt) ? raw.createdAt : Date.now();
    const updatedAt = Number.isFinite(raw.updatedAt) ? raw.updatedAt : createdAt;
    notes.push({
      id,
      text,
      color: COLORS.has(raw.color) ? raw.color : 'sun',
      done: raw.done === true,
      createdAt,
      updatedAt,
      images,
      sessions,
    });
  }
  return notes;
}

async function readWall() {
  const file = storeFile();
  let text;
  try {
    text = await readFile(file, 'utf8');
  } catch (error) {
    if (error && error.code === 'ENOENT') return { version: 1, notes: [], updatedAt: 0 };
    throw error;
  }
  try {
    const parsed = JSON.parse(text);
    return {
      version: 1,
      notes: normalizeNotes(parsed && parsed.notes),
      updatedAt: Number.isFinite(parsed && parsed.updatedAt) ? parsed.updatedAt : 0,
    };
  } catch (error) {
    // Keep a recoverable copy instead of silently discarding the old file.
    const backup = `${file}.corrupt-${Date.now()}`;
    try {
      await rename(file, backup);
    } catch {
      // A failed backup must not hide the read error from the client.
    }
    console.warn('[sticky-notes] could not parse notes file; moved it aside:', backup);
    return { version: 1, notes: [], updatedAt: 0 };
  }
}

async function cleanupNotesTemps() {
  let names;
  try {
    names = await readdir(storeDir());
  } catch {
    return;
  }
  const cutoff = Date.now() - 60 * 60 * 1000;
  await Promise.all(
    names.map(async (name) => {
      if (!name.startsWith('notes.json.') || !name.endsWith('.tmp')) return;
      const file = join(storeDir(), name);
      try {
        const info = await stat(file);
        if (info.mtimeMs <= cutoff) await unlink(file);
      } catch {
        // A missing or concurrently removed temp file needs no action.
      }
    }),
  );
}

async function writeWall(notes) {
  const file = storeFile();
  await mkdir(dirname(file), { recursive: true, mode: DIRECTORY_MODE });
  await cleanupNotesTemps().catch(() => {});
  await backupNotes();
  const updatedAt = Date.now();
  const payload = JSON.stringify({ version: 1, notes, updatedAt }, null, 2);
  const temporary = `${file}.${process.pid}.${updatedAt}.${Math.random()
    .toString(36)
    .slice(2, 8)}.tmp`;
  await writeFile(temporary, payload, { encoding: 'utf8', mode: FILE_MODE });
  await rename(temporary, file);
  return { version: 1, notes, updatedAt };
}

let writeQueue = Promise.resolve();

/** Serialize writes so two quick saves cannot rename their temp files out of order. */
function queueWrite(notes) {
  const next = writeQueue.then(() => writeWall(notes));
  writeQueue = next.catch(() => {});
  return next;
}

function send(res, status, payload) {
  if (res.headersSent) {
    res.end();
    return;
  }
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(body),
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
  });
  res.end(body);
}

function sameOrigin(req) {
  const origin = req.headers.origin;
  if (origin === undefined) return true;
  // A sandboxed or file:// document sends the opaque origin "null"; this route
  // only serves the local GUI, so accepting it keeps desktop packaging working.
  if (origin === 'null') return true;
  try {
    return new URL(origin).host === req.headers.host;
  } catch {
    return false;
  }
}

async function readRawBody(req, limit) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limit) {
      const error = new Error('request body too large');
      error.code = 'ETOOLARGE';
      throw error;
    }
    chunks.push(chunk);
  }
  return chunks.length === 0 ? Buffer.alloc(0) : Buffer.concat(chunks);
}

async function readBody(req) {
  const body = await readRawBody(req, MAX_BODY);
  if (body.length === 0) return undefined;
  return JSON.parse(body.toString('utf8'));
}

function detectImageMime(buffer) {
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return 'image/png';
  }
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'image/jpeg';
  }
  if (buffer.length >= 6) {
    const header = buffer.toString('ascii', 0, 6);
    if (header === 'GIF87a' || header === 'GIF89a') return 'image/gif';
  }
  if (
    buffer.length >= 12 &&
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) {
    return 'image/webp';
  }
  return undefined;
}

async function uploadImage(req, res) {
  const declared = String(req.headers['content-type'] || '')
    .split(';')[0]
    .trim()
    .toLowerCase();
  if (!IMAGE_TYPES.has(declared)) {
    send(res, 415, { error: 'unsupported-image-type' });
    return;
  }
  let body;
  try {
    body = await readRawBody(req, MAX_IMAGE_BYTES);
  } catch (error) {
    if (error && error.code === 'ETOOLARGE') {
      send(res, 413, { error: 'image-too-large' });
      return;
    }
    throw error;
  }
  if (body.length === 0) {
    send(res, 400, { error: 'empty-image' });
    return;
  }
  const detected = detectImageMime(body);
  if (detected !== declared) {
    send(res, 415, { error: 'image-type-mismatch' });
    return;
  }
  const id = createHash('sha256').update(body).digest('hex');
  const extension = IMAGE_TYPES.get(detected);
  const directory = imagesDir();
  await mkdir(directory, { recursive: true, mode: DIRECTORY_MODE });
  const file = join(directory, `${id}.${extension}`);
  const temporary = join(
    directory,
    `.upload-${id}-${process.pid}-${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2, 8)}.tmp`,
  );
  // Write the bytes fully before publishing them under the content-addressed
  // name, so a crash can never leave a truncated image behind.
  await writeFile(temporary, body, { flag: 'wx', mode: FILE_MODE });
  try {
    if (!(await fileExists(file))) {
      try {
        await rename(temporary, file);
      } catch (error) {
        // Another upload of the same bytes may have won the race; keep its file.
        if (!error || (error.code !== 'EEXIST' && error.code !== 'EPERM')) throw error;
        if (!(await fileExists(file))) throw error;
      }
    }
  } finally {
    await unlink(temporary).catch(() => {});
  }
  send(res, 200, { id, mime: detected });
}

async function serveImage(res, filename) {
  const match = IMAGE_NAME.exec(filename);
  if (!match) {
    send(res, 404, { error: 'not-found' });
    return;
  }
  let data;
  try {
    data = await readFile(join(imagesDir(), filename));
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      send(res, 404, { error: 'not-found' });
      return;
    }
    throw error;
  }
  res.writeHead(200, {
    'content-type': IMAGE_EXT_TYPES.get(match[2]) || 'application/octet-stream',
    'content-length': data.length,
    'cache-control': 'public, max-age=31536000, immutable',
    'x-content-type-options': 'nosniff',
  });
  res.end(data);
}

async function deleteImage(res, id) {
  if (!IMAGE_ID.test(id)) {
    send(res, 400, { error: 'invalid-image-id' });
    return;
  }
  const wall = await readWall();
  const inUse = wall.notes.some((note) =>
    note.images.some((image) => image.id === id),
  );
  if (inUse) {
    send(res, 409, { error: 'image-in-use' });
    return;
  }
  let deleted = 0;
  for (const extension of IMAGE_TYPES.values()) {
    const name = `${id}.${extension}`;
    try {
      await stat(join(imagesDir(), name));
    } catch (error) {
      if (error && error.code === 'ENOENT') continue;
      throw error;
    }
    try {
      await moveImageToTrash(name);
      deleted += 1;
    } catch (error) {
      // A concurrent delete or orphan prune already moved it away.
      if (error && error.code === 'ENOENT') continue;
      throw error;
    }
  }
  send(res, 200, { deleted });
}

/** Move abandoned uploads to the image trash; images of a deleted note are removed explicitly. */
async function cleanupOrphans(notes) {
  const referenced = new Set();
  for (const note of notes) {
    for (const image of note.images) referenced.add(image.id);
  }
  let names;
  try {
    names = await readdir(imagesDir());
  } catch (error) {
    if (error && error.code === 'ENOENT') return;
    throw error;
  }
  const cutoff = Date.now() - ORPHAN_AGE_MS;
  const tempCutoff = Date.now() - 60 * 60 * 1000;
  await Promise.all(
    names.map(async (name) => {
      if (name.startsWith('.upload-') && name.endsWith('.tmp')) {
        const file = join(imagesDir(), name);
        try {
          const info = await stat(file);
          if (info.mtimeMs <= tempCutoff) await unlink(file);
        } catch {
          // A missing or concurrently removed temp file needs no action.
        }
        return;
      }
      const match = IMAGE_NAME.exec(name);
      if (!match || referenced.has(match[1])) return;
      const file = join(imagesDir(), name);
      try {
        const info = await stat(file);
        if (info.mtimeMs <= cutoff) await moveImageToTrash(name);
      } catch (error) {
        if (!error || error.code !== 'ENOENT') {
          console.warn('[sticky-notes] could not move orphaned image to trash:', file, error);
        }
      }
    }),
  );
}

async function handle(req, res) {
  const url = new URL(req.url || '/', 'http://localhost');
  if (!sameOrigin(req)) {
    send(res, 403, { error: 'forbidden' });
    return;
  }

  if (url.pathname === NOTES_PATH) {
    if (req.method === 'GET') {
      send(res, 200, await readWall());
      return;
    }
    if (req.method === 'PUT') {
      const contentType = String(req.headers['content-type'] || '');
      if (!contentType.toLowerCase().includes('application/json')) {
        send(res, 415, { error: 'unsupported-media-type' });
        return;
      }
      let body;
      try {
        body = await readBody(req);
      } catch {
        send(res, 400, { error: 'invalid-body' });
        return;
      }
      if (!body || !Array.isArray(body.notes)) {
        send(res, 400, { error: 'invalid-payload' });
        return;
      }
      const notes = normalizeNotes(body.notes);
      send(res, 200, await queueWrite(notes));
      cleanupOrphans(notes).catch((error) =>
        console.warn('[sticky-notes] orphan cleanup failed:', error),
      );
      return;
    }
    res.setHeader('allow', 'GET, PUT');
    send(res, 405, { error: 'method-not-allowed' });
    return;
  }

  if (url.pathname === IMAGES_PATH) {
    if (req.method === 'POST') {
      await uploadImage(req, res);
      return;
    }
    res.setHeader('allow', 'POST');
    send(res, 405, { error: 'method-not-allowed' });
    return;
  }

  if (url.pathname.startsWith(`${IMAGES_PATH}/`)) {
    const name = url.pathname.slice(IMAGES_PATH.length + 1);
    if (req.method === 'GET') {
      await serveImage(res, name);
      return;
    }
    if (req.method === 'DELETE') {
      await deleteImage(res, name);
      return;
    }
    res.setHeader('allow', 'GET, DELETE');
    send(res, 405, { error: 'method-not-allowed' });
    return;
  }

  send(res, 404, { error: 'not-found' });
}

/** Register the notes and image routes whenever this composition has a Web carrier. */
export function apply(ctx) {
  ctx.inject(['webServer'], (scoped) => {
    scoped.effect(() =>
      scoped.webServer.register({
        kind: 'prefix',
        path: ROUTE_PATH,
        handler: async (req, res) => {
          try {
            await handle(req, res);
          } catch (error) {
            console.error('[sticky-notes] request failed:', error);
            send(res, 500, { error: 'storage-failure' });
          }
        },
      }),
    );
  });
}
