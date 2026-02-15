/* ======================================================
   app.js — メインコントローラー
   7ステップ入力 → プログラム生成 → 結果表示
   i18n対応 / 期間3段階 / 治療複数選択 / イラスト / 言語切替
   ====================================================== */

'use strict';

(function () {

  var app = document.getElementById('app');
  // 0=intro, 1=基本, 2=期間, 3=カーブ, 4=骨成熟+治療, 5=合併症, 6=確認, 7=結果
  var step = 0;
  var history = [];

  var input = {
    age: null,
    sex: null,
    duration: null,     // short/medium/long
    cobbAngle: 25,
    curveType: null,
    risser: null,
    treatment: [],      // 複数選択
    complications: []
  };

  var generatedProgram = null;

  // ── レンダリング ─────────────────────
  function render() {
    switch (step) {
      case 0: renderIntro(); break;
      case 1: renderStep1(); break;
      case 2: renderStep2(); break;
      case 3: renderStep3(); break;
      case 4: renderStep4(); break;
      case 5: renderStep5(); break;
      case 6: renderStep6(); break;
      case 7: renderResult(); break;
    }
    animateIn();
  }

  function animateIn() {
    var screen = app.querySelector('.fade-in');
    if (screen) {
      screen.classList.remove('fade-in');
      void screen.offsetWidth;
      screen.classList.add('fade-in');
    }
  }

  function goNext() { history.push(step); step++; render(); }
  function goBack() { if (history.length > 0) step = history.pop(); render(); }
  function goToStep(s) { history.push(step); step = s; render(); }

  var t = function (k) { return I18N.t(k); };

  function progressBar(current, total) {
    var pct = Math.round((current / total) * 100);
    return '<div class="progress-container">' +
      '<div class="progress-bar" style="width:' + pct + '%"></div>' +
      '</div>' +
      '<div class="progress-text">' + current + ' / ' + total + '</div>';
  }

  function navArea(showNext, nextDisabled) {
    var html = '<div class="nav-area">';
    html += '<button class="btn-back" data-action="back">' + t('back') + '</button>';
    if (showNext) {
      html += '<button class="btn-primary" data-action="next"' +
        (nextDisabled ? ' disabled style="opacity:0.5;cursor:not-allowed"' : '') +
        '>' + t('next') + '</button>';
    }
    html += '</div>';
    return html;
  }

  function langSwitcher() {
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

  function bindLangSwitcher() {
    var btns = app.querySelectorAll('[data-lang]');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        I18N.setLang(this.getAttribute('data-lang'));
        document.documentElement.lang = I18N.getLang();
        render();
      });
    });
  }

  // ── Step 0: イントロ ──────────────────
  function renderIntro() {
    app.className = '';
    var titleLines = t('title').split('\n');
    app.innerHTML =
      '<div class="intro-screen fade-in">' +
        langSwitcher() +
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
        '<button class="btn-primary" data-action="start">' + t('start') + '</button>' +
      '</div>';

    bindLangSwitcher();
    bindAction('start', function () { step = 1; history = []; render(); });
  }

  // ── Step 1: 基本情報 ──────────────────
  function renderStep1() {
    app.className = '';
    var ageVal = input.age || '';
    app.innerHTML =
      '<div class="step-screen fade-in">' +
        langSwitcher() +
        progressBar(1, 6) +
        '<h2 class="step-title">' + t('s1_title') + '</h2>' +
        '<p class="step-subtitle">' + t('s1_sub') + '</p>' +
        '<div class="form-group">' +
          '<label class="form-label">' + t('age') + '</label>' +
          '<input type="number" class="form-input" id="age-input" placeholder="' + t('age_ph') + '" min="5" max="80" value="' + ageVal + '">' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label">' + t('sex') + '</label>' +
          '<div class="options-grid-2">' +
            optBtn('sex', 'female', t('female'), '', input.sex === 'female') +
            optBtn('sex', 'male', t('male'), '', input.sex === 'male') +
          '</div>' +
        '</div>' +
        navArea(true, !input.age || !input.sex) +
      '</div>';

    bindLangSwitcher();
    var ageInput = document.getElementById('age-input');
    ageInput.addEventListener('input', function () {
      var v = parseInt(this.value, 10);
      input.age = (v >= 5 && v <= 80) ? v : null;
      updateNavState();
    });

    bindSelect('sex', function (val) { input.sex = val; });
    bindAction('back', function () { step = 0; history = []; render(); });
    bindAction('next', function () { if (input.age && input.sex) goNext(); });
  }

  // ── Step 2: プログラム期間 ─────────────
  function renderStep2() {
    app.className = '';
    app.innerHTML =
      '<div class="step-screen fade-in">' +
        langSwitcher() +
        progressBar(2, 6) +
        '<h2 class="step-title">' + t('s2_title') + '</h2>' +
        '<p class="step-subtitle">' + t('s2_sub') + '</p>' +
        '<div class="form-group">' +
          durOption('short', t('dur_short'), t('dur_short_d'), '6') +
          durOption('medium', t('dur_medium'), t('dur_medium_d'), '18') +
          durOption('long', t('dur_long'), t('dur_long_d'), '36') +
        '</div>' +
        navArea(true, !input.duration) +
      '</div>';

    bindLangSwitcher();
    bindSelect('duration', function (val) { input.duration = val; });
    bindAction('back', goBack);
    bindAction('next', function () { if (input.duration) goNext(); });
  }

  function durOption(val, title, desc, months) {
    var sel = input.duration === val ? ' selected' : '';
    return '<button class="option-btn dur-option' + sel + '" data-duration="' + val + '">' +
      '<span class="dur-months">' + months + t('dur_months') + '</span>' +
      '<span class="option-title">' + title + '</span>' +
      '<span class="option-desc">' + desc + '</span>' +
    '</button>';
  }

  // ── Step 3: カーブ情報 ─────────────────
  function renderStep3() {
    app.className = '';
    var cobb = input.cobbAngle;
    var sev = ProgramEngine.severityBadge(cobb);
    app.innerHTML =
      '<div class="step-screen fade-in">' +
        langSwitcher() +
        progressBar(3, 6) +
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
          '<div class="severity-band">' +
            '<span style="background:#4CAF50"></span>' +
            '<span style="background:#FF9800"></span>' +
            '<span style="background:#E53935"></span>' +
            '<span style="background:#B71C1C"></span>' +
          '</div>' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label">' + t('curve_type') + '</label>' +
          optBtn('curve', 'thoracic', t('ct_thoracic'), t('ct_thoracic_d'), input.curveType === 'thoracic') +
          optBtn('curve', 'thoracolumbar', t('ct_thoracolumbar'), t('ct_thoracolumbar_d'), input.curveType === 'thoracolumbar') +
          optBtn('curve', 'lumbar', t('ct_lumbar'), t('ct_lumbar_d'), input.curveType === 'lumbar') +
          optBtn('curve', 'double', t('ct_double'), t('ct_double_d'), input.curveType === 'double') +
        '</div>' +
        navArea(true, !input.curveType) +
      '</div>';

    bindLangSwitcher();
    var slider = document.getElementById('cobb-slider');
    slider.addEventListener('input', function () {
      input.cobbAngle = parseInt(this.value, 10);
      var s = ProgramEngine.severityBadge(input.cobbAngle);
      document.getElementById('cobb-display').textContent = input.cobbAngle + '\u00B0';
      var sevEl = document.getElementById('cobb-severity');
      sevEl.textContent = t(s.key);
      sevEl.style.color = s.color;
    });

    bindSelect('curve', function (val) { input.curveType = val; });
    bindAction('back', goBack);
    bindAction('next', function () { if (input.curveType) goNext(); });
  }

  // ── Step 4: 骨成熟度・治療状況 ──────────
  function renderStep4() {
    app.className = '';
    var isAdult = input.age >= 18;
    if (isAdult) input.risser = 5;

    var html =
      '<div class="step-screen fade-in">' +
        langSwitcher() +
        progressBar(4, 6) +
        '<h2 class="step-title">' + t('s4_title') + '</h2>' +
        '<p class="step-subtitle">' + (isAdult ? t('s4_sub_adult') : t('s4_sub')) + '</p>';

    if (!isAdult) {
      html +=
        '<div class="form-group">' +
          '<label class="form-label">' + t('risser') + '</label>' +
          '<div class="risser-options">';
      for (var r = 0; r <= 5; r++) {
        var sel = input.risser === r ? ' selected' : '';
        html += '<button class="risser-btn' + sel + '" data-risser="' + r + '">' + r + '</button>';
      }
      html += '</div>' +
        '<p class="risser-desc">' + t('risser_desc') + '</p></div>';
    }

    // 治療状況（複数選択）
    html +=
      '<div class="form-group">' +
        '<label class="form-label">' + t('treatment') + '</label>' +
        treatmentCheckbox('none', t('tx_none'), t('tx_none_d')) +
        treatmentCheckbox('exercise', t('tx_exercise'), t('tx_exercise_d')) +
        treatmentCheckbox('bracing', t('tx_bracing'), t('tx_bracing_d')) +
        treatmentCheckbox('postSurgery', t('tx_post'), t('tx_post_d')) +
      '</div>' +
      navArea(true, (isAdult ? false : input.risser === null) || input.treatment.length === 0) +
    '</div>';

    app.innerHTML = html;
    bindLangSwitcher();

    if (!isAdult) {
      var risserBtns = app.querySelectorAll('[data-risser]');
      risserBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          input.risser = parseInt(this.getAttribute('data-risser'), 10);
          risserBtns.forEach(function (b) { b.classList.remove('selected'); });
          this.classList.add('selected');
          updateNavState();
        });
      });
    }

    // 治療チェックボックス
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
          var noneBtn = app.querySelector('[data-treat="none"]');
          if (noneBtn) noneBtn.classList.remove('checked');
          var idx = input.treatment.indexOf(val);
          if (idx !== -1) {
            input.treatment.splice(idx, 1);
            this.classList.remove('checked');
          } else {
            input.treatment.push(val);
            this.classList.add('checked');
          }
        }
        updateNavState();
      });
    });

    bindAction('back', goBack);
    bindAction('next', function () {
      var risserOk = isAdult || input.risser !== null;
      if (risserOk && input.treatment.length > 0) goNext();
    });
  }

  function treatmentCheckbox(val, title, desc) {
    var checked = input.treatment.indexOf(val) !== -1 ? ' checked' : '';
    return '<button class="checkbox-btn' + checked + '" data-treat="' + val + '">' +
      '<span class="checkbox-icon">\u2713</span>' +
      '<div class="checkbox-content">' +
        '<span class="checkbox-text">' + title + '</span>' +
        '<span class="checkbox-desc">' + desc + '</span>' +
      '</div>' +
    '</button>';
  }

  // ── Step 5: 合併症 ────────────────────
  function renderStep5() {
    app.className = '';
    var items = [
      { val: 'pain', key: 'comp_pain' },
      { val: 'respiratory', key: 'comp_resp' },
      { val: 'appearance', key: 'comp_appear' },
      { val: 'psycho', key: 'comp_psycho' },
      { val: 'adl', key: 'comp_adl' },
      { val: 'none', key: 'comp_none' }
    ];

    var html =
      '<div class="step-screen fade-in">' +
        langSwitcher() +
        progressBar(5, 6) +
        '<h2 class="step-title">' + t('s5_title') + '</h2>' +
        '<p class="step-subtitle">' + t('s5_sub') + '</p>' +
        '<div class="checkbox-group">';

    items.forEach(function (item) {
      var checked = input.complications.indexOf(item.val) !== -1 ? ' checked' : '';
      html += '<button class="checkbox-btn' + checked + '" data-comp="' + item.val + '">' +
        '<span class="checkbox-icon">\u2713</span>' +
        '<span class="checkbox-text">' + t(item.key) + '</span>' +
      '</button>';
    });

    html += '</div>' + navArea(true, false) + '</div>';
    app.innerHTML = html;
    bindLangSwitcher();

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
          var noneBtn = app.querySelector('[data-comp="none"]');
          if (noneBtn) noneBtn.classList.remove('checked');
          var idx = input.complications.indexOf(val);
          if (idx !== -1) {
            input.complications.splice(idx, 1);
            this.classList.remove('checked');
          } else {
            input.complications.push(val);
            this.classList.add('checked');
          }
        }
      });
    });

    bindAction('back', goBack);
    bindAction('next', goNext);
  }

  // ── Step 6: 確認画面 ──────────────────
  function renderStep6() {
    app.className = '';
    var sev = ProgramEngine.severityBadge(input.cobbAngle);
    var durLabel = t('dur_' + input.duration) + ' (' + (ProgramEngine.DURATION_MONTHS[input.duration] || 36) + t('dur_months') + ')';
    var treatLabels = input.treatment.map(function (v) { return t(ProgramEngine.treatmentLabelKey(v)); }).join(', ');
    var compLabels = {
      pain: 'comp_pain', respiratory: 'comp_resp', appearance: 'comp_appear',
      psycho: 'comp_psycho', adl: 'comp_adl', none: 'comp_none'
    };
    var compStr = input.complications.map(function (c) { return t(compLabels[c] || c); }).join(', ') || '-';

    app.innerHTML =
      '<div class="step-screen fade-in">' +
        langSwitcher() +
        progressBar(6, 6) +
        '<h2 class="step-title">' + t('s6_title') + '</h2>' +
        '<p class="step-subtitle">' + t('s6_sub') + '</p>' +
        '<div class="summary-card">' +
          summaryRow(t('sum_age'), input.age + (I18N.getLang() === 'ja' ? '\u6B73' : ''), 1) +
          summaryRow(t('sum_sex'), input.sex === 'female' ? t('female') : t('male'), 1) +
          summaryRow(t('sum_duration'), durLabel, 2) +
          summaryRow(t('sum_cobb'), input.cobbAngle + '\u00B0 (' + t(sev.key) + ')', 3) +
          summaryRow(t('sum_curve'), t(ProgramEngine.curveTypeLabelKey(input.curveType)), 3) +
          summaryRow(t('sum_risser'), input.risser + '', 4) +
          summaryRow(t('sum_treatment'), treatLabels, 4) +
          summaryRow(t('sum_comp'), compStr, 5) +
        '</div>' +
        '<div style="text-align:center;margin-top:1.5rem">' +
          '<button class="btn-primary" data-action="generate">' + t('generate') + '</button>' +
        '</div>' +
        '<div class="nav-area">' +
          '<button class="btn-back" data-action="back">' + t('back') + '</button>' +
        '</div>' +
      '</div>';

    bindLangSwitcher();
    app.querySelectorAll('[data-edit]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        goToStep(parseInt(this.getAttribute('data-edit'), 10));
      });
    });

    bindAction('back', goBack);
    bindAction('generate', function () {
      generatedProgram = ProgramEngine.generate(input);
      history.push(step);
      step = 7;
      render();
    });
  }

  function summaryRow(label, value, editStep) {
    return '<div class="summary-row">' +
      '<span class="summary-label">' + label + '</span>' +
      '<span class="summary-value">' + escHtml(value) + '</span>' +
      '<button class="summary-edit" data-edit="' + editStep + '">' + t('edit') + '</button>' +
    '</div>';
  }

  // ── Step 7: 結果画面 ──────────────────
  function renderResult() {
    app.className = 'result-mode';
    var p = generatedProgram;
    if (!p) return;

    var html = '<div class="result-screen fade-in">';
    html += langSwitcher();

    // 印刷ヘッダー
    html += '<div class="print-header">' +
      '<h1>' + t('print_title') + '</h1>' +
      '<p>' + t('res_date') + ': ' + todayStr() + '</p>' +
    '</div>';

    // (A) 概要カード
    html += '<div class="result-overview">' +
      '<h2>' + t('res_title') + '</h2>' +
      '<div class="result-badges">' +
        '<span class="badge" style="background:' + p.riskColor + '">' + t(p.riskLabelKey) + '</span>' +
        '<span class="badge" style="background:' + p.severity.color + '">' + t(p.severity.key) + ' (Cobb ' + p.input.cobbAngle + '\u00B0)</span>' +
      '</div>' +
      '<div class="result-meta">' +
        metaItem(t('res_age'), p.input.age + (I18N.getLang() === 'ja' ? '\u6B73' : '')) +
        metaItem(t('res_curve'), t(ProgramEngine.curveTypeLabelKey(p.input.curveType))) +
        metaItem(t('res_visit'), t(p.visitFreqKey)) +
        metaItem(t('res_period'), p.totalMonths + t('dur_months')) +
      '</div>' +
    '</div>';

    // (D) 手術アラート
    if (p.isSurgicalAlert) {
      html += '<div class="surgical-alert">' +
        '<h3>' + t('res_surgical_title') + '</h3>' +
        '<p>Cobb' + p.input.cobbAngle + '\u00B0' + t('res_surgical_text') + '</p>' +
      '</div>';
    }

    // (B) タイムライン
    html += '<div class="timeline-section">' +
      '<h3>' + t('res_timeline') + '</h3>' +
      '<div class="timeline-svg-wrap" id="timeline-container"></div>' +
    '</div>';

    // (C) フェーズ別詳細
    html += '<div class="phases-section">';
    p.phases.forEach(function (phase, idx) {
      var isFirst = idx === 0;
      html += '<div class="phase-section">' +
        '<details class="phase-details"' + (isFirst ? ' open' : '') + '>' +
        '<summary>' +
          '<span class="phase-color-dot" style="background:' + phase.color + '"></span>' +
          phase.name +
          '<span class="phase-period">' + phase.startMonth + '-' + phase.endMonth + t('dur_m') + '</span>' +
        '</summary>' +
        '<div class="phase-body">' +
          phaseGoals(phase) +
          phaseExercises(t('res_clinic'), phase.clinicExercises) +
          phaseExercises(t('res_home'), phase.homeExercises) +
          phaseBracing(phase.bracingGuidance) +
          phaseEvals(phase.evaluations) +
          phaseMilestones(phase.milestones) +
        '</div>' +
        '</details></div>';
    });
    html += '</div>';

    // (E) QOL
    html += '<div class="qol-section">' +
      '<h3>' + t('res_qol') + '</h3>' +
      '<div class="qol-cards">';
    p.qol.forEach(function (q) {
      html += '<div class="qol-card">' +
        '<h4>' + escHtml(q.title) + '</h4>' +
        '<p>' + escHtml(q.detail) + '</p>' +
      '</div>';
    });
    html += '</div></div>';

    // (F) アクション
    html += '<div class="result-actions">' +
      '<button class="btn-primary" data-action="print">' + t('print') + '</button>' +
      '<button class="btn-secondary" data-action="restart">' + t('restart') + '</button>' +
    '</div>';

    html += '<div class="result-footer">' +
      '<p>' + t('res_footer') + '<br>' + t('res_footer2') + '<br>' +
      t('res_date') + ': ' + todayStr() + '</p>' +
    '</div>';

    html += '</div>';
    app.innerHTML = html;
    bindLangSwitcher();

    // タイムラインSVG挿入
    var container = document.getElementById('timeline-container');
    if (container) container.appendChild(TimelineRenderer.render(p));

    bindAction('print', function () {
      app.querySelectorAll('details').forEach(function (d) { d.open = true; });
      setTimeout(function () { window.print(); }, 100);
    });
    bindAction('restart', function () {
      input = { age: null, sex: null, duration: null, cobbAngle: 25, curveType: null, risser: null, treatment: [], complications: [] };
      generatedProgram = null;
      step = 0; history = [];
      render();
    });
  }

  function metaItem(label, value) {
    return '<div class="result-meta-item">' +
      '<div class="meta-label">' + label + '</div>' +
      '<div class="meta-value">' + escHtml(value) + '</div>' +
    '</div>';
  }

  function phaseGoals(phase) {
    var html = '<div class="phase-sub"><h4>' + t('res_goals') + '</h4><ul class="phase-goals">';
    phase.goals.forEach(function (g) { html += '<li>' + escHtml(g) + '</li>'; });
    html += '</ul></div>';
    return html;
  }

  function phaseExercises(title, exercises) {
    if (!exercises || exercises.length === 0) return '';
    var html = '<div class="phase-sub"><h4>' + title + ' (' + exercises.length + t('n_exercises') + ')</h4>' +
      '<div class="exercise-list">';
    exercises.forEach(function (ex) {
      var name = I18N.exField(ex.id, 'n') || ex.name;
      var desc = I18N.exField(ex.id, 'd') || ex.description;
      var proc = I18N.exField(ex.id, 'p') || ex.procedure;
      var caut = I18N.exField(ex.id, 'c') || ex.caution;
      var illust = ExIllust.get(ex.id);

      html += '<details class="exercise-card">' +
        '<summary>' +
          '<span class="ex-method-tag ' + ex.method + '">' + methodLabel(ex.method) + '</span>' +
          '<span class="ex-name">' + escHtml(name) + '</span>' +
        '</summary>' +
        '<div class="exercise-body">' +
          (illust ? '<div class="ex-illust-wrap">' + illust + '</div>' : '') +
          '<p class="ex-desc">' + escHtml(desc) + '</p>' +
          '<div class="ex-prescription">' + prescriptionText(ex) + '</div>' +
          '<ol>' + (Array.isArray(proc) ? proc : ex.procedure).map(function (s) { return '<li>' + escHtml(s) + '</li>'; }).join('') + '</ol>' +
          (caut ? '<div class="ex-caution">\u26A0 ' + escHtml(caut) + '</div>' : '') +
        '</div>' +
      '</details>';
    });
    html += '</div></div>';
    return html;
  }

  function prescriptionText(ex) {
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

  function phaseBracing(guidance) {
    if (!guidance) return '';
    return '<div class="phase-sub"><h4>' + t('res_bracing') + '</h4>' +
      '<div class="bracing-card">' +
        '<h5>' + t('res_bracing_hours') + '</h5>' +
        '<div class="bracing-hours">' + escHtml(guidance.wearingHours) + '</div>' +
        '<ul>' + guidance.notes.map(function (n) { return '<li>' + escHtml(n) + '</li>'; }).join('') + '</ul>' +
      '</div></div>';
  }

  function phaseEvals(evals) {
    if (!evals || evals.length === 0) return '';
    var html = '<div class="phase-sub"><h4>' + t('res_eval') + '</h4><div class="eval-list">';
    evals.forEach(function (ev) {
      html += '<div class="eval-item' + (ev.type === 'xray' ? ' xray' : '') + '">' +
        '<span class="eval-month">' + ev.month + t('dur_m') + '</span>' +
        '<span>' + escHtml(ev.label) + '</span>' +
      '</div>';
    });
    html += '</div></div>';
    return html;
  }

  function phaseMilestones(ms) {
    if (!ms || ms.length === 0) return '';
    var html = '<div class="phase-sub"><h4>' + t('res_milestone') + '</h4><div class="milestone-list">';
    ms.forEach(function (m) {
      html += '<div class="milestone-item">' +
        '<span class="milestone-month">' + m.month + t('dur_m') + '</span>' +
        '<span>' + escHtml(m.label) + '</span>' +
      '</div>';
    });
    html += '</div></div>';
    return html;
  }

  function methodLabel(method) {
    var keys = {
      schroth: 'm_schroth', seas: 'm_seas', core: 'm_core',
      stretching: 'm_stretch', breathing: 'm_breath', postSurgery: 'm_post'
    };
    return t(keys[method] || method);
  }

  // ── 共通ヘルパー ────────────────────
  function optBtn(group, val, title, desc, selected) {
    var sel = selected ? ' selected' : '';
    return '<button class="option-btn' + sel + '" data-' + group + '="' + val + '">' +
      '<span class="option-title">' + title + '</span>' +
      (desc ? '<span class="option-desc">' + desc + '</span>' : '') +
    '</button>';
  }

  function bindSelect(group, setter) {
    var btns = app.querySelectorAll('[data-' + group + ']');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var val = this.getAttribute('data-' + group);
        setter(val);
        btns.forEach(function (b) { b.classList.remove('selected'); });
        this.classList.add('selected');
        updateNavState();
      });
    });
  }

  function bindAction(action, handler) {
    app.querySelectorAll('[data-action="' + action + '"]').forEach(function (btn) {
      btn.addEventListener('click', handler);
    });
  }

  function updateNavState() {
    var nextBtn = app.querySelector('[data-action="next"]');
    if (!nextBtn) return;
    var valid = false;
    switch (step) {
      case 1: valid = !!input.age && !!input.sex; break;
      case 2: valid = !!input.duration; break;
      case 3: valid = !!input.curveType; break;
      case 4:
        var risserOk = input.age >= 18 || input.risser !== null;
        valid = risserOk && input.treatment.length > 0;
        break;
      case 5: valid = true; break;
      default: valid = true;
    }
    nextBtn.disabled = !valid;
    nextBtn.style.opacity = valid ? '1' : '0.5';
    nextBtn.style.cursor = valid ? 'pointer' : 'not-allowed';
  }

  function escHtml(str) {
    if (str == null) return '';
    var d = document.createElement('div');
    d.textContent = String(str);
    return d.innerHTML;
  }

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
  }

  // ── 初期化 ─────────────────────────
  render();

})();
