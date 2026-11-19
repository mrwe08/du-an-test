#!/usr/bin/env python3
"""Generate all 11 fish species SVG illustrations for FishMap VN"""
import os

BASE_DIR = "/Users/admin/.gemini/antigravity/scratch/fishing-map-app/public/images/species"
os.makedirs(BASE_DIR, exist_ok=True)

SPECIES = [
    {"file": "ca-tram-den", "name_vi": "CÁ TRẮM ĐEN", "name_sci": "Mylopharyngodon piceus",
     "bg_top": "#0c2d48", "bg_bot": "#145da0", "body_top": "#2d3436", "body_mid": "#1a1a2e", "body_bot": "#3d3d3d", "fin": "#1a1a2e", "accent": "#555",
     "dorsal": "M115,64 L130,40 L150,44 L170,36 L190,42 L210,38 L230,42 L248,50 L258,64",
     "body_rx": 130, "body_ry": 50, "body_cx": 195, "body_cy": 110,
     "tail": "M310,85 L352,55 L362,78 L352,110 L362,135 L352,150 L310,130",
     "barbels": "",
     "stripes": ""
    },
    {"file": "ca-chep", "name_vi": "CÁ CHÉP", "name_sci": "Cyprinus carpio",
     "bg_top": "#1a3c34", "bg_bot": "#2d6a4f", "body_top": "#daa520", "body_mid": "#cd853f", "body_bot": "#b8860b", "fin": "#c47400", "accent": "#d4a017",
     "dorsal": "M130,62 L145,38 L165,42 L185,35 L205,40 L225,36 L240,44 L252,55 L258,64",
     "body_rx": 125, "body_ry": 55, "body_cx": 198, "body_cy": 112,
     "tail": "M312,88 L348,58 L358,80 L350,112 L358,138 L348,155 L312,132",
     "barbels": '<line x1="66" y1="110" x2="50" y2="118" stroke="#8b6914" stroke-width="1" opacity="0.7"/><line x1="66" y1="112" x2="52" y2="124" stroke="#8b6914" stroke-width="0.8" opacity="0.6"/>',
     "stripes": ""
    },
    {"file": "ca-tra", "name_vi": "CÁ TRA (CÁ TRA BÒ)", "name_sci": "Pangasianodon hypophthalmus",
     "bg_top": "#1a2744", "bg_bot": "#2a4a7f", "body_top": "#708090", "body_mid": "#a9a9a9", "body_bot": "#d3d3d3", "fin": "#696969", "accent": "#808080",
     "dorsal": "M155,66 L168,42 L185,46 L195,55 L200,66",
     "body_rx": 135, "body_ry": 45, "body_cx": 195, "body_cy": 108,
     "tail": "M318,82 L358,52 L365,78 L355,108 L365,138 L358,158 L318,130",
     "barbels": '<line x1="62" y1="106" x2="38" y2="120" stroke="#808080" stroke-width="1.2" opacity="0.6"/><line x1="62" y1="108" x2="40" y2="128" stroke="#808080" stroke-width="1" opacity="0.5"/>',
     "stripes": ""
    },
    {"file": "ca-loc", "name_vi": "CÁ QUẢ (CÁ LÓC)", "name_sci": "Channa striata",
     "bg_top": "#1a2e1a", "bg_bot": "#2d4a2d", "body_top": "#3b5323", "body_mid": "#556b2f", "body_bot": "#6b8e23", "fin": "#4a5d23", "accent": "#8fbc8f",
     "dorsal": "M100,68 L110,52 L130,50 L150,48 L170,50 L190,48 L210,50 L230,48 L250,52 L270,55 L285,62 L290,68",
     "body_rx": 140, "body_ry": 42, "body_cx": 192, "body_cy": 108,
     "tail": "M320,85 L348,65 L355,82 L350,108 L355,132 L348,148 L320,128",
     "barbels": "",
     "stripes": '<g opacity="0.2" fill="#2d3a1a"><ellipse cx="130" cy="95" rx="8" ry="12"/><ellipse cx="160" cy="118" rx="7" ry="10"/><ellipse cx="195" cy="92" rx="9" ry="11"/><ellipse cx="225" cy="120" rx="8" ry="10"/><ellipse cx="255" cy="95" rx="7" ry="12"/><ellipse cx="280" cy="115" rx="6" ry="9"/><ellipse cx="145" cy="120" rx="6" ry="8"/><ellipse cx="210" cy="100" rx="7" ry="9"/><ellipse cx="240" cy="105" rx="8" ry="10"/><ellipse cx="270" cy="100" rx="6" ry="8"/></g>'
    },
    {"file": "ca-chem", "name_vi": "CÁ CHẼM (CÁ VƯỢC)", "name_sci": "Lates calcarifer",
     "bg_top": "#0a1628", "bg_bot": "#1a3a5c", "body_top": "#a8b5c0", "body_mid": "#c0c8d0", "body_bot": "#e0e5ea", "fin": "#8898a8", "accent": "#b0bec5",
     "dorsal": "M110,62 L118,35 L128,38 L138,32 L148,36 L158,30 L168,35 L178,32 L185,38 L192,55 L200,42 L215,40 L235,45 L250,52 L260,62",
     "body_rx": 132, "body_ry": 52, "body_cx": 196, "body_cy": 110,
     "tail": "M316,86 L350,60 L360,82 L352,110 L360,136 L350,155 L316,132",
     "barbels": "",
     "stripes": ""
    },
    {"file": "ca-lang", "name_vi": "CÁ LĂNG", "name_sci": "Hemibagrus wyckioides",
     "bg_top": "#1a1a0e", "bg_bot": "#3d3520", "body_top": "#5c4a2a", "body_mid": "#6b5b3a", "body_bot": "#8b7355", "fin": "#4a3a1a", "accent": "#8b6914",
     "dorsal": "M145,68 L158,42 L175,46 L185,55 L192,68",
     "body_rx": 138, "body_ry": 44, "body_cx": 192, "body_cy": 108,
     "tail": "M318,82 L355,55 L362,78 L355,108 L362,138 L355,158 L318,130",
     "barbels": '<line x1="60" y1="104" x2="22" y2="90" stroke="#8b6914" stroke-width="1.5" opacity="0.7"/><line x1="60" y1="106" x2="25" y2="100" stroke="#8b6914" stroke-width="1.2" opacity="0.6"/><line x1="60" y1="110" x2="28" y2="118" stroke="#8b6914" stroke-width="1" opacity="0.5"/><line x1="60" y1="112" x2="30" y2="128" stroke="#8b6914" stroke-width="0.8" opacity="0.4"/>',
     "stripes": "",
     "tail_color": "#cd6600"
    },
    {"file": "ca-ngu", "name_vi": "CÁ NGỪ ĐẠI DƯƠNG", "name_sci": "Thunnus albacares",
     "bg_top": "#001a33", "bg_bot": "#003366", "body_top": "#1c3a5a", "body_mid": "#4682b4", "body_bot": "#c0c0c0", "fin": "#ffd700", "accent": "#ffa500",
     "dorsal": "M125,65 L135,42 L150,40 L165,38 L178,45 L185,55 L188,65 L200,55 L220,48 L245,52 L260,58 L268,65",
     "body_rx": 138, "body_ry": 42, "body_cx": 192, "body_cy": 106,
     "tail": "M320,82 L355,52 L362,75 L348,106 L362,138 L355,158 L320,130",
     "barbels": "",
     "stripes": "",
     "finlets": True
    },
    {"file": "ca-ro-phi", "name_vi": "CÁ RÔ PHI", "name_sci": "Oreochromis niloticus",
     "bg_top": "#152238", "bg_bot": "#1e3a5f", "body_top": "#5a6e5a", "body_mid": "#7a8e7a", "body_bot": "#9aae9a", "fin": "#4a5e4a", "accent": "#6b8e6b",
     "dorsal": "M105,60 L112,30 L125,34 L138,28 L150,32 L162,26 L175,30 L188,27 L200,32 L212,28 L225,34 L238,30 L248,38 L255,48 L258,60",
     "body_rx": 122, "body_ry": 55, "body_cx": 198, "body_cy": 112,
     "tail": "M310,88 L342,62 L350,82 L344,112 L350,140 L342,158 L310,135",
     "barbels": "",
     "stripes": '<g opacity="0.2" stroke="#2a3a2a" stroke-width="2.5" fill="none"><line x1="140" y1="75" x2="135" y2="145"/><line x1="165" y1="70" x2="160" y2="150"/><line x1="190" y1="68" x2="188" y2="152"/><line x1="215" y1="70" x2="215" y2="148"/><line x1="240" y1="75" x2="242" y2="145"/><line x1="265" y1="82" x2="268" y2="138"/></g>'
    },
    {"file": "ca-tre", "name_vi": "CÁ TRÊ", "name_sci": "Clarias batrachus",
     "bg_top": "#1a1410", "bg_bot": "#3a2a1a", "body_top": "#3e2723", "body_mid": "#4e342e", "body_bot": "#5d4037", "fin": "#3e2723", "accent": "#795548",
     "dorsal": "M95,72 L105,58 L130,55 L160,53 L190,52 L220,53 L250,55 L280,58 L300,65 L310,72",
     "body_rx": 148, "body_ry": 38, "body_cx": 192, "body_cy": 106,
     "tail": "M328,82 L352,65 L358,80 L354,106 L358,132 L352,148 L328,128",
     "barbels": '<line x1="55" y1="98" x2="20" y2="82" stroke="#795548" stroke-width="1.3" opacity="0.7"/><line x1="55" y1="100" x2="22" y2="90" stroke="#795548" stroke-width="1.1" opacity="0.6"/><line x1="55" y1="104" x2="24" y2="98" stroke="#795548" stroke-width="0.9" opacity="0.5"/><line x1="55" y1="108" x2="26" y2="108" stroke="#795548" stroke-width="0.8" opacity="0.5"/><line x1="55" y1="110" x2="24" y2="116" stroke="#795548" stroke-width="0.9" opacity="0.5"/><line x1="55" y1="112" x2="22" y2="124" stroke="#795548" stroke-width="1.1" opacity="0.6"/><line x1="55" y1="114" x2="20" y2="130" stroke="#795548" stroke-width="1.3" opacity="0.7"/><line x1="55" y1="116" x2="22" y2="138" stroke="#795548" stroke-width="1" opacity="0.5"/>',
     "stripes": "",
     "anal_long": True
    },
    {"file": "ca-troi", "name_vi": "CÁ TRÔI", "name_sci": "Cirrhinus mrigala",
     "bg_top": "#0e2a3a", "bg_bot": "#1a4a6a", "body_top": "#8a9eae", "body_mid": "#b0c4d4", "body_bot": "#d0daea", "fin": "#90a0b0", "accent": "#e8b4b8",
     "dorsal": "M148,64 L158,38 L175,42 L192,36 L205,42 L218,40 L230,48 L238,58 L242,64",
     "body_rx": 128, "body_ry": 48, "body_cx": 196, "body_cy": 110,
     "tail": "M312,86 L350,58 L360,80 L352,110 L360,138 L350,155 L312,132",
     "barbels": "",
     "stripes": ""
    },
    {"file": "ca-tram-trang", "name_vi": "CÁ TRẮM TRẮNG", "name_sci": "Ctenopharyngodon idella",
     "bg_top": "#0e2e1e", "bg_bot": "#1a5a3a", "body_top": "#5a7a5a", "body_mid": "#8aaa7a", "body_bot": "#b0c8a0", "fin": "#6a8a5a", "accent": "#90b878",
     "dorsal": "M160,64 L172,40 L188,44 L202,38 L215,44 L228,42 L238,50 L245,60 L248,64",
     "body_rx": 135, "body_ry": 46, "body_cx": 194, "body_cy": 108,
     "tail": "M318,84 L355,56 L362,78 L354,108 L362,138 L355,156 L318,130",
     "barbels": "",
     "stripes": ""
    },
]

