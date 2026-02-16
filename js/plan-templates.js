/* ======================================================
   plan-templates.js — 4プランテンプレート定義 (A/B/C/D)
   治療哲学別の配分比率と推奨条件
   ====================================================== */
'use strict';

var PlanTemplates = (function () {

  var templates = {
    A: {
      key: 'A',
      nameKey: 'plan_a_name',
      descKey: 'plan_a_desc',
      philosophy: 'intensive',
      // メソッド別配分比率 (clinic exercises)
      weights: {
        schroth: 0.40,
        core: 0.20,
        seas: 0.15,
        stretching: 0.10,
        breathing: 0.10,
        other: 0.05
      },
      // 自主トレ配分
      homeWeights: {
        seas: 0.30,
        core: 0.25,
        stretching: 0.25,
        breathing: 0.20
      },
      // 推奨条件
      recommend: function (input) {
        return input.cobbAngle >= 25 || input.treatment.indexOf('bracing') !== -1;
      }
    },

    B: {
      key: 'B',
      nameKey: 'plan_b_name',
      descKey: 'plan_b_desc',
      philosophy: 'self-management',
      weights: {
        seas: 0.35,
        core: 0.20,
        fits: 0.10,
        sideShift: 0.05,
        stretching: 0.15,
        breathing: 0.10,
        other: 0.05
      },
      homeWeights: {
        seas: 0.40,
        core: 0.20,
        stretching: 0.20,
        breathing: 0.20
      },
      recommend: function (input) {
        return input.cobbAngle < 25 && input.cobbAngle >= 15;
      }
    },

    C: {
      key: 'C',
      nameKey: 'plan_c_name',
      descKey: 'plan_c_desc',
      philosophy: 'patient-friendly',
      weights: {
        pilates: 0.25,
        yoga: 0.20,
        seas: 0.20,
        core: 0.15,
        stretching: 0.10,
        breathing: 0.10
      },
      homeWeights: {
        yoga: 0.30,
        pilates: 0.25,
        stretching: 0.25,
        breathing: 0.20
      },
      recommend: function (input) {
        return input.complications && (
          input.complications.indexOf('psycho') !== -1 ||
          input.complications.indexOf('appearance') !== -1
        );
      }
    },

    D: {
      key: 'D',
      nameKey: 'plan_d_name',
      descKey: 'plan_d_desc',
      philosophy: 'multimodal',
      weights: {
        schroth: 0.15,
        seas: 0.15,
        core: 0.10,
        pilates: 0.10,
        manual: 0.10,
        aquatic: 0.10,
        stretching: 0.10,
        breathing: 0.10,
        psychosocial: 0.05,
        other: 0.05
      },
      homeWeights: {
        seas: 0.25,
        stretching: 0.20,
        yoga: 0.20,
        core: 0.15,
        breathing: 0.20
      },
      recommend: function (input) {
        var compCount = (input.complications || []).filter(function (c) { return c !== 'none'; }).length;
        return compCount >= 3;
      }
    }
  };

  function all() { return templates; }
  function get(key) { return templates[key] || null; }
  function keys() { return ['A', 'B', 'C', 'D']; }

  // 患者の入力から推奨プランを返す
  function recommend(input) {
    var keys = ['A', 'B', 'C', 'D'];
    for (var i = 0; i < keys.length; i++) {
      if (templates[keys[i]].recommend(input)) return keys[i];
    }
    return 'A';
  }

  return {
    all: all,
    get: get,
    keys: keys,
    recommend: recommend
  };
})();
