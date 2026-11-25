
// ==========================================
// VERCEL / OFFLINE STATIC DATASETS (FALLBACK)
// Ensures 100% functionality even when backend server is offline
// ==========================================
const DEFAULT_LAKES = [
  {
    "id": 5,
    "name": "Hồ Suối Hai (Ba Vì)",
    "slug": "ho-suoi-hai",
    "lat": 21.135,
    "lng": 105.352,
    "province": "Hà Nội",
    "lake_type": "Hồ tự nhiên chân núi Ba Vì",
    "water_depth_m": 6.0,
    "species_list": [
      "Cá Trắm Đen",
      "Cá Chép Giòn",
      "Cá Mè Hoa",
      "Cá Ngạnh"
    ],
    "bait_guide": "Ốc bươu ủ xốt tỏi ớt men rượu; Thính mè hạt cải rang thơm phức xả lửng.",
    "ticket_price": "200.000 VNĐ / ngày câu lục & đài",
    "weather_temp": 23.5,
    "barometric_pressure_hpa": 1013.0,
    "wind_speed_kmh": 9.0,
    "fishing_bite_score": 89,
    "pro_tips": "Thường xuyên có các pha đóng trắm đen trên 15kg. Cần chuẩn bị dây cước tối thiểu trục 5.0, thẻo 4.0 chịu tải.",
    "rating": 4.7,
    "image_url": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+Su%E1%BB%91i+Hai%2C+Ba+V%C3%AC%2C+H%C3%A0+N%E1%BB%99i"
  },
  {
    "id": 6,
    "name": "Hồ Sông Mây (Trảng Bom)",
    "slug": "ho-song-may",
    "lat": 10.9856,
    "lng": 106.9854,
    "province": "Đồng Nai",
    "lake_type": "Hồ đập bán hoang dã",
    "water_depth_m": 5.5,
    "species_list": [
      "Cá Tra Bò",
      "Cá Chim Trắng",
      "Cá Lóc Bông",
      "Cá Trôi"
    ],
    "bait_guide": "Mồi chuối tây chín rục ủ mật mía, lòng gà tanh hoặc cám cá tra D1 câu chùm nho.",
    "ticket_price": "100.000 VNĐ / ngày",
    "weather_temp": 28.5,
    "barometric_pressure_hpa": 1010.2,
    "wind_speed_kmh": 11.0,
    "fishing_bite_score": 82,
    "pro_tips": "Cá chim và cá tra ở đây kéo cước cực rát, cần dùng thẻo cáp chống răng cắt khi câu cá chim.",
    "rating": 4.5,
    "image_url": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+S%C3%B4ng+M%C3%A2y%2C+Tr%E1%BA%A3ng+Bom%2C+%C4%90%E1%BB%93ng+Nai"
  },
  {
    "id": 8,
    "name": "Hồ Đầm Sen (Quận 11)",
    "slug": "ho-dam-sen",
    "lat": 10.7675,
    "lng": 106.6372,
    "province": "TP. Hồ Chí Minh",
    "lake_type": "Hồ dịch vụ thể thao giải trí",
    "water_depth_m": 2.8,
    "species_list": [
      "Cá Tra",
      "Cá Chim",
      "Cá Chép",
      "Cá Trôi Ấn Độ"
    ],
    "bait_guide": "Bánh mì gối xay nhỏ bóp cốt dừa sữa đặc + vani; Cám tanh chuyên dụng câu đài.",
    "ticket_price": "180.000 VNĐ / 4 tiếng",
    "weather_temp": 31.0,
    "barometric_pressure_hpa": 1007.5,
    "wind_speed_kmh": 6.0,
    "fishing_bite_score": 75,
    "pro_tips": "Thích hợp giải trí cuối tuần gia đình, cá ăn dạn vào buổi sáng mát từ 7h - 10h.",
    "rating": 4.4,
    "image_url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=C%C3%B4ng+vi%C3%AAn+%C4%90%E1%BA%A7m+Sen%2C+S%E1%BB%91+3+H%C3%B2a+B%C3%ACnh%2C+Ph%C6%B0%E1%BB%9Dng+3%2C+Qu%E1%BA%ADn+11%2C+TP.+H%E1%BB%93+Ch%C3%AD+Minh"
  },
  {
    "id": 9,
    "name": "Hồ Đồng Xanh - Đồng Nghệ",
    "slug": "ho-dong-xanh",
    "lat": 15.9928,
    "lng": 108.0674,
    "province": "Đà Nẵng",
    "lake_type": "Hồ cảnh quan miền Trung",
    "water_depth_m": 6.2,
    "species_list": [
      "Cá Chẽm",
      "Cá Quả",
      "Cá Chép",
      "Cá Thát Lát"
    ],
    "bait_guide": "Mồi tôm đồng nhấp mép cỏ; Lure cá sắt vibrator đánh tầng đáy rãnh nước.",
    "ticket_price": "50.000 VNĐ / vé vào cổng",
    "weather_temp": 27.0,
    "barometric_pressure_hpa": 1011.0,
    "wind_speed_kmh": 15.0,
    "fishing_bite_score": 81,
    "pro_tips": "Vùng giáp ranh chân núi nước rất trong, cần đi dây fluorocarbon tàng hình để tránh cá nhát cước.",
    "rating": 4.6,
    "image_url": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+%C4%90%E1%BB%93ng+Xanh+-+%C4%90%E1%BB%93ng+Ngh%E1%BB%87%2C+H%C3%B2a+Vang%2C+%C4%90%C3%A0+N%E1%BA%B5ng"
  },
  {
    "id": 10,
    "name": "Hồ Tuy Lai (Mỹ Đức)",
    "slug": "ho-tuy-lai",
    "lat": 20.738,
    "lng": 105.742,
    "province": "Hà Nội",
    "lake_type": "Quần thể hồ ngập nước núi đá",
    "water_depth_m": 4.5,
    "species_list": [
      "Cá Trắm Cỏ",
      "Cá Chép",
      "Cá Lóc Tự Nhiên",
      "Cá Diếc"
    ],
    "bait_guide": "Ngô nếp non luộc sữa đậu nành; Mồi trùn chỉ câu diếc củ.",
    "ticket_price": "120.000 VNĐ / ngày",
    "weather_temp": 24.0,
    "barometric_pressure_hpa": 1013.5,
    "wind_speed_kmh": 7.8,
    "fishing_bite_score": 86,
    "pro_tips": "Phong cảnh non nước hữu tình, đàn trắm cỏ thường đi ăn mép lau sậy vào tầm sáng sớm.",
    "rating": 4.7,
    "image_url": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+Tuy+Lai%2C+M%E1%BB%B9+%C4%90%E1%BB%A9c%2C+H%C3%A0+N%E1%BB%99i"
  },
  {
    "id": 13,
    "name": "Hồ Tây (West Lake)",
    "slug": "ho-tay",
    "lat": 21.0538,
    "lng": 105.8239,
    "province": "Hà Nội",
    "lake_type": "Hồ tự nhiên đô thị",
    "water_depth_m": 3.2,
    "species_list": [
      "Cá Trắm Đen",
      "Cá Chép",
      "Cá Trắm Cỏ",
      "Cá Rô Phi",
      "Cá Mè"
    ],
    "bait_guide": "Ốc vặn ủ trứng vịt lộn + gạo rang (săn trắm đen); Ngô ngọt ủ chua thơm hoặc cám ngô rang mật ong (săn chép cụ).",
    "ticket_price": "Miễn phí (Khu vực mở) / Vé câu đài một số mỏm 100k/ngày",
    "weather_temp": 24.5,
    "barometric_pressure_hpa": 1012.8,
    "wind_speed_kmh": 12.0,
    "fishing_bite_score": 88,
    "pro_tips": "Câu tầm chiều muộn hoặc đêm khuya (21h - 2h sáng). Chọn các hốc sen cũ hoặc bờ kè rêu nơi cá chép thường vào ủi mồi.",
    "rating": 4.7,
    "image_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+T%C3%A2y%2C+T%C3%A2y+H%E1%BB%93%2C+H%C3%A0+N%E1%BB%99i"
  },
  {
    "id": 14,
    "name": "Hồ Hàm Lợn (Suối Bàu, Sóc Sơn)",
    "slug": "ho-ham-lon",
    "lat": 21.3283,
    "lng": 105.808,
    "province": "Hà Nội",
    "lake_type": "Hồ thủy lợi tự nhiên thung lũng",
    "water_depth_m": 7.5,
    "species_list": [
      "Cá Trắm Đen",
      "Cá Chép",
      "Cá Trắm Trắng",
      "Cá Trôi",
      "Cá Rô Phi",
      "Cá Lăng"
    ],
    "bait_guide": "Mồi câu đài: Cám tanh vẩy mực + tơ nhện. Mồi săn hàng khủng: Ốc sống ủ hoa hồi, đập vỡ 30% xả ổ.",
    "ticket_price": "150.000 VNĐ / ca 8 tiếng (Bán tự nhiên sinh thái)",
    "weather_temp": 22.0,
    "barometric_pressure_hpa": 1014.2,
    "wind_speed_kmh": 8.5,
    "fishing_bite_score": 92,
    "pro_tips": "Nước rất sâu và lạnh, dùng thẻo dài từ 1.8m - 2.5m, xả ổ đón đầu luồng cá chạy dọc triền đồi thông.",
    "rating": 4.9,
    "image_url": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+H%C3%A0m+L%E1%BB%A3n%2C+S%C3%B3c+S%C6%A1n%2C+H%C3%A0+N%E1%BB%99i"
  },
  {
    "id": 15,
    "name": "Hồ Định Công (Tự nhiên)",
    "slug": "ho-dinh-cong",
    "lat": 20.9856,
    "lng": 105.8347,
    "province": "Hà Nội",
    "lake_type": "Hồ tự nhiên đô thị",
    "water_depth_m": 3.5,
    "species_list": [
      "Cá Rô Phi",
      "Cá Chép",
      "Cá Trôi",
      "Cá Trê",
      "Cá Mè"
    ],
    "bait_guide": "Cám tanh tôm xay nhuyễn + bột đậu xanh rang (săn rô phi cụ); Bánh mì ngâm sữa bóp nhuyễn câu cá chép.",
    "ticket_price": "Miễn phí bờ mở / 50.000 VNĐ vé điểm dịch vụ bờ đông",
    "weather_temp": 25.0,
    "barometric_pressure_hpa": 1012.0,
    "wind_speed_kmh": 10.0,
    "fishing_bite_score": 86,
    "pro_tips": "Hồ nước rộng nhiều bèo tây và rêu bám bờ kè. Buông cần lúc 6h sáng hoặc chiều muộn cá rô phi và trôi cắn liên tục.",
    "rating": 4.6,
    "image_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+%C4%90%E1%BB%8Bnh+C%C3%B4ng%2C+Ho%C3%A0ng+Mai%2C+H%C3%A0+N%E1%BB%99i"
  },
  {
    "id": 16,
    "name": "Hồ Đồng Đò (Sóc Sơn)",
    "slug": "ho-dong-do-soc-son",
    "lat": 21.3141865,
    "lng": 105.772304,
    "province": "Hà Nội",
    "lake_type": "Hồ thủy lợi tự nhiên thung lũng",
    "water_depth_m": 6.8,
    "species_list": [
      "Cá Trắm Trắng",
      "Cá Trôi",
      "Cá Chép",
      "Cá Rô Phi",
      "Cá Trê"
    ],
    "bait_guide": "Lá sắn non vò nát + ngô ủ mầm bia (săn trắm trắng); Cám thơm mộc câu trôi củ.",
    "ticket_price": "Miễn phí / 100.000 VNĐ vé giữ xe cắm trại câu đêm",
    "weather_temp": 23.5,
    "barometric_pressure_hpa": 1013.8,
    "wind_speed_kmh": 8.0,
    "fishing_bite_score": 90,
    "pro_tips": "Lòng hồ thung lũng nước sâu mát lạnh, đàn trắm trắng tự nhiên bơi lơ lửng tầng nước 1.5m - 2m ăn mồi rất bạo.",
    "rating": 4.8,
    "image_url": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop",
    "google_maps_url": "https://www.google.com/maps/place/H%E1%BB%93+%C4%90%E1%BB%93ng+%C4%90%C3%B2/@21.3147491,105.7723331,18.01z/data=!4m6!3m5!1s0x3134e3f28d5d1ea5:0x1f7a24791e083d0c!8m2!3d21.3141865!4d105.772304!16s%2Fg%2F11tss25rc7?entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    "id": 17,
    "name": "Hồ Câu Tam Hiệp (Dịch vụ)",
    "slug": "ho-cau-tam-hiep",
    "lat": 20.9365968,
    "lng": 105.8129401,
    "province": "Hà Nội",
    "lake_type": "Hồ câu dịch vụ chuyên nghiệp",
    "water_depth_m": 2.6,
    "species_list": [
      "Cá Trắm Đen",
      "Cá Chép",
      "Cá Trôi",
      "Cá Rô Phi",
      "Cá Trê"
    ],
    "bait_guide": "Ốc vặn ủ men sống, cám D1 tanh thơm, mồi tơ nhện kết dính hạt đài; mồi giun đỏ câu cá trê.",
    "ticket_price": "200.000 VNĐ / ca 4 tiếng (Thả cá định kỳ thứ 4 & thứ 7)",
    "weather_temp": 26.0,
    "barometric_pressure_hpa": 1011.5,
    "wind_speed_kmh": 9.0,
    "fishing_bite_score": 94,
    "pro_tips": "Hồ câu đài săn hàng nổi tiếng Thanh Trì. Cần thủ rải ổ ốc gọn để gom cá trắm đen vào ổ nhanh, dùng phao ngày đêm câu ca tối.",
    "rating": 4.9,
    "image_url": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop",
    "google_maps_url": "https://www.google.com/maps/place/H%E1%BB%93+C%C3%A2u+Tam+Hi%E1%BB%87p/@20.9378273,105.7987898,15.38z/data=!4m6!3m5!1s0x3135adfe1013eccb:0x2401f76a7de5261b!8m2!3d20.9365968!4d105.8129401!16s%2Fg%2F11flvccb56?entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    "id": 18,
    "name": "Hồ Câu Đông Ngàn (Dịch vụ)",
    "slug": "ho-cau-dong-ngan",
    "lat": 21.1215,
    "lng": 105.875,
    "province": "Hà Nội",
    "lake_type": "Hồ câu dịch vụ săn hàng",
    "water_depth_m": 3.0,
    "species_list": [
      "Cá Trắm Đen",
      "Cá Trắm Trắng",
      "Cá Chép Giòn",
      "Cá Rô Phi"
    ],
    "bait_guide": "Ốc khỏe đập dập 20% xả ổ, ngô ngọt ủ sữa non câu trắm trắng, cám thơm thảo mộc.",
    "ticket_price": "250.000 VNĐ / ca 6 tiếng (Có giải thưởng cá khủng nhất tuần)",
    "weather_temp": 25.5,
    "barometric_pressure_hpa": 1012.2,
    "wind_speed_kmh": 11.0,
    "fishing_bite_score": 93,
    "pro_tips": "Bè nổi giữa hồ câu đêm cực mát, mật độ cá củ trắm đen 8 - 15kg thả dồi dào. Thẻo cước tối thiểu 4.0 chống nổ trục.",
    "rating": 4.8,
    "image_url": "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=800&auto=format&fit=crop",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+C%C3%A2u+%C4%90%C3%B4ng+Ng%C3%A0n%2C+%C4%90%C3%B4ng+Anh%2C+H%C3%A0+N%E1%BB%99i"
  },
  {
    "id": 19,
    "name": "Hồ Đập Sun (Dịch vụ)",
    "slug": "ho-dap-sun",
    "lat": 21.315,
    "lng": 105.823,
    "province": "Hà Nội",
    "lake_type": "Hồ đập dịch vụ sinh thái",
    "water_depth_m": 4.8,
    "species_list": [
      "Cá Trê",
      "Cá Trắm Trắng",
      "Cá Trôi",
      "Cá Rô Phi",
      "Cá Trắm Đen"
    ],
    "bait_guide": "Gan lợn ủ tanh trộn bột bắp (săn trê củ); Ngô ủ bia hạt mềm câu trắm trắng.",
    "ticket_price": "180.000 VNĐ / ca 5 tiếng",
    "weather_temp": 22.8,
    "barometric_pressure_hpa": 1014.0,
    "wind_speed_kmh": 7.0,
    "fishing_bite_score": 91,
    "pro_tips": "Khu vực chân đập nước sâu tụ nhiều trê lai và trôi củ. Câu ngâm đêm cá cắn rực lửa, không gian núi rừng thoáng đãng.",
    "rating": 4.7,
    "image_url": "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&auto=format&fit=crop",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+%C4%90%E1%BA%ADp+Sun%2C+Minh+Tr%C3%AD%2C+S%C3%B3c+S%C6%A1n%2C+H%C3%A0+N%E1%BB%99i"
  },
  {
    "id": 20,
    "name": "Hồ Trị An (Vĩnh Cửu)",
    "slug": "ho-tri-an",
    "lat": 11.1392,
    "lng": 107.0371,
    "province": "Đồng Nai",
    "lake_type": "Lòng hồ thủy điện khổng lồ",
    "water_depth_m": 12.0,
    "species_list": [
      "Cá Hoàng Đế (Peacock Bass)",
      "Cá Lăng Vàng",
      "Cá Lóc",
      "Cá Chẽm",
      "Cá Tra"
    ],
    "bait_guide": "Câu lure: Nhái hơi nhảy mặt nước, Minnow lặn 1.2m màu xanh dạ quang. Câu ngâm: Dế cơm, tép sông tươi, gan bò.",
    "ticket_price": "Miễn phí (Thuyền đò chở ra đảo: 200.000 - 300.000 VNĐ)",
    "weather_temp": 29.0,
    "barometric_pressure_hpa": 1009.5,
    "wind_speed_kmh": 14.2,
    "fishing_bite_score": 85,
    "pro_tips": "Thiên đường câu Lure cá Hoàng Đế. Đi thuyền rà theo các bụi cây chìm, gộp đá lúc 6h - 8h sáng.",
    "rating": 4.8,
    "image_url": "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=800&auto=format&fit=crop",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+Tr%E1%BB%8B+An%2C+V%C4%A9nh+C%E1%BB%ADu%2C+%C4%90%E1%BB%93ng+Nai"
  },
  {
    "id": 21,
    "name": "Hồ Dầu Tiếng",
    "slug": "ho-dau-tieng",
    "lat": 11.35,
    "lng": 106.35,
    "province": "Tây Ninh",
    "lake_type": "Hồ thủy lợi lớn nhất ĐNA",
    "water_depth_m": 9.0,
    "species_list": [
      "Cá Tra",
      "Cá Lăng",
      "Cá Trắm Cỏ",
      "Cá Thát Lát",
      "Cá Rô Phi"
    ],
    "bait_guide": "Mồi bún thiu ủ phô mai con bò cười + cốt dừa (chuyên trị cá tra cụ); Mồi tôm sống nhấp chân đập.",
    "ticket_price": "Miễn phí (Thuê ca-nô/thuyền câu đêm: 400.000 VNĐ)",
    "weather_temp": 30.2,
    "barometric_pressure_hpa": 1008.0,
    "wind_speed_kmh": 16.0,
    "fishing_bite_score": 78,
    "pro_tips": "Khu vực chân đập chính và ngã ba suối cá tích tụ bầy đàn lớn, nên sử dụng cần bạo lực tải chì nặng.",
    "rating": 4.6,
    "image_url": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+D%E1%BA%A7u+Ti%E1%BA%BFng%2C+%C4%90%E1%BB%8Bnh+An%2C+D%E1%BA%A7u+Ti%E1%BA%BFng%2C+B%C3%ACnh+D%C6%B0%C6%A1ng"
  },
  {
    "id": 22,
    "name": "Hồ Hòa Bình (Sông Đà)",
    "slug": "ho-hoa-binh",
    "lat": 20.8123,
    "lng": 105.3211,
    "province": "Hòa Bình",
    "lake_type": "Hồ thủy điện vùng cao",
    "water_depth_m": 25.0,
    "species_list": [
      "Cá Trắm Đen Thủy Quái",
      "Cá Chiên Sông Đà",
      "Cá Lăng Chấm",
      "Cá Nheo"
    ],
    "bait_guide": "Mồi sống: Chạch bùn sống, giun đất khổng lồ (săn cá lăng/chiên); Ốc núi sông Đà giã dập.",
    "ticket_price": "Miễn phí dọc mép hồ / Thuê bè nổi cắm câu 300k/đêm",
    "weather_temp": 21.0,
    "barometric_pressure_hpa": 1015.5,
    "wind_speed_kmh": 10.5,
    "fishing_bite_score": 94,
    "pro_tips": "Nước sâu thẳm, dòng chảy ngầm hiểm trở. Đây là nơi xuất hiện các kỷ lục trắm đen 30-40kg.",
    "rating": 5.0,
    "image_url": "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&auto=format&fit=crop",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+Th%E1%BB%A7y+%C4%90i%E1%BB%87n+H%C3%B2a+B%C3%ACnh%2C+H%C3%B2a+B%C3%ACnh"
  },
  {
    "id": 23,
    "name": "Ngư Trường Quần Đảo Hoàng Sa",
    "slug": "ngu-truong-hoang-sa",
    "lat": 16.5333,
    "lng": 112.0333,
    "province": "TP. Đà Nẵng (Việt Nam)",
    "lake_type": "Ngư trường biển đảo chủ quyền Việt Nam",
    "water_depth_m": 45.0,
    "species_list": [
      "Cá Ngừ Đại Dương",
      "Cá Mú Đỏ San Hô",
      "Cá Thu Bè",
      "Cá Cam Biển Sâu",
      "Tôm Hùm"
    ],
    "bait_guide": "Mồi câu Jigging biển sâu (150g - 300g), mồi Popper mặt nước màu cá chuồn, mồi mực tươi sống câu ngâm đáy rạn san hô.",
    "ticket_price": "Ngư trường truyền thống chủ quyền của ngư dân Việt Nam",
    "weather_temp": 28.0,
    "barometric_pressure_hpa": 1013.5,
    "wind_speed_kmh": 18.0,
    "fishing_bite_score": 96,
    "pro_tips": "Vùng biển đảo thiêng liêng của Tổ quốc Việt Nam. Đáy biển nhiều rạn san hô trù phú, là nơi săn các loài cá ngừ đại dương và cá mú đỏ khổng lồ trên 30kg.",
    "rating": 5.0,
    "image_url": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=Qu%E1%BA%A7n+%C4%91%E1%BA%A3o+Ho%C3%A0ng+Sa%2C+TP.+%C4%90%C3%A0+N%E1%BA%B5ng%2C+Vi%E1%BB%87t+Nam"
  },
  {
    "id": 24,
    "name": "Ngư Trường Quần Đảo Trường Sa",
    "slug": "ngu-truong-truong-sa",
    "lat": 9.5,
    "lng": 114.0,
    "province": "Tỉnh Khánh Hòa (Việt Nam)",
    "lake_type": "Ngư trường biển đảo chủ quyền Việt Nam",
    "water_depth_m": 60.0,
    "species_list": [
      "Cá Ngừ Vây Vàng",
      "Cá Mú Cọp",
      "Cá Bè Trang",
      "Cá Cờ Gòn",
      "Cá Thu Biển"
    ],
    "bait_guide": "Mồi câu Lure biển khơi: Mồi cá giả Minnow chống chịu lực cắn lớn, mồi mực lá sống nhử tầng sâu 40m - 70m.",
    "ticket_price": "Ngư trường truyền thống chủ quyền của ngư dân Việt Nam",
    "weather_temp": 29.5,
    "barometric_pressure_hpa": 1012.0,
    "wind_speed_kmh": 20.0,
    "fishing_bite_score": 98,
    "pro_tips": "Quần đảo tiền tiêu thiêng liêng của Tổ quốc Việt Nam. Luồng cá ngừ vây vàng di cư cực lớn, dòng hải lưu giàu dinh dưỡng thu hút các loài cá săn mồi kích thước khủng.",
    "rating": 5.0,
    "image_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=Qu%E1%BA%A7n+%C4%91%E1%BA%A3o+Tr%C6%B0%E1%BB%9Dng+Sa%2C+T%E1%BB%89nh+Kh%C3%A1nh+H%C3%B2a%2C+Vi%E1%BB%87t+Nam"
  },
  {
    "id": 25,
    "name": "Hồ Núi Cốc (Thái Nguyên)",
    "slug": "ho-nui-coc",
    "lat": 21.5815814,
    "lng": 105.6969788,
    "province": "Thái Nguyên",
    "lake_type": "Hồ thủy lợi du lịch sinh thái",
    "water_depth_m": 25.0,
    "species_list": [
      "Cá Trắm Đen",
      "Cá Chép",
      "Cá Trắm Trắng",
      "Cá Rô Phi",
      "Cá Trôi"
    ],
    "bait_guide": "Mồi ngô non luộc + cám gạo rang thơm + bột tỏi. Cá trắm đen thích mồi ốc bươu nghiền. Dùng phao lông công cá chép ăn rất nhạy.",
    "ticket_price": "Miễn phí (câu tự nhiên) / 100-200K VNĐ (khu dịch vụ)",
    "weather_temp": 24.5,
    "barometric_pressure_hpa": 1014.2,
    "wind_speed_kmh": 8.5,
    "fishing_bite_score": 82,
    "pro_tips": "Câu sáng sớm 5h-8h khu vực đảo Cọ. Mùa thu (tháng 9-11) cá trắm đen ăn mồi ốc rất mạnh. Thả mồi dẫn trước 30 phút.",
    "rating": 4.5,
    "image_url": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600",
    "google_maps_url": "https://www.google.com/maps/place/H%E1%BB%93+N%C3%BAi+C%E1%BB%91c/@21.5684375,105.6518467,13z/data=!3m1!4b1!4m6!3m5!1s0x3134dea8853204a9:0x23449a4c113da7c1!8m2!3d21.5815814!4d105.6969788!16s%2Fm%2F0cc905v?entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    "id": 26,
    "name": "Hồ Thác Bà (Yên Bái)",
    "slug": "ho-thac-ba",
    "lat": 21.7272222,
    "lng": 105.0213889,
    "province": "Yên Bái",
    "lake_type": "Hồ thủy điện vùng cao Tây Bắc",
    "water_depth_m": 50.0,
    "species_list": [
      "Cá Lăng",
      "Cá Chép",
      "Cá Trắm Đen",
      "Cá Trôi",
      "Cá Trắm Trắng"
    ],
    "bait_guide": "Câu cá lăng dùng mồi cá sống nhỏ (cá mương, cá rô) móc lưỡi đôi thả đáy sâu. Cá chép dùng ngô non + bột đậu nành rang.",
    "ticket_price": "Miễn phí (câu bờ) / 150K VNĐ (thuê thuyền)",
    "weather_temp": 22.0,
    "barometric_pressure_hpa": 1012.5,
    "wind_speed_kmh": 12.0,
    "fishing_bite_score": 78,
    "pro_tips": "Hồ rộng 23.400 ha, nên thuê thuyền ra các nhánh hồ sâu để câu cá lăng khủng. Mùa đông cá hay tụ ở các vịnh kín gió.",
    "rating": 4.6,
    "image_url": "https://images.unsplash.com/photo-1468245856972-a0333f3f8293?w=600",
    "google_maps_url": "https://www.google.com/maps/place/H%E1%BB%93+Th%C3%A1c+B%C3%A0/@21.726847,105.0130526,14.48z/data=!4m6!3m5!1s0x31335804d006b585:0x2aaf00943b154c4e!8m2!3d21.7272222!4d105.0213889!16s%2Fg%2F121nry42?entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    "id": 27,
    "name": "Hồ Cấm Sơn (Bắc Giang)",
    "slug": "ho-cam-son",
    "lat": 21.5360888,
    "lng": 106.5672462,
    "province": "Bắc Giang",
    "lake_type": "Hồ thủy lợi tự nhiên miền Đông Bắc",
    "water_depth_m": 30.0,
    "species_list": [
      "Cá Trắm Đen",
      "Cá Chép",
      "Cá Rô Phi",
      "Cá Trắm Trắng",
      "Cá Trôi"
    ],
    "bait_guide": "Mồi trùn quế + cám gạo cho cá chép. Mồi ốc bươu non cho cá trắm đen. Rau muống non cho cá trắm trắng.",
    "ticket_price": "Miễn phí (câu tự nhiên)",
    "weather_temp": 25.0,
    "barometric_pressure_hpa": 1013.8,
    "wind_speed_kmh": 7.5,
    "fishing_bite_score": 75,
    "pro_tips": "Hồ có nhiều cá trắm đen cỡ lớn 5-15kg. Câu ở các nhánh hồ hẹp, cạnh bìa rừng. Mang theo lều vì câu đêm rất hiệu quả.",
    "rating": 4.3,
    "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
    "google_maps_url": "https://www.google.com/maps/place/H%E1%BB%93+C%E1%BA%A5m+S%C6%A1n/@21.5352815,106.5285907,13z/data=!3m1!4b1!4m6!3m5!1s0x314aa70790e84a57:0xffc5df7d86a8a0de!8m2!3d21.5360888!4d106.5672462!16s%2Fm%2F0cc61b2?entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    "id": 28,
    "name": "Hồ Đại Lải (Vĩnh Phúc)",
    "slug": "ho-dai-lai",
    "lat": 21.3189269,
    "lng": 105.7145801,
    "province": "Vĩnh Phúc",
    "lake_type": "Hồ du lịch sinh thái resort",
    "water_depth_m": 15.0,
    "species_list": [
      "Cá Chép",
      "Cá Rô Phi",
      "Cá Trôi",
      "Cá Trắm Trắng"
    ],
    "bait_guide": "Mồi cám viên nén + ngô non cho cá chép. Cá rô phi thích mồi trùn quế hoặc mồi bột mì trộn tỏi.",
    "ticket_price": "50-100K VNĐ (vé câu cá giải trí)",
    "weather_temp": 26.0,
    "barometric_pressure_hpa": 1013.5,
    "wind_speed_kmh": 6.0,
    "fishing_bite_score": 72,
    "pro_tips": "Hồ gần Hà Nội (60km), phù hợp đi câu cuối tuần. Câu khu bờ phía Tây có nhiều cá chép vàng. Nên đến sớm trước 6h.",
    "rating": 4.1,
    "image_url": "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=600",
    "google_maps_url": "https://www.google.com/maps/place/H%E1%BB%93+%C4%90%E1%BA%A1i+L%E1%BA%A3i/@21.3184838,105.7047125,15.9z/data=!4m6!3m5!1s0x3134e33e55555555:0xeef2ddebb1cf45a!8m2!3d21.3189269!4d105.7145801!16s%2Fg%2F120w3m6j?entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D"
  },
  {
    "id": 29,
    "name": "Hồ Phú Ninh (Quảng Nam)",
    "slug": "ho-phu-ninh",
    "lat": 15.4725,
    "lng": 108.4567,
    "province": "Quảng Nam",
    "lake_type": "Hồ thủy lợi lớn miền Trung",
    "water_depth_m": 35.0,
    "species_list": [
      "Cá Chép",
      "Cá Trắm Đen",
      "Cá Rô Phi",
      "Cá Trôi",
      "Cá Lăng"
    ],
    "bait_guide": "Mồi trùn quế + tỏi nghiền cho cá chép. Cá lăng dùng mồi tép sống hoặc cá mương. Câu đáy sâu cho cá trắm đen.",
    "ticket_price": "Miễn phí (câu bờ tự nhiên)",
    "weather_temp": 27.5,
    "barometric_pressure_hpa": 1011.0,
    "wind_speed_kmh": 10.0,
    "fishing_bite_score": 76,
    "pro_tips": "Hồ rộng 2.300 ha, nhiều cá lăng và trắm đen lớn. Câu khu vực đập chính vào buổi chiều muộn 16h-19h hiệu quả nhất.",
    "rating": 4.4,
    "image_url": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+Ph%C3%BA+Ninh%2C+N%C3%BAi+Th%C3%A0nh%2C+Qu%E1%BA%A3ng+Nam"
  },
  {
    "id": 30,
    "name": "Đầm Lập An (Thừa Thiên Huế)",
    "slug": "dam-lap-an",
    "lat": 16.2256,
    "lng": 108.0133,
    "province": "Thừa Thiên Huế",
    "lake_type": "Đầm phá nước lợ ven biển",
    "water_depth_m": 5.0,
    "species_list": [
      "Cá Chẽm (Cá Vược)",
      "Cá Rô Phi",
      "Cá Quả (Cá Lóc)"
    ],
    "bait_guide": "Câu cá chẽm dùng mồi tôm sống hoặc mồi giả (lure) spoon bạc. Cá rô phi dùng mồi trùn quế thả nổi.",
    "ticket_price": "Miễn phí (câu tự nhiên ven đầm)",
    "weather_temp": 28.0,
    "barometric_pressure_hpa": 1010.5,
    "wind_speed_kmh": 14.0,
    "fishing_bite_score": 70,
    "pro_tips": "Đầm phá nước lợ nên cá chẽm rất nhiều. Câu lúc nước triều lên (4h-7h sáng) là hiệu quả nhất. Mang theo áo mưa vì thời tiết hay thay đổi.",
    "rating": 4.2,
    "image_url": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=%C4%90%E1%BA%A7m+L%E1%BA%ADp+An%2C+L%C4%83ng+C%C3%B4%2C+Ph%C3%BA+L%E1%BB%99c%2C+Th%E1%BB%ABa+Thi%C3%AAn+Hu%E1%BA%BF"
  },
  {
    "id": 31,
    "name": "Hồ Kẻ Gỗ (Hà Tĩnh)",
    "slug": "ho-ke-go",
    "lat": 18.1142,
    "lng": 106.0583,
    "province": "Hà Tĩnh",
    "lake_type": "Hồ thủy lợi tự nhiên Bắc Trung Bộ",
    "water_depth_m": 28.0,
    "species_list": [
      "Cá Trắm Đen",
      "Cá Chép",
      "Cá Trắm Trắng",
      "Cá Trôi",
      "Cá Rô Phi"
    ],
    "bait_guide": "Mồi ngô non luộc + cám viên cho cá chép. Cá trắm đen ở đáy ăn ốc bươu, trùn chỉ. Thả phao nổi cho cá trắm trắng.",
    "ticket_price": "Miễn phí (câu tự nhiên)",
    "weather_temp": 26.0,
    "barometric_pressure_hpa": 1012.0,
    "wind_speed_kmh": 9.0,
    "fishing_bite_score": 73,
    "pro_tips": "Khu bảo tồn thiên nhiên, cá tự nhiên rất lớn. Nên xin phép ban quản lý trước. Câu đêm cá trắm đen cắn rất mạnh.",
    "rating": 4.3,
    "image_url": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+K%E1%BA%BB+G%E1%BB%97%2C+C%E1%BA%A9m+Xuy%C3%AAn%2C+H%C3%A0+T%C4%A9nh"
  },
  {
    "id": 32,
    "name": "Hồ Búng Bình Thiên (An Giang)",
    "slug": "ho-bung-binh-thien",
    "lat": 10.8217,
    "lng": 105.0383,
    "province": "An Giang",
    "lake_type": "Hồ nước ngọt tự nhiên Đồng bằng sông Cửu Long",
    "water_depth_m": 8.0,
    "species_list": [
      "Cá Tra (Cá Tra Bò)",
      "Cá Quả (Cá Lóc)",
      "Cá Rô Phi",
      "Cá Trê",
      "Cá Chép"
    ],
    "bait_guide": "Mồi cá sống nhỏ (cá linh, cá mương) cho cá lóc. Cá tra dùng mồi bột cám viên. Cá trê thích mồi gan gà hoặc trùn quế.",
    "ticket_price": "Miễn phí (câu tự nhiên ven hồ)",
    "weather_temp": 30.0,
    "barometric_pressure_hpa": 1009.0,
    "wind_speed_kmh": 5.0,
    "fishing_bite_score": 80,
    "pro_tips": "Hồ nước ngọt tự nhiên lớn nhất miền Tây. Mùa nước nổi (tháng 8-11) cá lóc, cá trê cực nhiều. Câu bằng cần tay tre truyền thống rất thú vị.",
    "rating": 4.5,
    "image_url": "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=B%C3%BAng+B%C3%ACnh+Thi%C3%AAn%2C+An+Ph%C3%BA%2C+An+Giang"
  },
  {
    "id": 33,
    "name": "Kênh Vĩnh Tế (An Giang - Kiên Giang)",
    "slug": "kenh-vinh-te",
    "lat": 10.4833,
    "lng": 104.8333,
    "province": "An Giang / Kiên Giang",
    "lake_type": "Kênh đào lịch sử Tây Nam Bộ",
    "water_depth_m": 6.0,
    "species_list": [
      "Cá Quả (Cá Lóc)",
      "Cá Trê",
      "Cá Rô Phi",
      "Cá Tra (Cá Tra Bò)"
    ],
    "bait_guide": "Mồi nhái hoặc cá sống nhỏ cho cá lóc. Mồi trùn quế hoặc gan gà cho cá trê. Cá rô phi dùng mồi cám bột mì.",
    "ticket_price": "Miễn phí (câu tự do)",
    "weather_temp": 31.0,
    "barometric_pressure_hpa": 1008.5,
    "wind_speed_kmh": 4.0,
    "fishing_bite_score": 77,
    "pro_tips": "Kênh dài 87km biên giới Campuchia-Việt Nam. Câu cá lóc giật mồi nhái rất phổ biến. Mùa mưa (tháng 7-10) cá cực kỳ dồi dào.",
    "rating": 4.2,
    "image_url": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=K%C3%AAnh+V%C4%A9nh+T%E1%BA%BF%2C+Ch%C3%A2u+%C4%90%E1%BB%91c%2C+An+Giang"
  },
  {
    "id": 34,
    "name": "Hồ Tuyền Lâm (Đà Lạt)",
    "slug": "ho-tuyen-lam",
    "lat": 11.8975,
    "lng": 108.4256,
    "province": "Lâm Đồng (Đà Lạt)",
    "lake_type": "Hồ du lịch sinh thái cao nguyên",
    "water_depth_m": 18.0,
    "species_list": [
      "Cá Chép",
      "Cá Trắm Trắng",
      "Cá Rô Phi",
      "Cá Trôi"
    ],
    "bait_guide": "Mồi ngô non luộc + bột cám cho cá chép. Rau muống non cho cá trắm trắng. Trùn quế cho cá rô phi.",
    "ticket_price": "50K VNĐ (vé vào cổng) + câu tự do",
    "weather_temp": 20.0,
    "barometric_pressure_hpa": 1015.0,
    "wind_speed_kmh": 10.0,
    "fishing_bite_score": 68,
    "pro_tips": "Hồ ở độ cao 1.000m nên thời tiết mát mẻ quanh năm. Cá ăn mồi tốt nhất lúc 6h-9h sáng. Cảnh đẹp rất phù hợp câu cá thư giãn.",
    "rating": 4.4,
    "image_url": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+Tuy%E1%BB%81n+L%C3%A2m%2C+Ph%C6%B0%E1%BB%9Dng+4%2C+%C4%90%C3%A0+L%E1%BA%A1t%2C+L%C3%A2m+%C4%90%E1%BB%93ng"
  },
  {
    "id": 35,
    "name": "Hồ Lắk (Đắk Lắk)",
    "slug": "ho-lak",
    "lat": 12.3833,
    "lng": 108.1833,
    "province": "Đắk Lắk",
    "lake_type": "Hồ nước ngọt tự nhiên Tây Nguyên",
    "water_depth_m": 12.0,
    "species_list": [
      "Cá Chép",
      "Cá Trắm Trắng",
      "Cá Rô Phi",
      "Cá Quả (Cá Lóc)",
      "Cá Trê"
    ],
    "bait_guide": "Mồi ngô non + trùn quế cho cá chép. Mồi nhái cho cá lóc. Mồi gan gà + tỏi cho cá trê. Rau muống cho cá trắm trắng.",
    "ticket_price": "Miễn phí (câu tự nhiên ven hồ)",
    "weather_temp": 24.0,
    "barometric_pressure_hpa": 1013.0,
    "wind_speed_kmh": 6.5,
    "fishing_bite_score": 74,
    "pro_tips": "Hồ nước ngọt tự nhiên lớn nhất Tây Nguyên. Phong cảnh tuyệt đẹp với núi rừng bao quanh. Câu cá lóc giật mồi nhái rất thú vị vào sáng sớm.",
    "rating": 4.5,
    "image_url": "https://images.unsplash.com/photo-1500534314170-fe568bc6b1dc?w=600",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+L%E1%BA%AFk%2C+Li%C3%AAn+S%C6%A1n%2C+L%E1%BA%AFk%2C+%C4%90%E1%BA%AFk+L%E1%BA%AFk"
  },
  {
    "id": 36,
    "name": "Hồ Câu Vạn Phúc (Hà Đông, Hà Nội)",
    "slug": "ho-cau-van-phuc",
    "lat": 20.9683,
    "lng": 105.7692,
    "province": "Hà Nội",
    "lake_type": "Hồ câu dịch vụ nội thành",
    "water_depth_m": 3.5,
    "species_list": [
      "Cá Chép",
      "Cá Rô Phi",
      "Cá Trắm Trắng",
      "Cá Trôi"
    ],
    "bait_guide": "Mồi cám viên nén chuyên dụng + bột ngô. Cá chép thích mồi trùn quế + tỏi. Cá rô phi ăn mồi bột mì trộn tép khô.",
    "ticket_price": "100-200K VNĐ/buổi câu",
    "weather_temp": 27.0,
    "barometric_pressure_hpa": 1013.0,
    "wind_speed_kmh": 5.0,
    "fishing_bite_score": 70,
    "pro_tips": "Hồ câu dịch vụ gần trung tâm Hà Nội, phù hợp câu buổi tối sau giờ làm. Cá được thả định kỳ nên mật độ cao. Có dịch vụ cho thuê cần câu.",
    "rating": 3.9,
    "image_url": "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600",
    "google_maps_url": "https://www.google.com/maps/search/?api=1&query=H%E1%BB%93+c%C3%A2u+V%E1%BA%A1n+Ph%C3%BAc%2C+V%E1%BA%A1n+Ph%C3%BAc%2C+H%C3%A0+%C4%90%C3%B4ng%2C+H%C3%A0+N%E1%BB%99i"
  },
  {
    "id": 37,
    "name": "Sông Sài Gòn (Khu vực Bình Dương)",
    "slug": "song-sai-gon-binh-duong",
    "lat": 11.0167,
    "lng": 106.65,
    "province": "Bình Dương / TP.HCM",
    "lake_type": "Sông tự nhiên đoạn thượng nguồn",
    "water_depth_m": 10.0,
    "species_list": [
      "Cá Chẽm (Cá Vược)",
      "Cá Quả (Cá Lóc)",
      "Cá Tra (Cá Tra Bò)",
      "Cá Trê",
      "Cá Rô Phi"
    ],
    "bait_guide": "Mồi tôm sống / mồi giả lure cho cá chẽm. Mồi cá sống nhỏ cho cá lóc. Mồi gan gà + trùn quế cho cá trê.",
    "ticket_price": "Miễn phí (câu tự nhiên ven sông)",
    "weather_temp": 30.0,
    "barometric_pressure_hpa": 1009.5,
    "wind_speed_kmh": 8.0,
    "fishing_bite_score": 72,
    "pro_tips": "Câu cá chẽm bằng lure vào lúc nước triều lên rất hiệu quả. Đoạn sông qua Lái Thiêu - Thuận An có nhiều cá lớn. Mang theo đèn pin nếu câu đêm.",
    "rating": 4.0,
    "image_url": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600",
    "google_maps_url": "https://www.google.com/maps/place/B%E1%BA%BFn+%C4%91%C3%B2+S%C3%B4ng+S%C3%A0i+G%C3%B2n/@11.0167,106.65,14z"
  },
{
  "id": 38,
  "name": "Hồ Ba Bể",
  "slug": "ho-ba-be",
  "lat": 22.4098555,
  "lng": 105.6200234,
  "province": "Bắc Kạn",
  "lake_type": "Hồ tự nhiên nước ngọt lớn nhất miền Bắc (Vườn quốc gia)",
  "water_depth_m": 20.0,
  "species_list": [
    "Cá Chép Giòn",
    "Cá Trắm Cỏ",
    "Cá Măng",
    "Cá Lăng Nha",
    "Cá Chiên"
  ],
  "bait_guide": "Mồi ngô ngọt ủ chua, giun đào ven hồ, mồi thìa câu lure cá măng/cá lăng.",
  "ticket_price": "Miễn phí (thuê thuyền nan di chuyển ~200.000 VNĐ)",
  "weather_temp": 21.0,
  "barometric_pressure_hpa": 1015.0,
  "wind_speed_kmh": 6.0,
  "fishing_bite_score": 88,
  "pro_tips": "Sáng sớm sương mù cá măng săn mồi sát ghềnh đá. Cần trang bị dây dù chịu cọ xát vào đá vôi ngầm.",
  "rating": 4.8,
  "image_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
  "google_maps_url": "https://www.google.com/maps/place/H%E1%BB%93+Ba+B%E1%BB%83/@22.4098555,105.6200234,14z"
},
{
  "id": 39,
  "name": "Hồ Quan Sơn",
  "slug": "ho-quan-son-my-duc",
  "lat": 20.7077977,
  "lng": 105.7681283,
  "province": "Hà Nội",
  "lake_type": "Hồ cảnh quan ngập nước (Hạ Long trên cạn)",
  "water_depth_m": 4.5,
  "species_list": [
    "Cá Rô Phi",
    "Cá Trôi",
    "Cá Quả (Cá Lóc)",
    "Cá Trắm Cỏ"
  ],
  "bait_guide": "Mồi giun tươi, cám ngô rang thơm, tép tươi đánh bờ.",
  "ticket_price": "50.000 VNĐ / ngày (câu tự do)",
  "weather_temp": 24.0,
  "barometric_pressure_hpa": 1012.0,
  "wind_speed_kmh": 10.0,
  "fishing_bite_score": 82,
  "pro_tips": "Đầm sen và các bãi lau sậy là nơi cá quả ẩn náu cực nhiều. Lure nhái hơi hoặc mồi mềm lúc chập tối.",
  "rating": 4.5,
  "image_url": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
  "google_maps_url": "https://www.google.com/maps/place/H%E1%BB%93+Quan+S%C6%A1n/@20.7077977,105.7681283,14z"
},
{
  "id": 40,
  "name": "Hồ Yên Lập",
  "slug": "ho-yen-lap-quang-ninh",
  "lat": 21.0373801,
  "lng": 106.9244278,
  "province": "Quảng Ninh",
  "lake_type": "Hồ chứa nước ngọt nhân tạo lớn nhất Quảng Ninh",
  "water_depth_m": 18.0,
  "species_list": [
    "Cá Trắm Đen",
    "Cá Trắm Cỏ",
    "Cá Mè Hoa",
    "Cá Chép"
  ],
  "bait_guide": "Ốc vặn đập dập ủ đỗ tương rang, khoai lang nướng bóp thính mè.",
  "ticket_price": "100.000 VNĐ / ngày (khu vực dịch vụ)",
  "weather_temp": 22.5,
  "barometric_pressure_hpa": 1014.0,
  "wind_speed_kmh": 11.0,
  "fishing_bite_score": 86,
  "pro_tips": "Đáy hồ dốc sâu, cần thăm dò hố đáy trước khi xả mồi ổ. Đánh tầm xa 40-60m vào hốc chân núi.",
  "rating": 4.6,
  "image_url": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
  "google_maps_url": "https://www.google.com/maps/place/H%E1%BB%93+Y%C3%AAn+L%E1%BA%ADp/@21.0373801,106.9244278,14z"
},
{
  "id": 41,
  "name": "Đầm Vân Long",
  "slug": "dam-van-long-ninh-binh",
  "lat": 20.3703992,
  "lng": 105.8849865,
  "province": "Ninh Bình",
  "lake_type": "Khu đất ngập nước tự nhiên lớn nhất đồng bằng Bắc Bộ",
  "water_depth_m": 3.5,
  "species_list": [
    "Cá Chép",
    "Cá Trôi",
    "Cá Rô Đồng",
    "Cá Trê Đồng",
    "Cá Chuối (Cá Lóc)"
  ],
  "bait_guide": "Trùn quế, tép rong ủ bùn, thính gạo rang trộn mỡ hành.",
  "ticket_price": "Miễn phí khu ngoài đê / Khu sinh thái theo quy định",
  "weather_temp": 23.0,
  "barometric_pressure_hpa": 1013.5,
  "wind_speed_kmh": 8.0,
  "fishing_bite_score": 85,
  "pro_tips": "Nước cực trong nhìn thấu rong rêu đáy. Nên chọn điểm câu rạng rong, dùng cước mảnh tàng hình.",
  "rating": 4.7,
  "image_url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
  "google_maps_url": "https://www.google.com/maps/place/Khu+b%E1%BA%A3o+t%E1%BB%93n+thi%C3%AAn+nhi%C3%AAn+%C4%91%E1%BA%A5t+ng%E1%BA%ADp+n%C6%B0%E1%BB%9Bc+V%C3%A2n+Long/@20.3703992,105.8849865,14z"
},
{
  "id": 42,
  "name": "Hồ Tiên Sa",
  "slug": "ho-tien-sa-ba-vi",
  "lat": 21.1091568,
  "lng": 105.3892405,
  "province": "Hà Nội",
  "lake_type": "Hồ du lịch sinh thái chân núi Tản Viên",
  "water_depth_m": 8.0,
  "species_list": [
    "Cá Trắm Đen",
    "Cá Chép",
    "Cá Trôi Ấn Độ",
    "Cá Rô Phi"
  ],
  "bait_guide": "Cám tanh tổng hợp trộn khoai môn ủ chua; ốc sống rửa sạch dập nhẹ.",
  "ticket_price": "250.000 VNĐ / ca 5 tiếng",
  "weather_temp": 22.0,
  "barometric_pressure_hpa": 1014.0,
  "wind_speed_kmh": 7.0,
  "fishing_bite_score": 84,
  "pro_tips": "Không khí trong lành mát mẻ quanh năm. Vị trí câu đài đầu bờ kè hoặc nhà chòi nổi rất hút cá chép cụ.",
  "rating": 4.4,
  "image_url": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800",
  "google_maps_url": "https://www.google.com/maps/place/H%E1%BB%93+Ti%C3%AAn+Sa/@21.1091568,105.3892405,14z"
},
{
  "id": 43,
  "name": "Hồ Thủy Điện Sông Hinh",
  "slug": "ho-song-hinh-phu-yen",
  "lat": 12.9216447,
  "lng": 109.1134125,
  "province": "Phú Yên",
  "lake_type": "Hồ thủy điện đại ngàn miền Trung",
  "water_depth_m": 25.0,
  "species_list": [
    "Cá Thác Lác",
    "Cá Lăng Nha",
    "Cá Trắm Cỏ",
    "Cá Ngựa Nam",
    "Cá Lóc"
  ],
  "bait_guide": "Mồi trùn hổ ủ xốt tỏi, tôm suối bắt sống, mồi cá vụn đánh đáy ghềnh đá.",
  "ticket_price": "Miễn phí (câu hoang dã quanh hồ)",
  "weather_temp": 27.0,
  "barometric_pressure_hpa": 1011.0,
  "wind_speed_kmh": 9.0,
  "fishing_bite_score": 90,
  "pro_tips": "Điểm câu lý tưởng cho cần thủ thích săn cá lăng khủng và cá thác lác cườm. Nên câu neo thuyền thúng vào ban đêm.",
  "rating": 4.7,
  "image_url": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
  "google_maps_url": "https://www.google.com/maps/place/Th%E1%BB%A7y+%C4%91i%E1%BB%87n+S%C3%B4ng+Hinh/@12.9216447,109.1134125,14z"
},
{
  "id": 44,
  "name": "Hồ Ea Kao",
  "slug": "ho-ea-kao-dak-lak",
  "lat": 12.6074211,
  "lng": 108.074496,
  "province": "Đắk Lắk",
  "lake_type": "Hồ thủy lợi Tây Nguyên rộng lớn",
  "water_depth_m": 7.0,
  "species_list": [
    "Cá Chép",
    "Cá Thác Lác",
    "Cá Trôi",
    "Cá Rô Phi",
    "Cá Lóc"
  ],
  "bait_guide": "Cám gạo rang trộn khoai lang ngọt và bơ, mồi giun đỏ Tây Nguyên.",
  "ticket_price": "Miễn phí ven hồ / Chòi nuôi cá 50.000 VNĐ",
  "weather_temp": 25.0,
  "barometric_pressure_hpa": 1012.5,
  "wind_speed_kmh": 12.0,
  "fishing_bite_score": 87,
  "pro_tips": "Mùa nước cạn (tháng 3-5) tập trung cá ở eo lòng chảo. Cá thác lác và rô phi đĩa to bằng bàn tay ăn mồi liên tục.",
  "rating": 4.6,
  "image_url": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
  "google_maps_url": "https://www.google.com/maps/place/H%E1%BB%93+Ea+Kao/@12.6074211,108.074496,14z"
},
{
  "id": 45,
  "name": "Đầm Ô Loan",
  "slug": "dam-o-loan-phu-yen",
  "lat": 13.2568601,
  "lng": 109.3024342,
  "province": "Phú Yên",
  "lake_type": "Đầm nước lợ thông ra biển nổi tiếng danh thắng quốc gia",
  "water_depth_m": 3.0,
  "species_list": [
    "Cá Chẽm (Cá Vược)",
    "Cá Măng Biển",
    "Cá Dìa",
    "Cá Đối",
    "Cá Mú Đen"
  ],
  "bait_guide": "Tôm đất sống lội đầm, cua con lột vỏ, trùn biển hoặc lure cá nhỏ.",
  "ticket_price": "Miễn phí ven bờ đầm / Thuê thuyền 150.000 VNĐ",
  "weather_temp": 28.0,
  "barometric_pressure_hpa": 1010.5,
  "wind_speed_kmh": 14.0,
  "fishing_bite_score": 91,
  "pro_tips": "Sát thời điểm con nước lớn đổ vào đầm (triều cường) là giờ hoàng đạo cá chẽm và cá dìa cắn câu mạnh nhất.",
  "rating": 4.8,
  "image_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
  "google_maps_url": "https://www.google.com/maps/place/%C4%90%E1%BA%A7m+%C3%94+Loan/@13.2568601,109.3024342,14z"
},
{
  "id": 46,
  "name": "Hồ Đa Mi",
  "slug": "ho-da-mi-binh-thuan",
  "lat": 11.3789454,
  "lng": 107.8893791,
  "province": "Bình Thuận",
  "lake_type": "Hồ thủy điện vùng cao nguyên giáp Lâm Đồng",
  "water_depth_m": 35.0,
  "species_list": [
    "Cá Tầm",
    "Cá Trắm Đen",
    "Cá Lăng Nha",
    "Cá Chép Tây Nguyên"
  ],
  "bait_guide": "Cám viên cá tầm độ đạm cao, gan bò ủ mốc, dế cơm hoặc nhái bén.",
  "ticket_price": "Miễn phí khu vực ven hồ / Dịch vụ bè cá 150.000 VNĐ",
  "weather_temp": 24.5,
  "barometric_pressure_hpa": 1013.0,
  "wind_speed_kmh": 8.5,
  "fishing_bite_score": 89,
  "pro_tips": "Nước hồ trong xanh quanh năm, nhiệt độ nước mát mẻ nơi nuôi cá tầm xuất khẩu. Cá rất khỏe, cần cước trục trên 6.0.",
  "rating": 4.7,
  "image_url": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
  "google_maps_url": "https://www.google.com/maps/place/H%E1%BB%93+%C4%90a+Mi/@11.3789454,107.8893791,14z"
},
{
  "id": 47,
  "name": "Sông Vàm Cỏ Đông (Bến Lức)",
  "slug": "song-vam-co-dong-long-an",
  "lat": 10.6865293,
  "lng": 106.4102959,
  "province": "Long An / Tây Ninh",
  "lake_type": "Sông tự nhiên phù sa Nam Bộ",
  "water_depth_m": 8.5,
  "species_list": [
    "Cá Tra Bò",
    "Cá Ngát",
    "Cá Lăng Vàng",
    "Cá Chẽm",
    "Tôm Càng Xanh"
  ],
  "bait_guide": "Mồi tép sống câu tôm càng, mồi cám tra béo trộn dầu chuối, trùng huyết câu ngát.",
  "ticket_price": "Miễn phí dọc bờ kè và bến đò",
  "weather_temp": 29.5,
  "barometric_pressure_hpa": 1009.0,
  "wind_speed_kmh": 7.0,
  "fishing_bite_score": 88,
  "pro_tips": "Đặc sản câu đêm tôm càng xanh và cá ngát sông Vàm Cỏ. Chú ý mang kẹp ngạnh cá ngát để tránh bị đâm.",
  "rating": 4.5,
  "image_url": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600",
  "google_maps_url": "https://www.google.com/maps/place/S%C3%B4ng+V%C3%A0m+C%E1%BB%8F+%C4%90%C3%B4ng/@10.6865293,106.4102959,14z"
},
{
  "id": 48,
  "name": "Đầm Vực",
  "slug": "dam-vuc-ha-tinh",
  "lat": 18.2585217,
  "lng": 105.9521345,
  "province": "Hà Tĩnh",
  "lake_type": "Đầm tự nhiên huyền thoại - Lễ hội đánh cá truyền thống",
  "water_depth_m": 5.0,
  "species_list": [
    "Cá Chép",
    "Cá Trắm Cỏ",
    "Cá Lóc Đồng",
    "Cá Diếc",
    "Cá Mè Hoa"
  ],
  "bait_guide": "Mồi thính ngô ủ tương nếp, cơm nguội trộn trứng kiến, giun chỉ.",
  "ticket_price": "Miễn phí ngoài mùa lễ hội",
  "weather_temp": 25.5,
  "barometric_pressure_hpa": 1012.0,
  "wind_speed_kmh": 11.0,
  "fishing_bite_score": 83,
  "pro_tips": "Đầm có nhiều vũng bùn tự nhiên tích tụ phù sa, cá chép và cá trắm ăn rất dạn vào lúc sáng tinh mơ và hoàng hôn.",
  "rating": 4.6,
  "image_url": "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800",
  "google_maps_url": "https://www.google.com/maps/place/%C4%90%E1%BA%A7m+V%E1%BB%B1c/@18.2585217,105.9521345,14z"
},
{
  "id": 49,
  "name": "Hồ Yên Trung",
  "slug": "ho-yen-trung-quang-ninh",
  "lat": 21.0543201,
  "lng": 106.7723412,
  "province": "Quảng Ninh",
  "lake_type": "Hồ thung lũng thông reo thơ mộng (Đà Lạt thu nhỏ Quảng Ninh)",
  "water_depth_m": 12.0,
  "species_list": [
    "Cá Trắm Cỏ",
    "Cá Chép",
    "Cá Rô Phi Hoàng Kim",
    "Cá Quả"
  ],
  "bait_guide": "Mồi ngô ngọt hạt, cám thơm mùi hoa quả ủ chua dịu, giun đỏ câu đài.",
  "ticket_price": "100.000 VNĐ / ngày",
  "weather_temp": 22.0,
  "barometric_pressure_hpa": 1014.5,
  "wind_speed_kmh": 9.0,
  "fishing_bite_score": 86,
  "pro_tips": "Bờ thông bóng mát râm ran quanh năm. Cần thủ nên chọn vị trí mũi đất nhô ra giữa hồ để có góc buông cần thoáng nhất.",
  "rating": 4.7,
  "image_url": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800",
  "google_maps_url": "https://www.google.com/maps/place/H%E1%BB%93+Y%C3%AAn+Trung/@21.0543201,106.7723412,14z"
}
];

