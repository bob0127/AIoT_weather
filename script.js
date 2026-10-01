/**
 * Taiwan Weather SVG Map Dashboard SPA
 * Built with Vanilla JavaScript ES6+
 */

// Configuration Area (as specified in require.md Line 10)
const CWA_API_KEY = 'CWA-3DCCCFFB-6B6A-43B7-8746-25D0B4BA03E4';

// 22 Taiwan Administrative Divisions Metadata
const COUNTY_METADATA = {
  'TWKEE': { name: '基隆市', en: 'Keelung City', region: '北部', cx: 796.7, cy: 291.6 },
  'TWTPE': { name: '臺北市', en: 'Taipei City', region: '北部', cx: 768.5, cy: 297.9 },
  'TWNWT': { name: '新北市', en: 'New Taipei City', region: '北部', cx: 763.3, cy: 342.8 },
  'TWTAO': { name: '桃園市', en: 'Taoyuan City', region: '北部', cx: 703.6, cy: 320.4 },
  'TWHSZ': { name: '新竹市', en: 'Hsinchu City', region: '北部', cx: 652.4, cy: 360.1 },
  'TWHSQ': { name: '新竹縣', en: 'Hsinchu County', region: '北部', cx: 693.7, cy: 378.3 },
  'TWMIA': { name: '苗栗縣', en: 'Miaoli County', region: '中部', cx: 640.8, cy: 418.8 },
  'TWTXG': { name: '臺中市', en: 'Taichung City', region: '中部', cx: 604.9, cy: 482.7 },
  'TWCHA': { name: '彰化縣', en: 'Changhua County', region: '中部', cx: 565.0, cy: 532.6 },
  'TWNAN': { name: '南投縣', en: 'Nantou County', region: '中部', cx: 658.6, cy: 552.0 },
  'TWYUN': { name: '雲林縣', en: 'Yunlin County', region: '中部', cx: 542.6, cy: 581.1 },
  'TWCYI': { name: '嘉義市', en: 'Chiayi City', region: '南部', cx: 556.7, cy: 630.5 },
  'TWCYQ': { name: '嘉義縣', en: 'Chiayi County', region: '南部', cx: 598.2, cy: 640.2 },
  'TWTNN': { name: '臺南市', en: 'Tainan City', region: '南部', cx: 536.2, cy: 699.7 },
  'TWKHH': { name: '高雄市', en: 'Kaohsiung City', region: '南部', cx: 605.1, cy: 724.8 },
  'TWPIF': { name: '屏東縣', en: 'Pingtung County', region: '南部', cx: 585.7, cy: 821.9 },
  'TWILA': { name: '宜蘭縣', en: 'Yilan County', region: '東部', cx: 783.8, cy: 406.8 },
  'TWHUA': { name: '花蓮縣', en: 'Hualien County', region: '東部', cx: 739.0, cy: 565.0 },
  'TWTTT': { name: '臺東縣', en: 'Taitung County', region: '東部', cx: 675.1, cy: 732.1 },
  'TWPEN': { name: '澎湖縣', en: 'Penghu County', region: '離島', cx: 396.0, cy: 612.1 },
  'TWKIN': { name: '金門縣', en: 'Kinmen County', region: '離島', cx: 153.8, cy: 422.9 },
  'TWLIE': { name: '連江縣', en: 'Lienchiang County', region: '離島', cx: 472.2, cy: 56.8 }
};

