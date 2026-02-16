/* ======================================================
   loader.js — 動的スクリプトローダー（進捗表示付き）
   31ファイルを順次ロードし、%でプログレスバーを更新
   ====================================================== */
'use strict';

(function () {
  var scripts = [
    'js/i18n.js',
    'js/exercises/_registry.js',
    'js/exercises/schroth.js',
    'js/exercises/seas.js',
    'js/exercises/core.js',
    'js/exercises/stretching.js',
    'js/exercises/breathing.js',
    'js/exercises/post-surgery.js',
    'js/exercises/lyon.js',
    'js/exercises/bspts.js',
    'js/exercises/dobomed.js',
    'js/exercises/side-shift.js',
    'js/exercises/fits.js',
    'js/exercises/pilates.js',
    'js/exercises/yoga.js',
    'js/exercises/tai-chi.js',
    'js/exercises/manual.js',
    'js/exercises/aquatic.js',
    'js/exercises/psychosocial.js',
    'js/i18n-exercises.js',
    'js/plan-templates.js',
    'js/program-engine.js',
    'js/patient-store.js',
    'js/progress-tracker.js',
    'js/timeline-renderer.js',
    'js/router.js',
    'js/views/dashboard.js',
    'js/views/plan-wizard.js',
    'js/views/plan-view.js',
    'js/views/patient-detail.js',
    'js/views/progress-entry.js',
    'js/app.js'
  ];

  var total = scripts.length;
  var barEl = document.getElementById('loading-bar');
  var pctEl = document.getElementById('loading-pct');

  function update(loaded) {
    var pct = Math.round((loaded / total) * 100);
    if (barEl) barEl.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = function () { reject(new Error('Failed to load: ' + src)); };
      document.body.appendChild(s);
    });
  }

  async function loadAll() {
    for (var i = 0; i < total; i++) {
      await loadScript(scripts[i]);
      update(i + 1);
    }
    // ロード完了 → オーバーレイをフェードアウト
    var overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.classList.add('fade-out');
      setTimeout(function () { overlay.remove(); }, 300);
    }
  }

  update(0);
  loadAll().catch(function (err) {
    var titleEl = document.querySelector('.loading-title');
    if (titleEl) titleEl.textContent = 'Load error: ' + err.message;
  });
})();