const DEFAULT_SPECIES = [
  {
    "id": 14,
    "common_name": "Cá Trắm Đen",
    "scientific_name": "Mylopharyngodon piceus",
    "family": "Họ Cá chép (Cyprinidae)",
    "habitat": "Nước ngọt, hồ sâu đáy bùn đất, hồ thủy điện lớn",
    "water_layer": "Tầng đáy sát bùn (1.5m - 8m)",
    "optimal_pressure_hpa": "1010 - 1016 hPa (Cực nhạy khi áp suất cao)",
    "best_baits": "Ốc vặn sống rửa sạch đập nứt vỏ, ủ trứng vịt lộn hoặc mầm lúa 24h. Cám tanh vảy cá hồi nghiền nhuyễn.",
    "tackle_technique": "Câu đài săn hàng (Cần 7H - 9H, phao ngày đêm), câu Lục bề mặt rộng (Lục số 8-10).",
    "feeding_peak_hours": "20:00 - 03:00 sáng & 05:00 - 08:00 sáng",
    "allometric_a": 0.0112,
    "allometric_b": 3.11,
    "max_record_kg": 45.0,
    "description": "Vua săn hàng nước ngọt tại Việt Nam. Thịt chắc nịch, thớ thịt dày ngọt đậm, da cá dày giòn béo ngậy.",
    "culinary_recipes": [
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
    ]
  },
  {
    "id": 15,
    "common_name": "Cá Chép",
    "scientific_name": "Cyprinus carpio",
    "family": "Họ Cá chép (Cyprinidae)",
    "habitat": "Ao hồ sông suối nước ngọt chảy chậm hoặc tĩnh",
    "water_layer": "Tầng đáy (0.8m - 3.5m)",
    "optimal_pressure_hpa": "1008 - 1014 hPa",
    "best_baits": "Khoai lang nướng mật ong, ngô ngọt luộc xay, thính thơm đậu tương rang, mồi giun đỏ quế.",
    "tackle_technique": "Câu đài nhấp thẻo đôi, lưỡi không ngạnh, dây cước mềm 1.5 - 2.5.",
    "feeding_peak_hours": "06:00 - 09:30 & 16:30 - 20:00",
    "allometric_a": 0.0165,
    "allometric_b": 3.01,
    "max_record_kg": 28.5,
    "description": "Loài cá biểu tượng thông minh, ranh mãnh. Thịt cá mềm thơm, giàu dinh dưỡng, đặc biệt béo ngậy phần bụng.",
    "culinary_recipes": [
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
    ]
  },
  {
    "id": 16,
    "common_name": "Cá Tra (Cá Tra Bò)",
    "scientific_name": "Pangasianodon hypophthalmus",
    "family": "Họ Cá tra (Pangasiidae)",
    "habitat": "Hồ dịch vụ, sông Mekong, sông Đồng Nai",
    "water_layer": "Tầng lửng đến đáy (1.0m - 5.0m)",
    "optimal_pressure_hpa": "1005 - 1012 hPa",
    "best_baits": "Bún lên men chua cay, bánh mì sandwich ngâm sữa béo đặc, chùm nho mồi cám tanh D1-D2.",
    "tackle_technique": "Cần máy bạo lực (2.7m - 3.6m), máy câu kim loại size 4000-6000, dây PE 3.0-5.0.",
    "feeding_peak_hours": "11:00 - 14:00 (Nắng gắt cá ăn mạnh) & Chập tối",
    "allometric_a": 0.0094,
    "allometric_b": 3.17,
    "max_record_kg": 35.0,
    "description": "Cá da trơn lực lưỡng, thớ thịt dày trắng phau, lớp mỡ ngậy béo giàu Omega-3 tan chảy thơm lừng.",
    "culinary_recipes": [
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
    ]
  },
  {
    "id": 17,
    "common_name": "Cá Quả (Cá Lóc)",
    "scientific_name": "Channa striata",
    "family": "Họ Cá quả (Channidae)",
    "habitat": "Đầm lầy, ruộng ngập, kênh rạch cỏ dại, mép hồ",
    "water_layer": "Tầng mặt và tầng lửng sát bèo mép nước",
    "optimal_pressure_hpa": "1006 - 1015 hPa",
    "best_baits": "Mồi giả Lure: Nhái hơi nhảy (Jump Frog), Soft bait sâu cao su gắp thìa, cá sắt vibrator. Mồi sống: Nhái bén tươi.",
    "tackle_technique": "Bộ cần Lure chuyên dụng (Action Medium/Medium Heavy), máy ngang (Baitcaster) ra mồi chuẩn xác mép bèo.",
    "feeding_peak_hours": "05:30 - 08:00 sáng & 16:00 - 18:30 chiều",
    "allometric_a": 0.0088,
    "allometric_b": 3.14,
    "max_record_kg": 9.8,
    "description": "Thịt cá quả ít xương dăm, thịt nạc trắng phau chắc nịch, vị ngọt thanh tự nhiên rất lành tính.",
    "culinary_recipes": [
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
    ]
  },
  {
    "id": 18,
    "common_name": "Cá Chẽm (Cá Vược)",
    "scientific_name": "Lates calcarifer",
    "family": "Họ Cá chẽm (Latidae)",
    "habitat": "Vùng nước lợ, cửa sông, hồ nước mặn/ngọt nhân tạo",
    "water_layer": "Tầng lửng gần các cọc cống, mỏm đá ngầm",
    "optimal_pressure_hpa": "1008 - 1014 hPa (Rất thích ngày con nước lớn)",
    "best_baits": "Tôm sống búng tanh tách, cá mồi con (cá đối nhỏ), mồi lure Minnow chìm chậm lấp lánh.",
    "tackle_technique": "Cần lure biển/nước lợ độ cứng M/MH, dây dẫn Shockleader chống cọ xát nắp mang cá cực sắc.",
    "feeding_peak_hours": "Nước ròng chuyển sang nước lớn (Thủy triều lên) & Ban đêm",
    "allometric_a": 0.0125,
    "allometric_b": 3.08,
    "max_record_kg": 26.5,
    "description": "Thịt cá chẽm trắng tinh, thơm mịn, vị ngọt thanh đậm đà của hải sản nước lợ, rất ít xương dăm.",
    "culinary_recipes": [
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
    ]
  },
  {
    "id": 19,
    "common_name": "Cá Lăng",
    "scientific_name": "Hemibagrus wyckioides",
    "family": "Họ Cá lăng (Bagridae)",
    "habitat": "Sông sâu nước chảy xiết, hồ đá ngầm hiểm trở",
    "water_layer": "Tầng đáy nhiều gộp đá (2m - 12m)",
    "optimal_pressure_hpa": "1008 - 1015 hPa",
    "best_baits": "Mồi giun đất khổng lồ, ruột gà ủ tanh chua, tép tươi nhảy tanh tách.",
    "tackle_technique": "Cần đài bạo lực hoặc cần ngâm chì neo dòng nước chảy.",
    "feeding_peak_hours": "21:00 - 04:00 sáng (Cá săn đêm)",
    "allometric_a": 0.0076,
    "allometric_b": 3.22,
    "max_record_kg": 30.0,
    "description": "Đặc sản thượng hạng của sông Đà và Tây Nguyên. Thịt cá dẻo quánh, không một cọng xương dăm, thơm bùi ngậy béo.",
    "culinary_recipes": [
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
    ]
  },
  {
    "id": 20,
    "common_name": "Cá Ngừ Đại Dương",
    "scientific_name": "Thunnus albacares",
    "family": "Họ Cá thu ngừ (Scombridae)",
    "habitat": "Vùng biển khơi xa Hoàng Sa & Trường Sa",
    "water_layer": "Tầng mặt đến tầng lửng biển sâu (10m - 100m)",
    "optimal_pressure_hpa": "1012 - 1016 hPa",
    "best_baits": "Mồi câu Jigging 200g - 400g dạ quang, mồi cá nục tươi, Popper bọt nước.",
    "tackle_technique": "Cần câu biển hạng nặng tải dây PE 6.0 - 8.0, máy câu biển size 14000 - 20000.",
    "feeding_peak_hours": "Rạng sáng 04:00 - 07:00 & Hoàng hôn",
    "allometric_a": 0.0142,
    "allometric_b": 3.02,
    "max_record_kg": 95.0,
    "description": "Thủy quái đại dương dũng mãnh. Thịt đỏ au giàu đạm tinh khiết, từng thớ thịt săn chắc ngọt lịm.",
    "culinary_recipes": [
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
    ]
  },
  {
    "id": 21,
    "common_name": "Cá Rô Phi",
    "scientific_name": "Oreochromis niloticus",
    "family": "Họ Cá rô phi (Cichlidae)",
    "habitat": "Ao hồ sông ngòi, đầm lầy, nước lợ và nước ngọt toàn quốc",
    "water_layer": "Tầng giữa và tầng đáy (0.5m - 2.5m)",
    "optimal_pressure_hpa": "1008 - 1014 hPa",
    "best_baits": "Cám tôm tanh, bột đậu xanh rang, tép sông vụn, mồi giun đỏ quế.",
    "tackle_technique": "Câu đài thẻo đôi phao ngắn, câu lục mép bèo.",
    "feeding_peak_hours": "07:00 - 10:30 & 15:30 - 18:30",
    "allometric_a": 0.0182,
    "allometric_b": 2.97,
    "max_record_kg": 4.5,
    "description": "Loài cá quen thuộc vô cùng háu ăn, sinh trưởng nhanh. Thớ thịt nạc trắng, ngọt bùi, dễ chế biến nhiều món ngon dân dã.",
    "culinary_recipes": [
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
    ]
  },
  {
    "id": 22,
    "common_name": "Cá Trê",
    "scientific_name": "Clarias gariepinus / batrachus",
    "family": "Họ Cá trê (Clariidae)",
    "habitat": "Đáy bùn ao hồ tĩnh, kênh rạch, hồ đập nước đọng",
    "water_layer": "Tầng đáy sát bùn ngập ngụa hữu cơ (1.0m - 4.0m)",
    "optimal_pressure_hpa": "1005 - 1012 hPa (Có cơ quan thở khí trời, chịu oxy thấp cực tốt)",
    "best_baits": "Gan lợn ủ tanh, ruột gà, trùn hổ, cá mồi cắt khúc ủ mắm tôm.",
    "tackle_technique": "Câu ngâm đáy chì neo tải nặng, câu cần tay đêm sát mép cống.",
    "feeding_peak_hours": "19:00 - 02:00 sáng (Săn mồi ban đêm)",
    "allometric_a": 0.0068,
    "allometric_b": 3.24,
    "max_record_kg": 18.0,
    "description": "Cá da trơn lực lưỡng sống sát đáy bùn. Thịt béo ngậy, ngọt đậm đà, giàu đạm và lipid bổ dưỡng.",
    "culinary_recipes": [
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
    ]
  },
  {
    "id": 23,
    "common_name": "Cá Trôi",
    "scientific_name": "Cirrhinus mrigala",
    "family": "Họ Cá chép (Cyprinidae)",
    "habitat": "Hồ thủy lợi, sông lớn đáy bùn cát, hồ câu dịch vụ",
    "water_layer": "Tầng đáy (1.5m - 5.0m)",
    "optimal_pressure_hpa": "1010 - 1016 hPa",
    "best_baits": "Bột ngô lên men chua, khoai lang ủ chua mộc, cám tanh vừa, thính thơm đậu nành.",
    "tackle_technique": "Câu đài phao nhạy thẻo dài mảnh (cá ăn hút mồi rất khẽ), câu lục bề mặt.",
    "feeding_peak_hours": "06:30 - 09:30 & 16:00 - 19:30",
    "allometric_a": 0.0118,
    "allometric_b": 3.08,
    "max_record_kg": 16.0,
    "description": "Thân thon dài vảy nhỏ ánh đồng, lực bơi phóng ban đầu cực nhanh và dẻo dai. Thịt cá thơm ngọt bùi béo.",
    "culinary_recipes": [
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
    ]
  },
  {
    "id": 24,
    "common_name": "Cá Trắm Trắng",
    "scientific_name": "Ctenopharyngodon idella",
    "family": "Họ Cá chép (Cyprinidae)",
    "habitat": "Hồ thủy lợi rộng, hồ tự nhiên nhiều rong cỏ, hồ dịch vụ săn hàng",
    "water_layer": "Tầng giữa và tầng nổi (0.5m - 2.5m)",
    "optimal_pressure_hpa": "1010 - 1015 hPa",
    "best_baits": "Lá sắn non vò nát, ngô ngọt ủ mầm bia, cám thơm thảo mộc vị hoa quả, cỏ mật tươi.",
    "tackle_technique": "Câu đài phao nổi rơi lửng lơ, câu lục bề mặt, lưỡi câu nhẹ.",
    "feeding_peak_hours": "06:00 - 10:00 sáng & 15:30 - 18:30 chiều",
    "allometric_a": 0.0121,
    "allometric_b": 3.06,
    "max_record_kg": 40.0,
    "description": "Thân thon dài màu trắng bạc óng ánh, miệng tròn không râu. Thịt cá trắng muốt, thớ thịt dày chắc ngọt đậm đà.",
    "culinary_recipes": [
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
    ]
  }
];

