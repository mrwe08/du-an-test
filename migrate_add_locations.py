#!/usr/bin/env python3
"""
Migration script: Add google_maps_url column and new fishing locations
"""
import sqlite3
import json
import os

DB_FILE = "/Users/admin/.gemini/antigravity/scratch/fishing-map-app/fishing_app.db"

conn = sqlite3.connect(DB_FILE)
conn.row_factory = sqlite3.Row
c = conn.cursor()

# 1. Add google_maps_url column if not exists
c.execute("PRAGMA table_info(lakes)")
columns = [col[1] for col in c.fetchall()]
if "google_maps_url" not in columns:
    c.execute("ALTER TABLE lakes ADD COLUMN google_maps_url TEXT NOT NULL DEFAULT ''")
    print("✓ Added google_maps_url column to lakes table")
else:
    print("→ google_maps_url column already exists")

# 2. Update existing lakes with Google Maps URLs
existing_updates = {
    "Hồ Suối Hai (Ba Vì)": "https://maps.google.com/?q=21.135,105.352&z=14",
    "Hồ Sông Mây (Trảng Bom)": "https://maps.google.com/?q=10.9856,106.9854&z=14",
    "Hồ Đầm Sen (Quận 11)": "https://maps.google.com/?q=10.7675,106.6372&z=15",
    "Hồ Đồng Xanh - Đồng Nghệ": "https://maps.google.com/?q=15.9928,108.0674&z=14",
    "Hồ Tuy Lai (Mỹ Đức)": "https://maps.google.com/?q=20.738,105.742&z=14",
    "Hồ Tây (West Lake)": "https://maps.google.com/?q=21.0538,105.8239&z=14",
    "Hồ Đồng Đò (Tự nhiên)": "https://maps.google.com/?q=21.3283,105.808&z=14",
    "Hồ Định Công (Tự nhiên)": "https://maps.google.com/?q=20.9856,105.8347&z=15",
    "Hồ Lượng (Tự nhiên)": "https://maps.google.com/?q=21.32,105.78&z=14",
    "Hồ Câu Tam Hiệp (Dịch vụ)": "https://www.google.com/maps/place/H%E1%BB%93+C%C3%A2u+Tam+Hi%E1%BB%87p/@20.9378273,105.7987898,15.38z/data=!4m6!3m5!1s0x3135adfe1013eccb:0x2401f76a7de5261b!8m2!3d20.9365968!4d105.8129401!16s%2Fg%2F11flvccb56?entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D",
    "Hồ Câu Đông Ngàn (Dịch vụ)": "https://maps.google.com/?q=21.1215,105.875&z=15",
    "Hồ Đập Sun (Dịch vụ)": "https://maps.google.com/?q=21.315,105.823&z=14",
    "Hồ Trị An (Vĩnh Cửu)": "https://maps.google.com/?q=11.1392,107.0371&z=13",
    "Hồ Dầu Tiếng": "https://maps.google.com/?q=11.35,106.35&z=13",
    "Hồ Hòa Bình (Sông Đà)": "https://maps.google.com/?q=20.8123,105.3211&z=13",
    "Ngư Trường Quần Đảo Hoàng Sa": "https://maps.google.com/?q=16.5333,112.0333&z=8",
    "Ngư Trường Quần Đảo Trường Sa": "https://maps.google.com/?q=9.5,114.0&z=8",
}

for name, url in existing_updates.items():
    c.execute("UPDATE lakes SET google_maps_url = ? WHERE name = ?", (url, name))
    if c.rowcount > 0:
        print(f"  ✓ Updated Google Maps URL for: {name}")

