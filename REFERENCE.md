# REFERENCE — 側弯症リハビリプログラムジェネレーター v2.0

## 概要
側弯症（脊柱側弯症）患者のための運動療法プログラムを自動生成するWebアプリ。
SOSORT 2016ガイドライン準拠。102種エクササイズ、4プランテンプレート、患者管理+KPI追跡。

- **URL**: `https://mizuking796.github.io/scoliosis-program/`
- **取扱説明書**: `https://mizuking796.github.io/scoliosis-program/manual.html`
- **GitHub**: `mizuking796/scoliosis-program`
- **ソース**: `/Users/mizukishirai/claude/services/scoliosis-program/`
- **更新時はgit pushまで実施すること**

## 技術スタック
- **フロントエンド**: Vanilla JavaScript (ES2017), CSS, HTML
- **モジュールパターン**: IIFE + グローバル変数（`'use strict'`全ファイル）
- **データ保存**: localStorage（サーバー不要）
- **ルーティング**: ハッシュベースSPA（`#dashboard`, `#wizard`, `#patient`, `#plan`, `#progress`）
- **スクリプトロード**: 動的ローダー（loader.js、進捗バー付き）
- **CSP**: `default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:`
- **i18n**: 3言語（日本語/简体中文/繁體中文）
- **デプロイ**: GitHub Pages（`.nojekyll`あり）

## ファイル構成（36ファイル、8,669行）

```
scoliosis-program/
├── index.html                  (23行)     HTMLシェル + loader.js読み込み
├── manual.html                 (1,133行)  取扱説明書（モックアップ画面付き）
├── .nojekyll                              Jekyll無効化（_registry.js対策）
├── css/
│   └── style.css               (1,606行)  全スタイル（v1+v2+ローディング+印刷）
└── js/
    ├── loader.js               (81行)     動的スクリプトローダー（32ファイル順次読込+進捗表示）
    ├── i18n.js                 (633行)    3言語翻訳（UI文字列+既存44種エクササイズ翻訳）
    ├── i18n-exercises.js       (192行)    追加58種エクササイズのzh-CN/zh-TW翻訳
    ├── exercises/
    │   ├── _registry.js        (51行)     ExerciseRegistry集約管理
    │   ├── schroth.js          (347行)    Schroth法 16種
    │   ├── seas.js             (224行)    SEAS 11種
    │   ├── core.js             (218行)    体幹トレーニング 10種
    │   ├── stretching.js       (134行)    ストレッチ 6種
    │   ├── breathing.js        (92行)     呼吸法 4種
    │   ├── post-surgery.js     (92行)     術後リハビリ 4種
    │   ├── lyon.js             (117行)    Lyon法 5種
    │   ├── bspts.js            (118行)    BSPTS/Barcelona 5種
    │   ├── dobomed.js          (96行)     DoboMed 4種
    │   ├── side-shift.js       (75行)     Side-Shift 3種
    │   ├── fits.js             (96行)     FITS 4種
    │   ├── pilates.js          (138行)    ピラティス 6種
    │   ├── yoga.js             (117行)    ヨガ 5種
    │   ├── tai-chi.js          (75行)     太極拳 3種
    │   ├── manual.js           (207行)    徒手療法（筋膜リリース/テーピング/電気刺激） 9種
    │   ├── aquatic.js          (96行)     水中療法 4種
    │   └── psychosocial.js     (75行)     心理社会的介入 3種
    ├── plan-templates.js       (139行)    4プランテンプレート（A/B/C/D配分定義）
    ├── program-engine.js       (406行)    プログラム生成（リスク分類/フェーズ構成/エクササイズ選択）
    ├── patient-store.js        (206行)    患者CRUD（localStorage、10名上限）
    ├── progress-tracker.js     (125行)    KPI計算（アドヒアランス/完遂率/フェーズ進捗）
    ├── timeline-renderer.js    (190行)    タイムラインSVG描画（進捗オーバーレイ付き）
    ├── router.js               (74行)     ハッシュSPAルーター
    ├── views/
    │   ├── dashboard.js        (181行)    患者一覧（イントロ/カードリスト）
    │   ├── plan-wizard.js      (484行)    入力ウィザード（6ステップ）
    │   ├── plan-view.js        (275行)    プラン結果表示（タイムライン/フェーズ/エクササイズ）
    │   ├── patient-detail.js   (262行)    患者詳細（KPI/Cobb推移/プラン一覧）
    │   └── progress-entry.js   (193行)    セッション記録（チェックリスト/メモ/履歴）
    └── app.js                  (17行)     SPAブートストラップ
```

