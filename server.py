#!/usr/bin/env python3
"""
FishMap VN - Backend Server
Provides REST APIs for:
- Fishing lakes & localized fishing weather forecasts
- Fish species & bait recommendation encyclopedia
- Hall of fame & leaderboard
- FishVision AI verification engine (4-step strict anti-cheat verification)
"""

import http.server
import socketserver
import urllib.parse
import json
import os
import sys
import mimetypes
import sqlite3
import database
import ai_engine

PORT = 8080
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = os.path.join(BASE_DIR, "public")

# Initialize DB on server start
database.init_db()
ai_verifier = ai_engine.FishVisionEngine()

class FishAppHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PUBLIC_DIR, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        if path.startswith("/api/"):
            self.handle_api_get(path, query)
        else:
            # Map root to index.html
            if path == "/" or not os.path.exists(os.path.join(PUBLIC_DIR, path.lstrip("/"))):
                self.path = "/index.html"
            super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path.startswith("/api/"):
            content_length = int(self.headers.get("Content-Length", 0))
            post_body = self.rfile.read(content_length).decode("utf-8")
            try:
                payload = json.loads(post_body) if post_body else {}
            except Exception as e:
                self.send_json_response({"error": "Invalid JSON", "details": str(e)}, status=400)
                return

            self.handle_api_post(path, payload)
        else:
            self.send_json_response({"error": "Not Found"}, status=404)

    def handle_api_get(self, path: str, query: dict):
        conn = database.get_db()
        cursor = conn.cursor()

        try:
            if path == "/api/lakes":
                cursor.execute("SELECT * FROM lakes ORDER BY rating DESC")
                rows = cursor.fetchall()
                lakes = []
                for r in rows:
                    l = dict(r)
                    l["species_list"] = json.loads(l["species_list"])
                    lakes.append(l)
                self.send_json_response({"success": True, "data": lakes})

            elif path.startswith("/api/lakes/"):
                lake_id = path.split("/")[-1]
                cursor.execute("SELECT * FROM lakes WHERE id = ? OR slug = ?", (lake_id, lake_id))
                row = cursor.fetchone()
                if row:
                    l = dict(row)
                    l["species_list"] = json.loads(l["species_list"])
                    self.send_json_response({"success": True, "data": l})
                else:
                    self.send_json_response({"success": False, "error": "Lake not found"}, status=404)

            elif path == "/api/species":
                cursor.execute("SELECT * FROM species ORDER BY id ASC")
                rows = cursor.fetchall()
                species = []
                for r in rows:
                    s = dict(r)
                    if "culinary_recipes" in s and s["culinary_recipes"]:
                        try:
                            s["culinary_recipes"] = json.loads(s["culinary_recipes"])
                        except Exception:
                            s["culinary_recipes"] = []
                    else:
                        s["culinary_recipes"] = []
                    species.append(s)
                self.send_json_response({"success": True, "data": species})

            elif path == "/api/leaderboard":
                species_filter = query.get("species", [None])[0]
                lake_filter = query.get("lake", [None])[0]

                sql = "SELECT * FROM catches WHERE ai_verified = 1"
                params = []

                if species_filter and species_filter != "all":
                    sql += " AND claimed_species = ?"
                    params.append(species_filter)
                if lake_filter and lake_filter != "all":
                    sql += " AND lake_name = ?"
                    params.append(lake_filter)

                sql += " ORDER BY recorded_weight_kg DESC LIMIT 50"
                cursor.execute(sql, params)
                rows = cursor.fetchall()
                catches = [dict(r) for r in rows]
                self.send_json_response({"success": True, "data": catches})

            elif path == "/api/stats":
                cursor.execute("SELECT COUNT(*) FROM lakes")
                total_lakes = cursor.fetchone()[0]

                cursor.execute("SELECT COUNT(*) FROM catches WHERE ai_verified = 1")
                total_verified = cursor.fetchone()[0]

                cursor.execute("SELECT MAX(recorded_weight_kg) FROM catches")
                max_weight = cursor.fetchone()[0] or 0.0

                self.send_json_response({
                    "success": True,
                    "data": {
                        "total_lakes": total_lakes,
                        "total_verified_catches": total_verified,
                        "heaviest_catch_kg": max_weight,
                        "ai_engine_version": "FishVision v2.4-AntiCheat"
                    }
                })

            else:
                self.send_json_response({"error": "Endpoint not found"}, status=404)

        finally:
            conn.close()

    def handle_api_post(self, path: str, payload: dict):
        if path == "/api/verify-catch":
            # Run the 4-step AI verification pipeline
            try:
                verification_result = ai_verifier.verify_catch(payload)
                self.send_json_response(verification_result)
            except Exception as e:
                self.send_json_response({
                    "success": False,
                    "error": "Lỗi khi xử lý kiểm định AI",
                    "details": str(e)
                }, status=500)

        elif path == "/api/submit-catch":
            # Submits the verified catch to the official database & leaderboard
            conn = database.get_db()
            cursor = conn.cursor()
            try:
                # Ensure the catch was verified first
                verification = payload.get("verification_result", {})
                final_dec = verification.get("final_decision", {})

                if not final_dec.get("approved", False):
                    self.send_json_response({
                        "success": False,
                        "error": "Không thể đăng tải chiến tích chưa được AI chấp thuận."
                    }, status=400)
                    return

                angler_name = payload.get("angler_name", "Cần thủ ẩn danh")
                species = final_dec.get("recorded_species", payload.get("claimed_species", "Cá Chép"))
                claimed_weight = float(payload.get("claimed_weight_kg", 0.0))
                claimed_length = float(payload.get("claimed_length_cm", 0.0))
                recorded_weight = float(final_dec.get("recorded_weight_kg", claimed_weight))
                recorded_length = float(final_dec.get("recorded_length_cm", claimed_length))
                lake_name = payload.get("lake_name", "Hồ Đồng Đò")
                date_caught = payload.get("date_caught", "2026-11-13")
                image_url = payload.get("image_url", "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop")
                
                status_code = verification.get("status", "APPROVED_USER_DATA")
                accepted_mode = final_dec.get("recorded_source", "USER_APPROVED")
                diff_pct = float(final_dec.get("discrepancy_percent", 0.0))
                cert_hash = final_dec.get("certificate_hash", "CERT-PASS")
                verdict_log = verification.get("summary", "Đã duyệt bởi FishVision AI")
                lens_detected = 1 if verification.get("step2", {}).get("lens_distortion", {}).get("is_ultra_wide_05x", False) else 0

                cursor.execute("""
                INSERT INTO catches (
                    angler_name, claimed_species, claimed_weight_kg, claimed_length_cm,
                    recorded_weight_kg, recorded_length_cm, lake_name, date_caught,
                    image_url, ai_verified, verification_status, accepted_mode,
                    discrepancy_pct, lens_distortion_detected, certificate_hash, verification_log
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?)
                """, (
                    angler_name, species, claimed_weight, claimed_length,
                    recorded_weight, recorded_length, lake_name, date_caught,
                    image_url, status_code, accepted_mode,
                    diff_pct, lens_detected, cert_hash, verdict_log
                ))
                conn.commit()
                new_id = cursor.lastrowid

                self.send_json_response({
                    "success": True,
                    "message": "Chiến tích đã được lưu thành công vào Bảng Xếp Hạng!",
                    "catch_id": new_id,
                    "recorded_weight_kg": recorded_weight,
                    "certificate_hash": cert_hash
                })
            finally:
                conn.close()
        else:
            self.send_json_response({"error": "Unknown POST route"}, status=404)

    def send_json_response(self, data: dict, status: int = 200):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()

def run_server():
    os.chdir(BASE_DIR)
    # Enable address reuse
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), FishAppHandler) as httpd:
        print(f"🐟 FishMap VN Server running at http://localhost:{PORT}")
        sys.stdout.flush()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server...")

if __name__ == "__main__":
    run_server()