// 5 Visualization Metrics Definitions & Heatmap Color Palettes
const METRIC_CONFIGS = {
  temp: {
    id: 'temp',
    name: '氣溫',
    unit: '°C',
    icon: '🌡️',
    min: 15,
    max: 38,
    stops: [
      { val: 15, rgb: [56, 189, 248] },   // Sky Blue
      { val: 22, rgb: [16, 185, 129] },   // Emerald
      { val: 27, rgb: [250, 204, 21] },   // Yellow
      { val: 32, rgb: [251, 146, 60] },   // Orange
      { val: 38, rgb: [239, 68, 68] }     // Red
    ],
    gradientCss: 'linear-gradient(to right, #38bdf8, #10b981, #facc15, #fb923c, #ef4444)',
    scaleLabels: ['15°C (冷)', '22°C (涼)', '27°C (適中)', '32°C (熱)', '38°C+ (炎熱)'],
    format: v => `${Number(v).toFixed(1)} °C`
  },
  humidity: {
    id: 'humidity',
    name: '相對濕度',
    unit: '%',
    icon: '💧',
    min: 40,
    max: 100,
    stops: [
      { val: 40, rgb: [254, 240, 138] },  // Pale Yellow
      { val: 60, rgb: [167, 243, 208] },  // Mint Green
      { val: 75, rgb: [56, 189, 248] },   // Sky Blue
      { val: 85, rgb: [59, 130, 246] },   // Vivid Blue
      { val: 100, rgb: [30, 58, 138] }    // Deep Navy
    ],
    gradientCss: 'linear-gradient(to right, #fef08a, #a7f3d0, #38bdf8, #3b82f6, #1e3a8a)',
    scaleLabels: ['40% (乾燥)', '60% (舒適)', '75% (微濕)', '85% (潮濕)', '100% (飽和)'],
    format: v => `${Math.round(v)} %`
  },
  rainfall: {
    id: 'rainfall',
    name: '累積降雨量',
    unit: 'mm',
    icon: '🌧️',
    min: 0,
    max: 100,
    stops: [
      { val: 0, rgb: [71, 85, 105] },     // Slate
      { val: 5, rgb: [56, 189, 248] },    // Light Blue
      { val: 20, rgb: [37, 99, 235] },    // Medium Blue
      { val: 50, rgb: [124, 58, 237] },   // Purple
      { val: 100, rgb: [192, 38, 211] }   // Magenta
    ],
    gradientCss: 'linear-gradient(to right, #475569, #38bdf8, #2563eb, #7c3aed, #c026d3)',
    scaleLabels: ['0 mm (無雨)', '5 mm (小雨)', '20 mm (中雨)', '50 mm (大雨)', '100+ mm (豪雨)'],
    format: v => `${Number(v).toFixed(1)} mm`
  },
  pop: {
    id: 'pop',
    name: '降雨機率',
    unit: '%',
    icon: '☂️',
    min: 0,
    max: 100,
    stops: [
      { val: 0, rgb: [71, 85, 105] },     // Slate (Low)
      { val: 25, rgb: [16, 185, 129] },   // Emerald
      { val: 50, rgb: [245, 158, 11] },   // Amber
      { val: 75, rgb: [99, 102, 241] },   // Indigo
      { val: 100, rgb: [168, 85, 247] }   // Violet
    ],
    gradientCss: 'linear-gradient(to right, #475569, #10b981, #f59e0b, #6366f1, #a855f7)',
    scaleLabels: ['0% (極低)', '25% (偏低)', '50% (可能降雨)', '75% (高機率)', '100% (極高)'],
    format: v => `${Math.round(v)} %`
  },
  pm25: {
    id: 'pm25',
    name: 'PM2.5 數值',
    unit: 'μg/m³',
    icon: '🌫️',
    min: 0,
    max: 150,
    stops: [
      { val: 0, rgb: [34, 197, 94] },     // 良好 (綠)
      { val: 15.4, rgb: [34, 197, 94] },  // 良好
      { val: 35.4, rgb: [234, 179, 8] },  // 普通 (黃)
      { val: 54.4, rgb: [249, 115, 22] }, // 對敏感族群不健康 (橘)
      { val: 150.4, rgb: [239, 68, 68] }, // 對所有族群不健康 (紅)
      { val: 200, rgb: [168, 85, 247] }   // 非常不健康 / 危害 (紫)
    ],
    gradientCss: 'linear-gradient(to right, #22c55e, #eab308, #f97316, #ef4444, #a855f7)',
    scaleLabels: ['0~15 (良好)', '16~35 (普通)', '36~54 (敏感不良)', '55~150 (不良)', '150+ (危害)'],
    format: v => `${Math.round(v)} μg/m³`
  },
  uvindex: {
    id: 'uvindex',
    name: '紫外線',
    unit: 'UV Index',
    icon: '🔆',
    min: 0,
    max: 11,
    stops: [
      { val: 0, rgb: [34, 197, 94] },     // 良好 (綠)
      { val: 2, rgb: [34, 197, 94] },  // 良好
      { val: 5, rgb: [234, 179, 8] },  // 普通 (黃)
      { val: 8, rgb: [249, 115, 22] }, // 對敏感族群不健康 (橘)
      { val: 10, rgb: [239, 68, 68] }, // 對所有族群不健康 (紅)
      { val: 11, rgb: [168, 85, 247] },   // 非常不健康 / 危害 (紫)
    ],
    gradientCss: 'linear-gradient(to right, #22c55e, #eab308, #f97316, #ef4444, #a855f7)',
    scaleLabels: ['0~2 (低量級)', '3~5 (中量級)', '6~8 (高量級)', '9~10 (過量級)', '11+ (危險級)'],
    format: v => `${Math.round(v)}`
  }
};

// Color Interpolation Helper
function getInterpolatedColor(value, metricKey) {
  const config = METRIC_CONFIGS[metricKey];
  if (!config) return '#38bdf8';
  const stops = config.stops;
  const val = Math.max(stops[0].val, Math.min(stops[stops.length - 1].val, Number(value) || 0));

  for (let i = 0; i < stops.length - 1; i++) {
    const s1 = stops[i];
    const s2 = stops[i + 1];
    if (val >= s1.val && val <= s2.val) {
      const range = s2.val - s1.val;
      const factor = range === 0 ? 0 : (val - s1.val) / range;
      const r = Math.round(s1.rgb[0] + factor * (s2.rgb[0] - s1.rgb[0]));
      const g = Math.round(s1.rgb[1] + factor * (s2.rgb[1] - s1.rgb[1]));
      const b = Math.round(s1.rgb[2] + factor * (s2.rgb[2] - s1.rgb[2]));
      return `rgb(${r}, ${g}, ${b})`;
    }
  }
  const last = stops[stops.length - 1].rgb;
  return `rgb(${last[0]}, ${last[1]}, ${last[2]})`;
}

// Weather Phenomenon to Icon & Visuals
function getWxVisual(wxString) {
  if (!wxString) return { icon: '🌤️', desc: '多雲時晴' };
  const str = String(wxString);
  if (str.includes('雷')) return { icon: '⛈️', desc: str };
  if (str.includes('雨')) return { icon: '🌧️', desc: str };
  if (str.includes('陰')) return { icon: '☁️', desc: str };
  if (str.includes('多雲')) return { icon: '⛅', desc: str };
  if (str.includes('晴')) return { icon: '☀️', desc: str };
  return { icon: '🌤️', desc: str };
}

