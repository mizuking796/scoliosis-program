'use strict';

ExerciseRegistry.register([

  // ────────── 術後専用（4種） ──────────

  {
    id: 'post-breathing',
    name: '術後呼吸エクササイズ',
    method: 'postSurgery',
    category: 'breathing',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['acute', 'recovery'],
    difficulty: 1,
    description: '術後の肺合併症予防と呼吸機能回復。インセンティブスパイロメトリー併用。',
    procedure: [
      '仰臥位または座位（ベッド挙上30°以上）',
      '深呼吸: 4秒吸気 → 2秒保持 → 6秒呼気',
      'インセンティブスパイロメトリー使用',
      '咳嗽時は枕で術創を保護',
      '1時間に10回実施'
    ],
    sets: 1,
    reps: 10,
    duration: null,
    caution: '術創の痛みが強い場合は鎮痛後に実施。無理な咳嗽は避ける。'
  },
  {
    id: 'post-ankle-pump',
    name: 'アンクルポンプ＋四肢運動',
    method: 'postSurgery',
    category: 'strengthening',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['acute'],
    difficulty: 1,
    description: '下肢の血栓予防と筋力維持。術当日または翌日から開始。',
    procedure: [
      '仰臥位で足関節の底背屈を繰り返す',
      '膝の伸展・屈曲（ベッド上）',
      '股関節の屈曲（膝を胸に引きつけ）※制限範囲内',
      '上肢のグーパー運動',
      '各10回×3セット'
    ],
    sets: 3,
    reps: 10,
    duration: null,
    caution: '医師の許可範囲で実施。脊柱の回旋・屈曲は禁忌。'
  },
  {
    id: 'post-staged-gait',
    name: '段階的歩行訓練',
    method: 'postSurgery',
    category: 'functional',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['acute', 'recovery', 'strengthening'],
    difficulty: 2,
    description: '術後のモビリティ回復を段階的に進める。ログロール→座位→歩行の順序。',
    procedure: [
      '第1段階: ログロール（体幹を一塊で寝返り）',
      '第2段階: 端座位保持（5分から徐々に延長）',
      '第3段階: 歩行器使用で10m歩行',
      '第4段階: 杖歩行→独歩',
      '第5段階: 階段昇降'
    ],
    sets: 1,
    reps: 1,
    duration: null,
    caution: '必ず医療者監視下で段階を進める。BLR（前屈・持ち上げ・回旋）制限を厳守。'
  },
  {
    id: 'post-scar-mob',
    name: '創部モビライゼーション',
    method: 'postSurgery',
    category: 'stretching',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['recovery', 'strengthening'],
    difficulty: 1,
    description: '手術創の瘢痕組織の癒着を予防し、周囲組織の柔軟性を維持する。',
    procedure: [
      '創部が完全に閉鎖していることを確認（通常術後4-6週）',
      'オイルまたはクリームを使用',
      '瘢痕の上を軽く圧迫しながら円を描く',
      '瘢痕に垂直方向にスライド',
      '1日2回、各5分実施'
    ],
    sets: 1,
    reps: 1,
    duration: 300,
    caution: '発赤・腫脹・滲出液がある場合は中止し医師に報告。'
  }

]);