const DEFAULT_LEADERBOARD = [
  {
    "id": 1,
    "angler_name": "Nguyễn Thành Long (Long Trắm Đen)",
    "claimed_species": "Cá Trắm Đen",
    "claimed_weight_kg": 24.5,
    "claimed_length_cm": 118.0,
    "recorded_weight_kg": 24.5,
    "recorded_length_cm": 118.0,
    "lake_name": "Hồ Hòa Bình (Sông Đà)",
    "lake_id": 7,
    "date_caught": "2026-10-18",
    "image_url": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop",
    "ai_verified": 1,
    "verification_status": "APPROVED_USER_DATA",
    "accepted_mode": "USER_APPROVED",
    "discrepancy_pct": 2.1,
    "lens_distortion_detected": 0,
    "certificate_hash": "CERT-HB-2450-AI-PASS",
    "verification_log": "AI xác thực: Không phát hiện zoom 0.5x (Tiêu cự 28mm chuẩn). Độ sai số so với khối lượng sinh trắc học 2.1% (<=15%). Duyệt số liệu người dùng."
  },
  {
    "id": 2,
    "angler_name": "Trần Minh Hùng (Hùng Cần Thơ)",
    "claimed_species": "Cá Tra",
    "claimed_weight_kg": 18.5,
    "claimed_length_cm": 106.0,
    "recorded_weight_kg": 18.5,
    "recorded_length_cm": 106.0,
    "lake_name": "Hồ Trị An (Vĩnh Cửu)",
    "lake_id": 3,
    "date_caught": "2026-10-22",
    "image_url": "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600&auto=format&fit=crop",
    "ai_verified": 1,
    "verification_status": "APPROVED_USER_DATA",
    "accepted_mode": "USER_APPROVED",
    "discrepancy_pct": 3.4,
    "lens_distortion_detected": 0,
    "certificate_hash": "CERT-TA-1850-AI-PASS",
    "verification_log": "AI xác thực: Ảnh camera iPhone 15 Pro tiêu cự 24mm chính hãng. Sai số sinh trắc học 3.4%. Chấp thuận kỷ lục cá tra khổng lồ."
  },
  {
    "id": 3,
    "angler_name": "Lê Hoàng Anh (Anh Sóc Sơn)",
    "claimed_species": "Cá Trắm Đen",
    "claimed_weight_kg": 15.0,
    "claimed_length_cm": 75.0,
    "recorded_weight_kg": 7.5,
    "recorded_length_cm": 75.0,
    "lake_name": "Hồ Đồng Đò (Sóc Sơn)",
    "lake_id": 2,
    "date_caught": "2026-11-02",
    "image_url": "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600&auto=format&fit=crop",
    "ai_verified": 1,
    "verification_status": "APPROVED_AI_ADJUSTED",
    "accepted_mode": "AI_ADJUSTED_APPROVED",
    "discrepancy_pct": 100.0,
    "lens_distortion_detected": 0,
    "certificate_hash": "CERT-DD-0750-AI-ADJ",
    "verification_log": "AI cảnh báo: Khai báo 15kg nhưng quét thể tích thực tế cá chỉ đạt 7.5kg (Chênh lệch 100% > ngưỡng 15%). Tự động hạ về chuẩn AI 7.5kg."
  },
  {
    "id": 4,
    "angler_name": "Vũ Đức Trí (Trí Lure)",
    "claimed_species": "Cá Quả (Cá Lóc)",
    "claimed_weight_kg": 5.8,
    "claimed_length_cm": 72.0,
    "recorded_weight_kg": 5.8,
    "recorded_length_cm": 72.0,
    "lake_name": "Hồ Trị An (Vĩnh Cửu)",
    "lake_id": 3,
    "date_caught": "2026-11-05",
    "image_url": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop",
    "ai_verified": 1,
    "verification_status": "APPROVED_USER_DATA",
    "accepted_mode": "USER_APPROVED",
    "discrepancy_pct": 1.8,
    "lens_distortion_detected": 0,
    "certificate_hash": "CERT-TA-0580-AI-PASS",
    "verification_log": "AI xác thực: Mồi nhái hơi Frog Lure. Chiều dài chuẩn thước đo 72cm. Cân nặng 5.8kg hoàn toàn phù hợp công thức ngư học."
  },
  {
    "id": 5,
    "angler_name": "Đặng Quốc Việt (Việt Đài Thủ)",
    "claimed_species": "Cá Chép",
    "claimed_weight_kg": 7.8,
    "claimed_length_cm": 74.0,
    "recorded_weight_kg": 7.8,
    "recorded_length_cm": 74.0,
    "lake_name": "Hồ Tây (West Lake)",
    "lake_id": 1,
    "date_caught": "2026-11-09",
    "image_url": "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=600&auto=format&fit=crop",
    "ai_verified": 1,
    "verification_status": "APPROVED_USER_DATA",
    "accepted_mode": "USER_APPROVED",
    "discrepancy_pct": 4.2,
    "lens_distortion_detected": 0,
    "certificate_hash": "CERT-HT-0780-AI-PASS",
    "verification_log": "AI xác thực: Cá chép cụ vảy vàng Hồ Tây. Cần thủ chụp vuông góc chuẩn, chênh lệch 4.2% nằm trong hạn mức."
  }
];

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
  initRecipesView();
  if (window.lucide) {
    lucide.createIcons();
  }
});

