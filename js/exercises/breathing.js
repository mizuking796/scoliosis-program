'use strict';

ExerciseRegistry.register([

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
  }

]);
