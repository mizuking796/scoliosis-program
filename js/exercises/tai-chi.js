/* ======================================================
   tai-chi.js — 太極拳 for 側弯症エクササイズ（3種）
   Tai Chi-based scoliosis-specific exercises
   ====================================================== */
'use strict';

ExerciseRegistry.register([

  // ────────── Tai Chi for Scoliosis（3種） ──────────

  {
    id: 'tc-standing-meditation',
    name: '站椿功（タントウコウ）',
    method: 'taiChi',
    category: 'balance',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '静的立位瞑想。矯正位での持続的な姿勢保持と深い呼吸の統合を行う。深層姿勢筋の持久力と体幹の安定性を向上させる。',
    procedure: [
      '足を肩幅に開き、膝を軽く曲げて立つ。重心を足裏全体に均等に配分する',
      '両手を胸の前で大きなボールを抱えるように丸く構える',
      '頭頂部を天井から吊られているイメージで脊柱を伸長し、矯正位を保持する',
      '鼻からゆっくり吸気、口からゆっくり呼気の自然な腹式呼吸を維持する',
      '60秒間の静的保持中、体の内的感覚に意識を向け矯正位の安定を確認する'
    ],
    sets: 3,
    reps: 1,
    duration: 60,
    caution: '膝の過度な屈曲を避け、軽度の屈曲にとどめる。めまいやふらつきが出た場合は座位に移行する。'
  },
  {
    id: 'tc-cloud-hands',
    name: '雲手（ウンシュ）',
    method: 'taiChi',
    category: 'functional',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced'],
    difficulty: 2,
    description: '両手を雲のようにゆっくり動かす太極拳の基本動作。体幹の回旋制御と重心移動を滑らかに統合する。',
    procedure: [
      '足を肩幅よりやや広く開き、膝を軽く曲げた基本姿勢をとる',
      '右手を顔の高さに上げ、左手を腹部の高さに下げ、体幹を右に回旋する',
      '体重を右脚に移しながら左足を右足に引き寄せ、両手の位置を入れ替え始める',
      '左手を上に、右手を下にしながら体幹を左に回旋し、体重を左脚に移す',
      '矯正位を維持しながら左右への流れるような動作を繰り返す'
    ],
    sets: 3,
    reps: 10,
    duration: null,
    caution: '動作速度はゆっくり一定に保つ。体幹の回旋時に矯正位が崩れないよう意識する。膝がつま先を超えないよう注意する。'
  },
  {
    id: 'tc-weight-transfer',
    name: '重心移動（虚実転換）',
    method: 'taiChi',
    category: 'balance',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 2,
    description: '片脚への重心移動を矯正方向に意識し、動的バランスと姿勢制御を向上させる。太極拳の「虚実」の原理に基づくバランストレーニング。',
    procedure: [
      '足を肩幅に開いた基本姿勢から、矯正方向の脚にゆっくり体重を移動する',
      '荷重脚（実）は膝を軽度屈曲し安定させ、非荷重脚（虚）は軽く床に接地する',
      '矯正位を保持しながら体重の80%を荷重脚に集中させ、5秒間保持する',
      '中央に戻り、反対方向にも同様の重心移動を行うが、矯正方向を重視する',
      '前後方向の重心移動も追加し、多方向のバランス制御能力を養う'
    ],
    sets: 3,
    reps: 8,
    duration: null,
    caution: '急な重心移動は転倒リスクがあるため、ゆっくりと行う。壁やバーの近くで実施すること。'
  }

]);
