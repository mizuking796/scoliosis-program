/* ======================================================
   fits.js — FITSエクササイズ（4種）
   Functional Individual Therapy of Scoliosis
   ====================================================== */
'use strict';

ExerciseRegistry.register([

  // ────────── FITS（4種） ──────────

  {
    id: 'fits-sensorimotor',
    name: '感覚運動バランス',
    method: 'fits',
    category: 'balance',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced'],
    difficulty: 2,
    description: '多感覚入力を用いた姿勢制御トレーニングで、バランス反応を最適化する。視覚・前庭・体性感覚の統合的再教育。',
    procedure: [
      '不安定面（バランスパッド）上に立ち、矯正位を保持する',
      '視覚入力を段階的に制限し（開眼→半閉眼→閉眼）、固有受容覚を強化する',
      'セラピストが様々な方向から軽い外乱を加え、反射的な姿勢回復反応を引き出す',
      '矯正位を崩さずにバランスを回復する能力を繰り返し練習する',
      '片脚立位での実施や上肢動作の追加で難易度を段階的に上げる'
    ],
    sets: 3,
    reps: 5,
    duration: 30,
    caution: '転倒防止のため必ず安全な環境（マット・手すり近く）で実施する。めまいやふらつきが強い場合は中止する。'
  },
  {
    id: 'fits-fascial-release',
    name: '筋膜テンション除去',
    method: 'fits',
    category: 'stretching',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced'],
    difficulty: 1,
    description: '側弯に伴う筋膜制限を解除し、矯正運動の効果を高める準備的手技。凸側の短縮した筋膜連鎖を選択的にリリースする。',
    procedure: [
      '仰臥位でリラックスし、セラピストが凸側の筋膜制限部位を触診で特定する',
      '制限部位にフォームローラーまたはボールを当て、持続的な圧迫を加える',
      '圧迫を維持したまま深呼吸を行い、30秒間の筋膜リリースを実施する',
      '凸側の体側筋膜ライン（外側線）に沿って順次リリースを進める',
      'リリース後に矯正運動を行い、可動域の改善を確認する'
    ],
    sets: 3,
    reps: 3,
    duration: 30,
    caution: '骨突起部への直接的な圧迫は避ける。痛みが強い場合は圧を軽減する。炎症のある部位には禁忌。'
  },
  {
    id: 'fits-3d-correction',
    name: '3D矯正パターン',
    method: 'fits',
    category: 'correction',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced'],
    difficulty: 3,
    description: 'FITS独自の3次元矯正パターンで全脊柱の同時矯正を実現する。側屈・回旋・伸長の3成分を統合した高度な矯正技術。',
    procedure: [
      '座位で骨盤を矯正位に配置し、矯正の基盤を安定させる',
      '腰椎レベルの側屈矯正を行い、凹側方向への移動を実行する',
      '胸椎レベルの脱回旋を追加し、凸側の回旋を減少させる',
      '脊柱全体の軸方向伸長を加え、3次元矯正パターンを完成させる',
      '3成分の矯正を同時保持しながら呼吸を維持し、5秒間キープする'
    ],
    sets: 3,
    reps: 5,
    duration: null,
    caution: '3成分の同時制御は難度が高い。各成分を個別に習得してから統合する。セラピストの監視下で実施する。'
  },
  {
    id: 'fits-motor-control',
    name: '運動制御トレーニング',
    method: 'fits',
    category: 'functional',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 2,
    description: '矯正パターンの自動化を目指す運動制御の段階的学習。認知段階から自動段階への移行を促進する。',
    procedure: [
      '矯正パターンをセラピストの口頭指示と触覚誘導で実行する（認知段階）',
      '口頭指示のみで矯正パターンを再現し、触覚誘導を減少させる（連合段階）',
      '外部指示なしで矯正パターンを自己再現し、鏡で精度を確認する',
      '矯正パターンを保持しながら日常動作（歩行・着座・物の持ち上げ）を行う',
      '注意を他の課題に向けながらも矯正パターンを維持する二重課題トレーニングを行う'
    ],
    sets: 5,
    reps: 5,
    duration: null,
    caution: '運動学習には個人差がある。進行が遅くても段階を飛ばさないこと。疲労時は矯正精度が低下するため無理をしない。'
  }

]);
