'use strict';

// ============================================================
// SVG ILLUSTRATION LIBRARY (line art, inline)
// ============================================================
const SVG = {
  pistol1911: () => `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><g><rect x="60" y="50" width="240" height="50" rx="2"/><path d="M60 50 L40 50 L40 60 L50 60 L60 70"/><line x1="80" y1="60" x2="280" y2="60"/><line x1="80" y1="80" x2="280" y2="80"/><circle cx="100" cy="70" r="3"/><circle cx="260" cy="70" r="3"/><path d="M180 100 L180 130 L210 150 L210 130 L195 130 L195 100"/><path d="M150 100 L150 110 L165 110 L165 100"/><path d="M165 110 L165 130 L150 130 Q145 130 145 135 L145 145"/><circle cx="155" cy="120" r="2"/><path d="M40 60 L40 80 L60 80"/><path d="M280 50 L300 50 L300 70 L290 70"/></g></svg>`,
  pistolModern: () => `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><g><rect x="55" y="55" width="250" height="48" rx="6"/><path d="M55 55 L40 65 L40 75 L55 85"/><line x1="80" y1="65" x2="290" y2="65"/><line x1="80" y1="80" x2="280" y2="80"/><line x1="80" y1="92" x2="280" y2="92"/><rect x="290" y="60" width="14" height="6" rx="1"/><path d="M170 103 L170 135 L205 158 L205 138 L190 138 L190 103"/><path d="M140 103 L140 115 L165 115 L165 103"/><circle cx="155" cy="125" r="2.5"/><path d="M85 65 L85 55"/><path d="M275 65 L275 55"/></g></svg>`,
  revolver: () => `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><g><circle cx="180" cy="90" r="32"/><circle cx="180" cy="90" r="22"/><circle cx="180" cy="78" r="3"/><circle cx="190" cy="84" r="3"/><circle cx="190" cy="96" r="3"/><circle cx="180" cy="102" r="3"/><circle cx="170" cy="96" r="3"/><circle cx="170" cy="84" r="3"/><rect x="212" y="84" width="100" height="14" rx="1"/><line x1="225" y1="91" x2="305" y2="91"/><path d="M148 100 L138 110 L138 145 L168 160 L172 130"/><path d="M165 110 L150 130 L162 130"/><circle cx="155" cy="120" r="1.5"/><path d="M180 58 L180 50 M186 60 L190 54"/></g></svg>`,
  rifle: () => `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><g><rect x="40" y="80" width="320" height="14" rx="2"/><line x1="50" y1="87" x2="350" y2="87"/><path d="M40 80 L20 78 L15 90 L20 100 L40 94"/><path d="M40 94 L40 130 L80 140 L100 130 L100 94"/><line x1="55" y1="100" x2="80" y2="125"/><rect x="160" y="60" width="80" height="20" rx="3"/><line x1="170" y1="70" x2="230" y2="70"/><circle cx="170" cy="70" r="4"/><circle cx="230" cy="70" r="4"/><path d="M165 80 L165 90 M170 80 L170 90 M225 80 L225 90 M230 80 L230 90"/><rect x="350" y="78" width="20" height="18" rx="2"/><path d="M120 94 L120 110 L130 110 L130 100"/></g></svg>`,
  shotgun: () => `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><g><rect x="40" y="78" width="320" height="10" rx="1"/><rect x="40" y="92" width="320" height="10" rx="1"/><line x1="50" y1="83" x2="350" y2="83"/><line x1="50" y1="97" x2="350" y2="97"/><path d="M40 78 L20 75 L15 92 L20 105 L40 102"/><path d="M40 102 L40 135 L85 148 L105 135 L105 102"/><rect x="105" y="92" width="55" height="18" rx="2"/><path d="M120 110 L120 125 L130 125 L130 115"/><circle cx="125" cy="110" r="2"/><line x1="115" y1="98" x2="155" y2="98"/></g></svg>`,
  ammo: () => `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><g><rect x="80" y="60" width="50" height="80" rx="3"/><path d="M80 60 Q105 35 130 60"/><circle cx="105" cy="50" r="3"/><line x1="85" y1="80" x2="125" y2="80"/><line x1="85" y1="100" x2="125" y2="100"/><line x1="85" y1="120" x2="125" y2="120"/><rect x="160" y="65" width="45" height="75" rx="3"/><path d="M160 65 Q182 40 205 65"/><circle cx="182" cy="55" r="2.5"/><line x1="165" y1="85" x2="200" y2="85"/><line x1="165" y1="105" x2="200" y2="105"/><rect x="230" y="70" width="40" height="70" rx="3"/><path d="M230 70 Q250 48 270 70"/><line x1="235" y1="90" x2="265" y2="90"/><line x1="235" y1="110" x2="265" y2="110"/><rect x="295" y="75" width="35" height="65" rx="3"/><path d="M295 75 Q312 55 330 75"/><line x1="300" y1="95" x2="325" y2="95"/></g></svg>`,
  airgun: () => `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><g><rect x="55" y="60" width="240" height="42" rx="6"/><circle cx="80" cy="81" r="6"/><line x1="100" y1="71" x2="280" y2="71"/><line x1="100" y1="91" x2="280" y2="91"/><rect x="295" y="72" width="20" height="20" rx="2"/><path d="M170 102 L170 130 L195 145 L195 130"/><path d="M140 102 L140 113 L165 113 L165 102"/><path d="M70 60 L70 50 M75 50 L75 60"/></g></svg>`,
  scope: () => `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><g><rect x="50" y="80" width="280" height="36" rx="4"/><circle cx="80" cy="98" r="22"/><circle cx="80" cy="98" r="14"/><line x1="80" y1="84" x2="80" y2="112"/><line x1="66" y1="98" x2="94" y2="98"/><circle cx="300" cy="98" r="20"/><circle cx="300" cy="98" r="13"/><rect x="160" y="68" width="50" height="14" rx="2"/><line x1="170" y1="116" x2="170" y2="125"/><line x1="195" y1="116" x2="195" y2="125"/></g></svg>`,
  holster: () => `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><g><path d="M130 50 L260 50 L275 90 L275 155 Q275 165 265 165 L150 165 Q140 165 140 155 L130 90 Z"/><line x1="145" y1="90" x2="265" y2="90"/><line x1="145" y1="120" x2="265" y2="120"/><circle cx="195" cy="60" r="4"/><circle cx="225" cy="60" r="4"/><path d="M155 50 L155 30 L250 30 L250 50"/><circle cx="170" cy="40" r="2"/><circle cx="235" cy="40" r="2"/></g></svg>`,
  cleaning: () => `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><g><rect x="40" y="60" width="320" height="100" rx="6"/><line x1="40" y1="100" x2="360" y2="100"/><circle cx="80" cy="80" r="10"/><circle cx="80" cy="80" r="5"/><rect x="110" y="72" width="80" height="16" rx="2"/><rect x="200" y="72" width="40" height="16" rx="2"/><rect x="250" y="72" width="100" height="16" rx="2"/><rect x="60" y="115" width="280" height="14" rx="2"/><rect x="60" y="135" width="200" height="14" rx="2"/></g></svg>`,
  case: () => `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><g><rect x="50" y="55" width="300" height="100" rx="8"/><line x1="50" y1="100" x2="350" y2="100"/><circle cx="100" cy="100" r="4"/><circle cx="200" cy="100" r="4"/><circle cx="300" cy="100" r="4"/><rect x="170" y="135" width="60" height="14" rx="3"/><line x1="120" y1="75" x2="280" y2="75"/><line x1="120" y1="125" x2="280" y2="125"/></g></svg>`,
  storefront: () => `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><g><rect x="40" y="80" width="320" height="180" stroke="#D4AF37"/><rect x="60" y="100" width="120" height="120" stroke="#D4AF37"/><rect x="220" y="100" width="120" height="120" stroke="#D4AF37"/><rect x="170" y="160" width="60" height="100" stroke="#D4AF37"/><line x1="60" y1="160" x2="180" y2="160" stroke="#D4AF37"/><line x1="220" y1="160" x2="340" y2="160" stroke="#D4AF37"/><line x1="60" y1="100" x2="180" y2="100" stroke="#D4AF37"/><path d="M40 80 L100 40 L300 40 L360 80" stroke="#D4AF37"/><text x="200" y="68" text-anchor="middle" fill="#D4AF37" stroke="none" font-family="Playfair Display" font-size="14" font-style="italic">Sahibzada</text><line x1="80" y1="120" x2="160" y2="120" stroke="#D4AF37" stroke-width="0.7"/><line x1="80" y1="140" x2="160" y2="140" stroke="#D4AF37" stroke-width="0.7"/><line x1="240" y1="120" x2="320" y2="120" stroke="#D4AF37" stroke-width="0.7"/><line x1="240" y1="140" x2="320" y2="140" stroke="#D4AF37" stroke-width="0.7"/></g></svg>`,
  gunsmith: () => `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><g stroke="#D4AF37"><circle cx="200" cy="90" r="40"/><path d="M180 80 Q200 70 220 80"/><circle cx="186" cy="92" r="3"/><circle cx="214" cy="92" r="3"/><path d="M195 105 Q200 110 205 105"/><path d="M150 130 L250 130 L260 200 L240 280 L160 280 L140 200 Z"/><rect x="195" y="135" width="10" height="40"/><circle cx="200" cy="180" r="6"/><path d="M40 220 L120 220 L120 260 L40 260 Z"/><circle cx="60" cy="240" r="5"/><circle cx="80" cy="240" r="5"/><path d="M280 220 L380 220 L380 260 L280 260 Z"/><line x1="295" y1="240" x2="365" y2="240"/></g></svg>`,
  insta: () => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2"><rect x="20" y="20" width="60" height="60" rx="14"/><circle cx="50" cy="50" r="14"/><circle cx="68" cy="32" r="3" fill="currentColor"/></svg>`,
  insta2: () => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2"><polygon points="50,15 60,40 85,40 65,55 75,80 50,65 25,80 35,55 15,40 40,40"/></svg>`,
  insta3: () => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2"><circle cx="50" cy="50" r="32"/><polygon points="42,38 42,62 64,50" fill="currentColor"/></svg>`
};