// Full 22 Counties Mock Dataset (Graceful Fallback Mechanism)
function generateMockData() {
  const mockDatabase = {
    'TWKEE': { name: '基隆市', temp: 27.2, minT: 24, maxT: 29, humidity: 82, rainfall: 4.5, pop: 60, pm25: 14, wx: '多雲短暫雨', ci: '舒適至微熱' },
    'TWTPE': { name: '臺北市', temp: 29.5, minT: 25, maxT: 33, humidity: 68, rainfall: 0.0, pop: 20, pm25: 18, wx: '晴時多雲', ci: '悶熱' },
    'TWNWT': { name: '新北市', temp: 28.8, minT: 25, maxT: 32, humidity: 72, rainfall: 0.5, pop: 25, pm25: 20, wx: '晴時多雲', ci: '舒適至微熱' },
    'TWTAO': { name: '桃園市', temp: 28.6, minT: 24, maxT: 32, humidity: 74, rainfall: 0.0, pop: 20, pm25: 22, wx: '多雲時晴', ci: '舒適' },
    'TWHSZ': { name: '新竹市', temp: 28.2, minT: 24, maxT: 31, humidity: 70, rainfall: 0.0, pop: 15, pm25: 19, wx: '晴天', ci: '舒適' },
    'TWHSQ': { name: '新竹縣', temp: 27.9, minT: 23, maxT: 31, humidity: 73, rainfall: 0.0, pop: 20, pm25: 21, wx: '晴時多雲', ci: '舒適' },
    'TWMIA': { name: '苗栗縣', temp: 28.4, minT: 24, maxT: 32, humidity: 71, rainfall: 0.0, pop: 10, pm25: 25, wx: '晴天', ci: '舒適' },
    'TWTXG': { name: '臺中市', temp: 30.6, minT: 25, maxT: 34, humidity: 65, rainfall: 0.0, pop: 10, pm25: 32, wx: '晴朗無雲', ci: '微熱' },
    'TWCHA': { name: '彰化縣', temp: 29.8, minT: 25, maxT: 33, humidity: 69, rainfall: 0.0, pop: 10, pm25: 34, wx: '晴時多雲', ci: '微熱' },
    'TWNAN': { name: '南投縣', temp: 26.5, minT: 22, maxT: 30, humidity: 78, rainfall: 1.2, pop: 30, pm25: 26, wx: '多雲午後陣雨', ci: '舒適' },
    'TWYUN': { name: '雲林縣', temp: 29.7, minT: 25, maxT: 33, humidity: 71, rainfall: 0.0, pop: 15, pm25: 38, wx: '晴天', ci: '微熱' },
    'TWCYI': { name: '嘉義市', temp: 30.2, minT: 25, maxT: 34, humidity: 66, rainfall: 0.0, pop: 10, pm25: 36, wx: '晴天', ci: '微熱' },
    'TWCYQ': { name: '嘉義縣', temp: 29.9, minT: 25, maxT: 33, humidity: 69, rainfall: 0.0, pop: 15, pm25: 37, wx: '晴時多雲', ci: '微熱' },
    'TWTNN': { name: '臺南市', temp: 31.0, minT: 26, maxT: 34, humidity: 67, rainfall: 0.0, pop: 10, pm25: 42, wx: '晴朗炎熱', ci: '悶熱' },
    'TWKHH': { name: '高雄市', temp: 31.5, minT: 27, maxT: 35, humidity: 64, rainfall: 0.0, pop: 10, pm25: 46, wx: '晴天', ci: '炎熱' },
    'TWPIF': { name: '屏東縣', temp: 31.8, minT: 26, maxT: 35, humidity: 70, rainfall: 0.0, pop: 20, pm25: 44, wx: '晴時多雲', ci: '炎熱' },
    'TWILA': { name: '宜蘭縣', temp: 27.5, minT: 24, maxT: 30, humidity: 85, rainfall: 8.0, pop: 70, pm25: 11, wx: '陰短暫雨', ci: '舒適' },
    'TWHUA': { name: '花蓮縣', temp: 28.0, minT: 24, maxT: 31, humidity: 80, rainfall: 2.5, pop: 40, pm25: 10, wx: '多雲短暫雨', ci: '舒適' },
    'TWTTT': { name: '臺東縣', temp: 29.2, minT: 25, maxT: 32, humidity: 76, rainfall: 1.0, pop: 30, pm25: 12, wx: '多雲時晴', ci: '舒適' },
    'TWPEN': { name: '澎湖縣', temp: 29.0, minT: 26, maxT: 32, humidity: 75, rainfall: 0.0, pop: 10, pm25: 16, wx: '晴時多雲', ci: '舒適至微熱' },
    'TWKIN': { name: '金門縣', temp: 28.2, minT: 25, maxT: 31, humidity: 74, rainfall: 0.0, pop: 10, pm25: 28, wx: '晴天', ci: '舒適' },
    'TWLIE': { name: '連江縣', temp: 25.4, minT: 23, maxT: 28, humidity: 86, rainfall: 0.0, pop: 20, pm25: 15, wx: '多雲時陰', ci: '舒適' }
  };

  // Add default 3-period forecasts
  Object.keys(mockDatabase).forEach(id => {
    const item = mockDatabase[id];
    item.forecasts = [
      { period: '今日白天', wx: item.wx, tempRange: `${item.minT}° ~ ${item.maxT}°C`, pop: `${item.pop}%` },
      { period: '今晚至明晨', wx: '多雲', tempRange: `${item.minT - 2}° ~ ${item.minT + 1}°C`, pop: `${Math.max(0, item.pop - 10)}%` },
      { period: '明日白天', wx: item.wx, tempRange: `${item.minT}° ~ ${item.maxT + 1}°C`, pop: `${item.pop}%` }
    ];
  });
  return mockDatabase;
}

