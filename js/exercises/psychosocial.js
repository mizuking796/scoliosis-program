/* ======================================================
   psychosocial.js — 心理社会的支援（3種）
   Psychosocial support for scoliosis patients
   ====================================================== */
'use strict';

ExerciseRegistry.register([

  // ────────── Psychosocial（3種） ──────────

  {
    id: 'psy-body-image',
    name: 'ボディイメージカウンセリング',
    method: 'psychosocial',
    category: 'functional',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '外見の変化への心理的適応を支援する。自己肯定感とボディイメージの改善を通じて治療へのモチベーションを維持する。',
    procedure: [
      '側弯症による外見の変化に対する患者の感情を傾聴し、受容する',
      '側弯症のある身体を否定せず、できることに焦点を当てたポジティブフレーミングを行う',
      '装具装着に伴う外見の変化への対処戦略を一緒に検討する',
      '身体への信頼を回復するため、矯正運動で得られた改善を視覚的にフィードバックする',
      '必要に応じて臨床心理士による専門的カウンセリングへの紹介を行う'
    ],
    sets: 1,
    reps: 1,
    duration: null,
    caution: '思春期の患者は特にボディイメージへの影響が大きい。うつ症状や強い不安がある場合は専門家に紹介する。'
  },
  {
    id: 'psy-peer-support',
    name: 'ピアサポート',
    method: 'psychosocial',
    category: 'functional',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: '同じ側弯を持つ同年代との交流を促進する。孤立感の軽減と治療モチベーションの維持に効果的な社会的支援介入。',
    procedure: [
      '側弯症患者のグループセッションまたはオンラインコミュニティへの参加を促す',
      '治療経験や日常生活での工夫を共有し、実践的な対処法を交換する',
      '装具装着や運動継続に関する励まし合いの環境を構築する',
      '治療を成功させた先輩患者（ロールモデル）との交流機会を設ける',
      '保護者同士のピアサポートグループも並行して運営し、家族支援を充実させる'
    ],
    sets: 1,
    reps: 1,
    duration: null,
    caution: '個人情報とプライバシーの保護に配慮する。ネガティブな比較や競争が生じないよう、グループのルールを明確にする。'
  },
  {
    id: 'psy-mental-screening',
    name: 'メンタルヘルススクリーニング',
    method: 'psychosocial',
    category: 'functional',
    curveTypes: ['thoracic', 'thoracolumbar', 'lumbar', 'double'],
    phases: ['initial', 'intermediate', 'advanced', 'maintenance'],
    difficulty: 1,
    description: 'SRS-22質問票等による定期的な精神的健康評価。治療全期間を通じて心理的側面をモニタリングし、必要に応じて専門家を紹介する。',
    procedure: [
      '初回評価時にSRS-22質問票を実施し、ベースラインの精神健康状態を把握する',
      '3ヶ月ごとの定期評価で自己イメージ・メンタルヘルス・治療満足度の変化を追跡する',
      '急激なスコア低下が見られた場合は個別面談を行い、要因を探索する',
      '装具処方・手術決定等の節目で追加スクリーニングを実施する',
      '基準値を下回る場合は臨床心理士・精神科医への紹介と連携体制を構築する'
    ],
    sets: 1,
    reps: 1,
    duration: null,
    caution: 'スクリーニングの結果のみで診断を行わない。自殺念慮や自傷行為のリスクがある場合は即座に専門家に紹介する。'
  }

]);