// Random firearm SVG picker
const FIREARM_SVGS = ['pistol1911', 'pistolModern', 'revolver', 'rifle', 'shotgun'];
const svgFor = (kind) => SVG[kind] ? SVG[kind]() : SVG.pistol1911();

// Real gun images mapped by svg type (Unsplash)
const GUN_IMAGES = {
  pistol1911: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=500&q=75',
  pistolModern: 'https://images.pexels.com/photos/6091852/pexels-photo-6091852.jpeg',
  revolver: 'https://images.pexels.com/photos/34730321/pexels-photo-34730321.jpeg',
  rifle: 'https://images.pexels.com/photos/864987/pexels-photo-864987.jpeg',
  shotgun: 'https://images.pexels.com/photos/26830939/pexels-photo-26830939.jpeg',
  airgun: 'https://as2.ftcdn.net/v2/jpg/01/93/01/71/1000_F_193017139_cdcblshZvG0YGuwvIxCcSsNN46KYKocm.jpg',
  ammo: 'https://as2.ftcdn.net/v2/jpg/03/26/80/35/1000_F_326803598_ExmJS1eF2nIRLxccFY7ld8YqLyCl3Eg7.jpg',
  scope: 'https://as2.ftcdn.net/v2/jpg/19/12/08/51/1000_F_1912085182_kMvCBBWhj5gGz332OnqL5mzrZjqQyvRc.jpg',
  holster: 'https://t4.ftcdn.net/jpg/19/84/98/25/240_F_1984982573_yegOCiyKhKN6vkE9venLx0KTuhq2PVHT.jpg',
};
function getGunImage(svg) {
  return GUN_IMAGES[svg] || GUN_IMAGES.pistol1911;
}