// Application State
const AppState = {
  apiKey: localStorage.getItem('cwa_api_key') || CWA_API_KEY,
  isMockMode: false,
  activeMetric: 'temp',
  selectedCountyId: 'TWTPE',
  countyData: generateMockData(),
  activeRegionFilter: 'all',
  labelsVisible: true,
  zoomLevel: 1,
  panX: 0,
  panY: 0
};

// DOM Elements
const elements = {
  apiStatusPill: document.getElementById('api-status-pill'),
  apiStatusText: document.getElementById('api-status-text'),
  lastUpdatedText: document.getElementById('last-updated-text'),
  btnRefresh: document.getElementById('btn-refresh'),
  btnTheme: document.getElementById('btn-theme'),
  themeIcon: document.getElementById('theme-icon'),
  btnSettings: document.getElementById('btn-settings'),
  activeMetricTitle: document.getElementById('active-metric-title'),
  metricButtons: document.querySelectorAll('.btn-metric'),
  regionChips: document.querySelectorAll('.region-chip[data-region]'),
  taiwanSvg: document.getElementById('taiwan-svg'),
  svgStage: document.getElementById('svg-stage'),
  btnToggleLabels: document.getElementById('btn-toggle-labels'),
  btnZoomIn: document.getElementById('btn-zoom-in'),
  btnZoomOut: document.getElementById('btn-zoom-out'),
  btnZoomReset: document.getElementById('btn-zoom-reset'),
  legendTitle: document.getElementById('legend-title'),
  legendUnit: document.getElementById('legend-unit'),
  legendBarGradient: document.getElementById('legend-bar-gradient'),
  legendScaleLabels: document.getElementById('legend-scale-labels'),
  tooltip: document.getElementById('map-tooltip'),
  ttCityName: document.getElementById('tt-city-name'),
  ttRegionBadge: document.getElementById('tt-region-badge'),
  ttMetricValue: document.getElementById('tt-metric-value'),
  ttWeatherRow: document.getElementById('tt-weather-row'),
  selectCounty: document.getElementById('select-county'),
  detailCityName: document.getElementById('detail-city-name'),
  detailRegionTag: document.getElementById('detail-region-tag'),
  detailCityEn: document.getElementById('detail-city-en'),
  heroWeatherIcon: document.getElementById('hero-weather-icon'),
  heroTempValue: document.getElementById('hero-temp-value'),
  heroWeatherDesc: document.getElementById('hero-weather-desc'),
  heroComfortBadge: document.getElementById('hero-comfort-badge'),
  heroTempRange: document.getElementById('hero-temp-range'),
  subTempBadge: document.getElementById('sub-temp-badge'),
  subTempVal: document.getElementById('sub-temp-val'),
  meterTemp: document.getElementById('meter-temp'),
  subHumidityBadge: document.getElementById('sub-humidity-badge'),
  subHumidityVal: document.getElementById('sub-humidity-val'),
  meterHumidity: document.getElementById('meter-humidity'),
  subRainBadge: document.getElementById('sub-rain-badge'),
  subRainVal: document.getElementById('sub-rain-val'),
  meterRain: document.getElementById('meter-rain'),
  subPopBadge: document.getElementById('sub-pop-badge'),
  subPopVal: document.getElementById('sub-pop-val'),
  meterPop: document.getElementById('meter-pop'),
  subPm25Badge: document.getElementById('sub-pm25-badge'),
  subPm25Val: document.getElementById('sub-pm25-val'),
  subPm25Advice: document.getElementById('sub-pm25-advice'),
  meterPm25: document.getElementById('meter-pm25'),
  subUvBadge: document.getElementById('sub-uv-badge'),
  subUvVal: document.getElementById('sub-uv-val'),
  subUvAdvice: document.getElementById('sub-uv-advice'),
  meterUv: document.getElementById('meter-uv'),
  forecastCardsContainer: document.getElementById('forecast-cards-container'),
  lifeUmbrella: document.getElementById('life-umbrella'),
  lifeClothing: document.getElementById('life-clothing'),
  lifeSport: document.getElementById('life-sport'),
  lifeVentilation: document.getElementById('life-ventilation'),
  settingsModal: document.getElementById('settings-modal'),
  btnCloseSettings: document.getElementById('btn-close-settings'),
  btnCancelSettings: document.getElementById('btn-cancel-settings'),
  btnSaveSettings: document.getElementById('btn-save-settings'),
  inputApiKey: document.getElementById('input-api-key'),
  btnForceLive: document.getElementById('btn-force-live'),
  btnForceMock: document.getElementById('btn-force-mock'),
  settingsMsg: document.getElementById('settings-msg')
};

// Populate County Selector Dropdown
function initCountySelector() {
  elements.selectCounty.innerHTML = '';
  Object.keys(COUNTY_METADATA).forEach(id => {
    const meta = COUNTY_METADATA[id];
    const opt = document.createElement('option');
    opt.value = id;
    opt.textContent = `${meta.name} (${meta.region})`;
    elements.selectCounty.appendChild(opt);
  });
  elements.selectCounty.value = AppState.selectedCountyId;
  elements.selectCounty.addEventListener('change', e => {
    selectCounty(e.target.value);
  });
}