// Tab Navigation
function switchTab(tabName) {
  state.activeTab = tabName;

  // Toggle views
  const views = ['map', 'weather', 'species', 'recipes', 'leaderboard', 'verifier'];
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

    // Mobile nav tab buttons active style
    const mBtn = document.getElementById(`mobile-tab-${v}`);
    if (mBtn) {
      if (v === tabName) {
        mBtn.className = 'mobile-tab px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-400 whitespace-nowrap font-bold';
      } else {
        mBtn.className = 'mobile-tab px-3 py-1.5 rounded-lg text-slate-400 whitespace-nowrap';
      }
    }
  });

  // Re-invalidate map size if switching to map
  if (tabName === 'map' && state.mapInstance) {
    setTimeout(() => {
      state.mapInstance.invalidateSize();
    }, 200);
  }

  // Auto-init recipes if opening recipes tab
  if (tabName === 'recipes') {
    initRecipesView();
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
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json) && json.length > 0) {
        state.lakes = json;
        updateLakeDropdowns();
        return;
      }
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        state.lakes = json.data;
        updateLakeDropdowns();
        return;
      }
    }
  } catch (err) {
    console.warn('Backend API /api/lakes không phản hồi, tự động dùng dữ liệu tĩnh:', err);
  }

  // Fallback 1: Try static data/lakes.json
  try {
    const res2 = await fetch('data/lakes.json');
    if (res2.ok) {
      const data2 = await res2.json();
      if (Array.isArray(data2) && data2.length > 0) {
        state.lakes = data2;
        updateLakeDropdowns();
        return;
      }
    }
  } catch (e2) {}

  // Fallback 2: Direct static embedded dataset
  console.log('[FishMap VN] Đã nạp 30 điểm câu từ bộ dữ liệu tĩnh (Chế độ Vercel/Static)');
  state.lakes = DEFAULT_LAKES;
  updateLakeDropdowns();
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
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json) && json.length > 0) {
        state.species = json;
        renderSpeciesGrid(json);
        return;
      }
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        state.species = json.data;
        renderSpeciesGrid(json.data);
        return;
      }
    }
  } catch (err) {
    console.warn('Backend API /api/species không phản hồi, thử tải từ static data:', err);
  }

  // Fallback 1: Try static data/species.json
  try {
    const res2 = await fetch('data/species.json');
    if (res2.ok) {
      const data2 = await res2.json();
      if (Array.isArray(data2) && data2.length > 0) {
        state.species = data2;
        renderSpeciesGrid(data2);
        return;
      }
    }
  } catch (e2) {}

  // Fallback 2: Direct static embedded dataset
  console.log('[FishMap VN] Đã nạp 11 loài cá từ bộ dữ liệu tĩnh (Chế độ Vercel/Static)');
  state.species = DEFAULT_SPECIES;
  renderSpeciesGrid(DEFAULT_SPECIES);
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

      <!-- Action Button to Cooking Recipes -->
      <button onclick="openRecipesForFish('${s.common_name}')" class="w-full mt-3 py-2.5 px-3 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl font-bold text-xs shadow-md shadow-amber-950/40 transition-all flex items-center justify-center gap-2 transform hover:scale-[1.01] active:scale-[0.99]">
        <i data-lucide="chef-hat" class="w-4 h-4 text-amber-200"></i>
        <span>🍳 Xem Hướng Dẫn Chế Biến (${recipes.length} Món Có Link Video)</span>
      </button>
      </div>
    </div>
    `;
  }).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

function viewFishRecipes(speciesName) {
  openRecipesForFish(speciesName);
}

// ==========================================
// 4. LEADERBOARD (HALL OF FAME)
// ==========================================
async function loadLeaderboard(speciesFilter = null, lakeFilter = null) {
  const container = document.getElementById('leaderboard-container');
  if (!container) return;

  const spSelect = document.getElementById('leaderboard-species-filter');
  const species = speciesFilter || spSelect?.value || 'all';

  let catches = [];
  try {
    let url = '/api/leaderboard?';
    if (species !== 'all') url += `species=${encodeURIComponent(species)}&`;
    if (lakeFilter && lakeFilter !== 'all') url += `lake=${encodeURIComponent(lakeFilter)}&`;

    const res = await fetch(url);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        catches = json.data;
      } else if (Array.isArray(json)) {
        catches = json;
      }
    }
  } catch (err) {
    console.warn('API /api/leaderboard không phản hồi, dùng dữ liệu tĩnh:', err);
  }

  // Fallback to static leaderboard data
  if (!catches || catches.length === 0) {
    catches = [...DEFAULT_LEADERBOARD];
    if (species !== 'all') {
      catches = catches.filter(c => c.claimed_species === species);
    }
    if (lakeFilter && lakeFilter !== 'all') {
      catches = catches.filter(c => c.lake_name && c.lake_name.includes(lakeFilter));
    }
  }

  renderLeaderboard(catches);
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
    let result = null;
    try {
      const res = await fetch('/api/verify-catch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        result = await res.json();
      }
    } catch (err) {
      console.warn('API kiểm định offline (môi trường Vercel/Static), chạy kiểm định AI trực tiếp tại trình duyệt:', err);
    }

    if (!result) {
      result = simulateClientVerification(payload);
    }

    state.lastVerificationResult = result;

    // Execute step-by-step diagnostic presentation with suspense animation
    await animateDiagnosticSteps(result);
  } catch (outerErr) {
    console.error('Lỗi quy trình kiểm định:', outerErr);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i data-lucide="cpu" class="w-4 h-4"></i><span>KÍCH HOẠT KIỂM ĐỊNH AI (4 BƯỚC)</span>`;
    laser?.classList.add('hidden');
    if (window.lucide) lucide.createIcons();
  }
}