// ============================================================
// FORMATTERS
// ============================================================
const formatINR = (paise) => {
  if (paise === null || paise === undefined) return '—';
  const rupees = paise / 100;
  return '₹' + rupees.toLocaleString('en-IN', { maximumFractionDigits: 0 });
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const escapeHtml = (s) => {
  if (s === null || s === undefined) return '';
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
};

// ============================================================
// DATA: CATEGORIES
// ============================================================
const CATEGORIES = [
  { slug: 'pistols', name: 'Pistols', icon: 'pistolModern', desc: 'Semi-automatic pistols', flow: 'license' },
  { slug: 'revolvers', name: 'Revolvers', icon: 'revolver', desc: 'Wheel-gun classics', flow: 'license' },
  { slug: 'rifles', name: 'Rifles', icon: 'rifle', desc: 'Bolt, lever, semi-auto', flow: 'license' },
  { slug: 'shotguns', name: 'Shotguns', icon: 'shotgun', desc: 'SBBL, DBBL, Over-Under', flow: 'license' },
  { slug: 'preowned', name: 'Pre-Owned', icon: 'revolver', desc: 'Curated second-hand', flow: 'license-preowned', highlight: true },
  { slug: 'ammunition', name: 'Ammunition', icon: 'ammo', desc: 'NPB · PB · Air-gun', flow: 'display-only' },
  { slug: 'airguns', name: 'Air & CO2 Guns', icon: 'airgun', desc: 'Below threshold', flow: 'aadhar' },
  { slug: 'accessories', name: 'Accessories', icon: 'scope', desc: 'Holsters, optics, kits', flow: 'cart' }
];

// ============================================================
// DATA: BRANDS
// ============================================================
const BRANDS = [
  { slug: 'kiehberg', name: 'Kiehberg', initial: 'K', country: 'Germany', region: 'international', logo: 'kiehberg.jpg', desc: 'Premium 1911 platforms in cooperation with Girsan and SIIL India. Recognized for engineering precision and refined finishing.', highlight: true },
  { slug: 'beretta', name: 'Beretta', initial: 'B', country: 'Italy', region: 'international', logo: 'beretta.jpg', desc: 'Italian heritage manufacturer with five centuries of arms-making expertise. Full pistol and shotgun lines.' },
  { slug: 'girsan', name: 'Girsan', initial: 'G', country: 'Turkey', region: 'international', logo: 'girsan.jpg', desc: 'Modern service pistols and pistol platforms with strong value-engineering. MC series and 1911 lineage.' },
  { slug: 'alfaproj', name: 'Alfaproj', initial: 'A', country: 'Czech Republic', region: 'international', logo: 'alfaproj.jpg', desc: 'Czech manufacturer specialising in revolvers and sporting firearms. Strong sport-shooting following.' },
  { slug: 'webley', name: 'Webley & Scott', initial: 'W', country: 'India / UK', region: 'indian', logo: 'webley.jpg', desc: 'Iconic British heritage brand revived for the Indian market — manufactured in Sandila, Hardoi by Sial Manufacturers. Revolvers, pistols, and air guns.', highlight: true },
  { slug: 'malhotra', name: 'Malhotra Defence', initial: 'M', country: 'India', region: 'indian', logo: 'malhotra.jpg', desc: 'Premium domestic 1911 manufacturer. Their Guardian 1911 is a benchmark domestic product, well-suited to luxury positioning.' },
  { slug: 'nanda', name: 'Nanda Arms Corp', initial: 'N', country: 'India', region: 'indian', logo: 'nanda.jpg', desc: 'Lucknow-based manufacturer producing modern double-stack pistols with reported Baikal collaboration. Strong value-for-money positioning.' },
  { slug: 'siil', name: 'SIIL', initial: 'S', country: 'India', region: 'indian', logo: 'siil.jpg', desc: 'Syndicate Innovations International Limited — assembly partner for Kiehberg in India.' },
  { slug: 'iof', name: 'Indian Ordnance Factory', initial: 'I', country: 'India', region: 'indian', logo: 'iof.jpg', desc: 'Civilian variants of IOF products. Government-manufactured, often the most affordable entry point.' }
];

// ============================================================
// DATA: PRODUCTS
// ============================================================
// flow types: 'license' | 'license-preowned' | 'display-only' | 'aadhar' | 'cart'
const PRODUCTS = [
  // FIREARM OF THE MONTH
  {
    id: 'p001', slug: 'kiehberg-1911-chrome', name: 'Kiehberg 1911 Chrome', tagline: 'Limited series competition pistol',
    category: 'pistols', flow: 'license', brand: 'kiehberg', price: 89500000, oldPrice: null,
    caliber: '.32 ACP', barrel: '5″', capacity: '7+1', material: 'Stainless / Chrome',
    bore: 'NPB', svg: 'pistol1911', isFOTM: true, isFeatured: true, isExclusive: true,
    summary: 'A limited-edition 1911 platform crafted in cooperation with Girsan and finished to Kiehberg\'s exacting standards. Hand-tuned trigger, chrome-finished slide, and target-grade barrel.',
    description: 'The Kiehberg 1911 Chrome represents a refined evolution of the legendary Browning design. Built on a forged 4140 steel frame with a CNC-machined slide, this pistol is hand-fitted at the Kiehberg facility and finished with mirror chrome over a deep-blued substrate. The trigger is tuned to a clean 4-pound break suitable for both target and defensive use.\n\nIn cooperation with our SIIL India assembly partners, the Chrome variant is being made available in limited quantities to the Indian sport-shooting community.',
    badges: ['One-of-a-Kind', 'Featured'], stock: 2
  },
  // PISTOLS (license)
  { id: 'p002', slug: 'kiehberg-subcompact', name: 'Kiehberg Sub-Compact', tagline: 'Carry-class precision', category: 'pistols', flow: 'license', brand: 'kiehberg', price: 67500000, caliber: '.32 ACP', barrel: '3.3″', capacity: '7+1', material: 'Alloy frame', bore: 'NPB', svg: 'pistolModern', isFeatured: true, summary: 'Compact 1911 variant ideal for licensed carry. Light-weight alloy frame with steel slide.', description: 'Refined sub-compact pistol drawing from the 1911 lineage. The aluminum alloy frame keeps the carry weight manageable while the steel slide preserves the recoil characteristics shooters expect from the platform.', stock: 4 },
  { id: 'p003', slug: 'beretta-92fs', name: 'Beretta 92FS', tagline: 'The classic service pistol', category: 'pistols', flow: 'license', brand: 'beretta', price: 78900000, caliber: '.32 ACP', barrel: '4.9″', capacity: '8+1', material: 'Steel / Alloy', bore: 'NPB', svg: 'pistolModern', summary: 'Italian heritage in a refined NPB civilian variant.', description: 'The 92FS platform is a benchmark service pistol with unmatched longevity. The civilian NPB variant retains the trigger system, double-action mechanism, and ambidextrous safety while complying with Indian licensing norms.', stock: 1 },
  { id: 'p004', slug: 'girsan-mc14t', name: 'Girsan MC14T', tagline: 'Tip-up barrel ease', category: 'pistols', flow: 'license', brand: 'girsan', price: 54200000, caliber: '.380 ACP', barrel: '4.5″', capacity: '7+1', material: 'Alloy', bore: 'NPB', svg: 'pistolModern', summary: 'Tip-up barrel design for easy loading without rack.', description: 'The MC14T tip-up barrel design eliminates the need to rack the slide for chambering — ideal for shooters with reduced hand strength. Modern ergonomics and proven reliability.', stock: 3 },
  { id: 'p005', slug: 'malhotra-guardian-1911', name: 'Malhotra Guardian 1911', tagline: 'Indian-made benchmark', category: 'pistols', flow: 'license', brand: 'malhotra', price: 49500000, caliber: '.32 ACP', barrel: '5″', capacity: '7+1', material: 'Carbon Steel', bore: 'NPB', svg: 'pistol1911', summary: 'A flagship domestic 1911. Forged frame, hand-fitted slide.', description: 'The Guardian 1911 is Malhotra Defence\'s flagship domestic product — a forged-frame 1911 platform hand-fitted at their facility. Excellent value for licensed shooters seeking a premium domestic alternative to imports.', stock: 5 },
  { id: 'p006', slug: 'nanda-pride-9', name: 'Nanda Pride .32', tagline: 'Modern double-stack', category: 'pistols', flow: 'license', brand: 'nanda', price: 38500000, caliber: '.32 ACP', barrel: '4″', capacity: '13+1', material: 'Polymer / Steel', bore: 'NPB', svg: 'pistolModern', summary: 'Modern polymer-frame pistol with double-stack capacity.', description: 'The Pride series brings polymer-frame engineering to the Indian market with strong value-for-money positioning. Double-stack magazine and modern ergonomics.', stock: 8 },
  // REVOLVERS
  { id: 'p007', slug: 'webley-mkiv', name: 'Webley Mk IV Revolver', tagline: 'British heritage, Indian manufacture', category: 'revolvers', flow: 'license', brand: 'webley', price: 28500000, caliber: '.32 S&W Long', barrel: '4″', capacity: '6', material: 'Steel', bore: 'NPB', svg: 'revolver', isFeatured: true, summary: 'Iconic Webley double-action revolver, manufactured in India by Sial.', description: 'The Mk IV revolver embodies the classic Webley double-action design. Made in Sandila, Hardoi by Sial Manufacturers under the revived Webley & Scott Indian brand. A natural choice for collectors and licensed sport shooters drawn to traditional revolver craftsmanship.', stock: 6 },
  { id: 'p008', slug: 'alfaproj-820', name: 'Alfaproj Model 820', tagline: 'Czech-engineered precision', category: 'revolvers', flow: 'license', brand: 'alfaproj', price: 42000000, caliber: '.32 S&W Long', barrel: '3″', capacity: '6', material: 'Steel', bore: 'NPB', svg: 'revolver', summary: 'Compact six-shot revolver with adjustable target sights.', description: 'Czech engineering applied to a compact revolver platform. Adjustable target sights and refined trigger pull suit precision shooters.', stock: 2 },
  { id: 'p009', slug: 'iof-32-revolver', name: 'IOF .32 Revolver', tagline: 'Reliable Indian classic', category: 'revolvers', flow: 'license', brand: 'iof', price: 13500000, caliber: '.32 S&W', barrel: '2.5″', capacity: '6', material: 'Steel', bore: 'NPB', svg: 'revolver', summary: 'The most affordable licensed entry point in India.', description: 'Manufactured by the Indian Ordnance Factory for the civilian market. The most economical licensed revolver available, with proven reliability and parts availability across India.', stock: 12 },
  // RIFLES
  { id: 'p010', slug: 'beretta-30-06', name: 'Beretta 30-06 Sporter', tagline: 'Bolt-action precision', category: 'rifles', flow: 'license', brand: 'beretta', price: 145000000, caliber: '.30-06 Sporting', barrel: '24″', capacity: '4+1', material: 'Walnut / Steel', bore: 'NPB', svg: 'rifle', summary: 'Premium bolt-action sporting rifle with walnut stock.', description: 'A premium bolt-action sporting rifle finished with hand-selected walnut and engraved receiver detailing. .30-06 caliber is permitted under sporting NPB classification in India for licensed hunters.', stock: 1 },
  { id: 'p011', slug: 'iof-315', name: 'IOF .315 Sporting Rifle', tagline: 'India\'s licensed standard', category: 'rifles', flow: 'license', brand: 'iof', price: 9500000, caliber: '.315 Sporting (8x50R)', barrel: '23″', capacity: '5+1', material: 'Wood / Steel', bore: 'NPB', svg: 'rifle', summary: 'The most widely owned NPB sporting rifle in India.', description: 'The .315 Sporting Rifle from the Indian Ordnance Factory is the most widely-licensed sporting rifle in India. Reliable, parts widely available, and ammunition stocked nationwide.', stock: 4 },
  // SHOTGUNS
  { id: 'p012', slug: 'webley-12g-dbbl', name: 'Webley 12 Gauge DBBL', tagline: 'Side-by-side classic', category: 'shotguns', flow: 'license', brand: 'webley', price: 35000000, caliber: '12 Gauge', barrel: '28″', capacity: '2', material: 'Walnut / Steel', bore: 'NPB', svg: 'shotgun', isFeatured: true, summary: 'Side-by-side double-barrel shotgun with engraved receiver.', description: 'A traditional 12 gauge double-barrel shotgun with hand-engraved receiver detailing and select-grade walnut stock. Manufactured in India under the Webley & Scott revival.', stock: 3 },
  { id: 'p013', slug: 'beretta-686', name: 'Beretta 686 Silver Pigeon', tagline: 'Over-under elegance', category: 'shotguns', flow: 'license', brand: 'beretta', price: 165000000, caliber: '12 Gauge', barrel: '28″', capacity: '2', material: 'Steel / Walnut', bore: 'NPB', svg: 'shotgun', isExclusive: true, summary: 'Italian over-under in select walnut. Exclusive at Sahibzada.', description: 'The Silver Pigeon is Beretta\'s benchmark over-under shotgun, hand-finished at the Gardone Val Trompia facility. Floral engraving on a silver receiver, paired with select walnut. Exclusive to Sahibzada in our region.', stock: 1 },
  // AMMUNITION (display-only)
  { id: 'p014', slug: 'ammo-32-acp', name: '.32 ACP Cartridges', tagline: 'NPB pistol ammunition', category: 'ammunition', flow: 'display-only', brand: 'iof', price: null, caliber: '.32 ACP', bore: 'NPB', svg: 'ammo', summary: 'Standard 50-round box. Documents required.', description: '.32 ACP is the most widely-used NPB pistol caliber in India. Box of 50 rounds, FMJ ball ammunition, manufactured to civilian specifications. Documentation: Valid Indian arms licence with NPB endorsement.', stock: 'inquire' },
  { id: 'p015', slug: 'ammo-12g-shells', name: '12 Gauge Shotshells', tagline: 'Sporting / hunting load', category: 'ammunition', flow: 'display-only', brand: 'iof', price: null, caliber: '12 Gauge', bore: 'NPB', svg: 'ammo', summary: '25-round box. NPB. Documents required.', description: '12 Gauge shotshells in standard sporting load. Box of 25. Documentation: Valid Indian arms licence with shotgun endorsement.', stock: 'inquire' },
  { id: 'p016', slug: 'ammo-315', name: '.315 Sporting Cartridges', tagline: 'Rifle ammunition', category: 'ammunition', flow: 'display-only', brand: 'iof', price: null, caliber: '.315 Sporting (8x50R)', bore: 'NPB', svg: 'ammo', summary: 'Box of 20. NPB. Documents required.', description: '.315 Sporting (8x50R) ammunition for licensed sporting rifles. Box of 20. Documentation: Valid Indian arms licence with rifle endorsement.', stock: 'inquire' },
  { id: 'p017', slug: 'ammo-22-pellets', name: '.22 Air-Gun Pellets', tagline: 'No licence required', category: 'ammunition', flow: 'display-only', brand: 'iof', price: 35000, caliber: '.22 (5.5mm)', bore: 'AIR', svg: 'ammo', summary: 'Tin of 250 air-gun pellets. No licence required.', description: 'High-quality .22 (5.5mm) air-gun pellets suitable for sub-threshold air rifles and pistols. Tin of 250. No firearm licence required for purchase, though air weapons exceeding 20J / 4.5mm bore are subject to separate licensing.', stock: 200 },
  // CO2 / AIR GUNS (aadhar)
  { id: 'p018', slug: 'co2-pistol-classic', name: 'CO2 Air Pistol — Classic', tagline: 'Below licensing threshold', category: 'airguns', flow: 'aadhar', brand: 'webley', price: 1850000, caliber: '.177 (4.5mm)', muzzleEnergy: '7.5 J', material: 'Alloy', svg: 'airgun', isFeatured: true, summary: '7.5J CO2 pistol, Aadhar verification at checkout.', description: 'CO2-powered air pistol operating below the 20J / 4.5mm licensing threshold. Aadhar verification is required at checkout per our compliance policy and is reviewed by Team Sahibzada within 24 hours before order processing.', stock: 18 },
  { id: 'p019', slug: 'pcp-air-rifle', name: 'PCP Air Rifle', tagline: 'Match-grade target', category: 'airguns', flow: 'aadhar', brand: 'webley', price: 5800000, caliber: '.177 (4.5mm)', muzzleEnergy: '12 J', material: 'Walnut / Steel', svg: 'airgun', summary: '12J pre-charged pneumatic match rifle.', description: 'A pre-charged pneumatic match rifle delivering 12J at the muzzle — below the licensing threshold. Adjustable cheek piece and butt-pad for competitive shooting.', stock: 6 },
  { id: 'p020', slug: 'co2-revolver', name: 'CO2 Revolver Replica', tagline: 'Steel BB, training', category: 'airguns', flow: 'aadhar', brand: 'webley', price: 1250000, caliber: '4.5mm BB', muzzleEnergy: '6 J', material: 'Alloy', svg: 'revolver', summary: 'Six-shooter style CO2 revolver for plinking and training.', description: 'CO2-powered revolver replica firing 4.5mm steel BBs. Excellent for training and plinking. Below licensing threshold but Aadhar required for our records.', stock: 22 },
  // ACCESSORIES (cart)
  { id: 'p021', slug: 'leather-holster-1911', name: 'Premium Leather Holster — 1911', tagline: 'Hand-stitched bull-leather', category: 'accessories', flow: 'cart', brand: 'iof', price: 450000, material: 'Leather', svg: 'holster', isFeatured: true, summary: 'Hand-stitched leather holster for full-size 1911.', description: 'Premium full-grain leather holster, hand-stitched in Punjab. Sized for 5-inch 1911 platforms. Reinforced retention, brass fittings.', stock: 30 },
  { id: 'p022', slug: 'red-dot-sight', name: 'Red Dot Sight — 4 MOA', tagline: 'Compact reflex optic', category: 'accessories', flow: 'cart', brand: 'iof', price: 1850000, svg: 'scope', summary: '4 MOA red dot, picatinny mount.', description: 'Compact reflex sight with 4 MOA dot. Aluminum housing, picatinny base, multi-coated lens. Ideal for pistol or rifle setups.', stock: 12 },
  { id: 'p023', slug: 'cleaning-kit', name: 'Universal Cleaning Kit', tagline: 'Multi-caliber rod set', category: 'accessories', flow: 'cart', brand: 'iof', price: 285000, svg: 'cleaning', summary: 'Brass rods, brushes, and patches for all common calibers.', description: 'Comprehensive cleaning kit including brass rods, bronze brushes, jags, and patches sized for common Indian civilian calibers from .22 through 12 gauge.', stock: 45 },
  { id: 'p024', slug: 'hard-case', name: 'Hard Carry Case — Pistol', tagline: 'Foam-padded, lockable', category: 'accessories', flow: 'cart', brand: 'iof', price: 320000, svg: 'case', summary: 'Foam-padded pistol case with combination lock.', description: 'Hard-shell carry case with high-density foam padding and integrated combination lock. Sized for full-size service pistols and accessories.', stock: 28 },
  { id: 'p025', slug: 'gun-safe', name: 'Gun Safe — Single Long', tagline: 'Fire-resistant, electronic lock', category: 'accessories', flow: 'cart', brand: 'iof', price: 4500000, svg: 'case', summary: 'Single-long-arm safe with electronic + key lock.', description: 'Fire-resistant gun safe sized for one long arm. Electronic keypad with mechanical key override. Carpeted interior, foam-lined butt-cup.', stock: 4 },
  { id: 'p026', slug: 'rifle-scope', name: 'Rifle Scope 3-9x40', tagline: 'Variable hunting scope', category: 'accessories', flow: 'cart', brand: 'iof', price: 920000, svg: 'scope', summary: '3-9x40 variable hunting scope with mil-dot reticle.', description: 'Variable-power rifle scope (3x to 9x) with 40mm objective lens and mil-dot reticle. Suitable for sporting rifles in NPB calibers.', stock: 9 }
];

// ============================================================
// DATA: PRE-OWNED INVENTORY
// ============================================================
const PREOWNED = [
  { id: 'po001', slug: 'preowned-webley-mkiv-1995', name: 'Webley Mk IV Revolver (1995)', tagline: 'Heirloom condition, single owner', category: 'preowned', subcategory: 'revolvers', flow: 'license-preowned', brand: 'webley', price: 18500000, caliber: '.32 S&W Long', year: '1995', condition: 'Excellent', conditionDesc: 'Single-owner heirloom in original presentation case', svg: 'revolver', isOneOfKind: true, recentlyListed: true, summary: 'Single-owner heirloom revolver in excellent condition.', description: 'A pristine 1995 Webley Mk IV revolver from a single-owner collection. Mechanically tight, original bluing 95% intact, original presentation case included. Owner has held the licence since manufacture date.\n\nReason for sale: Owner relocating to country where firearm cannot be transferred.\n\nThis pre-owned firearm is subject to the mandatory 45-day intimation period under Section 5 of the Arms Act 1959. Final ownership transfer occurs in-store after regulatory clearance.', accessories: 'Original case, manual, cleaning kit', reason: 'Owner relocating abroad', stock: 1 },
  { id: 'po002', slug: 'preowned-iof-32-revolver', name: 'IOF .32 Revolver (2008)', tagline: 'Light use, family transfer', category: 'preowned', subcategory: 'revolvers', flow: 'license-preowned', brand: 'iof', price: 8500000, caliber: '.32 S&W', year: '2008', condition: 'Very Good', conditionDesc: 'Light use, mechanism tight, excellent bore', svg: 'revolver', recentlyListed: true, summary: 'Lightly used IOF revolver, family transfer.', description: 'IOF .32 revolver from 2008 in very good condition. Light use only, mechanism is tight, bore is excellent. Available following family transfer.', accessories: 'Original holster', reason: 'Family transfer / upgrade', stock: 1 },
  { id: 'po003', slug: 'preowned-beretta-92', name: 'Beretta 92 (2010)', tagline: 'Imported original, complete papers', category: 'preowned', subcategory: 'pistols', flow: 'license-preowned', brand: 'beretta', price: 65000000, caliber: '.32 ACP', year: '2010', condition: 'Excellent', conditionDesc: 'Original Italian import, all papers intact', svg: 'pistolModern', isOneOfKind: true, summary: 'Original Italian Beretta 92 with complete documentation.', description: 'A 2010 Beretta 92 imported as an original Italian product, with all original documentation, customs papers, and licence transfers intact. The pistol has been carefully maintained and is in excellent condition.', accessories: 'Original case, two magazines, manual, all papers', reason: 'Owner upgrading to .357', stock: 1 },
  { id: 'po004', slug: 'preowned-webley-shotgun', name: 'Webley 12G DBBL (2015)', tagline: 'Custom engraving, walnut', category: 'preowned', subcategory: 'shotguns', flow: 'license-preowned', brand: 'webley', price: 22500000, caliber: '12 Gauge', year: '2015', condition: 'Very Good', conditionDesc: 'Custom engraving, slight stock wear', svg: 'shotgun', recentlyListed: true, summary: 'Custom-engraved 12G DBBL with select walnut.', description: 'Webley & Scott DBBL shotgun with custom engraving commissioned by previous owner. Slight cosmetic wear on the stock, mechanism perfect. Excellent value for licensed sport shooters.', accessories: 'Original case, two chokes', reason: 'Owner downsizing collection', stock: 1 },
  { id: 'po005', slug: 'preowned-malhotra-1911', name: 'Malhotra Guardian 1911 (2022)', tagline: 'Lightly used, all original', category: 'preowned', subcategory: 'pistols', flow: 'license-preowned', brand: 'malhotra', price: 38000000, caliber: '.32 ACP', year: '2022', condition: 'Excellent', conditionDesc: 'Less than 200 rounds fired, all original', svg: 'pistol1911', summary: 'Lightly used Guardian 1911, less than 200 rounds.', description: 'Malhotra Guardian 1911 from 2022 with less than 200 rounds fired. All original parts and finishes. Original presentation case included.', accessories: 'Original case, two magazines, manual', reason: 'Owner moving to revolver', stock: 1 },
  { id: 'po006', slug: 'preowned-iof-315', name: 'IOF .315 Sporting (1998)', tagline: 'Vintage hunting rifle', category: 'preowned', subcategory: 'rifles', flow: 'license-preowned', brand: 'iof', price: 6500000, caliber: '.315 (8x50R)', year: '1998', condition: 'Good', conditionDesc: 'Honest tool-grade rifle, sound mechanically', svg: 'rifle', summary: 'Honest hunting rifle in good condition.', description: 'A 1998 IOF .315 sporting rifle showing honest use. Mechanically sound, bore in good condition with light pitting. An excellent first NPB rifle for a new licence holder.', accessories: 'Sling, basic cleaning rod', reason: 'Estate sale', stock: 1 }
];

// ============================================================
// DATA: HELP ARTICLES
// ============================================================
const HELP_ARTICLES = [
  { slug: 'license', icon: 'doc', title: 'How to Apply for an Arms Licence in Punjab', desc: 'Step-by-step guide to applying for a fresh arms licence in Punjab — application forms, supporting documents, verification process, and typical timelines.' },
  { slug: 'renewal', icon: 'refresh', title: 'How to Renew an Existing Arms Licence', desc: 'Renewal procedures, deadlines, fees, and common reasons for renewal delays. Apply at least 90 days before expiry.' },
  { slug: 'uin', icon: 'hash', title: 'How to Apply for a UIN (Unique ID Number)', desc: 'The UIN is mandatory for all licence holders. Process, where to apply, validation, and how to update on existing records.' },
  { slug: 'bore-change', icon: 'tool', title: 'Changing Bore: Smoothbore to Rifled', desc: 'Procedure for converting bore type on an existing licensed firearm. Requires DM permission and gunsmith certification.' },
  { slug: 'endorsement', icon: 'plus', title: 'Adding a Weapon Endorsement', desc: 'Adding additional firearms to an existing arms licence. Documentation, fees, and waiting periods.' },
  { slug: 'transfer', icon: 'swap', title: 'Transferring a Licence (Inherited Firearms)', desc: 'Transfer of licensed firearms upon death of original holder. NOC, succession, 45-day intimation, and Form requirements.' },
  { slug: 'surrender', icon: 'shield', title: 'Surrendering or Depositing a Firearm', desc: 'Voluntary surrender to police, deposit during travel, and re-acquisition procedures. Documentation requirements.' },
  { slug: 'transport', icon: 'truck', title: 'Travel and Transport Rules', desc: 'Rules governing transport of licensed firearms and ammunition within India — by road, rail, and air.' },
  { slug: 'sell', icon: 'rupee', title: 'Selling Your Firearm — How Sahibzada Can Help', desc: 'We welcome trading deals and offer the best prices for pre-owned firearms in Punjab. From obtaining sale permission to handling 45-day intimation, our team assists with the entire process.', featured: true },
  { slug: 'arms-act', icon: 'book', title: 'Arms Act and Arms Rules — Plain Language Summary', desc: 'A clear explanation of the key provisions of the Arms Act 1959 and Arms Rules 2016 that affect civilian firearm owners.' },
  { slug: 'air-weapons', icon: 'wind', title: 'Air Weapons: Rules and Thresholds', desc: 'When air weapons require a licence (above 20J or 4.5mm bore) and ALNR certification process for sub-threshold weapons.' },
  { slug: 'faq', icon: 'help', title: 'FAQ: Common Questions', desc: 'Frequently asked questions about owning a firearm in India — from licensing to ammunition, transport, and storage.' }
];

// ============================================================
// DATA: SERVICES
// ============================================================
const SERVICES = [
  { slug: 'cleaning', title: 'Annual Cleaning & Inspection', price: 'From ₹1,500', turnaround: '24 – 48 hours', desc: 'Full disassembly, deep cleaning, lubrication, and condition inspection. Recommended annually or pre-season for hunters.' },
  { slug: 'sights', title: 'Sight Installation & Zeroing', price: 'From ₹2,500', turnaround: '2 – 3 days', desc: 'Installation of open sights, scopes, or red dots. Includes range time for zeroing at customer\'s preferred distance.' },
  { slug: 'trigger', title: 'Trigger Work', price: 'From ₹3,500', turnaround: '3 – 5 days', desc: 'Trigger pull tuning within bore-restriction guidelines. Smooth-out work, weight adjustment, and overtravel reduction.' },
  { slug: 'stock', title: 'Stock Fitting & Refinishing', price: 'From ₹4,500', turnaround: '7 – 10 days', desc: 'Custom stock fitting, length-of-pull adjustment, refinishing of walnut and synthetic stocks.' },
  { slug: 'magazine', title: 'Magazine Repair & Service', price: 'From ₹800', turnaround: '24 – 48 hours', desc: 'Spring replacement, follower repair, feed-lip adjustment, and follower upgrade for older magazines.' },
  { slug: 'recoil', title: 'Recoil Pad Installation', price: 'From ₹1,800', turnaround: '2 – 3 days', desc: 'Custom-fitted recoil pad installation for shotguns and rifles, including length-of-pull adjustment.' },
  { slug: 'bore-change-service', title: 'Bore Change Service', price: 'On consultation', turnaround: '4 – 8 weeks', desc: 'Coordination of bore-change paperwork, gunsmith work, and DM permission for licensed bore conversions.' },
  { slug: 'restoration', title: 'Antique & Heirloom Restoration', price: 'On consultation', turnaround: '6 – 12 weeks', desc: 'Sympathetic restoration of antique and family-heirloom firearms. Hand-cut chequering, blueing, and engraving repair.' },
  { slug: 'inspection', title: 'Pre-Purchase Inspection', price: '₹2,000', turnaround: '24 hours', desc: 'Independent inspection of a firearm you are considering buying privately. Honest written report on condition and fair market value.' }
];

// ============================================================
// DATA: MOCK ORDERS / INQUIRIES (for Account & Admin demos)
// ============================================================
const MOCK_INQUIRIES = [
  { id: 'INQ-2026-0042', date: '2026-05-08', product: 'Kiehberg 1911 Chrome', customer: 'A. Singh', license: 'PB/AL/12345', uin: 'UIN-2018-PB-78901', status: 'new' },
  { id: 'INQ-2026-0041', date: '2026-05-07', product: 'Beretta 686 Silver Pigeon', customer: 'V. Sharma', license: 'PB/AL/22871', uin: 'UIN-2020-PB-12453', status: 'verified' },
  { id: 'INQ-2026-0040', date: '2026-05-06', product: 'Webley Mk IV Revolver', customer: 'R. Brar', license: 'PB/AL/19384', uin: 'UIN-2019-PB-44219', status: 'completed' },
  { id: 'INQ-2026-0039', date: '2026-05-05', product: 'Beretta 92 (Pre-Owned)', customer: 'K. Bedi', license: 'PB/AL/29381', uin: 'UIN-2021-PB-99812', status: 'pending' },
  { id: 'INQ-2026-0038', date: '2026-05-04', product: 'Malhotra Guardian 1911', customer: 'J. Sandhu', license: 'PB/AL/31821', uin: 'UIN-2022-PB-66731', status: 'verified' }
];
const MOCK_ORDERS = [
  { id: 'ORD-2026-0188', date: '2026-05-08', product: 'CO2 Air Pistol — Classic', amount: 1850000, status: 'pending' },
  { id: 'ORD-2026-0187', date: '2026-05-07', product: 'Premium Leather Holster — 1911', amount: 450000, status: 'shipped' },
  { id: 'ORD-2026-0186', date: '2026-05-07', product: 'Universal Cleaning Kit', amount: 285000, status: 'completed' },
  { id: 'ORD-2026-0185', date: '2026-05-06', product: 'PCP Air Rifle', amount: 5800000, status: 'approved' },
  { id: 'ORD-2026-0184', date: '2026-05-05', product: 'Rifle Scope 3-9x40', amount: 920000, status: 'shipped' }
];
const MOCK_AADHAR_QUEUE = [
  { id: 'ORD-2026-0188', customer: 'A. Singh', product: 'CO2 Air Pistol — Classic', uploaded: '2026-05-08 14:32', amountPaise: 1850000 },
  { id: 'ORD-2026-0183', customer: 'V. Khanna', product: 'CO2 Revolver Replica', uploaded: '2026-05-04 10:15', amountPaise: 1250000 }
];
const MOCK_PAYMENT_LINKS = [
  { id: 'PAY-2026-0091', sent: '2026-05-08 11:20', customer: 'V. Sharma', amount: 165000000, channel: 'WhatsApp', status: 'sent' },
  { id: 'PAY-2026-0090', sent: '2026-05-07 17:08', customer: 'M. Aulakh', amount: 8500000, channel: 'Email', status: 'paid' },
  { id: 'PAY-2026-0089', sent: '2026-05-07 09:42', customer: 'H. Gill', amount: 3500000, channel: 'SMS', status: 'viewed' },
  { id: 'PAY-2026-0088', sent: '2026-05-05 13:18', customer: 'P. Mann', amount: 12500000, channel: 'WhatsApp', status: 'expired' }
];
