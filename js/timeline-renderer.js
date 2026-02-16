/* ======================================================
   timeline-renderer.js — タイムラインSVG描画
   フェーズ色分け + マイルストーン + 評価ポイント
   viewBoxベースレスポンシブ
   ====================================================== */

'use strict';

var TimelineRenderer = (function () {

  var NS = 'http://www.w3.org/2000/svg';

  function render(program) {
    var totalMonths = program.totalMonths;
    var phases = program.phases;
    var evaluations = program.evaluations;
    var milestones = program.milestones;

    var W = 700;
    var H = 200;
    var PAD_LEFT = 40;
    var PAD_RIGHT = 30;
    var BAR_Y = 80;
    var BAR_H = 28;
    var TRACK_W = W - PAD_LEFT - PAD_RIGHT;

    function mx(month) { return PAD_LEFT + (month / totalMonths) * TRACK_W; }

    var svg = createEl('svg', {
      viewBox: '0 0 ' + W + ' ' + H,
      'aria-label': I18N.t('res_timeline') + ' (' + totalMonths + I18N.t('dur_months') + ')'
    });

    // ── フェーズバー ──────────────────
    phases.forEach(function (phase) {
      var x1 = mx(phase.startMonth - 1);
      var x2 = mx(phase.endMonth);
      var w = x2 - x1;

      svg.appendChild(createEl('rect', {
        x: x1, y: BAR_Y, width: w, height: BAR_H,
        rx: 4, fill: phase.color, opacity: '0.85'
      }));

      var cx = x1 + w / 2;
      var shortName = phase.name.replace(/（.*）/, '').replace(/\(.*\)/, '');
      if (w > 50) {
        svg.appendChild(createText(cx, BAR_Y + BAR_H / 2 + 4, shortName, {
          'font-size': w > 90 ? '11' : '9',
          fill: '#fff', 'text-anchor': 'middle', 'font-weight': '600'
        }));
      }
    });

    // ── 月目盛り（バー上部、フェーズ境界のみ） ──
    var scaleMonths = [0];
    phases.forEach(function (p) { scaleMonths.push(p.endMonth); });
    // 重複除去
    var seen = {};
    scaleMonths = scaleMonths.filter(function (m) {
      if (seen[m]) return false;
      seen[m] = true;
      return true;
    });

    scaleMonths.forEach(function (m) {
      var x = mx(m);
      svg.appendChild(createEl('line', {
        x1: x, y1: BAR_Y - 2, x2: x, y2: BAR_Y + BAR_H + 2,
        stroke: '#B0BEC5', 'stroke-width': 1, 'stroke-dasharray': '2,2'
      }));
      var label = m === 0 ? I18N.t('tl_start') : m + I18N.t('dur_m');
      svg.appendChild(createText(x, BAR_Y - 8, label, {
        'font-size': '9', fill: '#888', 'text-anchor': 'middle'
      }));
    });

    // ── マイルストーン（バー上、目盛りのさらに上） ──
    var msBaseY = BAR_Y - 28;
    milestones.forEach(function (ms) {
      var x = mx(ms.month);
      svg.appendChild(createEl('line', {
        x1: x, y1: msBaseY + 8, x2: x, y2: BAR_Y - 2,
        stroke: '#7E57C2', 'stroke-width': 1, 'stroke-dasharray': '2,1'
      }));
      svg.appendChild(createEl('polygon', {
        points: x + ',' + msBaseY + ' ' + (x + 7) + ',' + (msBaseY + 5) + ' ' + x + ',' + (msBaseY + 10),
        fill: '#7E57C2'
      }));
    });

    // ── 評価ポイント（バー下） ──────────
    var evalBaseY = BAR_Y + BAR_H + 18;
    var prevLabelX = -999;
    var MIN_LABEL_GAP = 35;

    evaluations.forEach(function (ev) {
      var x = mx(ev.month);
      var isXray = ev.type === 'xray';

      svg.appendChild(createEl('line', {
        x1: x, y1: BAR_Y + BAR_H + 2, x2: x, y2: evalBaseY - 4,
        stroke: isXray ? '#E53935' : '#2E86AB', 'stroke-width': 1
      }));
      svg.appendChild(createEl('circle', {
        cx: x, cy: evalBaseY, r: isXray ? 5 : 3.5,
        fill: isXray ? '#E53935' : '#2E86AB'
      }));

      // ラベル（近すぎるものはスキップ）
      if (x - prevLabelX >= MIN_LABEL_GAP) {
        svg.appendChild(createText(x, evalBaseY + 14, ev.month + I18N.t('dur_m'), {
          'font-size': '8', fill: '#666', 'text-anchor': 'middle'
        }));
        prevLabelX = x;
      }
    });

    // ── 凡例 ────────────────────────
    var legendY = H - 8;
    var items = [
      { color: '#2E86AB', key: 'tl_eval' },
      { color: '#E53935', key: 'tl_xray' },
      { color: '#7E57C2', key: 'tl_ms' }
    ];
    var lx = PAD_LEFT;
    items.forEach(function (item) {
      svg.appendChild(createEl('circle', {
        cx: lx, cy: legendY, r: 4, fill: item.color
      }));
      svg.appendChild(createText(lx + 8, legendY + 3.5, I18N.t(item.key), {
        'font-size': '9', fill: '#666', 'text-anchor': 'start'
      }));
      lx += 90;
    });

    return svg;
  }

  function createEl(tag, attrs) {
    var el = document.createElementNS(NS, tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    return el;
  }

  function createText(x, y, text, attrs) {
    var el = createEl('text', attrs);
    el.setAttribute('x', x);
    el.setAttribute('y', y);
    el.textContent = text;
    return el;
  }

  return { render: render };
})();
