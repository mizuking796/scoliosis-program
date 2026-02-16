/* ======================================================
   side-shift.js — Side-Shiftエクササイズ（3種）
   Lateral shift correction approach
   ====================================================== */
'use strict';

ExerciseRegistry.register([

  // ────────── Side-Shift（3種） ──────────

  {
    id: 'ss-lateral-shift',
    name: '側方シフト',
    method: 'sideShift',
    category: 'correction',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced'],
    difficulty: 1,
    description: '体幹を矯正方向に側方移動させ、カーブの凸側を縮小する。シンプルかつ効果的な矯正手技で自宅練習に適する。',
    procedure: [
      '立位で足を肩幅に開き、骨盤を安定させる',
      '体幹を矯正方向（凹側方向）にゆっくり側方移動させる',
      'カーブの凸側が縮小する感覚を確認しながら15秒保持する',
      '中立位に戻り3秒休息した後、再度側方シフトを行う',
      '鏡で体幹の偏位が矯正されていることを視覚的に確認する'
    ],
    sets: 3,
    reps: 10,
    duration: 15,
    caution: '過度な側方シフトは反対側の代償カーブを悪化させる可能性がある。痛みのない範囲で行う。'
  },
  {
    id: 'ss-repetitive-correction',
    name: '反復矯正',
    method: 'sideShift',
    category: 'correction',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 2,
    description: '矯正位への移動を反復し、神経筋パターンを再学習させる。反復回数の多さが運動学習効果を高める。',
    procedure: [
      '立位で開始姿勢をとり、現在のカーブ偏位を自覚する',
      '矯正方向への側方シフトを素早く行い、矯正位に到達する',
      '矯正位で2秒保持した後、中立位に戻る',
      'リズミカルに矯正と中立の往復運動を繰り返す',
      '50回の反復ごとに矯正の精度と速度を自己評価する'
    ],
    sets: 5,
    reps: 10,
    duration: null,
    caution: '反復速度を上げすぎると矯正精度が低下する。正確さを優先し速度は段階的に上げる。'
  },
  {
    id: 'ss-weight-shift',
    name: '荷重移動',
    method: 'sideShift',
    category: 'correction',
    curveTypes: ['lumbar', 'thoracolumbar', 'double'],
    phases: ['intermediate', 'advanced'],
    difficulty: 2,
    description: '立位での荷重を矯正方向に移動し、骨盤・腰椎の矯正を促進する。重力を利用した機能的矯正アプローチ。',
    procedure: [
      '立位で体重計2台に片足ずつ乗り、左右の荷重差を確認する',
      '矯正方向の脚に体重を移動させ、骨盤の傾斜を矯正する',
      '荷重移動位を10秒保持し、体幹の矯正位を同時に維持する',
      '中立位に戻り、次回の荷重移動の精度を高めるよう意識する',
      '徐々に体重計なしでも正しい荷重配分を再現できるようにする'
    ],
    sets: 3,
    reps: 8,
    duration: 10,
    caution: '股関節や膝関節に痛みがある場合は荷重量を調整する。バランスを崩さないよう壁の近くで実施する。'
  }

]);