## エクササイズ（102種、17手技）

### PSSE 7校（SOSORT認定） — 48種
| 手技 | 種数 | エビデンスレベル |
|------|------|-----------------|
| Schroth | 16 | Grade A（複数RCT） |
| SEAS | 11 | RCT |
| Lyon | 5 | 症例集積（200年歴史） |
| BSPTS/Barcelona | 5 | コホート |
| DoboMed | 4 | 前向きコホート |
| Side-Shift | 3 | 歴史的コホート |
| FITS | 4 | SOSORT推奨 |

### 運動系 — 14種
| 手技 | 種数 | エビデンスレベル |
|------|------|-----------------|
| ピラティス | 6 | RCTメタ分析 |
| ヨガ | 5 | 症例集積 |
| 太極拳 | 3 | 1 RCT |

### 体幹・基礎 — 24種
| 手技 | 種数 | 用途 |
|------|------|------|
| Core | 10 | 全プラン共通基盤 |
| ストレッチ | 6 | 柔軟性改善 |
| 呼吸法 | 4 | 3次元呼吸矯正 |
| 術後リハ | 4 | 手術後専用 |

### 徒手・補完・心理 — 16種
| 手技 | 種数 | エビデンスレベル |
|------|------|-----------------|
| 筋膜リリース | 4 | 系統的レビュー |
| テーピング | 3 | RCT |
| 電気刺激 | 2 | コホート |
| 水中療法 | 4 | 専門家意見 |
| 心理社会的 | 3 | ガイドライン推奨 |

## 4プランテンプレート

| プラン | 哲学 | 主要配分 | 推奨条件 |
|--------|------|----------|----------|
| **A: Schroth重点** | 伝統的集中型 | Schroth 40%, Core 20%, SEAS 15% | Cobb≥25° or 装具療法中 |
| **B: SEAS機能統合** | 自主トレ重視 | SEAS 35%, Core 20%, FITS/Side-Shift 15% | Cobb 15-25°（軽度〜中等度） |
| **C: 運動統合** | 患者フレンドリー | Pilates 25%, Yoga 20%, SEAS 20% | 心理・外見の合併症あり |
| **D: 包括マルチモーダル** | 全手技バランス | 各10-15%均等 | 合併症3つ以上 |

`ProgramEngine.generateAll(input)` で4プラン同時生成。`PlanTemplates.recommend(input)` で推奨プランを自動選択。

## データモデル

```javascript
Patient = {
  id: 'P001',           // 自動採番
  name: '山田 花子',
  age: 14,
  sex: 'female',        // 'female' | 'male'
  cobbAngle: 25,
  curveType: 'thoracic', // thoracic | thoracolumbar | lumbar | double
  risser: 1,            // 0-5（18歳未満のみ）
  treatment: ['exercise'], // none | exercise | bracing | postSurgery（複数可）
  complications: ['pain'], // pain | respiratory | appearance | psycho | adl | none
  duration: 'medium',   // short(6M) | medium(18M) | long(36M)
  activePlanKey: 'A',
  plans: {
    A: PlanRecord,
    B: PlanRecord,
    C: PlanRecord,
    D: PlanRecord
  },
  planSwitchHistory: [{ from: 'A', to: 'B', date: 'ISO', reason: '...' }],
  cobbHistory: [{ date: 'ISO', angle: 23, note: '改善' }]
}

PlanRecord = {
  templateKey: 'A',
  program: { /* ProgramEngine.generate() 出力 */ },
  startDate: 'ISO',
  progress: {
    currentMonth: 3,
    phases: {
      initial: { status: 'active', percentComplete: 50 },
      strengthening: { status: 'pending', percentComplete: 0 }
    }
  },
  sessions: [{
    date: 'ISO',
    setting: 'clinic',  // clinic | home
    exercisesCompleted: ['schroth_pelvic', 'seas_asc'],
    notes: '...'
  }]
}
```

## 画面遷移

```
#dashboard (空=イントロ / カード一覧)
    ↕ [はじめる / +新規患者]
#wizard (6ステップ入力 → 4プラン生成)
    ↓ [患者詳細を見る]
#patient?id=P001 (基本情報 + KPI + プラン一覧 + Cobb推移)
    ↕ [Planカードタップ]         ↕ [セッション記録]
#plan?id=P001&plan=A          #progress?id=P001&plan=A
 (タイムライン/フェーズ/         (チェックリスト/メモ/
  エクササイズ/印刷)              履歴/保存)
```

