/* ======================================================
   illustrations.js — エクササイズSVGイラスト（44種）
   テンプレート合成方式のスティックフィギュア
   ====================================================== */
'use strict';

var ExIllust = (function () {
  var B = '#2E86AB', R = '#E53935', G = '#ccc', P = '#888';

  function s(inner) {
    return '<svg viewBox="0 0 140 90" class="ex-illust" aria-hidden="true">' +
      '<defs><marker id="ah" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">' +
      '<path d="M0,0 L6,2 L0,4Z" fill="' + R + '"/></marker></defs>' + inner + '</svg>';
  }
  function hd(x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="5" fill="none" stroke="' + B + '" stroke-width="2"/>'; }
  function ln(a, b, c, d, col, w) { return '<line x1="' + a + '" y1="' + b + '" x2="' + c + '" y2="' + d + '" stroke="' + (col || B) + '" stroke-width="' + (w || 2) + '" stroke-linecap="round"/>'; }
  function ar(a, b, c, d) { return '<line x1="' + a + '" y1="' + b + '" x2="' + c + '" y2="' + d + '" stroke="' + R + '" stroke-width="1.5" stroke-dasharray="3,2" marker-end="url(#ah)"/>'; }
  function fl(y) { return '<line x1="10" y1="' + y + '" x2="130" y2="' + y + '" stroke="' + G + '" stroke-width="1"/>'; }
  function rc(x, y, w, h, col) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="2" fill="' + (col || G) + '" opacity="0.4"/>'; }
  function ci(x, y, r, col) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="none" stroke="' + (col || P) + '" stroke-width="1.5" stroke-dasharray="3,2"/>'; }
  function tx(x, y, t) { return '<text x="' + x + '" y="' + y + '" font-size="8" fill="' + P + '" text-anchor="middle">' + t + '</text>'; }

  // ── ポーズテンプレート ──────────────────
  function standing(x, y) {
    return hd(x, y) + ln(x, y + 6, x, y + 28) + ln(x, y + 12, x - 10, y + 22) + ln(x, y + 12, x + 10, y + 22) +
      ln(x, y + 28, x - 7, y + 48) + ln(x, y + 28, x + 7, y + 48) + fl(y + 49);
  }
  function sitting(x, y) {
    return hd(x, y) + ln(x, y + 6, x, y + 26) + ln(x, y + 12, x - 10, y + 20) + ln(x, y + 12, x + 10, y + 20) +
      ln(x, y + 26, x - 8, y + 38) + ln(x, y + 26, x + 8, y + 38) +
      ln(x - 8, y + 38, x - 8, y + 48) + ln(x + 8, y + 38, x + 8, y + 48) +
      rc(x - 14, y + 25, 28, 4, P) + fl(y + 49);
  }
  function supine(x, y) {
    return fl(y + 18) + hd(x - 28, y + 12) + ln(x - 22, y + 12, x + 10, y + 12) +
      ln(x - 14, y + 12, x - 20, y + 4) + ln(x - 14, y + 12, x - 8, y + 4) +
      ln(x + 10, y + 12, x + 22, y + 18) + ln(x + 10, y + 12, x + 26, y + 10);
  }
  function prone(x, y) {
    return fl(y + 18) + hd(x + 28, y + 12) + ln(x + 22, y + 12, x - 10, y + 12) +
      ln(x + 14, y + 12, x + 20, y + 4) + ln(x + 14, y + 12, x + 8, y + 4) +
      ln(x - 10, y + 12, x - 22, y + 18) + ln(x - 10, y + 12, x - 26, y + 10);
  }
  function sidelying(x, y) {
    return fl(y + 22) + hd(x - 26, y + 16) + ln(x - 20, y + 16, x + 4, y + 16) +
      ln(x - 12, y + 16, x - 18, y + 8) + ln(x + 4, y + 16, x + 14, y + 22) +
      ln(x + 14, y + 22, x + 8, y + 16);
  }
  function quadruped(x, y) {
    return fl(y + 36) + hd(x - 16, y + 8) + ln(x - 10, y + 10, x + 6, y + 16) +
      ln(x - 4, y + 12, x - 10, y + 36) + ln(x + 6, y + 16, x + 12, y + 36) +
      ln(x - 10, y + 10, x - 18, y + 4);
  }
  function plankSide(x, y) {
    return fl(y + 32) + hd(x - 22, y + 4) + ln(x - 16, y + 6, x + 16, y + 16) +
      ln(x - 10, y + 8, x - 16, y + 0) + ln(x + 16, y + 16, x + 16, y + 32) +
      ln(x + 16, y + 16, x + 22, y + 26);
  }
  function hanging(x, y) {
    return ln(x - 20, y, x + 20, y, P, 3) + hd(x, y + 10) +
      ln(x, y + 16, x, y + 36) + ln(x, y + 10, x - 8, y + 2) + ln(x, y + 10, x + 8, y + 2) +
      ln(x, y + 36, x - 6, y + 52) + ln(x, y + 36, x + 6, y + 52);
  }
  function bridge(x, y) {
    return fl(y + 30) + hd(x - 24, y + 24) + ln(x - 18, y + 24, x - 4, y + 10) +
      ln(x - 4, y + 10, x + 10, y + 10) + ln(x + 10, y + 10, x + 18, y + 30) +
      ln(x + 18, y + 30, x + 10, y + 30) +
      ln(x - 12, y + 18, x - 18, y + 14) + ln(x - 12, y + 18, x - 6, y + 14);
  }
  function walking(x, y) {
    return hd(x, y) + ln(x, y + 6, x, y + 28) + ln(x, y + 12, x - 8, y + 20) + ln(x, y + 12, x + 10, y + 18) +
      ln(x, y + 28, x - 8, y + 46) + ln(x, y + 28, x + 8, y + 46) + fl(y + 47) +
      ar(x - 14, y + 40, x - 20, y + 34);
  }
  function swimming(x, y) {
    return '<path d="M' + (x - 30) + ',' + (y + 20) + ' Q' + x + ',' + (y + 14) + ' ' + (x + 30) + ',' + (y + 20) + '" fill="none" stroke="' + B + '" stroke-width="1" opacity="0.3"/>' +
      hd(x - 20, y + 14) + ln(x - 14, y + 16, x + 18, y + 18) +
      ln(x - 8, y + 16, x - 16, y + 8) + ln(x - 8, y + 16, x - 2, y + 8) +
      ln(x + 18, y + 18, x + 26, y + 24) + ln(x + 18, y + 18, x + 28, y + 14);
  }
  function bedLying(x, y) {
    return rc(x - 32, y + 10, 64, 6, P) + rc(x - 32, y + 16, 4, 14, P) + rc(x + 28, y + 16, 4, 14, P) +
      hd(x - 22, y + 4) + ln(x - 16, y + 6, x + 16, y + 8) +
      ln(x - 8, y + 6, x - 12, y + 0) + ln(x + 16, y + 8, x + 22, y + 12);
  }

  // ── 各エクササイズの合成 ─────────────────
  var data = {
    'sch-rab': function () {
      return s(sitting(60, 15) + ar(78, 35, 92, 28) + ar(78, 40, 94, 40) + tx(100, 30, 'RAB'));
    },
    'sch-prone-stool': function () {
      return s(rc(40, 45, 50, 8, P) + prone(65, 30) + ar(40, 32, 28, 24));
    },
    'sch-sidelying': function () {
      return s(sidelying(65, 40) + ar(75, 38, 85, 30));
    },
    'sch-muscle-cylinder': function () {
      return s(standing(55, 12) + ci(55, 32, 14, R) + tx(90, 35, 'cylinder'));
    },
    'sch-wall-squat': function () {
      return s(ln(30, 8, 30, 70, P, 3) + hd(40, 14) + ln(40, 20, 40, 38) + ln(40, 24, 32, 30) + ln(40, 24, 48, 30) +
        ln(40, 38, 48, 52) + ln(48, 52, 40, 62) + ln(40, 38, 32, 52) + ln(32, 52, 40, 62) + fl(63) + ar(50, 38, 50, 48));
    },
    'sch-doorframe': function () {
      return s(ln(45, 5, 45, 75, P, 3) + ln(95, 5, 95, 75, P, 3) + standing(70, 12) +
        ln(70, 24, 47, 24) + ar(80, 32, 90, 28));
    },
    'sch-seated-pelvis': function () {
      return s(sitting(65, 15) + ar(55, 50, 45, 50) + ar(75, 50, 85, 50));
    },
    'sch-standing-elongation': function () {
      return s(standing(65, 18) + ar(65, 12, 65, 2));
    },
    'sch-scapular': function () {
      return s(prone(65, 38) + ar(55, 36, 48, 30) + ar(75, 36, 82, 30));
    },
    'sch-thoracic-ext': function () {
      return s(ci(65, 52, 6, P) + supine(65, 38) + ar(60, 30, 55, 22));
    },
    'sch-ball': function () {
      return s('<circle cx="65" cy="55" r="14" fill="none" stroke="' + P + '" stroke-width="1.5"/>' +
        hd(65, 16) + ln(65, 22, 65, 42) + ln(65, 28, 55, 36) + ln(65, 28, 75, 36) +
        ln(65, 42, 55, 55) + ln(65, 42, 75, 55) + ar(50, 45, 42, 38));
    },
    'sch-bar-hang': function () {
      return s(hanging(65, 10) + ar(59, 36, 55, 44) + ar(71, 36, 75, 44));
    },
    'seas-self-correction': function () {
      return s(standing(55, 12) + ar(70, 18, 70, 8) + ar(70, 30, 80, 26) +
        '<path d="M42,20 Q38,32 42,44" fill="none" stroke="' + R + '" stroke-width="1.5" stroke-dasharray="3,2"/>');
    },
    'seas-mirror': function () {
      return s(rc(90, 5, 3, 70, '#9E9E9E') + standing(55, 12) +
        ln(68, 25, 90, 25, P, 1) + ln(68, 40, 90, 40, P, 1));
    },
    'seas-balance-board': function () {
      return s('<path d="M42,62 L55,58 L75,58 L88,62" fill="none" stroke="' + P + '" stroke-width="2.5"/>' +
        standing(65, 10) + ar(55, 30, 48, 24));
    },
    'seas-functional-sitting': function () {
      return s(sitting(55, 12) + rc(80, 12, 28, 40, '#E8E8E8') + tx(94, 35, 'PC'));
    },
    'seas-corrective-gait': function () {
      return s(walking(55, 12) + ar(72, 20, 82, 16));
    },
    'seas-proprioception': function () {
      return s(hd(60, 10) + ln(60, 16, 60, 38) + ln(60, 22, 50, 30) + ln(60, 22, 70, 30) +
        ln(60, 38, 60, 56) + ln(60, 38, 70, 52) + fl(57) +
        '<line x1="55" y1="8" x2="65" y2="8" stroke="' + P + '" stroke-width="1.5"/>' + tx(80, 15, 'eyes closed'));
    },
    'seas-adl-integration': function () {
      return s(standing(40, 14) + rc(70, 20, 30, 40, '#E8E8E8') + ar(56, 30, 68, 30) + tx(85, 45, 'ADL'));
    },
    'seas-sport-correction': function () {
      return s(walking(50, 10) + ci(95, 35, 10, P) + ar(66, 30, 82, 32));
    },
    'core-dead-bug': function () {
      return s(fl(60) + hd(30, 54) + ln(36, 54, 70, 54) + ar(48, 54, 42, 36) + ar(62, 54, 80, 40) +
        ln(70, 54, 82, 60) + ln(48, 54, 56, 40));
    },
    'core-bird-dog': function () {
      return s(quadruped(60, 22) + ar(48, 26, 30, 16) + ar(68, 32, 88, 22));
    },
    'core-side-plank-mod': function () {
      return s(plankSide(65, 24) + tx(40, 80, 'mod'));
    },
    'core-side-plank-full': function () {
      return s(fl(62) + hd(30, 20) + ln(36, 22, 90, 42) + ln(44, 26, 38, 18) +
        ln(90, 42, 90, 62) + ln(90, 42, 98, 54));
    },
    'core-pallof-press': function () {
      return s(standing(55, 12) + ln(20, 35, 55, 35, P, 1.5) +
        ar(65, 35, 85, 35) + tx(20, 30, 'band'));
    },
    'core-asym-carry': function () {
      return s(walking(55, 10) + rc(38, 42, 6, 10, B) + ar(55, 46, 55, 54));
    },
    'core-lat-pull': function () {
      return s(sitting(60, 18) + ln(45, 8, 75, 8, P, 2) +
        ar(52, 8, 52, 26) + ar(68, 8, 68, 26));
    },
    'core-asym-row': function () {
      return s(rc(35, 30, 30, 4, P) + hd(80, 20) + ln(74, 22, 55, 30) + ln(55, 30, 55, 50) +
        rc(76, 38, 6, 8, B) + ar(76, 42, 70, 30));
    },
    'core-hip-hinge': function () {
      return s(fl(68) + hd(50, 12) + ln(50, 18, 62, 40) + ln(56, 28, 46, 34) + ln(56, 28, 64, 22) +
        ln(62, 40, 56, 58) + ln(62, 40, 68, 58) + ln(40, 12, 40, 60, P, 2) + ar(55, 20, 60, 14));
    },
    'core-glute-bridge': function () {
      return s(bridge(65, 30) + ar(62, 16, 62, 6));
    },
    'str-cat-cow': function () {
      return s(quadruped(50, 22) +
        '<path d="M84,20 Q92,12 100,20" fill="none" stroke="' + R + '" stroke-width="1.5"/>' +
        '<path d="M84,38 Q92,46 100,38" fill="none" stroke="' + R + '" stroke-width="1.5"/>' +
        tx(92, 16, 'cow') + tx(92, 52, 'cat'));
    },
    'str-thread-needle': function () {
      return s(quadruped(55, 24) + ar(44, 28, 30, 38) + tx(22, 44, 'thread'));
    },
    'str-child-pose': function () {
      return s(fl(55) + hd(40, 48) + ln(46, 48, 70, 40) + ln(70, 40, 70, 55) +
        ln(46, 48, 28, 40) + ar(28, 40, 18, 34));
    },
    'str-open-book': function () {
      return s(sidelying(60, 40) + ar(55, 36, 48, 18) + tx(40, 14, 'open'));
    },
    'str-foam-roller': function () {
      return s(ci(65, 52, 6, P) + supine(65, 38) + ar(58, 30, 52, 22) + ar(72, 30, 78, 22));
    },
    'str-pec-stretch': function () {
      return s(ln(40, 5, 40, 75, P, 3) + standing(58, 12) + ln(58, 24, 42, 18) + ar(68, 30, 78, 28));
    },
    'br-diaphragm': function () {
      return s(supine(60, 42) + ar(50, 34, 50, 24) + ar(50, 24, 50, 34) + tx(50, 20, 'breath'));
    },
    'br-rib-expansion': function () {
      return s(sitting(60, 15) +
        '<path d="M48,32 Q44,38 48,44" fill="none" stroke="' + R + '" stroke-width="1.5"/>' +
        '<path d="M72,32 Q76,38 72,44" fill="none" stroke="' + R + '" stroke-width="1.5"/>' + tx(90, 40, 'towel'));
    },
    'br-corrective-walk': function () {
      return s(walking(55, 10) + ar(72, 14, 82, 10));
    },
    'br-swimming-guide': function () {
      return s(swimming(65, 28) + tx(65, 70, 'backstroke'));
    },
    'post-breathing': function () {
      return s(bedLying(65, 30) + ar(55, 24, 55, 14) + tx(55, 10, 'breath'));
    },
    'post-ankle-pump': function () {
      return s(bedLying(65, 30) + ar(82, 34, 88, 28) + ar(88, 34, 82, 40));
    },
    'post-staged-gait': function () {
      return s(standing(50, 14) + ln(35, 30, 35, 60, P, 2) + ln(35, 30, 25, 30, P, 2) +
        ln(35, 60, 25, 60, P, 2) + ar(62, 50, 78, 50) + tx(90, 50, 'walk'));
    },
    'post-scar-mob': function () {
      return s(ln(50, 20, 50, 60, R, 2) + ci(50, 35, 8, R) + ci(50, 45, 8, R) +
        ar(66, 35, 60, 35) + ar(66, 45, 60, 45) + tx(80, 40, 'scar'));
    }
  };

  return {
    get: function (id) {
      var fn = data[id];
      return fn ? fn() : '';
    }
  };
})();
