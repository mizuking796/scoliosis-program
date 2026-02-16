/* ======================================================
   exercises.js — 側弯症リハビリ エクササイズDB（44種）
   Schroth法・SEAS・コア筋力・ストレッチ・呼吸心肺・術後専用
   ====================================================== */

'use strict';

var EXERCISES = [

  // ────────── Schroth法（12種） ──────────

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
      '膝を45°まで曲げスクワット',
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

  // ────────── SEAS（8種） ──────────

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
    sets: 5,
    reps: 5,
    duration: 10,
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
    sets: 3,
    reps: 5,
    duration: null,
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
    sets: 3,
    reps: 3,
    duration: 30,
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
    sets: 1,
    reps: 1,
    duration: 300,
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
    sets: 3,
    reps: 5,
    duration: null,
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
    sets: 3,
    reps: 3,
    duration: 30,
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
    sets: 1,
    reps: 1,
    duration: null,
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
    sets: 1,
    reps: 1,
    duration: null,
    caution: 'コンタクトスポーツは主治医に相談。側弯のタイプにより推奨スポーツが異なる。'
  },

  // ────────── コア・筋力（10種） ──────────

  {
    id: 'core-dead-bug',
    name: 'デッドバグ',
    method: 'core',
    category: 'strengthening',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '腹部のインナーマッスルを活性化し、腰椎の安定性を高める基本エクササイズ。',
    procedure: [
      '仰臥位で両膝90°・両腕天井方向に挙上',
      '腰を床に押し付ける（ニュートラル〜軽い後傾）',
      '対角の手足をゆっくり伸ばす（右手＋左脚）',
      '腰が反らないよう腹圧を維持',
      '元に戻し反対側を実施'
    ],
    sets: 3,
    reps: 10,
    duration: null,
    caution: '腰が床から浮く場合は可動域を小さくする。'
  },
  {
    id: 'core-bird-dog',
    name: 'バードドッグ',
    method: 'core',
    category: 'strengthening',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '四つ這いで対角の手足を伸ばし、脊柱安定化と多裂筋を強化する。',
    procedure: [
      '四つ這い位（手は肩の下、膝は股関節の下）',
      '脊柱をニュートラルに保つ',
      '右手と左脚を同時にまっすぐ伸ばす',
      '5秒保持',
      '戻して反対側を実施'
    ],
    sets: 3,
    reps: 10,
    duration: null,
    caution: '骨盤の回旋を最小限にする。凸側の強化をやや多くしてもよい。'
  },
  {
    id: 'core-side-plank-mod',
    name: 'サイドプランク（修正版）',
    method: 'core',
    category: 'strengthening',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate'],
    difficulty: 1,
    description: '膝付きサイドプランク。側弯の凸側で行い、凸側筋群の強化を優先する。',
    procedure: [
      '凸側を下にして側臥位（膝は90°曲げる）',
      '肘で上体を支え体幹を一直線にする',
      '上側の手は腰に当てる',
      '15-30秒保持',
      '凸側を重点的に行う（凸側:凹側 = 2:1）'
    ],
    sets: 3,
    reps: 1,
    duration: 20,
    caution: '肩に痛みがある場合は中止。体幹が前後に傾かないよう注意。'
  },
  {
    id: 'core-side-plank-full',
    name: 'サイドプランク（フル）',
    method: 'core',
    category: 'strengthening',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 3,
    description: '膝を伸ばしたフルサイドプランク。凸側での保持時間を長くする非対称トレーニング。',
    procedure: [
      '凸側を下にして側臥位（脚はまっすぐ）',
      '肘と足で体を持ち上げる',
      '体幹を一直線に保持',
      '30-45秒キープ',
      '凸側:凹側 = 2:1の比率で実施'
    ],
    sets: 3,
    reps: 1,
    duration: 30,
    caution: '修正版が30秒安定して行えてから移行する。'
  },
  {
    id: 'core-pallof-press',
    name: 'パロフプレス',
    method: 'core',
    category: 'strengthening',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 2,
    description: 'チューブの抵抗に対して体幹の回旋を防ぐアンチローテーション運動。',
    procedure: [
      'チューブを胸の高さに固定し両手で持つ',
      '体幹を矯正位に保つ',
      '両手をまっすぐ前方に押し出す',
      '3秒保持して戻す',
      '凸側からの抵抗を多めに実施'
    ],
    sets: 3,
    reps: 10,
    duration: null,
    caution: '体幹が回旋しないことが最重要。チューブの強度は適切に選択。'
  },
  {
    id: 'core-asym-carry',
    name: '非対称キャリー',
    method: 'core',
    category: 'strengthening',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 2,
    description: '片手にウェイトを持ち歩行。側弯の矯正方向に荷重をかけ、機能的な体幹強化。',
    procedure: [
      '凹側の手にダンベルまたはケトルベルを持つ',
      '矯正姿勢を保ちながら20m歩行',
      '体幹が側方に傾かないよう維持',
      'ターンして戻る',
      '3往復実施'
    ],
    sets: 3,
    reps: 3,
    duration: null,
    caution: '重量は体幹を制御できる範囲にする。凹側持ちを基本とする。'
  },
  {
    id: 'core-lat-pull',
    name: 'ラットプルダウン（非対称）',
    method: 'core',
    category: 'strengthening',
    curveTypes: ['thoracic', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 2,
    description: '広背筋の非対称トレーニング。凸側の過緊張筋をストレッチしつつ凹側を強化。',
    procedure: [
      'ラットプルマシンまたはチューブを使用',
      '凹側の腕を重点的にプルダウン',
      '凸側は軽い抵抗でストレッチ重視',
      '肩甲骨を寄せて下げる意識',
      '矯正位を保持しながら実施'
    ],
    sets: 3,
    reps: 12,
    duration: null,
    caution: '過度な非対称負荷は避ける。セラピスト指導のもとで比率を決定。'
  },
  {
    id: 'core-asym-row',
    name: '非対称ローイング',
    method: 'core',
    category: 'strengthening',
    curveTypes: ['thoracic', 'thoracolumbar', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 2,
    description: '片側ずつの水平引き動作。矯正に必要な背筋群を選択的に強化。',
    procedure: [
      'ベンチに片手片膝をつく',
      '凹側の手でダンベルを引く',
      '肩甲骨を内転させながらローイング',
      '体幹の回旋を最小限に',
      '凹側:凸側 = 3:2の比率'
    ],
    sets: 3,
    reps: 12,
    duration: null,
    caution: '重すぎる重量は代償動作を引き起こす。'
  },
  {
    id: 'core-hip-hinge',
    name: 'ヒップヒンジ',
    method: 'core',
    category: 'strengthening',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 2,
    description: '股関節の屈曲パターンを学び、腰椎の安定性を保ちながら後面筋群を強化。',
    procedure: [
      '足を肩幅に開き、棒を背中に当てる（頭・胸椎・仙骨の3点接触）',
      '矯正位を保持',
      '股関節から前傾（膝は軽度屈曲）',
      '3点接触を維持したまま戻る',
      'ハムストリングスのストレッチを感じたら戻す'
    ],
    sets: 3,
    reps: 10,
    duration: null,
    caution: '腰椎が丸まらないよう注意。矯正位の維持が最優先。'
  },
  {
    id: 'core-glute-bridge',
    name: 'グルートブリッジ',
    method: 'core',
    category: 'strengthening',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '臀筋と体幹後面の強化。骨盤の安定性向上に寄与し、腰椎側弯の改善を支援。',
    procedure: [
      '仰臥位で両膝を曲げ、足は腰幅',
      '骨盤を矯正位に保つ',
      '臀部を持ち上げ、肩〜膝を一直線にする',
      '5秒保持',
      'ゆっくり下ろす'
    ],
    sets: 3,
    reps: 12,
    duration: null,
    caution: '骨盤が左右に傾かないよう注意。片脚ブリッジは上級者向け。'
  },

  // ────────── ストレッチ（6種） ──────────

  {
    id: 'str-cat-cow',
    name: 'キャットカウ',
    method: 'stretching',
    category: 'stretching',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '脊柱の屈曲・伸展を交互に行い、椎間関節のモビリティと脊柱周囲筋の柔軟性を改善。',
    procedure: [
      '四つ這い位をとる',
      '吸気: 背中を反らせ胸を開く（カウ）',
      '呼気: 背中を丸め肩甲骨を引き離す（キャット）',
      'ゆっくりと呼吸に合わせて繰り返す',
      '各ポジションで2秒保持'
    ],
    sets: 2,
    reps: 10,
    duration: null,
    caution: '腰椎の過伸展に注意。痛みのない範囲で動かす。'
  },
  {
    id: 'str-thread-needle',
    name: 'スレッドザニードル',
    method: 'stretching',
    category: 'stretching',
    curveTypes: ['thoracic', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '四つ這いから片腕を反対側へ通し、胸椎の回旋ストレッチを行う。',
    procedure: [
      '四つ這い位をとる',
      '右手を左腕の下に通す（胸椎を回旋）',
      '右肩と頭を床に近づける',
      '15秒保持',
      '反対側も実施（凸側回旋を多めに）'
    ],
    sets: 3,
    reps: 5,
    duration: 15,
    caution: '首に痛みが出ない範囲で。腰椎の代償回旋に注意。'
  },
  {
    id: 'str-child-pose',
    name: 'チャイルドポーズ（矯正版）',
    method: 'stretching',
    category: 'stretching',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '通常のチャイルドポーズを矯正方向に手を伸ばすことで側弯対応にアレンジ。',
    procedure: [
      '正座から上体を前に倒す',
      '両手を矯正方向（凹側）にずらして伸ばす',
      '凸側の体側のストレッチを感じる',
      '深呼吸しながら30秒保持',
      '中央に戻して休息'
    ],
    sets: 3,
    reps: 3,
    duration: 30,
    caution: '膝に痛みがある場合はタオルを挟む。'
  },
  {
    id: 'str-open-book',
    name: 'オープンブック',
    method: 'stretching',
    category: 'stretching',
    curveTypes: ['thoracic', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '側臥位から上半身を開くように回旋し、胸椎の回旋可動域を改善。',
    procedure: [
      '側臥位で両膝を90°に曲げ、両手を前方に重ねる',
      '上の手を天井方向に開く（本を開くように）',
      '視線は手を追う',
      '胸椎の回旋を感じながら15秒保持',
      '戻して反復'
    ],
    sets: 3,
    reps: 5,
    duration: 15,
    caution: '骨盤は固定し胸椎のみを回旋させる。'
  },
  {
    id: 'str-foam-roller',
    name: 'フォームローラーストレッチ',
    method: 'stretching',
    category: 'stretching',
    curveTypes: ['thoracic', 'thoracolumbar', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 2,
    description: 'フォームローラーで胸椎周囲の筋膜リリースと伸展性を改善。',
    procedure: [
      'フォームローラーを胸椎に横向きに当てる',
      '仰臥位で両手を頭の後ろに組む',
      'ローラーの上で小さく上下に転がす',
      '硬い部分で止めて深呼吸3回',
      '上位〜下位胸椎まで移動'
    ],
    sets: 2,
    reps: 5,
    duration: null,
    caution: '腰椎には当てない。骨突起部は避ける。'
  },
  {
    id: 'str-pec-stretch',
    name: '胸筋ストレッチ',
    method: 'stretching',
    category: 'stretching',
    curveTypes: ['thoracic', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '短縮した大胸筋・小胸筋をストレッチし、胸椎の伸展と肩甲帯の位置改善。',
    procedure: [
      'ドア枠または壁のコーナーに立つ',
      '前腕を枠に当て、肘を肩の高さにする',
      '体を前に出して胸をストレッチ',
      '20秒保持',
      '肘の高さを変えて3角度で実施'
    ],
    sets: 3,
    reps: 3,
    duration: 20,
    caution: '肩関節前方に痛みがあれば範囲を縮小。'
  },

  // ────────── 呼吸・心肺（4種） ──────────

  {
    id: 'br-diaphragm',
    name: '横隔膜呼吸トレーニング',
    method: 'breathing',
    category: 'breathing',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '横隔膜を意識した深呼吸で肋骨の動きを改善し、呼吸機能を向上させる。',
    procedure: [
      '仰臥位で両膝を曲げリラックス',
      '片手を胸に、片手を腹部に置く',
      '鼻から吸気（腹部の手が上がる）',
      '口からゆっくり呼気（腹部が下がる）',
      '4秒吸気 → 6秒呼気のリズム'
    ],
    sets: 3,
    reps: 10,
    duration: null,
    caution: '過換気にならないよう自然なペースで。めまいが出たら中止。'
  },
  {
    id: 'br-rib-expansion',
    name: '肋骨拡張トレーニング',
    method: 'breathing',
    category: 'breathing',
    curveTypes: ['thoracic', 'thoracolumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 2,
    description: '側弯により制限された凹側の肋骨拡張を促進するターゲット呼吸。',
    procedure: [
      '座位または側臥位をとる',
      '凹側の肋骨にタオルを巻き軽く圧迫',
      'タオルの圧に抗するように凹側を吸気で拡張',
      '凸側は軽く圧迫して過膨張を防ぐ',
      '10呼吸を1セットとする'
    ],
    sets: 3,
    reps: 10,
    duration: null,
    caution: 'タオルの圧は軽く。肋骨の痛みがあれば中止。'
  },
  {
    id: 'br-corrective-walk',
    name: '矯正ウォーキング',
    method: 'breathing',
    category: 'cardio',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '矯正姿勢を意識しながらの有酸素歩行。心肺機能と姿勢維持力を同時に向上。',
    procedure: [
      '矯正位で立位をとる',
      '自然な歩行速度で歩き始める',
      '5分ごとに矯正位をチェック',
      '20-30分継続',
      'クールダウンストレッチで終了'
    ],
    sets: 1,
    reps: 1,
    duration: 1200,
    caution: '適切な靴を着用。痛みが出たら歩行速度を落とすか休息。'
  },
  {
    id: 'br-swimming-guide',
    name: '水泳指導（背泳ぎ推奨）',
    method: 'breathing',
    category: 'cardio',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 2,
    description: '水中での対称的な運動。背泳ぎは脊柱伸展位を促し、側弯に適した有酸素運動。',
    procedure: [
      '水中ウォーキングから開始',
      '背泳ぎ: 左右対称の動きで脊柱を伸長',
      'クロール: 呼吸側を凹側にして実施',
      '平泳ぎ: 胸椎伸展に有効だが頸椎注意',
      '20-30分の水中運動を週2-3回'
    ],
    sets: 1,
    reps: 1,
    duration: 1500,
    caution: 'バタフライは側弯には推奨されない。プールの深さに注意。'
  },

  // ────────── 術後専用（4種） ──────────

  {
    id: 'post-breathing',
    name: '術後呼吸エクササイズ',
    method: 'postSurgery',
    category: 'breathing',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['acute', 'recovery'],
    difficulty: 1,
    description: '術後の肺合併症予防と呼吸機能回復。インセンティブスパイロメトリー併用。',
    procedure: [
      '仰臥位または座位（ベッド挙上30°以上）',
      '深呼吸: 4秒吸気 → 2秒保持 → 6秒呼気',
      'インセンティブスパイロメトリー使用',
      '咳嗽時は枕で術創を保護',
      '1時間に10回実施'
    ],
    sets: 1,
    reps: 10,
    duration: null,
    caution: '術創の痛みが強い場合は鎮痛後に実施。無理な咳嗽は避ける。'
  },
  {
    id: 'post-ankle-pump',
    name: 'アンクルポンプ＋四肢運動',
    method: 'postSurgery',
    category: 'strengthening',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['acute'],
    difficulty: 1,
    description: '下肢の血栓予防と筋力維持。術当日または翌日から開始。',
    procedure: [
      '仰臥位で足関節の底背屈を繰り返す',
      '膝の伸展・屈曲（ベッド上）',
      '股関節の屈曲（膝を胸に引きつけ）※制限範囲内',
      '上肢のグーパー運動',
      '各10回×3セット'
    ],
    sets: 3,
    reps: 10,
    duration: null,
    caution: '医師の許可範囲で実施。脊柱の回旋・屈曲は禁忌。'
  },
  {
    id: 'post-staged-gait',
    name: '段階的歩行訓練',
    method: 'postSurgery',
    category: 'functional',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['acute', 'recovery', 'strengthening'],
    difficulty: 2,
    description: '術後のモビリティ回復を段階的に進める。ログロール→座位→歩行の順序。',
    procedure: [
      '第1段階: ログロール（体幹を一塊で寝返り）',
      '第2段階: 端座位保持（5分から徐々に延長）',
      '第3段階: 歩行器使用で10m歩行',
      '第4段階: 杖歩行→独歩',
      '第5段階: 階段昇降'
    ],
    sets: 1,
    reps: 1,
    duration: null,
    caution: '必ず医療者監視下で段階を進める。BLR（前屈・持ち上げ・回旋）制限を厳守。'
  },
  {
    id: 'post-scar-mob',
    name: '創部モビライゼーション',
    method: 'postSurgery',
    category: 'stretching',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['recovery', 'strengthening'],
    difficulty: 1,
    description: '手術創の瘢痕組織の癒着を予防し、周囲組織の柔軟性を維持する。',
    procedure: [
      '創部が完全に閉鎖していることを確認（通常術後4-6週）',
      'オイルまたはクリームを使用',
      '瘢痕の上を軽く圧迫しながら円を描く',
      '瘢痕に垂直方向にスライド',
      '1日2回、各5分実施'
    ],
    sets: 1,
    reps: 1,
    duration: 300,
    caution: '発赤・腫脹・滲出液がある場合は中止し医師に報告。'
  }
];