## グローバルオブジェクト

| オブジェクト | ファイル | 主要API |
|-------------|---------|---------|
| `I18N` | i18n.js | `t(key)`, `exField(id,field)`, `getLang()`, `setLang()`, `registerEx()` |
| `ExerciseRegistry` | _registry.js | `register([])`, `all()`, `count()`, `byId()`, `byMethod()`, `filter()` |
| `PlanTemplates` | plan-templates.js | `all()`, `get(key)`, `keys()`, `recommend(input)` |
| `ProgramEngine` | program-engine.js | `generate(input,tmpl)`, `generateAll(input)`, `classifyRisk()`, `severityBadge()` |
| `PatientStore` | patient-store.js | `list()`, `get(id)`, `add(p)`, `update(id,data)`, `remove(id)`, `switchPlan()`, `addSession()` |
| `ProgressTracker` | progress-tracker.js | `summary(planRecord)` → `{adherence, exerciseCompletion, sessionCount, ...}` |
| `TimelineRenderer` | timeline-renderer.js | `render(program, kpi)` → SVG要素 |
| `Router` | router.js | `on(route, handler)`, `start()`, `navigate(route, params)` |
| `DashboardView` | dashboard.js | `render()` |
| `PlanWizardView` | plan-wizard.js | `render()`, `reset()` |
| `PlanView` | plan-view.js | `render(params)` |
| `PatientDetailView` | patient-detail.js | `render(params)` |
| `ProgressEntryView` | progress-entry.js | `render(params)` |

## リスク分類アルゴリズム（SOSORT 2016準拠）

```
成長期（≤17歳）:
  Cobb < 15°           → observation（経過観察）
  Cobb 15-24° + Risser≤2 → exercise（運動療法）
  Cobb 15-24° + Risser>2 → observation
  Cobb 25-39° + Risser≤2 → bracing（装具療法）
  Cobb 25-39° + Risser>2 → exercise
  Cobb 40-49° + Risser≤3 → bracing
  Cobb 40-49° + Risser>3 → exercise
  Cobb ≥50°            → surgical_alert（手術検討）

成人（>17歳）:
  Cobb < 30°           → observation
  Cobb 30-49°          → exercise
  Cobb ≥50°            → surgical_alert

treatment に postSurgery が含まれる場合 → 常に postSurgery
```

## KPI指標

| 指標 | 計算方法 |
|------|----------|
| アドヒアランス率 | 実施セッション数 / 期待セッション数 × 100 |
| エクササイズ完遂率 | 完了エクササイズ / 処方エクササイズ × 100 |
| セッション数 | 記録された総セッション数 |
| フェーズ進捗 | 完了フェーズ数 / 全フェーズ数 |
| Cobb角推移 | 初回→最新の差分（改善=緑/悪化=赤） |

## ビルド履歴

| 日付 | バージョン | 内容 |
|------|-----------|------|
| 2026-02-15 | v1.0 | 初版（44種エクササイズ、単発生成、7ファイル3,601行） |
| 2026-02-16 | v2.0 | 大規模拡張（102種/4プラン/SPA/患者管理/KPI/36ファイル8,669行） |

### v2.0 変更点
- エクササイズ 44→102種（PSSE 7校+運動系+徒手+補完+心理）
- 4プランテンプレート同時生成（A/B/C/D）
- 患者管理（localStorage CRUD、10名上限）
- KPI追跡（アドヒアランス/完遂率/Cobb推移）
- セッション記録（チェックリスト+メモ）
- プラン切替+変更理由ログ
- ハッシュSPAルーター（5画面）
- ダッシュボードUIリデザイン（リスク色帯+Cobbバッジ+タグ）
- 動的スクリプトローダー（進捗バー付き）
- 取扱説明書（manual.html、モックアップ画面付き）

## 注意事項

- `.nojekyll` — GitHub Pages (Jekyll) が`_`始まりファイルを無視する問題の対策。削除禁止。
- `loader.js` — 32スクリプトを順次動的ロード。app.jsはDOMContentLoaded不使用（発火済みのため即実行）。
- `i18n-exercises.js` — `I18N.registerEx()` で後からエクササイズ翻訳を注入。i18n.jsの`ex`オブジェクトにマージされる。
- CSPでインラインスクリプト禁止。全JSは外部ファイルで読み込み。
