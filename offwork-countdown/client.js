window.__ModuleLoader__.load({
  id: '@local/offwork-countdown',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'offwork-countdown';
    const LOCALES = ['en', 'en-US', 'zh', 'zh-CN'];
    const START_HOUR = 9;
    const END_HOUR = 18;
    const MODE_KEY = 'dsh.offwork-countdown.mode';
    const MODE_COUNTDOWN = 'countdown';
    const MODE_PROGRESS = 'progress';

    const DICTS = {
      en: {
        label: 'Off in',
        done: 'Off work!',
        workday: 'Workday 09:00 → 18:00',
        target: '18:00',
        'switch.toProgress': 'Switch to progress bar',
        'switch.toCountdown': 'Switch to countdown',
        'aria.countdown': 'Off in {time}. Switch to progress bar',
        'aria.countdownDone': 'Off work! Switch to progress bar',
        'aria.progress': 'Off in. Workday {percent} complete. Switch to countdown',
        'aria.progressDone': 'Workday 100% complete. Off work! Switch to countdown',
      },
      zh: {
        label: '距下班',
        done: '下班啦！',
        workday: '工作时间 09:00 → 18:00',
        target: '18:00',
        'switch.toProgress': '点击切换到进度条',
        'switch.toCountdown': '点击切换到倒计时',
        'aria.countdown': '距下班 {time}，点击切换到进度条',
        'aria.countdownDone': '下班啦！点击切换到进度条',
        'aria.progress': '距下班，今日进度 {percent}，点击切换到倒计时',
        'aria.progressDone': '今日进度 100%，下班啦！点击切换到倒计时',
      },
    };

    const CSS = [
      '.dsw-offwork-side{display:flex;flex:1 1 auto;align-items:center;justify-content:flex-start;gap:6px;box-sizing:border-box;width:auto;min-width:0;min-height:36px;margin:0 2px;padding:6px 8px;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);font-family:inherit;font-size:12px;line-height:16px;text-align:left;white-space:nowrap;user-select:none;overflow:hidden;cursor:pointer;appearance:none;transition:background-color .15s ease}',
      '.dsw-offwork-side:hover{background:var(--dsw-alias-interactive-bg-hover)}',
      '.dsw-offwork-side:focus-visible{outline:var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:-2px}',
      '.dsw-offwork-side[data-wide="false"]{flex:0 0 36px;width:36px;height:36px;min-height:36px;margin:0;padding:0;justify-content:center}',
      '.dsw-offwork-side__icon{display:inline-flex;flex:none;align-items:center;color:var(--dsw-alias-brand-primary)}',
      '.dsw-offwork-side__label{flex:0 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis}',
      '.dsw-offwork-side__time{flex:none;font-weight:600;font-variant-numeric:tabular-nums;letter-spacing:.02em;color:var(--dsw-alias-label-primary)}',
      '.dsw-offwork-side__target{flex:none;margin-left:auto;font-size:11px;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary);opacity:.7}',
      '.dsw-offwork-side__bar{position:relative;flex:1 1 40px;min-width:22px;height:6px;border-radius:999px;background:var(--dsw-alias-border-l1);overflow:hidden}',
      '.dsw-offwork-side__fill{display:block;height:100%;border-radius:999px;background:var(--dsw-alias-brand-primary);transition:width .45s linear}',
      '.dsw-offwork-side__percent{flex:none;font-size:11px;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary);opacity:.8}',
      '.dsw-offwork-side[data-state="soon"] .dsw-offwork-side__icon,.dsw-offwork-side[data-state="soon"] .dsw-offwork-side__time{color:var(--dsw-alias-state-warn-primary)}',
      '.dsw-offwork-side[data-state="soon"] .dsw-offwork-side__fill{background:var(--dsw-alias-state-warn-primary)}',
      '.dsw-offwork-side[data-state="done"],.dsw-offwork-side[data-state="done"] .dsw-offwork-side__icon,.dsw-offwork-side[data-state="done"] .dsw-offwork-side__label{color:var(--dsw-alias-state-success-primary)}',
      '.dsw-offwork-side[data-state="done"] .dsw-offwork-side__fill{background:var(--dsw-alias-state-success-primary)}',
      '@media (prefers-reduced-motion:reduce){.dsw-offwork-side,.dsw-offwork-side__fill{transition:none}}',
    ].join('');

    function pad(value) {
      return String(value).padStart(2, '0');
    }

    function formatRemaining(ms) {
      const total = Math.max(0, Math.floor(ms / 1000));
      const hours = Math.floor(total / 3600);
      const minutes = Math.floor((total % 3600) / 60);
      const seconds = total % 60;
      return hours + ':' + pad(minutes) + ':' + pad(seconds);
    }

    function dayStart(now) {
      const start = new Date(now);
      start.setHours(START_HOUR, 0, 0, 0);
      return start.getTime();
    }

    function dayEnd(now) {
      const end = new Date(now);
      end.setHours(END_HOUR, 0, 0, 0);
      return end.getTime();
    }

    function workdayProgress(now) {
      const start = dayStart(now);
      const end = dayEnd(now);
      const total = end - start;
      if (total <= 0) return 0;
      return Math.min(1, Math.max(0, (now - start) / total));
    }

    function formatPercent(ratio) {
      return Math.round(ratio * 100) + '%';
    }

    function phaseOf(remainingMs) {
      if (remainingMs <= 0) return 'done';
      if (remainingMs <= 30 * 60 * 1000) return 'soon';
      return 'countdown';
    }

    function readMode() {
      try {
        return window.localStorage.getItem(MODE_KEY) === MODE_PROGRESS
          ? MODE_PROGRESS
          : MODE_COUNTDOWN;
      } catch {
        return MODE_COUNTDOWN;
      }
    }

    function writeMode(mode) {
      try {
        window.localStorage.setItem(MODE_KEY, mode);
      } catch {
        // Storage can be unavailable in restricted contexts; the toggle still works.
      }
    }

    function ClockFace() {
      return h(
        'svg',
        {
          viewBox: '0 0 16 16',
          width: 14,
          height: 14,
          'aria-hidden': true,
          focusable: 'false',
        },
        h('circle', {
          cx: 8,
          cy: 8,
          r: 6.2,
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.5,
        }),
        h('path', {
          d: 'M8 4.6V8l2.4 1.5',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }),
      );
    }

    function useClock(clock) {
      const [now, setNow] = React.useState(clock.now);
      React.useEffect(() => {
        setNow(clock.now);
        const listener = () => setNow(clock.now);
        clock.listeners.add(listener);
        return () => {
          clock.listeners.delete(listener);
        };
      }, [clock]);
      return now;
    }

    function useLocaleRevision(locale) {
      const [revision, setRevision] = React.useState(() => locale.getSnapshot().revision);
      React.useEffect(() => {
        const sync = () => setRevision(locale.getSnapshot().revision);
        sync();
        return locale.subscribe(sync);
      }, [locale]);
      return revision;
    }

    return {
      inject: ['slots', 'locale', 'timer'],
      apply(ctx) {
        for (const locale of LOCALES) {
          ctx.effect(() =>
            ctx.locale.register(NS, locale, locale.indexOf('zh') === 0 ? DICTS.zh : DICTS.en),
          );
        }

        const t = ctx.locale.bind(NS);
        const clock = { now: Date.now(), listeners: new Set() };

        ctx.effect(() => {
          if (typeof document === 'undefined') return;
          const style = document.createElement('style');
          style.setAttribute('data-plugin', '@local/offwork-countdown');
          style.textContent = CSS;
          (document.head || document.documentElement).appendChild(style);
          return () => style.remove();
        });

        ctx.effect(() =>
          ctx.timer.interval(() => {
            clock.now = Date.now();
            for (const listener of clock.listeners) listener();
          }, 1000),
        );

        function OffWorkCountdown(props) {
          useLocaleRevision(ctx.locale);
          const now = useClock(clock);
          const [mode, setMode] = React.useState(readMode);
          React.useEffect(() => writeMode(mode), [mode]);

          const wide = props.wide !== false;
          const end = dayEnd(now);
          const remaining = Math.max(0, end - now);
          const state = phaseOf(end - now);
          const timeText = formatRemaining(remaining);
          const ratio = workdayProgress(now);
          const percentText = formatPercent(ratio);
          const progressMode = mode === MODE_PROGRESS;
          const switchHint = progressMode ? t('switch.toCountdown') : t('switch.toProgress');
          const spoken = progressMode
            ? t(state === 'done' ? 'aria.progressDone' : 'aria.progress', { percent: percentText })
            : t(state === 'done' ? 'aria.countdownDone' : 'aria.countdown', { time: timeText });
          const label = state === 'done' ? t('done') : t('label');

          return h(
            'button',
            {
              className: 'dsw-offwork-side',
              type: 'button',
              'data-state': state,
              'data-wide': wide ? 'true' : 'false',
              'data-mode': mode,
              'aria-label': spoken,
              title: t('workday') + ' · ' + switchHint,
              onClick: () => setMode(progressMode ? MODE_COUNTDOWN : MODE_PROGRESS),
            },
            h('span', { className: 'dsw-offwork-side__icon' }, h(ClockFace)),
            wide ? h('span', { className: 'dsw-offwork-side__label' }, label) : null,
            wide && !progressMode && state !== 'done'
              ? h('span', { className: 'dsw-offwork-side__time' }, timeText)
              : null,
            wide && progressMode
              ? h(
                  'span',
                  { className: 'dsw-offwork-side__bar', 'aria-hidden': 'true' },
                  h('span', {
                    className: 'dsw-offwork-side__fill',
                    style: { width: percentText },
                  }),
                )
              : null,
            wide && progressMode
              ? h('span', { className: 'dsw-offwork-side__percent' }, percentText)
              : null,
            wide && !progressMode
              ? h('span', { className: 'dsw-offwork-side__target' }, t('target'))
              : null,
          );
        }

        ctx.slots.inject('sidebar.footer.action', () =>
          ctx.slots.register(
            { name: 'sidebar.footer.action', id: 'offwork-countdown', order: 5 },
            OffWorkCountdown,
          ),
        );
      },
    };
  },
});

// Bundle source lives in the kk-dsh-plugins store; installed from this directory.