// Client-side AI Verification Simulation (For Vercel & Static deployments)
function simulateClientVerification(payload) {
  const scenario = state.currentScenario || 'case_carp_authentic';
  const weight = parseFloat(payload.claimed_weight_kg) || 5.0;
  const length = parseFloat(payload.claimed_length_cm) || 60.0;
  const species = payload.claimed_species || 'Cá Chép';

  // Step 1: Web Reverse Image Search
  let step1 = {
    is_authentic: true,
    confidence: 0.98,
    duplicate_found: false,
    matched_url: null,
    phash_distance: 0,
    check_notes: 'Ảnh gốc chụp từ cảm biến di động (Apple iPhone / Samsung Galaxy). Mã băm Perceptual Hash (pHash) độc bản.'
  };
  if (scenario === 'case_carp_stolen') {
    step1.is_authentic = false;
    step1.confidence = 0.99;
    step1.duplicate_found = true;
    step1.matched_url = 'https://vietnamnet.vn/vn/kinh-doanh/cau-duoc-ca-chep-khung-6kg-tai-ho-tay-782190.html';
    step1.check_notes = 'CẢNH BÁO: Phát hiện ảnh đã xuất hiện trên báo mạng và các diễn đàn câu cá năm 2021.';
  }

  // Step 2: Lens distortion & Biometrics
  let isDistorted = (scenario === 'case_zoom_05');
  let focalMm = isDistorted ? 13.0 : 28.0;
  let estimatedLength = length;
  let estimatedWeight = weight;

  if (scenario === 'case_black_carp_fake') {
    estimatedWeight = 7.6; // Claimed 15kg, real is 7.6kg
    estimatedLength = 72.0;
  } else if (scenario === 'case_zoom_05') {
    estimatedWeight = 2.4; // Claimed 4.5kg
    estimatedLength = 48.0;
  } else {
    // Normal calculation: W = a * L^b
    const a = 0.0153;
    const b = 3.02;
    estimatedWeight = parseFloat(((a * Math.pow(length, b)) / 1000).toFixed(2));
  }

  let step2 = {
    ai_recognized_species: species,
    ai_species_confidence: 0.96,
    lens_distortion: {
      is_forced_perspective: isDistorted,
      focal_length_mm: focalMm,
      distortion_type: isDistorted ? 'Góc siêu rộng 0.5x (Fish-eye) - Chụp đẩy tay về phía trước' : 'Chuẩn ống kính 1x (28mm) - Góc chụp tự nhiên',
      confidence: 0.94
    },
    ai_estimated_length_cm: estimatedLength,
    ai_estimated_weight_kg: estimatedWeight,
    biometrics: {
      head_to_body_ratio: 0.28,
      girth_estimate_cm: parseFloat((estimatedLength * 0.62).toFixed(1))
    }
  };

  // Step 3: Allometric cross reference
  let step3 = {
    allometric_model: `${species} (FishBase VN / Cyprinidae Allometric Standard)`,
    parameters: { a: 0.0153, b: 3.02 },
    theoretical_weight_kg: estimatedWeight,
    user_weight_kg: weight,
    user_length_cm: length
  };

  // Step 4: Tolerance evaluation (<= 15%)
  const diffPct = parseFloat((Math.abs(weight - estimatedWeight) / estimatedWeight * 100).toFixed(1));
  let approved = false;
  let statusCode = 'VERIFIED_AUTHENTIC';
  let badgeText = '✓ CHỨNG NHẬN KỶ LỤC HỢP LỆ';
  let summary = `Chiến tích hợp lệ! Cân nặng khai báo chênh lệch ${diffPct}% (nằm trong ngưỡng cho phép 15%).`;
  let acceptedMode = 'USER_APPROVED';

  if (!step1.is_authentic) {
    approved = false;
    statusCode = 'REJECTED_STOLEN_PHOTO';
    badgeText = '✕ TỪ CHỐI: ẢNH SAO CHÉP TRÊN MẠNG';
    summary = 'Chiến tích bị từ chối do sử dụng ảnh lấy từ mạng internet.';
    acceptedMode = 'REJECTED';
  } else if (isDistorted) {
    approved = false;
    statusCode = 'REJECTED_FORCED_PERSPECTIVE';
    badgeText = '✕ TỪ CHỐI: GIAN LẬN THẤU KÍNH 0.5X';
    summary = 'Chiến tích bị từ chối do sử dụng ống kính siêu rộng 0.5x và đẩy tay phía trước để phóng đại kích thước cá.';
    acceptedMode = 'REJECTED';
  } else if (diffPct > 15.0) {
    approved = false;
    statusCode = 'REJECTED_WEIGHT_DISCREPANCY';
    badgeText = '✕ TỪ CHỐI: CHÊNH LỆCH CÂN NẶNG > 15%';
    summary = `Khai báo không hợp lệ! Chênh lệch cân nặng lên tới ${diffPct}% so với sinh trắc học cá chuẩn (vượt ngưỡng 15%).`;
    acceptedMode = 'REJECTED';
  }

  let step4 = {
    weight_diff_pct: diffPct,
    tolerance_threshold_pct: 15.0,
    accepted_mode: acceptedMode,
    final_recorded_weight_kg: approved ? weight : estimatedWeight,
    final_recorded_length_cm: approved ? length : estimatedLength,
    status_code: statusCode,
    badge_text: badgeText,
    verdict_summary: summary
  };

  const certHash = 'VN-FISH-' + Math.random().toString(36).substring(2, 10).toUpperCase();

  return {
    success: true,
    status: statusCode,
    badge: badgeText,
    summary: summary,
    angler_name: payload.angler_name || 'Cần Thủ Việt Nam',
    lake_name: payload.lake_name || 'Hồ Tây',
    timestamp: Math.floor(Date.now() / 1000),
    step1: step1,
    step2: step2,
    step3: step3,
    step4: step4,
    final_decision: {
      approved: approved,
      recorded_species: species,
      recorded_weight_kg: approved ? weight : estimatedWeight,
      recorded_length_cm: approved ? length : estimatedLength,
      recorded_source: acceptedMode,
      discrepancy_percent: diffPct,
      certificate_hash: certHash,
      culinary_suggestions: [
        'Cá om dưa chua kèm thì là, hành hoa',
        'Cá nướng muối ớt cuốn bánh tráng rau rừng'
      ]
    }
  };
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


// ==========================================
// 5. BẾP CẦN THỦ - CHẾ BIẾN MÓN NGON
// ==========================================

const recipeFilterState = {
  fish: 'all',
  method: 'all',
  search: ''
};

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getAllCulinaryRecipes() {
  const speciesList = (state.species && state.species.length > 0) ? state.species : DEFAULT_SPECIES;
  const allRecipes = [];

  speciesList.forEach(sp => {
    const fishName = sp.common_name;
    const fishImg = getFishImage(fishName);
    const recipes = sp.culinary_recipes || [];

    recipes.forEach((r, idx) => {
      const dishName = r.dish_name;
      // Curated Direct Search Links
      const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent('cách làm ' + dishName)}`;
      const googleRecipeUrl = `https://www.google.com/search?q=${encodeURIComponent('công thức nấu món ' + dishName)}`;

      allRecipes.push({
        id: `${fishName.replace(/[^a-zA-Z0-9]/g, '-')}-${idx}`,
        fishName: fishName,
        fishImg: fishImg,
        dishName: dishName,
        cookingMethod: r.cooking_method || 'Chế biến truyền thống',
        prepTime: r.prep_time || '30 - 45 phút',
        ingredients: r.ingredients || 'Gia vị truyền thống',
        desc: r.desc || '',
        chefTip: r.chef_tip || '',
        youtubeUrl: youtubeUrl,
        googleRecipeUrl: googleRecipeUrl
      });
    });
  });

  return allRecipes;
}

