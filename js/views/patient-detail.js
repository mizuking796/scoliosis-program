/* ======================================================
   views/patient-detail.js — 患者詳細 + KPI + Plan A/B/C/Dタブ
   ====================================================== */
'use strict';

var PatientDetailView = (function () {

  var t = function (k) { return I18N.t(k); };

  function render(params) {
    var app = document.getElementById('app');
    app.className = 'result-mode';
    var patientId = params.id;
    var patient = PatientStore.get(patientId);
    if (!patient) { Router.navigate('dashboard'); return; }

    var activePlan = patient.plans && patient.plans[patient.activePlanKey];
    var kpi = activePlan ? ProgressTracker.summary(activePlan) : null;
    var cobbData = ProgressTracker.cobbTrend(patient.cobbHistory);
    var sev = ProgramEngine.severityBadge(patient.cobbAngle);

    var html = '<div class="patient-detail-screen fade-in">';

    // ヘッダー
    html += '<div class="detail-header">' +
      '<button class="btn-back" data-action="back">' + t('back') + '</button>' +
      '<h1>' + _esc(patient.name || patient.id) + '</h1>' +
    '</div>';

    // 人口統計カード
    html += '<div class="detail-demographics">' +
      '<div class="demo-grid">' +
        _demoItem(t('sum_age'), patient.age + (I18N.getLang() === 'ja' ? '\u6B73' : '')) +
        _demoItem(t('sum_sex'), patient.sex === 'female' ? t('female') : t('male')) +
        _demoItem(t('sum_cobb'), patient.cobbAngle + '\u00B0') +
        _demoItem(t('sum_curve'), t(ProgramEngine.curveTypeLabelKey(patient.curveType))) +
        _demoItem(t('sum_risser'), 'Risser ' + patient.risser) +
        _demoItem(t('sum_duration'), (ProgramEngine.DURATION_MONTHS[patient.duration] || 36) + t('dur_months')) +
      '</div>' +
      '<div class="demo-badges">' +
        '<span class="badge" style="background:' + sev.color + '">' + t(sev.key) + '</span>' +
      '</div>' +
    '</div>';

    // KPIダッシュボード
    if (kpi) {
      html += '<div class="kpi-dashboard">' +
        '<h3>' + t('detail_kpi') + ' (Plan ' + patient.activePlanKey + ')</h3>' +
        '<div class="kpi-grid">' +
          _kpiCard(t('kpi_adherence'), kpi.adherence + '%', kpi.adherence, _kpiColor(kpi.adherence)) +
          _kpiCard(t('kpi_exercise_completion'), kpi.exerciseCompletion + '%', kpi.exerciseCompletion, _kpiColor(kpi.exerciseCompletion)) +
          _kpiCard(t('kpi_sessions'), '' + kpi.sessionCount, -1, '#2E86AB') +
          _kpiCard(t('kpi_phase'), kpi.phasesCompleted + '/' + kpi.phasesTotal,
            Math.round((kpi.phasesCompleted / Math.max(1, kpi.phasesTotal)) * 100), '#7E57C2') +
        '</div>' +
      '</div>';

      // フェーズ進捗バー
      if (kpi.phaseBreakdown && kpi.phaseBreakdown.length > 0) {
        html += '<div class="phase-progress-section">' +
          '<h4>' + t('detail_phase_progress') + '</h4>';
        kpi.phaseBreakdown.forEach(function (ph) {
          var statusIcon = ph.status === 'completed' ? '\u2705' : (ph.status === 'active' ? '\u25B6' : '\u23F3');
          html += '<div class="phase-progress-row">' +
            '<span class="phase-progress-label">' + statusIcon + ' ' + _esc(ph.name) + '</span>' +
            '<div class="phase-progress-bar"><div class="phase-progress-fill" style="width:' + ph.percentComplete + '%"></div></div>' +
            '<span class="phase-progress-pct">' + ph.percentComplete + '%</span>' +
          '</div>';
        });
        html += '</div>';
      }
    }

    // Cobb角推移
    if (cobbData.data.length > 0) {
      html += '<div class="cobb-history-section">' +
        '<h3>' + t('detail_cobb_history') + '</h3>' +
        '<div class="cobb-trend">' +
          '<span class="cobb-initial">' + t('detail_cobb_initial') + ': ' + cobbData.initial + '\u00B0</span>' +
          '<span class="cobb-latest">' + t('detail_cobb_latest') + ': ' + cobbData.latest + '\u00B0</span>' +
          '<span class="cobb-change ' + (cobbData.change <= 0 ? 'improved' : 'worsened') + '">' +
            (cobbData.change <= 0 ? '\u2193' : '\u2191') + ' ' + Math.abs(cobbData.change) + '\u00B0' +
          '</span>' +
        '</div>' +
        '<div id="cobb-chart" class="cobb-chart"></div>' +
        '<div class="cobb-actions">' +
          '<button class="btn-sm" data-action="add-cobb">' + t('detail_add_cobb') + '</button>' +
        '</div>' +
      '</div>';
    }

    // Plan A/B/C/D タブ
    html += '<div class="plan-section">' +
      '<h3>' + t('detail_plans') + '</h3>' +
      '<div class="plan-tab-grid">';
    PlanTemplates.keys().forEach(function (k) {
      var tmpl = PlanTemplates.get(k);
      var hasPlan = patient.plans && patient.plans[k];
      var isActive = k === patient.activePlanKey;
      html += '<div class="plan-tab-card' + (isActive ? ' active' : '') + (hasPlan ? '' : ' empty') + '" data-view-plan="' + k + '">' +
        '<div class="plan-tab-card-header">' +
          '<span class="plan-letter">Plan ' + k + '</span>' +
          (isActive ? '<span class="plan-active-badge">\u2605 ' + t('plan_active') + '</span>' : '') +
        '</div>' +
        '<div class="plan-tab-card-name">' + t(tmpl.nameKey) + '</div>' +
        '<div class="plan-tab-card-desc">' + t(tmpl.descKey) + '</div>' +
      '</div>';
    });
    html += '</div></div>';

    // プラン切替履歴
    if (patient.planSwitchHistory && patient.planSwitchHistory.length > 0) {
      html += '<div class="switch-history-section">' +
        '<h4>' + t('detail_switch_history') + '</h4>' +
        '<div class="switch-history-list">';
      patient.planSwitchHistory.forEach(function (s) {
        var d = new Date(s.date);
        var dateStr = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
        html += '<div class="switch-history-item">' +
          '<span class="switch-date">' + dateStr + '</span>' +
          '<span>Plan ' + s.from + ' \u2192 Plan ' + s.to + '</span>' +
          '<span class="switch-reason">' + _esc(s.reason) + '</span>' +
        '</div>';
      });
      html += '</div></div>';
    }

    // アクション
    html += '<div class="detail-actions">' +
      '<button class="btn-primary" data-action="record-session">' + t('plan_record_session') + '</button>' +
      '<button class="btn-secondary" data-action="regenerate">' + t('detail_regenerate') + '</button>' +
      '<button class="btn-sm btn-danger-sm" data-action="delete-patient">' + t('detail_delete') + '</button>' +
    '</div>';

    html += '</div>';
    app.innerHTML = html;

    // Cobb角チャート描画
    if (cobbData.data.length > 1) _renderCobbChart(cobbData.data);

    // イベントバインド
    _bindAction(app, 'back', function () { Router.navigate('dashboard'); });

    app.querySelectorAll('[data-view-plan]').forEach(function (card) {
      card.addEventListener('click', function () {
        var k = this.getAttribute('data-view-plan');
        if (patient.plans && patient.plans[k]) {
          Router.navigate('plan', { id: patientId, plan: k });
        }
      });
    });

    _bindAction(app, 'record-session', function () {
      Router.navigate('progress', { id: patientId, plan: patient.activePlanKey });
    });

    _bindAction(app, 'regenerate', function () {
      Router.navigate('wizard', { id: patientId });
    });

    _bindAction(app, 'add-cobb', function () {
      var angle = prompt(t('detail_cobb_prompt'));
      if (angle !== null) {
        var a = parseInt(angle, 10);
        if (a >= 0 && a <= 100) {
          var note = prompt(t('detail_cobb_note')) || '';
          PatientStore.addCobbRecord(patientId, a, note);
          render(params);
        }
      }
    });

    _bindAction(app, 'delete-patient', function () {
      if (confirm(t('dash_confirm_delete'))) {
        PatientStore.remove(patientId);
        Router.navigate('dashboard');
      }
    });
  }

  function _renderCobbChart(data) {
    var container = document.getElementById('cobb-chart');
    if (!container || data.length < 2) return;

    var W = 600, H = 150, PAD = 40;
    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

    var angles = data.map(function (d) { return d.angle; });
    var minA = Math.max(0, Math.min.apply(null, angles) - 5);
    var maxA = Math.max.apply(null, angles) + 5;
    var rangeA = maxA - minA || 1;

    var points = data.map(function (d, i) {
      var x = PAD + (i / (data.length - 1)) * (W - PAD * 2);
      var y = H - PAD - ((d.angle - minA) / rangeA) * (H - PAD * 2);
      return { x: x, y: y, angle: d.angle };
    });

    // 線
    var pathD = points.map(function (p, i) { return (i === 0 ? 'M' : 'L') + p.x + ',' + p.y; }).join(' ');
    var path = document.createElementNS(NS, 'path');
    path.setAttribute('d', pathD);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#2E86AB');
    path.setAttribute('stroke-width', '2');
    svg.appendChild(path);

    // 点
    points.forEach(function (p) {
      var c = document.createElementNS(NS, 'circle');
      c.setAttribute('cx', p.x); c.setAttribute('cy', p.y); c.setAttribute('r', '4');
      c.setAttribute('fill', '#2E86AB');
      svg.appendChild(c);
      var txt = document.createElementNS(NS, 'text');
      txt.setAttribute('x', p.x); txt.setAttribute('y', p.y - 8);
      txt.setAttribute('text-anchor', 'middle'); txt.setAttribute('font-size', '10');
      txt.setAttribute('fill', '#444');
      txt.textContent = p.angle + '\u00B0';
      svg.appendChild(txt);
    });

    container.appendChild(svg);
  }

  function _demoItem(label, value) {
    return '<div class="demo-item"><span class="demo-label">' + label + '</span>' +
      '<span class="demo-value">' + _esc(value) + '</span></div>';
  }

  function _kpiCard(label, value, pct, color) {
    var html = '<div class="kpi-card">' +
      '<div class="kpi-value" style="color:' + color + '">' + value + '</div>' +
      '<div class="kpi-label-text">' + label + '</div>';
    if (pct >= 0) {
      html += '<div class="kpi-bar"><div class="kpi-bar-fill" style="width:' + pct + '%;background:' + color + '"></div></div>';
    }
    return html + '</div>';
  }

  function _kpiColor(pct) {
    if (pct >= 80) return '#4CAF50';
    if (pct >= 50) return '#FF9800';
    return '#E53935';
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

  return { render: render };
})();