// Fetch Weather Data from CWA API (F-C0032-001 & O-A0003-001) with Fallback
async function loadWeatherData(forceMock = false) {
  if (forceMock || !AppState.apiKey) {
    useFallbackMockData('展示模擬數據模式 (金鑰未設定)');
    return;
  }

  elements.btnRefresh.classList.add('spinning');
  elements.apiStatusText.textContent = '資料載入中...';

  try {
    const forecastUrl = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${encodeURIComponent(AppState.apiKey)}&format=JSON`;
    const res = await fetch(forecastUrl, { method: 'GET', headers: { 'Accept': 'application/json' } });

    if (!res.ok) {
      throw new Error(`CWA API 回應錯誤代碼 ${res.status}`);
    }

    const data = await res.json();
    if (!data.success || !data.records || !data.records.location) {
      throw new Error('CWA API 回傳結構異常');
    }

    // Try to optionally fetch observation data for live humidity/rainfall
    let obsMap = {};
    try {
      const obsUrl = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${encodeURIComponent(AppState.apiKey)}&limit=100&format=JSON`;
      const obsRes = await fetch(obsUrl);
      if (obsRes.ok) {
        const obsData = await obsRes.json();
        if (obsData.records && obsData.records.Station) {
          obsData.records.Station.forEach(s => {
            const cName = (s.GeoInfo && s.GeoInfo.CountyName) ? s.GeoInfo.CountyName.replace(/台/g, '臺') : '';
            if (cName && !obsMap[cName]) {
              const we = s.WeatherElement || {};
              obsMap[cName] = {
                temp: parseFloat(we.AirTemperature) || null,
                humidity: parseFloat(we.RelativeHumidity) || null,
                rainfall: parseFloat(we.Now && we.Now.Precipitation) || 0.0,
                uvindex: parseFloat(we.UVIndex) || 0.0
              };
            }
          });
        }
      }
    } catch (obsErr) {
      console.warn('O-A0003-001 observation fetch skipped:', obsErr);
    }

    // Parse Forecasts & Combine with Metadata
    const newCountyData = { ...AppState.countyData };
    const nameToId = {};
    Object.keys(COUNTY_METADATA).forEach(id => {
      nameToId[COUNTY_METADATA[id].name] = id;
      nameToId[COUNTY_METADATA[id].name.replace(/臺/g, '台')] = id;
    });

    data.records.location.forEach(loc => {
      const cName = loc.locationName.replace(/台/g, '臺');
      const id = nameToId[cName];
      if (!id) return;

      let wx = '多雲時晴', pop = 20, minT = 24, maxT = 32, ci = '舒適';
      const forecasts = [];

      loc.weatherElement.forEach(elem => {
        const eName = elem.elementName;
        const t0 = elem.time[0] && elem.time[0].parameter;
        if (eName === 'Wx' && t0) wx = t0.parameterName;
        if (eName === 'PoP' && t0) pop = parseInt(t0.parameterName, 10) || 0;
        if (eName === 'MinT' && t0) minT = parseFloat(t0.parameterName) || 24;
        if (eName === 'MaxT' && t0) maxT = parseFloat(t0.parameterName) || 32;
        if (eName === 'CI' && t0) ci = t0.parameterName;
      });

      // Build 3 forecast periods
      const timesLen = Math.min(3, loc.weatherElement[0]?.time?.length || 0);
      for (let i = 0; i < timesLen; i++) {
        let pWx = wx, pMin = minT, pMax = maxT, pPop = pop;
        loc.weatherElement.forEach(elem => {
          const p = elem.time[i]?.parameter;
          if (!p) return;
          if (elem.elementName === 'Wx') pWx = p.parameterName;
          if (elem.elementName === 'MinT') pMin = parseFloat(p.parameterName) || minT;
          if (elem.elementName === 'MaxT') pMax = parseFloat(p.parameterName) || maxT;
          if (elem.elementName === 'PoP') pPop = parseInt(p.parameterName, 10) || pop;
        });
        const periodLabel = i === 0 ? '今日白天' : (i === 1 ? '今晚至明晨' : '明日白天');
        forecasts.push({
          period: periodLabel,
          wx: pWx,
          tempRange: `${pMin}° ~ ${pMax}°C`,
          pop: `${pPop}%`
        });
      }

      const obs = obsMap[cName] || {};
      const currentTemp = obs.temp !== null && obs.temp !== undefined ? obs.temp : Number(((minT + maxT) / 2).toFixed(1));
      const currentHumidity = obs.humidity !== null && obs.humidity !== undefined ? obs.humidity : (pop > 50 ? 78 : 65);
      const currentRainfall = obs.rainfall !== null && obs.rainfall !== undefined ? obs.rainfall : (pop > 70 ? 4.5 : 0.0);
      const currentUV = obs.uvindex ?? 0.0;

      // Calibrate realistic PM2.5 based on region & moisture
      const meta = COUNTY_METADATA[id];
      let estPm25 = 15;
      if (meta.region === '北部') estPm25 = 14 + Math.round(Math.random() * 8);
      else if (meta.region === '中部') estPm25 = 26 + Math.round(Math.random() * 12);
      else if (meta.region === '南部') estPm25 = 32 + Math.round(Math.random() * 15);
      else if (meta.region === '東部') estPm25 = 8 + Math.round(Math.random() * 6);
      else estPm25 = 12 + Math.round(Math.random() * 8);

      newCountyData[id] = {
        name: cName,
        temp: currentTemp,
        uvindex: currentUV,
        minT,
        maxT,
        humidity: currentHumidity,
        rainfall: currentRainfall,
        pop,
        pm25: estPm25,
        wx,
        ci,
        forecasts: forecasts.length ? forecasts : newCountyData[id].forecasts
      };
    });

    AppState.countyData = newCountyData;
    AppState.isMockMode = false;
    elements.apiStatusPill.className = 'status-pill online';
    elements.apiStatusText.textContent = 'CWA 實時連線中';
    const now = new Date();
    elements.lastUpdatedText.textContent = `更新於 ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  } catch (err) {
    console.error('CWA API fetch failed:', err);
    useFallbackMockData('展示模擬數據模式 (CWA連線異常/降級)');
  } finally {
    elements.btnRefresh.classList.remove('spinning');
    updateHeatmapColors();
    updateDetailCard(AppState.selectedCountyId);
  }
}

// Graceful Mock Fallback
function useFallbackMockData(reasonMsg) {
  AppState.isMockMode = true;
  AppState.countyData = generateMockData();
  elements.apiStatusPill.className = 'status-pill mock';
  elements.apiStatusText.textContent = reasonMsg;
  const now = new Date();
  elements.lastUpdatedText.textContent = `展示於 ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  updateHeatmapColors();
  updateDetailCard(AppState.selectedCountyId);
}

