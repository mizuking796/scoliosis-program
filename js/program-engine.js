/* ======================================================
   program-engine.js — プログラム生成アルゴリズム
   SOSORT 2016ガイドライン準拠リスク分類 + フェーズ構成
   期間3段階(short/medium/long) + 治療複数選択対応
   ====================================================== */

'use strict';

var ProgramEngine = (function () {

  // ── 治療複数選択→単一リスク解決 ──────────────
  function resolveTreatment(treatments) {
    if (!treatments || treatments.length === 0) return 'none';
    // 優先度: postSurgery > bracing > exercise > none
    if (treatments.indexOf('postSurgery') !== -1) return 'postSurgery';
    if (treatments.indexOf('bracing') !== -1) return 'bracing';
    if (treatments.indexOf('exercise') !== -1) return 'exercise';
    return 'none';
  }

  // ── リスク分類 ─────────────────────────
  function classifyRisk(input) {
    var treatment = Array.isArray(input.treatment)
      ? resolveTreatment(input.treatment)
      : input.treatment;
    if (treatment === 'postSurgery') return 'postSurgery';

    var cobb = input.cobbAngle;
    var risser = input.risser;
    var isGrowing = input.age <= 17;

    if (isGrowing) {
      if (cobb < 15) return 'observation';
      if (cobb < 25) return risser <= 2 ? 'exercise' : 'observation';
      if (cobb < 40) return risser <= 2 ? 'bracing' : 'exercise';
      if (cobb < 50) return risser <= 3 ? 'bracing' : 'exercise';
      return 'surgical_alert';
    } else {
      if (cobb < 30) return 'observation';
      if (cobb < 50) return 'exercise';
      return 'surgical_alert';
    }
  }

  function riskLabelKey(risk) {
    var map = {
      observation: 'risk_obs', exercise: 'risk_ex', bracing: 'risk_brace',
      surgical_alert: 'risk_surg', postSurgery: 'risk_post'
    };
    return map[risk] || risk;
  }

  function riskColor(risk) {
    var c = { observation:'#4CAF50', exercise:'#2E86AB', bracing:'#FF9800',
              surgical_alert:'#E53935', postSurgery:'#7B1FA2' };
    return c[risk] || '#666';
  }

  function severityBadge(cobb) {
    if (cobb < 20) return { key: 'sev_mild', color: '#4CAF50' };
    if (cobb < 35) return { key: 'sev_moderate', color: '#FF9800' };
    if (cobb < 50) return { key: 'sev_severe', color: '#E53935' };
    return { key: 'sev_very_severe', color: '#B71C1C' };
  }

  // ── 期間→月数 ─────────────────────────
  var DURATION_MONTHS = { short: 6, medium: 18, long: 36 };

  // ── フェーズ構成（期間対応） ────────────────
  var PHASE_COLORS = {
    initial: '#26A69A', intermediate: '#2E86AB', advanced: '#7E57C2',
    maintenance: '#66BB6A', acute: '#EF5350', recovery: '#26A69A',
    strengthening: '#2E86AB', return: '#66BB6A'
  };

  // riskKey: obs/ex/br/sa/ps  phaseId で i18n参照
  var RISK_KEY_MAP = {
    observation: 'obs', exercise: 'ex', bracing: 'br',
    surgical_alert: 'sa', postSurgery: 'ps'
  };

  function buildPhases(risk, totalMonths) {
    var rk = RISK_KEY_MAP[risk];
    if (risk === 'postSurgery') return buildPostSurgeryPhases(totalMonths, rk);
    if (totalMonths <= 6) return buildShortPhases(risk, rk);
    if (totalMonths <= 18) return buildMediumPhases(risk, rk);
    return buildLongPhases(risk, rk);
  }

  function ph(id, rk, start, end) {
    var i18nKey = rk + '_' + id;
    var data = I18N.phase(i18nKey);
    return {
      id: id,
      i18nKey: i18nKey,
      name: data ? data.n : id,
      start: start,
      end: end,
      color: PHASE_COLORS[id] || '#888',
      goals: data ? data.g : []
    };
  }

  function buildShortPhases(risk, rk) {
    return [
      ph('initial', rk, 1, 3),
      ph(risk === 'observation' ? 'maintenance' : 'intermediate', rk, 4, 6)
    ];
  }

  function buildMediumPhases(risk, rk) {
    return [
      ph('initial', rk, 1, 6),
      ph('intermediate', rk, 7, 12),
      ph(risk === 'observation' ? 'maintenance' : 'advanced', rk, 13, 18)
    ];
  }

  function buildLongPhases(risk, rk) {
    return [
      ph('initial', rk, 1, 6),
      ph('intermediate', rk, 7, 18),
      ph('advanced', rk, 19, 30),
      ph('maintenance', rk, 31, 36)
    ];
  }

  function buildPostSurgeryPhases(totalMonths, rk) {
    if (totalMonths <= 6) {
      return [ ph('acute', rk, 1, 3), ph('recovery', rk, 4, 6) ];
    }
    if (totalMonths <= 18) {
      return [ ph('acute', rk, 1, 3), ph('recovery', rk, 4, 9), ph('strengthening', rk, 10, 18) ];
    }
    return [
      ph('acute', rk, 1, 3), ph('recovery', rk, 4, 12),
      ph('strengthening', rk, 13, 24), ph('return', rk, 25, 36)
    ];
  }

  // ── エクササイズ選択 ──────────────────────
  function mapPhaseToExercisePhase(phaseId, risk) {
    if (risk === 'postSurgery') return phaseId;
    return { initial:'initial', intermediate:'intermediate', advanced:'advanced', maintenance:'maintenance' }[phaseId] || phaseId;
  }

  function selectExercises(params) {
    var curveType = params.curveType, phaseId = params.phaseId, risk = params.risk;
    var cobb = params.cobbAngle, complications = params.complications || [];
    var exPhase = mapPhaseToExercisePhase(phaseId, risk);

    if (risk === 'postSurgery') return selectPostSurgeryExercises(exPhase, curveType);

    var pool = EXERCISES.filter(function (ex) {
      return ex.method !== 'postSurgery' &&
        ex.curveTypes.indexOf(curveType) !== -1 &&
        ex.phases.indexOf(exPhase) !== -1;
    });
    var maxDiff = exPhase === 'initial' ? 2 : 3;
    pool = pool.filter(function (ex) { return ex.difficulty <= maxDiff; });

    var schrothR = cobb >= 35 ? 0.5 : (cobb >= 25 ? 0.4 : 0.3);
    var clinicCount = 10, homeCount = 6;
    var byMethod = { schroth:[], seas:[], core:[], other:[] };
    pool.forEach(function (ex) {
      if (ex.method === 'schroth') byMethod.schroth.push(ex);
      else if (ex.method === 'seas') byMethod.seas.push(ex);
      else if (ex.method === 'core') byMethod.core.push(ex);
      else byMethod.other.push(ex);
    });

    var priorityIds = [];
    if (complications.indexOf('pain') !== -1) priorityIds.push('str-cat-cow','str-child-pose','br-diaphragm');
    if (complications.indexOf('respiratory') !== -1) priorityIds.push('sch-rab','br-diaphragm','br-rib-expansion');
    if (complications.indexOf('psycho') !== -1) priorityIds.push('seas-mirror','br-diaphragm');

    var clinic = [], usedIds = {};
    priorityIds.forEach(function (id) {
      if (clinic.length >= clinicCount) return;
      var ex = findEx(id, pool);
      if (ex && !usedIds[ex.id]) { clinic.push(ex); usedIds[ex.id] = true; }
    });
    var targets = [
      { list: byMethod.schroth, count: Math.round(clinicCount * schrothR) },
      { list: byMethod.seas, count: Math.round(clinicCount * 0.25) },
      { list: byMethod.core, count: Math.round(clinicCount * 0.2) },
      { list: byMethod.other, count: Math.round(clinicCount * (1 - schrothR - 0.45)) }
    ];
    targets.forEach(function (t) {
      var a = 0;
      for (var i = 0; i < t.list.length && a < t.count && clinic.length < clinicCount; i++) {
        if (!usedIds[t.list[i].id]) { clinic.push(t.list[i]); usedIds[t.list[i].id] = true; a++; }
      }
    });

    var home = [];
    var homePool = pool.filter(function (ex) { return ex.difficulty <= 2 && !usedIds[ex.id]; });
    ['seas','stretching','breathing','core'].forEach(function (m) {
      for (var i = 0; i < homePool.length && home.length < homeCount; i++) {
        if (homePool[i].method === m && !usedIds[homePool[i].id]) { home.push(homePool[i]); usedIds[homePool[i].id] = true; }
      }
    });
    ['seas-self-correction','sch-rab','br-diaphragm'].forEach(function (id) {
      if (home.length >= homeCount) return;
      var ex = findEx(id, pool);
      if (ex && !usedIds[ex.id]) home.push(ex);
    });
    return { clinic: clinic, home: home };
  }

  function selectPostSurgeryExercises(phase, curveType) {
    var postEx = EXERCISES.filter(function (ex) { return ex.method === 'postSurgery' && ex.phases.indexOf(phase) !== -1; });
    var generalEx = [];
    if (phase !== 'acute') {
      var mp = phase === 'recovery' ? 'initial' : phase === 'strengthening' ? 'intermediate' : 'advanced';
      generalEx = EXERCISES.filter(function (ex) {
        return ex.method !== 'postSurgery' && ex.curveTypes.indexOf(curveType) !== -1 &&
          ex.phases.indexOf(mp) !== -1 && ex.difficulty <= (phase === 'recovery' ? 1 : 2);
      });
    }
    return { clinic: postEx.concat(generalEx).slice(0, 10), home: generalEx.filter(function (e) { return e.difficulty <= 1; }).slice(0, 4) };
  }

  function findEx(id, pool) {
    for (var i = 0; i < pool.length; i++) { if (pool[i].id === id) return pool[i]; }
    return null;
  }

  // ── 評価スケジュール ──────────────────────
  function generateEvals(risk, isGrowing, totalMonths) {
    var evals = [];
    if (risk === 'postSurgery') {
      [1,3,6,12,24,36].forEach(function (m) {
        if (m <= totalMonths) {
          evals.push({ month: m, label: m + 'M', type: (m >= 6 && m <= 24) ? 'xray' : 'medical' });
        }
      });
    } else if (isGrowing) {
      for (var m = 4; m <= totalMonths; m += 4) {
        evals.push({ month: m, label: m + 'M', type: (m % 12 === 0) ? 'xray' : 'medical' });
      }
    } else {
      [6,12,18,24,36].forEach(function (m) {
        if (m <= totalMonths) evals.push({ month: m, label: m + 'M', type: m % 12 === 0 ? 'xray' : 'medical' });
      });
    }
    return evals;
  }

  // ── マイルストーン ──────────────────────
  function generateMilestones(risk, totalMonths) {
    var rk = RISK_KEY_MAP[risk] || 'ex';
    var labels = I18N.milestone(rk);
    // 月割り当て
    var monthsMap = {
      obs: [1,3,6], ex: [1,3,6,12,18,24,36], br: [1,3,6,12,18,24,30,36],
      sa: [1,3,6,12,18,24,36], ps: [1,3,6,12,18,24]
    };
    var months = monthsMap[rk] || [];
    var ms = [];
    for (var i = 0; i < labels.length && i < months.length; i++) {
      if (months[i] <= totalMonths) ms.push({ month: months[i], label: labels[i] });
    }
    return ms;
  }

  // ── 装具指導（i18n対応） ──────────────────
  function getBracingGuidance(phaseId, isGrowing) {
    if (!isGrowing) return null;
    var data = I18N.bracingGuide(phaseId);
    if (!data) return null;
    return { wearingHours: data.h, notes: data.n };
  }

  // ── QOL（i18n対応） ──────────────────────
  function generateQol(input) {
    var recs = [], comp = input.complications || [];
    var keys = ['posture'];
    if (input.age <= 17) keys.push('school');
    if (comp.indexOf('psycho') !== -1 || comp.indexOf('appearance') !== -1) keys.push('psycho');
    if (comp.indexOf('pain') !== -1) keys.push('pain');
    if (comp.indexOf('respiratory') !== -1) keys.push('resp');
    if (comp.indexOf('adl') !== -1) keys.push('adl');
    keys.push('sport');
    keys.forEach(function (k) {
      var item = I18N.qolItem(k);
      if (item) recs.push({ title: item.t, detail: item.d });
    });
    return recs;
  }

  // ── 通院頻度 ──────────────────────────
  function visitFreqKey(risk) {
    var map = { observation:'vf_obs', exercise:'vf_ex', bracing:'vf_brace',
                surgical_alert:'vf_surg', postSurgery:'vf_post' };
    return map[risk] || 'vf_ex';
  }

  // ── カーブタイプラベル ──────────────────────
  function curveTypeLabelKey(type) {
    return 'ct_' + type;
  }

  function treatmentLabelKey(t) {
    var map = { none:'tx_none', exercise:'tx_exercise', bracing:'tx_bracing', postSurgery:'tx_post' };
    return map[t] || t;
  }

  // ── メイン生成 ──────────────────────────
  function generate(input) {
    var risk = classifyRisk(input);
    var sev = severityBadge(input.cobbAngle);
    var isGrowing = input.age <= 17;
    var totalMonths = DURATION_MONTHS[input.duration] || 36;
    var phases = buildPhases(risk, totalMonths);
    var evaluations = generateEvals(risk, isGrowing, totalMonths);
    var milestones = generateMilestones(risk, totalMonths);
    var qol = generateQol(input);

    var phaseDetails = phases.map(function (phase) {
      var exercises = selectExercises({
        curveType: input.curveType, phaseId: phase.id,
        risk: risk, cobbAngle: input.cobbAngle, complications: input.complications
      });
      var bg = (risk === 'bracing') ? getBracingGuidance(phase.id, isGrowing) : null;
      var pe = evaluations.filter(function (e) { return e.month >= phase.start && e.month <= phase.end; });
      var pm = milestones.filter(function (m) { return m.month >= phase.start && m.month <= phase.end; });
      return {
        id: phase.id, i18nKey: phase.i18nKey, name: phase.name,
        startMonth: phase.start, endMonth: phase.end, color: phase.color,
        goals: phase.goals, clinicExercises: exercises.clinic,
        homeExercises: exercises.home, bracingGuidance: bg,
        evaluations: pe, milestones: pm
      };
    });

    return {
      risk: risk,
      riskLabelKey: riskLabelKey(risk),
      riskColor: riskColor(risk),
      severity: sev,
      totalMonths: totalMonths,
      visitFreqKey: visitFreqKey(risk),
      phases: phaseDetails,
      evaluations: evaluations,
      milestones: milestones,
      qol: qol,
      isSurgicalAlert: risk === 'surgical_alert',
      input: input
    };
  }

  return {
    generate: generate,
    classifyRisk: classifyRisk,
    riskColor: riskColor,
    severityBadge: severityBadge,
    curveTypeLabelKey: curveTypeLabelKey,
    treatmentLabelKey: treatmentLabelKey,
    resolveTreatment: resolveTreatment,
    DURATION_MONTHS: DURATION_MONTHS
  };
})();
