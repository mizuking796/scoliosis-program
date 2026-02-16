/* ======================================================
   lyon.js — Lyon法エクササイズ（5種）
   French school, 200年の歴史を持つ矯正体系
   ====================================================== */
'use strict';

ExerciseRegistry.register([

  // ────────── Lyon法（5種） ──────────

  {
    id: 'lyon-post-cast',
    name: 'キャスト後体操',
    method: 'lyon',
    category: 'correction',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate'],
    difficulty: 2,
    description: '石膏ギプス除去後の脊柱可動性回復と矯正位の再学習。キャスト固定期間中に失われた可動域と筋力を段階的に回復させる。',
    procedure: [
      'ギプス除去後、仰臥位で脊柱の可動域を確認する',
      '四つ這い位で骨盤の前後傾運動をゆっくり行い、腰椎の可動性を回復させる',
      '座位で体幹を矯正方向に側屈し、キャスト期間中に得た矯正位を再確認する',
      '立位で両手を頭上に伸ばし、脊柱を軸方向に伸長しながら矯正位を保持する',
      '歩行中に矯正位を維持し、日常動作への再統合を図る'
    ],
    sets: 3,
    reps: 8,
    duration: null,
    caution: 'ギプス除去直後は筋力低下と可動域制限があるため、負荷は最小限から開始する。疼痛が出現したら即座に中止する。'
  },
  {
    id: 'lyon-sagittal',
    name: '矢状面矯正エクササイズ',
    method: 'lyon',
    category: 'correction',
    curveTypes: ['thoracic', 'double'],
    phases: ['initial', 'intermediate', 'advanced'],
    difficulty: 2,
    description: '胸椎後弯と腰椎前弯のバランスを矢状面で最適化する。側弯に伴う矢状面アライメント異常を同時に改善する。',
    procedure: [
      '壁に背を向けて立ち、後頭部・胸椎・仙骨の3点接触を確認する',
      '胸椎部の壁との距離を指2本分に調整し、過度の後弯を矯正する',
      '腰椎部は手のひら1枚分の隙間を目標に、前弯の適正化を行う',
      '矯正位を保持したまま両手を前方挙上し、矢状面アライメントを維持する',
      '壁から離れて同じ矢状面矯正位を自己保持し、10秒間キープする'
    ],
    sets: 3,
    reps: 10,
    duration: null,
    caution: '胸椎後弯の過矯正（フラットバック）に注意する。腰痛がある場合は腰椎前弯の調整を慎重に行う。'
  },
  {
    id: 'lyon-brace-exercise',
    name: '装具内体操',
    method: 'lyon',
    category: 'correction',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: 'Lyon型装具装着中の矯正力を最大化する体操。装具のパッド圧を利用した能動的矯正運動。',
    procedure: [
      '装具を正しく装着し、パッドの位置と圧迫方向を確認する',
      '装具のパッド圧に抗して凹側を拡張する呼吸運動を10回行う',
      '装具内で脊柱を軸方向に伸長し、パッドによる矯正力を増強する',
      '座位で装具のウィンドウ（開口部）方向への体幹移動を意識する',
      '装具装着のまま歩行し、矯正位での日常動作を練習する'
    ],
    sets: 3,
    reps: 10,
    duration: null,
    caution: '装具のフィッティングが不良な場合は体操の効果が減少する。皮膚トラブルの有無を毎回確認する。'
  },
  {
    id: 'lyon-elongation',
    name: '脊柱軸方向延長',
    method: 'lyon',
    category: 'correction',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced'],
    difficulty: 1,
    description: '脊柱の軸方向伸長により椎間板への圧縮負荷を軽減し、椎体間スペースを確保する。Lyon法の基本原理の一つ。',
    procedure: [
      '仰臥位で全身をリラックスさせ、脊柱のニュートラルポジションを確認する',
      '頭頂部を上方に、踵を下方に引き離すイメージで脊柱を軸方向に伸長する',
      '深呼吸を行いながら30秒間の伸長保持を維持する',
      '立位に移行し、頭頂部を天井に向けて引き上げながら同様の伸長を行う',
      '伸長保持中に骨盤底筋群と腹横筋を軽く収縮させ、体幹安定性を確保する'
    ],
    sets: 3,
    reps: 5,
    duration: 30,
    caution: '伸長時に息を止めない。腰椎の過伸展を防ぐため腹筋の軽い緊張を維持する。'
  },
  {
    id: 'lyon-regional-correction',
    name: '部位別矯正',
    method: 'lyon',
    category: 'correction',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced'],
    difficulty: 3,
    description: 'Lyon法独自の部位別アプローチで胸椎・腰椎を個別に矯正する。各脊柱レベルに応じた精密な矯正運動。',
    procedure: [
      'セラピストの指示に従い、矯正対象の脊柱レベルを特定する',
      '胸椎カーブに対しては凹側肋骨の拡張と凸側肩甲帯の矯正を同時に行う',
      '腰椎カーブに対しては骨盤傾斜の矯正と凹側腰部筋群の活性化を行う',
      'ダブルカーブの場合は主カーブから矯正し、代償カーブの変化を観察する',
      '各レベルの矯正を統合し、全脊柱での矯正位を5秒間保持する'
    ],
    sets: 3,
    reps: 5,
    duration: null,
    caution: '部位別矯正は高度な技術を要するため、必ずLyon法認定セラピストの指導下で実施する。自己判断での実施は禁忌。'
  }

]);
