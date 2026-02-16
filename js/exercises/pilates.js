/* ======================================================
   pilates.js — ピラティス for 側弯症エクササイズ（6種）
   Pilates-based scoliosis-specific exercises
   ====================================================== */
'use strict';

ExerciseRegistry.register([

  // ────────── Pilates for Scoliosis（6種） ──────────

  {
    id: 'pil-hundreds',
    name: 'ハンドレッド（矯正版）',
    method: 'pilates',
    category: 'strengthening',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced'],
    difficulty: 2,
    description: 'ピラティスの基本種目を側弯矯正位で実施し、深層体幹筋を活性化する。腹横筋と多裂筋の協調的収縮で脊柱安定性を向上させる。',
    procedure: [
      '仰臥位で両膝をテーブルトップポジション（股関節・膝関節90°）にセットする',
      '頭と肩甲骨を床から持ち上げ、矯正位を意識しながらカーブアップする',
      '両腕を体側に伸ばし、小さく上下にパンピング（5回吸気・5回呼気のリズム）を行う',
      'パンピング中も体幹の矯正位を維持し、骨盤のニュートラルを保つ',
      '60秒間（100回のパンピング）を1セットとし、腹部深層筋の持久力を養う'
    ],
    sets: 3,
    reps: 1,
    duration: 60,
    caution: '首の痛みがある場合は頭を床に下ろして実施する。腰が床から浮く場合は膝の角度を調整する。'
  },
  {
    id: 'pil-swimming',
    name: 'スイミング',
    method: 'pilates',
    category: 'strengthening',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 2,
    description: '腹臥位で対角の手足を交互に動かし、背筋群と四肢の協調性を強化する。脊柱伸筋群の持久力向上に効果的。',
    procedure: [
      '腹臥位で両手を頭上に伸ばし、両脚もまっすぐ伸ばす',
      '頭と胸を軽く床から持ち上げ、脊柱を伸長する',
      '右手と左脚を同時に持ち上げ、対角パターンで交互に動かす',
      '泳ぐように滑らかなリズムで手足を交互に上下させる',
      '矯正位を維持し、体幹が左右に揺れないよう安定させる'
    ],
    sets: 3,
    reps: 10,
    duration: null,
    caution: '腰椎の過伸展に注意し、腹筋を軽く収縮させた状態を維持する。首の過伸展を避け、視線は床面のやや前方に向ける。'
  },
  {
    id: 'pil-mermaid',
    name: 'マーメイド',
    method: 'pilates',
    category: 'stretching',
    curveTypes: ['thoracic', 'thoracolumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced'],
    difficulty: 1,
    description: '座位での側屈ストレッチ。凸側の体側筋群を選択的に伸長し、矯正方向への可動域を拡大する。',
    procedure: [
      'あぐら座位または横座りで開始し、骨盤を安定させる',
      '凸側の腕を頭上に伸ばし、凹側方向に体幹を側屈する',
      '凸側の体側（広背筋・腰方形筋・外腹斜筋）のストレッチを感じる',
      '深呼吸を行いながら20秒保持し、呼気ごとにストレッチを深める',
      'ゆっくり中立位に戻り、反対側は軽いストレッチにとどめる（凸側:凹側 = 2:1）'
    ],
    sets: 3,
    reps: 5,
    duration: 20,
    caution: '痛みが出る範囲まで側屈しない。肋骨下部に違和感がある場合は側屈の角度を減少させる。'
  },
  {
    id: 'pil-spine-twist',
    name: 'スパインツイスト（矯正版）',
    method: 'pilates',
    category: 'stretching',
    curveTypes: ['thoracic', 'double'],
    phases: ['intermediate', 'advanced'],
    difficulty: 2,
    description: '座位での回旋運動を矯正方向に非対称に実施する。胸椎の回旋可動域改善と脊柱回旋筋群のバランス修正。',
    procedure: [
      '長座位で骨盤を垂直に立て、両腕を肩の高さで横に広げる',
      '脊柱を軸方向に伸長しながら、矯正方向（凸側の脱回旋方向）に回旋する',
      '回旋位で呼気を行い、さらに回旋を深める（パルス2回）',
      '中立位に戻り、反対側は回旋角度を控えめにする',
      '矯正方向への回旋を重視し、比率を2:1で非対称に実施する'
    ],
    sets: 3,
    reps: 8,
    duration: null,
    caution: '骨盤が回旋しないよう坐骨の接地を維持する。腰椎の回旋は最小限にし、胸椎のみを選択的に回旋する。'
  },
  {
    id: 'pil-roll-up',
    name: 'ロールアップ（修正版）',
    method: 'pilates',
    category: 'strengthening',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced'],
    difficulty: 2,
    description: '脊柱の分節的屈曲を矯正位意識で実施し、腹筋群を強化する。各椎骨を順番に床から持ち上げる精密な運動制御。',
    procedure: [
      '仰臥位で両腕を頭上に伸ばし、脊柱をニュートラルに配置する',
      '吸気で両腕を天井方向に上げ、呼気で顎を引き頭から順に床から持ち上げる',
      '矯正位を意識しながら一椎体ずつ分節的に屈曲し、長座位まで起き上がる',
      '長座位で脊柱を伸長し矯正位を確認する',
      '呼気で一椎体ずつ分節的に床に戻り、仰臥位に帰る'
    ],
    sets: 3,
    reps: 8,
    duration: null,
    caution: '腰椎が急激に屈曲しないよう腹筋でコントロールする。完遂が困難な場合はタオルを足にかけて補助する。'
  },
  {
    id: 'pil-side-kick',
    name: 'サイドキック',
    method: 'pilates',
    category: 'strengthening',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced', 'maintenance'],
    difficulty: 2,
    description: '側臥位での脚の前後運動。骨盤安定化と股関節周囲筋の強化を通じて下肢からの脊柱支持力を向上させる。',
    procedure: [
      '側臥位で下肢をまっすぐ伸ばし、頭は下の腕で支える',
      '体幹を矯正位に保持し、骨盤が前後に傾かないよう安定させる',
      '上側の脚を股関節の高さに持ち上げ、前方にキック（吸気で2回パルス）する',
      '後方にスイング（呼気で1回）し、股関節伸展筋群を活性化する',
      '体幹の安定を維持しながら脚の前後運動を繰り返す'
    ],
    sets: 3,
    reps: 10,
    duration: null,
    caution: '骨盤の前後動揺を最小限にすることが最優先。腰痛がある場合は脚の振幅を小さくする。'
  }

]);
