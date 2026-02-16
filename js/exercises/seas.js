/* ======================================================
   seas.js — SEAS法エクササイズ（11種）
   Scientific Exercises Approach to Scoliosis
   ====================================================== */
'use strict';

ExerciseRegistry.register([

  // ────────── SEAS（11種） ──────────

  {
    id: 'seas-self-correction',
    name: '自己矯正（アクティブセルフコレクション）',
    method: 'seas',
    category: 'correction',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: 'SEAS法の中核技術。鏡のフィードバックなしで3次元的に脊柱を矯正する能力を養成する。',
    procedure: [
      '立位で自然な姿勢をとる',
      '脊柱を3次元的に矯正位へ誘導（伸長＋側方＋回旋）',
      '矯正位を10秒保持',
      '一度リラックスし再度矯正',
      '日常動作の中でも意識する'
    ],
    sets: 5, reps: 5, duration: 10,
    caution: '過矯正にならないよう、自然な矯正位を目指す。'
  },
  {
    id: 'seas-mirror',
    name: '鏡前トレーニング',
    method: 'seas',
    category: 'correction',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate'],
    difficulty: 1,
    description: '全身鏡の前で姿勢を視覚的に確認しながら自己矯正を練習する。',
    procedure: [
      '全身鏡の前に立つ（正面と側面）',
      '肩の高さ・骨盤の傾き・肋骨の突出を確認',
      '視覚フィードバックで矯正位を見つける',
      '鏡から目を離して矯正位を保持',
      '再度鏡で確認し精度を検証'
    ],
    sets: 3, reps: 5, duration: null,
    caution: '自宅にも全身鏡を設置することを推奨。'
  },
  {
    id: 'seas-balance-board',
    name: 'バランスボードトレーニング',
    method: 'seas',
    category: 'balance',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 3,
    description: '不安定面上で矯正位を維持する能力を養い、自動的な姿勢制御を促進。',
    procedure: [
      'バランスボードに両足で立つ',
      '自己矯正位をとる',
      '30秒バランスを維持',
      '慣れたら片足立ち、目を閉じる等の負荷追加',
      '矯正位の崩れを最小限にする'
    ],
    sets: 3, reps: 3, duration: 30,
    caution: '転倒防止のため支持物の近くで実施。'
  },
  {
    id: 'seas-functional-sitting',
    name: '機能的座位トレーニング',
    method: 'seas',
    category: 'functional',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '日常の座位姿勢に矯正を統合する。学校や職場で実践可能。',
    procedure: [
      '椅子に深く座り坐骨を均等接地',
      '自己矯正位をとる',
      '5分間保持を目標にタイマー設定',
      '崩れたら修正',
      '徐々に保持時間を延長'
    ],
    sets: 1, reps: 1, duration: 300,
    caution: '完璧な姿勢を長時間強要しない。適度な休息を挟む。'
  },
  {
    id: 'seas-corrective-gait',
    name: '矯正歩行トレーニング',
    method: 'seas',
    category: 'functional',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 2,
    description: '歩行中に自己矯正位を維持する練習。動的環境下での矯正統合。',
    procedure: [
      '矯正位で立位をとる',
      'ゆっくり歩き始める',
      '各ステップで矯正位を意識',
      '腕振りを左右対称に保つ',
      '10m歩行→確認→繰り返し'
    ],
    sets: 3, reps: 5, duration: null,
    caution: '歩行速度は徐々に上げる。最初はゆっくりから。'
  },
  {
    id: 'seas-proprioception',
    name: '固有受容覚トレーニング',
    method: 'seas',
    category: 'balance',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced'],
    difficulty: 2,
    description: '体の位置感覚を高め、無意識レベルでの姿勢矯正を促進する。',
    procedure: [
      '閉眼で矯正位をとる',
      '片足立ち（各側30秒）',
      'セラピストが軽く外乱を加える',
      '矯正位を維持しつつバランス回復',
      '目を開けて姿勢を確認'
    ],
    sets: 3, reps: 3, duration: 30,
    caution: '閉眼時は安全な環境（マット上等）で実施。'
  },
  {
    id: 'seas-adl-integration',
    name: '日常動作統合',
    method: 'seas',
    category: 'functional',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['advanced', 'maintenance'],
    difficulty: 1,
    description: '日常のあらゆる場面で矯正姿勢を自然に維持する最終段階のトレーニング。',
    procedure: [
      '起床時: 仰臥位から矯正位で起き上がる',
      '通勤・通学: 鞄の持ち方を矯正方向に調整',
      'デスクワーク: 30分ごとに矯正位チェック',
      '荷物の持ち上げ: 矯正位を維持して行う',
      '就寝: 矯正位に近い睡眠姿勢をとる'
    ],
    sets: 1, reps: 1, duration: null,
    caution: 'すべてを一度に完璧にしようとしない。1つずつ習慣化する。'
  },
  {
    id: 'seas-sport-correction',
    name: 'スポーツ矯正',
    method: 'seas',
    category: 'functional',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['advanced', 'maintenance'],
    difficulty: 3,
    description: 'スポーツ活動時に矯正位の意識を統合する。運動制限なく活動するためのアプローチ。',
    procedure: [
      'ウォームアップ時に矯正位を確認',
      '競技動作の中で矯正意識を維持',
      '左右非対称な動作を意識的にバランス調整',
      'クールダウン時に矯正位チェック',
      '競技後に姿勢の崩れを評価'
    ],
    sets: 1, reps: 1, duration: null,
    caution: 'コンタクトスポーツは主治医に相談。側弯のタイプにより推奨スポーツが異なる。'
  },

  // ────────── 新規追加（3種） ──────────

  {
    id: 'seas-progressive-load',
    name: '段階的負荷トレーニング',
    method: 'seas',
    category: 'strengthening',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 2,
    description: '自己矯正位を保持しながら段階的に外部負荷を追加。矯正保持力の強化と日常負荷への適応。',
    procedure: [
      '自己矯正位をとり、姿勢を安定させる',
      '軽いダンベル（0.5〜1kg）を両手に持ち矯正位を維持',
      '前方挙上・側方挙上などの上肢動作を加える',
      '矯正位が崩れない範囲で負荷を段階的に増加',
      '各動作後に矯正位を再確認し精度を保つ'
    ],
    sets: 3, reps: 8, duration: null,
    caution: '矯正位の維持が最優先。姿勢が崩れる重量は使用しない。負荷増加は2週間ごとを目安とする。'
  },
  {
    id: 'seas-pair-exercise',
    name: 'ペア練習',
    method: 'seas',
    category: 'correction',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced'],
    difficulty: 2,
    description: 'パートナーと組んで矯正位のフィードバックを交換。触覚的フィードバックで矯正精度を向上。',
    procedure: [
      'パートナーと向かい合い、互いの姿勢を観察する',
      '一方が自己矯正位をとり、パートナーが肩・骨盤の左右差を触診で確認',
      'パートナーが凸側の肋骨や肩甲骨に軽く手を当て矯正方向を誘導',
      '矯正位を保持しながらパートナーの手が離れても維持する',
      '役割を交代し、同様のフィードバックを行う'
    ],
    sets: 3, reps: 5, duration: null,
    caution: '触覚フィードバックは軽い接触にとどめる。力任せに押さない。家族やトレーニングパートナーにも指導法を伝える。'
  },
  {
    id: 'seas-diary-integration',
    name: '運動日記統合',
    method: 'seas',
    category: 'functional',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '毎日の矯正練習と姿勢意識を日記に記録。自己モニタリングとモチベーション維持の手法。',
    procedure: [
      '専用ノートまたはアプリに日付・実施種目・セット数を記録',
      '日中の姿勢意識レベルを5段階で自己評価する',
      '気づいた姿勢の崩れパターンや改善点をメモする',
      '1週間ごとに振り返り、達成度と課題を整理する',
      '次回受診時にセラピストと日記を共有し指導に活かす'
    ],
    sets: 1, reps: 1, duration: null,
    caution: '記録が負担にならないよう簡潔に。完璧を求めず継続を最優先にする。'
  }

]);
