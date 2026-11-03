window.__ModuleLoader__.load({
  id: '@local/offwork-countdown',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'offwork-countdown';
    const LOCALES = ['en', 'en-US', 'zh', 'zh-CN'];
    const START_HOUR = 9;
    const END_HOUR = 18;

    const DICTS = {
      en: {
        label: 'Off in',
        done: 'Off work!',
        workday: 'Workday 09:00 → 18:00',
        target: '18:00',
      },
      zh: {
        label: '距下班',
        done: '下班啦！',
        workday: '工作时间 09:00 → 18:00',
        target: '18:00',
      },
    };

    const CSS = [
      '.dsw-offwork-side{display:flex;flex:1 1 auto;align-items:center;justify-content:flex-start;gap:6px;box-sizing:border-box;width:auto;min-width:0;min-height:36px;margin:0 2px;padding:6px 8px;border-radius:8px;color:var(--dsw-alias-label-secondary);font-family:inherit;font-size:12px;line-height:16px;white-space:nowrap;user-select:none;overflow:hidden}',
      '.dsw-offwork-side[data-wide="false"]{flex:0 0 36px;width:36px;height:36px;min-height:36px;margin:0;padding:0;justify-content:center}',
      '.dsw-offwork-side__icon{display:inline-flex;flex:none;align-items:center;color:var(--dsw-alias-brand-primary)}',
      '.dsw-offwork-side__label{flex:none}',
      '.dsw-offwork-side__time{flex:none;font-weight:600;font-variant-numeric:tabular-nums;letter-spacing:.02em;color:var(--dsw-alias-label-primary)}',
      '.dsw-offwork-side__target{flex:none;margin-left:auto;font-size:11px;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary);opacity:.7}',
      '.dsw-offwork-side[data-state="soon"] .dsw-offwork-side__icon,.dsw-offwork-side[data-state="soon"] .dsw-offwork-side__time{color:var(--dsw-alias-state-warn-primary)}',
      '.dsw-offwork-side[data-state="done"],.dsw-offwork-side[data-state="done"] .dsw-offwork-side__icon,.dsw-offwork-side[data-state="done"] .dsw-offwork-side__label{color:var(--dsw-alias-state-success-primary)}',
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

    function dayEnd(now) {
      const end = new Date(now);
      end.setHours(END_HOUR, 0, 0, 0);
      return end.getTime();
    }

    function phaseOf(remainingMs) {
      if (remainingMs <= 0) return 'done';
      if (remainingMs <= 30 * 60 * 1000) return 'soon';
      return 'countdown';
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

        ctx.effect(() =>
          ctx.timer.interval(() => {
            clock.now = Date.now();
            for (const listener of clock.listeners) listener();
          }, 1000),
        );

        function OffWorkCountdown(props) {
          useLocaleRevision(ctx.locale);
          const now = useClock(clock);
          const wide = props.wide !== false;
          const remaining = Math.max(0, dayEnd(now) - now);
          const state = phaseOf(dayEnd(now) - now);
          const timeText = formatRemaining(remaining);
          const spoken =
            state === 'done' ? t('done') : t('label') + ' ' + timeText + ', ' + t('target');

          return h(
            'div',
            {
              className: 'dsw-offwork-side',
              'data-state': state,
              'data-wide': wide ? 'true' : 'false',
              role: 'timer',
              'aria-label': spoken,
              title: t('workday') + ' · ' + t('target'),
            },
            h('style', null, CSS),
            h('span', { className: 'dsw-offwork-side__icon' }, h(ClockFace)),
            wide
              ? h(
                  'span',
                  { className: 'dsw-offwork-side__label' },
                  state === 'done' ? t('done') : t('label'),
                )
              : null,
            wide && state !== 'done'
              ? h('span', { className: 'dsw-offwork-side__time' }, timeText)
              : null,
            wide ? h('span', { className: 'dsw-offwork-side__target' }, '18:00') : null,
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
