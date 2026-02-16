/* ======================================================
   yoga.js — ヨガ for 側弯症エクササイズ（5種）
   Yoga-based scoliosis-specific exercises
   ====================================================== */
'use strict';

ExerciseRegistry.register([

  // ────────── Yoga for Scoliosis（5種） ──────────

  {
    id: 'yoga-side-plank',
    name: 'サイドプランク・ヴァシシュタアーサナ',
    method: 'yoga',
    category: 'strengthening',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 3,
    description: 'Fishman研究に基づく凸側サイドプランク。Cobb角の改善エビデンスがあり、凸側を下にした保持で側弯矯正効果を発揮する。',
    procedure: [
      'カーブの凸側を下にして側臥位をとり、下の手を肩の真下に配置する',
      '手と足で体を持ち上げ、頭から足まで一直線のサイドプランクを形成する',
      '上側の手は天井方向に伸ばし、体幹の矯正位を維持する',
      '呼吸を止めず、30秒間保持を目指す',
      '凸側のみの片側実施を基本とし、Fishmanプロトコルに準じた非対称トレーニングとする'
    ],
    sets: 3,
    reps: 1,
    duration: 30,
    caution: '手首や肩に過度な負担がかかるため、膝付き修正版から開始する。手首痛がある場合は前腕支持で代替する。'
  },
  {
    id: 'yoga-triangle',
    name: '三角のポーズ（トリコナアーサナ）',
    method: 'yoga',
    category: 'stretching',
    curveTypes: ['thoracic', 'thoracolumbar', 'double'],
    phases: ['intermediate', 'advanced'],
    difficulty: 2,
    description: '立位での側屈姿勢。体側の伸長と体幹の回旋意識を養い、凸側の短縮組織をストレッチする。',
    procedure: [
      '両足を大きく開き、凸側の足先を90°外に向ける',
      '凸側方向に体幹を側屈させ、下の手を脛または足首に添える',
      '上側の手を天井方向に伸ばし、胸を開く',
      '凸側の体側が伸長されるのを感じながら20秒保持する',
      '反対側は軽めに実施し、凸側ストレッチを重視する'
    ],
    sets: 3,
    reps: 3,
    duration: 20,
    caution: '膝のロック（過伸展）を避ける。側屈時に体幹が前方に倒れないよう注意する。'
  },
  {
    id: 'yoga-cat-cow',
    name: '猫牛のポーズ（ヨガ版）',
    method: 'yoga',
    category: 'stretching',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '呼吸と連動した脊柱の屈伸運動。椎間の可動性改善とウォームアップに適する基本的なヨガポーズ。',
    procedure: [
      '四つ這い位で手は肩の真下、膝は股関節の真下に配置する',
      '吸気で背中を反らせ胸を開く（牛のポーズ）、骨盤を前傾させ尾骨を天井に向ける',
      '呼気で背中を丸め肩甲骨間を引き離す（猫のポーズ）、骨盤を後傾させ尾骨を床に向ける',
      '呼吸と動きを連動させ、各ポジションで2秒間の保持を入れる',
      '矯正方向への側屈を微量加えることで側弯に対する特異的効果を付加する'
    ],
    sets: 3,
    reps: 10,
    duration: null,
    caution: '腰椎の過伸展（牛のポーズ時）に注意。動きは滑らかに行い、急な反動を避ける。'
  },
  {
    id: 'yoga-warrior2',
    name: '戦士のポーズII（ヴィラバドラアーサナII）',
    method: 'yoga',
    category: 'strengthening',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced'],
    difficulty: 2,
    description: '立位で股関節と体幹を安定させ、下肢筋力と姿勢制御を向上させる。骨盤の安定化を通じた体幹支持力の強化。',
    procedure: [
      '両足を大きく開き（約120cm）、前足の膝を90°に曲げランジ姿勢をとる',
      '後足は45°外側に向け、踵をしっかり床に接地する',
      '両腕を肩の高さで前後に伸ばし、体幹を矯正位に保持する',
      '骨盤が前後に傾かず正面を向くように安定させ、20秒保持する',
      '左右均等に実施し、矯正位を維持しながら下肢の筋力強化を図る'
    ],
    sets: 3,
    reps: 3,
    duration: 20,
    caution: '前膝がつま先を超えないよう注意する。膝の痛みがある場合は屈曲角度を浅くする。'
  },
  {
    id: 'yoga-corpse-mindful',
    name: 'シャヴァーサナ（矯正意識）',
    method: 'yoga',
    category: 'breathing',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '仰臥位でのリラクゼーション。矯正位を意識した身体スキャン瞑想で、心身のストレスを軽減し治療へのアドヒアランスを高める。',
    procedure: [
      '仰臥位で両手を体側に置き、手のひらを天井に向けて全身をリラックスさせる',
      '矯正位を意識しながら足先から頭頂まで順番に身体をスキャンし、各部位の緊張を解放する',
      '凸側の筋緊張を意識的にリリースし、左右の非対称な緊張パターンに気づく',
      '深い腹式呼吸を行いながら脊柱の自然な矯正位を感じ取る',
      '5分間の静寂の中で体の内的感覚に集中し、矯正意識を深層に刻み込む'
    ],
    sets: 1,
    reps: 1,
    duration: 300,
    caution: '眠ってしまう場合はタイマーを設定する。腰痛がある場合は膝下にクッションを入れる。'
  }

]);
