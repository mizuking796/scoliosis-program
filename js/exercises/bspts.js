/* ======================================================
   bspts.js — Barcelona/BSPTSエクササイズ（5種）
   Barcelona Scoliosis Physical Therapy School
   Rigo classification based approach
   ====================================================== */
'use strict';

ExerciseRegistry.register([

  // ────────── BSPTS（5種） ──────────

  {
    id: 'bspts-3d-block',
    name: '3Dブロック呼吸',
    method: 'bspts',
    category: 'breathing',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 2,
    description: 'Rigo分類に基づき胸郭を3つのブロックに分け、各ブロックへの選択的呼吸を行う。胸郭の変形パターンに応じた3次元的呼吸矯正。',
    procedure: [
      '座位で胸郭を上部・中部・下部の3ブロックに意識を分割する',
      '両手で各ブロックに触れ、呼吸に伴う胸郭の動きを触覚で確認する',
      '凹側ブロックへ選択的に吸気を送り込み、手で拡張を感じる',
      '凸側ブロックは呼気時に積極的に収縮させ、対称性を回復する',
      '3ブロックの順序的拡張と収縮を統合し、連続した呼吸パターンを完成させる'
    ],
    sets: 3,
    reps: 10,
    duration: null,
    caution: 'ブロック呼吸の習得にはBSPTS認定セラピストの指導が不可欠。過換気症状（めまい・しびれ）が出現したら通常呼吸に戻す。'
  },
  {
    id: 'bspts-rigo-correction',
    name: 'Rigo分類別矯正',
    method: 'bspts',
    category: 'correction',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced'],
    difficulty: 3,
    description: 'Rigo-Villagrasa分類に基づく5パターン別の個別矯正エクササイズ。カーブパターンに応じた最適な矯正戦略を適用する。',
    procedure: [
      'Rigo分類（A1/A2/B1/B2/C等）に基づきカーブパターンを確認する',
      '分類に応じた矯正姿勢をとり、主カーブの頂椎を中心に3D矯正を行う',
      '骨盤の位置を分類パターンに応じて調整し、基盤からの矯正を確立する',
      '3Dブロック呼吸を併用し、矯正位を呼吸サイクルごとに強化する',
      '矯正位を保持しながら上肢・下肢の動作を追加し、機能的安定性を向上させる'
    ],
    sets: 3,
    reps: 5,
    duration: null,
    caution: 'Rigo分類の判定と矯正パターンの選択は必ず認定セラピストが行う。誤った分類に基づく矯正は逆効果となる可能性がある。'
  },
  {
    id: 'bspts-sagittal-norm',
    name: '矢状面正常化',
    method: 'bspts',
    category: 'correction',
    curveTypes: ['thoracic', 'double'],
    phases: ['intermediate', 'advanced'],
    difficulty: 2,
    description: '胸椎後弯の適正化と腰椎前弯の回復を目指す矢状面矯正。側弯に伴うフラットバック等の矢状面変形を改善する。',
    procedure: [
      '立位で矢状面のアライメントを確認し、胸椎後弯と腰椎前弯の状態を評価する',
      '四つ這い位で胸椎を選択的に屈曲させ、生理的後弯を回復する運動を行う',
      '座位で骨盤を軽度前傾させ、腰椎前弯の適正化を図る',
      '3Dブロック呼吸の上部ブロックを活用し、胸椎の矢状面カーブを調整する',
      '立位で矢状面矯正を保持しながら歩行し、動的環境での維持能力を確認する'
    ],
    sets: 3,
    reps: 8,
    duration: null,
    caution: '矢状面の過矯正（胸椎後弯の過度な増加）に注意。腰痛を伴う場合は腰椎前弯の調整を段階的に行う。'
  },
  {
    id: 'bspts-pelvis-correction',
    name: '骨盤帯矯正',
    method: 'bspts',
    category: 'correction',
    curveTypes: ['lumbar', 'thoracolumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced'],
    difficulty: 2,
    description: '骨盤の傾斜と回旋を矯正し、腰椎カーブの改善を促進する。骨盤は脊柱矯正の基盤であり、その正常化が上位の矯正効果を左右する。',
    procedure: [
      '座位で両坐骨の接地圧を確認し、骨盤の傾斜方向を把握する',
      '凹側坐骨への荷重を増加させ、骨盤の冠状面傾斜を矯正する',
      '骨盤の回旋をハンズオンで確認し、矯正方向への回旋運動を行う',
      '矯正した骨盤位を保持しながら3Dブロック呼吸の下部ブロックを活性化する',
      '立位に移行し、骨盤矯正位を荷重下でも維持できることを確認する'
    ],
    sets: 3,
    reps: 8,
    duration: null,
    caution: '仙腸関節に痛みがある場合は負荷を軽減する。骨盤矯正の方向を誤ると腰椎カーブが悪化する可能性がある。'
  },
  {
    id: 'bspts-functional-integration',
    name: '機能的統合',
    method: 'bspts',
    category: 'functional',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['advanced', 'maintenance'],
    difficulty: 2,
    description: 'BSPTSの矯正原理を日常動作に統合する最終段階。3D矯正と呼吸パターンを無意識レベルで維持する能力を養成する。',
    procedure: [
      'Rigo分類に基づく矯正位と3Dブロック呼吸を同時に実施し、基本パターンを確認する',
      '矯正位を保持しながら立位での荷重移動・歩行・階段昇降を行う',
      '日常動作（着座・起立・物の持ち上げ）を矯正位で繰り返し練習する',
      'スポーツや趣味活動の動作に矯正パターンを統合する',
      '1日の中で定期的に矯正位をセルフチェックし、維持時間を徐々に延長する'
    ],
    sets: 1,
    reps: 1,
    duration: null,
    caution: '完璧な矯正を常時維持しようとすると精神的負担が大きい。意識する時間帯を決めて段階的に拡大する。'
  }

]);
