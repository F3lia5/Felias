/**
 * Fotoğraf olmadığında ya da yüklenemediğinde gösterilen çizimler.
 * Hepsi satır içi SVG'dir; ağ gerektirmez ve yerleşimi korur.
 * Rastgele görünen çizikler sabit bir tohumla üretilir, yani her derlemede aynıdır.
 */

let uid = 0;
const nextId = (name) => `${name}-${(uid += 1)}`;

const rng = (seed) => {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
};
const n = (v) => Math.round(v * 10) / 10;

const LIME = '#c9f31d';

/* ---------- Hero: stüdyo ışığı altında yandan görünüm ---------- */
function hero() {
  const clip = nextId('hero-body');
  const wheel = (cx) => `
    <g transform="translate(${cx} 300)">
      <circle r="54" fill="#090a0b"/>
      <circle r="38" fill="#171a1d" stroke="#4a5057" stroke-width="2"/>
      ${[0, 72, 144, 216, 288]
        .map((a) => `<line x1="0" y1="0" x2="0" y2="-34" stroke="#6b7178" stroke-width="5" stroke-linecap="round" transform="rotate(${a})"/>`)
        .join('')}
      <circle r="7" fill="${LIME}"/>
    </g>`;

  // 'meet' + alt kenara hizalama: araç hiçbir ekranda kırpılmaz; kalan alanı kapsayıcının zemin rengi doldurur.
  return `<svg viewBox="0 0 900 400" preserveAspectRatio="xMaxYMax meet" focusable="false" aria-hidden="true">
    <defs>
      <clipPath id="${clip}"><path id="${clip}-p" d="M40 290 C40 262 58 246 100 240 L238 224 C290 176 372 146 468 146 C566 146 648 172 700 222 L812 238 C858 244 872 262 872 290 L872 300 L742 300 A62 62 0 0 0 618 300 L297 300 A62 62 0 0 0 173 300 L40 300 Z"/></clipPath>
    </defs>
    <rect width="900" height="400" fill="#101214"/>
    <g stroke="#ecebe4" stroke-opacity=".06" stroke-width="1">
      ${[80, 160, 240, 320].map((y) => `<line x1="0" y1="${y}" x2="900" y2="${y}"/>`).join('')}
    </g>
    <ellipse cx="456" cy="357" rx="420" ry="12" fill="#000" fill-opacity=".6"/>
    <path d="M40 290 C40 262 58 246 100 240 L238 224 C290 176 372 146 468 146 C566 146 648 172 700 222 L812 238 C858 244 872 262 872 290 L872 300 L742 300 A62 62 0 0 0 618 300 L297 300 A62 62 0 0 0 173 300 L40 300 Z" fill="#1c2024" stroke="#3a4046" stroke-width="1.5"/>
    <g clip-path="url(#${clip})">
      <path d="M262 222 C300 184 372 162 462 162 C548 162 612 182 656 222 Z" fill="#0d0f10"/>
      <path d="M468 162 L468 222" stroke="#2a2f34" stroke-width="2"/>
      <polygon points="560,120 640,120 520,310 440,310" fill="#ecebe4" fill-opacity=".07"/>
      <polygon points="660,120 690,120 570,310 540,310" fill="#ecebe4" fill-opacity=".05"/>
    </g>
    <path d="M296 188 C350 158 410 148 470 148 C536 148 600 164 650 200" fill="none" stroke="#ecebe4" stroke-opacity=".75" stroke-width="2.5" stroke-linecap="round"/>
    <path class="art-pitline" d="M70 262 L812 252" fill="none" stroke="${LIME}" stroke-width="3" stroke-linecap="round" pathLength="1"/>
    <path d="M836 256 L866 266 L868 276 L832 268 Z" fill="#eaff8a"/>
    <path d="M44 262 L60 258 L60 270 L42 272 Z" fill="#5a1f1a"/>
    ${wheel(235)}${wheel(680)}
    <line x1="0" y1="354" x2="900" y2="354" stroke="${LIME}" stroke-opacity=".9" stroke-width="2"/>
    <line x1="0" y1="368" x2="900" y2="368" stroke="#ecebe4" stroke-opacity=".18" stroke-dasharray="18 14"/>
  </svg>`;
}