function initRecipesView() {
  const allRecipes = getAllCulinaryRecipes();

  // Update total stats
  const totalCountEl = document.getElementById('stat-total-recipes');
  if (totalCountEl) totalCountEl.innerText = allRecipes.length;

  renderRecipeFilterChips(allRecipes);
  renderRecipesGrid();
}

function renderRecipeFilterChips(allRecipes) {
  // Fish chips
  const fishChipsContainer = document.getElementById('recipe-fish-filter-chips');
  if (fishChipsContainer) {
    const speciesList = (state.species && state.species.length > 0) ? state.species : DEFAULT_SPECIES;
    
    // Calculate count per fish
    const fishCounts = {};
    allRecipes.forEach(r => {
      fishCounts[r.fishName] = (fishCounts[r.fishName] || 0) + 1;
    });

    let html = `
      <button onclick="setRecipeFishFilter('all')" class="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${recipeFilterState.fish === 'all' ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
        Tất cả loài cá (${allRecipes.length})
      </button>
    `;

    speciesList.forEach(sp => {
      const name = sp.common_name;
      const count = fishCounts[name] || 0;
      const isActive = recipeFilterState.fish === name;
      html += `
        <button onclick="setRecipeFishFilter('${name}')" class="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${isActive ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-amber-300 border border-slate-700/60'}">
          <span>🐟 ${name}</span>
          <span class="text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-amber-950 text-amber-300' : 'bg-slate-900 text-slate-400'}">${count}</span>
        </button>
      `;
    });

    fishChipsContainer.innerHTML = html;
  }

  // Cooking method chips
  const methodChipsContainer = document.getElementById('recipe-method-filter-chips');
  if (methodChipsContainer) {
    const methods = [
      { key: 'all', label: 'Tất cả cách nấu' },
      { key: 'nướng', label: '🔥 Nướng & Gỏi' },
      { key: 'om', label: '🍲 Om Dưa & Canh Chua' },
      { key: 'kho', label: '🥘 Kho Tộ / Kho Niêu' },
      { key: 'chiên', label: '🍳 Chiên Giòn & Áp Chảo' },
      { key: 'hấp', label: '🥢 Hấp & Chả Cá' },
      { key: 'lẩu', label: '🫕 Lẩu & Cháo' }
    ];

    methodChipsContainer.innerHTML = methods.map(m => {
      const isActive = recipeFilterState.method === m.key;
      return `
        <button onclick="setRecipeMethodFilter('${m.key}')" class="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${isActive ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-amber-300 border border-slate-700/60'}">
          ${m.label}
        </button>
      `;
    }).join('');
  }
}