def make_svg(sp):
    tail_fill = sp.get("tail_color", sp["fin"])
    
    # Finlets for tuna
    finlets_svg = ""
    if sp.get("finlets"):
        finlets_svg = '''
  <!-- Yellow finlets -->
  <g fill="#ffd700" opacity="0.9">
    <polygon points="275,62 282,52 288,60"/>
    <polygon points="290,65 296,55 302,63"/>
    <polygon points="305,70 310,60 316,68"/>
    <polygon points="275,148 282,158 288,150"/>
    <polygon points="290,145 296,155 302,147"/>
    <polygon points="305,140 310,150 316,142"/>
  </g>'''

    # Long anal fin for catfish
    anal_fin = f'<path d="M180,138 L195,160 L215,158 L230,155 L250,158 L270,155 L290,158 L305,152 L315,140" fill="{sp["fin"]}" stroke="{sp["accent"]}" stroke-width="0.6" opacity="0.8"/>' if sp.get("anal_long") else f'<path d="M228,152 L245,170 L265,168 L278,155" fill="{sp["fin"]}" stroke="{sp["accent"]}" stroke-width="0.6" opacity="0.8"/>'

    # Scale pattern - skip for catfish (smooth skin)
    is_catfish = sp["file"] in ("ca-tra", "ca-tre", "ca-lang")
    scales_svg = ""
    if not is_catfish:
        scales_svg = f'<g opacity="0.12" fill="none" stroke="{sp["accent"]}" stroke-width="0.35">'
        cy = sp["body_cy"]
        cx = sp["body_cx"]
        for row_off in [-22, -10, 2, 14]:
            for col in range(8):
                x = (cx - 100) + col * 25
                y = cy + row_off
                scales_svg += f'\n    <path d="M{x},{y} Q{x+12},{y-5} {x+18},{y+3} Q{x+12},{y+11} {x},{y+6}Z"/>'
        scales_svg += '\n  </g>'

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="{sp['bg_top']}"/>
      <stop offset="100%" stop-color="{sp['bg_bot']}"/>
    </linearGradient>
    <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="{sp['body_top']}"/>
      <stop offset="50%" stop-color="{sp['body_mid']}"/>
      <stop offset="100%" stop-color="{sp['body_bot']}"/>
    </linearGradient>
    <radialGradient id="eye" cx="50%" cy="40%">
      <stop offset="0%" stop-color="#ffd700"/>
      <stop offset="40%" stop-color="#ff8c00"/>
      <stop offset="50%" stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#000"/>
    </radialGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="1" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="shadow"><feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000" flood-opacity="0.35"/></filter>
  </defs>
  <!-- Background -->
  <rect width="400" height="220" rx="16" fill="url(#bg)"/>
  <!-- Water caustics -->
  <g opacity="0.06" fill="none" stroke="#fff" stroke-width="0.5">
    <path d="M0,30 Q50,20 100,35 Q150,50 200,30 Q250,10 300,35 Q350,55 400,30"/>
    <path d="M0,170 Q40,160 80,175 Q130,185 180,170 Q230,155 280,172 Q340,185 400,170"/>
  </g>
  <!-- Bubbles -->
  <circle cx="42" cy="32" r="3" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
  <circle cx="355" cy="40" r="2" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <circle cx="50" cy="175" r="2.5" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="0.5"/>
  <!-- Fish body shadow -->
  <ellipse cx="{sp['body_cx']+3}" cy="{sp['body_cy']+8}" rx="{sp['body_rx']}" ry="{sp['body_ry']}" fill="#000" opacity="0.12"/>
  <!-- Dorsal fin -->
  <path d="{sp['dorsal']}" fill="{sp['fin']}" stroke="{sp['accent']}" stroke-width="0.7" opacity="0.85"/>
  <!-- Main body -->
  <ellipse cx="{sp['body_cx']}" cy="{sp['body_cy']}" rx="{sp['body_rx']}" ry="{sp['body_ry']}" fill="url(#body)" stroke="{sp['accent']}" stroke-width="0.5"/>
  {sp.get('stripes', '')}
  {scales_svg}
  <!-- Lateral line -->
  <path d="M{sp['body_cx']-120},{sp['body_cy']-2} C{sp['body_cx']-50},{sp['body_cy']-8} {sp['body_cx']+60},{sp['body_cy']-6} {sp['body_cx']+120},{sp['body_cy']}" fill="none" stroke="{sp['accent']}" stroke-width="0.8" opacity="0.35" stroke-dasharray="3,2"/>
  <!-- Tail / Caudal fin -->
  <path d="{sp['tail']}" fill="{tail_fill}" stroke="{sp['accent']}" stroke-width="0.7"/>
  {finlets_svg}
  <!-- Anal fin -->
  {anal_fin}
  <!-- Pelvic fin -->
  <path d="M{sp['body_cx']-30},{sp['body_cy']+40} L{sp['body_cx']-20},{sp['body_cy']+62} L{sp['body_cx']-3},{sp['body_cy']+56} L{sp['body_cx']-7},{sp['body_cy']+38}" fill="{sp['fin']}" stroke="{sp['accent']}" stroke-width="0.5" opacity="0.75"/>
  <!-- Pectoral fin -->
  <path d="M{sp['body_cx']-95},{sp['body_cy']+8} L{sp['body_cx']-115},{sp['body_cy']+32} L{sp['body_cx']-98},{sp['body_cy']+38} L{sp['body_cx']-85},{sp['body_cy']+22}" fill="{sp['fin']}" stroke="{sp['accent']}" stroke-width="0.5" opacity="0.75"/>
  <!-- Gill cover -->
  <path d="M{sp['body_cx']-99},{sp['body_cy']-22} Q{sp['body_cx']-93},{sp['body_cy']} {sp['body_cx']-99},{sp['body_cy']+22}" fill="none" stroke="{sp['accent']}" stroke-width="1.1" opacity="0.4"/>
  <!-- Barbels (if any) -->
  {sp.get('barbels', '')}
  <!-- Head contour -->
  <path d="M{sp['body_cx']-127},{sp['body_cy']-12} Q{sp['body_cx']-140},{sp['body_cy']} {sp['body_cx']-127},{sp['body_cy']+12}" fill="none" stroke="{sp['accent']}" stroke-width="1"/>
  <!-- Mouth -->
  <path d="M{sp['body_cx']-129},{sp['body_cy']-2} Q{sp['body_cx']-137},{sp['body_cy']} {sp['body_cx']-129},{sp['body_cy']+4}" fill="none" stroke="{sp['accent']}" stroke-width="1.1"/>
  <!-- Eye -->
  <circle cx="{sp['body_cx']-113}" cy="{sp['body_cy']-10}" r="8.5" fill="url(#eye)" filter="url(#glow)"/>
  <circle cx="{sp['body_cx']-115}" cy="{sp['body_cy']-12}" r="2.8" fill="#111"/>
  <circle cx="{sp['body_cx']-116}" cy="{sp['body_cy']-13}" r="1.1" fill="rgba(255,255,255,0.75)"/>
  <!-- Species Label -->
  <rect x="50" y="194" width="300" height="20" rx="10" fill="rgba(0,0,0,0.5)"/>
  <text x="200" y="208" text-anchor="middle" fill="#38bdf8" font-family="'Segoe UI',system-ui,sans-serif" font-size="10" font-weight="700" letter-spacing="0.4">{sp['name_vi']} • {sp['name_sci']}</text>
</svg>'''
    return svg


for sp in SPECIES:
    path = os.path.join(BASE_DIR, f"{sp['file']}.svg")
    with open(path, 'w', encoding='utf-8') as f:
        f.write(make_svg(sp))
    print(f"✓ {sp['file']}.svg → {sp['name_vi']}")

print(f"\nDone! Generated {len(SPECIES)} SVG illustrations.")