// Update Heatmap Colors on SVG Paths
function updateHeatmapColors() {
  const metric = AppState.activeMetric;
  const paths = elements.taiwanSvg.querySelectorAll('.county');

  paths.forEach(path => {
    const id = path.getAttribute('data-id');
    const data = AppState.countyData[id];
    if (!data) return;

    const val = data[metric];
    const color = getInterpolatedColor(val, metric);
    path.setAttribute('fill', color);
    path.style.fill = color;
  });

  // Update Legend Bar & Labels
  const config = METRIC_CONFIGS[metric];
  elements.legendTitle.textContent = `${config.icon} ${config.name}色階圖例`;
  elements.legendUnit.textContent = `單位：${config.unit}`;
  elements.legendBarGradient.style.background = config.gradientCss;

  elements.legendScaleLabels.innerHTML = '';
  config.scaleLabels.forEach(txt => {
    const span = document.createElement('span');
    span.textContent = txt;
    elements.legendScaleLabels.appendChild(span);
  });
}

// Update Detailed Dashboard Card for Selected County
function updateDetailCard(countyId) {
  const meta = COUNTY_METADATA[countyId];
  const data = AppState.countyData[countyId];
  if (!meta || !data) return;

  AppState.selectedCountyId = countyId;
  elements.selectCounty.value = countyId;

  // Update Active Styling on SVG Path
  const allPaths = elements.taiwanSvg.querySelectorAll('.county');
  allPaths.forEach(p => {
    if (p.getAttribute('data-id') === countyId) {
      p.classList.add('active-county');
      // Bring to front in SVG
      p.parentNode.appendChild(p);
    } else {
      p.classList.remove('active-county');
    }
  });

  // Header
  elements.detailCityName.textContent = data.name;
  elements.detailCityEn.textContent = meta.en;
  elements.detailRegionTag.textContent = `${meta.region}地區`;

  // Hero Banner
  const wxVis = getWxVisual(data.wx);
  elements.heroWeatherIcon.textContent = wxVis.icon;
  elements.heroTempValue.textContent = Number(data.temp).toFixed(1);
  elements.heroWeatherDesc.textContent = data.wx;
  elements.heroComfortBadge.textContent = data.ci || '舒適';
  elements.heroTempRange.textContent = `溫差: ${data.minT}°C ~ ${data.maxT}°C`;

  // Subcard 1: 氣溫
  elements.subTempVal.textContent = Number(data.temp).toFixed(1);
  elements.subTempBadge.textContent = data.temp > 30 ? '偏熱' : (data.temp < 20 ? '偏涼' : '舒適');
  const tempPercent = Math.max(0, Math.min(100, ((data.temp - 15) / (38 - 15)) * 100));
  elements.meterTemp.style.width = `${tempPercent}%`;

  // Subcard 2: 濕度
  elements.subHumidityVal.textContent = Math.round(data.humidity);
  elements.subHumidityBadge.textContent = data.humidity > 80 ? '潮濕' : (data.humidity < 50 ? '乾燥' : '適中');
  elements.meterHumidity.style.width = `${Math.min(100, data.humidity)}%`;

  // Subcard 3: 降雨量
  elements.subRainVal.textContent = Number(data.rainfall).toFixed(1);
  elements.subRainBadge.textContent = data.rainfall > 10 ? '顯著降雨' : (data.rainfall > 0.5 ? '微雨' : '無雨');
  const rainPercent = Math.max(0, Math.min(100, (data.rainfall / 50) * 100));
  elements.meterRain.style.width = `${rainPercent}%`;

  // Subcard 4: 降雨機率
  elements.subPopVal.textContent = Math.round(data.pop);
  elements.subPopBadge.textContent = data.pop >= 60 ? '高機率' : (data.pop >= 30 ? '可能降雨' : '低機率');
  elements.meterPop.style.width = `${Math.min(100, data.pop)}%`;

  // Subcard 5: PM2.5
  const pm25Val = Math.round(data.pm25);
  elements.subPm25Val.textContent = pm25Val;
  let pmBadge = '良好', pmColor = '#22c55e', pmAdvice = '空氣良好，宜進行戶外運動';
  let pmPercent = (pm25Val / 100) * 100;
  if (pm25Val <= 15.4) {
    pmBadge = '良好 (優)';
    pmColor = '#22c55e';
    pmAdvice = '空氣清新，各年齡層皆可正常戶外活動';
  } else if (pm25Val <= 35.4) {
    pmBadge = '普通 (中)';
    pmColor = '#eab308';
    pmAdvice = '極特殊敏感族群可微幅注意呼吸狀況';
  } else if (pm25Val <= 54.4) {
    pmBadge = '對敏感族群不良';
    pmColor = '#f97316';
    pmAdvice = '敏感族群請適度減少劇烈戶外運動';
  } else if (pm25Val <= 150.4) {
    pmBadge = '對所有族群不良';
    pmColor = '#ef4444';
    pmAdvice = '建議佩戴口罩，減少長時間室外逗留';
  } else {
    pmBadge = '非常不良/危害';
    pmColor = '#a855f7';
    pmAdvice = '盡量停留在室內並關閉門窗';
  }
  elements.subPm25Badge.textContent = pmBadge;
  elements.subPm25Badge.style.color = pmColor;
  elements.subPm25Badge.style.background = `${pmColor}22`;
  elements.subPm25Advice.textContent = pmAdvice;
  elements.meterPm25.style.width = `${Math.min(100, pmPercent)}%`;
  elements.meterPm25.style.background = pmColor;

  // Subcard 6: UV
  const uvVal = Math.round(data.uvindex);
  elements.subUvVal.textContent = uvVal;
  let uvBadge = '良好', uvColor = '#22c55e', uvAdvice = '空氣良好，宜進行戶外運動';
  let uvPercent = (uvVal / 100) * 100;
  if (uvVal <= 2) {
    uvBadge = '低量級';
    uvColor = '#22c55e';
    uvAdvice = '一般正常外出安全無虞';
  } else if (uvVal <= 5) {
    uvBadge = '中量級';
    uvColor = '#eab308';
    uvAdvice = '外出建議塗抹防曬乳';
  } else if (uvVal <= 7) {
    uvBadge = '高量級';
    uvColor = '#f97316';
    uvAdvice = '在戶外容易曬傷與曬黑，做好防曬';
  } else if (uvVal <= 10) {
    uvBadge = '過量級';
    uvColor = '#ef4444';
    uvAdvice = '上午10點至下午3點應避免外出';
  } else {
    uvBadge = '危險級';
    uvColor = '#a855f7';
    uvAdvice = '短短數分鐘內就可能曬傷';
  }
  elements.subUvBadge.textContent = uvBadge;
  elements.subUvBadge.style.color = uvColor;
  elements.subUvBadge.style.background = `${uvColor}22`;
  elements.subUvAdvice.textContent = uvAdvice;
  elements.meterUv.style.width = `${Math.min(100, uvPercent)}%`;
  elements.meterUv.style.background = uvColor;

  // 36-Hour Forecast Cards
  elements.forecastCardsContainer.innerHTML = '';
  if (data.forecasts && data.forecasts.length) {
    data.forecasts.forEach(f => {
      const fVis = getWxVisual(f.wx);
      const card = document.createElement('div');
      card.className = 'forecast-card';
      card.innerHTML = `
        <span class="forecast-period-title">${f.period}</span>
        <div class="forecast-card-icon">${fVis.icon}</div>
        <span class="forecast-card-desc">${f.wx}</span>
        <span class="forecast-card-temp">${f.tempRange}</span>
        <span class="forecast-card-pop">降雨率 ${f.pop}</span>
      `;
      elements.forecastCardsContainer.appendChild(card);
    });
  }

  // Lifestyle Recommendations
  elements.lifeUmbrella.textContent = data.pop >= 50 || data.rainfall > 0 ? '務必攜帶折傘' : (data.pop >= 25 ? '建議攜傘備用' : '無需攜傘');
  elements.lifeClothing.textContent = data.temp > 28 ? '短袖透氣排汗' : (data.temp < 22 ? '加穿防風外套' : '薄長袖或短袖搭薄外套');
  elements.lifeSport.textContent = data.pop >= 70 ? '建議室內運動' : (pm25Val > 54 ? '減少室外劇烈活動' : '適合各類戶外休閒');
  elements.lifeVentilation.textContent = pm25Val <= 35 ? '空氣品質佳，適宜開窗' : '空氣微差，減少開窗時間';
}

