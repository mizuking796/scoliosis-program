/* ======================================================
   views/progress-entry.js — セッション記録入力
   エクササイズ完了チェック + メモ + 保存
   ====================================================== */
'use strict';

var ProgressEntryView = (function () {

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
    var currentPhase = kpi.currentPhase;
    var phaseId = currentPhase ? currentPhase.id : (p.phases[0] && p.phases[0].id);

    // 現フェーズのエクササイズを取得
    var phase = null;
    for (var i = 0; i < p.phases.length; i++) {
      if (p.phases[i].id === phaseId) { phase = p.phases[i]; break; }
    }
    if (!phase) phase = p.phases[0];

    var allExercises = (phase.clinicExercises || []).concat(phase.homeExercises || []);

    var html = '<div class="progress-entry-screen fade-in">';

    // ヘッダー
    html += '<div class="progress-header">' +
      '<button class="btn-back" data-action="back">' + t('back') + '</button>' +
      '<h2>' + t('prog_title') + '</h2>' +
      '<p>' + _esc(patient.name || patient.id) + ' - Plan ' + planKey + '</p>' +
    '</div>';

    // セッション情報
    html += '<div class="session-info-card">' +
      '<div class="session-meta">' +
        '<div class="session-meta-item">' +
          '<label>' + t('prog_date') + '</label>' +
          '<input type="date" id="session-date" value="' + _todayISO() + '">' +
        '</div>' +
        '<div class="session-meta-item">' +
          '<label>' + t('prog_setting') + '</label>' +
          '<select id="session-setting">' +
            '<option value="clinic">' + t('prog_clinic') + '</option>' +
            '<option value="home">' + t('prog_home') + '</option>' +
          '</select>' +
        '</div>' +
        '<div class="session-meta-item">' +
          '<label>' + t('prog_phase') + '</label>' +
          '<span class="phase-indicator" style="background:' + (phase.color || '#2E86AB') + '">' +
            _esc(phase.name) +
          '</span>' +
        '</div>' +
      '</div>' +
    '</div>';

    // エクササイズチェックリスト
    html += '<div class="exercise-checklist">' +
      '<h3>' + t('prog_exercises') + ' (' + allExercises.length + t('n_exercises') + ')</h3>';

    allExercises.forEach(function (ex, idx) {
      var name = I18N.exField(ex.id, 'name') || ex.name;
      html += '<label class="exercise-check-item">' +
        '<input type="checkbox" data-ex-idx="' + idx + '" data-ex-id="' + ex.id + '">' +
        '<span class="ex-check-name">' + _esc(name) + '</span>' +
        '<span class="ex-method-tag ' + ex.method + '">' + _methodLabel(ex.method) + '</span>' +
      '</label>';
    });

    html += '<div class="check-actions">' +
      '<button class="btn-sm" data-action="check-all">' + t('prog_check_all') + '</button>' +
      '<button class="btn-sm" data-action="uncheck-all">' + t('prog_uncheck_all') + '</button>' +
    '</div>';
    html += '</div>';

    // メモ
    html += '<div class="session-notes">' +
      '<label>' + t('prog_notes') + '</label>' +
      '<textarea id="session-notes" rows="3" placeholder="' + t('prog_notes_ph') + '"></textarea>' +
    '</div>';

    // 保存
    html += '<div class="progress-actions">' +
      '<button class="btn-primary" data-action="save-session">' + t('prog_save') + '</button>' +
      '<button class="btn-secondary" data-action="cancel">' + t('back') + '</button>' +
    '</div>';

    // 過去のセッション一覧
    var sessions = PatientStore.getSessions(patientId, planKey);
    if (sessions.length > 0) {
      html += '<div class="session-history">' +
        '<h3>' + t('prog_history') + ' (' + sessions.length + ')</h3>' +
        '<div class="session-list">';
      var recent = sessions.slice(-10).reverse();
      recent.forEach(function (s) {
        var d = new Date(s.date);
        var dateStr = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
        var completed = (s.exercisesCompleted || []).length;
        html += '<div class="session-item">' +
          '<span class="session-date">' + dateStr + '</span>' +
          '<span class="session-setting-badge">' + (s.setting === 'home' ? t('prog_home') : t('prog_clinic')) + '</span>' +
          '<span class="session-completion">' + completed + '/' + (s.prescribedCount || 0) + ' ' + t('n_exercises') + '</span>' +
          (s.notes ? '<span class="session-note-preview">' + _esc(s.notes.substring(0, 30)) + '</span>' : '') +
        '</div>';
      });
      html += '</div></div>';
    }

    html += '</div>';
    app.innerHTML = html;

    // イベントバインド
    _bindAction(app, 'back', function () { Router.navigate('plan', { id: patientId, plan: planKey }); });
    _bindAction(app, 'cancel', function () { Router.navigate('plan', { id: patientId, plan: planKey }); });

    _bindAction(app, 'check-all', function () {
      app.querySelectorAll('.exercise-check-item input').forEach(function (cb) { cb.checked = true; });
    });
    _bindAction(app, 'uncheck-all', function () {
      app.querySelectorAll('.exercise-check-item input').forEach(function (cb) { cb.checked = false; });
    });

    _bindAction(app, 'save-session', function () {
      var date = document.getElementById('session-date').value || _todayISO();
      var setting = document.getElementById('session-setting').value;
      var notes = document.getElementById('session-notes').value.trim();
      var completed = [];
      app.querySelectorAll('.exercise-check-item input:checked').forEach(function (cb) {
        completed.push(cb.getAttribute('data-ex-id'));
      });

      PatientStore.addSession(patientId, planKey, {
        date: date,
        phaseId: phaseId,
        setting: setting,
        exercisesCompleted: completed,
        prescribedCount: allExercises.length,
        notes: notes
      });

      // 成功フィードバック
      var btn = app.querySelector('[data-action="save-session"]');
      if (btn) {
        btn.textContent = t('prog_saved');
        btn.disabled = true;
        setTimeout(function () {
          Router.navigate('plan', { id: patientId, plan: planKey });
        }, 800);
      }
    });
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

  function _todayISO() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  return { render: render };
})();
