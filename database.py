"""
Database schema and seed data for Fishing Map App with Culinary Dishes
Contains:
- Fishing Lakes with GPS coordinates, fish species, bait recommendations, and real-time fishing index
- Fish Species Guide & Best Baits + CULINARY DISHES (Món ngon từ cá)
- Catches Leaderboard with verified AI status
"""

import sqlite3
import json
import os

DB_FILE = os.path.join(os.path.dirname(__file__), "fishing_app.db")

def get_db():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # Table 1: Fishing Lakes
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS lakes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        slug TEXT UNIQUE,
        lat REAL NOT NULL,
        lng REAL NOT NULL,
        province TEXT NOT NULL,
        lake_type TEXT NOT NULL,
        water_depth_m REAL NOT NULL,
        species_list TEXT NOT NULL,
        bait_guide TEXT NOT NULL,
        ticket_price TEXT NOT NULL,
        weather_temp REAL NOT NULL,
        barometric_pressure_hpa REAL NOT NULL,
        wind_speed_kmh REAL NOT NULL,
        fishing_bite_score INTEGER NOT NULL,
        pro_tips TEXT NOT NULL,
        rating REAL NOT NULL,
        image_url TEXT NOT NULL,
        google_maps_url TEXT NOT NULL DEFAULT ''
    )
    """)

    # Check and add google_maps_url column if table already existed without it
    cursor.execute("PRAGMA table_info(lakes)")
    lake_cols = [col[1] for col in cursor.fetchall()]
    if "google_maps_url" not in lake_cols:
        cursor.execute("ALTER TABLE lakes ADD COLUMN google_maps_url TEXT NOT NULL DEFAULT ''")

    # Table 2: Fish Species with culinary recipes
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS species (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        common_name TEXT NOT NULL,
        scientific_name TEXT NOT NULL,
        family TEXT NOT NULL,
        habitat TEXT NOT NULL,
        water_layer TEXT NOT NULL,
        optimal_pressure_hpa TEXT NOT NULL,
        best_baits TEXT NOT NULL,
        tackle_technique TEXT NOT NULL,
        feeding_peak_hours TEXT NOT NULL,
        allometric_a REAL NOT NULL,
        allometric_b REAL NOT NULL,
        max_record_kg REAL NOT NULL,
        description TEXT NOT NULL,
        culinary_recipes TEXT NOT NULL DEFAULT '[]'
    )
    """)

    # Check and add culinary_recipes column if table already existed without it
    cursor.execute("PRAGMA table_info(species)")
    columns = [col[1] for col in cursor.fetchall()]
    if "culinary_recipes" not in columns:
        cursor.execute("ALTER TABLE species ADD COLUMN culinary_recipes TEXT NOT NULL DEFAULT '[]'")

    # Table 3: Catch Submissions & Leaderboard
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS catches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        angler_name TEXT NOT NULL,
        claimed_species TEXT NOT NULL,
        claimed_weight_kg REAL NOT NULL,
        claimed_length_cm REAL NOT NULL,
        recorded_weight_kg REAL NOT NULL,
        recorded_length_cm REAL NOT NULL,
        lake_name TEXT NOT NULL,
        lake_id INTEGER,
        date_caught TEXT NOT NULL,
        image_url TEXT NOT NULL,
        ai_verified INTEGER NOT NULL DEFAULT 1,
        verification_status TEXT NOT NULL,
        accepted_mode TEXT NOT NULL,
        discrepancy_pct REAL NOT NULL,
        lens_distortion_detected INTEGER NOT NULL DEFAULT 0,
        certificate_hash TEXT NOT NULL,
        verification_log TEXT NOT NULL
    )
    """)

    conn.commit()

    # Seed or re-seed species data with culinary recipes
    cursor.execute("SELECT COUNT(*) FROM species")
    count = cursor.fetchone()[0]
    if count == 0:
        seed_species(cursor)
    else:
        # Check if first species has culinary recipes populated
        cursor.execute("SELECT culinary_recipes FROM species LIMIT 1")
        val = cursor.fetchone()[0]
        if val == '[]' or not val:
            cursor.execute("DELETE FROM species")
            seed_species(cursor)

    cursor.execute("SELECT COUNT(*) FROM lakes")
    if cursor.fetchone()[0] == 0:
        seed_lakes(cursor)

    conn.commit()
    conn.close()

def seed_lakes(cursor):
    lakes_data = [
        (
            "Hồ Suối Hai (Ba Vì)",
            "ho-suoi-hai",
            21.135,
            105.352,
            "Hà Nội",
            "Hồ tự nhiên chân núi Ba Vì",
            6.0,
            json.dumps(["C\u00e1 Tr\u1eafm \u0110en", "C\u00e1 Ch\u00e9p Gi\u00f2n", "C\u00e1 M\u00e8 Hoa", "C\u00e1 Ng\u1ea1nh"], ensure_ascii=False),
            "Ốc bươu ủ xốt tỏi ớt men rượu; Thính mè hạt cải rang thơm phức xả lửng.",
            "200.000 VNĐ / ngày câu lục & đài",
            23.5,
            1013.0,
            9.0,
            89,
            "Thường xuyên có các pha đóng trắm đen trên 15kg. Cần chuẩn bị dây cước tối thiểu trục 5.0, thẻo 4.0 chịu tải.",
            4.7,
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop",
            "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+Su%E1%BB%91i+Hai%2C+Ba+V%C3%AC%2C+H%C3%A0+N%E1%BB%99i"
        ),
        (
            "Hồ Sông Mây (Trảng Bom)",
            "ho-song-may",
            10.9856,
            106.9854,
            "Đồng Nai",
            "Hồ đập bán hoang dã",
            5.5,
            json.dumps(["C\u00e1 Tra B\u00f2", "C\u00e1 Chim Tr\u1eafng", "C\u00e1 L\u00f3c B\u00f4ng", "C\u00e1 Tr\u00f4i"], ensure_ascii=False),
            "Mồi chuối tây chín rục ủ mật mía, lòng gà tanh hoặc cám cá tra D1 câu chùm nho.",
            "100.000 VNĐ / ngày",
            28.5,
            1010.2,
            11.0,
            82,
            "Cá chim và cá tra ở đây kéo cước cực rát, cần dùng thẻo cáp chống răng cắt khi câu cá chim.",
            4.5,
            "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop",
            "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+S%C3%B4ng+M%C3%A2y%2C+Tr%E1%BA%A3ng+Bom%2C+%C4%90%E1%BB%93ng+Nai"
        ),
        (
            "Hồ Đầm Sen (Quận 11)",
            "ho-dam-sen",
            10.7675,
            106.6372,
            "TP. Hồ Chí Minh",
            "Hồ dịch vụ thể thao giải trí",
            2.8,
            json.dumps(["C\u00e1 Tra", "C\u00e1 Chim", "C\u00e1 Ch\u00e9p", "C\u00e1 Tr\u00f4i \u1ea4n \u0110\u1ed9"], ensure_ascii=False),
            "Bánh mì gối xay nhỏ bóp cốt dừa sữa đặc + vani; Cám tanh chuyên dụng câu đài.",
            "180.000 VNĐ / 4 tiếng",
            31.0,
            1007.5,
            6.0,
            75,
            "Thích hợp giải trí cuối tuần gia đình, cá ăn dạn vào buổi sáng mát từ 7h - 10h.",
            4.4,
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop",
            "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+vi%C3%AAn+%C4%90%E1%BA%A7m+Sen%2C+S%E1%BB%91+3+H%C3%B2a+B%C3%ACnh%2C+Ph%C6%B0%E1%BB%9Dng+3%2C+Qu%E1%BA%ADn+11%2C+TP.+H%E1%BB%93+Ch%C3%AD+Minh"
        ),
        (
            "Hồ Đồng Xanh - Đồng Nghệ",
            "ho-dong-xanh",
            15.9928,
            108.0674,
            "Đà Nẵng",
            "Hồ cảnh quan miền Trung",
            6.2,
            json.dumps(["C\u00e1 Ch\u1ebdm", "C\u00e1 Qu\u1ea3", "C\u00e1 Ch\u00e9p", "C\u00e1 Th\u00e1t L\u00e1t"], ensure_ascii=False),
            "Mồi tôm đồng nhấp mép cỏ; Lure cá sắt vibrator đánh tầng đáy rãnh nước.",
            "50.000 VNĐ / vé vào cổng",
            27.0,
            1011.0,
            15.0,
            81,
            "Vùng giáp ranh chân núi nước rất trong, cần đi dây fluorocarbon tàng hình để tránh cá nhát cước.",
            4.6,
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop",
            "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+%C4%90%E1%BB%93ng+Xanh+-+%C4%90%E1%BB%93ng+Ngh%E1%BB%87%2C+H%C3%B2a+Vang%2C+%C4%90%C3%A0+N%E1%BA%B5ng"
        ),
        (
            "Hồ Tuy Lai (Mỹ Đức)",
            "ho-tuy-lai",
            20.738,
            105.742,
            "Hà Nội",
            "Quần thể hồ ngập nước núi đá",
            4.5,
            json.dumps(["C\u00e1 Tr\u1eafm C\u1ecf", "C\u00e1 Ch\u00e9p", "C\u00e1 L\u00f3c T\u1ef1 Nhi\u00ean", "C\u00e1 Di\u1ebfc"], ensure_ascii=False),
            "Ngô nếp non luộc sữa đậu nành; Mồi trùn chỉ câu diếc củ.",
            "120.000 VNĐ / ngày",
            24.0,
            1013.5,
            7.8,
            86,
            "Phong cảnh non nước hữu tình, đàn trắm cỏ thường đi ăn mép lau sậy vào tầm sáng sớm.",
            4.7,
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop",
            "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+Tuy+Lai%2C+M%E1%BB%B9+%C4%90%E1%BB%A9c%2C+H%C3%A0+N%E1%BB%99i"
        ),
        (
            "Hồ Tây (West Lake)",
            "ho-tay",
            21.0538,
            105.8239,
            "Hà Nội",
            "Hồ tự nhiên đô thị",
            3.2,
            json.dumps(["C\u00e1 Tr\u1eafm \u0110en", "C\u00e1 Ch\u00e9p", "C\u00e1 Tr\u1eafm C\u1ecf", "C\u00e1 R\u00f4 Phi", "C\u00e1 M\u00e8"], ensure_ascii=False),
            "Ốc vặn ủ trứng vịt lộn + gạo rang (săn trắm đen); Ngô ngọt ủ chua thơm hoặc cám ngô rang mật ong (săn chép cụ).",
            "Miễn phí (Khu vực mở) / Vé câu đài một số mỏm 100k/ngày",
            24.5,
            1012.8,
            12.0,
            88,
            "Câu tầm chiều muộn hoặc đêm khuya (21h - 2h sáng). Chọn các hốc sen cũ hoặc bờ kè rêu nơi cá chép thường vào ủi mồi.",
            4.7,
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
            "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+T%C3%A2y%2C+T%C3%A2y+H%E1%BB%93%2C+H%C3%A0+N%E1%BB%99i"
        ),
        (
            "Hồ Hàm Lợn (Suối Bàu, Sóc Sơn)",
            "ho-ham-lon",
            21.3283,
            105.808,
            "Hà Nội",
            "Hồ thủy lợi tự nhiên thung lũng",
            7.5,
            json.dumps(["C\u00e1 Tr\u1eafm \u0110en", "C\u00e1 Ch\u00e9p", "C\u00e1 Tr\u1eafm Tr\u1eafng", "C\u00e1 Tr\u00f4i", "C\u00e1 R\u00f4 Phi", "C\u00e1 L\u0103ng"], ensure_ascii=False),
            "Mồi câu đài: Cám tanh vẩy mực + tơ nhện. Mồi săn hàng khủng: Ốc sống ủ hoa hồi, đập vỡ 30% xả ổ.",
            "150.000 VNĐ / ca 8 tiếng (Bán tự nhiên sinh thái)",
            22.0,
            1014.2,
            8.5,
            92,
            "Nước rất sâu và lạnh, dùng thẻo dài từ 1.8m - 2.5m, xả ổ đón đầu luồng cá chạy dọc triền đồi thông.",
            4.9,
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop",
            "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+H%C3%A0m+L%E1%BB%A3n%2C+S%C3%B3c+S%C6%A1n%2C+H%C3%A0+N%E1%BB%99i"
        ),
        (
            "Hồ Định Công (Tự nhiên)",
            "ho-dinh-cong",
            20.9856,
            105.8347,
            "Hà Nội",
            "Hồ tự nhiên đô thị",
            3.5,
            json.dumps(["C\u00e1 R\u00f4 Phi", "C\u00e1 Ch\u00e9p", "C\u00e1 Tr\u00f4i", "C\u00e1 Tr\u00ea", "C\u00e1 M\u00e8"], ensure_ascii=False),
            "Cám tanh tôm xay nhuyễn + bột đậu xanh rang (săn rô phi cụ); Bánh mì ngâm sữa bóp nhuyễn câu cá chép.",
            "Miễn phí bờ mở / 50.000 VNĐ vé điểm dịch vụ bờ đông",
            25.0,
            1012.0,
            10.0,
            86,
            "Hồ nước rộng nhiều bèo tây và rêu bám bờ kè. Buông cần lúc 6h sáng hoặc chiều muộn cá rô phi và trôi cắn liên tục.",
            4.6,
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
            "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+%C4%90%E1%BB%8Bnh+C%C3%B4ng%2C+Ho%C3%A0ng+Mai%2C+H%C3%A0+N%E1%BB%99i"
        ),
        (
            "Hồ Đồng Đò (Sóc Sơn)",
            "ho-dong-do-soc-son",
            21.3141865,
            105.772304,
            "Hà Nội",
            "Hồ thủy lợi tự nhiên thung lũng",
            6.8,
            json.dumps(["C\u00e1 Tr\u1eafm Tr\u1eafng", "C\u00e1 Tr\u00f4i", "C\u00e1 Ch\u00e9p", "C\u00e1 R\u00f4 Phi", "C\u00e1 Tr\u00ea"], ensure_ascii=False),
            "Lá sắn non vò nát + ngô ủ mầm bia (săn trắm trắng); Cám thơm mộc câu trôi củ.",
            "Miễn phí / 100.000 VNĐ vé giữ xe cắm trại câu đêm",
            23.5,
            1013.8,
            8.0,
            90,
            "Lòng hồ thung lũng nước sâu mát lạnh, đàn trắm trắng tự nhiên bơi lơ lửng tầng nước 1.5m - 2m ăn mồi rất bạo.",
            4.8,
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop",
            "https://www.google.com/maps/place/H%E1%BB%93+%C4%90%E1%BB%93ng+%C4%90%C3%B2/@21.3147491,105.7723331,18.01z/data=!4m6!3m5!1s0x3134e3f28d5d1ea5:0x1f7a24791e083d0c!8m2!3d21.3141865!4d105.772304!16s%2Fg%2F11tss25rc7?entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D"
        ),
        (
            "Hồ Câu Tam Hiệp (Dịch vụ)",
            "ho-cau-tam-hiep",
            20.9365968,
            105.8129401,
            "Hà Nội",
            "Hồ câu dịch vụ chuyên nghiệp",
            2.6,
            json.dumps(["C\u00e1 Tr\u1eafm \u0110en", "C\u00e1 Ch\u00e9p", "C\u00e1 Tr\u00f4i", "C\u00e1 R\u00f4 Phi", "C\u00e1 Tr\u00ea"], ensure_ascii=False),
            "Ốc vặn ủ men sống, cám D1 tanh thơm, mồi tơ nhện kết dính hạt đài; mồi giun đỏ câu cá trê.",
            "200.000 VNĐ / ca 4 tiếng (Thả cá định kỳ thứ 4 & thứ 7)",
            26.0,
            1011.5,
            9.0,
            94,
            "Hồ câu đài săn hàng nổi tiếng Thanh Trì. Cần thủ rải ổ ốc gọn để gom cá trắm đen vào ổ nhanh, dùng phao ngày đêm câu ca tối.",
            4.9,
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop",
            "https://www.google.com/maps/place/H%E1%BB%93+C%C3%A2u+Tam+Hi%E1%BB%87p/@20.9378273,105.7987898,15.38z/data=!4m6!3m5!1s0x3135adfe1013eccb:0x2401f76a7de5261b!8m2!3d20.9365968!4d105.8129401!16s%2Fg%2F11flvccb56?entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D"
        ),
        (
            "Hồ Câu Đông Ngàn (Dịch vụ)",
            "ho-cau-dong-ngan",
            21.1215,
            105.875,
            "Hà Nội",
            "Hồ câu dịch vụ săn hàng",
            3.0,
            json.dumps(["C\u00e1 Tr\u1eafm \u0110en", "C\u00e1 Tr\u1eafm Tr\u1eafng", "C\u00e1 Ch\u00e9p Gi\u00f2n", "C\u00e1 R\u00f4 Phi"], ensure_ascii=False),
            "Ốc khỏe đập dập 20% xả ổ, ngô ngọt ủ sữa non câu trắm trắng, cám thơm thảo mộc.",
            "250.000 VNĐ / ca 6 tiếng (Có giải thưởng cá khủng nhất tuần)",
            25.5,
            1012.2,
            11.0,
            93,
            "Bè nổi giữa hồ câu đêm cực mát, mật độ cá củ trắm đen 8 - 15kg thả dồi dào. Thẻo cước tối thiểu 4.0 chống nổ trục.",
            4.8,
            "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=800&auto=format&fit=crop",
            "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+C%C3%A2u+%C4%90%C3%B4ng+Ng%C3%A0n%2C+%C4%90%C3%B4ng+Anh%2C+H%C3%A0+N%E1%BB%99i"
        ),
        (
            "Hồ Đập Sun (Dịch vụ)",
            "ho-dap-sun",
            21.315,
            105.823,
            "Hà Nội",
            "Hồ đập dịch vụ sinh thái",
            4.8,
            json.dumps(["C\u00e1 Tr\u00ea", "C\u00e1 Tr\u1eafm Tr\u1eafng", "C\u00e1 Tr\u00f4i", "C\u00e1 R\u00f4 Phi", "C\u00e1 Tr\u1eafm \u0110en"], ensure_ascii=False),
            "Gan lợn ủ tanh trộn bột bắp (săn trê củ); Ngô ủ bia hạt mềm câu trắm trắng.",
            "180.000 VNĐ / ca 5 tiếng",
            22.8,
            1014.0,
            7.0,
            91,
            "Khu vực chân đập nước sâu tụ nhiều trê lai và trôi củ. Câu ngâm đêm cá cắn rực lửa, không gian núi rừng thoáng đãng.",
            4.7,
            "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&auto=format&fit=crop",
            "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+%C4%90%E1%BA%ADp+Sun%2C+Minh+Tr%C3%AD%2C+S%C3%B3c+S%C6%A1n%2C+H%C3%A0+N%E1%BB%99i"
        ),
        (
            "Hồ Trị An (Vĩnh Cửu)",
            "ho-tri-an",
            11.1392,
            107.0371,
            "Đồng Nai",
            "Lòng hồ thủy điện khổng lồ",
            12.0,
            json.dumps(["C\u00e1 Ho\u00e0ng \u0110\u1ebf (Peacock Bass)", "C\u00e1 L\u0103ng V\u00e0ng", "C\u00e1 L\u00f3c", "C\u00e1 Ch\u1ebdm", "C\u00e1 Tra"], ensure_ascii=False),
            "Câu lure: Nhái hơi nhảy mặt nước, Minnow lặn 1.2m màu xanh dạ quang. Câu ngâm: Dế cơm, tép sông tươi, gan bò.",
            "Miễn phí (Thuyền đò chở ra đảo: 200.000 - 300.000 VNĐ)",
            29.0,
            1009.5,
            14.2,
            85,
            "Thiên đường câu Lure cá Hoàng Đế. Đi thuyền rà theo các bụi cây chìm, gộp đá lúc 6h - 8h sáng.",
            4.8,
            "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=800&auto=format&fit=crop",
            "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+Tr%E1%BB%8B+An%2C+V%C4%A9nh+C%E1%BB%ADu%2C+%C4%90%E1%BB%93ng+Nai"
        ),
        (
            "Hồ Dầu Tiếng",
            "ho-dau-tieng",
            11.35,
            106.35,
            "Tây Ninh",
            "Hồ thủy lợi lớn nhất ĐNA",
            9.0,
            json.dumps(["C\u00e1 Tra", "C\u00e1 L\u0103ng", "C\u00e1 Tr\u1eafm C\u1ecf", "C\u00e1 Th\u00e1t L\u00e1t", "C\u00e1 R\u00f4 Phi"], ensure_ascii=False),
            "Mồi bún thiu ủ phô mai con bò cười + cốt dừa (chuyên trị cá tra cụ); Mồi tôm sống nhấp chân đập.",
            "Miễn phí (Thuê ca-nô/thuyền câu đêm: 400.000 VNĐ)",
            30.2,
            1008.0,
            16.0,
            78,
            "Khu vực chân đập chính và ngã ba suối cá tích tụ bầy đàn lớn, nên sử dụng cần bạo lực tải chì nặng.",
            4.6,
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop",
            "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+D%E1%BA%A7u+Ti%E1%BA%BFng%2C+%C4%90%E1%BB%8Bnh+An%2C+D%E1%BA%A7u+Ti%E1%BA%BFng%2C+B%C3%ACnh+D%C6%B0%C6%A1ng"
        ),
        (
            "Hồ Hòa Bình (Sông Đà)",
            "ho-hoa-binh",
            20.8123,
            105.3211,
            "Hòa Bình",
            "Hồ thủy điện vùng cao",
            25.0,
            json.dumps(["C\u00e1 Tr\u1eafm \u0110en Th\u1ee7y Qu\u00e1i", "C\u00e1 Chi\u00ean S\u00f4ng \u0110\u00e0", "C\u00e1 L\u0103ng Ch\u1ea5m", "C\u00e1 Nheo"], ensure_ascii=False),
            "Mồi sống: Chạch bùn sống, giun đất khổng lồ (săn cá lăng/chiên); Ốc núi sông Đà giã dập.",
            "Miễn phí dọc mép hồ / Thuê bè nổi cắm câu 300k/đêm",
            21.0,
            1015.5,
            10.5,
            94,
            "Nước sâu thẳm, dòng chảy ngầm hiểm trở. Đây là nơi xuất hiện các kỷ lục trắm đen 30-40kg.",
            5.0,
            "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&auto=format&fit=crop",
            "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+Th%E1%BB%A7y+%C4%90i%E1%BB%87n+H%C3%B2a+B%C3%ACnh%2C+H%C3%B2a+B%C3%ACnh"
        ),
        (
            "Ngư Trường Quần Đảo Hoàng Sa",
            "ngu-truong-hoang-sa",
            16.5333,
            112.0333,
            "TP. Đà Nẵng (Việt Nam)",
            "Ngư trường biển đảo chủ quyền Việt Nam",
            45.0,
            json.dumps(["C\u00e1 Ng\u1eeb \u0110\u1ea1i D\u01b0\u01a1ng", "C\u00e1 M\u00fa \u0110\u1ecf San H\u00f4", "C\u00e1 Thu B\u00e8", "C\u00e1 Cam Bi\u1ec3n S\u00e2u", "T\u00f4m H\u00f9m"], ensure_ascii=False),
            "Mồi câu Jigging biển sâu (150g - 300g), mồi Popper mặt nước màu cá chuồn, mồi mực tươi sống câu ngâm đáy rạn san hô.",
            "Ngư trường truyền thống chủ quyền của ngư dân Việt Nam",
            28.0,
            1013.5,
            18.0,
            96,
            "Vùng biển đảo thiêng liêng của Tổ quốc Việt Nam. Đáy biển nhiều rạn san hô trù phú, là nơi săn các loài cá ngừ đại dương và cá mú đỏ khổng lồ trên 30kg.",
            5.0,
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop",
            "https://www.google.com/maps/search/?api=1&query=Qu%E1%BA%A7n+%C4%91%E1%BA%A3o+Ho%C3%A0ng+Sa%2C+TP.+%C4%90%C3%A0+N%E1%BA%B5ng%2C+Vi%E1%BB%87t+Nam"
        ),
        (
            "Ngư Trường Quần Đảo Trường Sa",
            "ngu-truong-truong-sa",
            9.5,
            114.0,
            "Tỉnh Khánh Hòa (Việt Nam)",
            "Ngư trường biển đảo chủ quyền Việt Nam",
            60.0,
            json.dumps(["C\u00e1 Ng\u1eeb V\u00e2y V\u00e0ng", "C\u00e1 M\u00fa C\u1ecdp", "C\u00e1 B\u00e8 Trang", "C\u00e1 C\u1edd G\u00f2n", "C\u00e1 Thu Bi\u1ec3n"], ensure_ascii=False),
            "Mồi câu Lure biển khơi: Mồi cá giả Minnow chống chịu lực cắn lớn, mồi mực lá sống nhử tầng sâu 40m - 70m.",
            "Ngư trường truyền thống chủ quyền của ngư dân Việt Nam",
            29.5,
            1012.0,
            20.0,
            98,
            "Quần đảo tiền tiêu thiêng liêng của Tổ quốc Việt Nam. Luồng cá ngừ vây vàng di cư cực lớn, dòng hải lưu giàu dinh dưỡng thu hút các loài cá săn mồi kích thước khủng.",
            5.0,
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
            "https://www.google.com/maps/search/?api=1&query=Qu%E1%BA%A7n+%C4%91%E1%BA%A3o+Tr%C6%B0%E1%BB%9Dng+Sa%2C+T%E1%BB%89nh+Kh%C3%A1nh+H%C3%B2a%2C+Vi%E1%BB%87t+Nam"
        ),
        (
            "Hồ Núi Cốc (Thái Nguyên)",
            "ho-nui-coc",
            21.5815814,
            105.6969788,
            "Thái Nguyên",
            "Hồ thủy lợi du lịch sinh thái",
            25.0,
            json.dumps(["C\u00e1 Tr\u1eafm \u0110en", "C\u00e1 Ch\u00e9p", "C\u00e1 Tr\u1eafm Tr\u1eafng", "C\u00e1 R\u00f4 Phi", "C\u00e1 Tr\u00f4i"], ensure_ascii=False),
            "Mồi ngô non luộc + cám gạo rang thơm + bột tỏi. Cá trắm đen thích mồi ốc bươu nghiền. Dùng phao lông công cá chép ăn rất nhạy.",
            "Miễn phí (câu tự nhiên) / 100-200K VNĐ (khu dịch vụ)",
            24.5,
            1014.2,
            8.5,
            82,
            "Câu sáng sớm 5h-8h khu vực đảo Cọ. Mùa thu (tháng 9-11) cá trắm đen ăn mồi ốc rất mạnh. Thả mồi dẫn trước 30 phút.",
            4.5,
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600",
            "https://www.google.com/maps/place/H%E1%BB%93+N%C3%BAi+C%E1%BB%91c/@21.5684375,105.6518467,13z/data=!3m1!4b1!4m6!3m5!1s0x3134dea8853204a9:0x23449a4c113da7c1!8m2!3d21.5815814!4d105.6969788!16s%2Fm%2F0cc905v?entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D"
        ),
        (
            "Hồ Thác Bà (Yên Bái)",
            "ho-thac-ba",
            21.7272222,
            105.0213889,
            "Yên Bái",
            "Hồ thủy điện vùng cao Tây Bắc",
            50.0,
            json.dumps(["C\u00e1 L\u0103ng", "C\u00e1 Ch\u00e9p", "C\u00e1 Tr\u1eafm \u0110en", "C\u00e1 Tr\u00f4i", "C\u00e1 Tr\u1eafm Tr\u1eafng"], ensure_ascii=False),
            "Câu cá lăng dùng mồi cá sống nhỏ (cá mương, cá rô) móc lưỡi đôi thả đáy sâu. Cá chép dùng ngô non + bột đậu nành rang.",
            "Miễn phí (câu bờ) / 150K VNĐ (thuê thuyền)",
            22.0,
            1012.5,
            12.0,
            78,
            "Hồ rộng 23.400 ha, nên thuê thuyền ra các nhánh hồ sâu để câu cá lăng khủng. Mùa đông cá hay tụ ở các vịnh kín gió.",
            4.6,
            "https://images.unsplash.com/photo-1468245856972-a0333f3f8293?w=600",
            "https://www.google.com/maps/place/H%E1%BB%93+Th%C3%A1c+B%C3%A0/@21.726847,105.0130526,14.48z/data=!4m6!3m5!1s0x31335804d006b585:0x2aaf00943b154c4e!8m2!3d21.7272222!4d105.0213889!16s%2Fg%2F121nry42?entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D"
        ),
        (
            "Hồ Cấm Sơn (Bắc Giang)",
            "ho-cam-son",
            21.5360888,
            106.5672462,
            "Bắc Giang",
            "Hồ thủy lợi tự nhiên miền Đông Bắc",
            30.0,
            json.dumps(["C\u00e1 Tr\u1eafm \u0110en", "C\u00e1 Ch\u00e9p", "C\u00e1 R\u00f4 Phi", "C\u00e1 Tr\u1eafm Tr\u1eafng", "C\u00e1 Tr\u00f4i"], ensure_ascii=False),
            "Mồi trùn quế + cám gạo cho cá chép. Mồi ốc bươu non cho cá trắm đen. Rau muống non cho cá trắm trắng.",
            "Miễn phí (câu tự nhiên)",
            25.0,
            1013.8,
            7.5,
            75,
            "Hồ có nhiều cá trắm đen cỡ lớn 5-15kg. Câu ở các nhánh hồ hẹp, cạnh bìa rừng. Mang theo lều vì câu đêm rất hiệu quả.",
            4.3,
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
            "https://www.google.com/maps/place/H%E1%BB%93+C%E1%BA%A5m+S%C6%A1n/@21.5352815,106.5285907,13z/data=!3m1!4b1!4m6!3m5!1s0x314aa70790e84a57:0xffc5df7d86a8a0de!8m2!3d21.5360888!4d106.5672462!16s%2Fm%2F0cc61b2?entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D"
        ),
        (
            "Hồ Đại Lải (Vĩnh Phúc)",
            "ho-dai-lai",
            21.3189269,
            105.7145801,
            "Vĩnh Phúc",
            "Hồ du lịch sinh thái resort",
            15.0,
            json.dumps(["C\u00e1 Ch\u00e9p", "C\u00e1 R\u00f4 Phi", "C\u00e1 Tr\u00f4i", "C\u00e1 Tr\u1eafm Tr\u1eafng"], ensure_ascii=False),
            "Mồi cám viên nén + ngô non cho cá chép. Cá rô phi thích mồi trùn quế hoặc mồi bột mì trộn tỏi.",
            "50-100K VNĐ (vé câu cá giải trí)",
            26.0,
            1013.5,
            6.0,
            72,
            "Hồ gần Hà Nội (60km), phù hợp đi câu cuối tuần. Câu khu bờ phía Tây có nhiều cá chép vàng. Nên đến sớm trước 6h.",
            4.1,
            "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=600",
            "https://www.google.com/maps/place/H%E1%BB%93+%C4%90%E1%BA%A1i+L%E1%BA%A3i/@21.3184838,105.7047125,15.9z/data=!4m6!3m5!1s0x3134e33e55555555:0xeef2ddebb1cf45a!8m2!3d21.3189269!4d105.7145801!16s%2Fg%2F120w3m6j?entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D"
        ),
        (
            "Hồ Phú Ninh (Quảng Nam)",
            "ho-phu-ninh",
            15.4725,
            108.4567,
            "Quảng Nam",
            "Hồ thủy lợi lớn miền Trung",
            35.0,
            json.dumps(["C\u00e1 Ch\u00e9p", "C\u00e1 Tr\u1eafm \u0110en", "C\u00e1 R\u00f4 Phi", "C\u00e1 Tr\u00f4i", "C\u00e1 L\u0103ng"], ensure_ascii=False),
            "Mồi trùn quế + tỏi nghiền cho cá chép. Cá lăng dùng mồi tép sống hoặc cá mương. Câu đáy sâu cho cá trắm đen.",
            "Miễn phí (câu bờ tự nhiên)",
            27.5,
            1011.0,
            10.0,
            76,
            "Hồ rộng 2.300 ha, nhiều cá lăng và trắm đen lớn. Câu khu vực đập chính vào buổi chiều muộn 16h-19h hiệu quả nhất.",
            4.4,
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600",
            "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+Ph%C3%BA+Ninh%2C+N%C3%BAi+Th%C3%A0nh%2C+Qu%E1%BA%A3ng+Nam"
        ),
        (
            "Đầm Lập An (Thừa Thiên Huế)",
            "dam-lap-an",
            16.2256,
            108.0133,
            "Thừa Thiên Huế",
            "Đầm phá nước lợ ven biển",
            5.0,
            json.dumps(["C\u00e1 Ch\u1ebdm (C\u00e1 V\u01b0\u1ee3c)", "C\u00e1 R\u00f4 Phi", "C\u00e1 Qu\u1ea3 (C\u00e1 L\u00f3c)"], ensure_ascii=False),
            "Câu cá chẽm dùng mồi tôm sống hoặc mồi giả (lure) spoon bạc. Cá rô phi dùng mồi trùn quế thả nổi.",
            "Miễn phí (câu tự nhiên ven đầm)",
            28.0,
            1010.5,
            14.0,
            70,
            "Đầm phá nước lợ nên cá chẽm rất nhiều. Câu lúc nước triều lên (4h-7h sáng) là hiệu quả nhất. Mang theo áo mưa vì thời tiết hay thay đổi.",
            4.2,
            "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600",
            "https://www.google.com/maps/search/?api=1&query=%C4%90%E1%BA%A7m+L%E1%BA%ADp+An%2C+L%C4%83ng+C%C3%B4%2C+Ph%C3%BA+L%E1%BB%99c%2C+Th%E1%BB%ABa+Thi%C3%AAn+Hu%E1%BA%BF"
        ),
        (
            "Hồ Kẻ Gỗ (Hà Tĩnh)",
            "ho-ke-go",
            18.1142,
            106.0583,
            "Hà Tĩnh",
            "Hồ thủy lợi tự nhiên Bắc Trung Bộ",
            28.0,
            json.dumps(["C\u00e1 Tr\u1eafm \u0110en", "C\u00e1 Ch\u00e9p", "C\u00e1 Tr\u1eafm Tr\u1eafng", "C\u00e1 Tr\u00f4i", "C\u00e1 R\u00f4 Phi"], ensure_ascii=False),
            "Mồi ngô non luộc + cám viên cho cá chép. Cá trắm đen ở đáy ăn ốc bươu, trùn chỉ. Thả phao nổi cho cá trắm trắng.",
            "Miễn phí (câu tự nhiên)",
            26.0,
            1012.0,
            9.0,
            73,
            "Khu bảo tồn thiên nhiên, cá tự nhiên rất lớn. Nên xin phép ban quản lý trước. Câu đêm cá trắm đen cắn rất mạnh.",
            4.3,
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600",
            "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+K%E1%BA%BB+G%E1%BB%97%2C+C%E1%BA%A9m+Xuy%C3%AAn%2C+H%C3%A0+T%C4%A9nh"
        ),
        (
            "Hồ Búng Bình Thiên (An Giang)",
            "ho-bung-binh-thien",
            10.8217,
            105.0383,
            "An Giang",
            "Hồ nước ngọt tự nhiên Đồng bằng sông Cửu Long",
            8.0,
            json.dumps(["C\u00e1 Tra (C\u00e1 Tra B\u00f2)", "C\u00e1 Qu\u1ea3 (C\u00e1 L\u00f3c)", "C\u00e1 R\u00f4 Phi", "C\u00e1 Tr\u00ea", "C\u00e1 Ch\u00e9p"], ensure_ascii=False),
            "Mồi cá sống nhỏ (cá linh, cá mương) cho cá lóc. Cá tra dùng mồi bột cám viên. Cá trê thích mồi gan gà hoặc trùn quế.",
            "Miễn phí (câu tự nhiên ven hồ)",
            30.0,
            1009.0,
            5.0,
            80,
            "Hồ nước ngọt tự nhiên lớn nhất miền Tây. Mùa nước nổi (tháng 8-11) cá lóc, cá trê cực nhiều. Câu bằng cần tay tre truyền thống rất thú vị.",
            4.5,
            "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600",
            "https://www.google.com/maps/search/?api=1&query=B%C3%BAng+B%C3%ACnh+Thi%C3%AAn%2C+An+Ph%C3%BA%2C+An+Giang"
        ),
        (
            "Kênh Vĩnh Tế (An Giang - Kiên Giang)",
            "kenh-vinh-te",
            10.4833,
            104.8333,
            "An Giang / Kiên Giang",
            "Kênh đào lịch sử Tây Nam Bộ",
            6.0,
            json.dumps(["C\u00e1 Qu\u1ea3 (C\u00e1 L\u00f3c)", "C\u00e1 Tr\u00ea", "C\u00e1 R\u00f4 Phi", "C\u00e1 Tra (C\u00e1 Tra B\u00f2)"], ensure_ascii=False),
            "Mồi nhái hoặc cá sống nhỏ cho cá lóc. Mồi trùn quế hoặc gan gà cho cá trê. Cá rô phi dùng mồi cám bột mì.",
            "Miễn phí (câu tự do)",
            31.0,
            1008.5,
            4.0,
            77,
            "Kênh dài 87km biên giới Campuchia-Việt Nam. Câu cá lóc giật mồi nhái rất phổ biến. Mùa mưa (tháng 7-10) cá cực kỳ dồi dào.",
            4.2,
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600",
            "https://www.google.com/maps/search/?api=1&query=K%C3%AAnh+V%C4%A9nh+T%E1%BA%BF%2C+Ch%C3%A2u+%C4%90%E1%BB%91c%2C+An+Giang"
        ),
        (
            "Hồ Tuyền Lâm (Đà Lạt)",
            "ho-tuyen-lam",
            11.8975,
            108.4256,
            "Lâm Đồng (Đà Lạt)",
            "Hồ du lịch sinh thái cao nguyên",
            18.0,
            json.dumps(["C\u00e1 Ch\u00e9p", "C\u00e1 Tr\u1eafm Tr\u1eafng", "C\u00e1 R\u00f4 Phi", "C\u00e1 Tr\u00f4i"], ensure_ascii=False),
            "Mồi ngô non luộc + bột cám cho cá chép. Rau muống non cho cá trắm trắng. Trùn quế cho cá rô phi.",
            "50K VNĐ (vé vào cổng) + câu tự do",
            20.0,
            1015.0,
            10.0,
            68,
            "Hồ ở độ cao 1.000m nên thời tiết mát mẻ quanh năm. Cá ăn mồi tốt nhất lúc 6h-9h sáng. Cảnh đẹp rất phù hợp câu cá thư giãn.",
            4.4,
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600",
            "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+Tuy%E1%BB%81n+L%C3%A2m%2C+Ph%C6%B0%E1%BB%9Dng+4%2C+%C4%90%C3%A0+L%E1%BA%A1t%2C+L%C3%A2m+%C4%90%E1%BB%93ng"
        ),
        (
            "Hồ Lắk (Đắk Lắk)",
            "ho-lak",
            12.3833,
            108.1833,
            "Đắk Lắk",
            "Hồ nước ngọt tự nhiên Tây Nguyên",
            12.0,
            json.dumps(["C\u00e1 Ch\u00e9p", "C\u00e1 Tr\u1eafm Tr\u1eafng", "C\u00e1 R\u00f4 Phi", "C\u00e1 Qu\u1ea3 (C\u00e1 L\u00f3c)", "C\u00e1 Tr\u00ea"], ensure_ascii=False),
            "Mồi ngô non + trùn quế cho cá chép. Mồi nhái cho cá lóc. Mồi gan gà + tỏi cho cá trê. Rau muống cho cá trắm trắng.",
            "Miễn phí (câu tự nhiên ven hồ)",
            24.0,
            1013.0,
            6.5,
            74,
            "Hồ nước ngọt tự nhiên lớn nhất Tây Nguyên. Phong cảnh tuyệt đẹp với núi rừng bao quanh. Câu cá lóc giật mồi nhái rất thú vị vào sáng sớm.",
            4.5,
            "https://images.unsplash.com/photo-1500534314170-fe568bc6b1dc?w=600",
            "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+L%E1%BA%AFk%2C+Li%C3%AAn+S%C6%A1n%2C+L%E1%BA%AFk%2C+%C4%90%E1%BA%AFk+L%E1%BA%AFk"
        ),
        (
            "Hồ Câu Vạn Phúc (Hà Đông, Hà Nội)",
            "ho-cau-van-phuc",
            20.9683,
            105.7692,
            "Hà Nội",
            "Hồ câu dịch vụ nội thành",
            3.5,
            json.dumps(["C\u00e1 Ch\u00e9p", "C\u00e1 R\u00f4 Phi", "C\u00e1 Tr\u1eafm Tr\u1eafng", "C\u00e1 Tr\u00f4i"], ensure_ascii=False),
            "Mồi cám viên nén chuyên dụng + bột ngô. Cá chép thích mồi trùn quế + tỏi. Cá rô phi ăn mồi bột mì trộn tép khô.",
            "100-200K VNĐ/buổi câu",
            27.0,
            1013.0,
            5.0,
            70,
            "Hồ câu dịch vụ gần trung tâm Hà Nội, phù hợp câu buổi tối sau giờ làm. Cá được thả định kỳ nên mật độ cao. Có dịch vụ cho thuê cần câu.",
            3.9,
            "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600",
            "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+c%C3%A2u+V%E1%BA%A1n+Ph%C3%BAc%2C+V%E1%BA%A1n+Ph%C3%BAc%2C+H%C3%A0+%C4%90%C3%B4ng%2C+H%C3%A0+N%E1%BB%99i"
        ),
        (
            "Sông Sài Gòn (Khu vực Bình Dương)",
            "song-sai-gon-binh-duong",
            11.0167,
            106.65,
            "Bình Dương / TP.HCM",
            "Sông tự nhiên đoạn thượng nguồn",
            10.0,
            json.dumps(["C\u00e1 Ch\u1ebdm (C\u00e1 V\u01b0\u1ee3c)", "C\u00e1 Qu\u1ea3 (C\u00e1 L\u00f3c)", "C\u00e1 Tra (C\u00e1 Tra B\u00f2)", "C\u00e1 Tr\u00ea", "C\u00e1 R\u00f4 Phi"], ensure_ascii=False),
            "Mồi tôm sống / mồi giả lure cho cá chẽm. Mồi cá sống nhỏ cho cá lóc. Mồi gan gà + trùn quế cho cá trê.",
            "Miễn phí (câu tự nhiên ven sông)",
            30.0,
            1009.5,
            8.0,
            72,
            "Câu cá chẽm bằng lure vào lúc nước triều lên rất hiệu quả. Đoạn sông qua Lái Thiêu - Thuận An có nhiều cá lớn. Mang theo đèn pin nếu câu đêm.",
            4.0,
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600",
            "https://www.google.com/maps/search/?api=1&query=B%E1%BA%BFn+%C4%91%C3%B2+S%C3%B4ng+S%C3%A0i+G%C3%B2n%2C+L%C3%A1i+Thi%C3%AAu%2C+Thu%E1%BA%ADn+An%2C+B%C3%ACnh+D%C6%B0%C6%A1ng"
        ),
    ]

    for item in lakes_data:
        cursor.execute("""
        INSERT OR REPLACE INTO lakes (
            name, slug, lat, lng, province, lake_type, water_depth_m,
            species_list, bait_guide, ticket_price, weather_temp,
            barometric_pressure_hpa, wind_speed_kmh, fishing_bite_score,
            pro_tips, rating, image_url, google_maps_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, item)