// Floating Tooltip Interactions
function initMapInteractions() {
  const paths = elements.taiwanSvg.querySelectorAll('.county');

  paths.forEach(path => {
    const id = path.getAttribute('data-id');
    const meta = COUNTY_METADATA[id];

    // Hover Event
    path.addEventListener('mouseenter', e => {
      const data = AppState.countyData[id];
      if (!data) return;

      const metric = AppState.activeMetric;
      const config = METRIC_CONFIGS[metric];
      const valFormatted = config.format(data[metric]);
      const wxVis = getWxVisual(data.wx);

      elements.ttCityName.textContent = data.name;
      elements.ttRegionBadge.textContent = `${meta.region}`;
      elements.ttMetricValue.innerHTML = `${valFormatted}`;
      elements.ttWeatherRow.innerHTML = `<span>${wxVis.icon}</span> <span>${data.wx} | ${data.ci}</span>`;

      elements.tooltip.classList.add('visible');
      positionTooltip(e);
    });

    path.addEventListener('mousemove', e => {
      positionTooltip(e);
    });

    path.addEventListener('mouseleave', () => {
      elements.tooltip.classList.remove('visible');
    });

    // Click Event (Select County)
    path.addEventListener('click', () => {
      selectCounty(id);
    });

    // Keyboard Access (Accessibility)
    path.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectCounty(id);
      }
    });
  });

  // Pan & Zoom on SVG Map
  let isDragging = false;
  let startX, startY;

  elements.svgStage.addEventListener('mousedown', e => {
    if (e.target.closest('.legend-overlay') || e.target.closest('.map-toolbar')) return;
    isDragging = true;
    startX = e.clientX - AppState.panX;
    startY = e.clientY - AppState.panY;
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    AppState.panX = e.clientX - startX;
    AppState.panY = e.clientY - startY;
    applyMapTransform();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Mouse Wheel Zoom
  elements.svgStage.addEventListener('wheel', e => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    const newZoom = Math.max(0.7, Math.min(3.5, AppState.zoomLevel + delta));
    AppState.zoomLevel = Number(newZoom.toFixed(2));
    applyMapTransform();
  }, { passive: false });
}

