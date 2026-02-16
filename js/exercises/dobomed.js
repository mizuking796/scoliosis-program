/* ======================================================
   dobomed.js — DoboMedエクササイズ（4種）
   Closed kinetic chain approach to scoliosis correction
   ====================================================== */
'use strict';

ExerciseRegistry.register([

  // ────────── DoboMed（4種） ──────────

  {
    id: 'dobomed-closed-chain',
    name: '閉鎖運動連鎖矯正',
    method: 'dobomed',
    category: 'correction',
    curveTypes: ['thoracic', 'thoracolumbar', 'double'],
    phases: ['intermediate', 'advanced'],
    difficulty: 2,
    description: '手足を床に固定した閉鎖運動連鎖環境で体幹の3D矯正を行う。遠位固定により近位の矯正運動が効率的に伝達される。',
    procedure: [
      '四つ這い位で両手と両膝を床にしっかり固定し、閉鎖運動連鎖環境を構築する',
      '手足の位置を固定したまま、胸椎を凹側方向に側屈させる',
      '同時に胸椎の脱回旋（凸側の回旋を戻す方向）を行い、3D矯正を完成させる',
      '矯正位を保持しながら深呼吸を行い、凹側肋骨の拡張を促進する',
      '8呼吸サイクル保持した後、ゆっくり中立位に戻る'
    ],
    sets: 3,
    reps: 8,
    duration: null,
    caution: '手首や膝に負担がかかるため、必要に応じてパッドを使用する。矯正方向を誤ると症状が悪化する可能性がある。'
  },
  {
    id: 'dobomed-asymmetric-breathing',
    name: '非対称呼吸動員',
    method: 'dobomed',
    category: 'breathing',
    curveTypes: ['thoracic', 'double'],
    phases: ['initial', 'intermediate', 'advanced'],
    difficulty: 2,
    description: '凹側と凸側で異なる呼吸パターンを用い、胸郭の非対称性を改善する。胸郭可動性の回復と呼吸機能の向上を同時に達成する。',
    procedure: [
      '側臥位で凸側を上にし、凹側肋骨を床面で支持された状態にする',
      '吸気時に凹側肋骨を床方向に押し広げるように拡張させる',
      '凸側肋骨には手を当て、呼気時に圧迫して収縮を促進する',
      '吸気と呼気の比率を1:2に設定し、凸側の収縮時間を確保する',
      '座位に移行し、同様の非対称呼吸パターンを重力負荷下でも維持する'
    ],
    sets: 3,
    reps: 10,
    duration: null,
    caution: '非対称呼吸は初期には習得が困難なため、セラピストの触覚誘導が必要。めまいが生じたら通常呼吸に戻す。'
  },
  {
    id: 'dobomed-kyphosis',
    name: '胸椎後弯化エクササイズ',
    method: 'dobomed',
    category: 'correction',
    curveTypes: ['thoracic', 'double'],
    phases: ['intermediate', 'advanced'],
    difficulty: 2,
    description: '偏平背（flat back）を改善し、生理的胸椎後弯を回復させる。側弯に伴う胸椎の過伸展傾向を矢状面から矯正する。',
    procedure: [
      '四つ這い位で脊柱をニュートラルポジションに設定する',
      '胸椎部を選択的に屈曲させ、肩甲骨間を引き離すように背中を丸める',
      '腰椎は中間位を維持し、胸椎のみの後弯増強を意識する',
      '閉鎖運動連鎖環境で手を固定したまま、胸椎後弯位を8秒保持する',
      '中立位に戻り、胸椎伸展と後弯化を交互に繰り返す'
    ],
    sets: 3,
    reps: 8,
    duration: null,
    caution: '腰椎の過度な屈曲に注意。胸椎の選択的コントロールが困難な場合はセラピストの手技誘導を併用する。'
  },
  {
    id: 'dobomed-postural-facilitation',
    name: '姿勢促通',
    method: 'dobomed',
    category: 'correction',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '正しい姿勢パターンを神経筋レベルで促通するDoboMed独自のアプローチ。反復的な感覚入力により姿勢制御の自動化を促す。',
    procedure: [
      '座位で骨盤を矯正位に配置し、体幹の基盤を安定させる',
      'セラピストまたはタッピングで矯正すべき部位に感覚入力を与え、筋活動を促通する',
      '促通された筋活動を自己収縮で再現し、矯正位を10秒保持する',
      '外部入力なしで矯正位を再現し、保持時間を段階的に延長する',
      '立位・歩行へ段階的に移行し、動的姿勢制御での促通効果を確認する'
    ],
    sets: 5,
    reps: 5,
    duration: 10,
    caution: '筋促通は軽い刺激で十分。過剰な筋緊張はかえって矯正を妨げる。疲労感が出たら休息する。'
  }

]);