def seed_species(cursor):
    species_data = [
        (
            "Cá Trắm Đen",
            "Mylopharyngodon piceus",
            "Họ Cá chép (Cyprinidae)",
            "Nước ngọt, hồ sâu đáy bùn đất, hồ thủy điện lớn",
            "Tầng đáy sát bùn (1.5m - 8m)",
            "1010 - 1016 hPa (Cực nhạy khi áp suất cao)",
            "Ốc vặn sống rửa sạch đập nứt vỏ, ủ trứng vịt lộn hoặc mầm lúa 24h. Cám tanh vảy cá hồi nghiền nhuyễn.",
            "Câu đài săn hàng (Cần 7H - 9H, phao ngày đêm), câu Lục bề mặt rộng (Lục số 8-10).",
            "20:00 - 03:00 sáng & 05:00 - 08:00 sáng",
            0.0112, 3.11, 45.0,
            "Vua săn hàng nước ngọt tại Việt Nam. Thịt chắc nịch, thớ thịt dày ngọt đậm, da cá dày giòn béo ngậy.",
            json.dumps([
                {
                    "dish_name": "Cá Trắm Đen Nướng Gỏi",
                    "cooking_method": "Nướng than hoa & Cuốn gỏi lá rừng",
                    "prep_time": "40 phút",
                    "ingredients": "Riềng già giã nhỏ, mẻ ngấu, mắm tôm, nghệ tươi, sả băm, lá sung, đinh lăng, chuối chát, khế chua, chẻo chấm cay nồng.",
                    "desc": "Thịt cá trắm đen phi lê lạng mỏng, ướp đậm riềng mẻ nướng xém cạnh vàng ươm trên than hoa thơm nức mũi. Cuốn cùng lá sung, đinh lăng, khế chua chấm chẻo cay nồng chuẩn bài dân dã.",
                    "chef_tip": "Khi lạng thịt cá, nghiêng dao 45 độ theo chiều thớ thịt. Da cá chiên giòn rụm rồi cuộn vào giữa miếng gỏi để tăng độ giòn sần sật."
                },
                {
                    "dish_name": "Cá Trắm Đen Kho Riềng Sả Cổ Truyền",
                    "cooking_method": "Kho niêu đất lửa trấu liu riu 12 tiếng",
                    "prep_time": "120 phút",
                    "ingredients": "Riềng củ thái lát, thịt ba chỉ gác bếp, nước màu dừa, nước mắm cốt cá cơm, ớt hiểm, tiêu sọ.",
                    "desc": "Khúc cá trắm đen dày thịt kho rục xương nhưng thịt cá vẫn săn chắc như thịt lợn nạc, ngấm đẫm vị cay ấm của riềng già và vị béo ngậy của thịt ba chỉ.",
                    "chef_tip": "Lót dày một lớp lát riềng dưới đáy niêu để chống cháy và truyền hương thơm đẫm vào từng thớ thịt cá."
                },
                {
                    "dish_name": "Lẩu Cá Trắm Đen Dưa Chua Chuối Đậu",
                    "cooking_method": "Lẩu chua thanh giải nhiệt",
                    "prep_time": "30 phút",
                    "ingredients": "Dưa cải chua muối giòn, cà chua, hành hoa, thì là, đậu phụ rán vàng, rau cần nước, chuối xanh.",
                    "desc": "Đầu và xương cá ninh ngọt nước, thịt cá phi lê nhúng lẩu chín tới vừa ngọt mềm vừa giòn sần sật, nước dùng chua thanh thanh ấm nồng vị gừng.",
                    "chef_tip": "Phi thơm đầu hành và cà chua xào săn với dưa chua trước khi chế nước hầm xương cá để nước lẩu trong và dậy màu đỏ đẹp mắt."
                }
            ])
        ),
        (
            "Cá Chép",
            "Cyprinus carpio",
            "Họ Cá chép (Cyprinidae)",
            "Ao hồ sông suối nước ngọt chảy chậm hoặc tĩnh",
            "Tầng đáy (0.8m - 3.5m)",
            "1008 - 1014 hPa",
            "Khoai lang nướng mật ong, ngô ngọt luộc xay, thính thơm đậu tương rang, mồi giun đỏ quế.",
            "Câu đài nhấp thẻo đôi, lưỡi không ngạnh, dây cước mềm 1.5 - 2.5.",
            "06:00 - 09:30 & 16:30 - 20:00",
            0.0165, 3.01, 28.5,
            "Loài cá biểu tượng thông minh, ranh mãnh. Thịt cá mềm thơm, giàu dinh dưỡng, đặc biệt béo ngậy phần bụng.",
            json.dumps([
                {
                    "dish_name": "Cá Chép Om Dưa Tóp Mỡ",
                    "cooking_method": "Om dưa chua tóp mỡ giòn",
                    "prep_time": "35 phút",
                    "ingredients": "Dưa cải muối chua giòn, tóp mỡ chiên vàng rụm, mỡ lợn, cà chua, hành hoa, thì là, ớt sừng, nghệ tươi.",
                    "desc": "Món ăn kinh điển của cần thủ miền Bắc. Cá chép sông tươi rói rán sơ vàng mặt, om liu riu cùng dưa cải chua, tóp mỡ béo ngậy, cà chua và thì là. Nước om chua dịu, ăn kèm bún tươi hết sảy.",
                    "chef_tip": "Khía nhẹ vài đường trên thân cá và xát chút muối bột nghệ trước khi rán sơ. Phải dùng tóp mỡ lợn mới dậy được mùi béo ngậy đặc trưng."
                },
                {
                    "dish_name": "Cá Chép Giòn Xào Lăn Sả Ớt",
                    "cooking_method": "Xào lăn lửa lớn",
                    "prep_time": "25 phút",
                    "ingredients": "Sả băm, ớt sừng thái sợi, hành tây, mộc nhĩ, bột cà ri, nước cốt dừa, lạc rang giã dập.",
                    "desc": "Thịt cá chép giòn thái lát mỏng xào trên chảo lửa lớn, miếng cá cong tròn giòn sần sật bùi béo, thơm lừng hương sả ớt và cà ri cay nồng.",
                    "chef_tip": "Thái lát mỏng và xào thật nhanh tay trên lửa cực lớn trong 2-3 phút để giữ trọn độ giòn sần sật của thớ cơ cá chép."
                },
                {
                    "dish_name": "Cháo Cá Chép Hạt Sen Bổ Dưỡng",
                    "cooking_method": "Nấu cháo nhừ tơi bồi bổ",
                    "prep_time": "45 phút",
                    "ingredients": "Gạo tẻ thơm pha nếp cái hoa vàng, hạt sen tươi, đậu xanh cà vỏ, hành khô phi thơm, tiêu đen sọ, gừng tươi.",
                    "desc": "Cháo hầm sánh mịn ngọt đậm từ nước luộc cá, thịt cá chép được gỡ sạch xương xào săn với hành phi thơm phức, rắc hạt tiêu tiêu sọ nóng hổi ấm bụng.",
                    "chef_tip": "Luộc cá cùng vài lát gừng và cọng hành hoa để khử triệt để mùi tanh trước khi lọc gỡ thịt cá."
                }
            ])
        ),
        (
            "Cá Tra (Cá Tra Bò)",
            "Pangasianodon hypophthalmus",
            "Họ Cá tra (Pangasiidae)",
            "Hồ dịch vụ, sông Mekong, sông Đồng Nai",
            "Tầng lửng đến đáy (1.0m - 5.0m)",
            "1005 - 1012 hPa",
            "Bún lên men chua cay, bánh mì sandwich ngâm sữa béo đặc, chùm nho mồi cám tanh D1-D2.",
            "Cần máy bạo lực (2.7m - 3.6m), máy câu kim loại size 4000-6000, dây PE 3.0-5.0.",
            "11:00 - 14:00 (Nắng gắt cá ăn mạnh) & Chập tối",
            0.0094, 3.17, 35.0,
            "Cá da trơn lực lưỡng, thớ thịt dày trắng phau, lớp mỡ ngậy béo giàu Omega-3 tan chảy thơm lừng.",
            json.dumps([
                {
                    "dish_name": "Cá Tra Bò Áp Chảo Sốt Bơ Tỏi",
                    "cooking_method": "Áp chảo chảo gang (Pan-seared)",
                    "prep_time": "20 phút",
                    "ingredients": "Bơ lạt Pháp, tỏi cô đơn băm nhuyễn, nước cốt chanh vàng, tiêu đen đập dập, lá xạ hương (thyme) hoặc ngò tây.",
                    "desc": "Miếng phi lê cá tra bò cắt vuông vức, áp chảo trên chảo gang lửa lớn cho mặt da giòn rụm ánh vàng hổ phách, rưới sốt bơ tỏi chanh thơm ngát. Thịt cá mềm mọng, béo ngậy tan chảy ngọt lịm.",
                    "chef_tip": "Thấm thật khô bề mặt miếng cá trước khi áp chảo. Áp chảo mặt da trước trong 3-4 phút đến khi vàng giòn rồi mới lật mặt, không lật qua lại nhiều lần."
                },
                {
                    "dish_name": "Canh Chua Cá Tra Bông Điên Điển",
                    "cooking_method": "Nấu canh chua miền Tây Nam Bộ",
                    "prep_time": "30 phút",
                    "ingredients": "Cốt me chua, bông điên điển hoặc bông so đũa, dọc mùng (bạc hà), đậu bắp, ngò gai, rau om, ớt hiểm đỏ.",
                    "desc": "Món canh chua trứ danh miền sông nước Cửu Long. Vị chua thanh mát của me làm dịu đi vị béo ngậy của thịt cá tra, chấm miếng cá vào chén nước mắm nhĩ ớt xắt cay nồng ngon khó cưỡng.",
                    "chef_tip": "Chần cá qua nước sôi có pha chút giấm hoặc nước cốt chanh trước khi nấu để làm sạch lớp nhớt và khử hoàn toàn mùi tanh da trơn."
                },
                {
                    "dish_name": "Cá Tra Kho Tộ Nước Màu Dừa Bến Tre",
                    "cooking_method": "Kho tộ niêu đất đậm đà",
                    "prep_time": "40 phút",
                    "ingredients": "Nước dừa tươi, nước màu dừa, tiêu sọ đập dập, hành tím, ớt chỉ thiên, mỡ lợn phi thơm.",
                    "desc": "Khúc cá kho ngập trong nước màu dừa sóng sánh ánh đỏ cánh gián, thịt cá ngấm gia vị mặn ngọt hài hòa, phần mỡ cá trong veo béo bùi ăn cùng cơm nóng vét sạch nồi.",
                    "chef_tip": "Kho hai lửa (kho lần 1 cạn bớt nước rồi để nguội, kho tiếp lần 2) để miếng cá săn đanh và keo nước lại đậm đà nhất."
                }
            ])
        ),
        (
            "Cá Quả (Cá Lóc)",
            "Channa striata",
            "Họ Cá quả (Channidae)",
            "Đầm lầy, ruộng ngập, kênh rạch cỏ dại, mép hồ",
            "Tầng mặt và tầng lửng sát bèo mép nước",
            "1006 - 1015 hPa",
            "Mồi giả Lure: Nhái hơi nhảy (Jump Frog), Soft bait sâu cao su gắp thìa, cá sắt vibrator. Mồi sống: Nhái bén tươi.",
            "Bộ cần Lure chuyên dụng (Action Medium/Medium Heavy), máy ngang (Baitcaster) ra mồi chuẩn xác mép bèo.",
            "05:30 - 08:00 sáng & 16:00 - 18:30 chiều",
            0.0088, 3.14, 9.8,
            "Thịt cá quả ít xương dăm, thịt nạc trắng phau chắc nịch, vị ngọt thanh tự nhiên rất lành tính.",
            json.dumps([
                {
                    "dish_name": "Cá Lóc Nướng Trui Rơm Rạ",
                    "cooking_method": "Nướng rơm đồng quê nguyên bản",
                    "prep_time": "30 phút",
                    "ingredients": "Rơm khô đồng ruộng, bánh tráng phơi sương, bún tươi, chuối chát, khế chua, rau thơm, mắm nêm hoặc mắm me sệt.",
                    "desc": "Cá vừa câu từ đầm lên xiên que tre nướng vùi rơm rạ rực lửa. Cạo lớp vảy cháy để lộ thớ thịt trắng phau thơm mùi khói rơm quyến rũ, cuốn bánh tráng chấm mắm me đậm chất lãng tử.",
                    "chef_tip": "Không cần đánh vảy hay mổ ruột để giữ trọn vẹn vị béo bùi của lòng cá và độ ẩm ngọt tự nhiên của thớ thịt."
                },
                {
                    "dish_name": "Cá Lóc Kho Tiêu Niêu Đất",
                    "cooking_method": "Kho tiêu cay nồng ấm bụng",
                    "prep_time": "35 phút",
                    "ingredients": "Tiêu đen giã dập, ớt hiểm, nước mắm ngon, tỏi phi vàng, tóp mỡ giòn.",
                    "desc": "Từng khúc cá lóc kho săn chắc, phủ kín lớp hạt tiêu thơm nồng, nước sốt kho sánh đặc quánh cay cay kích thích vị giác trong những ngày mưa lạnh.",
                    "chef_tip": "Ướp cá với nước mắm và tiêu ít nhất 20 phút trước khi bật bếp kho để gia vị ngấm sâu vào lõi thịt cá."
                }
            ])
        ),
        (
            "Cá Chẽm (Cá Vược)",
            "Lates calcarifer",
            "Họ Cá chẽm (Latidae)",
            "Vùng nước lợ, cửa sông, hồ nước mặn/ngọt nhân tạo",
            "Tầng lửng gần các cọc cống, mỏm đá ngầm",
            "1008 - 1014 hPa (Rất thích ngày con nước lớn)",
            "Tôm sống búng tanh tách, cá mồi con (cá đối nhỏ), mồi lure Minnow chìm chậm lấp lánh.",
            "Cần lure biển/nước lợ độ cứng M/MH, dây dẫn Shockleader chống cọ xát nắp mang cá cực sắc.",
            "Nước ròng chuyển sang nước lớn (Thủy triều lên) & Ban đêm",
            0.0125, 3.08, 26.5,
            "Thịt cá chẽm trắng tinh, thơm mịn, vị ngọt thanh đậm đà của hải sản nước lợ, rất ít xương dăm.",
            json.dumps([
                {
                    "dish_name": "Cá Chẽm Hấp Xì Dầu Hong Kong",
                    "cooking_method": "Hấp xì dầu thượng hạng",
                    "prep_time": "25 phút",
                    "ingredients": "Xì dầu cao cấp, dầu hào, gừng thái chỉ, gốc hành hoa chẻ sợi, ớt sừng, dầu mè thơm.",
                    "desc": "Cá chẽm hấp chín tới giữ trọn vẹn độ mọng nước, rưới nước sốt xì dầu phi gừng thơm ngát rồi dội một gáo dầu nóng xèo xèo dậy mùi hải sản đẳng cấp nhà hàng.",
                    "chef_tip": "Hấp cá đúng 12-15 phút tùy kích thước, không hấp quá lâu sẽ làm thịt cá bị bở và mất đi vị ngọt tự nhiên."
                },
                {
                    "dish_name": "Cá Chẽm Áp Chảo Sốt Chanh Dây",
                    "cooking_method": "Áp chảo phong cách Âu",
                    "prep_time": "20 phút",
                    "ingredients": "Nước cốt chanh leo tươi, bơ lạt, mật ong, muối hồng, măng tây nướng bơ.",
                    "desc": "Phi lê cá chẽm áp chảo da giòn rụm màu cánh gián, phủ sốt chanh leo vàng ươm chua chua ngọt ngọt thanh tao, tôn vinh thớ thịt ngọt lịm.",
                    "chef_tip": "Dùng dao rạch nhẹ vài đường caro trên mặt da cá để khi áp chảo miếng phi lê không bị cong vênh."
                }
            ])
        ),
        (
            "Cá Lăng",
            "Hemibagrus wyckioides",
            "Họ Cá lăng (Bagridae)",
            "Sông sâu nước chảy xiết, hồ đá ngầm hiểm trở",
            "Tầng đáy nhiều gộp đá (2m - 12m)",
            "1008 - 1015 hPa",
            "Mồi giun đất khổng lồ, ruột gà ủ tanh chua, tép tươi nhảy tanh tách.",
            "Cần đài bạo lực hoặc cần ngâm chì neo dòng nước chảy.",
            "21:00 - 04:00 sáng (Cá săn đêm)",
            0.0076, 3.22, 30.0,
            "Đặc sản thượng hạng của sông Đà và Tây Nguyên. Thịt cá dẻo quánh, không một cọng xương dăm, thơm bùi ngậy béo.",
            json.dumps([
                {
                    "dish_name": "Chả Cá Lăng Kiểu Lã Vọng",
                    "cooking_method": "Nướng than hoa & Đảo chảo mỡ tại bàn",
                    "prep_time": "30 phút",
                    "ingredients": "Riềng già, mẻ ngấu, nghệ tươi, mắm tôm ngon, thì là, hành hoa cắt khúc, bún rối, lạc rang, ớt tươi.",
                    "desc": "Món ăn quốc hồn quốc túy của thủ đô Hà Nội. Miếng cá lăng thái quân cờ vàng óng màu nghệ ướp riềng mẻ nướng than rồi đảo nóng trên chảo mỡ sôi cùng ngập tràn hành hoa thì là thơm nức mũi.",
                    "chef_tip": "Chọn phần thịt thăn cá lăng tươi, thái miếng dày 1.5cm và nướng xém than hoa trước khi đem đảo mỡ."
                },
                {
                    "dish_name": "Cá Lăng Nướng Than Riềng Mẻ",
                    "cooking_method": "Nướng than hoa cuốn bánh tráng",
                    "prep_time": "35 phút",
                    "ingredients": "Mẻ chua, riềng giã nhỏ, nước mắm nhĩ, thì là, lá mơ, lá lốt, bánh tráng mè nướng giòn.",
                    "desc": "Từng xiên cá lăng nướng vàng rộm xèo xèo mỡ trên than hồng, thớ thịt ngọt lịm dai dai cuốn rau rừng chấm nước mắm gừng sả cay xé lưỡi.",
                    "chef_tip": "Quết một lớp dầu ăn mỏng pha nghệ lên cá trong lúc nướng để giữ cá luôn bóng mượt không bị khô."
                }
            ])
        ),
        (
            "Cá Ngừ Đại Dương",
            "Thunnus albacares",
            "Họ Cá thu ngừ (Scombridae)",
            "Vùng biển khơi xa Hoàng Sa & Trường Sa",
            "Tầng mặt đến tầng lửng biển sâu (10m - 100m)",
            "1012 - 1016 hPa",
            "Mồi câu Jigging 200g - 400g dạ quang, mồi cá nục tươi, Popper bọt nước.",
            "Cần câu biển hạng nặng tải dây PE 6.0 - 8.0, máy câu biển size 14000 - 20000.",
            "Rạng sáng 04:00 - 07:00 & Hoàng hôn",
            0.0142, 3.02, 95.0,
            "Thủy quái đại dương dũng mãnh. Thịt đỏ au giàu đạm tinh khiết, từng thớ thịt săn chắc ngọt lịm.",
            json.dumps([
                {
                    "dish_name": "Sashimi Cá Ngừ Đại Dương Tươi Sống",
                    "cooking_method": "Thưởng thức tươi sống chuẩn Nhật",
                    "prep_time": "15 phút",
                    "ingredients": "Lá tía tô tươi, củ cải trắng bào sợi, mù tạt Wasabi Nhật Bản, nước tương đậu nành nguyên chất, gừng hồng gari.",
                    "desc": "Thịt cá ngừ vừa câu lên xử lý lạnh chuẩn sashimi, cắt lát dày màu hồng ngọc mướt mát. Chấm đẫm xì dầu wasabi cay nồng sộc thẳng lên mũi, vị ngọt bùi mát lạnh tan chảy trên đầu lưỡi.",
                    "chef_tip": "Cá câu lên phải được xả máu ngay tại thuyền và ủ đá lạnh âm sâu để thớ thịt giữ trọn độ đỏ tươi và vị ngọt tinh khiết."
                },
                {
                    "dish_name": "Mắt Cá Ngừ Đại Dương Tiềm Thuốc Bắc",
                    "cooking_method": "Hầm thố đất bổ dưỡng",
                    "prep_time": "50 phút",
                    "ingredients": "Kỷ tử, táo tàu, đẳng sâm, thục địa, tiêu sọ, gừng tươi, ớt xiêm xanh Phú Yên.",
                    "desc": "Đặc sản nức tiếng xứ sở 'hoa vàng trên cỏ xanh'. Mắt cá ngừ đại dương béo ngậy hầm thố đất cùng các vị thuốc bắc bổ dưỡng, nước dùng ngọt đậm đà thơm ngát bổ mắt bồi bổ sinh lực.",
                    "chef_tip": "Chần mắt cá với rượu trắng và gừng đập dập để khử sạch mùi tanh trước khi cho vào thố đất tiềm thuốc bắc."
                }
            ])
        ),
        (
            "Cá Rô Phi",
            "Oreochromis niloticus",
            "Họ Cá rô phi (Cichlidae)",
            "Ao hồ sông ngòi, đầm lầy, nước lợ và nước ngọt toàn quốc",
            "Tầng giữa và tầng đáy (0.5m - 2.5m)",
            "1008 - 1014 hPa",
            "Cám tôm tanh, bột đậu xanh rang, tép sông vụn, mồi giun đỏ quế.",
            "Câu đài thẻo đôi phao ngắn, câu lục mép bèo.",
            "07:00 - 10:30 & 15:30 - 18:30",
            0.0182, 2.97, 4.5,
            "Loài cá quen thuộc vô cùng háu ăn, sinh trưởng nhanh. Thớ thịt nạc trắng, ngọt bùi, dễ chế biến nhiều món ngon dân dã.",
            json.dumps([
                {
                    "dish_name": "Cá Rô Phi Chiên Giòn Mắm Gừng",
                    "cooking_method": "Chiên giòn ngập dầu",
                    "prep_time": "20 phút",
                    "ingredients": "Gừng tươi giã nhỏ, ớt chỉ thiên, tỏi, nước mắm nhĩ, chanh tươi, rau kinh giới, húng quế.",
                    "desc": "Cá rô phi làm sạch khía ca-rô chiên ngập dầu giòn rụm từ vây tới đuôi, chấm nước mắm gừng ớt tỏi chua ngọt cay xè đầu lưỡi.",
                    "chef_tip": "Thấm thật ráo nước và áo một lớp bột ngô mỏng trước khi chiên giúp da cá giòn tan suốt 2 tiếng không ỉu."
                },
                {
                    "dish_name": "Cá Rô Phi Hấp Sả Thì Là",
                    "cooking_method": "Hấp cách thủy thanh ngọt",
                    "prep_time": "25 phút",
                    "ingredients": "Sả cây đập dập, thì là, gừng thái sợi, ớt sừng, hành hoa, tiêu sọ.",
                    "desc": "Thịt cá chín tới ngọt đậm đà tự nhiên, thơm nức mùi tinh dầu sả gừng, hoàn toàn khử sạch mùi bùn đất.",
                    "chef_tip": "Lót sả đập dập dưới bụng cá và rắc thì là trước khi đậy nắp hấp 12 phút."
                },
                {
                    "dish_name": "Canh Bánh Đa Cá Rô Đồng / Rô Phi",
                    "cooking_method": "Nấu bánh đa cá rô đất Cảng",
                    "prep_time": "35 phút",
                    "ingredients": "Bánh đa đỏ Hải Phòng, rau cải cúc (hoặc rau ngót), cà chua, hành thì là, xương cá giã lọc nước dùng.",
                    "desc": "Nước dùng ngọt lịm từ xương cá rô, thịt cá được lóc phi lê rim vàng ươm đậm đà cùng nghệ và thì là ăn kèm bánh đa đỏ tuyệt hảo.",
                    "chef_tip": "Xương và đầu cá đem nướng thơm rồi giã nhuyễn lọc lấy nước cốt nấu nước dùng sẽ ngọt thanh đậm vị."
                }
            ])
        ),
        (
            "Cá Trê",
            "Clarias gariepinus / batrachus",
            "Họ Cá trê (Clariidae)",
            "Đáy bùn ao hồ tĩnh, kênh rạch, hồ đập nước đọng",
            "Tầng đáy sát bùn ngập ngụa hữu cơ (1.0m - 4.0m)",
            "1005 - 1012 hPa (Có cơ quan thở khí trời, chịu oxy thấp cực tốt)",
            "Gan lợn ủ tanh, ruột gà, trùn hổ, cá mồi cắt khúc ủ mắm tôm.",
            "Câu ngâm đáy chì neo tải nặng, câu cần tay đêm sát mép cống.",
            "19:00 - 02:00 sáng (Săn mồi ban đêm)",
            0.0068, 3.24, 18.0,
            "Cá da trơn lực lưỡng sống sát đáy bùn. Thịt béo ngậy, ngọt đậm đà, giàu đạm và lipid bổ dưỡng.",
            json.dumps([
                {
                    "dish_name": "Cá Trê Nướng Muối Ớt Than Hoa",
                    "cooking_method": "Nướng than hoa da giòn",
                    "prep_time": "30 phút",
                    "ingredients": "Muối hạt, ớt xiêm xanh giã nhuyễn, dầu điều, sả băm, chanh tươi, rau thơm.",
                    "desc": "Cá trê khía xéo ướp muối ớt nướng than hồng xèo xèo mỡ. Lớp da giòn rụm màu hổ phách, thớ thịt béo bùi chấm muối ớt chanh cay nồng nức mũi.",
                    "chef_tip": "Dùng tro bếp hoặc nước cốt chanh vuốt sạch nhớt cá trê trước khi ướp để thịt thơm và da giòn rụm."
                },
                {
                    "dish_name": "Cá Trê Kho Gừng Nghệ Niêu Đất",
                    "cooking_method": "Kho niêu đất khử bùn",
                    "prep_time": "40 phút",
                    "ingredients": "Nghệ già củ giã dập, gừng tươi, nước mắm ngon, ớt hiểm, hạt tiêu sọ, mỡ lợn.",
                    "desc": "Món ăn ấm lòng ngày mưa. Miếng cá trê vàng ươm màu nghệ, săn chắc ngấm đậm gia vị mặn ngọt cay cay, vị béo của cá hòa cùng vị cay ấm của gừng nghệ.",
                    "chef_tip": "Kho hai lửa đến khi nước sốt keo sệt bám đều quanh khúc cá, ăn cùng cơm nóng không gì sánh bằng."
                },
                {
                    "dish_name": "Canh Chua Cá Trê Nấu Khế",
                    "cooking_method": "Nấu canh chua thanh mát",
                    "prep_time": "25 phút",
                    "ingredients": "Khế chua thái lát sao, cà chua, ngò gai, rau om (ngổ), hành hoa, ớt hiểm đỏ.",
                    "desc": "Vị chua thanh tự nhiên của khế xanh giúp cân bằng độ béo ngậy của thịt cá trê, nước canh trong veo chua dịu giải ngấy cực tốt.",
                    "chef_tip": "Xào săn cá trê cùng chút mỡ hành trước khi đổ nước sôi vào nấu để nước canh không bị tanh."
                }
            ])
        ),
        (
            "Cá Trôi",
            "Cirrhinus mrigala",
            "Họ Cá chép (Cyprinidae)",
            "Hồ thủy lợi, sông lớn đáy bùn cát, hồ câu dịch vụ",
            "Tầng đáy (1.5m - 5.0m)",
            "1010 - 1016 hPa",
            "Bột ngô lên men chua, khoai lang ủ chua mộc, cám tanh vừa, thính thơm đậu nành.",
            "Câu đài phao nhạy thẻo dài mảnh (cá ăn hút mồi rất khẽ), câu lục bề mặt.",
            "06:30 - 09:30 & 16:00 - 19:30",
            0.0118, 3.08, 16.0,
            "Thân thon dài vảy nhỏ ánh đồng, lực bơi phóng ban đầu cực nhanh và dẻo dai. Thịt cá thơm ngọt bùi béo.",
            json.dumps([
                {
                    "dish_name": "Cá Trôi Kho Riềng Khế Chua",
                    "cooking_method": "Kho rục xương đượm vị",
                    "prep_time": "45 phút",
                    "ingredients": "Riềng già thái lát, khế chua, thịt ba chỉ, nước hàng thắng đường thốt nốt, ớt cay, tiêu sọ.",
                    "desc": "Khúc cá trôi to dày thịt lót lớp riềng và khế kho cạn nước. Thớ thịt cá săn chắc, xương cá mềm rục bùi béo đượm mùi khói rơm rạ đồng quê.",
                    "chef_tip": "Cá trôi nhiều xương dăm nên kho lửa thật nhỏ liu riu nhiều tiếng để xương nhừ mềm mà thịt vẫn chắc."
                },
                {
                    "dish_name": "Cá Trôi Hấp Bia Ngải Cứu",
                    "cooking_method": "Hấp bia thảo mộc",
                    "prep_time": "25 phút",
                    "ingredients": "Bia lon, ngải cứu tươi non, gừng thái chỉ, sả cây, thì là, tiêu sọ đập dập.",
                    "desc": "Thịt cá trôi ngọt lịm hòa quyện cùng vị đăng đắng nhẹ thanh mát của ngải cứu, ăn nóng hổi giải cảm và tăng cường sinh lực.",
                    "chef_tip": "Cho ngải cứu vào cả trong bụng cá và phủ lên lưng cá để tinh dầu ngấm đều từ trong ra ngoài."
                },
                {
                    "dish_name": "Chả Cá Trôi Thì Là Rán Giòn",
                    "cooking_method": "Quết chả rán phồng",
                    "prep_time": "30 phút",
                    "ingredients": "Thịt cá trôi lọc sạch xương, mỡ gáy lợn thái hạt lựu, thì là băm nhỏ, tiêu sọ, bột tỏi, nước mắm nhĩ.",
                    "desc": "Thịt cá trôi quết dẻo quánh cùng thì là rán vàng phồng rộp ngoài giòn trong mềm dai thơm nức chấm tương ớt.",
                    "chef_tip": "Cho thịt cá vào ngăn đông 30 phút cho dăm đá rồi mới đem quết giúp chả cá dai giòn tự nhiên không cần hàn the."
                }
            ])
        ),
        (
            "Cá Trắm Trắng",
            "Ctenopharyngodon idella",
            "Họ Cá chép (Cyprinidae)",
            "Hồ thủy lợi rộng, hồ tự nhiên nhiều rong cỏ, hồ dịch vụ săn hàng",
            "Tầng giữa và tầng nổi (0.5m - 2.5m)",
            "1010 - 1015 hPa",
            "Lá sắn non vò nát, ngô ngọt ủ mầm bia, cám thơm thảo mộc vị hoa quả, cỏ mật tươi.",
            "Câu đài phao nổi rơi lửng lơ, câu lục bề mặt, lưỡi câu nhẹ.",
            "06:00 - 10:00 sáng & 15:30 - 18:30 chiều",
            0.0121, 3.06, 40.0,
            "Thân thon dài màu trắng bạc óng ánh, miệng tròn không râu. Thịt cá trắng muốt, thớ thịt dày chắc ngọt đậm đà.",
            json.dumps([
                {
                    "dish_name": "Cá Trắm Trắng Hấp Bia Ngải Cứu",
                    "cooking_method": "Hấp bia hơi thảo mộc",
                    "prep_time": "30 phút",
                    "ingredients": "Bia lon thơm, ngải cứu tươi non, củ gừng già, ớt sừng, hành hoa chẻ sợi, thì là.",
                    "desc": "Khúc cá trắm trắng to dày thịt trắng ngần hấp cùng bia và ngải cứu, thớ thịt ngọt lịm tan chảy thơm mùi thảo mộc giải nhiệt bồi bổ.",
                    "chef_tip": "Dùng bia tươi hoặc bia lon nấu giúp thớ thịt cá nở xốp mềm mọng nước mà không hề tanh."
                },
                {
                    "dish_name": "Cá Trắm Trắng Chiên Giòn Sốt Cà Chua",
                    "cooking_method": "Chiên giòn sốt chua ngọt",
                    "prep_time": "25 phút",
                    "ingredients": "Cà chua chín mọng, hành tím, thì là, hành hoa, dầu ăn, bột bắp áo mỏng, tiêu bột.",
                    "desc": "Miếng phi lê cá trắm trắng tẩm bột mỏng chiên vàng giòn rụm bên ngoài, bên trong ngọt mềm mọng nước đượm sốt cà chua thì là sánh mịn.",
                    "chef_tip": "Xốt cà chua phải nêm nếm chua ngọt hài hòa rồi mới dội lên đĩa cá chiên giòn để giữ độ giòn của lớp vỏ ngoài."
                },
                {
                    "dish_name": "Lẩu Cá Trắm Trắng Măng Cay",
                    "cooking_method": "Lẩu măng chua cay",
                    "prep_time": "35 phút",
                    "ingredients": "Măng củ chua giòn, ớt sừng đỏ, cà chua, hành thì là, xương cá hầm nước ngọt, rau muống chẻ.",
                    "desc": "Nước lẩu ninh xương cá ngọt đậm đà đượm vị măng chua rừng và ớt tươi cay nồng, nhúng từng lát cá trắm trắng mỏng giòn ngọt cùng rau muống chẻ.",
                    "chef_tip": "Phi thơm tỏi ớt xào măng thật săn trước khi trút nước hầm xương cá vào để nước lẩu dậy mùi thơm nức."
                }
            ])
        )
    ]

    for item in species_data:
        cursor.execute("""
        INSERT INTO species (
            common_name, scientific_name, family, habitat, water_layer,
            optimal_pressure_hpa, best_baits, tackle_technique, feeding_peak_hours,
            allometric_a, allometric_b, max_record_kg, description, culinary_recipes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, item)
