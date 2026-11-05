window.__ModuleLoader__.load({
  id: '@local/sticky-notes',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'sticky-notes';
    const PANEL_ID = 'sticky-notes';
    const API = '/sticky-notes/api/notes';
    const IMAGES_API = '/sticky-notes/api/images';
    const LOCAL_KEY = 'dsh.sticky-notes.v1';
    const LOCALES = ['en', 'en-US', 'zh', 'zh-CN'];
    const COLORS = ['sun', 'mint', 'sky', 'peach', 'lilac'];
    const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
    const IMAGE_EXT = {
      'image/png': 'png',
      'image/jpeg': 'jpg',
      'image/webp': 'webp',
      'image/gif': 'gif',
    };
    const IMAGE_ID = /^[a-f0-9]{64}$/;
    const SESSION_ID = /^[A-Za-z0-9._:-]{1,128}$/;
    const MAX_TEXT = 4000;
    const MAX_IMAGES = 6;
    const MAX_SESSIONS = 8;
    const MAX_SESSION_ROWS = 100;
    const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

    const DICTS = {
      en: {
        'panel.label': 'Sticky notes',
        title: 'Sticky notes',
        subtitle: 'Jot down anything you need to do. It stays on this machine.',
        'view.label': 'Notes',
        'session.viewSubtitle':
          'Only notes linked to “{title}”. New notes are linked to this session automatically.',
        'session.fixedHint': 'New notes are linked to this session automatically.',
        'empty.sessionTitle': 'No notes for this session',
        'empty.sessionBody':
          'Add the first note above — it will be linked to this session automatically.',
        'composer.placeholder': 'What do you need to do?',
        'composer.hint': 'Enter to add · Shift+Enter for a new line · paste images directly',
        'action.add': 'Add note',
        'action.edit': 'Edit note',
        'action.delete': 'Delete note',
        'action.save': 'Save',
        'action.cancel': 'Cancel',
        'action.attach': 'Add image',
        'image.uploading': 'Uploading…',
        'image.remove': 'Remove image',
        'image.view': 'View image',
        'image.close': 'Close image',
        'image.alt': 'Attached image',
        'image.note': 'Image note',
        'image.error.type': 'Only PNG, JPEG, WebP, or GIF images are supported.',
        'image.error.size': 'That image is too large (max 8 MB).',
        'image.error.upload': 'Could not upload the image.',
        'image.error.limit': 'Up to {count} images per note.',
        'color.label': 'Note color',
        'color.sun': 'Yellow',
        'color.mint': 'Green',
        'color.sky': 'Blue',
        'color.peach': 'Orange',
        'color.lilac': 'Purple',
        'filter.all': 'All',
        'filter.open': 'To do',
        'filter.done': 'Done',
        'count.one': '1 note',
        'count.other': '{count} notes',
        'empty.title': 'The wall is empty',
        'empty.body': 'Add your first note above — it will be here whenever you come back.',
        'empty.openTitle': 'Nothing left to do',
        'empty.openBody': 'Every note on the wall is checked off. Add another when something comes up.',
        'empty.doneTitle': 'No finished notes yet',
        'empty.doneBody': 'Check a note off and it will show up here.',
        'status.loading': 'Loading notes…',
        'status.ready': 'Synced',
        'status.saving': 'Saving…',
        'status.saved': 'Saved',
        'status.local': 'This browser only',
        'status.readyLocal': 'This browser only',
        'error.load': 'Could not reach the notes file; showing this browser’s copy.',
        'error.save': 'Could not save to the notes file; this change is kept in this browser.',
        footnote: 'Notes save automatically and are here when you return.',
        'time.justNow': 'just now',
        'time.minutes': '{count} min ago',
        'time.hours': '{count} h ago',
        'time.days': '{count} d ago',
        'aria.markDone': 'Mark “{text}” as done',
        'aria.markOpen': 'Mark “{text}” as to do',
        'aria.noteActions': 'Actions for “{text}”',
        'note.move': 'Drag to reorder (arrow keys also work)',
        'note.reorderHint': 'Drag the grip on a note to reorder',
        'session.bind': 'Bind sessions',
        'session.bindHint': 'Bind one or more sessions. Click a session chip on the note to open it.',
        'session.search': 'Search sessions by title or ID',
        'session.untitled': 'Untitled session',
        'session.loading': 'Loading sessions…',
        'session.empty': 'No sessions available to bind.',
        'session.noMatch': 'No sessions match your search.',
        'session.selectedCount': '{count}/{max} selected',
        'session.open': 'Open “{title}”',
        'session.unbind': 'Remove session',
        'session.error.open': 'Could not open that session.',
        'session.tooManyRows': 'Showing the first {count} sessions; type to narrow the list.',
        'session.done': 'Done',
        'editor.placeholder': 'Edit this note…',
      },
      zh: {
        'panel.label': '便签墙',
        title: '便签墙',
        subtitle: '随手记下要做的事，便签会保存在这台机器上。',
        'view.label': '便签',
        'session.viewSubtitle': '只显示关联到「{title}」的便签，新建便签会自动绑定这个会话。',
        'session.fixedHint': '新便签会自动绑定这个会话',
        'empty.sessionTitle': '这个会话还没有便签',
        'empty.sessionBody': '在上方记下第一件要做的事，新便签会自动绑定到当前会话。',
        'composer.placeholder': '记下要做的事…',
        'composer.hint': 'Enter 添加 · Shift+Enter 换行 · 可直接粘贴图片',
        'action.add': '添加便签',
        'action.edit': '编辑便签',
        'action.delete': '删除便签',
        'action.save': '保存',
        'action.cancel': '取消',
        'action.attach': '添加图片',
        'image.uploading': '上传中…',
        'image.remove': '移除图片',
        'image.view': '查看图片',
        'image.close': '关闭图片',
        'image.alt': '便签图片',
        'image.note': '图片便签',
        'image.error.type': '仅支持 PNG、JPEG、WebP 或 GIF 图片。',
        'image.error.size': '图片太大（最大 8 MB）。',
        'image.error.upload': '图片上传失败。',
        'image.error.limit': '每条便签最多 {count} 张图片。',
        'color.label': '便签颜色',
        'color.sun': '黄色',
        'color.mint': '绿色',
        'color.sky': '蓝色',
        'color.peach': '橙色',
        'color.lilac': '紫色',
        'filter.all': '全部',
        'filter.open': '待办',
        'filter.done': '已完成',
        'count.one': '1 条便签',
        'count.other': '{count} 条便签',
        'empty.title': '墙上还是空的',
        'empty.body': '在上方记下第一件要做的事，之后随时回来查看。',
        'empty.openTitle': '待办都清空了',
        'empty.openBody': '墙上的便签都已完成。有新的事情时，再贴一张就好。',
        'empty.doneTitle': '还没有完成的便签',
        'empty.doneBody': '把一条便签标记为完成后，它会出现在这里。',
        'status.loading': '正在读取便签…',
        'status.ready': '已同步',
        'status.saving': '保存中…',
        'status.saved': '已保存',
        'status.local': '仅保存在当前浏览器',
        'status.readyLocal': '仅保存在当前浏览器',
        'error.load': '无法读取便签文件，已显示当前浏览器里的副本。',
        'error.save': '无法写入便签文件，这次修改暂存在当前浏览器中。',
        footnote: '便签会自动保存，下次打开时仍然在。',
        'time.justNow': '刚刚',
        'time.minutes': '{count} 分钟前',
        'time.hours': '{count} 小时前',
        'time.days': '{count} 天前',
        'aria.markDone': '将「{text}」标记为完成',
        'aria.markOpen': '将「{text}」标记为待办',
        'aria.noteActions': '「{text}」的操作',
        'note.move': '拖动排序（也可用方向键）',
        'note.reorderHint': '拖动便签上的手柄可以排序',
        'session.bind': '绑定会话',
        'session.bindHint': '可以绑定一个或多个会话；点击便签上的会话标签即可打开。',
        'session.search': '搜索会话标题或 ID',
        'session.untitled': '未命名会话',
        'session.loading': '正在读取会话…',
        'session.empty': '没有可绑定的会话。',
        'session.noMatch': '没有匹配的会话。',
        'session.selectedCount': '已选 {count}/{max}',
        'session.open': '打开「{title}」',
        'session.unbind': '移除会话',
        'session.error.open': '无法打开该会话。',
        'session.tooManyRows': '先显示前 {count} 个会话，输入搜索可缩小范围。',
        'session.done': '完成',
        'editor.placeholder': '修改这条便签…',
      },
    };

    const CSS = [
      '.dsn-root{box-sizing:border-box;display:flex;flex-direction:column;width:100%;height:100%;min-height:0;overflow:hidden;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-size:14px;line-height:22px}',
      '.dsn-scroll{flex:1;min-height:0;overflow-y:auto;scrollbar-gutter:stable;--dsh-scrollbar-width:9px;--dsh-scrollbar-thumb-border:2px}',
      '.dsn-inner{box-sizing:border-box;max-width:1060px;margin:0 auto;padding:30px clamp(20px,4vw,46px) 72px}',
      '[data-platform="darwin"] .dsn-inner{padding-top:calc(30px + var(--dsh-frame-top-clearance,0px))}',
      '[data-platform="darwin"] .dsn-root--embedded .dsn-inner{padding-top:30px}',
      '.dsn-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin:0 0 18px}',
      '.dsn-heading{min-width:0}',
      '.dsn-title{margin:0;font-size:22px;line-height:30px;font-weight:600;letter-spacing:-.01em}',
      '.dsn-sub{margin:4px 0 0;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px}',
      '.dsn-count{flex:none;display:inline-flex;align-items:center;height:26px;padding:0 10px;border:.5px solid var(--dsw-alias-border-l1);border-radius:999px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px;font-variant-numeric:tabular-nums;white-space:nowrap}',
      '.dsn-composer{box-sizing:border-box;display:flex;flex-direction:column;gap:10px;padding:14px 16px 12px;border:.5px solid var(--dsw-alias-border-l1);border-radius:18px;background:var(--dsw-alias-bg-layer-1);transition:border-color .15s ease}',
      '.dsn-composer:focus-within{border-color:var(--dsw-alias-state-business-primary,var(--dsw-alias-brand-primary))}',
      '.dsn-input{box-sizing:border-box;width:100%;min-height:50px;max-height:180px;padding:0;border:0;outline:0;resize:none;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:15px;line-height:24px}',
      '.dsn-input::placeholder{color:var(--dsw-alias-label-caption,var(--dsw-alias-label-tertiary))}',
      '.dsn-composer-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}',
      '.dsn-swatches{display:flex;align-items:center;gap:6px}',
      '.dsn-swatch{position:relative;flex:none;width:22px;height:22px;padding:0;border:1px solid var(--dsw-alias-border-l2);border-radius:50%;cursor:pointer;appearance:none}',
      '.dsn-swatch:hover{transform:scale(1.08)}',
      '.dsn-swatch[aria-pressed="true"]{outline:2px solid var(--dsw-alias-label-primary);outline-offset:2px}',
      '.dsn-fill--sun{background:#ffe98a}',
      '.dsn-fill--mint{background:#bfe8c8}',
      '.dsn-fill--sky{background:#cfe4ff}',
      '.dsn-fill--peach{background:#ffd2b0}',
      '.dsn-fill--lilac{background:#e3d2ff}',
      '.dsn-composer-right{display:flex;align-items:center;gap:12px;margin-left:auto}',
      '.dsn-hint{color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px;white-space:nowrap}',
      '.dsn-add{display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 14px;border:0;border-radius:16px;background:var(--dsw-alias-button-primary-fill,var(--dsw-alias-brand-primary));color:var(--dsw-alias-label-primary-inverted,#fff);font:inherit;font-size:13px;font-weight:500;line-height:20px;cursor:pointer;appearance:none}',
      '.dsn-add:hover:not(:disabled){background:var(--dsw-alias-button-primary-hover,var(--dsw-alias-brand-primary))}',
      '.dsn-add:disabled{opacity:.4;cursor:default}',
      '.dsn-banner{display:flex;align-items:flex-start;gap:8px;margin:18px 0 0;padding:10px 12px;border:.5px solid var(--dsw-alias-border-l1);border-radius:12px;background:var(--dsw-alias-state-warn-tertiary,var(--dsw-alias-bg-layer-1));color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px}',
      '.dsn-banner svg{flex:none;margin-top:2px;color:var(--dsw-alias-state-warn-primary)}',
      '.dsn-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin:26px 0 14px}',
      '.dsn-tabs{display:inline-flex;align-items:center;gap:2px;padding:3px;border:.5px solid var(--dsw-alias-border-l1);border-radius:999px;background:var(--dsw-alias-bg-layer-1)}',
      '.dsn-tab{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 12px;border:0;border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:13px;line-height:20px;cursor:pointer;appearance:none}',
      '.dsn-tab:hover{color:var(--dsw-alias-label-primary)}',
      '.dsn-tab[aria-pressed="true"]{background:var(--dsw-alias-interactive-bg-active,var(--dsw-alias-bg-base));color:var(--dsw-alias-label-primary)}',
      '.dsn-tab-count{color:var(--dsw-alias-label-tertiary);font-size:11px;font-variant-numeric:tabular-nums}',
      '.dsn-tab[aria-pressed="true"] .dsn-tab-count{color:var(--dsw-alias-label-secondary)}',
      '.dsn-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(214px,1fr));gap:16px;align-items:start}',
      '.dsn-note{position:relative;display:flex;flex-direction:column;gap:10px;box-sizing:border-box;min-height:164px;padding:22px 14px 12px;border-radius:3px 3px 7px 7px;color:#3b3320;box-shadow:0 1px 1px rgba(60,50,20,.10),0 10px 18px -14px rgba(60,50,20,.55)}',
      '.dsn-note::before{content:"";position:absolute;top:-7px;left:50%;width:64px;height:17px;transform:translateX(-50%) rotate(-1.5deg);border-radius:1px;background:rgba(255,255,255,.52);box-shadow:0 1px 1px rgba(60,50,20,.06)}',
      '.dsn-note--sun{background:#ffe98a}',
      '.dsn-note--mint{background:#bfe8c8}',
      '.dsn-note--sky{background:#cfe4ff}',
      '.dsn-note--peach{background:#ffd2b0}',
      '.dsn-note--lilac{background:#e3d2ff}',
      '.dsn-note[data-done="true"]{opacity:.74}',
      '.dsn-note[data-done="true"] .dsn-note-text{text-decoration:line-through;text-decoration-thickness:1.5px;text-decoration-color:rgba(59,51,32,.55)}',
      '.dsn-note-head{display:flex;align-items:center;gap:8px;min-height:20px}',
      '.dsn-check{display:grid;place-items:center;flex:none;width:20px;height:20px;padding:0;border:1.5px solid rgba(59,51,32,.38);border-radius:50%;background:transparent;color:#fff8dc;cursor:pointer;appearance:none;transition:background-color .12s ease,border-color .12s ease}',
      '.dsn-check:hover{border-color:rgba(59,51,32,.7)}',
      '.dsn-check[aria-checked="true"]{border-color:transparent;background:rgba(59,51,32,.82)}',
      '.dsn-note-time{color:rgba(59,51,32,.58);font-size:11px;line-height:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.dsn-note-actions{display:flex;align-items:center;gap:1px;margin-left:auto;opacity:0;transition:opacity .12s ease}',
      '.dsn-note:hover .dsn-note-actions,.dsn-note:focus-within .dsn-note-actions{opacity:1}',
      '.dsn-icon-btn{display:grid;place-items:center;flex:none;width:24px;height:24px;padding:0;border:0;border-radius:6px;background:transparent;color:rgba(59,51,32,.6);cursor:pointer;appearance:none}',
      '.dsn-icon-btn:hover{background:rgba(59,51,32,.1);color:#3b3320}',
      '.dsn-note-text{flex:1;margin:0;font-size:14px;line-height:21px;white-space:pre-wrap;overflow-wrap:anywhere}',
      '.dsn-note-editor{display:flex;flex-direction:column;gap:8px}',
      '.dsn-composer-left{display:flex;align-items:center;gap:8px;flex-wrap:wrap;min-width:0}',
      '.dsn-attach{display:grid;place-items:center;flex:none;width:28px;height:28px;padding:0;border:.5px solid var(--dsw-alias-border-l1);border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;appearance:none}',
      '.dsn-attach:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}',
      '.dsn-attach:disabled{opacity:.4;cursor:default}',
      '.dsn-attachments{display:flex;flex-wrap:wrap;align-items:center;gap:8px}',
      '.dsn-attachment{position:relative;flex:none;width:64px;height:64px;border:.5px solid var(--dsw-alias-border-l1);border-radius:8px;overflow:hidden;background:var(--dsw-alias-bg-layer-2)}',
      '.dsn-attachment img{display:block;width:100%;height:100%;object-fit:cover}',
      '.dsn-attachment-remove{position:absolute;top:3px;right:3px;display:grid;place-items:center;width:18px;height:18px;padding:0;border:0;border-radius:50%;background:rgba(20,16,8,.62);color:#fff;cursor:pointer;appearance:none}',
      '.dsn-attachment-remove:hover{background:rgba(20,16,8,.82)}',
      '.dsn-attachment--uploading{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:4px;color:var(--dsw-alias-label-tertiary);font-size:10px;line-height:13px;text-align:center}',
      '.dsn-spinner{width:16px;height:16px;border:2px solid var(--dsw-alias-border-l2);border-top-color:var(--dsw-alias-brand-primary);border-radius:50%;animation:dsn-spin .8s linear infinite}',
      '@keyframes dsn-spin{to{transform:rotate(360deg)}}',
      '.dsn-note-images{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px;margin:0}',
      '.dsn-note-images[data-count="1"]{grid-template-columns:1fr}',
      '.dsn-image-wrap{position:relative;min-width:0;margin:0}',
      '.dsn-note-image{display:block;width:100%;height:92px;padding:0;border:0;border-radius:6px;overflow:hidden;background:rgba(255,255,255,.35);cursor:zoom-in;appearance:none}',
      '.dsn-note-images[data-count="1"] .dsn-note-image{height:156px}',
      '.dsn-note-image img{display:block;width:100%;height:100%;object-fit:cover}',
      '.dsn-image-remove{position:absolute;top:4px;right:4px;display:grid;place-items:center;width:20px;height:20px;padding:0;border:0;border-radius:50%;background:rgba(20,16,8,.62);color:#fff;cursor:pointer;appearance:none}',
      '.dsn-image-remove:hover{background:rgba(20,16,8,.82)}',
      '.dsn-edit-images .dsn-note-image{height:74px}',
      '.dsn-edit-images[data-count="1"] .dsn-note-image{height:74px}',
      '.dsn-drag-handle{display:grid;place-items:center;flex:none;width:24px;height:24px;padding:0;border:0;border-radius:6px;background:transparent;color:rgba(59,51,32,.55);cursor:grab;appearance:none;-webkit-user-drag:element}',
      '.dsn-drag-handle:hover{background:rgba(59,51,32,.1);color:#3b3320}',
      '.dsn-drag-handle:active{cursor:grabbing}',
      '.dsn-note[data-dragging="true"]{opacity:.42}',
      '.dsn-note[data-drop="before"]::after,.dsn-note[data-drop="after"]::after{content:"";position:absolute;top:-3px;bottom:-3px;width:3px;border-radius:999px;background:var(--dsw-alias-brand-primary)}',
      '.dsn-note[data-drop="before"]::after{left:-9px}',
      '.dsn-note[data-drop="after"]::after{right:-9px}',
      '.dsn-reorder-hint{color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px;white-space:nowrap}',
      '.dsn-sessions{display:flex;flex-wrap:wrap;gap:5px;margin:0}',
      '.dsn-session-chip{display:inline-flex;align-items:center;gap:3px;max-width:100%;padding:1px 7px;border:1px solid rgba(59,51,32,.18);border-radius:999px;background:rgba(255,255,255,.42);color:#3b3320;font:inherit;font-size:11px;line-height:16px;appearance:none}',
      '.dsn-session-chip-open{display:inline-flex;align-items:center;gap:4px;max-width:100%;padding:0;border:0;background:transparent;color:inherit;font:inherit;cursor:pointer;appearance:none;text-align:left}',
      '.dsn-session-chip-open:hover .dsn-session-chip-label{text-decoration:underline;text-underline-offset:2px}',
      '.dsn-session-chip-label{display:inline-flex;align-items:center;gap:3px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:180px}',
      '.dsn-session-chip-remove{display:grid;place-items:center;flex:none;width:14px;height:14px;padding:0;border:0;border-radius:50%;background:rgba(59,51,32,.12);color:#3b3320;cursor:pointer;appearance:none}',
      '.dsn-session-chip-remove:hover{background:rgba(59,51,32,.24)}',
      '.dsn-fixed-session{display:flex;align-items:center;gap:8px;flex-wrap:wrap}',
      '.dsn-fixed-hint{color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px}',
      '.dsn-edit{box-sizing:border-box;width:100%;min-height:92px;max-height:240px;padding:8px;border:1px solid rgba(59,51,32,.24);border-radius:8px;outline:0;resize:vertical;background:rgba(255,255,255,.38);color:#3b3320;font:inherit;font-size:14px;line-height:21px}',
      '.dsn-edit:focus{border-color:rgba(59,51,32,.62)}',
      '.dsn-edit-bar{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}',
      '.dsn-edit-btns{display:flex;align-items:center;gap:4px;margin-left:auto}',
      '.dsn-mini{padding:2px 8px;border:0;border-radius:6px;background:transparent;color:rgba(59,51,32,.75);font:inherit;font-size:12px;line-height:20px;cursor:pointer;appearance:none}',
      '.dsn-mini:hover{background:rgba(59,51,32,.1);color:#3b3320}',
      '.dsn-mini--primary{background:rgba(59,51,32,.82);color:#fff8dc}',
      '.dsn-mini--primary:hover{background:rgba(59,51,32,.94);color:#fff8dc}',
      '.dsn-mini:disabled{opacity:.45;cursor:default}',
      '.dsn-edit .dsn-swatches{gap:5px}',
      '.dsn-edit .dsn-swatch{width:18px;height:18px}',
      '.dsn-note-editor .dsn-swatches{gap:5px}',
      '.dsn-note-editor .dsn-swatch{width:18px;height:18px}',
      '.dsn-empty{display:flex;flex-direction:column;align-items:center;gap:6px;padding:54px 24px;border:.5px dashed var(--dsw-alias-border-l2);border-radius:18px;text-align:center}',
      '.dsn-empty-art{color:var(--dsw-alias-label-tertiary);margin-bottom:6px}',
      '.dsn-empty-title{margin:0;font-size:15px;line-height:22px;font-weight:600}',
      '.dsn-empty-body{max-width:380px;margin:0;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px}',
      '.dsn-loading{display:grid;grid-template-columns:repeat(auto-fill,minmax(214px,1fr));gap:16px}',
      '.dsn-skeleton{height:150px;border-radius:6px;background:var(--dsw-alias-bg-layer-2);animation:dsn-pulse 1.2s ease-in-out infinite}',
      '@keyframes dsn-pulse{0%,100%{opacity:.55}50%{opacity:.9}}',
      '.dsn-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin:30px 0 0;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}',
      '.dsn-status{display:inline-flex;align-items:center;gap:6px}',
      '.dsn-dot{flex:none;width:6px;height:6px;border-radius:50%;background:var(--dsw-alias-state-success-primary)}',
      '.dsn-status[data-mode="local"] .dsn-dot{background:var(--dsw-alias-state-warn-primary)}',
      '.dsn-status[data-mode="saving"] .dsn-dot{background:var(--dsw-alias-state-idle-primary)}',
      '.dsn-status[data-mode="loading"] .dsn-dot{background:var(--dsw-alias-state-idle-primary)}',
      '.dsn-session-overlay{position:fixed;inset:0;z-index:1300;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(10,10,10,.45)}',
      '.dsn-session-dialog{box-sizing:border-box;display:flex;flex-direction:column;width:min(560px,100%);max-height:min(640px,84vh);border:.5px solid var(--dsw-alias-border-l1);border-radius:16px;background:var(--dsw-alias-bg-overlay);color:var(--dsw-alias-label-primary);box-shadow:var(--dsw-elevation-prominent,0 20px 60px rgba(0,0,0,.3));overflow:hidden}',
      '.dsn-session-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:16px 18px 0}',
      '.dsn-session-title{margin:0;font-size:16px;line-height:24px;font-weight:600}',
      '.dsn-session-desc{margin:4px 18px 12px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px}',
      '.dsn-session-close{display:grid;place-items:center;flex:none;width:28px;height:28px;padding:0;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;appearance:none}',
      '.dsn-session-close:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}',
      '.dsn-session-search{box-sizing:border-box;width:calc(100% - 36px);height:34px;margin:0 18px 10px;padding:0 10px;border:.5px solid var(--dsw-alias-border-l2);border-radius:10px;outline:0;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font:inherit;font-size:13px}',
      '.dsn-session-search:focus{border-color:var(--dsw-alias-state-business-primary,var(--dsw-alias-brand-primary))}',
      '.dsn-session-search::placeholder{color:var(--dsw-alias-label-caption,var(--dsw-alias-label-tertiary))}',
      '.dsn-session-list{flex:1;min-height:0;overflow-y:auto;padding:0 10px 8px;scrollbar-gutter:stable}',
      '.dsn-session-row{display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;border:0;border-radius:10px;background:transparent;color:inherit;text-align:left;font:inherit;cursor:pointer;appearance:none}',
      '.dsn-session-row:hover{background:var(--dsw-alias-interactive-bg-hover)}',
      '.dsn-session-row:disabled{opacity:.5;cursor:default}',
      '.dsn-session-check{display:grid;place-items:center;flex:none;width:18px;height:18px;border:1.5px solid var(--dsw-alias-border-l2);border-radius:5px;color:var(--dsw-alias-label-primary-inverted);background:transparent}',
      '.dsn-session-row[aria-checked="true"] .dsn-session-check{border-color:transparent;background:var(--dsw-alias-brand-primary)}',
      '.dsn-session-row-main{display:flex;flex-direction:column;gap:1px;min-width:0}',
      '.dsn-session-row-title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;line-height:20px}',
      '.dsn-session-row-meta{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:15px;font-variant-numeric:tabular-nums}',
      '.dsn-session-empty{padding:30px 16px;text-align:center;color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:20px}',
      '.dsn-session-more{padding:8px 10px 2px;color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px}',
      '.dsn-session-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 18px;border-top:.5px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1)}',
      '.dsn-session-count{color:var(--dsw-alias-label-tertiary);font-size:12px;font-variant-numeric:tabular-nums}',
      '.dsn-session-foot-actions{display:flex;align-items:center;gap:8px}',
      '.dsn-session-cancel{height:32px;padding:0 12px;border:.5px solid var(--dsw-alias-border-l1);border-radius:16px;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:13px;cursor:pointer;appearance:none}',
      '.dsn-session-cancel:hover{background:var(--dsw-alias-interactive-bg-hover)}',
      '.dsn-session-done{height:32px;padding:0 14px;border:0;border-radius:16px;background:var(--dsw-alias-button-primary-fill,var(--dsw-alias-brand-primary));color:var(--dsw-alias-label-primary-inverted,#fff);font:inherit;font-size:13px;font-weight:500;cursor:pointer;appearance:none}',
      '.dsn-session-done:hover{background:var(--dsw-alias-button-primary-hover,var(--dsw-alias-brand-primary))}',
      '.dsn-lightbox{position:fixed;inset:0;z-index:1200;display:flex;align-items:center;justify-content:center;padding:32px;background:rgba(10,10,10,.78)}',
      '.dsn-lightbox-image{display:block;max-width:min(92vw,1200px);max-height:88vh;object-fit:contain;border-radius:10px;background:#111;box-shadow:0 20px 60px rgba(0,0,0,.5)}',
      '.dsn-lightbox-close{position:absolute;top:18px;right:18px;display:grid;place-items:center;width:36px;height:36px;padding:0;border:0;border-radius:50%;background:rgba(255,255,255,.14);color:#fff;cursor:pointer;appearance:none}',
      '.dsn-lightbox-close:hover{background:rgba(255,255,255,.24)}',
      '.dsn-root :focus-visible{outline:2px solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:2px}',
      '.dsn-input:focus-visible,.dsn-edit:focus-visible{outline:0}',
      '@media (hover:none){.dsn-note-actions{opacity:1}}',
      '@media (max-width:620px){.dsn-grid,.dsn-loading{grid-template-columns:1fr}.dsn-inner{padding-left:18px;padding-right:18px}.dsn-hint{display:none}.dsn-reorder-hint{display:none}.dsn-composer-right{margin-left:0}.dsn-add{margin-left:auto}.dsn-session-overlay{padding:12px}.dsn-session-dialog{max-height:92vh}}',
      '@media (prefers-reduced-motion:reduce){.dsn-skeleton{animation:none}.dsn-spinner{animation:none}.dsn-swatch,.dsn-check,.dsn-note-actions{transition:none}}',
    ].join('');

    let memoryNotes = null;

    function translateFallback(key) {
      return key;
    }

    function newId() {
      try {
        if (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') {
          return globalThis.crypto.randomUUID();
        }
      } catch {
        // Fall through to the timestamp id below.
      }
      return `note-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    }

    function normalizeClientImage(raw) {
      if (!raw || typeof raw !== 'object') return null;
      const id = typeof raw.id === 'string' ? raw.id : '';
      const mime = typeof raw.mime === 'string' ? raw.mime : '';
      if (!IMAGE_ID.test(id) || IMAGE_TYPES.indexOf(mime) < 0) return null;
      return { id, mime };
    }

    function normalizeClientImages(list) {
      if (!Array.isArray(list)) return [];
      const images = [];
      const seen = new Set();
      for (const raw of list) {
        if (images.length >= MAX_IMAGES) break;
        const image = normalizeClientImage(raw);
        if (!image || seen.has(image.id)) continue;
        seen.add(image.id);
        images.push(image);
      }
      return images;
    }

    function normalizeClientSessions(list) {
      if (!Array.isArray(list)) return [];
      const sessions = [];
      const seen = new Set();
      for (const raw of list) {
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

    function normalizeClientNote(raw) {
      if (!raw || typeof raw !== 'object') return null;
      const text = typeof raw.text === 'string' ? raw.text.slice(0, MAX_TEXT) : '';
      const images = normalizeClientImages(raw.images);
      const sessions = normalizeClientSessions(raw.sessions);
      if (!text.trim() && images.length === 0) return null;
      const createdAt = Number.isFinite(raw.createdAt) ? raw.createdAt : Date.now();
      return {
        id: typeof raw.id === 'string' && raw.id ? raw.id : newId(),
        text,
        color: COLORS.indexOf(raw.color) >= 0 ? raw.color : 'sun',
        done: raw.done === true,
        createdAt,
        updatedAt: Number.isFinite(raw.updatedAt) ? raw.updatedAt : createdAt,
        images,
        sessions,
      };
    }

    function normalizeClientNotes(list) {
      if (!Array.isArray(list)) return [];
      const notes = [];
      for (const raw of list) {
        const note = normalizeClientNote(raw);
        if (note) notes.push(note);
      }
      return notes;
    }

    function readLocal() {
      try {
        const raw = window.localStorage.getItem(LOCAL_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return normalizeClientNotes(parsed && parsed.notes);
      } catch {
        return [];
      }
    }

    function writeLocal(notes) {
      try {
        window.localStorage.setItem(
          LOCAL_KEY,
          JSON.stringify({ version: 1, notes, updatedAt: Date.now() }),
        );
      } catch {
        // A full or disabled localStorage must not break the wall.
      }
    }

    async function requestJson(url, options) {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`sticky-notes HTTP ${response.status}`);
      const type = response.headers.get('content-type') || '';
      if (type.toLowerCase().indexOf('application/json') < 0) {
        throw new Error('sticky-notes: unexpected response');
      }
      return response.json();
    }

    async function loadRemote(signal) {
      const data = await requestJson(API, {
        method: 'GET',
        headers: { accept: 'application/json' },
        cache: 'no-store',
        signal,
      });
      if (!data || !Array.isArray(data.notes)) throw new Error('sticky-notes: bad payload');
      return normalizeClientNotes(data.notes);
    }

    async function saveRemote(notes) {
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), 15000);
      let data;
      try {
        data = await requestJson(API, {
          method: 'PUT',
          headers: { accept: 'application/json', 'content-type': 'application/json' },
          body: JSON.stringify({ notes }),
          signal: controller.signal,
        });
      } finally {
        window.clearTimeout(timer);
      }
      if (!data || !Array.isArray(data.notes)) throw new Error('sticky-notes: bad payload');
      return normalizeClientNotes(data.notes);
    }

    function imageSrc(image) {
      return `${IMAGES_API}/${image.id}.${IMAGE_EXT[image.mime] || 'png'}`;
    }

    function normalizeImageType(type) {
      const lower = String(type || '').toLowerCase();
      return lower === 'image/jpg' ? 'image/jpeg' : lower;
    }

    async function uploadImage(file) {
      const mime = normalizeImageType(file.type);
      if (IMAGE_TYPES.indexOf(mime) < 0) throw new Error('image-type');
      if (file.size > MAX_IMAGE_BYTES) throw new Error('image-size');
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), 15000);
      let response;
      try {
        response = await fetch(IMAGES_API, {
          method: 'POST',
          headers: { 'content-type': mime },
          body: file,
          signal: controller.signal,
        });
      } finally {
        window.clearTimeout(timer);
      }
      if (response.status === 413) throw new Error('image-size');
      if (!response.ok) throw new Error('image-upload');
      const contentType = response.headers.get('content-type') || '';
      if (contentType.toLowerCase().indexOf('application/json') < 0) {
        throw new Error('image-upload');
      }
      const data = await response.json();
      const id = data && typeof data.id === 'string' ? data.id : '';
      const savedMime = data && typeof data.mime === 'string' ? data.mime : '';
      if (!IMAGE_ID.test(id) || IMAGE_TYPES.indexOf(savedMime) < 0) {
        throw new Error('image-upload');
      }
      return { id, mime: savedMime };
    }

    function deleteImage(image) {
      fetch(`${IMAGES_API}/${image.id}`, { method: 'DELETE' }).catch(() => {
        // The Host prunes abandoned files later; a failed delete stays silent.
      });
    }

    function referencedImageIds(list) {
      const ids = new Set();
      for (const note of list) {
        for (const image of note.images) ids.add(image.id);
      }
      return ids;
    }

    function noteLabel(note, t) {
      const flat = String(note.text || '').replace(/\s+/g, ' ').trim();
      if (flat) return flat.length > 48 ? `${flat.slice(0, 47)}…` : flat;
      return t('image.note');
    }

    function formatWhen(timestamp, t, localeId) {
      if (!Number.isFinite(timestamp)) return '';
      const diff = Date.now() - timestamp;
      if (diff < 60 * 1000) return t('time.justNow');
      if (diff < 60 * 60 * 1000) return t('time.minutes', { count: Math.floor(diff / 60000) });
      if (diff < 24 * 60 * 60 * 1000) {
        return t('time.hours', { count: Math.floor(diff / 3600000) });
      }
      if (diff < 7 * 24 * 60 * 60 * 1000) {
        return t('time.days', { count: Math.floor(diff / 86400000) });
      }
      try {
        return new Intl.DateTimeFormat(localeId || undefined, {
          month: 'short',
          day: 'numeric',
        }).format(new Date(timestamp));
      } catch {
        return new Date(timestamp).toLocaleDateString();
      }
    }

    function useLocaleRevision(locale) {
      const [revision, setRevision] = React.useState(() =>
        locale && typeof locale.getSnapshot === 'function' ? locale.getSnapshot().revision : 0,
      );
      React.useEffect(() => {
        if (!locale || typeof locale.subscribe !== 'function') return undefined;
        const sync = () => setRevision(locale.getSnapshot().revision);
        sync();
        return locale.subscribe(sync);
      }, [locale]);
      return revision;
    }

    function NoteGlyph(props) {
      const size = props && props.size ? props.size : 16;
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 24 24',
          fill: 'none',
          'aria-hidden': 'true',
          focusable: 'false',
        },
        h('path', {
          d: 'M6.1 3.75h8.3l3.5 3.5v13H6.1z',
          stroke: 'currentColor',
          strokeWidth: 1.6,
          strokeLinejoin: 'round',
        }),
        h('path', {
          d: 'M14.1 3.9v3.6h3.6',
          stroke: 'currentColor',
          strokeWidth: 1.6,
          strokeLinejoin: 'round',
        }),
        h('path', {
          d: 'M9.1 11h5.8M9.1 14.5h3.9',
          stroke: 'currentColor',
          strokeWidth: 1.6,
          strokeLinecap: 'round',
        }),
      );
    }

    function PlusIcon(props) {
      const size = props && props.size ? props.size : 14;
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 16 16',
          fill: 'none',
          'aria-hidden': 'true',
          focusable: 'false',
        },
        h('path', {
          d: 'M8 3.2v9.6M3.2 8h9.6',
          stroke: 'currentColor',
          strokeWidth: 1.6,
          strokeLinecap: 'round',
        }),
      );
    }

    function CheckIcon(props) {
      const size = props && props.size ? props.size : 12;
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 16 16',
          fill: 'none',
          'aria-hidden': 'true',
          focusable: 'false',
        },
        h('path', {
          d: 'M3.2 8.4l3 3 6.6-7',
          stroke: 'currentColor',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      );
    }

    function PencilIcon(props) {
      const size = props && props.size ? props.size : 14;
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 16 16',
          fill: 'none',
          'aria-hidden': 'true',
          focusable: 'false',
        },
        h('path', {
          d: 'M10.9 2.7l2.4 2.4-8 8-3.2.8.8-3.2z',
          stroke: 'currentColor',
          strokeWidth: 1.3,
          strokeLinejoin: 'round',
        }),
      );
    }

    function TrashIcon(props) {
      const size = props && props.size ? props.size : 14;
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 16 16',
          fill: 'none',
          'aria-hidden': 'true',
          focusable: 'false',
        },
        h('path', {
          d: 'M3.4 4.6h9.2M6.4 4.4V3.1h3.2v1.3M4.6 4.8l.6 8.1h5.6l.6-8.1M6.7 7v3.5M9.3 7v3.5',
          stroke: 'currentColor',
          strokeWidth: 1.3,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      );
    }

    function ImageIcon(props) {
      const size = props && props.size ? props.size : 15;
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 16 16',
          fill: 'none',
          'aria-hidden': 'true',
          focusable: 'false',
        },
        h('rect', {
          x: 2.2,
          y: 2.6,
          width: 11.6,
          height: 10.8,
          rx: 2,
          stroke: 'currentColor',
          strokeWidth: 1.3,
        }),
        h('circle', { cx: 5.6, cy: 5.8, r: 1.15, fill: 'currentColor' }),
        h('path', {
          d: 'M3.3 12.2l3.3-3.3 2.2 2.1 1.6-1.5 2.3 2.4',
          stroke: 'currentColor',
          strokeWidth: 1.3,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      );
    }

    function CloseIcon(props) {
      const size = props && props.size ? props.size : 12;
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 16 16',
          fill: 'none',
          'aria-hidden': 'true',
          focusable: 'false',
        },
        h('path', {
          d: 'M4 4l8 8M12 4l-8 8',
          stroke: 'currentColor',
          strokeWidth: 1.7,
          strokeLinecap: 'round',
        }),
      );
    }

    function GripIcon(props) {
      const size = props && props.size ? props.size : 13;
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 16 16',
          fill: 'currentColor',
          'aria-hidden': 'true',
          focusable: 'false',
        },
        h('circle', { cx: 6, cy: 4, r: 1.15 }),
        h('circle', { cx: 10, cy: 4, r: 1.15 }),
        h('circle', { cx: 6, cy: 8, r: 1.15 }),
        h('circle', { cx: 10, cy: 8, r: 1.15 }),
        h('circle', { cx: 6, cy: 12, r: 1.15 }),
        h('circle', { cx: 10, cy: 12, r: 1.15 }),
      );
    }

    function ChatIcon(props) {
      const size = props && props.size ? props.size : 14;
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 16 16',
          fill: 'none',
          'aria-hidden': 'true',
          focusable: 'false',
        },
        h('path', {
          d: 'M2.6 3.2h10.8v7.1H7.5L4.3 13v-2.7H2.6z',
          stroke: 'currentColor',
          strokeWidth: 1.3,
          strokeLinejoin: 'round',
        }),
        h('path', {
          d: 'M5.2 6.1h5.6M5.2 8.1h3.4',
          stroke: 'currentColor',
          strokeWidth: 1.2,
          strokeLinecap: 'round',
        }),
      );
    }

    function LinkIcon(props) {
      const size = props && props.size ? props.size : 15;
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 16 16',
          fill: 'none',
          'aria-hidden': 'true',
          focusable: 'false',
        },
        h('path', {
          d: 'M6.7 9.3l2.6-2.6',
          stroke: 'currentColor',
          strokeWidth: 1.4,
          strokeLinecap: 'round',
        }),
        h('path', {
          d: 'M5.4 10.6l-.7.7a2 2 0 002.8 2.8l.7-.7',
          stroke: 'currentColor',
          strokeWidth: 1.3,
          strokeLinecap: 'round',
        }),
        h('path', {
          d: 'M10.6 5.4l.7-.7a2 2 0 012.8 2.8l-.7.7',
          stroke: 'currentColor',
          strokeWidth: 1.3,
          strokeLinecap: 'round',
        }),
      );
    }

    function WarningIcon(props) {
      const size = props && props.size ? props.size : 14;
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 16 16',
          fill: 'none',
          'aria-hidden': 'true',
          focusable: 'false',
        },
        h('path', {
          d: 'M8 2.4l6 10.8H2z',
          stroke: 'currentColor',
          strokeWidth: 1.3,
          strokeLinejoin: 'round',
        }),
        h('path', {
          d: 'M8 6.2v3.3M8 11.7v.1',
          stroke: 'currentColor',
          strokeWidth: 1.4,
          strokeLinecap: 'round',
        }),
      );
    }

    function EmptyArt() {
      return h(
        'svg',
        {
          width: 92,
          height: 82,
          viewBox: '0 0 92 82',
          fill: 'none',
          'aria-hidden': 'true',
          focusable: 'false',
        },
        h('rect', {
          x: 10,
          y: 14,
          width: 42,
          height: 50,
          rx: 3,
          transform: 'rotate(-7 31 39)',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.3,
          opacity: 0.5,
        }),
        h('rect', {
          x: 38,
          y: 8,
          width: 44,
          height: 52,
          rx: 3,
          transform: 'rotate(6 60 34)',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.3,
        }),
        h('path', {
          d: 'M49 26h22M49 34h22M49 42h13',
          stroke: 'currentColor',
          strokeWidth: 1.3,
          strokeLinecap: 'round',
          opacity: 0.7,
        }),
        h('path', {
          d: 'M30 72h34',
          stroke: 'currentColor',
          strokeWidth: 1,
          strokeLinecap: 'round',
          opacity: 0.25,
        }),
      );
    }

    function Swatches(props) {
      const { t, value, onChange, small } = props;
      return h(
        'div',
        { className: 'dsn-swatches', role: 'group', 'aria-label': t('color.label') },
        COLORS.map((color) =>
          h('button', {
            key: color,
            type: 'button',
            className: `dsn-swatch dsn-fill--${color}`,
            'aria-label': t(`color.${color}`),
            'aria-pressed': value === color,
            title: t(`color.${color}`),
            onClick: () => onChange(color),
            'data-small': small ? 'true' : undefined,
          }),
        ),
      );
    }

    function ImageGrid(props) {
      const { images, t, onView, onRemove, className } = props;
      if (!images || images.length === 0) return null;
      return h(
        'div',
        {
          className: className || 'dsn-note-images',
          'data-count': images.length === 1 ? '1' : 'multi',
        },
        images.map((image) =>
          h(
            'div',
            { key: image.id, className: 'dsn-image-wrap' },
            h(
              'button',
              {
                type: 'button',
                className: 'dsn-note-image',
                'aria-label': t('image.view'),
                title: t('image.view'),
                onClick: () => onView(image),
              },
              h('img', { src: imageSrc(image), alt: t('image.alt'), loading: 'lazy' }),
            ),
            onRemove
              ? h(
                  'button',
                  {
                    type: 'button',
                    className: 'dsn-image-remove',
                    'aria-label': t('image.remove'),
                    title: t('image.remove'),
                    onClick: () => onRemove(image),
                  },
                  h(CloseIcon, { size: 10 }),
                )
              : null,
          ),
        ),
      );
    }

    function AttachButton(props) {
      const inputRef = React.useRef(null);
      const { t, disabled, onFiles } = props;
      return h(
        React.Fragment,
        null,
        h(
          'button',
          {
            type: 'button',
            className: 'dsn-attach',
            disabled: disabled,
            'aria-label': t('action.attach'),
            title: t('action.attach'),
            onClick: () => {
              if (inputRef.current) inputRef.current.click();
            },
          },
          h(ImageIcon, { size: 15 }),
        ),
        h('input', {
          ref: inputRef,
          type: 'file',
          accept: 'image/png,image/jpeg,image/webp,image/gif',
          multiple: true,
          hidden: true,
          onChange: (event) => {
            const files = event.target.files;
            event.target.value = '';
            if (files && files.length > 0) onFiles(files);
          },
        }),
      );
    }

    function shortSessionId(id) {
      const text = String(id || '');
      const tail = text.indexOf('session-') === 0 ? text.slice(8) : text;
      return tail.length > 10 ? tail.slice(0, 10) : tail;
    }

    function SessionChips(props) {
      const { sessions, t, onOpen, onRemove, readOnly, className } = props;
      if (!sessions || sessions.length === 0) return null;
      return h(
        'div',
        { className: className || 'dsn-sessions' },
        sessions.map((session) => {
          const label = session.title || t('session.untitled');
          const title = t('session.open', { title: label });
          const icon = h(ChatIcon, { size: 10 });
          const interactive = !readOnly && typeof onOpen === 'function';
          const removable = !readOnly && typeof onRemove === 'function';
          return h(
            'span',
            {
              key: session.id,
              className: 'dsn-session-chip',
              title: `${label} · ${session.id}`,
            },
            interactive
              ? h(
                  'button',
                  {
                    type: 'button',
                    className: 'dsn-session-chip-open',
                    'aria-label': title,
                    onClick: () => onOpen(session.id),
                  },
                  icon,
                  h('span', { className: 'dsn-session-chip-label' }, label),
                )
              : h(
                  'span',
                  { className: 'dsn-session-chip-label' },
                  icon,
                  h('span', null, label),
                ),
            removable
              ? h(
                  'button',
                  {
                    type: 'button',
                    className: 'dsn-session-chip-remove',
                    'aria-label': t('session.unbind'),
                    title: t('session.unbind'),
                    onClick: () => onRemove(session.id),
                  },
                  h(CloseIcon, { size: 9 }),
                )
              : null,
          );
        }),
      );
    }

    function SessionDialog(props) {
      const { t, useSessions, useWorkspaces, selected, onApply, onClose, activeLocale } = props;
      const [query, setQuery] = React.useState('');
      const dialogRef = React.useRef(null);
      const [draft, setDraft] = React.useState(() =>
        (Array.isArray(selected) ? selected : []).slice(),
      );
      const list = useSessions((state) => state);
      const archivedSessionIds = useWorkspaces((state) => state.archivedSessionIds);
      const archived = React.useMemo(
        () => new Set(archivedSessionIds || []),
        [archivedSessionIds],
      );

      React.useEffect(() => {
        const onKey = (event) => {
          if (event.key === 'Escape') {
            onClose();
            return;
          }
          if (event.key !== 'Tab') return;
          const root = dialogRef.current;
          if (!root) return;
          const focusable = Array.from(
            root.querySelectorAll(
              'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])',
            ),
          ).filter((element) => element.getClientRects().length > 0);
          if (focusable.length === 0) {
            event.preventDefault();
            return;
          }
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          const active = document.activeElement;
          if (!root.contains(active)) {
            event.preventDefault();
            (event.shiftKey ? last : first).focus();
            return;
          }
          if (event.shiftKey && active === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && active === last) {
            event.preventDefault();
            first.focus();
          }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
      }, [onClose]);

      const sessions = React.useMemo(() => {
        const ids = list && Array.isArray(list.ids) ? list.ids : [];
        const byId = list && list.byId ? list.byId : {};
        const rows = [];
        for (const id of ids) {
          const summary = byId[id];
          if (!summary) continue;
          // Keep the blank conversation the user is currently in so it can be
          // bound before its first message; other blank sessions stay hidden.
          const currentBlank =
            summary.blank === true &&
            Boolean(summary.retainedBy) &&
            summary.retainedBy.mainView > 0;
          if (
            (summary.blank && !currentBlank) ||
            summary.origin === 'subagent' ||
            archived.has(summary.id)
          ) {
            continue;
          }
          rows.push(summary);
        }
        rows.sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0));
        const needle = query.trim().toLowerCase();
        if (!needle) return rows;
        return rows.filter((summary) =>
          `${summary.title || ''} ${summary.id}`.toLowerCase().indexOf(needle) >= 0,
        );
      }, [list, query, archived]);

      const shown = sessions.slice(0, MAX_SESSION_ROWS);
      const selectedIds = new Set(draft.map((session) => session.id));
      const atLimit = draft.length >= MAX_SESSIONS;

      function toggle(summary) {
        if (draft.some((session) => session.id === summary.id)) {
          setDraft(draft.filter((session) => session.id !== summary.id));
          return;
        }
        if (atLimit) return;
        setDraft([...draft, { id: summary.id, title: summary.title || '' }]);
      }

      return h(
        'div',
        {
          className: 'dsn-session-overlay',
          role: 'presentation',
          onClick: onClose,
        },
        h(
          'div',
          {
            className: 'dsn-session-dialog',
            role: 'dialog',
            'aria-modal': 'true',
            'aria-label': t('session.bind'),
            ref: dialogRef,
            onClick: (event) => event.stopPropagation(),
          },
          h(
            'header',
            { className: 'dsn-session-head' },
            h('h2', { className: 'dsn-session-title' }, t('session.bind')),
            h(
              'button',
              {
                type: 'button',
                className: 'dsn-session-close',
                'aria-label': t('action.cancel'),
                title: t('action.cancel'),
                onClick: onClose,
              },
              h(CloseIcon, { size: 14 }),
            ),
          ),
          h('p', { className: 'dsn-session-desc' }, t('session.bindHint')),
          h('input', {
            className: 'dsn-session-search',
            type: 'search',
            value: query,
            placeholder: t('session.search'),
            'aria-label': t('session.search'),
            autoFocus: true,
            onChange: (event) => setQuery(event.target.value),
          }),
          h(
            'div',
            { className: 'dsn-session-list' },
            (list && list.phase !== 'ready' && sessions.length === 0)
              ? h('div', { className: 'dsn-session-empty' }, t('session.loading'))
              : sessions.length === 0
                ? h(
                    'div',
                    { className: 'dsn-session-empty' },
                    query.trim() ? t('session.noMatch') : t('session.empty'),
                  )
                : shown.map((summary) => {
                    const checked = selectedIds.has(summary.id);
                    const title = summary.title || t('session.untitled');
                    const when = formatWhen(summary.updatedAt, t, activeLocale);
                    const meta = [when, shortSessionId(summary.id)]
                      .filter(Boolean)
                      .join(' · ');
                    return h(
                      'button',
                      {
                        key: summary.id,
                        type: 'button',
                        className: 'dsn-session-row',
                        role: 'checkbox',
                        'aria-checked': checked,
                        disabled: !checked && atLimit,
                        onClick: () => toggle(summary),
                      },
                      h(
                        'span',
                        { className: 'dsn-session-check', 'aria-hidden': 'true' },
                        checked ? h(CheckIcon, { size: 11 }) : null,
                      ),
                      h(
                        'span',
                        { className: 'dsn-session-row-main' },
                        h('span', { className: 'dsn-session-row-title' }, title),
                        h(
                          'span',
                          { className: 'dsn-session-row-meta', title: summary.id },
                          meta,
                        ),
                      ),
                    );
                  }),
            sessions.length > shown.length
              ? h(
                  'div',
                  { className: 'dsn-session-more' },
                  t('session.tooManyRows', { count: shown.length }),
                )
              : null,
          ),
          h(
            'footer',
            { className: 'dsn-session-foot' },
            h(
              'span',
              { className: 'dsn-session-count' },
              t('session.selectedCount', { count: draft.length, max: MAX_SESSIONS }),
            ),
            h(
              'div',
              { className: 'dsn-session-foot-actions' },
              h(
                'button',
                {
                  type: 'button',
                  className: 'dsn-session-cancel',
                  onClick: onClose,
                },
                t('action.cancel'),
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'dsn-session-done',
                  onClick: () => onApply(draft),
                },
                t('session.done'),
              ),
            ),
          ),
        ),
      );
    }

    function useWall() {
      const [notes, setNotes] = React.useState(() => (memoryNotes ? memoryNotes.slice() : []));
      const [phase, setPhase] = React.useState(() => (memoryNotes ? 'ready' : 'loading'));
      const [mode, setMode] = React.useState('host');
      const [error, setError] = React.useState('');
      const saveSeq = React.useRef(0);
      const touched = React.useRef(false);

      React.useEffect(() => {
        let alive = true;
        const controller = new AbortController();
        const timer = window.setTimeout(() => controller.abort(), 4000);
        loadRemote(controller.signal).then(
          (loaded) => {
            window.clearTimeout(timer);
            if (!alive || touched.current) return;
            memoryNotes = loaded;
            setNotes(loaded);
            setMode('host');
            setPhase('ready');
            setError('');
            writeLocal(loaded);
          },
          () => {
            window.clearTimeout(timer);
            if (!alive || touched.current) return;
            const local = readLocal();
            setNotes(local);
            setMode('local');
            setPhase('local');
            setError('error.load');
          },
        );
        return () => {
          alive = false;
          window.clearTimeout(timer);
          controller.abort();
        };
      }, []);

      const persist = React.useCallback((next) => {
        touched.current = true;
        const seq = ++saveSeq.current;
        memoryNotes = next;
        setNotes(next);
        setPhase('saving');
        return saveRemote(next).then(
          (saved) => {
            if (seq !== saveSeq.current) return { ok: false, stale: true, notes: saved };
            memoryNotes = saved;
            setNotes(saved);
            setMode('host');
            setPhase('saved');
            setError('');
            writeLocal(saved);
            return { ok: true, stale: false, notes: saved };
          },
          () => {
            if (seq !== saveSeq.current) return { ok: false, stale: true, notes: next };
            writeLocal(next);
            setMode('local');
            setPhase('local');
            setError('error.save');
            return { ok: false, stale: false, notes: next };
          },
        );
      }, []);

      return { notes, phase, mode, error, persist };
    }

    function NotesWallPage(props) {
      const t = typeof props.t === 'function' ? props.t : translateFallback;
      const locale = props.locale;
      useLocaleRevision(locale);

      const { notes, phase, mode, error, persist } = useWall();
      const fixedSession =
        props.fixedSession && props.fixedSession.id ? props.fixedSession : null;
      const fixedId = fixedSession ? fixedSession.id : null;
      const scopedNotes = fixedId
        ? notes.filter((note) =>
            (note.sessions || []).some((session) => session.id === fixedId),
          )
        : notes;
      // The wall opens on what still needs doing; "全部" stays one tap away.
      const [filter, setFilter] = React.useState('open');
      const [draft, setDraft] = React.useState('');
      const [draftColor, setDraftColor] = React.useState('sun');
      const [editingId, setEditingId] = React.useState(null);
      const [editText, setEditText] = React.useState('');
      const [editColor, setEditColor] = React.useState('sun');
      const [draftImages, setDraftImages] = React.useState([]);
      const [editImages, setEditImages] = React.useState([]);
      const [uploading, setUploading] = React.useState(0);
      const [imageError, setImageError] = React.useState('');
      const [viewingImage, setViewingImage] = React.useState(null);
      const [draggingId, setDraggingId] = React.useState(null);
      const [dropTarget, setDropTarget] = React.useState(null);
      const [draftSessions, setDraftSessions] = React.useState(() =>
        fixedSession ? [fixedSession] : [],
      );
      const [editSessions, setEditSessions] = React.useState([]);
      const [sessionPicker, setSessionPicker] = React.useState(null);
      const [sessionError, setSessionError] = React.useState('');
      const uploadCountRef = React.useRef(0);

      const loading = phase === 'loading';
      const canBindSessions =
        typeof props.useSessions === 'function' &&
        typeof props.useWorkspaces === 'function' &&
        typeof props.openSession === 'function';
      const activeLocale =
        locale && typeof locale.getSnapshot === 'function' ? locale.getSnapshot().active : undefined;
      const openCount = scopedNotes.filter((note) => !note.done).length;
      const doneCount = scopedNotes.length - openCount;
      const visible = scopedNotes.filter((note) => {
        if (filter === 'open') return !note.done;
        if (filter === 'done') return note.done;
        return true;
      });

      React.useEffect(() => {
        if (!viewingImage) return undefined;
        const onKey = (event) => {
          if (event.key === 'Escape') setViewingImage(null);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
      }, [viewingImage]);

      function mergeImages(prev, images) {
        const merged = prev.slice();
        const seen = new Set(merged.map((image) => image.id));
        for (const image of images) {
          if (merged.length >= MAX_IMAGES) break;
          if (seen.has(image.id)) continue;
          seen.add(image.id);
          merged.push(image);
        }
        return merged;
      }

      function addDraftImages(images) {
        setDraftImages((prev) => mergeImages(prev, images));
      }

      function addEditImages(images) {
        setEditImages((prev) => mergeImages(prev, images));
      }

      async function attachFiles(files, currentCount, apply) {
        if (loading || uploadCountRef.current > 0) return;
        const candidates = Array.from(files || []).filter(
          (file) => IMAGE_TYPES.indexOf(normalizeImageType(file.type)) >= 0,
        );
        if (candidates.length === 0) {
          setImageError('image.error.type');
          return;
        }
        const remaining = MAX_IMAGES - currentCount;
        if (remaining <= 0) {
          setImageError('image.error.limit');
          return;
        }
        const selected = candidates.slice(0, remaining);
        setImageError(candidates.length > remaining ? 'image.error.limit' : '');
        uploadCountRef.current += selected.length;
        setUploading(uploadCountRef.current);
        const uploaded = [];
        let failure = '';
        for (const file of selected) {
          try {
            uploaded.push(await uploadImage(file));
          } catch (error) {
            const reason = error && error.message;
            failure =
              reason === 'image-size'
                ? 'image.error.size'
                : reason === 'image-type'
                  ? 'image.error.type'
                  : 'image.error.upload';
          } finally {
            uploadCountRef.current = Math.max(0, uploadCountRef.current - 1);
            setUploading(uploadCountRef.current);
          }
        }
        if (uploaded.length > 0) apply(uploaded);
        if (failure) setImageError(failure);
      }

      function onPasteImages(event, currentCount, apply) {
        const clipboard = event.clipboardData;
        if (!clipboard) return;
        let files = clipboard.files ? Array.from(clipboard.files) : [];
        if (files.length === 0 && clipboard.items) {
          files = Array.from(clipboard.items)
            .filter(
              (item) =>
                item.kind === 'file' &&
                IMAGE_TYPES.indexOf(normalizeImageType(item.type)) >= 0,
            )
            .map((item) => item.getAsFile())
            .filter(Boolean);
        }
        if (files.length === 0) return;
        const images = files.filter(
          (file) => IMAGE_TYPES.indexOf(normalizeImageType(file.type)) >= 0,
        );
        if (images.length === 0) return;
        event.preventDefault();
        attachFiles(images, currentCount, apply);
      }

      function allowFileDrop(event) {
        if (event.dataTransfer && Array.from(event.dataTransfer.types || []).indexOf('Files') >= 0) {
          event.preventDefault();
          event.dataTransfer.dropEffect = 'copy';
        }
      }

      function dropFiles(event, currentCount, apply) {
        if (
          !event.dataTransfer ||
          !event.dataTransfer.files ||
          event.dataTransfer.files.length === 0
        ) {
          return;
        }
        event.preventDefault();
        attachFiles(event.dataTransfer.files, currentCount, apply);
      }

      function openSessionPicker(which) {
        if (!canBindSessions) return;
        setSessionError('');
        setSessionPicker(which);
      }

      function applyPickedSessions(next) {
        if (sessionPicker === 'draft') setDraftSessions(next);
        else if (sessionPicker) setEditSessions(next);
        setSessionPicker(null);
      }

      function handleOpenSession(sessionId) {
        if (typeof props.openSession !== 'function') return;
        try {
          props.openSession(sessionId);
        } catch {
          setSessionError('session.error.open');
        }
      }

      function removeEditSession(id) {
        setEditSessions((prev) => prev.filter((session) => session.id !== id));
      }

      function finishReorder(sourceId, targetId, position) {
        setDraggingId(null);
        setDropTarget(null);
        if (!sourceId || sourceId === targetId) return;
        const from = notes.findIndex((note) => note.id === sourceId);
        if (from < 0) return;
        const dragged = notes[from];
        const next = notes.filter((note) => note.id !== sourceId);
        let index;
        if (targetId) {
          index = next.findIndex((note) => note.id === targetId);
          if (index < 0) return;
          if (position === 'after') index += 1;
        } else {
          index = next.length;
        }
        next.splice(index, 0, dragged);
        if (next.every((note, positionIndex) => note.id === notes[positionIndex].id)) return;
        persist(next);
      }

      function handleDragStart(event, note) {
        const card = event.currentTarget.closest('.dsn-note');
        const transfer = event.dataTransfer;
        if (transfer) {
          try {
            transfer.effectAllowed = 'move';
            transfer.setData('text/plain', note.id);
            if (card) transfer.setDragImage(card, 24, 24);
          } catch {
            // Custom drag images and data are optional.
          }
        }
        setDropTarget(null);
        setDraggingId(note.id);
      }

      function handleDragEnd() {
        setDraggingId(null);
        setDropTarget(null);
      }

      function isFileDrag(event) {
        return Boolean(
          event.dataTransfer &&
            Array.from(event.dataTransfer.types || []).indexOf('Files') >= 0,
        );
      }

      function handleNoteDragOver(event, note) {
        if (isFileDrag(event)) {
          event.preventDefault();
          if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
          return;
        }
        if (!draggingId || draggingId === note.id) return;
        event.preventDefault();
        if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
        const rect = event.currentTarget.getBoundingClientRect();
        const position = event.clientX > rect.left + rect.width / 2 ? 'after' : 'before';
        setDropTarget((current) =>
          current && current.id === note.id && current.position === position
            ? current
            : { id: note.id, position },
        );
      }

      function handleNoteDragLeave(event, note) {
        if (event.currentTarget.contains(event.relatedTarget)) return;
        setDropTarget((current) => (current && current.id === note.id ? null : current));
      }

      function handleNoteDrop(event, note) {
        if (!draggingId) {
          if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            event.preventDefault();
          }
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        const position =
          dropTarget && dropTarget.id === note.id ? dropTarget.position : 'before';
        finishReorder(draggingId, note.id, position);
      }

      function handleGridDragOver(event) {
        if (isFileDrag(event)) {
          event.preventDefault();
          if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
          return;
        }
        if (!draggingId) return;
        event.preventDefault();
        if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
      }

      function handleGridDrop(event) {
        if (!draggingId) {
          if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            event.preventDefault();
          }
          return;
        }
        event.preventDefault();
        finishReorder(draggingId, null, 'after');
      }

      function handleDragKeyDown(event, note) {
        if (
          event.key !== 'ArrowLeft' &&
          event.key !== 'ArrowRight' &&
          event.key !== 'ArrowUp' &&
          event.key !== 'ArrowDown'
        ) {
          return;
        }
        event.preventDefault();
        const delta = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1;
        const from = visible.findIndex((item) => item.id === note.id);
        if (from < 0) return;
        const neighbor = visible[from + delta];
        if (!neighbor) return;
        finishReorder(note.id, neighbor.id, delta < 0 ? 'before' : 'after');
      }

      function addNote() {
        const text = draft.trim();
        if (loading || uploading > 0 || (!text && draftImages.length === 0)) return;
        const now = Date.now();
        const note = {
          id: newId(),
          text: text.slice(0, MAX_TEXT),
          color: draftColor,
          done: false,
          createdAt: now,
          updatedAt: now,
          images: draftImages,
          sessions: fixedSession ? [fixedSession] : draftSessions,
        };
        persist([note, ...notes]);
        // A new note is always open, so leave "已完成" to keep it in view.
        if (filter === 'done') setFilter('open');
        setDraft('');
        setDraftImages([]);
        setDraftSessions(fixedSession ? [fixedSession] : []);
        setImageError('');
        setSessionError('');
      }

      function toggleNote(note) {
        persist(
          notes.map((item) =>
            item.id === note.id ? { ...item, done: !item.done, updatedAt: Date.now() } : item,
          ),
        );
      }

      function deleteNote(note) {
        if (editingId === note.id) setEditingId(null);
        const removed = (note.images || []).slice();
        const next = notes.filter((item) => item.id !== note.id);
        persist(next).then((result) => {
          if (!result.ok || result.stale) return;
          const referenced = referencedImageIds(result.notes || next);
          for (const image of removed) {
            if (!referenced.has(image.id)) deleteImage(image);
          }
        });
      }

      function startEdit(note) {
        setEditingId(note.id);
        setEditText(note.text);
        setEditColor(note.color);
        setEditImages((note.images || []).slice());
        const nextSessions = (note.sessions || []).slice();
        if (fixedSession) {
          const index = nextSessions.findIndex(
            (session) => session.id === fixedSession.id,
          );
          if (index >= 0) nextSessions[index] = fixedSession;
          else nextSessions.unshift(fixedSession);
        }
        setEditSessions(nextSessions.slice(0, MAX_SESSIONS));
        setImageError('');
        setSessionError('');
      }

      function cancelEdit() {
        setEditingId(null);
        setEditText('');
        setEditImages([]);
        setEditSessions([]);
        setImageError('');
        setSessionError('');
      }

      function commitEdit(note) {
        const text = editText.trim();
        if (uploading > 0 || (!text && editImages.length === 0)) return;
        const current = notes.find((item) => item.id === note.id);
        const removed = current
          ? (current.images || []).filter(
              (image) => !editImages.some((kept) => kept.id === image.id),
            )
          : [];
        const next = notes.map((item) =>
          item.id === note.id
            ? {
                ...item,
                text: text.slice(0, MAX_TEXT),
                color: editColor,
                images: editImages,
                sessions: fixedSession
                  ? [
                      fixedSession,
                      ...editSessions.filter(
                        (session) => session.id !== fixedSession.id,
                      ),
                    ].slice(0, MAX_SESSIONS)
                  : editSessions,
                updatedAt: Date.now(),
              }
            : item,
        );
        persist(next).then((result) => {
          if (!result.ok || result.stale) return;
          const referenced = referencedImageIds(result.notes || next);
          for (const image of removed) {
            if (!referenced.has(image.id)) deleteImage(image);
          }
        });
        setEditingId(null);
        setEditText('');
        setEditImages([]);
        setEditSessions([]);
        setImageError('');
        setSessionError('');
      }

      function removeDraftImage(image) {
        setDraftImages((prev) => prev.filter((item) => item.id !== image.id));
        deleteImage(image);
      }

      function removeEditImage(image) {
        setEditImages((prev) => prev.filter((item) => item.id !== image.id));
      }

      function onComposerKeyDown(event) {
        if (event.key !== 'Enter' || event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {
          return;
        }
        if (event.nativeEvent && (event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229)) {
          return;
        }
        event.preventDefault();
        addNote();
      }

      function onEditorKeyDown(event, note) {
        if (event.key === 'Escape') {
          event.preventDefault();
          cancelEdit();
          return;
        }
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          commitEdit(note);
        }
      }

      const headingCount =
        scopedNotes.length === 1
          ? t('count.one')
          : t('count.other', { count: scopedNotes.length });

      function renderEmpty() {
        if (fixedId && scopedNotes.length === 0) {
          return h(
            'div',
            { className: 'dsn-empty' },
            h('div', { className: 'dsn-empty-art' }, h(EmptyArt)),
            h('p', { className: 'dsn-empty-title' }, t('empty.sessionTitle')),
            h('p', { className: 'dsn-empty-body' }, t('empty.sessionBody')),
          );
        }
        // An empty wall is empty for every filter, so never claim that its
        // to-dos were all checked off just because "待办" is the default view.
        const key =
          scopedNotes.length === 0
            ? ''
            : filter === 'open'
              ? 'open'
              : filter === 'done'
                ? 'done'
                : '';
        return h(
          'div',
          { className: 'dsn-empty' },
          h('div', { className: 'dsn-empty-art' }, h(EmptyArt)),
          h('p', { className: 'dsn-empty-title' }, t(key ? `empty.${key}Title` : 'empty.title')),
          h('p', { className: 'dsn-empty-body' }, t(key ? `empty.${key}Body` : 'empty.body')),
        );
      }

      function renderNote(note) {
        const editing = editingId === note.id;
        const label = noteLabel(note, t);
        const canSaveEdit =
          uploading === 0 && (editText.trim().length > 0 || editImages.length > 0);
        const drop =
          dropTarget && dropTarget.id === note.id ? dropTarget.position : undefined;
        return h(
          'article',
          {
            key: note.id,
            className: `dsn-note dsn-note--${note.color}`,
            'data-done': note.done ? 'true' : 'false',
            'data-dragging': draggingId === note.id ? 'true' : 'false',
            'data-drop': drop,
            onDragOver: (event) => handleNoteDragOver(event, note),
            onDragLeave: (event) => handleNoteDragLeave(event, note),
            onDrop: (event) => handleNoteDrop(event, note),
          },
          h(
            'div',
            { className: 'dsn-note-head' },
            h(
              'button',
              {
                type: 'button',
                className: 'dsn-check',
                role: 'checkbox',
                'aria-checked': note.done,
                'aria-label': t(note.done ? 'aria.markOpen' : 'aria.markDone', { text: label }),
                title: t(note.done ? 'aria.markOpen' : 'aria.markDone', { text: label }),
                onClick: () => toggleNote(note),
              },
              note.done ? h(CheckIcon, { size: 11 }) : null,
            ),
            h(
              'span',
              {
                className: 'dsn-note-time',
                title: new Date(note.createdAt).toLocaleString(),
              },
              formatWhen(note.createdAt, t, activeLocale),
            ),
            h(
              'div',
              { className: 'dsn-note-actions', role: 'group', 'aria-label': t('aria.noteActions', { text: label }) },
              h(
                'button',
                {
                  type: 'button',
                  className: 'dsn-drag-handle',
                  draggable: true,
                  'aria-label': t('note.move'),
                  title: t('note.move'),
                  onDragStart: (event) => handleDragStart(event, note),
                  onDragEnd: handleDragEnd,
                  onKeyDown: (event) => handleDragKeyDown(event, note),
                },
                h(GripIcon, { size: 13 }),
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'dsn-icon-btn',
                  'aria-label': t('action.edit'),
                  title: t('action.edit'),
                  onClick: () => startEdit(note),
                },
                h(PencilIcon, { size: 13 }),
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'dsn-icon-btn',
                  'aria-label': t('action.delete'),
                  title: t('action.delete'),
                  onClick: () => deleteNote(note),
                },
                h(TrashIcon, { size: 13 }),
              ),
            ),
          ),
          editing
            ? h(
                'div',
                {
                  className: 'dsn-note-editor',
                  onDragOver: allowFileDrop,
                  onDrop: (event) => dropFiles(event, editImages.length, addEditImages),
                },
                h('textarea', {
                  className: 'dsn-edit',
                  value: editText,
                  'aria-label': t('action.edit'),
                  placeholder: t('editor.placeholder'),
                  autoFocus: true,
                  onChange: (event) => setEditText(event.target.value),
                  onKeyDown: (event) => onEditorKeyDown(event, note),
                  onPaste: (event) => onPasteImages(event, editImages.length, addEditImages),
                }),
                h(ImageGrid, {
                  images: editImages,
                  t,
                  onView: setViewingImage,
                  onRemove: removeEditImage,
                  className: 'dsn-note-images dsn-edit-images',
                }),
                h(SessionChips, {
                  sessions: editSessions,
                  t,
                  onRemove: fixedSession ? undefined : removeEditSession,
                  readOnly: Boolean(fixedSession),
                }),
                h(
                  'div',
                  { className: 'dsn-edit-bar' },
                  h(Swatches, {
                    t,
                    value: editColor,
                    onChange: setEditColor,
                    small: true,
                  }),
                  h(AttachButton, {
                    t,
                    disabled: uploading > 0 || editImages.length >= MAX_IMAGES,
                    onFiles: (files) => attachFiles(files, editImages.length, addEditImages),
                  }),
                  fixedSession
                    ? null
                    : h(
                        'button',
                        {
                          type: 'button',
                          className: 'dsn-attach',
                          disabled: !canBindSessions,
                          'aria-label': t('session.bind'),
                          title: t('session.bind'),
                          onClick: () => openSessionPicker(note.id),
                        },
                        h(LinkIcon, { size: 15 }),
                      ),
                  h(
                    'div',
                    { className: 'dsn-edit-btns' },
                    h(
                      'button',
                      {
                        type: 'button',
                        className: 'dsn-mini',
                        onClick: cancelEdit,
                      },
                      t('action.cancel'),
                    ),
                    h(
                      'button',
                      {
                        type: 'button',
                        className: 'dsn-mini dsn-mini--primary',
                        disabled: !canSaveEdit,
                        onClick: () => commitEdit(note),
                      },
                      t('action.save'),
                    ),
                  ),
                ),
              )
            : h(
                React.Fragment,
                null,
                note.text
                  ? h(
                      'p',
                      {
                        className: 'dsn-note-text',
                        onDoubleClick: () => startEdit(note),
                        title: note.text,
                      },
                      note.text,
                    )
                  : null,
                h(ImageGrid, {
                  images: note.images,
                  t,
                  onView: setViewingImage,
                }),
                h(SessionChips, {
                  sessions: note.sessions,
                  t,
                  onOpen: handleOpenSession,
                }),
              ),
        );
      }

      const statusMode = phase === 'loading' ? 'loading' : phase === 'saving' ? 'saving' : mode;
      const statusText =
        phase === 'loading'
          ? t('status.loading')
          : phase === 'saving'
            ? t('status.saving')
            : phase === 'saved'
              ? t('status.saved')
              : mode === 'local'
                ? t('status.local')
                : t('status.ready');

      const subtitleText = fixedSession
        ? t('session.viewSubtitle', {
            title: fixedSession.title || t('session.untitled'),
          })
        : t('subtitle');

      return h(
        'div',
        { className: fixedSession ? 'dsn-root dsn-root--embedded' : 'dsn-root' },
        h(
          'div',
          { className: 'dsn-scroll' },
          h(
            'div',
            { className: 'dsn-inner' },
            h(
              'header',
              { className: 'dsn-head' },
              h(
                'div',
                { className: 'dsn-heading' },
                h('h1', { className: 'dsn-title' }, t('title')),
                h('p', { className: 'dsn-sub' }, subtitleText),
              ),
              h('span', { className: 'dsn-count' }, headingCount),
            ),
            h(
              'section',
              {
                className: 'dsn-composer',
                onDragOver: allowFileDrop,
                onDrop: (event) => dropFiles(event, draftImages.length, addDraftImages),
              },
              h('textarea', {
                className: 'dsn-input',
                value: draft,
                rows: 2,
                placeholder: t('composer.placeholder'),
                'aria-label': t('composer.placeholder'),
                autoFocus: true,
                onChange: (event) => setDraft(event.target.value),
                onKeyDown: onComposerKeyDown,
                onPaste: (event) => onPasteImages(event, draftImages.length, addDraftImages),
              }),
              draftImages.length > 0 || uploading > 0
                ? h(
                    'div',
                    { className: 'dsn-attachments' },
                    draftImages.map((image) =>
                      h(
                        'div',
                        { key: image.id, className: 'dsn-attachment' },
                        h('img', { src: imageSrc(image), alt: t('image.alt') }),
                        h(
                          'button',
                          {
                            type: 'button',
                            className: 'dsn-attachment-remove',
                            'aria-label': t('image.remove'),
                            title: t('image.remove'),
                            onClick: () => removeDraftImage(image),
                          },
                          h(CloseIcon, { size: 10 }),
                        ),
                      ),
                    ),
                    uploading > 0
                      ? h(
                          'div',
                          { className: 'dsn-attachment dsn-attachment--uploading' },
                          h('span', { className: 'dsn-spinner', 'aria-hidden': 'true' }),
                          h('span', null, t('image.uploading')),
                        )
                      : null,
                  )
                : null,
              fixedSession
                ? h(
                    'div',
                    { className: 'dsn-fixed-session' },
                    h(SessionChips, {
                      sessions: [fixedSession],
                      t,
                      readOnly: true,
                    }),
                    h('span', { className: 'dsn-fixed-hint' }, t('session.fixedHint')),
                  )
                : draftSessions.length > 0
                  ? h(SessionChips, {
                      sessions: draftSessions,
                      t,
                      onRemove: (id) =>
                        setDraftSessions((prev) =>
                          prev.filter((session) => session.id !== id),
                        ),
                    })
                  : null,
              h(
                'div',
                { className: 'dsn-composer-bar' },
                h(
                  'div',
                  { className: 'dsn-composer-left' },
                  h(Swatches, {
                    t,
                    value: draftColor,
                    onChange: setDraftColor,
                  }),
                  h(AttachButton, {
                    t,
                    disabled: loading || uploading > 0 || draftImages.length >= MAX_IMAGES,
                    onFiles: (files) => attachFiles(files, draftImages.length, addDraftImages),
                  }),
                  fixedSession
                    ? null
                    : h(
                        'button',
                        {
                          type: 'button',
                          className: 'dsn-attach',
                          disabled: !canBindSessions,
                          'aria-label': t('session.bind'),
                          title: t('session.bind'),
                          onClick: () => openSessionPicker('draft'),
                        },
                        h(LinkIcon, { size: 15 }),
                      ),
                ),
                h(
                  'div',
                  { className: 'dsn-composer-right' },
                  h(
                    'span',
                    { className: 'dsn-hint' },
                    uploading > 0 ? t('image.uploading') : t('composer.hint'),
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dsn-add',
                      disabled:
                        loading ||
                        uploading > 0 ||
                        (!draft.trim() && draftImages.length === 0),
                      onClick: addNote,
                    },
                    h(PlusIcon, { size: 14 }),
                    t('action.add'),
                  ),
                ),
              ),
            ),
            imageError
              ? h(
                  'div',
                  { className: 'dsn-banner', role: 'alert' },
                  h(WarningIcon, { size: 14 }),
                  h('span', null, t(imageError, { count: MAX_IMAGES })),
                )
              : null,
            error
              ? h(
                  'div',
                  { className: 'dsn-banner', role: 'alert' },
                  h(WarningIcon, { size: 14 }),
                  h('span', null, t(error)),
                )
              : null,
            sessionError
              ? h(
                  'div',
                  { className: 'dsn-banner', role: 'alert' },
                  h(WarningIcon, { size: 14 }),
                  h('span', null, t(sessionError)),
                )
              : null,
            h(
              'div',
              { className: 'dsn-toolbar' },
              h(
                'div',
                { className: 'dsn-tabs', role: 'group', 'aria-label': t('title') },
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'dsn-tab',
                    'aria-pressed': filter === 'open',
                    onClick: () => setFilter('open'),
                  },
                  t('filter.open'),
                  h('span', { className: 'dsn-tab-count' }, openCount),
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'dsn-tab',
                    'aria-pressed': filter === 'all',
                    onClick: () => setFilter('all'),
                  },
                  t('filter.all'),
                  h('span', { className: 'dsn-tab-count' }, scopedNotes.length),
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'dsn-tab',
                    'aria-pressed': filter === 'done',
                    onClick: () => setFilter('done'),
                  },
                  t('filter.done'),
                  h('span', { className: 'dsn-tab-count' }, doneCount),
                ),
              ),
              visible.length > 1
                ? h('span', { className: 'dsn-reorder-hint' }, t('note.reorderHint'))
                : null,
            ),
            phase === 'loading' && notes.length === 0
              ? h(
                  'div',
                  { className: 'dsn-loading', 'aria-hidden': 'true' },
                  [0, 1, 2].map((index) => h('div', { key: index, className: 'dsn-skeleton' })),
                )
              : visible.length === 0
                ? renderEmpty()
                : h(
                    'div',
                    {
                      className: 'dsn-grid',
                      onDragOver: handleGridDragOver,
                      onDrop: handleGridDrop,
                    },
                    visible.map(renderNote),
                  ),
            h(
              'footer',
              { className: 'dsn-foot' },
              h(
                'span',
                {
                  className: 'dsn-status',
                  'data-mode': statusMode,
                  role: 'status',
                  'aria-live': 'polite',
                },
                h('span', { className: 'dsn-dot', 'aria-hidden': 'true' }),
                h('span', null, statusText),
              ),
              h('span', null, t('footnote')),
            ),
          ),
        ),
        viewingImage
          ? h(
              'div',
              {
                className: 'dsn-lightbox',
                role: 'dialog',
                'aria-modal': 'true',
                'aria-label': t('image.view'),
                onClick: () => setViewingImage(null),
              },
              h(
                'button',
                {
                  type: 'button',
                  className: 'dsn-lightbox-close',
                  'aria-label': t('image.close'),
                  title: t('image.close'),
                  autoFocus: true,
                  onClick: (event) => {
                    event.stopPropagation();
                    setViewingImage(null);
                  },
                },
                h(CloseIcon, { size: 18 }),
              ),
              h('img', {
                className: 'dsn-lightbox-image',
                src: imageSrc(viewingImage),
                alt: t('image.alt'),
                onClick: (event) => event.stopPropagation(),
              }),
            )
          : null,
        sessionPicker && canBindSessions
          ? h(SessionDialog, {
              t,
              useSessions: props.useSessions,
              useWorkspaces: props.useWorkspaces,
              selected: sessionPicker === 'draft' ? draftSessions : editSessions,
              activeLocale,
              onApply: applyPickedSessions,
              onClose: () => setSessionPicker(null),
            })
          : null,
      );
    }

    return {
      inject: ['slots', 'locale', 'uiWorkspace'],
      apply(ctx) {
        ctx.effect(() => {
          if (typeof document === 'undefined') return undefined;
          const style = document.createElement('style');
          style.setAttribute('data-plugin', '@local/sticky-notes');
          style.textContent = CSS;
          (document.head || document.documentElement).appendChild(style);
          return () => style.remove();
        });

        for (const locale of LOCALES) {
          ctx.effect(() =>
            ctx.locale.register(
              NS,
              locale,
              locale.indexOf('zh') === 0 ? DICTS.zh : DICTS.en,
            ),
          );
        }

        const t = ctx.locale.bind(NS);
        const NotesPanel = (props) =>
          h(NotesWallPage, {
            ...props,
            locale: ctx.locale,
            t: typeof props.t === 'function' ? props.t : t,
            openSession: (sessionId) => ctx.uiWorkspace.openSession(sessionId),
          });
        const SessionNotesView = (props) => {
          const viewT = typeof props.t === 'function' ? props.t : t;
          const sessionId = props.sessionId;
          const summary = props.useSessions((state) =>
            state && state.byId ? state.byId[sessionId] : undefined,
          );
          const fixedSession = sessionId
            ? {
                id: sessionId,
                title: summary && summary.title ? summary.title : '',
              }
            : null;
          return h(NotesWallPage, {
            ...props,
            t: viewT,
            locale: ctx.locale,
            openSession: (id) => ctx.uiWorkspace.openSession(id),
            fixedSession,
          });
        };

        ctx.slots.inject('sidebar.panellist', () =>
          ctx.slots.register(
            {
              name: 'sidebar.panellist',
              id: PANEL_ID,
              order: 15,
              locale: NS,
              label: () => t('panel.label'),
            },
            NoteGlyph,
          ),
        );

        ctx.slots.inject('main', () =>
          ctx.slots.register(
            {
              name: 'main',
              key: PANEL_ID,
              locale: NS,
            },
            NotesPanel,
          ),
        );

        ctx.slots.inject('conversation.view', () =>
          ctx.slots.register(
            {
              name: 'conversation.view',
              id: 'sticky-notes',
              order: 30,
              locale: NS,
              label: () => t('view.label'),
            },
            SessionNotesView,
          ),
        );
      },
    };
  },
});

// Bundle source lives in the kk-dsh-plugins store; installed from this directory.
