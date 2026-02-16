'use strict';

ExerciseRegistry.register([

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
  }

]);
