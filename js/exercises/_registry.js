/* ======================================================
   _registry.js — ExerciseRegistry 集約管理
   各メソッドファイルから register() で登録
   ====================================================== */
'use strict';

var ExerciseRegistry = (function () {
  var _exercises = [];
  var _byId = {};
  var _byMethod = {};

  function register(list) {
    list.forEach(function (ex) {
      if (_byId[ex.id]) return;
      _exercises.push(ex);
      _byId[ex.id] = ex;
      if (!_byMethod[ex.method]) _byMethod[ex.method] = [];
      _byMethod[ex.method].push(ex);
    });
  }

  function all() { return _exercises; }
  function count() { return _exercises.length; }
  function byId(id) { return _byId[id] || null; }
  function byMethod(method) { return _byMethod[method] || []; }

  function methods() {
    return Object.keys(_byMethod);
  }

  function filter(opts) {
    var pool = _exercises;
    if (opts.method) pool = pool.filter(function (e) { return e.method === opts.method; });
    if (opts.curveType) pool = pool.filter(function (e) { return e.curveTypes.indexOf(opts.curveType) !== -1; });
    if (opts.phase) pool = pool.filter(function (e) { return e.phases.indexOf(opts.phase) !== -1; });
    if (opts.maxDifficulty) pool = pool.filter(function (e) { return e.difficulty <= opts.maxDifficulty; });
    if (opts.category) pool = pool.filter(function (e) { return e.category === opts.category; });
    if (opts.excludeMethod) pool = pool.filter(function (e) { return e.method !== opts.excludeMethod; });
    return pool;
  }

  return {
    register: register,
    all: all,
    count: count,
    byId: byId,
    byMethod: byMethod,
    methods: methods,
    filter: filter
  };
})();
