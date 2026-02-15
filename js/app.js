/* ======================================================
   app.js — メインコントローラー
   6ステップ入力 → プログラム生成 → 結果表示
   ====================================================== */

'use strict';

(function () {

  var app = document.getElementById('app');
  var step = 0; // 0=intro, 1=基本, 2=カーブ, 3=骨成熟, 4=合併症, 5=確認, 6=結果
  var history = [];

  // 入力データ
  var input = {
    age: null,
    sex: null,
    cobbAngle: 25,
    curveType: null,
    risser: null,
    treatment: null,
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
      case 6: renderResult(); break;
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

  function goNext() {
    history.push(step);
    step++;
    render();
  }

  function goBack() {
    if (history.length > 0) {
      step = history.pop();
    }
    render();
  }

  function goToStep(s) {
    history.push(step);
    step = s;
    render();
  }

  function progressBar(current, total) {
    var pct = Math.round((current / total) * 100);
    return '<div class="progress-container">' +
      '<div class="progress-bar" style="width:' + pct + '%"></div>' +
      '</div>' +
      '<div class="progress-text">' + current + ' / ' + total + '</div>';
  }

  function navArea(showNext, nextDisabled) {
    var html = '<div class="nav-area">';
    html += '<button class="btn-back" data-action="back">\u2190 \u623B\u308B</button>';
    if (showNext) {
      html += '<button class="btn-primary" data-action="next"' +
        (nextDisabled ? ' disabled style="opacity:0.5;cursor:not-allowed"' : '') +
        '>\u6B21\u3078 \u2192</button>';
    }
    html += '</div>';
    return html;
  }

  // ── Step 0: イントロ ──────────────────

  function renderIntro() {
    app.className = '';
    app.innerHTML =
      '<div class="intro-screen fade-in">' +
        '<div class="intro-icon">\uD83E\uDDB4</div>' +
        '<h1 class="intro-title">\u5074\u5F2A\u75C7\u30EA\u30CF\u30D3\u30EA\u30D7\u30ED\u30B0\u30E9\u30E0<br>\u30B8\u30A7\u30CD\u30EC\u30FC\u30BF\u30FC</h1>' +
        '<p class="intro-subtitle">' +
          '\u60A3\u8005\u60C5\u5831\u3092\u5165\u529B\u3059\u308B\u3068\u3001Schroth\u6CD5\u30FBSEAS\u3092\u4E2D\u5FC3\u3068\u3057\u305F<br>' +
          '\u6700\u592736\u30F6\u6708\u9593\u306E\u30D5\u30A7\u30FC\u30BA\u5225\u904B\u52D5\u7642\u6CD5\u30D7\u30ED\u30B0\u30E9\u30E0\u3092<br>' +
          '\u81EA\u52D5\u751F\u6210\u3057\u307E\u3059\u3002' +
        '</p>' +
        '<div class="intro-features">' +
          '<ul>' +
            '<li>SOSORT 2016\u30AC\u30A4\u30C9\u30E9\u30A4\u30F3\u6E96\u62E0\u306E\u30EA\u30B9\u30AF\u5206\u985E</li>' +
            '<li>40\u7A2E\u4EE5\u4E0A\u306E\u30A8\u30D3\u30C7\u30F3\u30B9\u30D9\u30FC\u30B9\u904B\u52D5\u30E1\u30CB\u30E5\u30FC</li>' +
            '<li>\u30D5\u30A7\u30FC\u30BA\u5225\u30BF\u30A4\u30E0\u30E9\u30A4\u30F3\u8868\u793A</li>' +
            '<li>\u8A55\u4FA1\u30B9\u30B1\u30B8\u30E5\u30FC\u30EB\u30FB\u88C5\u5177\u6307\u5C0E\u30FB\u5FC3\u7406\u30B5\u30DD\u30FC\u30C8</li>' +
            '<li>\u5370\u5237\u5BFE\u5FDC\u306E\u30D7\u30ED\u30B0\u30E9\u30E0\u51FA\u529B</li>' +
          '</ul>' +
        '</div>' +
        '<div class="disclaimer-box">' +
          '<p>\u26A0 \u672C\u30C4\u30FC\u30EB\u306F\u6559\u80B2\u30FB\u30C7\u30E2\u76EE\u7684\u3067\u3059\u3002\u5B9F\u969B\u306E\u6CBB\u7642\u306F\u5FC5\u305A\u5074\u5F2A\u75C7\u5C02\u9580\u306E\u533B\u5E2B\u30FB\u7406\u5B66\u7642\u6CD5\u58EB\u306E\u6307\u5C0E\u306E\u3082\u3068\u3067\u884C\u3063\u3066\u304F\u3060\u3055\u3044\u3002</p>' +
        '</div>' +
        '<button class="btn-primary" data-action="start">\u306F\u3058\u3081\u308B</button>' +
      '</div>';

    bindAction('start', function () {
      step = 1;
      history = [];
      render();
    });
  }

  // ── Step 1: 基本情報 ──────────────────

  function renderStep1() {
    app.className = '';
    var ageVal = input.age || '';
    var html =
      '<div class="step-screen fade-in">' +
        progressBar(1, 5) +
        '<h2 class="step-title">\u57FA\u672C\u60C5\u5831</h2>' +
        '<p class="step-subtitle">\u60A3\u8005\u306E\u5E74\u9F62\u3068\u6027\u5225\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002</p>' +
        '<div class="form-group">' +
          '<label class="form-label">\u5E74\u9F62</label>' +
          '<input type="number" class="form-input" id="age-input" placeholder="\u4F8B: 14" min="5" max="80" value="' + ageVal + '">' +
        '</div>' +
        '<div class="form-group">' +
          '<label class="form-label">\u6027\u5225</label>' +
          '<div class="options-grid-2">' +
            sexBtn('female', '\u5973\u6027') +
            sexBtn('male', '\u7537\u6027') +
          '</div>' +
        '</div>' +
        navArea(true, !input.age || !input.sex) +
      '</div>';
    app.innerHTML = html;

    // イベント
    var ageInput = document.getElementById('age-input');
    ageInput.addEventListener('input', function () {
      var v = parseInt(this.value, 10);
      input.age = (v >= 5 && v <= 80) ? v : null;
      updateNavState();
    });

    bindSexButtons();
    bindAction('back', function () { step = 0; history = []; render(); });
    bindAction('next', function () { if (input.age && input.sex) goNext(); });
  }

  function sexBtn(val, label) {
    var sel = input.sex === val ? ' selected' : '';
    return '<button class="option-btn' + sel + '" data-sex="' + val + '">' +
      '<span class="option-title">' + label + '</span>' +
    '</button>';
  }

  function bindSexButtons() {
    var btns = app.querySelectorAll('[data-sex]');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        input.sex = this.getAttribute('data-sex');
        btns.forEach(function (b) { b.classList.remove('selected'); });
        this.classList.add('selected');
        updateNavState();
      });
    });
  }

  // ── Step 2: カーブ情報 ─────────────────

  function renderStep2() {
    app.className = '';
    var cobb = input.cobbAngle;
    var sev = ProgramEngine.severityBadge(cobb);
    var html =
      '<div class="step-screen fade-in">' +
        progressBar(2, 5) +
        '<h2 class="step-title">\u30AB\u30FC\u30D6\u60C5\u5831</h2>' +
        '<p class="step-subtitle">\u5074\u5F2A\u306ECobb\u89D2\u3068\u30AB\u30FC\u30D6\u30BF\u30A4\u30D7\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002</p>' +
        '<div class="form-group">' +
          '<label class="form-label">Cobb\u89D2</label>' +
          '<div class="slider-value" id="cobb-display">' + cobb + '\u00B0</div>' +
          '<div class="slider-label" id="cobb-severity" style="color:' + sev.color + '">' + sev.label + '</div>' +
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
          '<label class="form-label">\u30AB\u30FC\u30D6\u30BF\u30A4\u30D7</label>' +
          curveTypeOption('thoracic', '\u80F8\u690E\u30AB\u30FC\u30D6', '\u80F8\u690E\u90E8\u306B\u4E3B\u30AB\u30FC\u30D6') +
          curveTypeOption('thoracolumbar', '\u80F8\u8170\u690E\u30AB\u30FC\u30D6', '\u80F8\u690E\u3068\u8170\u690E\u306E\u79FB\u884C\u90E8') +
          curveTypeOption('lumbar', '\u8170\u690E\u30AB\u30FC\u30D6', '\u8170\u690E\u90E8\u306B\u4E3B\u30AB\u30FC\u30D6') +
          curveTypeOption('double', '\u30C0\u30D6\u30EB\u30AB\u30FC\u30D6\uFF08S\u5B57\u578B\uFF09', '\u80F8\u690E\u3068\u8170\u690E\u306B\u305D\u308C\u305E\u308C\u30AB\u30FC\u30D6') +
        '</div>' +
        navArea(true, !input.curveType) +
      '</div>';
    app.innerHTML = html;

    // Cobb角スライダー
    var slider = document.getElementById('cobb-slider');
    slider.addEventListener('input', function () {
      input.cobbAngle = parseInt(this.value, 10);
      var s = ProgramEngine.severityBadge(input.cobbAngle);
      document.getElementById('cobb-display').textContent = input.cobbAngle + '\u00B0';
      var sevEl = document.getElementById('cobb-severity');
      sevEl.textContent = s.label;
      sevEl.style.color = s.color;
    });

    // カーブタイプ
    var curveBtns = app.querySelectorAll('[data-curve]');
    curveBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        input.curveType = this.getAttribute('data-curve');
        curveBtns.forEach(function (b) { b.classList.remove('selected'); });
        this.classList.add('selected');
        updateNavState();
      });
    });

    bindAction('back', goBack);
    bindAction('next', function () { if (input.curveType) goNext(); });
  }

  function curveTypeOption(val, title, desc) {
    var sel = input.curveType === val ? ' selected' : '';
    return '<button class="option-btn' + sel + '" data-curve="' + val + '">' +
      '<span class="option-title">' + title + '</span>' +
      '<span class="option-desc">' + desc + '</span>' +
    '</button>';
  }

  // ── Step 3: 骨成熟度・治療状況 ──────────

  function renderStep3() {
    app.className = '';
    var isAdult = input.age >= 18;
    if (isAdult) input.risser = 5;

    var html =
      '<div class="step-screen fade-in">' +
        progressBar(3, 5) +
        '<h2 class="step-title">\u9AA8\u6210\u719F\u5EA6\u30FB\u6CBB\u7642\u72B6\u6CC1</h2>' +
        '<p class="step-subtitle">' +
          (isAdult ? '\u6210\u4EBA\u306E\u305F\u3081Risser\u30B5\u30A4\u30F3\u306F\u81EA\u52D5\u30675\u306B\u8A2D\u5B9A\u3055\u308C\u3066\u3044\u307E\u3059\u3002' :
           'Risser\u30B5\u30A4\u30F3\uFF08\u9AA8\u7AEF\u9AA8\u5316\u5EA6\uFF09\u3068\u73FE\u5728\u306E\u6CBB\u7642\u72B6\u6CC1\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002') +
        '</p>';

    if (!isAdult) {
      html +=
        '<div class="form-group">' +
          '<label class="form-label">Risser\u30B5\u30A4\u30F3</label>' +
          '<div class="risser-options">';
      for (var r = 0; r <= 5; r++) {
        var sel = input.risser === r ? ' selected' : '';
        html += '<button class="risser-btn' + sel + '" data-risser="' + r + '">' + r + '</button>';
      }
      html += '</div>' +
        '<p class="risser-desc">0: \u672A\u9AA8\u5316\uFF08\u6210\u9577\u771F\u3063\u76DB\u308A\uFF09\u3000' +
        '1-3: \u9AA8\u5316\u9032\u884C\u4E2D\u3000' +
        '4-5: \u9AA8\u5316\u5B8C\u4E86\u8FD1\u3044\u30FB\u5B8C\u4E86</p>' +
        '</div>';
    }

    html +=
      '<div class="form-group">' +
        '<label class="form-label">\u73FE\u5728\u306E\u6CBB\u7642\u72B6\u6CC1</label>' +
        treatmentOption('none', '\u6CBB\u7642\u306A\u3057', '\u7D4C\u904E\u89B3\u5BDF\u306E\u307F') +
        treatmentOption('exercise', '\u904B\u52D5\u7642\u6CD5\u306E\u307F', '\u7406\u5B66\u7642\u6CD5\u58EB\u306E\u6307\u5C0E\u3042\u308A') +
        treatmentOption('bracing', '\u88C5\u5177\u7642\u6CD5\u4E2D', '\u30B3\u30EB\u30BB\u30C3\u30C8\u7B49\u306E\u88C5\u5177\u3092\u4F7F\u7528') +
        treatmentOption('postSurgery', '\u624B\u8853\u5F8C', '\u8131\u690E\u56FA\u5B9A\u8853\u5F8C\u306E\u30EA\u30CF\u30D3\u30EA') +
      '</div>' +
      navArea(true, (isAdult ? false : input.risser === null) || !input.treatment) +
    '</div>';

    app.innerHTML = html;

    // Risserボタン
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

    // 治療状況ボタン
    var treatBtns = app.querySelectorAll('[data-treatment]');
    treatBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        input.treatment = this.getAttribute('data-treatment');
        treatBtns.forEach(function (b) { b.classList.remove('selected'); });
        this.classList.add('selected');
        updateNavState();
      });
    });

    bindAction('back', goBack);
    bindAction('next', function () {
      var risserOk = isAdult || input.risser !== null;
      if (risserOk && input.treatment) goNext();
    });
  }

  function treatmentOption(val, title, desc) {
    var sel = input.treatment === val ? ' selected' : '';
    return '<button class="option-btn' + sel + '" data-treatment="' + val + '">' +
      '<span class="option-title">' + title + '</span>' +
      '<span class="option-desc">' + desc + '</span>' +
    '</button>';
  }

  // ── Step 4: 合併症 ────────────────────

  function renderStep4() {
    app.className = '';
    var items = [
      { val: 'pain', label: '\u75DB\u307F\uFF08\u8170\u80CC\u90E8\u75DB\uFF09' },
      { val: 'respiratory', label: '\u547C\u5438\u6A5F\u80FD\u4F4E\u4E0B' },
      { val: 'appearance', label: '\u5916\u898B\u306E\u5909\u5316\u3078\u306E\u6C17\u304C\u304B\u308A' },
      { val: 'psycho', label: '\u5FC3\u7406\u7684\u30B9\u30C8\u30EC\u30B9\u30FB\u4E0D\u5B89' },
      { val: 'adl', label: 'ADL\uFF08\u65E5\u5E38\u751F\u6D3B\u52D5\u4F5C\uFF09\u306E\u5236\u9650' },
      { val: 'none', label: '\u7279\u306B\u306A\u3057' }
    ];

    var html =
      '<div class="step-screen fade-in">' +
        progressBar(4, 5) +
        '<h2 class="step-title">\u5408\u4F75\u75C7\u30FB\u304A\u56F0\u308A\u3054\u3068</h2>' +
        '<p class="step-subtitle">\u5F53\u3066\u306F\u307E\u308B\u3082\u306E\u3092\u3059\u3079\u3066\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002</p>' +
        '<div class="checkbox-group">';

    items.forEach(function (item) {
      var checked = input.complications.indexOf(item.val) !== -1 ? ' checked' : '';
      html += '<button class="checkbox-btn' + checked + '" data-comp="' + item.val + '">' +
        '<span class="checkbox-icon">\u2713</span>' +
        '<span class="checkbox-text">' + item.label + '</span>' +
      '</button>';
    });

    html += '</div>' + navArea(true, false) + '</div>';
    app.innerHTML = html;

    // チェックボックスロジック
    var compBtns = app.querySelectorAll('[data-comp]');
    compBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var val = this.getAttribute('data-comp');
        if (val === 'none') {
          input.complications = ['none'];
          compBtns.forEach(function (b) { b.classList.remove('checked'); });
          this.classList.add('checked');
        } else {
          // 「なし」を解除
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

  // ── Step 5: 確認画面 ──────────────────

  function renderStep5() {
    app.className = '';
    var sev = ProgramEngine.severityBadge(input.cobbAngle);
    var compLabels = {
      pain: '\u75DB\u307F', respiratory: '\u547C\u5438\u6A5F\u80FD\u4F4E\u4E0B',
      appearance: '\u5916\u898B\u306E\u5909\u5316', psycho: '\u5FC3\u7406\u7684\u30B9\u30C8\u30EC\u30B9',
      adl: 'ADL\u5236\u9650', none: '\u306A\u3057'
    };
    var compStr = input.complications.map(function (c) { return compLabels[c] || c; }).join('\u3001') || '\u672A\u9078\u629E';

    var html =
      '<div class="step-screen fade-in">' +
        progressBar(5, 5) +
        '<h2 class="step-title">\u5165\u529B\u5185\u5BB9\u306E\u78BA\u8A8D</h2>' +
        '<p class="step-subtitle">\u4EE5\u4E0B\u306E\u5185\u5BB9\u3067\u30D7\u30ED\u30B0\u30E9\u30E0\u3092\u751F\u6210\u3057\u307E\u3059\u3002</p>' +
        '<div class="summary-card">' +
          summaryRow('\u5E74\u9F62', input.age + '\u6B73', 1) +
          summaryRow('\u6027\u5225', input.sex === 'female' ? '\u5973\u6027' : '\u7537\u6027', 1) +
          summaryRow('Cobb\u89D2', input.cobbAngle + '\u00B0\uFF08' + sev.label + '\uFF09', 2) +
          summaryRow('\u30AB\u30FC\u30D6\u30BF\u30A4\u30D7', ProgramEngine.curveTypeLabel(input.curveType), 2) +
          summaryRow('Risser\u30B5\u30A4\u30F3', input.risser + '', 3) +
          summaryRow('\u6CBB\u7642\u72B6\u6CC1', ProgramEngine.treatmentLabel(input.treatment), 3) +
          summaryRow('\u5408\u4F75\u75C7', compStr, 4) +
        '</div>' +
        '<div style="text-align:center;margin-top:1.5rem">' +
          '<button class="btn-primary" data-action="generate">\u30D7\u30ED\u30B0\u30E9\u30E0\u3092\u751F\u6210</button>' +
        '</div>' +
        '<div class="nav-area">' +
          '<button class="btn-back" data-action="back">\u2190 \u623B\u308B</button>' +
        '</div>' +
      '</div>';
    app.innerHTML = html;

    // 編集リンク
    app.querySelectorAll('[data-edit]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        goToStep(parseInt(this.getAttribute('data-edit'), 10));
      });
    });

    bindAction('back', goBack);
    bindAction('generate', function () {
      generatedProgram = ProgramEngine.generate(input);
      history.push(step);
      step = 6;
      render();
    });
  }

  function summaryRow(label, value, editStep) {
    return '<div class="summary-row">' +
      '<span class="summary-label">' + label + '</span>' +
      '<span class="summary-value">' + escHtml(value) + '</span>' +
      '<button class="summary-edit" data-edit="' + editStep + '">\u7DE8\u96C6</button>' +
    '</div>';
  }

  // ── Step 6: 結果画面 ──────────────────

  function renderResult() {
    app.className = 'result-mode';
    var p = generatedProgram;
    if (!p) return;

    var html = '<div class="result-screen fade-in">';

    // 印刷用ヘッダー
    html += '<div class="print-header">' +
      '<h1>\u5074\u5F2A\u75C7\u30EA\u30CF\u30D3\u30EA\u30D7\u30ED\u30B0\u30E9\u30E0</h1>' +
      '<p>\u751F\u6210\u65E5: ' + todayStr() + '</p>' +
    '</div>';

    // (A) 概要カード
    html += '<div class="result-overview">' +
      '<h2>\u30D7\u30ED\u30B0\u30E9\u30E0\u6982\u8981</h2>' +
      '<div class="result-badges">' +
        '<span class="badge" style="background:' + p.riskColor + '">' + p.riskLabel + '</span>' +
        '<span class="badge" style="background:' + p.severity.color + '">' + p.severity.label + ' (Cobb ' + p.input.cobbAngle + '\u00B0)</span>' +
      '</div>' +
      '<div class="result-meta">' +
        metaItem('\u5E74\u9F62', p.input.age + '\u6B73') +
        metaItem('\u30AB\u30FC\u30D6', ProgramEngine.curveTypeLabel(p.input.curveType)) +
        metaItem('\u901A\u9662\u983B\u5EA6', p.visitFrequency) +
        metaItem('\u30D7\u30ED\u30B0\u30E9\u30E0\u671F\u9593', p.totalMonths + '\u30F6\u6708') +
      '</div>' +
    '</div>';

    // (D) 手術アラート
    if (p.isSurgicalAlert) {
      html += '<div class="surgical-alert">' +
        '<h3>\u26A0 \u624B\u8853\u691C\u8A0E\u306E\u63A8\u5968</h3>' +
        '<p>Cobb\u89D2' + p.input.cobbAngle + '\u00B0\u306F\u624B\u8853\u9069\u5FDC\u306E\u53EF\u80FD\u6027\u304C\u3042\u308A\u307E\u3059\u3002' +
        '\u5074\u5F2A\u75C7\u5C02\u9580\u306E\u6574\u5F62\u5916\u79D1\u533B\u3078\u306E\u53D7\u8A3A\u3092\u5F37\u304F\u304A\u52E7\u3081\u3057\u307E\u3059\u3002' +
        '\u4EE5\u4E0B\u306E\u30D7\u30ED\u30B0\u30E9\u30E0\u306F\u624B\u8853\u6C7A\u5B9A\u307E\u3067\u306E\u4FDD\u5B58\u7642\u6CD5\u3068\u3057\u3066\u63D0\u6848\u3057\u3066\u3044\u307E\u3059\u3002</p>' +
      '</div>';
    }

    // (B) タイムライン
    html += '<div class="timeline-section">' +
      '<h3>\u30BF\u30A4\u30E0\u30E9\u30A4\u30F3</h3>' +
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
          '<span class="phase-period">' + phase.startMonth + '-' + phase.endMonth + '\u30F6\u6708</span>' +
        '</summary>' +
        '<div class="phase-body">' +
          phaseGoals(phase) +
          phaseExercises('\u901A\u9662\u30A8\u30AF\u30B5\u30B5\u30A4\u30BA', phase.clinicExercises) +
          phaseExercises('\u81EA\u4E3B\u30C8\u30EC\u30FC\u30CB\u30F3\u30B0', phase.homeExercises) +
          phaseBracing(phase.bracingGuidance) +
          phaseEvals(phase.evaluations) +
          phaseMilestones(phase.milestones) +
        '</div>' +
        '</details></div>';
    });
    html += '</div>';

    // (E) QOL・心理サポート
    html += '<div class="qol-section">' +
      '<h3>QOL\u30FB\u751F\u6D3B\u6307\u5C0E</h3>' +
      '<div class="qol-cards">';
    p.qol.forEach(function (q) {
      html += '<div class="qol-card">' +
        '<h4>' + escHtml(q.title) + '</h4>' +
        '<p>' + escHtml(q.detail) + '</p>' +
      '</div>';
    });
    html += '</div></div>';

    // (F) アクション・フッター
    html += '<div class="result-actions">' +
      '<button class="btn-primary" data-action="print">\u5370\u5237</button>' +
      '<button class="btn-secondary" data-action="restart">\u3084\u308A\u76F4\u3059</button>' +
    '</div>';

    html += '<div class="result-footer">' +
      '<p>\u26A0 \u672C\u30D7\u30ED\u30B0\u30E9\u30E0\u306F\u6559\u80B2\u30FB\u30C7\u30E2\u76EE\u7684\u3067\u3059\u3002\u5B9F\u969B\u306E\u6CBB\u7642\u306F\u5FC5\u305A\u5074\u5F2A\u75C7\u5C02\u9580\u306E\u533B\u5E2B\u30FB\u7406\u5B66\u7642\u6CD5\u58EB\u306E\u6307\u5C0E\u306E\u3082\u3068\u3067\u884C\u3063\u3066\u304F\u3060\u3055\u3044\u3002<br>' +
      'SOSORT 2016 \u30AC\u30A4\u30C9\u30E9\u30A4\u30F3\u6E96\u62E0\u3002Schroth\u6CD5\u30FBSEAS\u30D9\u30FC\u30B9\u3002<br>' +
      '\u751F\u6210\u65E5: ' + todayStr() + '</p>' +
    '</div>';

    html += '</div>';
    app.innerHTML = html;

    // タイムラインSVG挿入
    var container = document.getElementById('timeline-container');
    if (container) {
      container.appendChild(TimelineRenderer.render(p));
    }

    // 印刷時にdetails全展開
    bindAction('print', function () {
      app.querySelectorAll('details').forEach(function (d) { d.open = true; });
      setTimeout(function () { window.print(); }, 100);
    });
    bindAction('restart', function () {
      input = { age: null, sex: null, cobbAngle: 25, curveType: null, risser: null, treatment: null, complications: [] };
      generatedProgram = null;
      step = 0;
      history = [];
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
    var html = '<div class="phase-sub"><h4>\u76EE\u6A19</h4><ul class="phase-goals">';
    phase.goals.forEach(function (g) { html += '<li>' + escHtml(g) + '</li>'; });
    html += '</ul></div>';
    return html;
  }

  function phaseExercises(title, exercises) {
    if (!exercises || exercises.length === 0) return '';
    var html = '<div class="phase-sub"><h4>' + title + '\uFF08' + exercises.length + '\u7A2E\uFF09</h4>' +
      '<div class="exercise-list">';
    exercises.forEach(function (ex) {
      html += '<details class="exercise-card">' +
        '<summary>' +
          '<span class="ex-method-tag ' + ex.method + '">' + methodLabel(ex.method) + '</span>' +
          '<span class="ex-name">' + escHtml(ex.name) + '</span>' +
        '</summary>' +
        '<div class="exercise-body">' +
          '<p class="ex-desc">' + escHtml(ex.description) + '</p>' +
          '<div class="ex-prescription">' +
            prescriptionText(ex) +
          '</div>' +
          '<ol>' + ex.procedure.map(function (s) { return '<li>' + escHtml(s) + '</li>'; }).join('') + '</ol>' +
          (ex.caution ? '<div class="ex-caution">\u26A0 ' + escHtml(ex.caution) + '</div>' : '') +
        '</div>' +
      '</details>';
    });
    html += '</div></div>';
    return html;
  }

  function prescriptionText(ex) {
    var parts = [];
    if (ex.sets) parts.push('<strong>' + ex.sets + '\u30BB\u30C3\u30C8</strong>');
    if (ex.reps && ex.reps > 1) parts.push('<strong>' + ex.reps + '\u56DE</strong>');
    if (ex.duration) {
      var d = ex.duration >= 60 ? Math.round(ex.duration / 60) + '\u5206' : ex.duration + '\u79D2';
      parts.push('<strong>' + d + '\u4FDD\u6301</strong>');
    }
    return parts.join(' \u00D7 ') || '\u30BB\u30E9\u30D4\u30B9\u30C8\u6307\u793A\u306B\u5F93\u3046';
  }

  function phaseBracing(guidance) {
    if (!guidance) return '';
    var html = '<div class="phase-sub"><h4>\u88C5\u5177\u6307\u5C0E</h4>' +
      '<div class="bracing-card">' +
        '<h5>\u88C5\u7740\u6642\u9593\u76EE\u6A19</h5>' +
        '<div class="bracing-hours">' + escHtml(guidance.wearingHours) + '</div>' +
        '<ul>';
    guidance.notes.forEach(function (n) { html += '<li>' + escHtml(n) + '</li>'; });
    html += '</ul></div></div>';
    return html;
  }

  function phaseEvals(evals) {
    if (!evals || evals.length === 0) return '';
    var html = '<div class="phase-sub"><h4>\u8A55\u4FA1\u30B9\u30B1\u30B8\u30E5\u30FC\u30EB</h4><div class="eval-list">';
    evals.forEach(function (ev) {
      html += '<div class="eval-item' + (ev.type === 'xray' ? ' xray' : '') + '">' +
        '<span class="eval-month">' + ev.month + 'M</span>' +
        '<span>' + escHtml(ev.label) + '</span>' +
      '</div>';
    });
    html += '</div></div>';
    return html;
  }

  function phaseMilestones(ms) {
    if (!ms || ms.length === 0) return '';
    var html = '<div class="phase-sub"><h4>\u30DE\u30A4\u30EB\u30B9\u30C8\u30FC\u30F3</h4><div class="milestone-list">';
    ms.forEach(function (m) {
      html += '<div class="milestone-item">' +
        '<span class="milestone-month">' + m.month + 'M</span>' +
        '<span>' + escHtml(m.label) + '</span>' +
      '</div>';
    });
    html += '</div></div>';
    return html;
  }

  function methodLabel(method) {
    var labels = {
      schroth: 'Schroth',
      seas: 'SEAS',
      core: '\u30B3\u30A2',
      stretching: '\u30B9\u30C8\u30EC\u30C3\u30C1',
      breathing: '\u547C\u5438',
      postSurgery: '\u8853\u5F8C'
    };
    return labels[method] || method;
  }

  // ── ユーティリティ ────────────────────

  function bindAction(action, handler) {
    var btns = app.querySelectorAll('[data-action="' + action + '"]');
    btns.forEach(function (btn) {
      btn.addEventListener('click', handler);
    });
  }

  function updateNavState() {
    var nextBtn = app.querySelector('[data-action="next"]');
    if (!nextBtn) return;
    var valid = false;
    switch (step) {
      case 1: valid = !!input.age && !!input.sex; break;
      case 2: valid = !!input.curveType; break;
      case 3:
        var risserOk = input.age >= 18 || input.risser !== null;
        valid = risserOk && !!input.treatment;
        break;
      case 4: valid = true; break;
      default: valid = true;
    }
    nextBtn.disabled = !valid;
    nextBtn.style.opacity = valid ? '1' : '0.5';
    nextBtn.style.cursor = valid ? 'pointer' : 'not-allowed';
  }

  function escHtml(str) {
    var d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
  }

  // ── 初期化 ─────────────────────────

  render();

})();
