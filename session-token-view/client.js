window.__ModuleLoader__.load({
  id: '@local/session-token-view',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'session-token-view';
    const LOCALES = ['en', 'zh'];

    const DICTS = {
      en: {
        'view.label': 'Token usage',
        title: 'Token usage',
        subtitle: 'Detailed model token consumption for the current session',
        'total.label': 'This session',
        'unit.tokens': 'tokens',
        'summary.input': 'Input',
        'summary.output': 'Output',
        'summary.cacheHit': 'Cache hit',
        'usage.uncachedInput': 'Uncached input',
        'usage.cacheRead': 'Cache read',
        'usage.cacheWrite': 'Cache write',
        'usage.output': 'Output',
        'usage.shareOfTotal': '{percent} of total',
        'context.title': 'Context usage',
        'context.latest': 'Latest request',
        'context.projected': 'Next request (est.)',
        'context.window': 'Context window',
        'context.used': '{percent} used',
        'composition.title': 'Context composition (estimate)',
        'composition.hint':
          'Local heuristic estimate of the system prompt, tool definitions, and conversation; proportions only.',
        'composition.system': 'System prompt',
        'composition.tools': 'Tool definitions',
        'composition.messages': 'Conversation',
        'empty.title': 'No token usage yet',
        'empty.body':
          'Send a message and this view will show that session’s input, output, cache, and context usage.',
        footnote:
          'Usage comes from provider-reported values recorded in the session log. Context composition is estimated locally and is not an exact billing record.',
      },
      zh: {
        'view.label': 'Token 用量',
        title: 'Token 用量',
        subtitle: '当前会话详细的模型 Token 消耗量',
        'total.label': '本会话累计',
        'unit.tokens': 'tokens',
        'summary.input': '输入',
        'summary.output': '输出',
        'summary.cacheHit': '缓存命中',
        'usage.uncachedInput': '未缓存输入',
        'usage.cacheRead': '缓存读取',
        'usage.cacheWrite': '缓存写入',
        'usage.output': '输出',
        'usage.shareOfTotal': '占总量 {percent}',
        'context.title': '上下文占用',
        'context.latest': '最新一次请求',
        'context.projected': '下一次请求（预计）',
        'context.window': '上下文窗口',
        'context.used': '已用 {percent}',
        'composition.title': '上下文构成（估算）',
        'composition.hint': '系统提示、工具定义与对话消息的本地启发式估算，仅表示构成比例。',
        'composition.system': '系统提示',
        'composition.tools': '工具定义',
        'composition.messages': '对话消息',
        'empty.title': '本会话还没有 Token 消耗',
        'empty.body': '发送一条消息后，这里会显示该会话的输入、输出、缓存与上下文占用明细。',
        footnote:
          '用量来自会话日志中记录的供应商返回值；上下文构成为本地估算，不会与账单精确一致。',
      },
    };

    const CSS = [
      '.dsstv-root{box-sizing:border-box;height:100%;overflow-x:hidden;overflow-y:auto;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-family:inherit;font-size:13px;line-height:20px}',
      '.dsstv-inner{box-sizing:border-box;display:flex;flex-direction:column;gap:16px;max-width:760px;margin:0 auto;padding:28px 28px 56px}',
      '.dsstv-header{display:flex;flex-direction:column;gap:2px}',
      '.dsstv-title{margin:0;font-size:20px;line-height:28px;font-weight:600;letter-spacing:-.01em}',
      '.dsstv-subtitle{margin:0;color:var(--dsw-alias-label-secondary)}',
      '.dsstv-card{box-sizing:border-box;display:flex;flex-direction:column;gap:12px;padding:16px 18px;border:.5px solid var(--dsw-alias-border-l1);border-radius:var(--dsw-radius-lg,12px);background:var(--dsw-alias-bg-layer-1)}',
      '.dsstv-card-body{display:flex;flex-direction:column;gap:12px}',
      '.dsstv-card-head{display:flex;align-items:baseline;justify-content:space-between;gap:12px}',
      '.dsstv-card-title{margin:0;font-size:13px;line-height:20px;font-weight:600;color:var(--dsw-alias-label-secondary)}',
      '.dsstv-card-note{color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary));font-size:12px;font-variant-numeric:tabular-nums}',
      '.dsstv-hint{margin:0;color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary));font-size:12px;line-height:18px}',
      '.dsstv-hero{display:flex;flex-direction:column;gap:10px}',
      '.dsstv-total{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}',
      '.dsstv-total-label{color:var(--dsw-alias-label-secondary)}',
      '.dsstv-total-value{font-size:32px;line-height:40px;font-weight:600;font-variant-numeric:tabular-nums;letter-spacing:-.02em}',
      '.dsstv-total-unit{font-size:13px;font-weight:500;color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary))}',
      '.dsstv-chips{display:flex;flex-wrap:wrap;gap:6px}',
      '.dsstv-chip{display:inline-flex;align-items:center;gap:6px;padding:1px 9px;border:.5px solid var(--dsw-alias-border-l1);border-radius:999px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px;font-variant-numeric:tabular-nums}',
      '.dsstv-chip strong{color:var(--dsw-alias-label-primary);font-weight:500}',
      '.dsstv-stack{display:flex;gap:1px;height:8px;border-radius:999px;overflow:hidden;background:var(--dsw-alias-border-l1)}',
      '.dsstv-seg{flex-grow:0;flex-shrink:1;flex-basis:0;min-width:2px;height:100%}',
      '.dsstv-c-input{background:var(--dsw-alias-brand-primary)}',
      '.dsstv-c-read{background:var(--dsw-alias-state-success-primary)}',
      '.dsstv-c-write{background:var(--dsw-alias-state-warn-primary)}',
      '.dsstv-c-output{background:var(--dsw-alias-state-idle-primary)}',
      '.dsstv-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}',
      '.dsstv-stat{display:flex;flex-direction:column;gap:2px;padding:10px 12px;border:.5px solid var(--dsw-alias-border-l1);border-radius:var(--dsw-radius-md,8px);background:var(--dsw-alias-bg-layer-2)}',
      '.dsstv-stat-label{display:flex;align-items:center;gap:6px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px}',
      '.dsstv-dot{flex:none;width:8px;height:8px;border-radius:2px}',
      '.dsstv-stat-value{font-size:18px;line-height:24px;font-weight:600;font-variant-numeric:tabular-nums}',
      '.dsstv-stat-share{color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary));font-size:11px;line-height:16px;font-variant-numeric:tabular-nums}',
      '.dsstv-progress{height:6px;border-radius:999px;overflow:hidden;background:var(--dsw-alias-border-l1)}',
      '.dsstv-progress-fill{height:100%;border-radius:999px;background:var(--dsw-alias-brand-primary)}',
      '.dsstv-rows{display:flex;flex-direction:column;gap:6px;margin:0}',
      '.dsstv-row{display:flex;align-items:center;justify-content:space-between;gap:16px;margin:0}',
      '.dsstv-row dt{display:flex;align-items:center;gap:6px;margin:0;color:var(--dsw-alias-label-secondary)}',
      '.dsstv-row dd{margin:0;color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums}',
      '.dsstv-comp{display:flex;flex-direction:column;gap:4px}',
      '.dsstv-comp-head{display:flex;align-items:baseline;justify-content:space-between;gap:16px}',
      '.dsstv-comp-label{display:flex;align-items:center;gap:6px;color:var(--dsw-alias-label-secondary)}',
      '.dsstv-comp-value{color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums}',
      '.dsstv-comp-track{height:4px;border-radius:999px;overflow:hidden;background:var(--dsw-alias-border-l1)}',
      '.dsstv-comp-fill{height:100%;border-radius:999px}',
      '.dsstv-foot{margin:0;color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary));font-size:12px;line-height:18px}',
      '.dsstv-empty{align-items:center;justify-content:center;gap:8px;text-align:center;padding:48px 24px}',
      '.dsstv-empty-mark{display:inline-flex;color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary))}',
      '.dsstv-empty-title{margin:4px 0 0;font-size:15px;line-height:22px;font-weight:600}',
      '.dsstv-empty-body{max-width:360px;margin:0;color:var(--dsw-alias-label-secondary)}',
      '@media (max-width:640px){.dsstv-inner{padding:20px 16px 40px}}',
    ].join('');

    const numberFormat = new Intl.NumberFormat();

    function formatInteger(value) {
      if (!Number.isFinite(value)) return '0';
      return numberFormat.format(Math.max(0, Math.round(value)));
    }

    function percentOf(part, whole) {
      if (!Number.isFinite(part) || !Number.isFinite(whole) || whole <= 0) return 0;
      return Math.max(0, Math.min(100, (part / whole) * 100));
    }

    function formatPercent(value) {
      const rounded = Math.round(value * 10) / 10;
      return (Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1)) + '%';
    }

    function readTotals(usage) {
      const pick = (key) => (usage && Number.isFinite(usage[key]) ? usage[key] : 0);
      const uncachedInputTokens = pick('uncachedInputTokens');
      const cacheReadTokens = pick('cacheReadTokens');
      const cacheWriteTokens = pick('cacheWriteTokens');
      const outputTokens = pick('outputTokens');
      const inputTokens = uncachedInputTokens + cacheReadTokens + cacheWriteTokens;
      return {
        uncachedInputTokens,
        cacheReadTokens,
        cacheWriteTokens,
        outputTokens,
        inputTokens,
        totalTokens: inputTokens + outputTokens,
      };
    }

    const USAGE_PARTS = [
      { key: 'uncachedInputTokens', label: 'usage.uncachedInput', className: 'dsstv-c-input' },
      { key: 'cacheReadTokens', label: 'usage.cacheRead', className: 'dsstv-c-read' },
      { key: 'cacheWriteTokens', label: 'usage.cacheWrite', className: 'dsstv-c-write' },
      { key: 'outputTokens', label: 'usage.output', className: 'dsstv-c-output' },
    ];

    const COMPOSITION_PARTS = [
      { key: 'systemTokens', label: 'composition.system', className: 'dsstv-c-input' },
      { key: 'toolsTokens', label: 'composition.tools', className: 'dsstv-c-write' },
      { key: 'messageTokens', label: 'composition.messages', className: 'dsstv-c-read' },
    ];

    function EmptyMark() {
      return h(
        'svg',
        { viewBox: '0 0 40 40', width: 36, height: 36, 'aria-hidden': true, focusable: 'false' },
        h('rect', {
          x: 5,
          y: 5,
          width: 30,
          height: 30,
          rx: 8,
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.5,
        }),
        h('path', {
          d: 'M13 27V19M20 27V14M27 27V22',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 2,
          strokeLinecap: 'round',
        }),
      );
    }

    function Card(props) {
      const items = [];
      if (props.title !== undefined) {
        items.push(
          h(
            'div',
            { key: 'head', className: 'dsstv-card-head' },
            h('h2', { className: 'dsstv-card-title' }, props.title),
            props.note === undefined ? null : h('span', { className: 'dsstv-card-note' }, props.note),
          ),
        );
      }
      if (props.hint) items.push(h('p', { key: 'hint', className: 'dsstv-hint' }, props.hint));
      items.push(
        h(
          'div',
          { key: 'body', className: 'dsstv-card-body' },
          React.Children.toArray(props.children),
        ),
      );
      return h('section', { className: 'dsstv-card' }, items);
    }

    function SummaryCard(props) {
      const { t, totals } = props;
      const segments = USAGE_PARTS.filter((part) => totals[part.key] > 0);
      const cacheHit =
        totals.inputTokens > 0 ? percentOf(totals.cacheReadTokens, totals.inputTokens) : undefined;
      return h(
        Card,
        null,
        h(
          'div',
          { className: 'dsstv-hero' },
          h('span', { className: 'dsstv-total-label' }, t('total.label')),
          h(
            'div',
            { className: 'dsstv-total' },
            h('span', { className: 'dsstv-total-value' }, formatInteger(totals.totalTokens)),
            h('span', { className: 'dsstv-total-unit' }, t('unit.tokens')),
          ),
          h(
            'div',
            { className: 'dsstv-chips' },
            h('span', { className: 'dsstv-chip' }, t('summary.input'), ' ', h('strong', null, formatInteger(totals.inputTokens))),
            h('span', { className: 'dsstv-chip' }, t('summary.output'), ' ', h('strong', null, formatInteger(totals.outputTokens))),
            cacheHit === undefined
              ? null
              : h('span', { className: 'dsstv-chip' }, t('summary.cacheHit'), ' ', h('strong', null, formatPercent(cacheHit))),
          ),
          h(
            'div',
            { className: 'dsstv-stack', role: 'presentation' },
            segments.map((part) =>
              h('div', {
                key: part.key,
                className: 'dsstv-seg ' + part.className,
                style: { flexGrow: totals[part.key] },
              }),
            ),
          ),
        ),
        h(
          'div',
          { className: 'dsstv-grid' },
          USAGE_PARTS.map((part) =>
            h(
              'div',
              { key: part.key, className: 'dsstv-stat' },
              h(
                'span',
                { className: 'dsstv-stat-label' },
                h('span', { className: 'dsstv-dot ' + part.className, 'aria-hidden': true }),
                t(part.label),
              ),
              h('span', { className: 'dsstv-stat-value' }, formatInteger(totals[part.key])),
              h(
                'span',
                { className: 'dsstv-stat-share' },
                t('usage.shareOfTotal', {
                  percent: formatPercent(percentOf(totals[part.key], totals.totalTokens)),
                }),
              ),
            ),
          ),
        ),
      );
    }

    function ContextCard(props) {
      const { t, pressure } = props;
      const latest = pressure.pressureTokens;
      const projected = pressure.projectedTokens;
      const window = pressure.contextWindow;
      const used = projected === undefined ? latest : projected;
      const bounded = used !== undefined && window !== undefined;
      const usedPercent = bounded ? percentOf(used, window) : 0;
      const rows = [];
      if (latest !== undefined) rows.push([t('context.latest'), latest]);
      if (projected !== undefined) rows.push([t('context.projected'), projected]);
      if (window !== undefined) rows.push([t('context.window'), window]);
      return h(
        Card,
        {
          title: t('context.title'),
          note: bounded ? t('context.used', { percent: formatPercent(usedPercent) }) : undefined,
        },
        bounded
          ? h(
              'div',
              {
                className: 'dsstv-progress',
                role: 'progressbar',
                'aria-valuemin': 0,
                'aria-valuemax': 100,
                'aria-valuenow': Math.round(usedPercent),
              },
              h('div', { className: 'dsstv-progress-fill', style: { width: formatPercent(usedPercent) } }),
            )
          : null,
        rows.length === 0
          ? null
          : h(
              'dl',
              { className: 'dsstv-rows' },
              rows.map(([label, value]) =>
                h('div', { key: label, className: 'dsstv-row' }, h('dt', null, label), h('dd', null, formatInteger(value))),
              ),
            ),
      );
    }

    function CompositionCard(props) {
      const { t, breakdown } = props;
      const total = COMPOSITION_PARTS.reduce((sum, part) => sum + (breakdown[part.key] || 0), 0);
      if (total <= 0) return null;
      return h(
        Card,
        { title: t('composition.title'), hint: t('composition.hint') },
        h(
          'div',
          { className: 'dsstv-rows' },
          COMPOSITION_PARTS.map((part) => {
            const value = breakdown[part.key] || 0;
            const share = percentOf(value, total);
            return h(
              'div',
              { key: part.key, className: 'dsstv-comp' },
              h(
                'div',
                { className: 'dsstv-comp-head' },
                h(
                  'span',
                  { className: 'dsstv-comp-label' },
                  h('span', { className: 'dsstv-dot ' + part.className, 'aria-hidden': true }),
                  t(part.label),
                  h('span', { className: 'dsstv-comp-value' }, '\u2248 ' + formatInteger(value)),
                ),
                h('span', { className: 'dsstv-comp-value' }, formatPercent(share)),
              ),
              h(
                'div',
                { className: 'dsstv-comp-track' },
                h('div', {
                  className: 'dsstv-comp-fill ' + part.className,
                  style: { width: formatPercent(share) },
                }),
              ),
            );
          }),
        ),
      );
    }

    function TokenUsageView(props) {
      const useProjection = typeof props.useProjection === 'function' ? props.useProjection : () => undefined;
      const usage = useProjection('tokenUsage');
      const pressure = useProjection('contextPressure');
      const breakdown = useProjection('contextBreakdown');
      const t = typeof props.t === 'function' ? props.t : (key) => key;

      const totals = readTotals(usage);
      const hasUsage = totals.totalTokens > 0;
      const hasPressure =
        pressure !== undefined &&
        (pressure.pressureTokens !== undefined ||
          pressure.projectedTokens !== undefined ||
          pressure.contextWindow !== undefined);
      const hasBreakdown =
        breakdown !== undefined &&
        (breakdown.systemTokens || 0) + (breakdown.toolsTokens || 0) + (breakdown.messageTokens || 0) > 0;

      const children = [
        h(
          'header',
          { key: 'header', className: 'dsstv-header' },
          h('h1', { className: 'dsstv-title' }, t('title')),
          h('p', { className: 'dsstv-subtitle' }, t('subtitle')),
        ),
      ];

      if (!hasUsage && !hasPressure) {
        children.push(
          h(
            'div',
            { key: 'empty', className: 'dsstv-card dsstv-empty' },
            h('span', { className: 'dsstv-empty-mark' }, h(EmptyMark)),
            h('h2', { className: 'dsstv-empty-title' }, t('empty.title')),
            h('p', { className: 'dsstv-empty-body' }, t('empty.body')),
          ),
        );
      } else {
        if (hasUsage) children.push(h(SummaryCard, { key: 'summary', t, totals }));
        if (hasPressure) children.push(h(ContextCard, { key: 'context', t, pressure }));
        if (hasBreakdown) children.push(h(CompositionCard, { key: 'composition', t, breakdown }));
      }

      children.push(h('p', { key: 'foot', className: 'dsstv-foot' }, t('footnote')));

      return h(
        'div',
        { className: 'dsstv-root' },
        h('style', { 'data-plugin': '@local/session-token-view' }, CSS),
        h('div', { className: 'dsstv-inner' }, children),
      );
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        for (const locale of LOCALES) {
          ctx.effect(() => ctx.locale.register(NS, locale, DICTS[locale]));
        }
        const t = ctx.locale.bind(NS);
        ctx.slots.inject('conversation.view', () =>
          ctx.slots.register(
            {
              name: 'conversation.view',
              id: 'token-usage',
              order: 20,
              locale: NS,
              label: () => t('view.label'),
            },
            TokenUsageView,
          ),
        );
      },
    };
  },
});