/* ---------- Boya yüzeyi: çizikli ve hareli (önce) / net yansımalı (sonra) ---------- */
function paint(after) {
  const r = rng(after ? 7 : 11);
  const blur = nextId('paint-blur');
  const crease = `<path d="M-20 430 C180 330 420 300 820 360" fill="none" stroke="#ecebe4" stroke-opacity="${after ? 0.22 : 0.08}" stroke-width="2"/>`;
  let marks = '';

  if (!after) {
    for (let i = 0; i < 46; i += 1) {
      const cx = r() * 800;
      const cy = r() * 600;
      const rad = 30 + r() * 150;
      const a0 = r() * Math.PI * 2;
      const a1 = a0 + 0.8 + r() * 1.6;
      const x0 = cx + Math.cos(a0) * rad;
      const y0 = cy + Math.sin(a0) * rad;
      const x1 = cx + Math.cos(a1) * rad;
      const y1 = cy + Math.sin(a1) * rad;
      marks += `<path d="M${n(x0)} ${n(y0)} A${n(rad)} ${n(rad)} 0 0 1 ${n(x1)} ${n(y1)}" fill="none" stroke="#ecebe4" stroke-opacity="${n(0.05 + r() * 0.12)}" stroke-width="${n(0.6 + r())}"/>`;
    }
    for (let i = 0; i < 26; i += 1) {
      const x = r() * 800;
      const y = r() * 600;
      const len = 40 + r() * 140;
      const ang = -0.9 + r() * 1.8;
      marks += `<line x1="${n(x)}" y1="${n(y)}" x2="${n(x + Math.cos(ang) * len)}" y2="${n(y + Math.sin(ang) * len)}" stroke="#ecebe4" stroke-opacity="${n(0.1 + r() * 0.22)}" stroke-width="${n(0.5 + r() * 0.8)}"/>`;
    }
    for (let i = 0; i < 22; i += 1) {
      const x = r() * 800;
      const y = r() * 600;
      const rad = 3 + r() * 7;
      marks += `<circle cx="${n(x)}" cy="${n(y)}" r="${n(rad)}" fill="#ecebe4" fill-opacity=".05" stroke="#ecebe4" stroke-opacity=".22" stroke-width="1"/>`;
    }
  }

  const reflection = after
    ? `<g transform="rotate(-9 400 300)">
         <rect x="-100" y="214" width="1000" height="30" fill="#ecebe4" fill-opacity=".95"/>
         <rect x="-100" y="262" width="1000" height="8" fill="#ecebe4" fill-opacity=".55"/>
         <rect x="-100" y="288" width="1000" height="3" fill="${LIME}" fill-opacity=".9"/>
       </g>`
    : `<g transform="rotate(-9 400 300)" filter="url(#${blur})">
         <rect x="-100" y="200" width="1000" height="104" fill="#ecebe4" fill-opacity=".2"/>
       </g>`;

  return `<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" focusable="false" aria-hidden="true">
    <defs><filter id="${blur}" x="-10%" y="-40%" width="120%" height="180%"><feGaussianBlur stdDeviation="${after ? 0 : 34}"/></filter></defs>
    <rect width="800" height="600" fill="${after ? '#12171d' : '#1a2027'}"/>
    ${reflection}
    ${crease}
    ${marks}
    ${after ? '' : '<rect width="800" height="600" fill="#ecebe4" fill-opacity=".05"/>'}
  </svg>`;
}

/* ---------- Jant: kirli (önce) / temiz (sonra) ---------- */
function wheel(after) {
  const r = rng(after ? 3 : 5);
  const spokes = [0, 72, 144, 216, 288]
    .map((deg) => {
      const rad = ((deg - 90) * Math.PI) / 180;
      const px = Math.cos(rad + Math.PI / 2);
      const py = Math.sin(rad + Math.PI / 2);
      const pt = (dist, half) => `${n(400 + Math.cos(rad) * dist + px * half)},${n(300 + Math.sin(rad) * dist + py * half)}`;
      return `<polygon points="${pt(46, 11)} ${pt(150, 21)} ${pt(150, -21)} ${pt(46, -11)}" fill="${after ? '#c6cacd' : '#6c6358'}"/>`;
    })
    .join('');

  let grime = '';
  if (!after) {
    for (let i = 0; i < 160; i += 1) {
      const a = r() * Math.PI * 2;
      const d = 40 + r() * 190;
      const x = 400 + Math.cos(a) * d;
      const y = 300 + Math.sin(a) * d;
      grime += `<circle cx="${n(x)}" cy="${n(y)}" r="${n(1 + r() * 4.5)}" fill="${r() > 0.5 ? '#3b3024' : '#7a6a55'}" fill-opacity="${n(0.35 + r() * 0.4)}"/>`;
    }
    for (let i = 0; i < 9; i += 1) {
      const a = r() * Math.PI * 2;
      const d = 150 + r() * 70;
      grime += `<ellipse cx="${n(400 + Math.cos(a) * d)}" cy="${n(300 + Math.sin(a) * d)}" rx="${n(24 + r() * 40)}" ry="${n(8 + r() * 14)}" fill="#4a3d2e" fill-opacity=".45" transform="rotate(${n(r() * 180)} ${n(400 + Math.cos(a) * d)} ${n(300 + Math.sin(a) * d)})"/>`;
    }
  }

  return `<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" focusable="false" aria-hidden="true">
    <rect width="800" height="600" fill="#101214"/>
    <circle cx="400" cy="300" r="250" fill="#0a0b0c"/>
    <circle cx="400" cy="300" r="232" fill="none" stroke="#202428" stroke-width="3"/>
    <circle cx="400" cy="300" r="172" fill="${after ? '#aeb3b7' : '#554d44'}"/>
    <circle cx="400" cy="300" r="150" fill="${after ? '#171a1d' : '#1a1a19'}"/>
    <path d="M400 300 m-138 0 a138 138 0 0 1 96 -131" fill="none" stroke="${after ? LIME : '#6f7a3a'}" stroke-width="30" stroke-linecap="butt" transform="rotate(130 400 300)"/>
    ${spokes}
    <circle cx="400" cy="300" r="42" fill="${after ? '#d4d8db' : '#6c6358'}"/>
    <circle cx="400" cy="300" r="12" fill="${after ? '#0b0c0d' : '#2a2620'}"/>
    ${after ? '<path d="M262 250 A150 150 0 0 1 340 168" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="4" stroke-linecap="round"/>' : ''}
    ${grime}
  </svg>`;
}

