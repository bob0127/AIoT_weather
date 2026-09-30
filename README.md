# 🌦️ 台灣各縣市即時天氣數據向量 SVG 可視化儀表板 (AIoT Weather)

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://aiotweather.vercel.app)
[![Vanilla JS](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript)
[![HTML5 & CSS3](https://img.shields.io/badge/HTML5_%26_CSS3-Modern_UI-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/zh-TW/docs/Web/CSS)
[![CWA Open Data](https://img.shields.io/badge/Data-CWA_氣象署開放資料-0288D1?style=for-the-badge)](https://opendata.cwa.gov.tw/)

一個專為台灣 22 縣市設計的高質感、低延遲、免外部圖資依賴的即時天氣與空氣品質熱力圖儀表板（SPA）。內嵌獨立向量 SVG 高精度全島地圖，串接**中華民國中央氣象署 (CWA)** 與**環境部 (MOENV)** 開放資料 API，提供溫度、濕度、累積降雨、降雨機率及 PM2.5 細懸浮微粒的視覺化分色渲染。

🌐 **線上展示 (Live Demo)**：[https://aiotweather.vercel.app](https://aiotweather.vercel.app)

---

## ✨ 核心特色 (Key Features)

- 🗺️ **台灣 22 縣市獨立向量 SVG 地圖**
  - 本地原生 SVG 向量幾何圖資，零 Google Maps / Leaflet 昂貴圖資依賴，載入極速且極致輕量。
  - 完整涵蓋台灣本島（北中南東）及離島區域（澎湖、金門、連江馬祖）。
  - 支援平移拖曳、滑鼠滾輪自由縮放、視角重置與縣市地名標籤切換。
  - 一鍵區域視角聚焦（全島、北部、中部、南部、東部、離島）。

- 📊 **五大多維度即時指標熱力圖 (Choropleth Heatmap)**
  - 🌡️ **即時氣溫 (°C)**：15°C~38°C+ 漸變動態熱力著色。
  - 💧 **相對濕度 (%)**：40%~100% 乾濕舒適度色譜。
  - 🌧️ **累積降雨量 (mm)**：0mm~100mm+ 降雨漸層分級。
  - ☂️ **降雨機率 (PoP %)**：0%~100% 機率警示分級。
  - 🌫️ **空氣品質 PM2.5 (μg/m³)**：嚴格對照環境部空氣品質指標 (良好/普通/對敏感族群不良/不良/危害) 分色。

- ⏱️ **今明 36 小時逐時預報 (36-Hour Forecast)**
  - 點擊任一縣市即時聯動右側詳細面板，展示三段 12 小時時段預報（天氣現象、高低溫預估、降雨機率）。

- 📈 **縣市地區氣溫折線圖與歷史趨勢分析 (Historical Weather Trends)**
  - **縣市地區下拉式選單**：支援直接透過下拉選單選擇台灣 22 縣市（北中南東及離島分區分組），選單與地圖互動雙向即時連動。
  - **四大多維度歷史指標切換**：氣溫 (°C)、相對濕度 (%)、累積降雨量 (mm) 與 PM2.5 細懸浮微粒。
  - **三段時間跨度**：支援一鍵切換 24 小時 (24H)、7 天 (7D) 與 30 天 (30D) 觀測歷史。
  - **互動式平滑曲線 Canvas 圖表**：漸變面積填色、數值網格參考線、游標懸停精確數據提示框 (Tooltip)。
  - **統計分析數據**：即時動態統計平均值、最高值、最低值與資料筆數。

- 🗄️ **Supabase 雲端資料庫整合 (Database Integration)**
  - 串接 **Supabase (Serverless PostgreSQL)**，自動將全台 22 縣市天氣快照寫入 `weather_history` 資料表。
  - 附帶專案遷移腳本 [`supabase_schema.sql`](file:///d:/AIoT_weather/supabase_schema.sql)，一鍵完成資料表、索引與行級安全策略 (RLS) 建置。
  - 支援在網頁右上角「⚙️ 設定」中自訂輸入 Supabase 專案網址與 anon public key，並具備即時連線測試功能。
  - 具備連線斷開時的平滑模擬引擎，未連線時自動呈現逼真的週期性歷史數據。

- 🌱 **智慧生活氣象指數與防護建議**
  - 根據當前各縣市綜合天氣因子，即時運算四大生活指標：
    - ☂️ **攜帶雨具**（無需雨具 / 攜帶摺傘 / 必備雨具）
    - 👕 **穿衣著裝**（短袖舒適 / 適度加衣 / 防寒保暖）
    - 🏃 **戶外運動**（極佳推薦 / 建議室內 / 暫緩運動）
    - 🪟 **開窗通風**（適宜通風 / 緊閉門窗防霾）

- 🎨 **現代高質感設計美學 (Modern UI/UX)**
  - 氛圍霓虹光暈 (Ambient Glow) 與毛玻璃擬態 (Glassmorphism)。
  - 支援一鍵無縫切換 **深色模式 (Dark Mode)** / **淺色模式 (Light Mode)**。
  - 響應式佈局 (Responsive Design)，桌面寬螢幕、平板及手機裝置完美相容。

- ⚡ **純粹 Vanilla 實作與穩定回退機制 (Fallback Engine)**
  - 無繁重的前端框架與構建步驟，純 HTML5 + CSS3 + 原生 ES6+ JavaScript。
  - 具備 API 狀態指示燈、網路逾時重試機制及快取回退引擎，即使在離線或 API 維護期間亦能平滑展示。

---

## 🛠️ 技術棧 (Tech Stack)

| 類別 | 技術與規格 | 說明 |
| :--- | :--- | :--- |
| **前端架構** | Vanilla HTML5, CSS3, JavaScript (ES6+) | 零外部前端框架、零 npm 打包負擔，隨開即跑 |
| **圖資呈現** | Inline Vector SVG (ViewBox 1000x1000) | 台灣 22 縣市獨立路徑與幾何中心點標籤錨定 |
| **資料來源** | [中央氣象署開放資料平臺 (CWA Open Data)](https://opendata.cwa.gov.tw/) | F-C0032-001 (一般天氣預報)、O-A0001-001 (自動氣象站) |
| **環境資料** | [環境部環境資料開放平臺 (MOENV)](https://data.moenv.gov.tw/) | 全台空氣品質監測站即時 PM2.5 與 AQI 數據 |
| **字體排版** | Google Fonts: Outfit & Noto Sans TC | 現代感無襯線英數搭配高辨識度繁體中文 |
| **部署平臺** | Vercel (CI/CD 自動部署) | 靜態資源全球 CDN 加速 |

---

## 📁 專案目錄結構 (Project Structure)

```text
AIoT_weather/
├── index.html          # 儀表板主要 HTML 結構、向量 SVG 地圖與模態框
├── style.css           # 設計系統變數、深淺主題樣式、響應式排版與微動畫
├── script.js           # 地圖互動、SVG 熱力著色演算法、Supabase 資料庫與折線圖邏輯
├── supabase_schema.sql # Supabase PostgreSQL 資料庫建表與 RLS 策略腳本
└── README.md           # 專案詳細說明文件
```

---

## 🚀 快速上手 (Quick Start)

### 1. 本地啟動 (Local Development)

本專案為純靜態 Web 應用程式，無需執行 `npm install`。

#### 方法一：使用 VS Code Live Server 插件
1. 使用 VS Code 或 Antigravity IDE 開啟本目錄。
2. 右鍵點擊 `index.html`，選擇 **「Open with Live Server」**。
3. 瀏覽器將自動開啟 `http://127.0.0.1:5500`。

#### 方法二：使用 Python 內建伺服器
```bash
# 在專案目錄下執行
python -m http.server 8080
```
開啟瀏覽器前往 `http://localhost:8080` 即可檢視。

---

## ⚙️ API 設定說明 (API Configuration)

預設已內建中央氣象署 CWA 預設公開金鑰以利即時預覽。若您希望使用自己的金鑰或更換 API 來源：

1. 前往 [中央氣象署開放資料平臺](https://opendata.cwa.gov.tw/) 免費註冊並取得授權碼 (Authorization Code)。
2. 點擊網頁右上角的 **設定 (⚙️)** 按鈕。
3. 在彈出視窗中貼上您的 CWA API 金鑰並儲存。
4. 亦可在 [`script.js`](file:///d:/AIoT_weather/script.js) 第 7 行直接修改預設金鑰常數：
   ```javascript
   const CWA_API_KEY = 'YOUR_CWA_API_KEY_HERE';
   ```

---

## 📄 授權條款 (License)

本專案依開放原始碼原則釋出，氣象與環境數據版權分別歸屬**中華民國中央氣象署 (CWA)** 與**環境部 (MOENV)** 所有。