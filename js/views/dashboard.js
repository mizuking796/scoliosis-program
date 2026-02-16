/* ======================================================
   views/dashboard.js — 患者一覧ダッシュボード
   空時はイントロ表示、患者カード一覧 + 新規追加
   ====================================================== */
'use strict';

var DashboardView = (function () {

  var t = function (k) { return I18N.t(k); };

  function render(params) {
    var app = document.getElementById('app');
    app.className = '';
    var patients = PatientStore.list();

    if (patients.length === 0) {
      _renderIntro(app);
    } else {
      _renderList(app, patients);
    }
  }

  function _renderIntro(app) {
    var titleLines = t('title').split('\n');
    app.innerHTML =
      '<div class="intro-screen fade-in">' +
        _langSwitcher() +
        '<div class="intro-icon">\uD83E\uDDB4</div>' +
        '<h1 class="intro-title">' + titleLines.join('<br>') + '</h1>' +
        '<p class="intro-subtitle">' + t('intro_sub').replace(/\n/g, '<br>') + '</p>' +
        '<div class="intro-features"><ul>' +
          '<li>' + t('feat1') + '</li>' +
          '<li>' + t('feat2') + '</li>' +
          '<li>' + t('feat3') + '</li>' +
          '<li>' + t('feat4') + '</li>' +
          '<li>' + t('feat5') + '</li>' +
        '</ul></div>' +
        '<div class="disclaimer-box"><p>' + t('disclaimer') + '</p></div>' +
        '<button class="btn-primary" data-action="new-patient">' + t('start') + '</button>' +
        '<div class="version-info">v2.0</div>' +
      '</div>';

    _bindLangSwitcher(app);
    _bindAction(app, 'new-patient', function () {
      Router.navigate('wizard');
    });
  }

  function _renderList(app, patients) {
    var html = '<div class="dashboard-screen fade-in">' +
      _langSwitcher() +
      '<div class="dashboard-header">' +
        '<h1>' + t('dash_title') + '</h1>' +
        '<span class="patient-count">' + patients.length + '/' + PatientStore.MAX_PATIENTS + '</span>' +
      '</div>';

    html += '<div class="patient-list">';
    patients.forEach(function (p) {
      var activePlan = p.plans && p.plans[p.activePlanKey];
      var kpi = activePlan ? ProgressTracker.summary(activePlan) : null;
      var risk = ProgramEngine.classifyRisk({
        age: p.age, cobbAngle: p.cobbAngle, risser: p.risser,
        treatment: p.treatment
      });
      var riskColor = ProgramEngine.riskColor(risk);
      var sev = ProgramEngine.severityBadge(p.cobbAngle);

      html += '<div class="p-card" data-patient="' + p.id + '">' +
        '<div class="p-card-risk" style="background:' + riskColor + '"></div>' +
        '<div class="p-card-body">' +
          '<div class="p-card-top">' +
            '<div class="p-card-identity">' +
              '<span class="p-card-name">' + _esc(p.name || t('unnamed')) + '</span>' +
              '<span class="p-card-id">' + p.id + '</span>' +
            '</div>' +
            '<span class="p-card-cobb" style="background:' + sev.color + '">' + p.cobbAngle + '\u00B0</span>' +
          '</div>' +
          '<div class="p-card-meta">' +
            '<span class="p-card-tag">' + p.age + (I18N.getLang() === 'ja' ? '\u6B73' : '') + '</span>' +
            '<span class="p-card-tag">' + (p.sex === 'female' ? t('female') : t('male')) + '</span>' +
            '<span class="p-card-tag">' + t(ProgramEngine.curveTypeLabelKey(p.curveType)) + '</span>' +
            '<span class="p-card-plan">Plan ' + (p.activePlanKey || '-') + '</span>' +
          '</div>';

      if (kpi) {
        html += '<div class="p-card-kpi">' +
          '<div class="p-card-kpi-header">' +
            '<span class="p-card-kpi-label">' + t('kpi_adherence') + '</span>' +
            '<span class="p-card-kpi-value">' + kpi.adherence + '%</span>' +
          '</div>' +
          '<div class="p-card-kpi-bar"><div class="p-card-kpi-fill" style="width:' + kpi.adherence + '%;background:' + (kpi.adherence >= 80 ? '#4CAF50' : kpi.adherence >= 50 ? '#FF9800' : '#E53935') + '"></div></div>' +
        '</div>';
      }

      html += '<div class="p-card-actions">' +
        '<button class="p-card-btn-detail" data-view-patient="' + p.id + '">' + t('dash_detail') + '</button>' +
        '<button class="p-card-btn-delete" data-delete-patient="' + p.id + '" title="' + t('dash_confirm_delete') + '">\u2715</button>' +
      '</div>' +
      '</div></div>';
    });
    html += '</div>';

    if (PatientStore.canAdd()) {
      html += '<div class="dashboard-add">' +
        '<button class="btn-primary" data-action="new-patient">+ ' + t('dash_add_patient') + '</button>' +
      '</div>';
    }

    html += '</div>';
    app.innerHTML = html;

    _bindLangSwitcher(app);
    _bindAction(app, 'new-patient', function () {
      Router.navigate('wizard');
    });

    app.querySelectorAll('[data-view-patient]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        Router.navigate('patient', { id: this.getAttribute('data-view-patient') });
      });
    });

    app.querySelectorAll('[data-patient]').forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('[data-view-patient]') || e.target.closest('[data-delete-patient]')) return;
        Router.navigate('patient', { id: this.getAttribute('data-patient') });
      });
    });

    app.querySelectorAll('[data-delete-patient]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var id = this.getAttribute('data-delete-patient');
        if (confirm(t('dash_confirm_delete'))) {
          PatientStore.remove(id);
          render();
        }
      });
    });
  }

  // ── 共通ヘルパー ────────────────────

  function _langSwitcher() {
    var langs = I18N.langs();
    var cur = I18N.getLang();
    var html = '<div class="lang-switcher">';
    langs.forEach(function (l) {
      var sel = l.code === cur ? ' active' : '';
      html += '<button class="lang-btn' + sel + '" data-lang="' + l.code + '">' + l.label + '</button>';
    });
    html += '</div>';
    return html;
  }

  function _bindLangSwitcher(app) {
    app.querySelectorAll('[data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        I18N.setLang(this.getAttribute('data-lang'));
        document.documentElement.lang = I18N.getLang();
        render();
      });
    });
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
