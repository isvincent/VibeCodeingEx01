# Vibe Coding 100｜Google 試算表 × GAS 生活應用實例庫

一個使用繁體中文、可搜尋、可收藏、可產生 **100 個專案專屬 Vibe Coding 開發提示詞** 的 RWD + PWA 靜態網站。

## 功能

- 100 個專案、10 大分類、搜尋／分類／難度／排序
- 收藏專案（localStorage 儲存在目前裝置瀏覽器）
- 每個專案有獨立功能與建議資料欄位
- 提示詞可自訂對象、風格、進階功能
- 一鍵複製、下載 UTF-8 TXT
- 手機、平板、電腦 RWD；支援 PWA 安裝及已快取頁面離線瀏覽
- 不需 API Key、後端或個人 Google 帳號
- 淺色／深色模式（跟隨系統，可手動切換）
- 「隨機給我一個」探索按鈕；搜尋關鍵字高亮，可用空格輸入多個關鍵字
- 專案深層連結：網址加上 `#p-012` 會直接開啟第 12 號專案，對話框內可一鍵複製分享連結
- 按 `/` 鍵快速跳到搜尋框

## 檔案結構

```text
vibe-gas-100/
├── index.html              # 網站首頁
├── style.css               # RWD 樣式
├── app.js                  # 搜尋、收藏、提示詞產生器
├── illustrations.js        # 100 個專案的 SVG 示意插圖（圖示與版型對照表在檔案內的 M 物件）
├── projects.json           # 100 個專案資料
├── manifest.webmanifest    # PWA 設定
├── service-worker.js       # 離線快取
├── icon.svg                # SVG 網站圖示
├── icon-192.png            # PWA 圖示
├── icon-512.png            # PWA 圖示
└── README.md               # 本說明
```

## 本機預覽

由於網站使用 `fetch()` 讀取 JSON，請勿直接以 `file://` 雙擊 `index.html` 開啟。請使用本機 HTTP 伺服器：

```bash
python -m http.server 8000
```

在瀏覽器開啟 `http://localhost:8000`。

## 部署 GitHub Pages

1. 登入 GitHub，建立公開 Repository，例如 `vibe-gas-100`。
2. 上傳此資料夾中的網站檔案到 Repository 根目錄，確認 `index.html` 在根目錄。
3. 進入 **Settings → Pages**。
4. **Build and deployment → Source** 選擇 **Deploy from a branch**。
5. Branch 選擇 `main`，資料夾選擇 `/(root)`，按 **Save**。
6. 等候 GitHub Pages 部署完成，網址通常為 `https://使用者名稱.github.io/vibe-gas-100/`。
7. 在手機開啟網址，透過瀏覽器的「加到主畫面」安裝（依瀏覽器支援狀況）。

## 使用教學

1. 首頁向下捲動至「探索專案」。
2. 輸入關鍵字，或以分類與難度篩選。
3. 點選星號收藏；可用「我的收藏」只顯示已收藏案例。
4. 點「查看提示詞」，閱讀專案功能與試算表欄位。
5. 自訂主要使用對象、介面風格、進階功能。
6. 按「複製完整提示詞」，貼到 ChatGPT、Gemini 或 Claude。
7. 也可以按「下載 .txt」儲存提示詞。
8. 依 AI 產生的 GAS 專案操作指引建立試算表、授權及部署。

## 重要區分

**本網站是「實例瀏覽與提示詞產生器」，並非 100 個已完成的 GAS 系統。** 100 個提示詞會依各案例的功能及欄位生成，協助 AI 開發相應系統。AI 產生的程式必須實際測試。

GitHub Pages 僅提供靜態網站託管，不能直接執行 GAS。GAS 的 `google.script.run` 僅適用於 Apps Script HTML Service 環境，不能直接從 GitHub Pages 呼叫。若後續開發的 GAS 應用需要身分驗證、資料存取或 API，請另行設計安全部署架構，不要將私人試算表或密鑰公開。

## PWA 與快取

PWA 需要 HTTPS（GitHub Pages 自帶）或 localhost。第一次連線載入後，已快取的網站檔案可離線瀏覽。Service Worker 採「網路優先」：有網路時一律載入最新版，離線時才使用快取。變更程式時仍建議更新 `service-worker.js` 中的 `CACHE` 版本字串，以清除舊快取。

## 自訂專案資料

編輯 `projects.json`，每筆格式：

```json
{"id":1,"category":"電子郵件與通知","title":"生日祝福自動寄送","features":["生日名單","個人化祝福","每日排程"],"fields":["姓名","Email","生日"],"level":"入門"}
```

請保持 `id` 唯一，並使用有效的 UTF-8 JSON。

## 隱私與安全

收藏保存在使用者瀏覽器，不同步至雲端。網站不收集個資。公開 GitHub 儲存庫不得包含 API Key、OAuth 憑證、私人試算表 ID 或個人資料。若將提示詞用於個資系統，須落實權限、輸入驗證與資料保護。

## 基本驗收清單

- [ ] 首頁正常載入 100 個專案
- [ ] 搜尋與分類、難度、排序可運作
- [ ] 收藏可儲存，重新整理後仍保留
- [ ] 每個專案均可開啟並顯示專屬欄位及功能
- [ ] 更改設定後提示詞會更新
- [ ] 複製及 TXT 下載正常
- [ ] 360px 手機、768px 平板及桌機版面可用
- [ ] HTTPS 網站可註冊 Service Worker
- [ ] 已快取頁面可在離線狀態開啟

## 授權

範例教學用途，可自行修改與延伸。
