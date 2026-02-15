/* ======================================================
   timeline-renderer.js — タイムラインSVG描画
   36ヶ月のフェーズ色分け + マイルストーン + 評価ポイント
   viewBoxベースレスポンシブ
   ====================================================== */

'use strict';

var TimelineRenderer = (function () {

  var NS = 'http://www.w3.org/2000/svg';

  /**
   * タイムラインSVGを生成
   * @param {object} program - ProgramEngine.generate()の戻り値
   * @returns {SVGElement}
   */
  function render(program) {
    var totalMonths = program.totalMonths;
    var phases = program.phases;
    var evaluations = program.evaluations;
    var milestones = program.milestones;

    // SVG寸法（viewBox座標系）
    var W = 700;
    var H = 180;
    var PAD_LEFT = 30;
    var PAD_RIGHT = 20;
    var BAR_Y = 50;
    var BAR_H = 28;
    var TRACK_W = W - PAD_LEFT - PAD_RIGHT;

    var svg = createEl('svg', {
      viewBox: '0 0 ' + W + ' ' + H,
      'aria-label': 'リハビリプログラムタイムライン（' + totalMonths + 'ヶ月）'
    });

    // 月目盛り
    for (var m = 0; m <= totalMonths; m += 6) {
      var x = PAD_LEFT + (m / totalMonths) * TRACK_W;
      // 目盛り線
      svg.appendChild(createEl('line', {
        x1: x, y1: BAR_Y - 4, x2: x, y2: BAR_Y + BAR_H + 4,
        stroke: '#B0BEC5', 'stroke-width': 1, 'stroke-dasharray': '2,2'
      }));
      // ラベル
      var label = m === 0 ? '開始' : m + 'M';
      svg.appendChild(createText(x, BAR_Y - 10, label, {
        'font-size': '10', fill: '#888', 'text-anchor': 'middle'
      }));
    }

    // フェーズバー
    phases.forEach(function (phase) {
      var x1 = PAD_LEFT + ((phase.startMonth - 1) / totalMonths) * TRACK_W;
      var x2 = PAD_LEFT + (phase.endMonth / totalMonths) * TRACK_W;
      var w = x2 - x1;

      // 背景バー
      svg.appendChild(createEl('rect', {
        x: x1, y: BAR_Y, width: w, height: BAR_H,
        rx: 4, fill: phase.color, opacity: '0.85'
      }));

      // フェーズ名ラベル
      var cx = x1 + w / 2;
      if (w > 60) {
        svg.appendChild(createText(cx, BAR_Y + BAR_H / 2 + 4, phase.name.replace(/（.*）/, ''), {
          'font-size': w > 100 ? '10' : '8',
          fill: '#fff',
          'text-anchor': 'middle',
          'font-weight': '600'
        }));
      }
    });

    // 評価ポイント（バーの下）
    var evalY = BAR_Y + BAR_H + 20;
    evaluations.forEach(function (ev, i) {
      var x = PAD_LEFT + (ev.month / totalMonths) * TRACK_W;
      var isXray = ev.type === 'xray';

      // マーカー線
      svg.appendChild(createEl('line', {
        x1: x, y1: BAR_Y + BAR_H, x2: x, y2: evalY - 4,
        stroke: isXray ? '#E53935' : '#2E86AB',
        'stroke-width': 1
      }));

      // マーカー点
      svg.appendChild(createEl('circle', {
        cx: x, cy: evalY,
        r: isXray ? 5 : 3.5,
        fill: isXray ? '#E53935' : '#2E86AB'
      }));

      // ラベル（交互に上下で重なり防止）
      if (evaluations.length <= 10 || i % 2 === 0) {
        var ty = evalY + 14 + (i % 2) * 12;
        if (ty < H - 5) {
          svg.appendChild(createText(x, ty, ev.month + 'M', {
            'font-size': '8', fill: '#666', 'text-anchor': 'middle'
          }));
        }
      }
    });

    // マイルストーン（バーの上）
    var msY = BAR_Y - 18;
    milestones.forEach(function (ms, i) {
      var x = PAD_LEFT + (ms.month / totalMonths) * TRACK_W;

      // フラグ
      svg.appendChild(createEl('line', {
        x1: x, y1: msY + 6, x2: x, y2: BAR_Y,
        stroke: '#7E57C2', 'stroke-width': 1
      }));

      svg.appendChild(createEl('polygon', {
        points: x + ',' + (msY - 2) + ' ' + (x + 8) + ',' + (msY + 4) + ' ' + x + ',' + (msY + 10),
        fill: '#7E57C2'
      }));
    });

    // 凡例
    var legendY = H - 10;
    var legendItems = [
      { color: '#2E86AB', label: '経過観察' },
      { color: '#E53935', label: 'X線評価' },
      { color: '#7E57C2', label: 'マイルストーン' }
    ];
    var legendX = PAD_LEFT;
    legendItems.forEach(function (item) {
      svg.appendChild(createEl('circle', {
        cx: legendX, cy: legendY, r: 4, fill: item.color
      }));
      svg.appendChild(createText(legendX + 8, legendY + 3.5, item.label, {
        'font-size': '9', fill: '#666', 'text-anchor': 'start'
      }));
      legendX += 80;
    });

    return svg;
  }

  // ── ヘルパー ────────────────────────

  function createEl(tag, attrs) {
    var el = document.createElementNS(NS, tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        el.setAttribute(k, attrs[k]);
      });
    }
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
