/* ======================================================
   progress-tracker.js — KPI計算・進捗管理
   アドヒアランス率・フェーズ進捗・完遂率・Cobb角推移
   ====================================================== */
'use strict';

var ProgressTracker = (function () {

  // ── アドヒアランス率 ────────────────────
  // 実施セッション数 / 期待セッション数
  function adherenceRate(planRecord) {
    if (!planRecord || !planRecord.program) return 0;
    var sessions = planRecord.sessions || [];
    var totalMonths = planRecord.program.totalMonths || 36;
    var currentMonth = _currentMonth(planRecord);
    // 期待: 週2回 × 4週 × 経過月数
    var expectedSessions = Math.max(1, currentMonth * 8);
    var rate = Math.round((sessions.length / expectedSessions) * 100);
    return Math.min(100, rate);
  }

  // ── フェーズ進捗 ─────────────────────
  function phaseProgress(planRecord) {
    if (!planRecord || !planRecord.program) return { current: null, phases: [] };
    var phases = planRecord.program.phases;
    var currentMonth = _currentMonth(planRecord);
    var result = [];
    var currentPhase = null;

    phases.forEach(function (phase) {
      var totalPhaseMonths = phase.endMonth - phase.startMonth + 1;
      var elapsedInPhase = Math.max(0, Math.min(totalPhaseMonths,
        currentMonth - phase.startMonth + 1));
      var pct = Math.round((elapsedInPhase / totalPhaseMonths) * 100);
      var status = 'pending';
      if (currentMonth > phase.endMonth) status = 'completed';
      else if (currentMonth >= phase.startMonth) status = 'active';

      var phaseInfo = {
        id: phase.id,
        name: phase.name,
        startMonth: phase.startMonth,
        endMonth: phase.endMonth,
        status: status,
        percentComplete: Math.min(100, pct)
      };

      if (status === 'active') currentPhase = phaseInfo;
      result.push(phaseInfo);
    });

    return { current: currentPhase, phases: result };
  }

  // ── エクササイズ完遂率 ──────────────────
  function exerciseCompletionRate(planRecord) {
    if (!planRecord || !planRecord.program) return 0;
    var sessions = planRecord.sessions || [];
    if (sessions.length === 0) return 0;

    var totalPrescribed = 0;
    var totalCompleted = 0;

    sessions.forEach(function (s) {
      var prescribed = s.prescribedCount || 0;
      var completed = (s.exercisesCompleted || []).length;
      totalPrescribed += prescribed;
      totalCompleted += completed;
    });

    if (totalPrescribed === 0) return 0;
    return Math.min(100, Math.round((totalCompleted / totalPrescribed) * 100));
  }

  // ── 総合KPIサマリー ───────────────────
  function summary(planRecord) {
    var pp = phaseProgress(planRecord);
    var completedPhases = pp.phases.filter(function (p) { return p.status === 'completed'; }).length;

    return {
      adherence: adherenceRate(planRecord),
      exerciseCompletion: exerciseCompletionRate(planRecord),
      currentPhase: pp.current,
      phasesCompleted: completedPhases,
      phasesTotal: pp.phases.length,
      phaseBreakdown: pp.phases,
      sessionCount: (planRecord && planRecord.sessions) ? planRecord.sessions.length : 0,
      currentMonth: planRecord ? _currentMonth(planRecord) : 0
    };
  }

  // ── Cobb角推移データ ───────────────────
  function cobbTrend(cobbHistory) {
    if (!cobbHistory || cobbHistory.length === 0) return { data: [], change: 0 };
    var data = cobbHistory.map(function (r) {
      return { date: r.date, angle: r.angle, note: r.note || '' };
    });
    var first = data[0].angle;
    var last = data[data.length - 1].angle;
    return {
      data: data,
      change: last - first,
      initial: first,
      latest: last
    };
  }

  // ── ヘルパー ────────────────────────
  function _currentMonth(planRecord) {
    if (!planRecord || !planRecord.startDate) return 1;
    var start = new Date(planRecord.startDate);
    var now = new Date();
    var diffMs = now - start;
    var months = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.44)) + 1;
    return Math.max(1, months);
  }

  return {
    adherenceRate: adherenceRate,
    phaseProgress: phaseProgress,
    exerciseCompletionRate: exerciseCompletionRate,
    summary: summary,
    cobbTrend: cobbTrend
  };
})();
