/**
 * FishMap VN - Application JavaScript
 * Handles Leaflet Map, Weather Barometer, Species Guide, Leaderboard,
 * and the 4-step FishVision AI Verification Engine.
 */

// Application State
const state = {
  lakes: [],
  species: [],
  selectedLake: null,
  activeTab: 'map',
  mapInstance: null,
  markersLayer: null,
  currentScenario: 'case_carp_authentic',
  customImageBase64: null,
  lastVerificationResult: null,
  testScenariosData: {
    case_carp_authentic: {
      angler: 'Đặng Quốc Việt (Việt Đài Thủ)',
      lake: 'Hồ Tây (West Lake)',
      species: 'Cá Chép',
      weight: 6.2,
      length: 68.0,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop',
      focal: '28.0 mm (Chuẩn 1x)',
      landmarks: [
        { label: 'Mõm cá', x: 22, y: 55 },
        { label: 'Mắt cá', x: 28, y: 50 },
        { label: 'Vây lưng', x: 50, y: 32 },
        { label: 'Vòng bụng', x: 52, y: 68 },
        { label: 'Khớp đuôi', x: 82, y: 52 }
      ],
      box: { x: 18, y: 30, w: 68, h: 45 }
    },
    case_black_carp_fake: {
      angler: 'Lê Hoàng Anh (Anh Sóc Sơn)',
      lake: 'Hồ Đồng Đò (Sóc Sơn)',
      species: 'Cá Trắm Đen',
      weight: 15.0, // Claimed 15kg, real is 7.5kg!
      length: 75.0,
      image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800&auto=format&fit=crop',
      focal: '26.0 mm (Chuẩn 1x)',
      landmarks: [
        { label: 'Mõm cá', x: 20, y: 58 },
        { label: 'Mang cá', x: 30, y: 53 },
        { label: 'Vây lưng', x: 52, y: 36 },
        { label: 'Bụng cá', x: 50, y: 65 },
        { label: 'Đuôi', x: 85, y: 50 }
      ],
      box: { x: 15, y: 32, w: 73, h: 42 }
    },
    case_zoom_05: {
      angler: 'Hoàng Văn Thắng (Thắng Lure)',
      lake: 'Hồ Trị An (Vĩnh Cửu)',
      species: 'Cá Chép',
      weight: 12.0, // Blown up by 0.5x wide angle
      length: 95.0,
      image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=800&auto=format&fit=crop',
      focal: '13.0 mm (0.5x Ultra-Wide)',
      landmarks: [
        { label: 'Mõm cá (Phóng đại)', x: 15, y: 60 },
        { label: 'Đầu cá méo góc', x: 28, y: 52 },
        { label: 'Thân cá', x: 55, y: 45 },
        { label: 'Đuôi cá xa', x: 80, y: 52 }
      ],
      box: { x: 10, y: 25, w: 80, h: 55 }
    },
    case_web_download: {
      angler: 'Phạm Minh Đức (Đức Cần Đơn)',
      lake: 'Hồ Sông Mây (Trảng Bom)',
      species: 'Cá Chép',
      weight: 8.5,
      length: 72.0,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop',
      focal: 'Unknown (EXIF Stripped)',
      landmarks: [],
      box: { x: 20, y: 25, w: 60, h: 50 }
    },
    case_catfish_giant: {
      angler: 'Trần Minh Hùng (Hùng Cần Thơ)',
      lake: 'Hồ Trị An (Vĩnh Cửu)',
      species: 'Cá Tra',
      weight: 18.5,
      length: 108.0,
      image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&auto=format&fit=crop',
      focal: '24.0 mm (Chuẩn 1x)',
      landmarks: [
        { label: 'Đầu dẹp', x: 18, y: 54 },
        { label: 'Râu mép', x: 22, y: 62 },
        { label: 'Vây lưng cao', x: 44, y: 30 },
        { label: 'Bụng lớn', x: 54, y: 66 },
        { label: 'Đuôi chẻ', x: 88, y: 48 }
      ],
      box: { x: 12, y: 25, w: 80, h: 50 }
    }
  }
};

// Initialize App on DOM Load
document.addEventListener('DOMContentLoaded', async () => {
  await fetchLakes();
  await fetchSpecies();
  initLeafletMap();
  selectScenario('case_carp_authentic');
  loadWeatherDashboard();
  loadLeaderboard();
  if (window.lucide) {
    lucide.createIcons();
  }
});

// Tab Navigation
function switchTab(tabName) {
  state.activeTab = tabName;

  // Toggle views
  const views = ['map', 'weather', 'species', 'leaderboard', 'verifier'];
  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    if (el) {
      if (v === tabName) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    }

    // Nav tab buttons active style
    const btn = document.getElementById(`nav-btn-${v}`);
    if (btn) {
      if (v === tabName) {
        btn.classList.add('active-tab', 'text-cyan-400');
        btn.classList.remove('text-slate-400');
      } else {
        btn.classList.remove('active-tab', 'text-cyan-400');
        btn.classList.add('text-slate-400');
      }
    }
  });

  // Re-invalidate map size if switching to map
  if (tabName === 'map' && state.mapInstance) {
    setTimeout(() => {
      state.mapInstance.invalidateSize();
    }, 200);
  }

  // Refresh icons
  if (window.lucide) {
    lucide.createIcons();
  }
}

// ==========================================
// 1. MAP & LAKES
// ==========================================
async function fetchLakes() {
  try {
    const res = await fetch('/api/lakes');
    const json = await res.json();
    if (json.success) {
      state.lakes = json.data;
      updateLakeDropdowns();
    }
  } catch (err) {
    console.error('Lỗi tải danh sách hồ:', err);
  }
}

function updateLakeDropdowns() {
  const lakeSelect = document.getElementById('input-lake-name');
  if (lakeSelect && state.lakes.length > 0) {
    const currentVal = lakeSelect.value;
    lakeSelect.innerHTML = state.lakes.map(l => `
      <option value="${l.name}">${l.name} (${l.province})</option>
    `).join('');
    if (currentVal && state.lakes.some(l => l.name === currentVal)) {
      lakeSelect.value = currentVal;
    }
  }
}

function initLeafletMap() {
  const mapContainer = document.getElementById('fishing-map');
  if (!mapContainer) return;

  // 1. Esri Satellite Layer (World Imagery) - 100% pure satellite photos, ZERO foreign/Chinese labels!
  const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: '🛰️ Vệ Tinh Esri World Imagery | Bản Đồ Chủ Quyền Biển Đảo Việt Nam'
  });

  // 2. Dark Basemap (No labels - 100% clean, no foreign text)
  const darkNoLabelsLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    subdomains: 'abcd',
    attribution: '🌑 Bản Đồ Đêm Chủ Quyền Việt Nam | FishMap VN'
  });

  // 3. CartoDB Voyager Layer (Shows roads, lakes, rivers)
  const voyagerLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    subdomains: 'abcd',
    attribution: '🗺️ Bản Đồ Điểm Câu & Hồ Nước | FishMap VN'
  });

  // 4. Esri Ocean Basemap - Dedicated marine/oceanography map for fishing & bathymetry
  const oceanLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 13,
    attribution: '🌊 Esri Oceans | Ngư Trường Biển Đảo Việt Nam'
  });

  // 5. Clean Light Basemap (No labels)
  const cleanTopoLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    subdomains: 'abcd',
    attribution: '🗺️ Bản Đồ Địa Hình Sạch'
  });

  // Initialize Map with Satellite view by default (Pristine, 100% true-color, zero foreign labels)
  state.mapInstance = L.map('fishing-map', {
    zoomControl: true,
    scrollWheelZoom: true,
    layers: [satelliteLayer]
  }).setView([16.0, 107.5], 6);

  // Base map layer options for user to switch
  const baseMaps = {
    "🛰️ Vệ Tinh Không Gian (Esri Satellite)": satelliteLayer,
    "🌑 Bản Đồ Đêm Sạch (Dark No-Labels)": darkNoLabelsLayer,
    "🗺️ Bản Đồ Điểm Câu & Hồ Nước (Voyager)": voyagerLayer,
    "🌊 Hải Dương & Ngư Trường (Esri Ocean)": oceanLayer,
    "🗺️ Địa Hình Tự Nhiên Sạch (Light No-Labels)": cleanTopoLayer
  };

  L.control.layers(baseMaps, null, { position: 'topright' }).addTo(state.mapInstance);

  // Layer for fishing lakes & spots
  state.markersLayer = L.layerGroup().addTo(state.mapInstance);

  // Dedicated Vietnam Territorial Sovereignty Overlays (Hoàng Sa & Trường Sa)
  renderSovereigntyOverlays();

  renderLakeMarkers(state.lakes);
}

