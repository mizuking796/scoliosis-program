/* ======================================================
   program-engine.js — プログラム生成アルゴリズム
   SOSORT 2016ガイドライン準拠リスク分類 + フェーズ構成
   ====================================================== */

'use strict';

var ProgramEngine = (function () {

  // ── リスク分類 ─────────────────────────

  /**
   * SOSORT 2016準拠リスク分類
   * @param {object} input - { age, cobbAngle, risser, treatment }
   * @returns {string} 'observation' | 'exercise' | 'bracing' | 'surgical_alert' | 'postSurgery'
   */
  function classifyRisk(input) {
    if (input.treatment === 'postSurgery') return 'postSurgery';

    var cobb = input.cobbAngle;
    var risser = input.risser;
    var isGrowing = input.age <= 17;

    if (isGrowing) {
      // 成長期
      if (cobb < 15) return 'observation';
      if (cobb < 25) {
        return risser <= 2 ? 'exercise' : 'observation';
      }
      if (cobb < 40) {
        return risser <= 2 ? 'bracing' : 'exercise';
      }
      if (cobb < 50) {
        return risser <= 3 ? 'bracing' : 'exercise';
      }
      return 'surgical_alert'; // 50°以上
    } else {
      // 成人
      if (cobb < 30) return 'observation';
      if (cobb < 50) return 'exercise';
      return 'surgical_alert';
    }
  }

  /**
   * リスク分類の日本語ラベル
   */
  function riskLabel(risk) {
    var labels = {
      observation: '経過観察＋自主トレ',
      exercise: '運動療法（専門的）',
      bracing: '装具療法＋運動療法',
      surgical_alert: '手術検討（運動療法併用）',
      postSurgery: '術後リハビリテーション'
    };
    return labels[risk] || risk;
  }

  /**
   * リスクの色クラス
   */
  function riskColor(risk) {
    var colors = {
      observation: '#4CAF50',
      exercise: '#2E86AB',
      bracing: '#FF9800',
      surgical_alert: '#E53935',
      postSurgery: '#7B1FA2'
    };
    return colors[risk] || '#666';
  }

  /**
   * 重症度バッジ
   */
  function severityBadge(cobb) {
    if (cobb < 20) return { label: '軽度', color: '#4CAF50' };
    if (cobb < 35) return { label: '中等度', color: '#FF9800' };
    if (cobb < 50) return { label: '重度', color: '#E53935' };
    return { label: '最重度', color: '#B71C1C' };
  }

  // ── フェーズ構成 ─────────────────────────

  var PHASE_TEMPLATES = {
    observation: [
      { id: 'initial', name: '導入期', start: 1, end: 3, color: '#26A69A',
        goals: ['姿勢評価と自己認識の向上', '基本的な自己矯正の習得', '運動習慣の確立'] },
      { id: 'maintenance', name: '維持期', start: 4, end: 36, color: '#66BB6A',
        goals: ['自主トレの継続', '6ヶ月ごとの経過観察', '成長終了まで進行モニタリング'] }
    ],
    exercise: [
      { id: 'initial', name: '初期（基礎構築）', start: 1, end: 6, color: '#26A69A',
        goals: ['専門的評価と個別プログラム立案', '自己矯正技術の習得', '基本的な体幹安定化'] },
      { id: 'intermediate', name: '中期（強化）', start: 7, end: 18, color: '#2E86AB',
        goals: ['矯正保持力の向上', '機能的動作への統合', '非対称トレーニングの深化'] },
      { id: 'advanced', name: '後期（統合）', start: 19, end: 30, color: '#7E57C2',
        goals: ['日常動作への完全統合', 'スポーツ活動への応用', '自立した自己管理'] },
      { id: 'maintenance', name: '維持期', start: 31, end: 36, color: '#66BB6A',
        goals: ['獲得した矯正力の維持', '自主トレプログラムへの移行', '定期評価の継続'] }
    ],
    bracing: [
      { id: 'initial', name: '装具導入期', start: 1, end: 6, color: '#26A69A',
        goals: ['装具の適切なフィッティング', '装具装着下での運動療法開始', '1日16-23時間装着の目標達成'] },
      { id: 'intermediate', name: '装具＋強化期', start: 7, end: 18, color: '#2E86AB',
        goals: ['装具内矯正力の最大化', '装具外での自己矯正力向上', '心理的サポートの提供'] },
      { id: 'advanced', name: '離脱期', start: 19, end: 30, color: '#7E57C2',
        goals: ['段階的な装具装着時間の短縮', '装具なしでの矯正保持', '自立した運動プログラムの確立'] },
      { id: 'maintenance', name: '維持期', start: 31, end: 36, color: '#66BB6A',
        goals: ['装具離脱後のフォローアップ', '矯正力の維持確認', '成長終了の確認'] }
    ],
    surgical_alert: [
      { id: 'initial', name: '術前準備期', start: 1, end: 6, color: '#26A69A',
        goals: ['術前の体力・呼吸機能向上', '心理的準備', '手術方針の理解と意思決定支援'] },
      { id: 'intermediate', name: '集中運動期', start: 7, end: 18, color: '#2E86AB',
        goals: ['可能な限りの矯正効果の獲得', '術前の筋力・柔軟性の最大化', '手術回避の可能性の評価'] },
      { id: 'advanced', name: '評価・方針決定期', start: 19, end: 30, color: '#7E57C2',
        goals: ['運動療法の効果判定', '手術適応の最終判断', '術前リハプログラムの実施'] },
      { id: 'maintenance', name: '継続管理期', start: 31, end: 36, color: '#66BB6A',
        goals: ['治療方針に基づく継続管理', '手術決定時は術前強化', '保存療法継続時は維持プログラム'] }
    ],
    postSurgery: [
      { id: 'acute', name: '急性期', start: 1, end: 3, color: '#EF5350',
        goals: ['合併症予防（DVT・肺炎）', '疼痛管理', '早期離床と基本動作獲得'] },
      { id: 'recovery', name: '回復期', start: 4, end: 12, color: '#26A69A',
        goals: ['段階的な活動範囲拡大', '体幹筋力の段階的回復', '日常生活動作の自立'] },
      { id: 'strengthening', name: '強化期', start: 13, end: 24, color: '#2E86AB',
        goals: ['体幹・四肢筋力の本格的強化', '有酸素運動の再開', '社会復帰・復学の準備'] },
      { id: 'return', name: '復帰期', start: 25, end: 36, color: '#66BB6A',
        goals: ['スポーツ活動への段階的復帰', '完全な社会復帰', '長期フォローアップ体制の確立'] }
    ]
  };

  // ── エクササイズ選択 ──────────────────────

  /**
   * フェーズ名をDB用に変換（bracing/surgical_alertのフェーズ名をExerciseDBのphaseにマッピング）
   */
  function mapPhaseToExercisePhase(phaseId, risk) {
    if (risk === 'postSurgery') return phaseId; // acute, recovery, strengthening, return
    var mapping = {
      initial: 'initial',
      intermediate: 'intermediate',
      advanced: 'advanced',
      maintenance: 'maintenance'
    };
    return mapping[phaseId] || phaseId;
  }

  /**
   * エクササイズをフィルタリングして選択
   * @param {object} params - { curveType, phaseId, risk, cobbAngle, complications }
   * @returns {object} { clinic: [], home: [] }
   */
  function selectExercises(params) {
    var curveType = params.curveType;
    var phaseId = params.phaseId;
    var risk = params.risk;
    var cobb = params.cobbAngle;
    var complications = params.complications || [];
    var exPhase = mapPhaseToExercisePhase(phaseId, risk);

    // 術後はpostSurgery専用 + 回復期以降は一般エクササイズも追加
    if (risk === 'postSurgery') {
      return selectPostSurgeryExercises(exPhase, curveType, complications);
    }

    // 一般エクササイズのフィルタリング
    var pool = EXERCISES.filter(function (ex) {
      if (ex.method === 'postSurgery') return false;
      if (ex.curveTypes.indexOf(curveType) === -1) return false;
      if (ex.phases.indexOf(exPhase) === -1) return false;
      return true;
    });

    // 難易度フィルタ
    var maxDifficulty = 3;
    if (exPhase === 'initial') maxDifficulty = 2;
    pool = pool.filter(function (ex) { return ex.difficulty <= maxDifficulty; });

    // Schroth/SEAS比率調整（Cobb角が大きいほどSchroth重視）
    var schrothRatio = cobb >= 35 ? 0.5 : (cobb >= 25 ? 0.4 : 0.3);
    var seasRatio = 0.25;
    var coreRatio = 0.2;
    var otherRatio = 1 - schrothRatio - seasRatio - coreRatio;

    var clinicCount = 10;
    var homeCount = 6;

    // メソッド別に分ける
    var byMethod = { schroth: [], seas: [], core: [], other: [] };
    pool.forEach(function (ex) {
      if (ex.method === 'schroth') byMethod.schroth.push(ex);
      else if (ex.method === 'seas') byMethod.seas.push(ex);
      else if (ex.method === 'core') byMethod.core.push(ex);
      else byMethod.other.push(ex);
    });

    // 合併症対応の優先エクササイズ
    var priorityIds = [];
    if (complications.indexOf('pain') !== -1) {
      priorityIds.push('str-cat-cow', 'str-child-pose', 'br-diaphragm');
    }
    if (complications.indexOf('respiratory') !== -1) {
      priorityIds.push('sch-rab', 'br-diaphragm', 'br-rib-expansion');
    }
    if (complications.indexOf('psycho') !== -1) {
      priorityIds.push('seas-mirror', 'br-diaphragm');
    }

    // 通院用エクササイズ選択
    var clinic = [];
    var usedIds = {};

    // 優先エクササイズを先に追加
    priorityIds.forEach(function (id) {
      if (clinic.length >= clinicCount) return;
      var ex = findExercise(id, pool);
      if (ex && !usedIds[ex.id]) {
        clinic.push(ex);
        usedIds[ex.id] = true;
      }
    });

    // メソッド別に残り枠を埋める
    var targets = [
      { list: byMethod.schroth, count: Math.round(clinicCount * schrothRatio) },
      { list: byMethod.seas, count: Math.round(clinicCount * seasRatio) },
      { list: byMethod.core, count: Math.round(clinicCount * coreRatio) },
      { list: byMethod.other, count: Math.round(clinicCount * otherRatio) }
    ];

    targets.forEach(function (t) {
      var added = 0;
      for (var i = 0; i < t.list.length && added < t.count && clinic.length < clinicCount; i++) {
        if (!usedIds[t.list[i].id]) {
          clinic.push(t.list[i]);
          usedIds[t.list[i].id] = true;
          added++;
        }
      }
    });

    // 自主トレ用（難易度低め、自宅実施可能なもの優先）
    var home = [];
    var homePool = pool.filter(function (ex) {
      return ex.difficulty <= 2 && !usedIds[ex.id];
    });

    // SEAS + ストレッチ + 呼吸を優先
    var homePriority = ['seas', 'stretching', 'breathing', 'core'];
    homePriority.forEach(function (m) {
      for (var i = 0; i < homePool.length && home.length < homeCount; i++) {
        if (homePool[i].method === m && !usedIds[homePool[i].id]) {
          home.push(homePool[i]);
          usedIds[homePool[i].id] = true;
        }
      }
    });

    // 通院にも含まれる基本エクササイズを自主トレにも追加
    var homeEssentials = ['seas-self-correction', 'sch-rab', 'br-diaphragm'];
    homeEssentials.forEach(function (id) {
      if (home.length >= homeCount) return;
      var ex = findExercise(id, pool);
      if (ex && !usedIds[ex.id]) {
        home.push(ex);
      }
    });

    return { clinic: clinic, home: home };
  }

  /**
   * 術後エクササイズ選択
   */
  function selectPostSurgeryExercises(phase, curveType, complications) {
    var postEx = EXERCISES.filter(function (ex) {
      return ex.method === 'postSurgery' && ex.phases.indexOf(phase) !== -1;
    });

    // 回復期以降は一般エクササイズも追加
    var generalEx = [];
    if (phase === 'recovery' || phase === 'strengthening' || phase === 'return') {
      var mappedPhase = phase === 'recovery' ? 'initial' :
                        phase === 'strengthening' ? 'intermediate' : 'advanced';
      generalEx = EXERCISES.filter(function (ex) {
        if (ex.method === 'postSurgery') return false;
        if (ex.curveTypes.indexOf(curveType) === -1) return false;
        if (ex.phases.indexOf(mappedPhase) === -1) return false;
        if (ex.difficulty > (phase === 'recovery' ? 1 : 2)) return false;
        return true;
      });
    }

    var clinic = postEx.concat(generalEx).slice(0, 10);
    var home = generalEx.filter(function (ex) {
      return ex.difficulty <= 1;
    }).slice(0, 4);

    return { clinic: clinic, home: home };
  }

  function findExercise(id, pool) {
    for (var i = 0; i < pool.length; i++) {
      if (pool[i].id === id) return pool[i];
    }
    return null;
  }

  // ── 評価スケジュール ──────────────────────

  function generateEvaluationSchedule(risk, isGrowing) {
    var evals = [];
    if (risk === 'postSurgery') {
      evals = [
        { month: 1, label: '術後1ヶ月検診', type: 'medical' },
        { month: 3, label: '術後3ヶ月検診', type: 'medical' },
        { month: 6, label: '術後6ヶ月検診 + X線', type: 'xray' },
        { month: 12, label: '術後1年検診 + X線', type: 'xray' },
        { month: 24, label: '術後2年検診 + X線', type: 'xray' },
        { month: 36, label: '術後3年検診', type: 'medical' }
      ];
    } else if (isGrowing) {
      // 成長期は4-6ヶ月ごと
      for (var m = 4; m <= 36; m += 4) {
        var type = (m % 12 === 0) ? 'xray' : 'medical';
        evals.push({
          month: m,
          label: m + 'ヶ月' + (type === 'xray' ? '（X線評価）' : '（経過観察）'),
          type: type
        });
      }
    } else {
      // 成人は6-12ヶ月ごと
      [6, 12, 18, 24, 36].forEach(function (m) {
        evals.push({
          month: m,
          label: m + 'ヶ月評価' + (m % 12 === 0 ? '（X線）' : ''),
          type: m % 12 === 0 ? 'xray' : 'medical'
        });
      });
    }
    return evals;
  }

  // ── マイルストーン ──────────────────────

  function generateMilestones(risk, isGrowing) {
    var ms = [];
    if (risk === 'postSurgery') {
      ms = [
        { month: 1, label: '独歩獲得' },
        { month: 3, label: '日常生活自立' },
        { month: 6, label: '軽運動開始' },
        { month: 12, label: '復学・復職' },
        { month: 18, label: '有酸素運動再開' },
        { month: 24, label: 'スポーツ段階的復帰' }
      ];
    } else if (risk === 'bracing') {
      ms = [
        { month: 1, label: '装具フィッティング完了' },
        { month: 3, label: '装具装着23時間達成' },
        { month: 6, label: '自己矯正技術習得' },
        { month: 12, label: '中間X線評価' },
        { month: 18, label: '装具内矯正最適化' },
        { month: 24, label: '装具離脱開始（骨成熟に応じて）' },
        { month: 30, label: '夜間装具のみへ移行' },
        { month: 36, label: '装具完全離脱評価' }
      ];
    } else {
      ms = [
        { month: 1, label: '初期評価完了' },
        { month: 3, label: '基本矯正技術習得' },
        { month: 6, label: '自主トレ自立' },
        { month: 12, label: '年次X線評価' },
        { month: 18, label: '日常動作統合' },
        { month: 24, label: '年次評価・プログラム見直し' },
        { month: 36, label: '3年評価・長期方針決定' }
      ];
    }
    return ms;
  }

  // ── 装具指導 ──────────────────────

  function bracingGuidance(phase, isGrowing) {
    if (!isGrowing) return null;

    var guidance = {
      initial: {
        wearingHours: '1日16-23時間（段階的に増加）',
        notes: [
          '装具装着は段階的に開始（初日4時間→2週間で目標時間へ）',
          '装具内での呼吸エクササイズを毎日実施',
          '皮膚の発赤・痛みのチェックを毎日行う',
          '入浴時・運動時に外す場合も矯正姿勢を意識'
        ]
      },
      intermediate: {
        wearingHours: '1日16-23時間（安定維持）',
        notes: [
          '装具のフィッティングを3-4ヶ月ごとに確認',
          '成長に伴う装具の調整・作り直しの判断',
          '装具外しでの自己矯正力チェック',
          '心理的サポート（ピアグループ・カウンセリング）'
        ]
      },
      advanced: {
        wearingHours: '段階的に短縮（Risserサインに応じて）',
        notes: [
          'Risser 4以上で夜間のみへの移行を検討',
          '装具外しでの矯正保持力を定期評価',
          '2時間→4時間→夜間のみ→完全離脱の段階',
          '離脱後のリバウンドに注意'
        ]
      },
      maintenance: {
        wearingHours: '夜間のみまたは完全離脱',
        notes: [
          '離脱後6ヶ月はX線でカーブの安定性を確認',
          '自主トレプログラムの継続が重要',
          '成長完了の確認（Risser 5）',
          'リバウンド兆候があれば装具再開を検討'
        ]
      }
    };
    return guidance[phase] || null;
  }

  // ── QOL・心理サポート ──────────────────────

  function generateQolRecommendations(input) {
    var recs = [];
    var complications = input.complications || [];

    recs.push({
      title: '定期的な姿勢チェック',
      detail: '毎月の写真撮影で姿勢の変化を記録。モチベーション維持に有効。'
    });

    if (input.age <= 17) {
      recs.push({
        title: '学校生活の調整',
        detail: '体育の授業は基本的に参加可能。重い鞄は両肩に均等に。座席位置の配慮を学校に依頼。'
      });
    }

    if (complications.indexOf('psycho') !== -1 || complications.indexOf('appearance') !== -1) {
      recs.push({
        title: '心理的サポート',
        detail: '同年代の患者グループとの交流、必要に応じてカウンセリング。ボディイメージへの支援。'
      });
    }

    if (complications.indexOf('pain') !== -1) {
      recs.push({
        title: '疼痛管理',
        detail: '運動前後のストレッチを徹底。温熱療法の併用。痛みが持続する場合は主治医に相談。'
      });
    }

    if (complications.indexOf('respiratory') !== -1) {
      recs.push({
        title: '呼吸機能管理',
        detail: '呼吸エクササイズを毎日実施。定期的な肺機能検査。有酸素運動で心肺持久力を向上。'
      });
    }

    if (complications.indexOf('adl') !== -1) {
      recs.push({
        title: 'ADL指導',
        detail: '日常動作（起き上がり・持ち上げ・長時間座位）の矯正。人間工学に基づいた環境調整。'
      });
    }

    recs.push({
      title: '運動・スポーツ',
      detail: '水泳（特に背泳ぎ）・ヨガ・ピラティスは推奨。コンタクトスポーツは主治医と相談。体操競技・重量挙げは注意。'
    });

    return recs;
  }

  // ── メイン生成関数 ──────────────────────

  /**
   * プログラム全体を生成
   * @param {object} input - 全入力値
   * @returns {object} 生成されたプログラム
   */
  function generate(input) {
    var risk = classifyRisk(input);
    var severity = severityBadge(input.cobbAngle);
    var isGrowing = input.age <= 17;
    var phases = PHASE_TEMPLATES[risk];
    var evaluations = generateEvaluationSchedule(risk, isGrowing);
    var milestones = generateMilestones(risk, isGrowing);
    var qol = generateQolRecommendations(input);

    // 各フェーズのエクササイズを選択
    var phaseDetails = phases.map(function (phase) {
      var exercises = selectExercises({
        curveType: input.curveType,
        phaseId: phase.id,
        risk: risk,
        cobbAngle: input.cobbAngle,
        complications: input.complications
      });

      var bracing = (risk === 'bracing') ? bracingGuidance(phase.id, isGrowing) : null;

      // フェーズ内の評価ポイント
      var phaseEvals = evaluations.filter(function (e) {
        return e.month >= phase.start && e.month <= phase.end;
      });

      // フェーズ内のマイルストーン
      var phaseMs = milestones.filter(function (m) {
        return m.month >= phase.start && m.month <= phase.end;
      });

      return {
        id: phase.id,
        name: phase.name,
        startMonth: phase.start,
        endMonth: phase.end,
        color: phase.color,
        goals: phase.goals,
        clinicExercises: exercises.clinic,
        homeExercises: exercises.home,
        bracingGuidance: bracing,
        evaluations: phaseEvals,
        milestones: phaseMs
      };
    });

    // 通院頻度
    var visitFrequency = getVisitFrequency(risk);

    return {
      risk: risk,
      riskLabel: riskLabel(risk),
      riskColor: riskColor(risk),
      severity: severity,
      totalMonths: 36,
      visitFrequency: visitFrequency,
      phases: phaseDetails,
      evaluations: evaluations,
      milestones: milestones,
      qol: qol,
      isSurgicalAlert: risk === 'surgical_alert',
      input: input
    };
  }

  function getVisitFrequency(risk) {
    var freq = {
      observation: '3-6ヶ月ごと',
      exercise: '週1-2回（初期）→ 月2回（維持期）',
      bracing: '週1-2回（初期）→ 月1-2回（安定期）',
      surgical_alert: '週2-3回',
      postSurgery: '週3-5回（急性期）→ 週1-2回（回復期）→ 月2回（維持期）'
    };
    return freq[risk] || '月1回';
  }

  // ── カーブタイプのラベル ──────────────────────

  function curveTypeLabel(type) {
    var labels = {
      thoracic: '胸椎カーブ',
      thoracolumbar: '胸腰椎カーブ',
      lumbar: '腰椎カーブ',
      double: 'ダブルカーブ（S字型）'
    };
    return labels[type] || type;
  }

  function treatmentLabel(treatment) {
    var labels = {
      none: '治療なし',
      exercise: '運動療法のみ',
      bracing: '装具療法中',
      postSurgery: '手術後'
    };
    return labels[treatment] || treatment;
  }

  // 公開API
  return {
    generate: generate,
    classifyRisk: classifyRisk,
    riskLabel: riskLabel,
    riskColor: riskColor,
    severityBadge: severityBadge,
    curveTypeLabel: curveTypeLabel,
    treatmentLabel: treatmentLabel
  };
})();
