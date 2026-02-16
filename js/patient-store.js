/* ======================================================
   patient-store.js — 患者データ管理 (localStorage CRUD)
   最大10名、管理者操作のみ
   ====================================================== */
'use strict';

var PatientStore = (function () {

  var STORAGE_KEY = 'scoliosis_patients';
  var MAX_PATIENTS = 10;
  var _cache = null;

  function _load() {
    if (_cache) return _cache;
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      _cache = raw ? JSON.parse(raw) : [];
    } catch (e) {
      _cache = [];
    }
    return _cache;
  }

  function _save(data) {
    _cache = data;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { /* quota exceeded — silent */ }
  }

  function _nextId() {
    var patients = _load();
    var maxNum = 0;
    patients.forEach(function (p) {
      var n = parseInt(p.id.replace('P', ''), 10);
      if (n > maxNum) maxNum = n;
    });
    var num = maxNum + 1;
    return 'P' + (num < 100 ? ('00' + num).slice(-3) : num);
  }

  function _now() {
    return new Date().toISOString();
  }

  // ── CRUD ────────────────────────────

  function list() {
    return _load().slice();
  }

  function count() {
    return _load().length;
  }

  function canAdd() {
    return count() < MAX_PATIENTS;
  }

  function get(id) {
    var patients = _load();
    for (var i = 0; i < patients.length; i++) {
      if (patients[i].id === id) return patients[i];
    }
    return null;
  }

  function create(input) {
    if (!canAdd()) return null;
    var patients = _load();
    var patient = {
      id: _nextId(),
      name: input.name || '',
      age: input.age,
      sex: input.sex,
      cobbAngle: input.cobbAngle,
      curveType: input.curveType,
      risser: input.risser,
      treatment: input.treatment || [],
      complications: input.complications || [],
      duration: input.duration || 'long',
      activePlanKey: 'A',
      plans: {},
      planSwitchHistory: [],
      cobbHistory: [{ date: _now(), angle: input.cobbAngle, note: 'Initial' }],
      createdAt: _now(),
      updatedAt: _now()
    };
    patients.push(patient);
    _save(patients);
    return patient;
  }

  function update(id, fields) {
    var patients = _load();
    for (var i = 0; i < patients.length; i++) {
      if (patients[i].id === id) {
        Object.keys(fields).forEach(function (k) {
          patients[i][k] = fields[k];
        });
        patients[i].updatedAt = _now();
        _save(patients);
        return patients[i];
      }
    }
    return null;
  }

  function remove(id) {
    var patients = _load();
    var idx = -1;
    for (var i = 0; i < patients.length; i++) {
      if (patients[i].id === id) { idx = i; break; }
    }
    if (idx === -1) return false;
    patients.splice(idx, 1);
    _save(patients);
    return true;
  }

  // ── プラン管理 ─────────────────────────

  function savePlan(patientId, planKey, planRecord) {
    var p = get(patientId);
    if (!p) return null;
    if (!p.plans) p.plans = {};
    p.plans[planKey] = planRecord;
    return update(patientId, { plans: p.plans });
  }

  function switchPlan(patientId, fromKey, toKey, reason) {
    var p = get(patientId);
    if (!p) return null;
    p.planSwitchHistory.push({
      from: fromKey,
      to: toKey,
      date: _now(),
      reason: reason || ''
    });
    p.activePlanKey = toKey;
    return update(patientId, {
      activePlanKey: toKey,
      planSwitchHistory: p.planSwitchHistory
    });
  }

  // ── Cobb角履歴 ─────────────────────────

  function addCobbRecord(patientId, angle, note) {
    var p = get(patientId);
    if (!p) return null;
    p.cobbHistory.push({ date: _now(), angle: angle, note: note || '' });
    return update(patientId, { cobbHistory: p.cobbHistory });
  }

  // ── セッション記録 ───────────────────────

  function addSession(patientId, planKey, session) {
    var p = get(patientId);
    if (!p || !p.plans || !p.plans[planKey]) return null;
    if (!p.plans[planKey].sessions) p.plans[planKey].sessions = [];
    session.date = session.date || _now();
    p.plans[planKey].sessions.push(session);
    return update(patientId, { plans: p.plans });
  }

  function getSessions(patientId, planKey) {
    var p = get(patientId);
    if (!p || !p.plans || !p.plans[planKey]) return [];
    return p.plans[planKey].sessions || [];
  }

  // ── 進捗更新 ────────────────────────────

  function updateProgress(patientId, planKey, progress) {
    var p = get(patientId);
    if (!p || !p.plans || !p.plans[planKey]) return null;
    p.plans[planKey].progress = progress;
    return update(patientId, { plans: p.plans });
  }

  // ── エクスポート ────────────────────────

  function clearAll() {
    _cache = null;
    localStorage.removeItem(STORAGE_KEY);
  }

  return {
    list: list,
    count: count,
    canAdd: canAdd,
    get: get,
    create: create,
    update: update,
    remove: remove,
    savePlan: savePlan,
    switchPlan: switchPlan,
    addCobbRecord: addCobbRecord,
    addSession: addSession,
    getSessions: getSessions,
    updateProgress: updateProgress,
    clearAll: clearAll,
    MAX_PATIENTS: MAX_PATIENTS
  };
})();
