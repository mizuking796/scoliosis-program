/* ======================================================
   views/plan-wizard.js — 入力ウィザード（6ステップ+確認+生成）
   新規患者 / 既存患者再生成
   ====================================================== */
'use strict';

var PlanWizardView = (function () {

  var app, step, history, input, editPatientId;
  var t = function (k) { return I18N.t(k); };

  function render(params) {
    app = document.getElementById('app');
    editPatientId = params && params.id || null;

    if (editPatientId) {
      var p = PatientStore.get(editPatientId);
      if (p) {
        input = {
          name: p.name || '', age: p.age, sex: p.sex, duration: p.duration,
          cobbAngle: p.cobbAngle, curveType: p.curveType, risser: p.risser,
          treatment: p.treatment.slice(), complications: p.complications.slice()
        };
      }
    }

    if (!input) {
      input = {
        name: '', age: null, sex: null, duration: null, cobbAngle: 25,
        curveType: null, risser: null, treatment: [], complications: []
      };
    }

    step = step || 0;
    history = history || [];
    _render();
  }

  function reset() {
    step = 0;
    history = [];
    input = null;
    editPatientId = null;
  }

  function _render() {
    app.className = '';
    switch (step) {
      case 0: _renderStep0(); break;
      case 1: _renderStep1(); break;
      case 2: _renderStep2(); break;
      case 3: _renderStep3(); break;
      case 4: _renderStep4(); break;
      case 5: _renderStep5(); break;
      case 6: _renderStep6(); break;
    }
    _animateIn();
  }

  function _animateIn() {
    var s = app.querySelector('.fade-in');
    if (s) { s.classList.remove('fade-in'); void s.offsetWidth; s.classList.add('fade-in'); }
  }

  function _goNext() { history.push(step); step++; _render(); }
  function _goBack() { if (history.length > 0) step = history.pop(); _render(); }
  function _goToStep(s) { history.push(step); step = s; _render(); }

  // ── Step 0: 名前＋基本情報 ──────────────
  function _renderStep0() {
    var ageVal = input.age || '';
    app.innerHTML =
      '<div class="step-screen fade-in">' +
        _langSwitcher() +
        _progressBar(1, 6) +
        '<h2 class="step-title">' + t('s1_title') + '</h2>' +
        '<p class="step-subtitle">' + t('s1_sub') + '</p>' +
        '<div class="form-group">' +
          '<label class="form-label">' + t('patient_name') + '</label>' +
          '<input type="text" class="form-input" id="name-input" placeholder="' + t('patient_name_ph') + '" value="' + _esc(input.name) + '">' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label">' + t('age') + '</label>' +
          '<input type="number" class="form-input" id="age-input" placeholder="' + t('age_ph') + '" min="5" max="80" value="' + ageVal + '">' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label">' + t('sex') + '</label>' +
          '<div class="options-grid-2">' +
            _optBtn('sex', 'female', t('female'), '', input.sex === 'female') +
            _optBtn('sex', 'male', t('male'), '', input.sex === 'male') +
          '</div>' +
        '</div>' +
        _navArea(true, !input.age || !input.sex) +
      '</div>';

    _bindLangSwitcher();
    document.getElementById('name-input').addEventListener('input', function () {
      input.name = this.value;
    });
    document.getElementById('age-input').addEventListener('input', function () {
      var v = parseInt(this.value, 10);
      input.age = (v >= 5 && v <= 80) ? v : null;
      _updateNav();
    });
    _bindSelect('sex', function (v) { input.sex = v; });
    _bindAction('back', function () { reset(); Router.navigate('dashboard'); });
    _bindAction('next', function () { if (input.age && input.sex) _goNext(); });
  }

  // ── Step 1: 期間 ──────────────────────
  function _renderStep1() {
    app.innerHTML =
      '<div class="step-screen fade-in">' +
        _langSwitcher() + _progressBar(2, 6) +
        '<h2 class="step-title">' + t('s2_title') + '</h2>' +
        '<p class="step-subtitle">' + t('s2_sub') + '</p>' +
        '<div class="form-group">' +
          _durOption('short', t('dur_short'), t('dur_short_d'), '6') +
          _durOption('medium', t('dur_medium'), t('dur_medium_d'), '18') +
          _durOption('long', t('dur_long'), t('dur_long_d'), '36') +
        '</div>' +
        _navArea(true, !input.duration) +
      '</div>';

    _bindLangSwitcher();
    _bindSelect('duration', function (v) { input.duration = v; });
    _bindAction('back', _goBack);
    _bindAction('next', function () { if (input.duration) _goNext(); });
  }

  // ── Step 2: カーブ情報 ──────────────────
  function _renderStep2() {
    var cobb = input.cobbAngle;
    var sev = ProgramEngine.severityBadge(cobb);
    app.innerHTML =
      '<div class="step-screen fade-in">' +
        _langSwitcher() + _progressBar(3, 6) +
        '<h2 class="step-title">' + t('s3_title') + '</h2>' +
        '<p class="step-subtitle">' + t('s3_sub') + '</p>' +
        '<div class="form-group">' +
          '<label class="form-label">' + t('cobb') + '</label>' +
          '<div class="slider-value" id="cobb-display">' + cobb + '\u00B0</div>' +
          '<div class="slider-label" id="cobb-severity" style="color:' + sev.color + '">' + t(sev.key) + '</div>' +
          '<div class="slider-container">' +
            '<input type="range" class="form-slider" id="cobb-slider" min="10" max="70" value="' + cobb + '" ' +
              'style="background:linear-gradient(to right,#4CAF50 0%,#4CAF50 16%,#FF9800 16%,#FF9800 42%,#E53935 42%,#E53935 67%,#B71C1C 67%,#B71C1C 100%)">' +
          '</div>' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label">' + t('curve_type') + '</label>' +
          _optBtn('curve', 'thoracic', t('ct_thoracic'), t('ct_thoracic_d'), input.curveType === 'thoracic') +
          _optBtn('curve', 'thoracolumbar', t('ct_thoracolumbar'), t('ct_thoracolumbar_d'), input.curveType === 'thoracolumbar') +
          _optBtn('curve', 'lumbar', t('ct_lumbar'), t('ct_lumbar_d'), input.curveType === 'lumbar') +
          _optBtn('curve', 'double', t('ct_double'), t('ct_double_d'), input.curveType === 'double') +
        '</div>' +
        _navArea(true, !input.curveType) +
      '</div>';

    _bindLangSwitcher();
    document.getElementById('cobb-slider').addEventListener('input', function () {
      input.cobbAngle = parseInt(this.value, 10);
      var s = ProgramEngine.severityBadge(input.cobbAngle);
      document.getElementById('cobb-display').textContent = input.cobbAngle + '\u00B0';
      var el = document.getElementById('cobb-severity');
      el.textContent = t(s.key); el.style.color = s.color;
    });
    _bindSelect('curve', function (v) { input.curveType = v; });
    _bindAction('back', _goBack);
    _bindAction('next', function () { if (input.curveType) _goNext(); });
  }

  // ── Step 3: 骨成熟度＋治療 ───────────────
  function _renderStep3() {
    var isAdult = input.age >= 18;
    if (isAdult) input.risser = 5;

    var html = '<div class="step-screen fade-in">' +
      _langSwitcher() + _progressBar(4, 6) +
      '<h2 class="step-title">' + t('s4_title') + '</h2>' +
      '<p class="step-subtitle">' + (isAdult ? t('s4_sub_adult') : t('s4_sub')) + '</p>';

    if (!isAdult) {
      html += '<div class="form-group"><label class="form-label">' + t('risser') + '</label><div class="risser-options">';
      for (var r = 0; r <= 5; r++) {
        html += '<button class="risser-btn' + (input.risser === r ? ' selected' : '') + '" data-risser="' + r + '">' + r + '</button>';
      }
      html += '</div><p class="risser-desc">' + t('risser_desc') + '</p></div>';
    }

    html += '<div class="form-group"><label class="form-label">' + t('treatment') + '</label>' +
      _treatCheckbox('none', t('tx_none'), t('tx_none_d')) +
      _treatCheckbox('exercise', t('tx_exercise'), t('tx_exercise_d')) +
      _treatCheckbox('bracing', t('tx_bracing'), t('tx_bracing_d')) +
      _treatCheckbox('postSurgery', t('tx_post'), t('tx_post_d')) +
    '</div>' +
    _navArea(true, (isAdult ? false : input.risser === null) || input.treatment.length === 0) +
    '</div>';

    app.innerHTML = html;
    _bindLangSwitcher();

    if (!isAdult) {
      app.querySelectorAll('[data-risser]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          input.risser = parseInt(this.getAttribute('data-risser'), 10);
          app.querySelectorAll('[data-risser]').forEach(function (b) { b.classList.remove('selected'); });
          this.classList.add('selected');
          _updateNav();
        });
      });
    }

    var treatBtns = app.querySelectorAll('[data-treat]');
    treatBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var val = this.getAttribute('data-treat');
        if (val === 'none') {
          input.treatment = ['none'];
          treatBtns.forEach(function (b) { b.classList.remove('checked'); });
          this.classList.add('checked');
        } else {
          input.treatment = input.treatment.filter(function (v) { return v !== 'none'; });
          var nb = app.querySelector('[data-treat="none"]');
          if (nb) nb.classList.remove('checked');
          var idx = input.treatment.indexOf(val);
          if (idx !== -1) { input.treatment.splice(idx, 1); this.classList.remove('checked'); }
          else { input.treatment.push(val); this.classList.add('checked'); }
        }
        _updateNav();
      });
    });

    _bindAction('back', _goBack);
    _bindAction('next', function () {
      var ok = (isAdult || input.risser !== null) && input.treatment.length > 0;
      if (ok) _goNext();
    });
  }

  // ── Step 4: 合併症 ───────────────────
  function _renderStep4() {
    var items = [
      { val: 'pain', key: 'comp_pain' }, { val: 'respiratory', key: 'comp_resp' },
      { val: 'appearance', key: 'comp_appear' }, { val: 'psycho', key: 'comp_psycho' },
      { val: 'adl', key: 'comp_adl' }, { val: 'none', key: 'comp_none' }
    ];
    var html = '<div class="step-screen fade-in">' +
      _langSwitcher() + _progressBar(5, 6) +
      '<h2 class="step-title">' + t('s5_title') + '</h2>' +
      '<p class="step-subtitle">' + t('s5_sub') + '</p><div class="checkbox-group">';

    items.forEach(function (item) {
      var checked = input.complications.indexOf(item.val) !== -1 ? ' checked' : '';
      html += '<button class="checkbox-btn' + checked + '" data-comp="' + item.val + '">' +
        '<span class="checkbox-icon">\u2713</span><span class="checkbox-text">' + t(item.key) + '</span></button>';
    });

    html += '</div>' + _navArea(true, false) + '</div>';
    app.innerHTML = html;
    _bindLangSwitcher();

    var compBtns = app.querySelectorAll('[data-comp]');
    compBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var val = this.getAttribute('data-comp');
        if (val === 'none') {
          input.complications = ['none'];
          compBtns.forEach(function (b) { b.classList.remove('checked'); });
          this.classList.add('checked');
        } else {
          input.complications = input.complications.filter(function (c) { return c !== 'none'; });
          var nb = app.querySelector('[data-comp="none"]');
          if (nb) nb.classList.remove('checked');
          var idx = input.complications.indexOf(val);
          if (idx !== -1) { input.complications.splice(idx, 1); this.classList.remove('checked'); }
          else { input.complications.push(val); this.classList.add('checked'); }
        }
      });
    });
    _bindAction('back', _goBack);
    _bindAction('next', _goNext);
  }

  // ── Step 5: 確認 + 生成 ─────────────────
  function _renderStep5() {
    var sev = ProgramEngine.severityBadge(input.cobbAngle);
    var durLabel = t('dur_' + input.duration) + ' (' + (ProgramEngine.DURATION_MONTHS[input.duration] || 36) + t('dur_months') + ')';
    var treatLabels = input.treatment.map(function (v) { return t(ProgramEngine.treatmentLabelKey(v)); }).join(', ');
    var compMap = { pain:'comp_pain', respiratory:'comp_resp', appearance:'comp_appear', psycho:'comp_psycho', adl:'comp_adl', none:'comp_none' };
    var compStr = input.complications.map(function (c) { return t(compMap[c] || c); }).join(', ') || '-';

    app.innerHTML =
      '<div class="step-screen fade-in">' +
        _langSwitcher() + _progressBar(6, 6) +
        '<h2 class="step-title">' + t('s6_title') + '</h2>' +
        '<p class="step-subtitle">' + t('s6_sub') + '</p>' +
        '<div class="summary-card">' +
          _summaryRow(t('patient_name'), _esc(input.name) || '-', 0) +
          _summaryRow(t('sum_age'), input.age + (I18N.getLang() === 'ja' ? '\u6B73' : ''), 0) +
          _summaryRow(t('sum_sex'), input.sex === 'female' ? t('female') : t('male'), 0) +
          _summaryRow(t('sum_duration'), durLabel, 1) +
          _summaryRow(t('sum_cobb'), input.cobbAngle + '\u00B0 (' + t(sev.key) + ')', 2) +
          _summaryRow(t('sum_curve'), t(ProgramEngine.curveTypeLabelKey(input.curveType)), 2) +
          _summaryRow(t('sum_risser'), input.risser + '', 3) +
          _summaryRow(t('sum_treatment'), treatLabels, 3) +
          _summaryRow(t('sum_comp'), compStr, 4) +
        '</div>' +
        '<div style="text-align:center;margin-top:1.5rem">' +
          '<button class="btn-primary" data-action="generate">' + t('generate') + '</button>' +
        '</div>' +
        '<div class="nav-area"><button class="btn-back" data-action="back">' + t('back') + '</button></div>' +
      '</div>';

    _bindLangSwitcher();
    app.querySelectorAll('[data-edit]').forEach(function (btn) {
      btn.addEventListener('click', function () { _goToStep(parseInt(this.getAttribute('data-edit'), 10)); });
    });
    _bindAction('back', _goBack);
    _bindAction('generate', _generateAndSave);
  }

  // ── Step 6: 生成完了（プラン選択画面） ───────
  function _renderStep6() {
    app.innerHTML =
      '<div class="step-screen fade-in">' +
        '<div style="text-align:center;padding:3rem 0">' +
          '<div style="font-size:3rem;margin-bottom:1rem">\u2705</div>' +
          '<h2>' + t('wizard_complete') + '</h2>' +
          '<p style="margin:1rem 0;color:#636E72">' + t('wizard_complete_desc') + '</p>' +
          '<button class="btn-primary" data-action="go-patient">' + t('wizard_view_patient') + '</button>' +
        '</div>' +
      '</div>';

    _bindAction('go-patient', function () {
      reset();
      Router.navigate('patient', { id: editPatientId });
    });
  }

  // ── 生成＆保存 ──────────────────────
  function _generateAndSave() {
    // 患者を作成 or 更新
    var patient;
    if (editPatientId) {
      patient = PatientStore.update(editPatientId, {
        name: input.name, age: input.age, sex: input.sex,
        cobbAngle: input.cobbAngle, curveType: input.curveType,
        risser: input.risser, treatment: input.treatment,
        complications: input.complications, duration: input.duration
      });
    } else {
      patient = PatientStore.create(input);
      if (!patient) { alert(t('dash_max_reached')); return; }
      editPatientId = patient.id;
    }

    // 4プラン同時生成
    var planKeys = PlanTemplates.keys();
    planKeys.forEach(function (key) {
      var program = ProgramEngine.generate(input, key);
      PatientStore.savePlan(patient.id, key, {
        templateKey: key,
        program: program,
        startDate: new Date().toISOString(),
        progress: { currentMonth: 1 },
        sessions: []
      });
    });

    // 推奨プランを設定
    var recommended = PlanTemplates.recommend(input);
    PatientStore.update(patient.id, { activePlanKey: recommended });

    step = 6;
    _render();
  }

  // ── UIヘルパー ──────────────────────

  function _progressBar(cur, total) {
    var pct = Math.round((cur / total) * 100);
    return '<div class="progress-container"><div class="progress-bar" style="width:' + pct + '%"></div></div>' +
      '<div class="progress-text">' + cur + ' / ' + total + '</div>';
  }

  function _navArea(showNext, disabled) {
    var html = '<div class="nav-area">';
    html += '<button class="btn-back" data-action="back">' + t('back') + '</button>';
    if (showNext) {
      html += '<button class="btn-primary" data-action="next"' +
        (disabled ? ' disabled style="opacity:0.5;cursor:not-allowed"' : '') + '>' + t('next') + '</button>';
    }
    return html + '</div>';
  }

  function _langSwitcher() {
    var langs = I18N.langs();
    var cur = I18N.getLang();
    var html = '<div class="lang-switcher">';
    langs.forEach(function (l) {
      html += '<button class="lang-btn' + (l.code === cur ? ' active' : '') + '" data-lang="' + l.code + '">' + l.label + '</button>';
    });
    return html + '</div>';
  }

  function _bindLangSwitcher() {
    app.querySelectorAll('[data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        I18N.setLang(this.getAttribute('data-lang'));
        document.documentElement.lang = I18N.getLang();
        _render();
      });
    });
  }

  function _optBtn(group, val, title, desc, selected) {
    return '<button class="option-btn' + (selected ? ' selected' : '') + '" data-' + group + '="' + val + '">' +
      '<span class="option-title">' + title + '</span>' +
      (desc ? '<span class="option-desc">' + desc + '</span>' : '') + '</button>';
  }

  function _durOption(val, title, desc, months) {
    return '<button class="option-btn dur-option' + (input.duration === val ? ' selected' : '') + '" data-duration="' + val + '">' +
      '<span class="dur-months">' + months + t('dur_months') + '</span>' +
      '<span class="option-title">' + title + '</span>' +
      '<span class="option-desc">' + desc + '</span></button>';
  }

  function _treatCheckbox(val, title, desc) {
    var checked = input.treatment.indexOf(val) !== -1 ? ' checked' : '';
    return '<button class="checkbox-btn' + checked + '" data-treat="' + val + '">' +
      '<span class="checkbox-icon">\u2713</span><div class="checkbox-content">' +
      '<span class="checkbox-text">' + title + '</span>' +
      '<span class="checkbox-desc">' + desc + '</span></div></button>';
  }

  function _summaryRow(label, value, editStep) {
    return '<div class="summary-row"><span class="summary-label">' + label + '</span>' +
      '<span class="summary-value">' + value + '</span>' +
      '<button class="summary-edit" data-edit="' + editStep + '">' + t('edit') + '</button></div>';
  }

  function _bindSelect(group, setter) {
    app.querySelectorAll('[data-' + group + ']').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setter(this.getAttribute('data-' + group));
        app.querySelectorAll('[data-' + group + ']').forEach(function (b) { b.classList.remove('selected'); });
        this.classList.add('selected');
        _updateNav();
      });
    });
  }

  function _bindAction(action, handler) {
    app.querySelectorAll('[data-action="' + action + '"]').forEach(function (btn) {
      btn.addEventListener('click', handler);
    });
  }

  function _updateNav() {
    var btn = app.querySelector('[data-action="next"]');
    if (!btn) return;
    var valid = false;
    switch (step) {
      case 0: valid = !!input.age && !!input.sex; break;
      case 1: valid = !!input.duration; break;
      case 2: valid = !!input.curveType; break;
      case 3: valid = (input.age >= 18 || input.risser !== null) && input.treatment.length > 0; break;
      default: valid = true;
    }
    btn.disabled = !valid;
    btn.style.opacity = valid ? '1' : '0.5';
    btn.style.cursor = valid ? 'pointer' : 'not-allowed';
  }

  function _esc(str) {
    if (str == null) return '';
    var d = document.createElement('div');
    d.textContent = String(str);
    return d.innerHTML;
  }

  return { render: render, reset: reset };
})();