function renderRecipesGrid() {
  const grid = document.getElementById('recipes-catalog-grid');
  if (!grid) return;

  const allRecipes = getAllCulinaryRecipes();

  // Filter recipes
  const filtered = allRecipes.filter(r => {
    // Fish filter
    if (recipeFilterState.fish !== 'all' && r.fishName !== recipeFilterState.fish) {
      return false;
    }
    // Method filter
    if (recipeFilterState.method !== 'all') {
      const searchTarget = (r.cookingMethod + ' ' + r.dishName).toLowerCase();
      if (!searchTarget.includes(recipeFilterState.method.toLowerCase())) {
        return false;
      }
    }
    // Search keyword
    if (recipeFilterState.search) {
      const query = recipeFilterState.search.toLowerCase();
      const matchName = r.dishName.toLowerCase().includes(query);
      const matchFish = r.fishName.toLowerCase().includes(query);
      const matchIng = r.ingredients.toLowerCase().includes(query);
      const matchDesc = r.desc.toLowerCase().includes(query);
      if (!matchName && !matchFish && !matchIng && !matchDesc) {
        return false;
      }
    }
    return true;
  });

  // Update display count
  const countEl = document.getElementById('recipe-count-display');
  if (countEl) countEl.innerText = filtered.length;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center bg-slate-900/60 rounded-3xl border border-slate-800 p-8 space-y-3">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
          <i data-lucide="utensils-crossed" class="w-7 h-7"></i>
        </div>
        <h3 class="text-lg font-bold text-slate-200">Không tìm thấy món ăn phù hợp</h3>
        <p class="text-xs text-slate-400 max-w-md mx-auto">
          Không có món ăn nào khớp với từ khóa "<strong>${escapeHtml(recipeFilterState.search)}</strong>". Hãy thử tìm bằng tên loài cá hoặc đặt lại bộ lọc.
        </p>
        <button onclick="resetRecipeFilters()" class="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md">
          Đặt lại bộ lọc
        </button>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  grid.innerHTML = filtered.map(r => {
    return `
      <div class="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between overflow-hidden hover:border-amber-500/50 transition-all group font-['Plus_Jakarta_Sans']">
        <!-- Card Header Image & Badges -->
        <div class="relative w-full h-44 bg-slate-950 overflow-hidden">
          <img src="${r.fishImg}" alt="${r.dishName}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          
          <div class="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            <button onclick="setRecipeFishFilter('${r.fishName}')" title="Lọc các món từ cá này" class="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-amber-950/90 hover:bg-amber-900 text-amber-300 border border-amber-700/80 backdrop-blur-sm shadow transition-all flex items-center gap-1">
              <span>🐟 ${r.fishName}</span>
            </button>
          </div>

          <div class="absolute top-2.5 right-2.5">
            <span class="px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg bg-slate-900/90 text-slate-200 border border-slate-700 backdrop-blur-sm shadow flex items-center gap-1">
              <i data-lucide="clock" class="w-3 h-3 text-amber-400"></i>
              <span>${r.prepTime}</span>
            </span>
          </div>

          <div class="absolute bottom-2.5 left-3 right-3">
            <h3 class="text-base sm:text-lg font-extrabold text-white tracking-wide">${r.dishName}</h3>
            <span class="text-[11px] text-amber-300 font-semibold flex items-center gap-1 mt-0.5">
              <span>🔥</span> <span>${r.cookingMethod}</span>
            </span>
          </div>
        </div>

        <!-- Card Body -->
        <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5 text-xs">
          <!-- Description -->
          <p class="text-slate-300 text-xs leading-relaxed">${r.desc}</p>

          <!-- Ingredients -->
          <div class="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 space-y-1">
            <div class="font-bold text-amber-300 flex items-center gap-1 text-[11px]">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-400"></i>
              <span>Nguyên liệu & Gia vị chính:</span>
            </div>
            <p class="text-[11px] text-slate-300 leading-relaxed">${r.ingredients}</p>
          </div>

          <!-- Chef Tip -->
          ${r.chefTip ? `
            <div class="bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-800/40 text-[11px] text-emerald-200 flex items-start gap-1.5">
              <i data-lucide="lightbulb" class="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5"></i>
              <div>
                <strong class="text-emerald-300">Bí quyết vàng:</strong>
                <span class="text-slate-300">${r.chefTip}</span>
              </div>
            </div>
          ` : ''}

          <!-- Cooking Steps Accordion -->
          <div class="border-t border-slate-800/80 pt-2">
            <button onclick="toggleRecipeSteps('steps-${r.id}')" class="w-full flex items-center justify-between text-slate-400 hover:text-amber-300 py-1 text-[11px] font-bold transition-all">
              <span class="flex items-center gap-1.5">
                <i data-lucide="list-ordered" class="w-3.5 h-3.5 text-amber-400"></i>
                <span>Xem 4 bước chế biến chi tiết</span>
              </span>
              <i data-lucide="chevron-down" id="arrow-steps-${r.id}" class="w-3.5 h-3.5 transition-transform"></i>
            </button>
            <div id="steps-${r.id}" class="hidden pt-2 space-y-1.5 text-[11px] text-slate-300">
              <div class="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1.5 leading-relaxed">
                <p><strong class="text-cyan-300">Bước 1 (Sơ chế):</strong> Làm sạch nhớt cá với muối hạt và gừng đập dập. Khía vảy chéo thân cá hoặc phi lê mỏng để gia vị ngấm đều.</p>
                <p><strong class="text-cyan-300">Bước 2 (Tẩm ướp):</strong> Trộn đều các loại gia vị đặc trưng (${r.ingredients.split(',').slice(0, 3).join(', ')}...) ướp trong 20-30 phút.</p>
                <p><strong class="text-cyan-300">Bước 3 (Chế biến):</strong> Thực hiện theo phương pháp <em>${r.cookingMethod}</em>. Canh lửa vừa để thịt cá chín tới, săn chắc và giữ nguyên độ ngọt tự nhiên.</p>
                <p><strong class="text-cyan-300">Bước 4 (Thưởng thức):</strong> Dọn lên đĩa trang trí rau thơm, dùng ngay khi nóng để cảm nhận trọn vẹn hương vị đặc sản!</p>
              </div>
            </div>
          </div>

          <!-- Cooking Guide Links (User Requested Feature) -->
          <div class="pt-2.5 border-t border-slate-800 space-y-1.5">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <i data-lucide="external-link" class="w-3 h-3 text-cyan-400"></i>
              <span>Link hướng dẫn nấu ăn đính kèm:</span>
            </span>
            <div class="grid grid-cols-2 gap-2">
              <a href="${r.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-1.5 py-2 px-2 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-600/40 hover:border-rose-500 rounded-xl font-bold text-[11px] transition-all shadow-sm group/btn">
                <i data-lucide="play-circle" class="w-3.5 h-3.5 text-rose-400 group-hover/btn:text-white"></i>
                <span>Video YouTube</span>
              </a>
              <a href="${r.googleRecipeUrl}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-1.5 py-2 px-2 bg-cyan-600/20 hover:bg-cyan-600 text-cyan-300 hover:text-white border border-cyan-600/40 hover:border-cyan-500 rounded-xl font-bold text-[11px] transition-all shadow-sm group/btn">
                <i data-lucide="book-open" class="w-3.5 h-3.5 text-cyan-400 group-hover/btn:text-white"></i>
                <span>Đọc Công Thức</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

function openRecipesForFish(fishName) {
  switchTab('recipes');
  recipeFilterState.fish = fishName;
  recipeFilterState.method = 'all';
  recipeFilterState.search = '';
  const searchInput = document.getElementById('recipe-search-input');
  if (searchInput) searchInput.value = '';

  const allRecipes = getAllCulinaryRecipes();
  renderRecipeFilterChips(allRecipes);
  renderRecipesGrid();

  const container = document.getElementById('view-recipes');
  if (container) {
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function setRecipeFishFilter(fish) {
  recipeFilterState.fish = fish;
  const allRecipes = getAllCulinaryRecipes();
  renderRecipeFilterChips(allRecipes);
  renderRecipesGrid();
}

function setRecipeMethodFilter(method) {
  recipeFilterState.method = method;
  const allRecipes = getAllCulinaryRecipes();
  renderRecipeFilterChips(allRecipes);
  renderRecipesGrid();
}

function filterRecipes() {
  const input = document.getElementById('recipe-search-input');
  recipeFilterState.search = input?.value?.trim() || '';
  renderRecipesGrid();
}

function resetRecipeFilters() {
  recipeFilterState.fish = 'all';
  recipeFilterState.method = 'all';
  recipeFilterState.search = '';
  const input = document.getElementById('recipe-search-input');
  if (input) input.value = '';

  const allRecipes = getAllCulinaryRecipes();
  renderRecipeFilterChips(allRecipes);
  renderRecipesGrid();
}

function toggleRecipeSteps(id) {
  const el = document.getElementById(id);
  const arrow = document.getElementById(`arrow-${id}`);
  if (!el) return;
  el.classList.toggle('hidden');
  if (arrow) {
    arrow.classList.toggle('rotate-180');
  }
}