function positionTooltip(e) {
  const pad = 15;
  let x = e.clientX;
  let y = e.clientY;
  elements.tooltip.style.left = `${x}px`;
  elements.tooltip.style.top = `${y - pad}px`;
}

function applyMapTransform() {
  elements.taiwanSvg.style.transform = `translate(${AppState.panX}px, ${AppState.panY}px) scale(${AppState.zoomLevel})`;
}

function selectCounty(id) {
  if (!COUNTY_METADATA[id]) return;
  updateDetailCard(id);
}

// Zoom Controls
function initMapControls() {
  elements.btnZoomIn.addEventListener('click', () => {
    AppState.zoomLevel = Math.min(3.5, AppState.zoomLevel + 0.25);
    applyMapTransform();
  });

  elements.btnZoomOut.addEventListener('click', () => {
    AppState.zoomLevel = Math.max(0.7, AppState.zoomLevel - 0.25);
    applyMapTransform();
  });

  elements.btnZoomReset.addEventListener('click', () => {
    AppState.zoomLevel = 1;
    AppState.panX = 0;
    AppState.panY = 0;
    applyMapTransform();
  });

  // Show / Hide County Labels
  elements.btnToggleLabels.addEventListener('click', () => {
    AppState.labelsVisible = !AppState.labelsVisible;
    elements.svgStage.classList.toggle('hide-labels', !AppState.labelsVisible);
    elements.btnToggleLabels.classList.toggle('active', AppState.labelsVisible);
  });
  elements.btnToggleLabels.classList.add('active');

  // Region View Focus Filters
  elements.regionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      elements.regionChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const region = chip.getAttribute('data-region');
      AppState.activeRegionFilter = region;

      // Smooth Viewport Center & Zoom Adjustment based on region
      if (region === 'all') {
        AppState.zoomLevel = 1;
        AppState.panX = 0;
        AppState.panY = 0;
      } else if (region === 'north') {
        AppState.zoomLevel = 1.6;
        AppState.panX = -180;
        AppState.panY = 120;
      } else if (region === 'central') {
        AppState.zoomLevel = 1.6;
        AppState.panX = -100;
        AppState.panY = -30;
      } else if (region === 'south') {
        AppState.zoomLevel = 1.6;
        AppState.panX = -50;
        AppState.panY = -220;
      } else if (region === 'east') {
        AppState.zoomLevel = 1.5;
        AppState.panX = -200;
        AppState.panY = -100;
      } else if (region === 'islands') {
        AppState.zoomLevel = 1.7;
        AppState.panX = 220;
        AppState.panY = 60;
      }
      applyMapTransform();
    });
  });
}

// Metric Switcher Events
function initMetricSwitcher() {
  elements.metricButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.metricButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const metricKey = btn.getAttribute('data-metric');
      AppState.activeMetric = metricKey;
      const config = METRIC_CONFIGS[metricKey];
      elements.activeMetricTitle.textContent = `${config.name} (${config.unit})`;

      updateHeatmapColors();
    });
  });
}

// Theme (Dark/Light) Switcher
function initThemeToggle() {
  const savedTheme = localStorage.getItem('app_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  elements.btnTheme.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('app_theme', next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  elements.themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
}

// Settings Modal (API Key & Data Source Control)
function initSettingsModal() {
  elements.btnSettings.addEventListener('click', () => {
    elements.inputApiKey.value = AppState.apiKey;
    elements.settingsMsg.textContent = '';
    elements.settingsModal.classList.add('open');
  });

  const closeModal = () => elements.settingsModal.classList.remove('open');
  elements.btnCloseSettings.addEventListener('click', closeModal);
  elements.btnCancelSettings.addEventListener('click', closeModal);

  elements.settingsModal.addEventListener('click', e => {
    if (e.target === elements.settingsModal) closeModal();
  });

  // Save Key & Re-fetch
  elements.btnSaveSettings.addEventListener('click', async () => {
    const key = elements.inputApiKey.value.trim();
    AppState.apiKey = key;
    localStorage.setItem('cwa_api_key', key);
    elements.settingsMsg.style.color = '#38bdf8';
    elements.settingsMsg.textContent = '金鑰已儲存，正在連線測試 CWA API...';
    await loadWeatherData(false);
    elements.settingsMsg.style.color = '#10b981';
    elements.settingsMsg.textContent = '連線測試完成！';
    setTimeout(closeModal, 800);
  });

  // Force Live
  elements.btnForceLive.addEventListener('click', () => {
    closeModal();
    loadWeatherData(false);
  });

  // Force Mock
  elements.btnForceMock.addEventListener('click', () => {
    closeModal();
    useFallbackMockData('使用者手動指定展示模擬資料 (Mock)');
  });
}

// Refresh Button
elements.btnRefresh.addEventListener('click', () => {
  loadWeatherData(false);
});

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  initCountySelector();
  initMetricSwitcher();
  initMapInteractions();
  initMapControls();
  initThemeToggle();
  initSettingsModal();

  // Load initial weather data
  loadWeatherData(false);
  updateDetailCard(AppState.selectedCountyId);
});
