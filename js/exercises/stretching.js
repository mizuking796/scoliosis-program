'use strict';

ExerciseRegistry.register([

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
  }

]);