# 3. Add new fishing locations across Vietnam
new_lakes = [
    # === MIỀN BẮC ===
    {
        "name": "Hồ Núi Cốc (Thái Nguyên)",
        "slug": "ho-nui-coc",
        "lat": 21.5815814, "lng": 105.6969788,
        "province": "Thái Nguyên",
        "lake_type": "Hồ thủy lợi du lịch sinh thái",
        "water_depth_m": 25.0,
        "species_list": json.dumps(["Cá Trắm Đen", "Cá Chép", "Cá Trắm Trắng", "Cá Rô Phi", "Cá Trôi"]),
        "bait_guide": "Mồi ngô non luộc + cám gạo rang thơm + bột tỏi. Cá trắm đen thích mồi ốc bươu nghiền. Dùng phao lông công cá chép ăn rất nhạy.",
        "ticket_price": "Miễn phí (câu tự nhiên) / 100-200K VNĐ (khu dịch vụ)",
        "weather_temp": 24.5, "barometric_pressure_hpa": 1014.2,
        "wind_speed_kmh": 8.5, "fishing_bite_score": 82,
        "pro_tips": "Câu sáng sớm 5h-8h khu vực đảo Cọ. Mùa thu (tháng 9-11) cá trắm đen ăn mồi ốc rất mạnh. Thả mồi dẫn trước 30 phút.",
        "rating": 4.5,
        "image_url": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600",
        "google_maps_url": "https://www.google.com/maps/place/H%E1%BB%93+N%C3%BAi+C%E1%BB%91c/@21.5684375,105.6518467,13z/data=!3m1!4b1!4m6!3m5!1s0x3134dea8853204a9:0x23449a4c113da7c1!8m2!3d21.5815814!4d105.6969788!16s%2Fm%2F0cc905v?entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D"
    },
    {
        "name": "Hồ Thác Bà (Yên Bái)",
        "slug": "ho-thac-ba",
        "lat": 21.7272222, "lng": 105.0213889,
        "province": "Yên Bái",
        "lake_type": "Hồ thủy điện vùng cao Tây Bắc",
        "water_depth_m": 50.0,
        "species_list": json.dumps(["Cá Lăng", "Cá Chép", "Cá Trắm Đen", "Cá Trôi", "Cá Trắm Trắng"]),
        "bait_guide": "Câu cá lăng dùng mồi cá sống nhỏ (cá mương, cá rô) móc lưỡi đôi thả đáy sâu. Cá chép dùng ngô non + bột đậu nành rang.",
        "ticket_price": "Miễn phí (câu bờ) / 150K VNĐ (thuê thuyền)",
        "weather_temp": 22.0, "barometric_pressure_hpa": 1012.5,
        "wind_speed_kmh": 12.0, "fishing_bite_score": 78,
        "pro_tips": "Hồ rộng 23.400 ha, nên thuê thuyền ra các nhánh hồ sâu để câu cá lăng khủng. Mùa đông cá hay tụ ở các vịnh kín gió.",
        "rating": 4.6,
        "image_url": "https://images.unsplash.com/photo-1468245856972-a0333f3f8293?w=600",
        "google_maps_url": "https://www.google.com/maps/place/H%E1%BB%93+Th%C3%A1c+B%C3%A0/@21.726847,105.0130526,14.48z/data=!4m6!3m5!1s0x31335804d006b585:0x2aaf00943b154c4e!8m2!3d21.7272222!4d105.0213889!16s%2Fg%2F121nry42?entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D"
    },
    {
        "name": "Hồ Cấm Sơn (Bắc Giang)",
        "slug": "ho-cam-son",
        "lat": 21.5147, "lng": 106.6292,
        "province": "Bắc Giang",
        "lake_type": "Hồ thủy lợi tự nhiên miền Đông Bắc",
        "water_depth_m": 30.0,
        "species_list": json.dumps(["Cá Trắm Đen", "Cá Chép", "Cá Rô Phi", "Cá Trắm Trắng", "Cá Trôi"]),
        "bait_guide": "Mồi trùn quế + cám gạo cho cá chép. Mồi ốc bươu non cho cá trắm đen. Rau muống non cho cá trắm trắng.",
        "ticket_price": "Miễn phí (câu tự nhiên)",
        "weather_temp": 25.0, "barometric_pressure_hpa": 1013.8,
        "wind_speed_kmh": 7.5, "fishing_bite_score": 75,
        "pro_tips": "Hồ có nhiều cá trắm đen cỡ lớn 5-15kg. Câu ở các nhánh hồ hẹp, cạnh bìa rừng. Mang theo lều vì câu đêm rất hiệu quả.",
        "rating": 4.3,
        "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
        "google_maps_url": "https://maps.google.com/?q=21.5147,106.6292&z=14"
    },
    {
        "name": "Hồ Đại Lải (Vĩnh Phúc)",
        "slug": "ho-dai-lai",
        "lat": 21.3756, "lng": 105.6889,
        "province": "Vĩnh Phúc",
        "lake_type": "Hồ du lịch sinh thái resort",
        "water_depth_m": 15.0,
        "species_list": json.dumps(["Cá Chép", "Cá Rô Phi", "Cá Trôi", "Cá Trắm Trắng"]),
        "bait_guide": "Mồi cám viên nén + ngô non cho cá chép. Cá rô phi thích mồi trùn quế hoặc mồi bột mì trộn tỏi.",
        "ticket_price": "50-100K VNĐ (vé câu cá giải trí)",
        "weather_temp": 26.0, "barometric_pressure_hpa": 1013.5,
        "wind_speed_kmh": 6.0, "fishing_bite_score": 72,
        "pro_tips": "Hồ gần Hà Nội (60km), phù hợp đi câu cuối tuần. Câu khu bờ phía Tây có nhiều cá chép vàng. Nên đến sớm trước 6h.",
        "rating": 4.1,
        "image_url": "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=600",
        "google_maps_url": "https://maps.google.com/?q=21.3756,105.6889&z=14"
    },
    # === MIỀN TRUNG ===
    {
        "name": "Hồ Phú Ninh (Quảng Nam)",
        "slug": "ho-phu-ninh",
        "lat": 15.4725, "lng": 108.4567,
        "province": "Quảng Nam",
        "lake_type": "Hồ thủy lợi lớn miền Trung",
        "water_depth_m": 35.0,
        "species_list": json.dumps(["Cá Chép", "Cá Trắm Đen", "Cá Rô Phi", "Cá Trôi", "Cá Lăng"]),
        "bait_guide": "Mồi trùn quế + tỏi nghiền cho cá chép. Cá lăng dùng mồi tép sống hoặc cá mương. Câu đáy sâu cho cá trắm đen.",
        "ticket_price": "Miễn phí (câu bờ tự nhiên)",
        "weather_temp": 27.5, "barometric_pressure_hpa": 1011.0,
        "wind_speed_kmh": 10.0, "fishing_bite_score": 76,
        "pro_tips": "Hồ rộng 2.300 ha, nhiều cá lăng và trắm đen lớn. Câu khu vực đập chính vào buổi chiều muộn 16h-19h hiệu quả nhất.",
        "rating": 4.4,
        "image_url": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600",
        "google_maps_url": "https://maps.google.com/?q=15.4725,108.4567&z=14"
    },
    {
        "name": "Đầm Lập An (Thừa Thiên Huế)",
        "slug": "dam-lap-an",
        "lat": 16.2256, "lng": 108.0133,
        "province": "Thừa Thiên Huế",
        "lake_type": "Đầm phá nước lợ ven biển",
        "water_depth_m": 5.0,
        "species_list": json.dumps(["Cá Chẽm (Cá Vược)", "Cá Rô Phi", "Cá Quả (Cá Lóc)"]),
        "bait_guide": "Câu cá chẽm dùng mồi tôm sống hoặc mồi giả (lure) spoon bạc. Cá rô phi dùng mồi trùn quế thả nổi.",
        "ticket_price": "Miễn phí (câu tự nhiên ven đầm)",
        "weather_temp": 28.0, "barometric_pressure_hpa": 1010.5,
        "wind_speed_kmh": 14.0, "fishing_bite_score": 70,
        "pro_tips": "Đầm phá nước lợ nên cá chẽm rất nhiều. Câu lúc nước triều lên (4h-7h sáng) là hiệu quả nhất. Mang theo áo mưa vì thời tiết hay thay đổi.",
        "rating": 4.2,
        "image_url": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600",
        "google_maps_url": "https://maps.google.com/?q=16.2256,108.0133&z=14"
    },
    {
        "name": "Hồ Kẻ Gỗ (Hà Tĩnh)",
        "slug": "ho-ke-go",
        "lat": 18.1142, "lng": 106.0583,
        "province": "Hà Tĩnh",
        "lake_type": "Hồ thủy lợi tự nhiên Bắc Trung Bộ",
        "water_depth_m": 28.0,
        "species_list": json.dumps(["Cá Trắm Đen", "Cá Chép", "Cá Trắm Trắng", "Cá Trôi", "Cá Rô Phi"]),
        "bait_guide": "Mồi ngô non luộc + cám viên cho cá chép. Cá trắm đen ở đáy ăn ốc bươu, trùn chỉ. Thả phao nổi cho cá trắm trắng.",
        "ticket_price": "Miễn phí (câu tự nhiên)",
        "weather_temp": 26.0, "barometric_pressure_hpa": 1012.0,
        "wind_speed_kmh": 9.0, "fishing_bite_score": 73,
        "pro_tips": "Khu bảo tồn thiên nhiên, cá tự nhiên rất lớn. Nên xin phép ban quản lý trước. Câu đêm cá trắm đen cắn rất mạnh.",
        "rating": 4.3,
        "image_url": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600",
        "google_maps_url": "https://maps.google.com/?q=18.1142,106.0583&z=14"
    },
    # === MIỀN NAM & TÂY NAM BỘ ===
    {
        "name": "Hồ Búng Bình Thiên (An Giang)",
        "slug": "ho-bung-binh-thien",
        "lat": 10.8217, "lng": 105.0383,
        "province": "An Giang",
        "lake_type": "Hồ nước ngọt tự nhiên Đồng bằng sông Cửu Long",
        "water_depth_m": 8.0,
        "species_list": json.dumps(["Cá Tra (Cá Tra Bò)", "Cá Quả (Cá Lóc)", "Cá Rô Phi", "Cá Trê", "Cá Chép"]),
        "bait_guide": "Mồi cá sống nhỏ (cá linh, cá mương) cho cá lóc. Cá tra dùng mồi bột cám viên. Cá trê thích mồi gan gà hoặc trùn quế.",
        "ticket_price": "Miễn phí (câu tự nhiên ven hồ)",
        "weather_temp": 30.0, "barometric_pressure_hpa": 1009.0,
        "wind_speed_kmh": 5.0, "fishing_bite_score": 80,
        "pro_tips": "Hồ nước ngọt tự nhiên lớn nhất miền Tây. Mùa nước nổi (tháng 8-11) cá lóc, cá trê cực nhiều. Câu bằng cần tay tre truyền thống rất thú vị.",
        "rating": 4.5,
        "image_url": "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600",
        "google_maps_url": "https://maps.google.com/?q=10.8217,105.0383&z=14"
    },
    {
        "name": "Kênh Vĩnh Tế (An Giang - Kiên Giang)",
        "slug": "kenh-vinh-te",
        "lat": 10.4833, "lng": 104.8333,
        "province": "An Giang / Kiên Giang",
        "lake_type": "Kênh đào lịch sử Tây Nam Bộ",
        "water_depth_m": 6.0,
        "species_list": json.dumps(["Cá Quả (Cá Lóc)", "Cá Trê", "Cá Rô Phi", "Cá Tra (Cá Tra Bò)"]),
        "bait_guide": "Mồi nhái hoặc cá sống nhỏ cho cá lóc. Mồi trùn quế hoặc gan gà cho cá trê. Cá rô phi dùng mồi cám bột mì.",
        "ticket_price": "Miễn phí (câu tự do)",
        "weather_temp": 31.0, "barometric_pressure_hpa": 1008.5,
        "wind_speed_kmh": 4.0, "fishing_bite_score": 77,
        "pro_tips": "Kênh dài 87km biên giới Campuchia-Việt Nam. Câu cá lóc giật mồi nhái rất phổ biến. Mùa mưa (tháng 7-10) cá cực kỳ dồi dào.",
        "rating": 4.2,
        "image_url": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600",
        "google_maps_url": "https://maps.google.com/?q=10.4833,104.8333&z=13"
    },
    {
        "name": "Hồ Tuyền Lâm (Đà Lạt)",
        "slug": "ho-tuyen-lam",
        "lat": 11.8975, "lng": 108.4256,
        "province": "Lâm Đồng (Đà Lạt)",
        "lake_type": "Hồ du lịch sinh thái cao nguyên",
        "water_depth_m": 18.0,
        "species_list": json.dumps(["Cá Chép", "Cá Trắm Trắng", "Cá Rô Phi", "Cá Trôi"]),
        "bait_guide": "Mồi ngô non luộc + bột cám cho cá chép. Rau muống non cho cá trắm trắng. Trùn quế cho cá rô phi.",
        "ticket_price": "50K VNĐ (vé vào cổng) + câu tự do",
        "weather_temp": 20.0, "barometric_pressure_hpa": 1015.0,
        "wind_speed_kmh": 10.0, "fishing_bite_score": 68,
        "pro_tips": "Hồ ở độ cao 1.000m nên thời tiết mát mẻ quanh năm. Cá ăn mồi tốt nhất lúc 6h-9h sáng. Cảnh đẹp rất phù hợp câu cá thư giãn.",
        "rating": 4.4,
        "image_url": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600",
        "google_maps_url": "https://maps.google.com/?q=11.8975,108.4256&z=14"
    },
    {
        "name": "Hồ Lắk (Đắk Lắk)",
        "slug": "ho-lak",
        "lat": 12.3833, "lng": 108.1833,
        "province": "Đắk Lắk",
        "lake_type": "Hồ nước ngọt tự nhiên Tây Nguyên",
        "water_depth_m": 12.0,
        "species_list": json.dumps(["Cá Chép", "Cá Trắm Trắng", "Cá Rô Phi", "Cá Quả (Cá Lóc)", "Cá Trê"]),
        "bait_guide": "Mồi ngô non + trùn quế cho cá chép. Mồi nhái cho cá lóc. Mồi gan gà + tỏi cho cá trê. Rau muống cho cá trắm trắng.",
        "ticket_price": "Miễn phí (câu tự nhiên ven hồ)",
        "weather_temp": 24.0, "barometric_pressure_hpa": 1013.0,
        "wind_speed_kmh": 6.5, "fishing_bite_score": 74,
        "pro_tips": "Hồ nước ngọt tự nhiên lớn nhất Tây Nguyên. Phong cảnh tuyệt đẹp với núi rừng bao quanh. Câu cá lóc giật mồi nhái rất thú vị vào sáng sớm.",
        "rating": 4.5,
        "image_url": "https://images.unsplash.com/photo-1500534314170-fe568bc6b1dc?w=600",
        "google_maps_url": "https://maps.google.com/?q=12.3833,108.1833&z=14"
    },
    {
        "name": "Hồ Câu Vạn Phúc (Hà Đông, Hà Nội)",
        "slug": "ho-cau-van-phuc",
        "lat": 20.9683, "lng": 105.7692,
        "province": "Hà Nội",
        "lake_type": "Hồ câu dịch vụ nội thành",
        "water_depth_m": 3.5,
        "species_list": json.dumps(["Cá Chép", "Cá Rô Phi", "Cá Trắm Trắng", "Cá Trôi"]),
        "bait_guide": "Mồi cám viên nén chuyên dụng + bột ngô. Cá chép thích mồi trùn quế + tỏi. Cá rô phi ăn mồi bột mì trộn tép khô.",
        "ticket_price": "100-200K VNĐ/buổi câu",
        "weather_temp": 27.0, "barometric_pressure_hpa": 1013.0,
        "wind_speed_kmh": 5.0, "fishing_bite_score": 70,
        "pro_tips": "Hồ câu dịch vụ gần trung tâm Hà Nội, phù hợp câu buổi tối sau giờ làm. Cá được thả định kỳ nên mật độ cao. Có dịch vụ cho thuê cần câu.",
        "rating": 3.9,
        "image_url": "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600",
        "google_maps_url": "https://maps.google.com/?q=20.9683,105.7692&z=15"
    },
    {
        "name": "Sông Sài Gòn (Khu vực Bình Dương)",
        "slug": "song-sai-gon-binh-duong",
        "lat": 11.0167, "lng": 106.6500,
        "province": "Bình Dương / TP.HCM",
        "lake_type": "Sông tự nhiên đoạn thượng nguồn",
        "water_depth_m": 10.0,
        "species_list": json.dumps(["Cá Chẽm (Cá Vược)", "Cá Quả (Cá Lóc)", "Cá Tra (Cá Tra Bò)", "Cá Trê", "Cá Rô Phi"]),
        "bait_guide": "Mồi tôm sống / mồi giả lure cho cá chẽm. Mồi cá sống nhỏ cho cá lóc. Mồi gan gà + trùn quế cho cá trê.",
        "ticket_price": "Miễn phí (câu tự nhiên ven sông)",
        "weather_temp": 30.0, "barometric_pressure_hpa": 1009.5,
        "wind_speed_kmh": 8.0, "fishing_bite_score": 72,
        "pro_tips": "Câu cá chẽm bằng lure vào lúc nước triều lên rất hiệu quả. Đoạn sông qua Lái Thiêu - Thuận An có nhiều cá lớn. Mang theo đèn pin nếu câu đêm.",
        "rating": 4.0,
        "image_url": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600",
        "google_maps_url": "https://maps.google.com/?q=11.0167,106.65&z=14"
    },
]

# Insert new lakes
inserted = 0
for lake in new_lakes:
    # Check if already exists
    c.execute("SELECT id FROM lakes WHERE slug = ?", (lake["slug"],))
    if c.fetchone():
        print(f"  → Already exists: {lake['name']}")
        continue

    c.execute("""INSERT INTO lakes (name, slug, lat, lng, province, lake_type, water_depth_m,
        species_list, bait_guide, ticket_price, weather_temp, barometric_pressure_hpa,
        wind_speed_kmh, fishing_bite_score, pro_tips, rating, image_url, google_maps_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (lake["name"], lake["slug"], lake["lat"], lake["lng"], lake["province"],
         lake["lake_type"], lake["water_depth_m"], lake["species_list"], lake["bait_guide"],
         lake["ticket_price"], lake["weather_temp"], lake["barometric_pressure_hpa"],
         lake["wind_speed_kmh"], lake["fishing_bite_score"], lake["pro_tips"],
         lake["rating"], lake["image_url"], lake["google_maps_url"]))
    inserted += 1
    print(f"  ✓ Added: {lake['name']}")

conn.commit()
conn.close()

print(f"\n✅ Done! Inserted {inserted} new lakes. Updated {len(existing_updates)} existing lakes with Google Maps URLs.")
