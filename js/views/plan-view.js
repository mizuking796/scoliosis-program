/* ======================================================
   views/plan-view.js — プラン表示 + プラン切替
   タイムライン + フェーズ詳細 + エクササイズ一覧
   ====================================================== */
'use strict';

var PlanView = (function () {

  var t = function (k) { return I18N.t(k); };

  function render(params) {
    var app = document.getElementById('app');
    app.className = 'result-mode';
    var patientId = params.id;
    var planKey = params.plan || 'A';
    var patient = PatientStore.get(patientId);
    if (!patient) { Router.navigate('dashboard'); return; }
    var planRecord = patient.plans && patient.plans[planKey];
    if (!planRecord || !planRecord.program) { Router.navigate('patient', { id: patientId }); return; }

    var p = planRecord.program;
    var kpi = ProgressTracker.summary(planRecord);
    var html = '<div class="result-screen fade-in">';

    // ヘッダー
    html += '<div class="plan-view-header">' +
      '<button class="btn-back" data-action="back">' + t('back') + '</button>' +
      '<h2>' + _esc(patient.name || patient.id) + ' - Plan ' + planKey + '</h2>' +
    '</div>';

    // プラン切替タブ
    html += '<div class="plan-tabs">';
    PlanTemplates.keys().forEach(function (k) {
      var active = k === planKey ? ' active' : '';
      var hasPlan = patient.plans && patient.plans[k];
      html += '<button class="plan-tab' + active + (hasPlan ? '' : ' disabled') + '" data-switch-plan="' + k + '">' +
        'Plan ' + k + (k === patient.activePlanKey ? ' \u2605' : '') + '</button>';
    });
    html += '</div>';

    // テンプレート情報
    var tmpl = PlanTemplates.get(planKey);
    if (tmpl) {
      html += '<div class="plan-template-info">' +
        '<span class="badge" style="background:#2E86AB">' + t(tmpl.nameKey) + '</span>' +
        '<span class="plan-desc">' + t(tmpl.descKey) + '</span>' +
      '</div>';
    }

    // KPIサマリー
    html += '<div class="kpi-summary">' +
      _kpiCard(t('kpi_adherence'), kpi.adherence + '%', kpi.adherence) +
      _kpiCard(t('kpi_exercise_completion'), kpi.exerciseCompletion + '%', kpi.exerciseCompletion) +
      _kpiCard(t('kpi_sessions'), kpi.sessionCount + '', -1) +
      _kpiCard(t('kpi_phase'), kpi.phasesCompleted + '/' + kpi.phasesTotal, Math.round((kpi.phasesCompleted / Math.max(1, kpi.phasesTotal)) * 100)) +
    '</div>';

    // 印刷ヘッダー
    html += '<div class="print-header"><h1>' + t('print_title') + '</h1>' +
      '<p>' + t('res_date') + ': ' + _todayStr() + '</p></div>';

    // 概要カード
    html += '<div class="result-overview">' +
      '<h2>' + t('res_title') + '</h2>' +
      '<div class="result-badges">' +
        '<span class="badge" style="background:' + p.riskColor + '">' + t(p.riskLabelKey) + '</span>' +
        '<span class="badge" style="background:' + p.severity.color + '">' + t(p.severity.key) + ' (Cobb ' + p.input.cobbAngle + '\u00B0)</span>' +
      '</div>' +
      '<div class="result-meta">' +
        _metaItem(t('res_age'), p.input.age + (I18N.getLang() === 'ja' ? '\u6B73' : '')) +
        _metaItem(t('res_curve'), t(ProgramEngine.curveTypeLabelKey(p.input.curveType))) +
        _metaItem(t('res_visit'), t(p.visitFreqKey)) +
        _metaItem(t('res_period'), p.totalMonths + t('dur_months')) +
      '</div></div>';

    // 手術アラート
    if (p.isSurgicalAlert) {
      html += '<div class="surgical-alert"><h3>' + t('res_surgical_title') + '</h3>' +
        '<p>Cobb' + p.input.cobbAngle + '\u00B0' + t('res_surgical_text') + '</p></div>';
    }

    // タイムライン
    html += '<div class="timeline-section">' +
      '<h3>' + t('res_timeline') + '</h3>' +
      '<div class="timeline-svg-wrap" id="timeline-container"></div></div>';

    // フェーズ詳細
    html += '<div class="phases-section">';
    p.phases.forEach(function (phase, idx) {
      html += '<div class="phase-section">' +
        '<details class="phase-details"' + (idx === 0 ? ' open' : '') + '>' +
        '<summary>' +
          '<span class="phase-color-dot" style="background:' + phase.color + '"></span>' +
          phase.name +
          '<span class="phase-period">' + phase.startMonth + '-' + phase.endMonth + t('dur_m') + '</span>' +
        '</summary>' +
        '<div class="phase-body">' +
          _phaseGoals(phase) +
          _phaseExercises(t('res_clinic'), phase.clinicExercises) +
          _phaseExercises(t('res_home'), phase.homeExercises) +
          _phaseBracing(phase.bracingGuidance) +
          _phaseEvals(phase.evaluations) +
          _phaseMilestones(phase.milestones) +
        '</div></details></div>';
    });
    html += '</div>';

    // QOL
    html += '<div class="qol-section"><h3>' + t('res_qol') + '</h3><div class="qol-cards">';
    p.qol.forEach(function (q) {
      html += '<div class="qol-card"><h4>' + _esc(q.title) + '</h4><p>' + _esc(q.detail) + '</p></div>';
    });
    html += '</div></div>';

    // アクション
    html += '<div class="result-actions">' +
      '<button class="btn-primary" data-action="record-session">' + t('plan_record_session') + '</button>' +
      '<button class="btn-secondary" data-action="print">' + t('print') + '</button>';

    if (planKey !== patient.activePlanKey) {
      html += '<button class="btn-secondary" data-action="activate-plan">' + t('plan_activate') + '</button>';
    }

    html += '</div>';

    html += '<div class="result-footer"><p>' + t('res_footer') + '<br>' + t('res_footer2') + '</p></div>';
    html += '</div>';

    app.innerHTML = html;

    // タイムラインSVG挿入
    var container = document.getElementById('timeline-container');
    if (container) container.appendChild(TimelineRenderer.render(p, kpi));

    // イベントバインド
    _bindAction(app, 'back', function () { Router.navigate('patient', { id: patientId }); });

    app.querySelectorAll('[data-switch-plan]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var k = this.getAttribute('data-switch-plan');
        if (patient.plans && patient.plans[k]) {
          Router.navigate('plan', { id: patientId, plan: k });
        }
      });
    });

    _bindAction(app, 'record-session', function () {
      Router.navigate('progress', { id: patientId, plan: planKey });
    });

    _bindAction(app, 'print', function () {
      app.querySelectorAll('details').forEach(function (d) { d.open = true; });
      setTimeout(function () { window.print(); }, 100);
    });

    _bindAction(app, 'activate-plan', function () {
      var reason = prompt(t('plan_switch_reason'));
      if (reason !== null) {
        PatientStore.switchPlan(patientId, patient.activePlanKey, planKey, reason);
        render(params);
      }
    });
  }

  function _kpiCard(label, value, pct) {
    var html = '<div class="kpi-card"><div class="kpi-value">' + value + '</div>' +
      '<div class="kpi-label-text">' + label + '</div>';
    if (pct >= 0) {
      html += '<div class="kpi-bar"><div class="kpi-bar-fill" style="width:' + pct + '%"></div></div>';
    }
    return html + '</div>';
  }

  function _phaseGoals(phase) {
    var html = '<div class="phase-sub"><h4>' + t('res_goals') + '</h4><ul class="phase-goals">';
    phase.goals.forEach(function (g) { html += '<li>' + _esc(g) + '</li>'; });
    return html + '</ul></div>';
  }

  function _phaseExercises(title, exercises) {
    if (!exercises || exercises.length === 0) return '';
    var html = '<div class="phase-sub"><h4>' + title + ' (' + exercises.length + t('n_exercises') + ')</h4><div class="exercise-list">';
    exercises.forEach(function (ex) {
      var name = I18N.exField(ex.id, 'name') || ex.name;
      var desc = I18N.exField(ex.id, 'description') || ex.description;
      var proc = I18N.exField(ex.id, 'procedure') || ex.procedure;
      var caut = I18N.exField(ex.id, 'caution') || ex.caution;
      html += '<details class="exercise-card"><summary>' +
        '<span class="ex-method-tag ' + ex.method + '">' + _methodLabel(ex.method) + '</span>' +
        '<span class="ex-name">' + _esc(name) + '</span></summary>' +
        '<div class="exercise-body">' +
          '<p class="ex-desc">' + _esc(desc) + '</p>' +
          '<div class="ex-prescription">' + _prescriptionText(ex) + '</div>' +
          '<ol>' + (Array.isArray(proc) ? proc : ex.procedure).map(function (s) { return '<li>' + _esc(s) + '</li>'; }).join('') + '</ol>' +
          (caut ? '<div class="ex-caution">\u26A0 ' + _esc(caut) + '</div>' : '') +
        '</div></details>';
    });
    return html + '</div></div>';
  }

  function _phaseBracing(guidance) {
    if (!guidance) return '';
    return '<div class="phase-sub"><h4>' + t('res_bracing') + '</h4>' +
      '<div class="bracing-card"><h5>' + t('res_bracing_hours') + '</h5>' +
      '<div class="bracing-hours">' + _esc(guidance.wearingHours) + '</div>' +
      '<ul>' + guidance.notes.map(function (n) { return '<li>' + _esc(n) + '</li>'; }).join('') + '</ul></div></div>';
  }

  function _phaseEvals(evals) {
    if (!evals || evals.length === 0) return '';
    var html = '<div class="phase-sub"><h4>' + t('res_eval') + '</h4><div class="eval-list">';
    evals.forEach(function (ev) {
      html += '<div class="eval-item' + (ev.type === 'xray' ? ' xray' : '') + '">' +
        '<span class="eval-month">' + ev.month + t('dur_m') + '</span><span>' + _esc(ev.label) + '</span></div>';
    });
    return html + '</div></div>';
  }

  function _phaseMilestones(ms) {
    if (!ms || ms.length === 0) return '';
    var html = '<div class="phase-sub"><h4>' + t('res_milestone') + '</h4><div class="milestone-list">';
    ms.forEach(function (m) {
      html += '<div class="milestone-item"><span class="milestone-month">' + m.month + t('dur_m') + '</span><span>' + _esc(m.label) + '</span></div>';
    });
    return html + '</div></div>';
  }

  function _prescriptionText(ex) {
    var parts = [];
    if (ex.sets) parts.push('<strong>' + ex.sets + t('sets') + '</strong>');
    if (ex.reps && ex.reps > 1) parts.push('<strong>' + ex.reps + t('reps') + '</strong>');
    if (ex.duration) {
      var min = Math.round(ex.duration / 60);
      var d = ex.duration >= 60 ? min + (I18N.getLang() === 'ja' ? '\u5206' : 'min') : ex.duration + (I18N.getLang() === 'ja' ? '\u79D2' : 's');
      parts.push('<strong>' + d + t('hold') + '</strong>');
    }
    return parts.join(' \u00D7 ') || t('therapist');
  }

  function _methodLabel(method) {
    var keys = {
      schroth:'m_schroth', seas:'m_seas', core:'m_core', stretching:'m_stretch',
      breathing:'m_breath', postSurgery:'m_post', lyon:'m_lyon', bspts:'m_bspts',
      dobomed:'m_dobomed', sideShift:'m_sideshift', fits:'m_fits',
      pilates:'m_pilates', yoga:'m_yoga', taiChi:'m_taichi',
      manual:'m_manual', aquatic:'m_aquatic', psychosocial:'m_psycho'
    };
    return t(keys[method] || method);
  }

  function _metaItem(label, value) {
    return '<div class="result-meta-item"><div class="meta-label">' + label + '</div>' +
      '<div class="meta-value">' + _esc(value) + '</div></div>';
  }

  function _bindAction(app, action, handler) {
    app.querySelectorAll('[data-action="' + action + '"]').forEach(function (btn) {
      btn.addEventListener('click', handler);
    });
  }

  function _esc(str) {
    if (str == null) return '';
    var d = document.createElement('div');
    d.textContent = String(str);
    return d.innerHTML;
  }

  function _todayStr() {
    var d = new Date();
    return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
  }

  return { render: render };
})();
