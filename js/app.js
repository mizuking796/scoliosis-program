/* ======================================================
   app.js — SPA ブートストラップ
   ルーター登録 + 言語初期化
   ====================================================== */
'use strict';

(function () {
  Router.on('dashboard', DashboardView.render);
  Router.on('wizard', PlanWizardView.render);
  Router.on('patient', PatientDetailView.render);
  Router.on('plan', PlanView.render);
  Router.on('progress', ProgressEntryView.render);

  document.addEventListener('DOMContentLoaded', function () {
    document.documentElement.lang = I18N.getLang();
    Router.start();
  });
})();
