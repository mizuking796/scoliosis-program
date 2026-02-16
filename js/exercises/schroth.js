'use strict';

ExerciseRegistry.register([

  // ────────── Schroth法（16種） ──────────

  {
    id: 'sch-rab',
    name: '回転角呼吸（RAB）',
    method: 'schroth',
    category: 'breathing',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: 'Schroth法の基盤技術。凹側肋骨を選択的に拡張し、胸郭の対称性を改善する。',
    procedure: [
      '矯正姿位をとる（セラピスト指示に従う）',
      '凹側の肋骨に手を当て、意識を向ける',
      '鼻からゆっくり吸気し、凹側へ空気を送り込む',
      '口からゆっくり呼気し、凸側を収縮させる',
      '呼気時に "フー" と音を出し筋収縮を維持'
    ],
    sets: 3,
    reps: 8,
    duration: null,
    caution: '呼吸パターンの習得には専門指導が必要。過換気に注意。'
  },
  {
    id: 'sch-prone-stool',
    name: '腹臥位スツールエクササイズ',
    method: 'schroth',
    category: 'correction',
    curveTypes: ['thoracic', 'thoracolumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced'],
    difficulty: 2,
    description: 'スツール上で腹臥位をとり、3次元的な脊柱矯正と筋活性化を行う。',
    procedure: [
      'スツールに腹臥位で寝る（骨盤をスツール端に合わせる）',
      '凸側の手を頭上に伸ばし、凹側の手は体側に置く',
      'RABで凹側肋骨を拡張する',
      '凸側肩甲骨を内側に引き寄せる',
      '姿勢を保持しながら5呼吸繰り返す'
    ],
    sets: 3,
    reps: 5,
    duration: null,
    caution: 'スツールの高さは骨盤が水平になるよう調整する。'
  },
  {
    id: 'sch-sidelying',
    name: '側臥位矯正エクササイズ',
    method: 'schroth',
    category: 'correction',
    curveTypes: ['thoracic', 'lumbar', 'thoracolumbar'],
    phases: ['initial', 'intermediate', 'advanced'],
    difficulty: 2,
    description: '側臥位で重力を利用した脊柱矯正。カーブの凸側を上にして行う。',
    procedure: [
      'カーブ凸側を上にして側臥位をとる',
      '下側の腕を頭上に伸ばす',
      '上側の手で肋骨に触れ、矯正方向を意識',
      'RABで凹側肋骨を拡張',
      '上側の脚を前方に出し骨盤を安定させる'
    ],
    sets: 3,
    reps: 8,
    duration: null,
    caution: '枕の高さで頸椎のアライメントを維持する。'
  },
  {
    id: 'sch-muscle-cylinder',
    name: 'マッスルシリンダー',
    method: 'schroth',
    category: 'strengthening',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 3,
    description: '体幹筋群を円筒状に同時収縮させ、矯正位を能動的に保持する上級技術。',
    procedure: [
      '矯正姿位（立位または座位）をとる',
      'RABで吸気し胸郭を拡張',
      '呼気時に体幹全周の筋肉を均等に収縮（"シリンダー"形成）',
      '矯正位を保持したまま呼吸を続ける',
      '30秒保持を目指す'
    ],
    sets: 3,
    reps: 3,
    duration: 30,
    caution: '初期は短時間から開始し、徐々に保持時間を延長する。'
  },
  {
    id: 'sch-wall-squat',
    name: '壁スクワット矯正',
    method: 'schroth',
    category: 'strengthening',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 2,
    description: '壁を利用した矯正位でのスクワット。荷重下での矯正保持能力を養う。',
    procedure: [
      '壁に背を付けて立つ',
      '矯正位をとり、凹側肋骨を壁から離すイメージ',
      '膝を45\u00B0まで曲げスクワット',
      '矯正位を保持したまま5秒キープ',
      'ゆっくり立ち上がる'
    ],
    sets: 3,
    reps: 10,
    duration: null,
    caution: '膝がつま先を超えないよう注意。'
  },
  {
    id: 'sch-doorframe',
    name: 'ドアフレームストレッチ',
    method: 'schroth',
    category: 'stretching',
    curveTypes: ['thoracic', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: 'ドア枠を利用して凸側の短縮した筋群をストレッチし、矯正方向への可動性を改善。',
    procedure: [
      'ドア枠に凸側の手を肩の高さで置く',
      '反対側に体を回旋させる',
      'RABで凹側肋骨を拡張しながら保持',
      '15-20秒キープ',
      '反復する'
    ],
    sets: 3,
    reps: 5,
    duration: 20,
    caution: '痛みが出ない範囲で行う。急な反動をつけない。'
  },
  {
    id: 'sch-seated-pelvis',
    name: '座位骨盤矯正',
    method: 'schroth',
    category: 'correction',
    curveTypes: ['lumbar', 'thoracolumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '座位で骨盤の傾斜と回旋を矯正し、腰椎カーブの改善を図る。',
    procedure: [
      '椅子に座り両坐骨を均等に接地',
      '凹側の坐骨に体重をシフト',
      '骨盤を矯正方向に微調整',
      'RABを行いながら姿勢保持',
      '1分間保持を目指す'
    ],
    sets: 3,
    reps: 3,
    duration: 60,
    caution: 'デスクワーク中にも応用可能。長時間の過矯正は避ける。'
  },
  {
    id: 'sch-standing-elongation',
    name: '立位脊柱伸長',
    method: 'schroth',
    category: 'correction',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '立位で頭頂部を天井に向けて伸び、脊柱全体を軸方向に伸長する。',
    procedure: [
      '壁の前に立ち矯正姿位をとる',
      '頭頂部を天井に向かって引き上げる',
      '肩を下げ、首を長くする',
      'RABを併用し矯正位を強化',
      '30秒保持'
    ],
    sets: 3,
    reps: 5,
    duration: 30,
    caution: '腰椎の過伸展に注意。腹筋を軽く緊張させる。'
  },
  {
    id: 'sch-scapular',
    name: '肩甲帯安定化',
    method: 'schroth',
    category: 'strengthening',
    curveTypes: ['thoracic', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 2,
    description: '肩甲骨の位置を矯正し、胸椎カーブの改善と姿勢保持力を向上させる。',
    procedure: [
      '腹臥位または四つ這い位をとる',
      '凸側の肩甲骨を内転・下制方向に引く',
      '凹側の肩甲骨は外転方向に誘導',
      'RABを行い5秒保持',
      'ゆっくり戻す'
    ],
    sets: 3,
    reps: 10,
    duration: null,
    caution: '代償動作（肩の挙上）に注意。'
  },
  {
    id: 'sch-thoracic-ext',
    name: '胸椎伸展エクササイズ',
    method: 'schroth',
    category: 'correction',
    curveTypes: ['thoracic', 'double'],
    phases: ['intermediate', 'advanced'],
    difficulty: 2,
    description: '胸椎後弯と回旋を改善するための伸展エクササイズ。',
    procedure: [
      'フォームローラーを胸椎中部に当てて仰臥位',
      '両手を頭の後ろで組む',
      '胸椎を伸展させるようにローラー上で反る',
      '吸気で伸展、呼気で戻る',
      '各レベルで3-5回繰り返す'
    ],
    sets: 2,
    reps: 5,
    duration: null,
    caution: '腰椎の過伸展を避ける。胸椎のみに焦点を当てる。'
  },
  {
    id: 'sch-ball',
    name: 'バランスボール矯正',
    method: 'schroth',
    category: 'correction',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced'],
    difficulty: 3,
    description: 'バランスボール上での不安定面矯正。体幹の自動矯正反応を促進する。',
    procedure: [
      'バランスボールに座り矯正姿位をとる',
      '骨盤を小さく円を描くように動かす',
      '矯正位を崩さずバランスを維持',
      'RABを併用',
      '両手を胸の前で組み負荷を増加'
    ],
    sets: 3,
    reps: 5,
    duration: 30,
    caution: '転倒防止のため壁際で実施。安定後に難度を上げる。'
  },
  {
    id: 'sch-bar-hang',
    name: 'バーハンギング（懸垂バー）',
    method: 'schroth',
    category: 'stretching',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 2,
    description: '懸垂バーにぶら下がり、重力による脊柱の牽引とストレッチを行う。',
    procedure: [
      '懸垂バーを肩幅で握る',
      '足を床から離し体重で脊柱を伸長',
      '矯正方向に軽く体幹を回旋',
      'RABを行いながら15-30秒保持',
      'ゆっくり降りる'
    ],
    sets: 3,
    reps: 3,
    duration: 20,
    caution: '握力不足の場合はリストストラップ使用。肩関節に痛みがあれば中止。'
  },

  // ────────── Schroth法 追加4種 ──────────

  {
    id: 'sch-convex-elongation',
    name: '凸側延長エクササイズ',
    method: 'schroth',
    category: 'correction',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced'],
    difficulty: 2,
    description: '凸側体幹を選択的に延長し、カーブの頂点部での矯正効果を高める。',
    procedure: [
      '立位で矯正姿位をとり、凸側の体側を意識する',
      '凸側の腕を頭上に伸ばし、天井方向へ最大限延長する',
      'カーブ頂点部の椎体間を引き離すイメージで伸長',
      'RABを併用し凹側肋骨を拡張しながら20秒保持',
      'ゆっくり戻し、3秒休息後に再度延長する'
    ],
    sets: 3,
    reps: 8,
    duration: 20,
    caution: '反対側への過矯正に注意。痛みが出る場合は延長幅を縮小する。'
  },
  {
    id: 'sch-seated-rab',
    name: '座位RAB',
    method: 'schroth',
    category: 'breathing',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '座位での回転角呼吸。デスクワーク中にも実施可能な矯正呼吸。',
    procedure: [
      '椅子に座り両坐骨を均等に接地し矯正姿位をとる',
      '凹側の肋骨に手を当て意識を集中させる',
      '鼻からゆっくり吸気し、凹側肋骨を手で押し広げるように拡張する',
      '口から "フー" と音を出しながら呼気し、凸側を積極的に収縮させる',
      'デスクの前でも背筋を伸ばし、10呼吸を1セットとして繰り返す'
    ],
    sets: 5,
    reps: 10,
    duration: null,
    caution: '過換気に注意。めまいを感じたら通常呼吸に戻す。座面が安定した椅子を使用する。'
  },
  {
    id: 'sch-wall-press',
    name: '壁押し矯正',
    method: 'schroth',
    category: 'correction',
    curveTypes: ['thoracic', 'double'],
    phases: ['intermediate', 'advanced'],
    difficulty: 2,
    description: '壁に手を当て凸側肋骨を押し込む矯正。触覚フィードバックで矯正精度を向上。',
    procedure: [
      '壁に向かって立ち、凸側の肋骨が壁面に触れる距離に調整する',
      '凸側の手を壁に当て、肋骨の突出部を壁面方向に押し込む',
      '反対側の手は凹側肋骨に当て、拡張を触覚で確認する',
      'RABで凹側を拡張しながら、凸側を壁に向かって10秒保持する',
      'ゆっくり離し、手の触覚で矯正前後の肋骨位置の変化を確認する'
    ],
    sets: 3,
    reps: 8,
    duration: 10,
    caution: '壁への押し込みは痛みのない範囲で行う。肋骨に直接強い力をかけない。'
  },
  {
    id: 'sch-gait-integration',
    name: '歩行統合トレーニング',
    method: 'schroth',
    category: 'functional',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['advanced', 'maintenance'],
    difficulty: 3,
    description: 'Schroth矯正位を歩行動作に統合する最終段階。動的環境での3D矯正維持。',
    procedure: [
      '矯正姿位で立位をとり、マッスルシリンダーを形成する',
      'RABを維持しながら一歩ずつゆっくり歩き始める',
      '各ステップで矯正位の崩れがないか自己チェックする',
      '10m歩行ごとに鏡または壁面で姿勢を確認し修正する',
      '徐々に歩行速度を上げ、日常歩行速度でも矯正を維持できるようにする'
    ],
    sets: 3,
    reps: 5,
    duration: null,
    caution: 'マッスルシリンダーが安定してから取り組む。歩行速度は段階的に上げ、矯正が崩れたら速度を落とす。'
  }

]);