function renderSovereigntyOverlays() {
  if (!state.mapInstance) return;

  const sovereigntyLayer = L.layerGroup().addTo(state.mapInstance);

  // 0. Watermark Label: BIỂN ĐÔNG (VIỆT NAM)
  const bienDongIcon = L.divIcon({
    className: 'biendong-watermark-label',
    html: `
      <div class="biendong-text">
        BIỂN ĐÔNG VIỆT NAM
        <small>Vùng Biển & Thềm Lục Địa Thuộc Chủ Quyền Việt Nam</small>
      </div>
    `,
    iconSize: [320, 60],
    iconAnchor: [160, 30]
  });
  L.marker([13.5, 112.5], { icon: bienDongIcon, interactive: false }).addTo(sovereigntyLayer);

  // 1. Quần Đảo Hoàng Sa (Huyện Hoàng Sa, TP. Đà Nẵng, Việt Nam)
  const hoangSaCoord = [16.5333, 112.0333];
  L.circle(hoangSaCoord, {
    color: '#fbbf24',
    fillColor: '#dc2626',
    fillOpacity: 0.18,
    radius: 95000,
    weight: 2.5,
    dashArray: '8, 6'
  }).addTo(sovereigntyLayer);

  const hoangSaIcon = L.divIcon({
    className: 'custom-sovereignty-marker',
    html: `
      <div class="sovereignty-flag-badge">
        <span class="flag-icon">🇻🇳</span>
        <span class="badge-text">QUẦN ĐẢO HOÀNG SA<br><small>(TP. ĐÀ NẴNG - VIỆT NAM)</small></span>
      </div>
    `,
    iconSize: [230, 46],
    iconAnchor: [115, 23]
  });

  const hoangSaMarker = L.marker(hoangSaCoord, { icon: hoangSaIcon }).addTo(sovereigntyLayer);
  hoangSaMarker.bindPopup(`
    <div style="min-width: 270px; padding: 6px;">
      <div style="font-weight: 800; font-size: 15px; color: #ef4444; margin-bottom: 3px; display: flex; align-items: center; gap: 6px;">
        <span>🇻🇳</span> <span>QUẦN ĐẢO HOÀNG SA</span>
      </div>
      <div style="font-size: 12px; color: #38bdf8; font-weight: 700; margin-bottom: 6px;">
        Đơn vị hành chính: Huyện Hoàng Sa, TP. Đà Nẵng, Việt Nam
      </div>
      <p style="font-size: 11px; color: #cbd5e1; line-height: 1.5; margin-bottom: 8px;">
        Quần đảo Hoàng Sa là phần lãnh thổ thiêng liêng bất khả xâm phạm của Tổ quốc Việt Nam. Đây là ngư trường đánh bắt xa bờ truyền thống ngàn đời của ngư dân Đà Nẵng, Quảng Nam, Quảng Ngãi.
      </p>
      <div style="background: rgba(14, 165, 233, 0.15); border: 1px solid rgba(14, 165, 233, 0.4); border-radius: 8px; padding: 6px; font-size: 11px; color: #e2e8f0;">
        🐟 <strong>Đặc sản ngư trường:</strong> Cá ngừ đại dương, cá mú đỏ san hô, cá thu bè, tôm hùm.
      </div>
    </div>
  `);

  // Specific islands in Hoàng Sa:
  const hoangSaIslands = [
    { name: "Đảo Hoàng Sa", coord: [16.5333, 111.6000] },
    { name: "Đảo Phú Lâm", coord: [16.8333, 112.3333] },
    { name: "Đảo Tri Tôn", coord: [15.7833, 111.2000] }
  ];
  hoangSaIslands.forEach(island => {
    L.circleMarker(island.coord, {
      radius: 5,
      color: '#f59e0b',
      fillColor: '#ef4444',
      fillOpacity: 1,
      weight: 2
    }).bindTooltip(`🇻🇳 ${island.name} (Việt Nam)`, { permanent: true, direction: 'top', className: 'island-tooltip' }).addTo(sovereigntyLayer);
  });

  // 2. Quần Đảo Trường Sa (Huyện Trường Sa, Tỉnh Khánh Hòa, Việt Nam)
  const truongSaCoord = [9.5000, 114.0000];
  L.circle(truongSaCoord, {
    color: '#fbbf24',
    fillColor: '#dc2626',
    fillOpacity: 0.18,
    radius: 150000,
    weight: 2.5,
    dashArray: '8, 6'
  }).addTo(sovereigntyLayer);

  const truongSaIcon = L.divIcon({
    className: 'custom-sovereignty-marker',
    html: `
      <div class="sovereignty-flag-badge">
        <span class="flag-icon">🇻🇳</span>
        <span class="badge-text">QUẦN ĐẢO TRƯỜNG SA<br><small>(TỈNH KHÁNH HÒA - VIỆT NAM)</small></span>
      </div>
    `,
    iconSize: [230, 46],
    iconAnchor: [115, 23]
  });

  const truongSaMarker = L.marker(truongSaCoord, { icon: truongSaIcon }).addTo(sovereigntyLayer);
  truongSaMarker.bindPopup(`
    <div style="min-width: 270px; padding: 6px;">
      <div style="font-weight: 800; font-size: 15px; color: #ef4444; margin-bottom: 3px; display: flex; align-items: center; gap: 6px;">
        <span>🇻🇳</span> <span>QUẦN ĐẢO TRƯỜNG SA</span>
      </div>
      <div style="font-size: 12px; color: #38bdf8; font-weight: 700; margin-bottom: 6px;">
        Đơn vị hành chính: Huyện Trường Sa, Tỉnh Khánh Hòa, Việt Nam
      </div>
      <p style="font-size: 11px; color: #cbd5e1; line-height: 1.5; margin-bottom: 8px;">
        Quần đảo Trường Sa là vùng lãnh thổ và lãnh hải thiêng liêng tiền tiêu của Tổ quốc Việt Nam. Có vị trí chiến lược trọng yếu và nguồn lợi hải sản biển sâu dồi dào bậc nhất khu vực.
      </p>
      <div style="background: rgba(14, 165, 233, 0.15); border: 1px solid rgba(14, 165, 233, 0.4); border-radius: 8px; padding: 6px; font-size: 11px; color: #e2e8f0;">
        🐟 <strong>Đặc sản ngư trường:</strong> Cá ngừ vây vàng, cá mú cọp, cá bè trang, cá cờ gòn.
      </div>
    </div>
  `);

  // Key islands under Vietnam administration in Trường Sa:
  const truongSaKeyIslands = [
    { name: "Đảo Trường Sa Lớn (Thủ phủ)", coord: [8.6444, 111.9194] },
    { name: "Đảo Song Tử Tây (Hải đăng)", coord: [11.4283, 114.3317] },
    { name: "Đảo Sinh Tồn", coord: [9.8850, 114.3167] },
    { name: "Đảo Nam Yết", coord: [10.1808, 114.3653] },
    { name: "Đảo Sơn Ca", coord: [10.3767, 114.4789] },
    { name: "Đảo Phan Vinh", coord: [8.9667, 113.6833] },
    { name: "Đảo Đá Tây (Hậu cần nghề cá)", coord: [8.8500, 112.9167] },
    { name: "Đảo An Bang", coord: [7.8833, 112.9000] },
    { name: "Bãi Thuyền Chài", coord: [8.1667, 113.3000] }
  ];

  truongSaKeyIslands.forEach(island => {
    L.circleMarker(island.coord, {
      radius: 5,
      color: '#f59e0b',
      fillColor: '#ef4444',
      fillOpacity: 1,
      weight: 2
    }).bindTooltip(`🇻🇳 ${island.name}`, { permanent: true, direction: 'top', className: 'island-tooltip' }).addTo(sovereigntyLayer);
  });
}

