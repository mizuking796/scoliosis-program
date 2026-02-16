/* ======================================================
   manual.js — 徒手療法・補助療法エクササイズ（9種）
   Manual therapy + complementary approaches
   ====================================================== */
'use strict';

ExerciseRegistry.register([

  // ────────── 筋膜リリース（4種） ──────────

  {
    id: 'man-myofascial-thoracic',
    name: '胸椎筋膜リリース',
    method: 'manual',
    category: 'stretching',
    curveTypes: ['thoracic', 'double'],
    phases: ['initial', 'intermediate', 'advanced'],
    difficulty: 1,
    description: '胸椎周囲の筋膜制限を徒手的に解除する。矯正運動の効果を高めるための準備的介入として位置づけられる。',
    procedure: [
      '腹臥位でリラックスし、セラピストが胸椎傍脊柱筋の筋膜制限を触診で評価する',
      '凸側の脊柱起立筋群・菱形筋の筋膜に対して持続的な圧迫と滑走手技を適用する',
      '肋間筋の短縮部位に対して肋骨に沿った筋膜リリースを行う',
      '肩甲帯周囲（僧帽筋・前鋸筋）の筋膜制限も合わせて解除する',
      'リリース後に胸椎の回旋・側屈可動域を再評価し、改善を確認する'
    ],
    sets: 1,
    reps: 1,
    duration: 300,
    caution: '骨突起部への直接的な強圧は避ける。骨粗鬆症がある場合は圧の強さに注意する。施術後に一時的な痛みが出ることがある。'
  },
  {
    id: 'man-myofascial-lumbar',
    name: '腰椎筋膜リリース',
    method: 'manual',
    category: 'stretching',
    curveTypes: ['lumbar', 'thoracolumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced'],
    difficulty: 1,
    description: '腰椎周囲の筋膜制限を徒手的に解除する。腰部の柔軟性と矯正可動域を改善し、腰椎カーブの矯正を促進する。',
    procedure: [
      '腹臥位でリラックスし、セラピストが腰椎傍脊柱筋と腰方形筋の筋膜を触診する',
      '凸側の腰方形筋・腸肋筋に対して深部横断摩擦と持続圧迫を適用する',
      '胸腰筋膜の後層に対して広範囲な筋膜リリースを行い、組織の滑走性を回復する',
      '腸腰筋の短縮がある場合は側臥位で腸腰筋の筋膜リリースも追加する',
      'リリース後に腰椎の側屈・回旋可動域を再評価し、矯正運動の効果を確認する'
    ],
    sets: 1,
    reps: 1,
    duration: 300,
    caution: '腰部への深部手技は腎臓部位を避けて行う。急性腰痛時は施術を延期する。施術後は水分補給を促す。'
  },
  {
    id: 'man-trigger-point',
    name: 'トリガーポイントリリース',
    method: 'manual',
    category: 'stretching',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '側弯に伴う筋スパズムのトリガーポイントを解除し、疼痛軽減と可動性改善を図る。凸側に好発する筋硬結への対処。',
    procedure: [
      'セラピストが凸側の脊柱起立筋・腰方形筋・菱形筋のトリガーポイントを触診で特定する',
      '特定したトリガーポイントに対して虚血性圧迫（60-90秒の持続圧迫）を適用する',
      '圧迫によりトリガーポイントの放散痛が再現されることを確認する',
      '圧迫解除後にストレッチを行い、筋のリラクゼーションを促進する',
      '自己管理としてテニスボールを用いたセルフリリースの手技を指導する'
    ],
    sets: 1,
    reps: 1,
    duration: 300,
    caution: '虚血性圧迫の痛みは耐えられる範囲にとどめる（VAS 7/10以下）。抗凝固薬服用中は施術を控える。'
  },
  {
    id: 'man-soft-tissue-mob',
    name: '軟部組織モビライゼーション',
    method: 'manual',
    category: 'stretching',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced'],
    difficulty: 2,
    description: '体幹軟部組織の可動性を改善する徒手療法。矯正の前処置として実施し、組織の伸長性と滑走性を回復する。',
    procedure: [
      '座位または側臥位で、セラピストが体幹の軟部組織制限を系統的に評価する',
      '皮膚・皮下組織の滑走制限に対して表層の組織動員手技を適用する',
      '深層筋の短縮に対して深部横断摩擦とストリッピングを行う',
      '椎間関節周囲の軟部組織に対してモビライゼーションを追加する',
      '処置後に矯正運動を実施し、矯正可動域の改善を確認する'
    ],
    sets: 1,
    reps: 1,
    duration: 300,
    caution: '施術強度は患者の反応に応じて調整する。皮膚疾患・感染症・悪性腫瘍がある部位は禁忌。'
  },

  // ────────── キネシオテーピング（3種） ──────────

  {
    id: 'man-kinesio-correction',
    name: '矯正テーピング',
    method: 'manual',
    category: 'correction',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: 'キネシオテープを矯正方向に貼付し、持続的な感覚入力で姿勢修正を促進する。テープの弾性力が矯正方向への動きを補助する。',
    procedure: [
      '貼付部位の皮膚を清潔にし、体毛が多い場合は事前に処理する',
      '矯正位をとった状態で、凸側から凹側方向にテープの起始部を固定する',
      'テープに25-50%の張力をかけながら矯正方向に沿って貼付する',
      '終始部はテンションなしで固定し、テープ端の剥がれを防止する',
      '貼付後に矯正位をとり、テープの張力が矯正を補助していることを確認する'
    ],
    sets: 1,
    reps: 1,
    duration: null,
    caution: 'テープアレルギーの有無を事前確認する。皮膚に発赤・かゆみが出たら即座に除去する。48-72時間で交換する。'
  },
  {
    id: 'man-kinesio-pain',
    name: '除痛テーピング',
    method: 'manual',
    category: 'correction',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '疼痛部位へのキネシオテープ貼付で筋緊張緩和と疼痛軽減を図る。テープによる皮膚挙上効果が局所の循環改善をもたらす。',
    procedure: [
      '疼痛部位を触診で特定し、筋緊張の方向と範囲を確認する',
      '疼痛部位を伸長位にセットし、テープの基部をアンカーとして固定する',
      'テープに15-25%の軽い張力をかけながら疼痛筋の走行に沿って貼付する',
      'スペースコレクション（疼痛部位にテープを星型に貼付）を併用し、皮下スペースを確保する',
      '貼付後に疼痛の変化を評価し、効果を確認する'
    ],
    sets: 1,
    reps: 1,
    duration: null,
    caution: 'テーピングのみで疼痛管理を行わず、原因治療と並行して実施する。循環障害がある部位は禁忌。'
  },
  {
    id: 'man-kinesio-postural',
    name: '姿勢サポートテーピング',
    method: 'manual',
    category: 'correction',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate'],
    difficulty: 1,
    description: '肩甲帯・体幹へのテーピングで正しい姿勢パターンの学習を支援する。テープの触覚刺激が姿勢逸脱時の気づきを促す。',
    procedure: [
      '矯正位をとった状態で、肩甲帯の位置を確認する',
      '両側の肩甲骨を内転・下制位に誘導し、Y字テープで固定する',
      '脊柱に沿ったI字テープを矯正位で貼付し、体幹の伸長を補助する',
      '姿勢が崩れるとテープの張力変化を皮膚で感知できることを確認する',
      '日常生活で姿勢が崩れた時にテープが「気づきの手がかり」となるよう指導する'
    ],
    sets: 1,
    reps: 1,
    duration: null,
    caution: 'テーピングへの依存を避け、テープなしでの姿勢維持を並行して練習する。入浴後は交換する。'
  },

  // ────────── 電気刺激療法（2種） ──────────

  {
    id: 'man-less',
    name: '側弯電気刺激（LESS）',
    method: 'manual',
    category: 'strengthening',
    curveTypes: ['thoracic', 'thoracolumbar', 'double'],
    phases: ['intermediate', 'advanced'],
    difficulty: 1,
    description: '凸側表面電気刺激による筋収縮誘発。夜間使用で凸側筋群を持続的に活性化し、カーブ進行の抑制を図る。',
    procedure: [
      'カーブ凸側の脊柱起立筋群上に電極パッドを配置する',
      '刺激強度を筋収縮が目視できるレベルに調整する（不快感のない範囲）',
      '刺激周波数30-50Hz、パルス幅200-300μsに設定する',
      'ON/OFFサイクルを6秒ON・6秒OFFに設定し、30分間の刺激を行う',
      '夜間使用の場合は就寝前に装着し、タイマーで自動停止を設定する'
    ],
    sets: 1,
    reps: 1,
    duration: 1800,
    caution: 'ペースメーカー使用者は絶対禁忌。てんかんの既往がある場合は医師に相談。皮膚トラブルがあれば電極位置を変更する。'
  },
  {
    id: 'man-nmes',
    name: '神経筋電気刺激（NMES）',
    method: 'manual',
    category: 'strengthening',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['intermediate', 'advanced'],
    difficulty: 1,
    description: '凹側の弱化した筋群にNMESを適用し、筋力強化と矯正力を補助する。随意収縮と電気刺激の同時実施で効果を最大化する。',
    procedure: [
      'カーブ凹側の弱化した脊柱起立筋群上にNMES電極を配置する',
      '刺激強度を最大耐容収縮レベルに段階的に上げる',
      '電気刺激のON相（10秒）で自らも矯正方向に筋収縮を行う（随意収縮の重畳）',
      'OFF相（30秒）でリラクゼーションを行う',
      '10回の刺激サイクルを1セットとし、合計3セット実施する'
    ],
    sets: 3,
    reps: 10,
    duration: 30,
    caution: 'ペースメーカー使用者は絶対禁忌。妊娠中の腹部・腰部への使用は禁忌。刺激部位に感覚障害がある場合は注意が必要。'
  }

]);
