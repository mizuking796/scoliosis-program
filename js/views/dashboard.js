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
        '<h1 class="dashboard-title">' + t('dash_title') + '</h1>' +
        '<span class="patient-count">' + patients.length + '/' + PatientStore.MAX_PATIENTS + '</span>' +
      '</div>';

    html += '<div class="patient-cards">';
    patients.forEach(function (p) {
      var activePlan = p.plans && p.plans[p.activePlanKey];
      var kpi = activePlan ? ProgressTracker.summary(activePlan) : null;
      var riskColor = ProgramEngine.riskColor(
        ProgramEngine.classifyRisk({
          age: p.age, cobbAngle: p.cobbAngle, risser: p.risser,
          treatment: p.treatment
        })
      );
      var sev = ProgramEngine.severityBadge(p.cobbAngle);

      html += '<div class="patient-card" data-patient="' + p.id + '">' +
        '<div class="patient-card-header">' +
          '<span class="patient-id">' + p.id + '</span>' +
          '<span class="patient-name">' + _esc(p.name || t('unnamed')) + '</span>' +
          '<span class="badge-sm" style="background:' + sev.color + '">' + p.cobbAngle + '\u00B0</span>' +
        '</div>' +
        '<div class="patient-card-meta">' +
          '<span>' + p.age + (I18N.getLang() === 'ja' ? '\u6B73' : '') + ' ' + (p.sex === 'female' ? t('female') : t('male')) + '</span>' +
          '<span>' + t(ProgramEngine.curveTypeLabelKey(p.curveType)) + '</span>' +
          '<span class="plan-badge">Plan ' + (p.activePlanKey || '-') + '</span>' +
        '</div>';

      if (kpi) {
        html += '<div class="patient-card-kpi">' +
          '<div class="kpi-bar">' +
            '<div class="kpi-bar-fill" style="width:' + kpi.adherence + '%"></div>' +
          '</div>' +
          '<span class="kpi-label">' + t('kpi_adherence') + ' ' + kpi.adherence + '%</span>' +
        '</div>';
      }

      html += '<div class="patient-card-actions">' +
        '<button class="btn-sm" data-view-patient="' + p.id + '">' + t('dash_detail') + '</button>' +
        '<button class="btn-sm btn-danger-sm" data-delete-patient="' + p.id + '">\u2715</button>' +
      '</div>' +
      '</div>';
    });
    html += '</div>';

    if (PatientStore.canAdd()) {
      html += '<div class="dashboard-actions">' +
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
      btn.addEventListener('click', function () {
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