function zoomToSovereignty(archipelago) {
  if (!state.mapInstance) return;
  if (archipelago === 'hoang-sa') {
    state.mapInstance.flyTo([16.5333, 112.0333], 8, { duration: 1.5 });
  } else if (archipelago === 'truong-sa') {
    state.mapInstance.flyTo([9.5000, 114.0000], 7.5, { duration: 1.5 });
  } else {
    state.mapInstance.flyTo([15.0, 111.0], 6, { duration: 1.5 });
  }
}

function renderLakeMarkers(lakesToRender) {
  if (!state.markersLayer) return;
  state.markersLayer.clearLayers();

  lakesToRender.forEach(lake => {
    // Determine pin color based on lake type
    let pinColor = '#0ea5e9'; // Default blue
    let pinIcon = '🐟';

    if (lake.lake_type.includes('chủ quyền') || lake.province.includes('Việt Nam')) {
      pinColor = '#ef4444'; // Red for Vietnam sovereignty
      pinIcon = '⭐';
    } else if (lake.lake_type.includes('dịch vụ') || lake.lake_type.includes('giải trí')) {
      pinColor = '#10b981'; // Green
    } else if (lake.lake_type.includes('tự nhiên')) {
      pinColor = '#f59e0b'; // Amber
    }

    const customIcon = L.divIcon({
      className: 'custom-lake-marker',
      html: `
        <div style="position: relative; width: 34px; height: 34px;">
          <div style="background-color: ${pinColor}; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.6);"></div>
          <div style="position: absolute; top: 6px; left: 6px; width: 18px; height: 18px; border-radius: 50%; background: #0f172a; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold;">
            ${pinIcon}
          </div>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 34],
      popupAnchor: [0, -34]
    });

    const marker = L.marker([lake.lat, lake.lng], { icon: customIcon });

    // Popup content
    const popupHtml = `
      <div style="min-width: 220px; padding: 4px;">
        <div style="font-weight: 700; font-size: 14px; color: #38bdf8; margin-bottom: 2px;">${lake.name}</div>
        <div style="font-size: 11px; color: #94a3b8; margin-bottom: 6px;">📍 ${lake.province} • Độ sâu: ${lake.water_depth_m}m</div>
        <div style="font-size: 11px; color: #e2e8f0; margin-bottom: 8px;">
          <strong style="color: #34d399;">Khí áp cắn câu:</strong> ${lake.barometric_pressure_hpa} hPa (Điểm: ${lake.fishing_bite_score}/100)
        </div>
        <div style="display: flex; gap: 6px;">
          <button onclick="selectLakeById(${lake.id})" style="flex: 1; background: #0ea5e9; hover:background: #0284c7; color: white; border: none; padding: 6px 8px; border-radius: 8px; font-size: 11px; font-weight: 600; cursor: pointer;">
            Xem Chi Tiết
          </button>
          ${lake.google_maps_url ? `
          <a href="${lake.google_maps_url}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; justify-content: center; background: #10b981; color: white; text-decoration: none; padding: 6px 10px; border-radius: 8px; font-size: 11px; font-weight: 600; transition: background 0.2s;" title="Mở bản đồ Google Maps chỉ đường">
            📍 Maps
          </a>` : ''}
        </div>
      </div>
    `;

    marker.bindPopup(popupHtml);
    marker.on('click', () => {
      showLakeDetail(lake);
    });

    state.markersLayer.addLayer(marker);
  });
}

function selectLakeById(id) {
  const lake = state.lakes.find(l => l.id === id);
  if (lake) {
    showLakeDetail(lake);
    if (state.mapInstance) {
      state.mapInstance.flyTo([lake.lat, lake.lng], 13, { duration: 1.0 });
    }
    const mapContainer = document.getElementById('fishing-map');
    if (mapContainer) {
      mapContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

function showLakeDetail(lake) {
  state.selectedLake = lake;

  const placeholder = document.getElementById('lake-detail-placeholder');
  const content = document.getElementById('lake-detail-content');
  if (placeholder) placeholder.classList.add('hidden');
  if (content) content.classList.remove('hidden');

  const speciesBadges = lake.species_list.map(s => {
    const fishImg = getFishImage(s);
    return `<button onclick="viewFishRecipes('${s}')" title="Xem món ngon chế biến từ ${s}" class="px-2 py-1 text-[11px] bg-slate-800 hover:bg-amber-950/80 text-cyan-300 hover:text-amber-300 border border-slate-700 hover:border-amber-700/80 rounded-lg font-medium transition-all flex items-center gap-1.5 shadow-sm">
      ${fishImg ? `<img src="${fishImg}" alt="${s}" class="w-6 h-6 rounded object-contain bg-slate-900/60"/>` : '<span>🐟</span>'}
      <span>${s}</span>
      <span class="text-[9px] bg-amber-900/50 text-amber-300 px-1 rounded">🍲 Món ngon</span>
    </button>`;
  }).join('');

  // Barometer color logic
  let pressureStatus = 'Lý tưởng (Cá ăn mạnh)';
  let pressureColor = 'text-emerald-400';
  if (lake.barometric_pressure_hpa < 1009) {
    pressureStatus = 'Khí áp thấp (Cá lặn sâu)';
    pressureColor = 'text-amber-400';
  }

  content.innerHTML = `
    <!-- Lake Hero Photo -->
    <div class="relative h-44 rounded-xl overflow-hidden border border-slate-700/80 shadow-md">
      <img src="${lake.image_url}" alt="${lake.name}" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
      <div class="absolute bottom-3 left-3 right-3 flex items-end justify-between">
        <div>
          <span class="px-2 py-0.5 text-[10px] uppercase font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 rounded-md">${lake.lake_type}</span>
          <h2 class="text-lg font-extrabold text-white mt-1 leading-tight">${lake.name}</h2>
          <p class="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-cyan-400"></i>
            <span>${lake.province}</span>
            <span class="text-slate-500">•</span>
            <span>Sâu ${lake.water_depth_m}m</span>
          </p>
        </div>
        <div class="text-right">
          <div class="text-xs font-bold text-amber-400 flex items-center gap-1">
            <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>
            <span>${lake.rating}</span>
          </div>
          <span class="text-[10px] text-slate-400">${lake.ticket_price}</span>
        </div>
      </div>
    </div>

    <!-- Live Fishing Weather & Barometer Card -->
    <div class="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
      <div class="flex items-center justify-between text-xs">
        <span class="font-bold text-slate-300 flex items-center gap-1.5">
          <i data-lucide="gauge" class="w-4 h-4 text-cyan-400"></i>
          <span>Áp suất khí quyển:</span>
        </span>
        <span class="font-mono font-bold text-cyan-300">${lake.barometric_pressure_hpa} hPa</span>
      </div>
      <div class="flex items-center justify-between text-xs">
        <span class="text-slate-400">Đánh giá cắn câu:</span>
        <span class="font-bold ${pressureColor}">${pressureStatus}</span>
      </div>
      <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
        <div class="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full" style="width: ${lake.fishing_bite_score}%"></div>
      </div>
      <div class="flex justify-between text-[10px] text-slate-400 pt-1">
        <span>Nhiệt độ nước: ${lake.weather_temp}°C</span>
        <span>Gió: ${lake.wind_speed_kmh} km/h</span>
        <span class="text-emerald-400 font-bold">Điểm: ${lake.fishing_bite_score}/100</span>
      </div>
    </div>

    <!-- Fish Species Present -->
    <div class="space-y-1.5">
      <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Các loài cá có trong hồ:</span>
      <div class="flex flex-wrap gap-1.5">
        ${speciesBadges}
      </div>
    </div>

    <!-- Best Bait Guide -->
    <div class="bg-cyan-950/30 p-3 rounded-xl border border-cyan-800/40 text-xs space-y-1">
      <span class="font-bold text-cyan-300 flex items-center gap-1.5">
        <i data-lucide="sparkles" class="w-3.5 h-3.5 text-cyan-400"></i>
        <span>Loại mồi câu phù hợp nhất:</span>
      </span>
      <p class="text-slate-300 leading-relaxed text-[11px]">${lake.bait_guide}</p>
    </div>

    <!-- Pro Tips -->
    <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
      <span class="font-bold text-amber-400 flex items-center gap-1.5">
        <i data-lucide="lightbulb" class="w-3.5 h-3.5 text-amber-400"></i>
        <span>Kinh nghiệm cao thủ:</span>
      </span>
      <p class="text-slate-400 leading-relaxed text-[11px]">${lake.pro_tips}</p>
    </div>

    <!-- Action Buttons -->
    <div class="pt-2 space-y-2">
      ${lake.google_maps_url ? `
      <a href="${lake.google_maps_url}" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all border border-emerald-400/40 hover:shadow-emerald-900/30 group">
        <i data-lucide="map-pin" class="w-4 h-4 text-emerald-200 group-hover:scale-110 transition-transform"></i>
        <span>Chỉ Đường Trên Google Maps</span>
        <i data-lucide="external-link" class="w-3.5 h-3.5 opacity-80"></i>
      </a>
      ` : ''}
      <div class="flex gap-2">
        <button onclick="goToVerifierWithLake('${lake.name}')" class="flex-1 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all">
          <i data-lucide="scan" class="w-3.5 h-3.5"></i>
          <span>Đăng Cá Tại Hồ Này</span>
        </button>
        <button onclick="filterLeaderboardByLake('${lake.name}')" class="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-1 transition-all">
          <i data-lucide="trophy" class="w-3.5 h-3.5 text-amber-400"></i>
          <span>Kỷ lục</span>
        </button>
      </div>
    </div>
  `;

  if (window.lucide) {
    lucide.createIcons();
  }
}

function filterLakes() {
  const region = document.getElementById('filter-region')?.value || 'all';
  const species = document.getElementById('filter-species')?.value || 'all';

  let filtered = state.lakes;

  if (region !== 'all') {
    const regLower = region.toLowerCase();
    filtered = filtered.filter(l => l.province.toLowerCase().includes(regLower) || l.name.toLowerCase().includes(regLower));
  }

  if (species !== 'all') {
    filtered = filtered.filter(l => l.species_list.some(s => s.toLowerCase().includes(species.toLowerCase())));
  }

  renderLakeMarkers(filtered);

  // If there are results, fit bounds
  if (filtered.length > 0 && state.mapInstance) {
    const group = L.featureGroup(filtered.map(l => L.marker([l.lat, l.lng])));
    state.mapInstance.fitBounds(group.getBounds().pad(0.2));
  }
}

function resetLakeFilters() {
  const regEl = document.getElementById('filter-region');
  const specEl = document.getElementById('filter-species');
  if (regEl) regEl.value = 'all';
  if (specEl) specEl.value = 'all';
  renderLakeMarkers(state.lakes);
  if (state.mapInstance) {
    state.mapInstance.setView([16.0, 106.5], 6);
  }
}

function goToVerifierWithLake(lakeName) {
  switchTab('verifier');
  const sel = document.getElementById('input-lake-name');
  if (sel) {
    sel.value = lakeName;
  }
}

function filterLeaderboardByLake(lakeName) {
  switchTab('leaderboard');
  // Load leaderboard filtered by lake
  loadLeaderboard(null, lakeName);
}

// ==========================================
// 2. WEATHER & FISHING BAROMETER
// ==========================================
function loadWeatherDashboard() {
  const container = document.getElementById('weather-location-cards');
  if (!container || state.lakes.length === 0) return;

  const topLakes = state.lakes.slice(0, 4);
  container.innerHTML = topLakes.map(lake => `
    <div onclick="selectWeatherLake(${lake.id})" class="cursor-pointer bg-slate-900/90 hover:bg-slate-850 p-4 rounded-xl border border-slate-800 hover:border-cyan-500/60 transition-all shadow-lg space-y-2">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-slate-200">${lake.name}</span>
        <span class="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 font-mono">${lake.province}</span>
      </div>
      <div class="flex items-baseline justify-between pt-1">
        <span class="text-2xl font-black text-cyan-400 font-mono">${lake.barometric_pressure_hpa} <span class="text-xs font-normal text-slate-400">hPa</span></span>
        <span class="text-xs font-bold text-emerald-400">${lake.fishing_bite_score}/100 cắn câu</span>
      </div>
      <div class="text-[11px] text-slate-400 flex justify-between pt-1 border-t border-slate-800/80">
        <span>Nhiệt độ: ${lake.weather_temp}°C</span>
        <span>Gió: ${lake.wind_speed_kmh} km/h</span>
      </div>
    </div>
  `).join('');

  // Default deep dive to first lake
  if (topLakes.length > 0) {
    selectWeatherLake(topLakes[0].id);
  }
}

function selectWeatherLake(id) {
  const lake = state.lakes.find(l => l.id === id);
  if (!lake) return;

  const deepDive = document.getElementById('weather-deep-dive');
  if (!deepDive) return;

  deepDive.innerHTML = `
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
      <div>
        <span class="text-xs font-bold text-cyan-400 uppercase tracking-wider">Trạm Khí Tượng Điểm Câu</span>
        <h2 class="text-2xl font-black text-white mt-1">${lake.name} (${lake.province})</h2>
        <p class="text-xs text-slate-400 mt-0.5">Dữ liệu quan trắc khí áp bề mặt & tầng nước ngầm chuyên sâu</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="text-right">
          <span class="text-xs text-slate-400">Chỉ số cá cắn câu hôm nay:</span>
          <div class="text-2xl font-black text-emerald-400">${lake.fishing_bite_score} <span class="text-sm font-normal text-slate-400">/ 100</span></div>
        </div>
        <div class="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-400 text-xl font-bold">
          ⭐
        </div>
      </div>
    </div>

    <!-- Key Metrics Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
        <span class="text-xs text-slate-400 flex items-center gap-1.5">
          <i data-lucide="gauge" class="w-4 h-4 text-cyan-400"></i>
          <span>Áp suất khí quyển</span>
        </span>
        <div class="text-2xl font-mono font-bold text-cyan-300">${lake.barometric_pressure_hpa} hPa</div>
        <p class="text-[11px] text-emerald-400">Vùng áp suất ổn định lý tưởng cho cá thở</p>
      </div>

      <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
        <span class="text-xs text-slate-400 flex items-center gap-1.5">
          <i data-lucide="thermometer" class="w-4 h-4 text-amber-400"></i>
          <span>Nhiệt độ nước bề mặt</span>
        </span>
        <div class="text-2xl font-mono font-bold text-amber-300">${lake.weather_temp}°C</div>
        <p class="text-[11px] text-slate-400">Thích hợp câu tầng lửng và rãnh sâu</p>
      </div>

      <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
        <span class="text-xs text-slate-400 flex items-center gap-1.5">
          <i data-lucide="wind" class="w-4 h-4 text-sky-400"></i>
          <span>Tốc độ gió & Hướng sóng</span>
        </span>
        <div class="text-2xl font-mono font-bold text-sky-300">${lake.wind_speed_kmh} km/h</div>
        <p class="text-[11px] text-slate-400">Gió Đông Nam nhẹ đẩy thức ăn dạt vào bờ cạn</p>
      </div>

      <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
        <span class="text-xs text-slate-400 flex items-center gap-1.5">
          <i data-lucide="clock" class="w-4 h-4 text-purple-400"></i>
          <span>Khung giờ vàng cắn câu (Solunar)</span>
        </span>
        <div class="text-lg font-bold text-purple-300">05:30 - 08:30</div>
        <p class="text-[11px] text-purple-400">Và 16:30 - 20:30 (Đêm cá ăn mạnh)</p>
      </div>
    </div>

    <!-- Scientific Explanation of Pressure -->
    <div class="mt-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-2">
      <div class="font-bold text-slate-200 flex items-center gap-2">
        <i data-lucide="info" class="w-4 h-4 text-cyan-400"></i>
        <span>Vì sao cần thủ chuyên nghiệp luôn xem áp suất trước khi buông cần?</span>
      </div>
      <p class="leading-relaxed text-slate-400">
        Bong bóng cá hoạt động như một cảm biến áp suất siêu nhạy. Khi áp suất khí quyển tăng lên mức 1010 - 1015 hPa, áp lực nước nén nhẹ giúp bóng khí căng đều, cá không bị đau tức và bơi lội chủ động tìm mồi. Ngược lại, trước cơn bão áp suất tụt dưới 1005 hPa, bóng khí nở phồng khiến cá khó chịu, cá sẽ chìm sát bùn lười thở và hoàn toàn ngậm miệng.
      </p>
    </div>
  `;

  if (window.lucide) {
    lucide.createIcons();
  }
}

// ==========================================
// 3. SPECIES & BAIT ENCYCLOPEDIA
// ==========================================
async function fetchSpecies() {
  try {
    const res = await fetch('/api/species');
    const json = await res.json();
    if (json.success) {
      state.species = json.data;
      renderSpeciesGrid(json.data);
    }
  } catch (err) {
    console.error('Lỗi tải danh mục cá:', err);
  }
}

// Fish species image mapping (Real Photos & SVG illustrations)
const FISH_IMAGE_MAP = {
  'Cá Trắm Đen': 'images/species/ca-tram-den.jpg',
  'Cá Chép': 'images/species/ca-chep.jpg',
  'Cá Tra (Cá Tra Bò)': 'images/species/ca-tra.jpg',
  'Cá Tra': 'images/species/ca-tra.jpg',
  'Cá Tra Bò': 'images/species/ca-tra.jpg',
  'Cá Quả (Cá Lóc)': 'images/species/ca-loc.jpg',
  'Cá Lóc': 'images/species/ca-loc.jpg',
  'Cá Quả': 'images/species/ca-loc.jpg',
  'Cá Chẽm (Cá Vược)': 'images/species/ca-chem.jpg',
  'Cá Chẽm': 'images/species/ca-chem.jpg',
  'Cá Vược': 'images/species/ca-chem.jpg',
  'Cá Lăng': 'images/species/ca-lang.jpg',
  'Cá Ngừ Đại Dương': 'images/species/ca-ngu.jpg',
  'Cá Ngừ': 'images/species/ca-ngu.jpg',
  'Cá Rô Phi': 'images/species/ca-ro-phi.jpg',
  'Cá Trê': 'images/species/ca-tre.jpg',
  'Cá Trôi': 'images/species/ca-troi.jpg',
  'Cá Trắm Trắng': 'images/species/ca-tram-trang.jpg',
};

function getFishImage(name) {
  return FISH_IMAGE_MAP[name] || Object.values(FISH_IMAGE_MAP).find((v, i) =>
    name.toLowerCase().includes(Object.keys(FISH_IMAGE_MAP)[i].toLowerCase().split(' ').pop())
  ) || '';
}

function renderSpeciesGrid(speciesList) {
  const grid = document.getElementById('species-grid');
  if (!grid) return;

  grid.innerHTML = speciesList.map(s => {
    const recipes = s.culinary_recipes || [];
    const fishImg = getFishImage(s.common_name);
    const isSvg = fishImg.endsWith('.svg');
    return `
    <div id="species-card-${s.common_name.replace(/[^a-zA-Z0-9]/g, '-')}" class="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between space-y-0 hover:border-cyan-500/50 transition-all overflow-hidden">
      <!-- Fish Illustration / Photo -->
      ${fishImg ? `
      <div class="relative w-full h-48 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden group">
        <img src="${fishImg}" alt="${s.common_name}" class="w-full h-full ${isSvg ? 'object-contain p-2' : 'object-cover'} transition-transform duration-500 group-hover:scale-105" loading="lazy"/>
        <div class="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-900 to-transparent"></div>
        <span class="absolute top-2.5 right-2.5 px-2.5 py-0.5 text-[10px] font-bold rounded-full ${isSvg ? 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60' : 'bg-emerald-950/90 text-emerald-300 border-emerald-700/80'} border backdrop-blur-sm shadow-md">
          ${isSvg ? '📐 Minh Họa SVG' : '📷 Ảnh Thực Tế'}
        </span>
      </div>
      ` : ''}
      <div class="p-5 space-y-4">
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono text-cyan-400 italic">${s.scientific_name}</span>
          <span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-800 text-slate-300">${s.family}</span>
        </div>
        <h3 class="text-xl font-extrabold text-white">${s.common_name}</h3>
        <p class="text-xs text-slate-400 leading-relaxed">${s.description}</p>
      </div>

      <!-- Biological Specs -->
      <div class="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
        <div class="flex justify-between text-slate-300">
          <span class="text-slate-500">Tầng nước săn mồi:</span>
          <span class="font-semibold text-cyan-300">${s.water_layer}</span>
        </div>
        <div class="flex justify-between text-slate-300">
          <span class="text-slate-500">Khí áp kích thích:</span>
          <span class="font-semibold text-emerald-300">${s.optimal_pressure_hpa}</span>
        </div>
        <div class="flex justify-between text-slate-300">
          <span class="text-slate-500">Giờ cá ăn mạnh:</span>
          <span class="font-semibold text-amber-300">${s.feeding_peak_hours}</span>
        </div>
        <div class="flex justify-between text-slate-300 pt-1 border-t border-slate-800/80">
          <span class="text-slate-500">Công thức FishBase:</span>
          <span class="font-mono text-purple-300 text-[11px]">W = ${s.allometric_a} × L^${s.allometric_b}</span>
        </div>
      </div>

      <!-- Bait Recipe -->
      <div class="bg-cyan-950/30 p-3 rounded-xl border border-cyan-800/40 text-xs space-y-1">
        <span class="font-bold text-cyan-300 flex items-center gap-1.5">
          <i data-lucide="cookie" class="w-3.5 h-3.5 text-cyan-400"></i>
          <span>Bài mồi câu bén nhất:</span>
        </span>
        <p class="text-slate-300 text-[11px] leading-relaxed">${s.best_baits}</p>
      </div>

      <!-- Culinary Dishes: Con cá này chế biến món gì ngon? (Requested Feature) -->
      <div class="bg-gradient-to-r from-amber-950/30 via-slate-950 to-amber-950/20 p-3.5 rounded-xl border border-amber-800/40 text-xs space-y-2">
        <div class="flex items-center justify-between">
          <span class="font-bold text-amber-300 flex items-center gap-1.5">
            <i data-lucide="utensils" class="w-3.5 h-3.5 text-amber-400"></i>
            <span>Con cá này chế biến món gì ngon?</span>
          </span>
          <span class="text-[10px] bg-amber-900/70 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">${recipes.length} món ngon</span>
        </div>

        <div class="space-y-2.5 pt-1">
          ${recipes.map(r => `
            <div class="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800/80 space-y-1 hover:border-amber-500/40 transition-colors">
              <div class="flex items-center justify-between">
                <span class="font-bold text-amber-200 text-xs flex items-center gap-1">
                  <span>🍲</span> <span>${r.dish_name}</span>
                </span>
                <span class="text-[9px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono">${r.cooking_method}</span>
              </div>
              <p class="text-[11px] text-slate-300 leading-relaxed">${r.desc}</p>
              <div class="text-[10px] text-slate-400 pt-0.5 flex flex-wrap gap-x-1.5">
                <span class="text-amber-400 font-medium">🌿 Gia vị:</span>
                <span class="text-slate-300">${r.ingredients}</span>
              </div>
              ${r.chef_tip ? `
                <div class="text-[10px] text-emerald-300 pt-1 flex items-start gap-1 bg-emerald-950/20 p-1.5 rounded mt-1 border border-emerald-900/40">
                  <span class="shrink-0 font-bold">💡 Bí quyết đầu bếp:</span>
                  <span class="text-slate-300">${r.chef_tip}</span>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tackle Advice -->
      <div class="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
        <i data-lucide="crosshair" class="w-3.5 h-3.5 text-cyan-400 shrink-0"></i>
        <span>Kỹ thuật: ${s.tackle_technique}</span>
      </div>
      </div>
    </div>
    `;
  }).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

function viewFishRecipes(speciesName) {
  switchTab('species');
  setTimeout(() => {
    // Find matching card
    const targetId = `species-card-${speciesName.replace(/[^a-zA-Z0-9]/g, '-')}`;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-amber-400');
      setTimeout(() => el.classList.remove('ring-2', 'ring-amber-400'), 2500);
    }
  }, 300);
}

// ==========================================
// 4. LEADERBOARD (HALL OF FAME)
// ==========================================
async function loadLeaderboard(speciesFilter = null, lakeFilter = null) {
  const container = document.getElementById('leaderboard-container');
  if (!container) return;

  const spSelect = document.getElementById('leaderboard-species-filter');
  const species = speciesFilter || spSelect?.value || 'all';

  let url = '/api/leaderboard?';
  if (species !== 'all') url += `species=${encodeURIComponent(species)}&`;
  if (lakeFilter && lakeFilter !== 'all') url += `lake=${encodeURIComponent(lakeFilter)}&`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    if (json.success) {
      renderLeaderboard(json.data);
    }
  } catch (err) {
    console.error('Lỗi tải bảng xếp hạng:', err);
  }
}

function renderLeaderboard(catches) {
  const container = document.getElementById('leaderboard-container');
  if (!container) return;

  if (catches.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 bg-slate-900 rounded-2xl border border-slate-800 text-slate-400">
        <i data-lucide="inbox" class="w-12 h-12 mx-auto text-slate-600 mb-2"></i>
        <p class="text-sm font-semibold">Chưa có chiến tích nào được ghi nhận cho bộ lọc này.</p>
        <button onclick="switchTab('verifier')" class="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-xl text-xs font-bold hover:bg-cyan-500">
          Hãy là người đầu tiên đăng tải!
        </button>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  container.innerHTML = catches.map((c, index) => {
    // Rank styling
    let rankBadge = `<span class="font-mono font-black text-slate-400 text-lg">#${index + 1}</span>`;
    if (index === 0) {
      rankBadge = `<span class="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/60 flex items-center justify-center font-black text-base shadow-lg shadow-amber-500/20">🥇 1</span>`;
    } else if (index === 1) {
      rankBadge = `<span class="w-9 h-9 rounded-full bg-slate-400/20 text-slate-300 border border-slate-400/60 flex items-center justify-center font-black text-base">🥈 2</span>`;
    } else if (index === 2) {
      rankBadge = `<span class="w-9 h-9 rounded-full bg-orange-600/20 text-orange-400 border border-orange-600/60 flex items-center justify-center font-black text-base">🥉 3</span>`;
    }

    // AI Status pill
    let aiPill = '';
    if (c.accepted_mode === 'USER_APPROVED') {
      aiPill = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
        <i data-lucide="check-circle-2" class="w-3 h-3"></i> Số liệu cần thủ (Dung sai: ${c.discrepancy_pct}%)
      </span>`;
    } else {
      aiPill = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800 flex items-center gap-1">
        <i data-lucide="cpu" class="w-3 h-3"></i> Đã hiệu chỉnh theo chuẩn AI (Lệch: ${c.discrepancy_pct}%)
      </span>`;
    }

    return `
      <div class="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-slate-700 transition-all">
        
        <!-- Left: Rank & Angler & Photo -->
        <div class="flex items-center gap-4">
          <div class="shrink-0 flex items-center justify-center w-12 text-center">
            ${rankBadge}
          </div>

          <div class="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-700">
            <img src="${c.image_url}" alt="${c.claimed_species}" class="w-full h-full object-cover">
          </div>

          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="text-base font-bold text-white">${c.angler_name}</h3>
              ${aiPill}
            </div>
            <div class="text-xs text-slate-400 flex items-center gap-2 mt-1">
              ${(() => { const fi = getFishImage(c.claimed_species); return fi ? `<img src="${fi}" alt="${c.claimed_species}" class="w-5 h-5 rounded object-contain bg-slate-800"/>` : ''; })()}
              <span class="text-cyan-400 font-semibold">${c.claimed_species}</span>
              <span>•</span>
              <span>📍 ${c.lake_name}</span>
              <span>•</span>
              <span class="text-slate-500">${c.date_caught}</span>
            </div>
            <p class="text-[11px] text-slate-400 mt-1 italic">${c.verification_log}</p>
          </div>
        </div>

        <!-- Right: Weight, Length & AI Hash -->
        <div class="flex items-center gap-4 self-end md:self-center shrink-0">
          <div class="text-right">
            <div class="text-2xl font-black text-cyan-400 font-mono tracking-tight">${c.recorded_weight_kg} <span class="text-sm font-normal text-slate-400">kg</span></div>
            <div class="text-xs text-slate-400 font-mono">Dài: ${c.recorded_length_cm} cm</div>
          </div>

          <div class="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 text-center">
            <span class="text-[9px] uppercase tracking-wider text-slate-400 block font-mono">CERTIFICATE ID</span>
            <span class="font-mono text-xs font-bold text-emerald-400">${c.certificate_hash}</span>
          </div>
        </div>

      </div>
    `;
  }).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

// ==========================================
// 5. FISHVISION AI VERIFICATION ENGINE (STAR FEATURE)
// ==========================================

function selectScenario(scenarioKey) {
  state.currentScenario = scenarioKey;
  const data = state.testScenariosData[scenarioKey];
  if (!data) return;

  // Update scenario cards active class
  const cards = document.querySelectorAll('.scenario-card');
  cards.forEach(c => c.classList.remove('active'));
  const activeCard = Array.from(cards).find(c => c.getAttribute('onclick')?.includes(scenarioKey));
  if (activeCard) activeCard.classList.add('active');

  // Populate form fields
  document.getElementById('input-angler-name').value = data.angler;
  document.getElementById('input-lake-name').value = data.lake;
  document.getElementById('input-species').value = data.species;
  document.getElementById('input-weight').value = data.weight;
  document.getElementById('input-length').value = data.length;

  // Update preview image & reset HUD
  const img = document.getElementById('scanner-preview-img');
  if (img) img.src = data.image;

  document.getElementById('hud-focal-length').innerText = data.focal;
  document.getElementById('hud-est-length').innerText = `${data.length} cm`;
  document.getElementById('hud-est-weight').innerText = `${data.weight} kg`;

  // Clear previous overlays & diagnostic states
  resetScannerHUD();
}

function enableCustomUpload() {
  const box = document.getElementById('custom-upload-box');
  if (box) {
    box.classList.toggle('hidden');
  }
}

function handleUserImageSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    state.customImageBase64 = e.target.result;
    const img = document.getElementById('scanner-preview-img');
    if (img) img.src = state.customImageBase64;
    state.currentScenario = null; // Custom mode

    // Remove active from preset scenario cards
    document.querySelectorAll('.scenario-card').forEach(c => c.classList.remove('active'));
    resetScannerHUD();
  };
  reader.readAsDataURL(file);
}

function resetScannerHUD() {
  const svg = document.getElementById('scanner-overlay-svg');
  if (svg) svg.innerHTML = '';
  document.getElementById('lens-warning-badge')?.classList.add('hidden');
  document.getElementById('scanner-laser')?.classList.add('hidden');
  document.getElementById('action-approved-box')?.classList.add('hidden');
  document.getElementById('scanner-status-text').innerText = 'Sẵn sàng quét...';

  // Reset 4 diagnostic cards
  for (let i = 1; i <= 4; i++) {
    const card = document.getElementById(`diag-step-${i}`);
    if (card) {
      card.className = 'step-card bg-slate-900 rounded-xl border border-slate-800 p-4 transition-all';
      const badge = card.querySelector('.step-badge');
      if (badge) badge.innerHTML = '';
      const subtitle = card.querySelector('.step-subtitle');
      if (subtitle) subtitle.innerText = 'Chờ kích hoạt...';
      const details = card.querySelector('.step-details');
      if (details) {
        details.innerHTML = '';
        details.classList.add('hidden');
      }
    }
  }
}

async function runAIVerification() {
  const submitBtn = document.getElementById('btn-run-ai');
  const laser = document.getElementById('scanner-laser');
  const statusText = document.getElementById('scanner-status-text');

  // Disable button & trigger animations
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i data-lucide="loader" class="w-4 h-4 animate-spin"></i><span>Đang xử lý quét 4 bước...</span>`;
  laser?.classList.remove('hidden');
  statusText.innerText = 'Đang phân tích thấu kính & quang học...';

  if (window.lucide) lucide.createIcons();

  // Draw HUD laser bounding box & landmarks on canvas
  drawScannerOverlays();

  // Prepare payload
  const payload = {
    test_case_id: state.currentScenario,
    angler_name: document.getElementById('input-angler-name').value,
    lake_name: document.getElementById('input-lake-name').value,
    claimed_species: document.getElementById('input-species').value,
    claimed_weight_kg: parseFloat(document.getElementById('input-weight').value),
    claimed_length_cm: parseFloat(document.getElementById('input-length').value),
    image_metadata: {
      focal_length_mm: state.currentScenario === 'case_zoom_05' ? 13.0 : 28.0,
      camera_make: 'Apple iPhone 15 Pro / Sensor Wide 1x'
    }
  };

  try {
    const res = await fetch('/api/verify-catch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    state.lastVerificationResult = result;

    // Execute step-by-step diagnostic presentation with suspense animation
    await animateDiagnosticSteps(result);

  } catch (err) {
    console.error('Lỗi kiểm định AI:', err);
    alert('Có lỗi xảy ra khi kết nối máy chủ AI.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i data-lucide="cpu" class="w-4 h-4"></i><span>KÍCH HOẠT KIỂM ĐỊNH AI (4 BƯỚC)</span>`;
    laser?.classList.add('hidden');
    if (window.lucide) lucide.createIcons();
  }
}

function drawScannerOverlays() {
  const svg = document.getElementById('scanner-overlay-svg');
  if (!svg) return;

  const scenarioData = state.testScenariosData[state.currentScenario] || {
    landmarks: [
      { label: 'Mõm', x: 25, y: 55 },
      { label: 'Vây lưng', x: 50, y: 35 },
      { label: 'Đuôi', x: 80, y: 50 }
    ],
    box: { x: 20, y: 30, w: 65, h: 45 }
  };

  // Draw Bounding Box
  const b = scenarioData.box;
  let svgContent = `
    <rect x="${b.x}%" y="${b.y}%" width="${b.w}%" height="${b.h}%" fill="none" stroke="#00f2fe" stroke-width="2" class="animated-box" />
    <text x="${b.x + 1}%" y="${b.y - 2}%" fill="#00f2fe" font-size="11" font-family="JetBrains Mono" font-weight="bold">TARGET: FISH SPECIES</text>
  `;

  // Draw Landmark Dots
  scenarioData.landmarks.forEach((lm) => {
    svgContent += `
      <circle cx="${lm.x}%" cy="${lm.y}%" r="4" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5" />
      <text x="${lm.x + 2}%" y="${lm.y - 2}%" fill="#e2e8f0" font-size="9" font-family="Plus Jakarta Sans">${lm.label}</text>
    `;
  });

  svg.innerHTML = svgContent;
}

// Animate Step-by-Step Diagnostic with delays
async function animateDiagnosticSteps(result) {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // --- BƯỚC 1 ---
  const step1 = result.step1;
  const s1Card = document.getElementById('diag-step-1');
  const s1Badge = s1Card.querySelector('.step-badge');
  const s1Sub = s1Card.querySelector('.step-subtitle');
  const s1Det = s1Card.querySelector('.step-details');

  await delay(400);
  if (step1.is_authentic) {
    s1Card.className = 'step-card bg-emerald-950/20 rounded-xl border border-emerald-800/80 p-4 transition-all';
    s1Badge.innerHTML = `<span class="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-900 text-emerald-300 border border-emerald-700">✓ HỢP LỆ</span>`;
    s1Sub.innerText = 'Không phát hiện trùng lặp trên mạng. Ảnh chụp từ camera thực.';
    s1Det.classList.remove('hidden');
    s1Det.innerHTML = `
      <div class="text-emerald-400 font-semibold">• Đối chiếu kho ảnh: ${step1.matched_source}</div>
      <div class="text-slate-400">• Tỉ lệ trùng lặp web: <span class="font-mono text-emerald-300">${step1.similarity}%</span> (Ngưỡng an toàn < 15%)</div>
      <div class="text-slate-400">• Cảm biến thiết bị: <span class="text-slate-200">${step1.camera_device}</span></div>
    `;
  } else {
    // REJECTED WEB IMAGE
    s1Card.className = 'step-card bg-red-950/30 rounded-xl border border-red-700 p-4 transition-all';
    s1Badge.innerHTML = `<span class="px-2.5 py-1 text-xs font-bold rounded-lg bg-red-900 text-red-300 border border-red-700">✕ TỪ CHỐI ẢNH MẠNG</span>`;
    s1Sub.innerText = step1.verdict;
    s1Det.classList.remove('hidden');
    s1Det.innerHTML = `
      <div class="text-red-400 font-bold">• Nguồn phát hiện: ${step1.matched_source}</div>
      <div class="text-red-300">• Link gốc: <span class="font-mono text-xs underline">${step1.matched_domain}</span></div>
      <div class="text-slate-400">• Tỉ lệ tương đồng dHash: <span class="font-mono text-red-400 font-bold">${step1.similarity}%</span></div>
      <div class="text-amber-400">• Trạng thái EXIF: ${step1.exif_status}</div>
    `;
    document.getElementById('scanner-status-text').innerText = 'Dừng kiểm định: Phát hiện ảnh mạng.';
    return; // Abort further steps
  }

  // --- BƯỚC 2 ---
  await delay(500);
  const step2 = result.step2;
  const s2Card = document.getElementById('diag-step-2');
  const s2Badge = s2Card.querySelector('.step-badge');
  const s2Sub = s2Card.querySelector('.step-subtitle');
  const s2Det = s2Card.querySelector('.step-details');

  const is05x = step2.lens_distortion.is_ultra_wide_05x;
  if (is05x) {
    document.getElementById('lens-warning-badge')?.classList.remove('hidden');
  }

  s2Card.className = 'step-card bg-slate-900 rounded-xl border border-cyan-800 p-4 transition-all';
  s2Badge.innerHTML = `<span class="px-2.5 py-1 text-xs font-bold rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-700">✓ ĐÃ ĐO ĐẠC</span>`;
  s2Sub.innerText = `AI nhận diện: ${step2.ai_recognized_species} (${step2.biometrics.confidence_score}% độ tin cậy)`;
  s2Det.classList.remove('hidden');
  s2Det.innerHTML = `
    <div class="text-cyan-300">• Phân tích quang học: Tiêu cự <span class="font-mono font-bold">${step2.lens_distortion.focal_length_equivalent_mm} mm</span> (${step2.lens_distortion.lens_model})</div>
    <div class="${is05x ? 'text-amber-400 font-bold' : 'text-slate-400'}">• Tỉ lệ méo góc (Barrel distortion): ${step2.lens_distortion.barrel_distortion_score}</div>
    ${is05x ? `<div class="text-orange-400 font-bold bg-orange-950/40 p-2 rounded-lg border border-orange-800 mt-1">⚠️ ${step2.lens_distortion.warning}. Thuật toán đã bù trừ và khử ảo giác zoom.</div>` : ''}
    <div class="text-emerald-400 font-bold">• Kích thước chuẩn hoá: Chiều dài ${step2.ai_estimated_length_cm} cm | Cân nặng AI tính: ${step2.ai_estimated_weight_kg} kg</div>
    <div class="text-slate-400 text-[10px]">• Công thức ngư học: ${step2.biometrics.growth_formula}</div>
  `;

  // Update HUD scale stats
  document.getElementById('hud-focal-length').innerText = `${step2.lens_distortion.focal_length_equivalent_mm} mm`;
  document.getElementById('hud-est-length').innerText = `${step2.ai_estimated_length_cm} cm`;
  document.getElementById('hud-est-weight').innerText = `${step2.ai_estimated_weight_kg} kg`;

  // --- BƯỚC 3 ---
  await delay(500);
  const step3 = result.step3;
  const s3Card = document.getElementById('diag-step-3');
  const s3Badge = s3Card.querySelector('.step-badge');
  const s3Sub = s3Card.querySelector('.step-subtitle');
  const s3Det = s3Card.querySelector('.step-details');

  const comp = step3.comparison_table;
  s3Card.className = 'step-card bg-slate-900 rounded-xl border border-slate-700 p-4 transition-all';
  s3Badge.innerHTML = `<span class="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-800 text-slate-300 border border-slate-700">ĐỐI CHIẾU</span>`;
  s3Sub.innerText = step3.summary_note;
  s3Det.classList.remove('hidden');
  s3Det.innerHTML = `
    <div class="overflow-x-auto mt-2">
      <table class="w-full text-[11px] text-left border-collapse">
        <thead>
          <tr class="border-b border-slate-800 text-slate-400">
            <th class="py-1">Tiêu chí</th>
            <th class="py-1">Người dùng khai</th>
            <th class="py-1">AI tính toán</th>
            <th class="py-1">Độ lệch</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-slate-800/60">
            <td class="py-1 text-slate-300">Phân loài</td>
            <td class="py-1 text-cyan-300">${comp.species.user_claimed}</td>
            <td class="py-1 text-cyan-300">${comp.species.ai_identified}</td>
            <td class="py-1 text-emerald-400 font-semibold">${comp.species.match ? 'Trùng khớp ✓' : 'Khác biệt ✕'}</td>
          </tr>
          <tr class="border-b border-slate-800/60">
            <td class="py-1 text-slate-300">Chiều dài</td>
            <td class="py-1 font-mono">${comp.length.user_claimed_cm} cm</td>
            <td class="py-1 font-mono">${comp.length.ai_estimated_cm} cm</td>
            <td class="py-1 font-mono text-slate-400">±${comp.length.diff_percent}%</td>
          </tr>
          <tr>
            <td class="py-1 text-slate-300 font-bold">Khối lượng</td>
            <td class="py-1 font-mono font-bold text-amber-300">${comp.weight.user_claimed_kg} kg</td>
            <td class="py-1 font-mono font-bold text-emerald-300">${comp.weight.ai_estimated_kg} kg</td>
            <td class="py-1 font-mono font-bold ${comp.weight.diff_percent <= 15 ? 'text-emerald-400' : 'text-red-400'}">
              ${comp.weight.diff_percent}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  // --- BƯỚC 4: QUYẾT ĐỊNH CUỐI CÙNG ---
  await delay(600);
  const step4 = result.step4;
  const s4Card = document.getElementById('diag-step-4');
  const s4Badge = s4Card.querySelector('.step-badge');
  const s4Sub = s4Card.querySelector('.step-subtitle');
  const s4Det = s4Card.querySelector('.step-details');

  if (step4.status_code === 'APPROVED_USER_DATA') {
    // Mode A: Within tolerance <= 15% -> Accept user data!
    s4Card.className = 'step-card bg-emerald-950/30 rounded-xl border-2 border-emerald-500 p-4 transition-all shadow-lg shadow-emerald-500/10';
    s4Badge.innerHTML = `<span class="px-3 py-1 text-xs font-black rounded-lg bg-emerald-500 text-slate-950 shadow-md">CHẤP THUẬN CẦN THỦ</span>`;
    s4Sub.innerHTML = `<strong class="text-emerald-300">${step4.badge_text}</strong> (Độ lệch ${step4.weight_diff_pct}% ≤ ngưỡng 15%)`;
    s4Det.classList.remove('hidden');
    s4Det.innerHTML = `
      <div class="text-emerald-300 font-semibold">• ${step4.verdict_summary}</div>
      <div class="text-slate-400 text-[11px]">• ${step4.explanation}</div>
      <div class="text-white font-mono font-bold mt-1">GHI NHẬN CHÍNH THỨC: ${step4.final_recorded_weight_kg} kg | ${step4.final_recorded_length_cm} cm</div>
    `;

    // Show approval action box
    document.getElementById('action-approved-box')?.classList.remove('hidden');
    document.getElementById('official-record-text').innerText = `Khối lượng chính thức ghi nhận vào Bảng Xếp Hạng: ${step4.final_recorded_weight_kg} kg (${result.angler_name})`;

  } else {
    // Mode B: Exceeded tolerance > 15% -> Discard user claim, enforce AI estimated weight!
    s4Card.className = 'step-card bg-amber-950/30 rounded-xl border-2 border-amber-500 p-4 transition-all shadow-lg shadow-amber-500/10';
    s4Badge.innerHTML = `<span class="px-3 py-1 text-xs font-black rounded-lg bg-amber-500 text-slate-950 shadow-md">ĐIỀU CHỈNH VỀ CHUẨN AI</span>`;
    s4Sub.innerHTML = `<strong class="text-amber-300">${step4.badge_text}</strong> (Độ lệch ${step4.weight_diff_pct}% > ngưỡng 15%)`;
    s4Det.classList.remove('hidden');
    s4Det.innerHTML = `
      <div class="text-amber-300 font-semibold">• ${step4.verdict_summary}</div>
      <div class="text-slate-400 text-[11px]">• ${step4.explanation}</div>
      <div class="text-amber-400 font-mono font-bold mt-1">GHI NHẬN CHÍNH THỨC (THEO AI): ${step4.final_recorded_weight_kg} kg | ${step4.final_recorded_length_cm} cm</div>
    `;

    // Still allow commitment if user accepts AI adjustment
    document.getElementById('action-approved-box')?.classList.remove('hidden');
    document.getElementById('official-record-text').innerText = `Khối lượng đã hiệu chỉnh ghi nhận vào Bảng Xếp Hạng: ${step4.final_recorded_weight_kg} kg (Theo chuẩn AI)`;
  }

  // Append Culinary Dish Recommendations for this caught fish
  const culinaryDishes = result.final_decision?.culinary_suggestions || [];
  if (culinaryDishes.length > 0) {
    const dishesHtml = `
      <div class="mt-3.5 p-3.5 bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/30 border border-amber-600/50 rounded-xl space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <i data-lucide="utensils" class="w-4 h-4 text-amber-400"></i>
            <span>🍳 Con cá ${result.final_decision.recorded_species} này chế biến món gì ngon nhất?</span>
          </span>
          <span class="text-[10px] bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded shadow-sm">Bếp Cần Thủ</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          ${culinaryDishes.map(d => `
            <div class="bg-slate-950/90 p-2.5 rounded-lg border border-slate-800 space-y-1 hover:border-amber-500/50 transition-colors">
              <div class="text-xs font-bold text-amber-200 flex items-center gap-1">
                <span>🍲</span> <span>${d.dish_name}</span>
              </div>
              <span class="text-[9px] bg-amber-950 text-amber-400 px-1.5 py-0.5 rounded border border-amber-800 font-mono">${d.badge || 'Đặc sản'}</span>
              <p class="text-[10.5px] text-slate-300 leading-relaxed">${d.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    s4Det.innerHTML += dishesHtml;
  }

  document.getElementById('scanner-status-text').innerText = 'Hoàn tất kiểm định.';
  if (window.lucide) lucide.createIcons();
}

// Save catch to official database & leaderboard
async function commitCatchToLeaderboard() {
  if (!state.lastVerificationResult) return;

  const btn = document.getElementById('btn-commit-catch');
  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader" class="w-4 h-4 animate-spin"></i><span>Đang ghi vào sổ kỷ lục...</span>`;
  if (window.lucide) lucide.createIcons();

  const previewImg = document.getElementById('scanner-preview-img');

  const commitPayload = {
    verification_result: state.lastVerificationResult,
    angler_name: document.getElementById('input-angler-name').value,
    lake_name: document.getElementById('input-lake-name').value,
    claimed_species: document.getElementById('input-species').value,
    claimed_weight_kg: parseFloat(document.getElementById('input-weight').value),
    claimed_length_cm: parseFloat(document.getElementById('input-length').value),
    date_caught: new Date().toISOString().split('T')[0],
    image_url: previewImg.src
  };

  try {
    const res = await fetch('/api/submit-catch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commitPayload)
    });
    const json = await res.json();
    if (json.success) {
      alert(`🎉 Chúc mừng! Chiến tích đã được ghi danh vào Bảng Xếp Hạng chính thức với mã chứng nhận: ${json.certificate_hash}`);
      switchTab('leaderboard');
      await loadLeaderboard();
    } else {
      alert(`Không thể lưu: ${json.error}`);
    }
  } catch (err) {
    console.error('Lỗi lưu kỷ lục:', err);
    alert('Lỗi kết nối khi lưu kỷ lục.');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="award" class="w-4 h-4"></i><span>Lưu Vào Bảng Kỷ Lục</span>`;
    if (window.lucide) lucide.createIcons();
  }
}
