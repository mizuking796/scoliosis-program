/* ======================================================
   aquatic.js — 水中療法エクササイズ（4種）
   Aquatic therapy for scoliosis
   ====================================================== */
'use strict';

ExerciseRegistry.register([

  // ────────── Aquatic Therapy（4種） ──────────

  {
    id: 'aq-buoyancy-correction',
    name: '浮力矯正',
    method: 'aquatic',
    category: 'correction',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced'],
    difficulty: 1,
    description: '水中の浮力環境（体重約75%軽減）で矯正位を保持する。荷重軽減下での矯正学習により、陸上では困難な大きな矯正可動域を獲得する。',
    procedure: [
      '胸部水深のプールに立ち、浮力による荷重軽減を感じる',
      '水中で矯正位をとり、陸上より大きな矯正幅を目指す',
      '矯正位を30秒保持し、浮力のアシストで矯正位の感覚を学習する',
      'フロートバーを使用して仰臥位の浮遊姿勢をとり、脊柱を伸長する',
      '矯正位を保持しながら水中歩行へ移行し、動的環境での矯正を練習する'
    ],
    sets: 3,
    reps: 5,
    duration: 30,
    caution: '水温は30-33°Cが適温。耳感染症がある場合は水中活動を控える。プールの深さに注意し、必ず監視員のいる環境で実施する。'
  },
  {
    id: 'aq-pool-walking',
    name: 'プール内歩行',
    method: 'aquatic',
    category: 'cardio',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '胸部水深でのウォーキング。水の抵抗で体幹筋を均等に強化しながら有酸素運動を行う。関節への衝撃が少なく安全性が高い。',
    procedure: [
      '胸部水深のプールに入り、矯正姿勢で立位をとる',
      '矯正位を維持しながら大股でゆっくり歩行を開始する',
      '水の抵抗に対して体幹を安定させ、左右均等な歩容を意識する',
      '前方歩行5分→後方歩行3分→横歩行（矯正方向）3分のサイクルで実施する',
      '15分間の連続歩行を目標とし、呼吸が乱れたら歩行速度を調整する'
    ],
    sets: 1,
    reps: 1,
    duration: 900,
    caution: 'プール底が滑りやすいためアクアシューズの着用を推奨する。心疾患がある場合は医師の許可を得る。'
  },
  {
    id: 'aq-swim-backstroke',
    name: '背泳ぎプログラム',
    method: 'aquatic',
    category: 'cardio',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 2,
    description: '背泳ぎの対称的な動きで脊柱を伸長する。側弯に最も適した泳法とされ、仰臥位での脊柱伸展と対称的な上肢運動を組み合わせる。',
    procedure: [
      '仰臥位で浮遊姿勢をとり、体幹を矯正位に配置する',
      '両腕を交互にオーバーヘッドでストロークし、左右対称な動きを維持する',
      'キックは膝を伸ばしたフラッターキックとし、脊柱の伸長位を保つ',
      '呼吸はストローク2回で1呼吸のリズムを維持する',
      '20分間の連続泳を目標とし、50m泳ごとに壁で姿勢を確認する'
    ],
    sets: 1,
    reps: 1,
    duration: 1200,
    caution: '肩関節に痛みがある場合はストローク幅を調整する。バタフライは脊柱への過度な負荷があり推奨されない。泳力に応じてビート板を補助具として使用する。'
  },
  {
    id: 'aq-water-stretching',
    name: '水中ストレッチ',
    method: 'aquatic',
    category: 'stretching',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '温水プールでの浮力を利用したストレッチ。陸上より大きな可動域で矯正ストレッチが可能であり、筋緊張の軽減効果も高い。',
    procedure: [
      '温水プール（30-33°C）に入り、5分間のウォーミングアップ歩行を行う',
      'プールサイドのバーにつかまり、凸側の体側ストレッチを水中で行う',
      '浮力を利用して体幹を矯正方向に側屈し、陸上より深いストレッチを実施する',
      'フロートバーを使用した仰臥位で、水中での脊柱伸長ストレッチを20秒保持する',
      '水中で四肢を広げたリラクゼーション浮遊で終了する'
    ],
    sets: 3,
    reps: 5,
    duration: 20,
    caution: '長時間の温水浸漬は血圧低下を招くため、体調の変化に注意する。プール後は十分な水分補給を行う。'
  }

]);