/* ---------- Hakkında: dönen polisaj pedi ---------- */
function detail() {
  const r = rng(21);
  let arcs = '';
  for (let i = 0; i < 18; i += 1) {
    const rad = 40 + i * 14;
    const a0 = r() * 360;
    arcs += `<circle cx="500" cy="600" r="${rad}" fill="none" stroke="#ecebe4" stroke-opacity="${n(0.06 + r() * 0.12)}" stroke-width="${n(1 + r())}" stroke-dasharray="${n(60 + r() * 220)} ${n(30 + r() * 90)}" transform="rotate(${n(a0)} 500 600)"/>`;
  }
  return `<svg viewBox="0 0 1000 1200" preserveAspectRatio="xMidYMid slice" focusable="false" aria-hidden="true">
    <rect width="1000" height="1200" fill="#14171a"/>
    <rect y="620" width="1000" height="580" fill="#0f1113"/>
    <line x1="0" y1="620" x2="1000" y2="620" stroke="${LIME}" stroke-width="3"/>
    ${arcs}
    <circle cx="500" cy="600" r="210" fill="#1c2024" stroke="#3a4046" stroke-width="2"/>
    <circle cx="500" cy="600" r="150" fill="none" stroke="#2c3238" stroke-width="22"/>
    <circle cx="500" cy="600" r="56" fill="${LIME}"/>
    <circle cx="500" cy="600" r="18" fill="#0b0c0d"/>
  </svg>`;
}

/* ---------- Harita yer tutucusu ---------- */
function map() {
  return `<svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" focusable="false" aria-hidden="true">
    <rect width="1000" height="700" fill="#16191c"/>
    <rect x="70" y="80" width="250" height="170" fill="#1d2226"/>
    <rect x="640" y="420" width="290" height="190" fill="#1d2226"/>
    <g fill="none" stroke="#2c3238" stroke-linecap="round">
      <path d="M-10 330 H1010" stroke-width="22"/>
      <path d="M480 -10 V710" stroke-width="22"/>
      <path d="M-10 120 L1010 200" stroke-width="12"/>
      <path d="M200 -10 L260 710" stroke-width="12"/>
      <path d="M760 -10 L720 710" stroke-width="12"/>
      <path d="M-10 540 H1010" stroke-width="10"/>
    </g>
    <g transform="translate(480 330)">
      <ellipse cx="0" cy="4" rx="20" ry="6" fill="#000" fill-opacity=".5"/>
      <path d="M0 0 C-22 -26 -34 -44 -34 -60 A34 34 0 0 1 34 -60 C34 -44 22 -26 0 0Z" fill="${LIME}"/>
      <circle cx="0" cy="-60" r="12" fill="#0b0c0d"/>
    </g>
  </svg>`;
}

/** art anahtarı → SVG üretici. images.js içindeki `art` alanı bu anahtarları kullanır. */
export const arts = {
  hero,
  detail,
  map,
  'paint-before': () => paint(false),
  'paint-after': () => paint(true),
  'wheel-before': () => wheel(false),
  'wheel-after': () => wheel(true),
};
