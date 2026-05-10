'use strict';

// ============================================================
// STATE
// ============================================================
const state = {
  cart: {},  // { productId: quantity }
  filters: { category: null, brand: null, bore: null, search: '' }
};

// ============================================================
// HELPER RENDERERS
// ============================================================
function getProductByIdOrSlug(idOrSlug) {
  return PRODUCTS.find(p => p.id === idOrSlug || p.slug === idOrSlug)
    || PREOWNED.find(p => p.id === idOrSlug || p.slug === idOrSlug);
}
function getCategoryBySlug(slug) { return CATEGORIES.find(c => c.slug === slug); }
function getBrandBySlug(slug) { return BRANDS.find(b => b.slug === slug); }

function renderProductCard(p) {
  const isAmmo = p.flow === 'display-only';
  const isPreowned = p.flow === 'license-preowned';
  const isLicense = p.flow === 'license';
  const isAadhar = p.flow === 'aadhar';
  const isCart = p.flow === 'cart';

  const brandObj = getBrandBySlug(p.brand);
  const brandName = brandObj ? brandObj.name : p.brand;

  // Badges (top-left)
  const badges = [];
  if (p.bore === 'NPB') badges.push('<span class="badge npb">NPB</span>');
  if (p.bore === 'PB') badges.push('<span class="badge pb">PB</span>');
  if (p.bore === 'AIR') badges.push('<span class="badge airgun">Air-gun</span>');
  if (p.isExclusive) badges.push('<span class="badge gold">Exclusive</span>');
  if (p.isOneOfKind) badges.push('<span class="badge one-of-kind">One of a Kind</span>');
  if (p.isFOTM) badges.push('<span class="badge gold">★ Firearm of the Month</span>');
  if (p.condition) badges.push(`<span class="badge condition-${p.condition.toLowerCase().replace(/ /g, '-')}">${escapeHtml(p.condition)}</span>`);

  // CTA per flow
  let ctaHtml = '';
  let helperHtml = '';
  if (isLicense) {
    ctaHtml = `<button class="btn cta-license" data-action="express-interest" data-id="${p.id}">Express Interest</button>`;
    helperHtml = '<div class="cta-helper">Valid arms licence required · No online checkout</div>';
  } else if (isPreowned) {
    ctaHtml = `<button class="btn cta-license-preowned" data-action="express-interest" data-id="${p.id}">Express Interest</button>`;
    helperHtml = '<div class="cta-helper warn">⚠ 45-day intimation required · Sec. 5 Arms Act 1959</div>';
  } else if (p.flow === 'display-only') {
    return `
    <div class="product-card">
      <div class="product-image" data-link="/product/${p.slug}" style="overflow:hidden;">
        <div class="product-meta">${badges.join('')}</div>
        <img class="product-image-photo" src="${getGunImage(p.svg)}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;">
        <div style="display:none;width:100%;height:100%;align-items:center;justify-content:center;">${SVG[p.svg] ? SVG[p.svg]() : SVG.ammo()}</div>
      </div>
      <div class="product-info">
        <div class="product-brand">${escapeHtml(brandName)}</div>
        <div class="product-name" data-link="/product/${p.slug}">${escapeHtml(p.name)}</div>
        <div class="product-spec">${escapeHtml(p.caliber || '')} ${p.bore ? '· ' + p.bore : ''}</div>
        <div class="product-price-row">
          <div class="product-price-note">Display only</div>
          ${p.price ? `<div class="product-price compact">${formatINR(p.price)}</div>` : ''}
        </div>
      </div>
      <div class="ammo-message">
        <strong>Documents Required to Purchase</strong>
        Please contact or visit Sahibzada Gun House with your valid Indian firearm licence with the appropriate bore endorsement.
      </div>
    </div>
  `;
  } else if (isAadhar) {
    ctaHtml = `<button class="btn cta-aadhar" data-action="add-to-cart" data-id="${p.id}">Add to Cart</button>`;
    helperHtml = '<div class="cta-helper">Aadhar verification required at checkout</div>';
  } else if (isCart) {
    ctaHtml = `<button class="btn cta-cart" data-action="add-to-cart" data-id="${p.id}">Add to Cart</button>`;
  }

  return `
  <div class="product-card">
    <div class="product-image" data-link="/product/${p.slug}" style="overflow:hidden;">
      <div class="product-meta">${badges.join('')}</div>
      <button class="wishlist-btn" data-action="wishlist" data-id="${p.id}" title="Add to wishlist">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
      <img class="product-image-photo" src="${getGunImage(p.svg)}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;">
      <div style="display:none;width:100%;height:100%;align-items:center;justify-content:center;color:var(--gold);">${SVG[p.svg] ? SVG[p.svg]() : SVG.pistol1911()}</div>
    </div>
    <div class="product-info">
      <div class="product-brand">${escapeHtml(brandName)}</div>
      <div class="product-name" data-link="/product/${p.slug}">${escapeHtml(p.name)}</div>
      <div class="product-spec">${escapeHtml(p.caliber || '')} ${p.barrel ? '· ' + p.barrel : ''} ${p.year ? '· ' + p.year : ''}</div>
      <div class="product-price-row">
        <div>
          <div class="product-price compact">${formatINR(p.price)}</div>
          ${p.oldPrice ? `<span class="product-price-old">${formatINR(p.oldPrice)}</span>` : ''}
        </div>
      </div>
    </div>
    <div class="product-cta">${ctaHtml}</div>
    ${helperHtml}
  </div>
`;
}

function renderTrustStrip() {
  return `
  <section class="trust-strip"><div class="container">
    <div class="trust-grid">
      <div class="trust-item">
        <div class="trust-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
        <div class="trust-text"><div class="lbl">Authorized Dealer</div><div class="desc">Form VIII Arms Dealer Licence</div></div>
      </div>
      <div class="trust-item">
        <div class="trust-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>
        <div class="trust-text"><div class="lbl">Same-Day Inquiry Reply</div><div class="desc">Mon–Sat, 10am – 8pm</div></div>
      </div>
      <div class="trust-item">
        <div class="trust-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>
        <div class="trust-text"><div class="lbl">Original Imports</div><div class="desc">Customs-cleared with full papers</div></div>
      </div>
      <div class="trust-item">
        <div class="trust-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
        <div class="trust-text"><div class="lbl">In-Person Compliance</div><div class="desc">All transfers executed in-store</div></div>
      </div>
    </div>
  </div></section>
`;
}

// ============================================================
// PAGE: HOME
// ============================================================
function renderHome() {
  const fotm = PRODUCTS.find(p => p.isFOTM);
  const featured = PRODUCTS.filter(p => p.isFeatured && !p.isFOTM).slice(0, 4);
  const exclusiveItems = PRODUCTS.filter(p => p.isExclusive).slice(0, 3);
  const preownedHighlights = PREOWNED.filter(p => p.isOneOfKind || p.recentlyListed).slice(0, 3);

  const excSlide = exclusiveItems.slice(0, 3);

  return `
  <!-- HERO SLIDER -->
  <section id="home" class="hero-slider" data-slider>
    <div class="hero-slides" id="heroSlides">

      <!-- SLIDE 1 — Main info -->
      <div class="hero-slide hero-slide-1 is-active">
        <div class="container">
          <div class="hero-grid">
            <div class="hero-content">
              <div class="eyebrow slide-animate">Authorized Firearms Dealer · Mohali, Punjab</div>
              <h1 class="slide-animate">The Sahibzada<br>Standard. <em>Since day one.</em></h1>
              <p class="slide-animate">Curated firearms, ammunition, and accessories from the world's premier manufacturers — paired with regulatory expertise that takes the complexity out of legal ownership.</p>
              <div class="hero-cta slide-animate">
                <a class="btn btn-gold" data-link="/shop">Browse the Collection</a>
                <a class="btn btn-outline-light" data-link="/help">Help &amp; Licensing</a>
              </div>
              <div class="hero-stats slide-animate">
                <div class="hero-stat"><div class="num">9</div><div class="lbl">Authorized Brands</div></div>
                <div class="hero-stat"><div class="num">200+</div><div class="lbl">Products in Catalog</div></div>
                <div class="hero-stat"><div class="num">100%</div><div class="lbl">Compliance-First</div></div>
              </div>
            </div>
            <div class="hero-visual">
              <div class="frame"></div>
              <div class="frame-2"></div>
              <div class="firearm-art hero-img-wrap">
                <img src="https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=600&q=80" alt="Premium Firearm" style="width:100%;height:100%;object-fit:cover;border-radius:12px;filter:brightness(0.95);" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div style="display:none;color:var(--gold);">${SVG.pistol1911()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SLIDE 2 — Firearm of the Month -->
      <div class="hero-slide hero-slide-2">
        <img class="slide-bg" src="main_gun.png" alt="Firearm of the Month" onerror="this.style.display='none';">
        <div class="slide-content">
          <div class="container">
            <div class="slide-eyebrow slide-animate">★ Firearm of the Month</div>
            <h2 class="slide-h1 slide-animate">${escapeHtml(fotm.name)}</h2>
            <p class="slide-sub slide-animate">${escapeHtml(fotm.tagline)}</p>
            <div class="slide-specs-row slide-animate">
              <div class="slide-spec"><div class="lbl">Caliber</div><div class="val">${escapeHtml(fotm.caliber)}</div></div>
              <div class="slide-spec"><div class="lbl">Barrel</div><div class="val">${escapeHtml(fotm.barrel)}</div></div>
              <div class="slide-spec"><div class="lbl">Capacity</div><div class="val">${escapeHtml(fotm.capacity)}</div></div>
              <div class="slide-spec"><div class="lbl">Brand</div><div class="val">${escapeHtml(getBrandBySlug(fotm.brand).name)}</div></div>
            </div>
            <div class="slide-price-tag slide-animate">${formatINR(fotm.price)}</div>
            <div class="slide-cta slide-animate">
              <button class="btn btn-gold" data-action="express-interest" data-id="${fotm.id}">Express Interest</button>
              <a class="btn btn-outline-light" data-link="/product/${fotm.slug}">Full Details</a>
            </div>
          </div>
        </div>
      </div>

      <!-- SLIDE 3 — Exclusive Imports -->
      <div class="hero-slide hero-slide-3">
        <div class="slide-content">
          <div class="container">
            <div class="slide-eyebrow slide-animate" style="text-align:center;">Available Only at Sahibzada</div>
            <h2 class="slide-h1 slide-animate" style="text-align:center;color:white;">Exclusive Imports.<br><em style="color:var(--gold-light);font-style:italic;">Sourced for the discerning.</em></h2>
            <p class="slide-sub slide-animate" style="margin:0 auto 12px;text-align:center;">Special imports and limited series — only available in our region through Sahibzada Gun House.</p>
            <div class="slide-3-grid slide-animate">
              ${excSlide.map(p => `
                <div class="slide-3-item" data-link="/product/${p.slug}">
                  <div class="s3-brand">${escapeHtml(getBrandBySlug(p.brand) ? getBrandBySlug(p.brand).name : p.brand)}</div>
                  <div class="s3-name">${escapeHtml(p.name)}</div>
                  <div class="s3-price">${formatINR(p.price)}</div>
                </div>
              `).join('')}
            </div>
            <div style="text-align:center;margin-top:32px;" class="slide-animate">
              <a class="btn btn-gold" data-link="/shop?tag=exclusive">View All Exclusives</a>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Controls -->
    <button class="slider-arrow slider-prev" id="sliderPrev" aria-label="Previous slide">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <button class="slider-arrow slider-next" id="sliderNext" aria-label="Next slide">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
    </button>

    <!-- Dots -->
    <div class="slider-dots" id="sliderDots">
      <button class="slider-dot active" data-slide="0" aria-label="Slide 1"></button>
      <button class="slider-dot" data-slide="1" aria-label="Slide 2"></button>
      <button class="slider-dot" data-slide="2" aria-label="Slide 3"></button>
    </div>

    <!-- Counter -->
    <div class="slide-counter" id="slideCounter">01 / 03</div>
  </section>

  ${renderTrustStrip()}

  <!-- FIREARM OF THE MONTH -->
  <section class="fotm"><div class="container">
    <div class="fotm-card">
      <div class="fotm-image" style="overflow:hidden; position:relative;">
        <div class="fotm-badge">★ Firearm of the Month</div>
        <img src="${getGunImage(fotm.svg)}" alt="${escapeHtml(fotm.name)}" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;filter:brightness(0.85);" onerror="this.style.display='none';" loading="eager">
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--gold);z-index:1;">${SVG[fotm.svg]()}</div>
      </div>
      <div class="fotm-content">
        <div class="brand">${escapeHtml(getBrandBySlug(fotm.brand).name)}</div>
        <h2>${escapeHtml(fotm.name)}</h2>
        <div class="sub">${escapeHtml(fotm.tagline)}</div>
        <p>${escapeHtml(fotm.summary)}</p>
        <div class="fotm-specs">
          <div class="fotm-spec"><div class="lbl">Caliber</div><div class="val">${escapeHtml(fotm.caliber)}</div></div>
          <div class="fotm-spec"><div class="lbl">Barrel</div><div class="val">${escapeHtml(fotm.barrel)}</div></div>
          <div class="fotm-spec"><div class="lbl">Capacity</div><div class="val">${escapeHtml(fotm.capacity)}</div></div>
        </div>
        <div class="fotm-cta">
          <span class="fotm-price">${formatINR(fotm.price)}</span>
          <button class="btn btn-primary btn-sm" data-action="express-interest" data-id="${fotm.id}">Express Interest</button>
          <a class="btn btn-outline-emerald btn-sm" data-link="/product/${fotm.slug}">Full Details</a>
        </div>
      </div>
    </div>
  </div></section>

  <!-- CATEGORIES -->
  <section id="products" class="section"><div class="container">
    <div class="heading-row">
      <div>
        <div class="eyebrow">Browse by Category</div>
        <div class="divider-gold"></div>
        <h2 class="section-heading">A Curated Collection</h2>
        <p class="section-subheading">From service pistols to heritage revolvers, sporting shotguns to gunsmithing services — every piece chosen for its merits.</p>
      </div>
    </div>
    <div class="cat-grid">
      ${CATEGORIES.map(c => `
        <div class="cat-tile ${c.highlight ? 'feature' : ''}" data-link="/shop?cat=${c.slug}">
          <div class="cat-bg" style="background-image: url('${getGunImage(c.icon)}')"></div>
          <div class="cat-content">
            <div class="cat-icon">${SVG[c.icon] ? SVG[c.icon]() : ''}</div>
            <h4>${escapeHtml(c.name)}</h4>
            <p>${escapeHtml(c.desc)}</p>
          </div>
        </div>
      `).join('')}
    </div>
  </div></section>

  <!-- EXCLUSIVE AT SAHIBZADA -->
  <section class="section" style="background: var(--paper);"><div class="container">
    <div class="heading-row">
      <div>
        <div class="eyebrow">Exclusive Imports</div>
        <div class="divider-gold"></div>
        <h2 class="section-heading">Available Only at Sahibzada</h2>
        <p class="section-subheading">Special imports and limited series sourced through our authorized dealer network — only available in our region through Sahibzada Gun House.</p>
      </div>
      <a class="btn btn-outline-emerald btn-sm" data-link="/shop">View All</a>
    </div>
    <div class="product-grid three">
      ${exclusiveItems.map(renderProductCard).join('')}
    </div>
  </div></section>

  <!-- FEATURED PRODUCTS -->
  <section class="section"><div class="container">
    <div class="heading-row">
      <div>
        <div class="eyebrow">Featured</div>
        <div class="divider-gold"></div>
        <h2 class="section-heading">From Our Collection</h2>
        <p class="section-subheading">Hand-picked from our master inventory.</p>
      </div>
      <a class="btn btn-outline-emerald btn-sm" data-link="/shop">Browse All →</a>
    </div>
    <div class="product-grid">
      ${featured.map(renderProductCard).join('')}
    </div>
  </div></section>

  <!-- PRE-OWNED SPOTLIGHT -->
  <section class="section" style="background: var(--paper);"><div class="container">
    <div class="heading-row">
      <div>
        <div class="eyebrow">Pre-Owned Inventory</div>
        <div class="divider-gold"></div>
        <h2 class="section-heading">Carefully Curated, Honestly Priced</h2>
        <p class="section-subheading">Each pre-owned firearm is inspected, condition-graded, and listed with full provenance. All transfers are subject to the mandatory 45-day intimation under Section 5 of the Arms Act 1959.</p>
      </div>
      <a class="btn btn-outline-emerald btn-sm" data-link="/preowned">View All Pre-Owned →</a>
    </div>
    <div class="product-grid three">
      ${preownedHighlights.map(renderProductCard).join('')}
    </div>
  </div></section>

  <!-- BRAND STRIP -->
  <section id="brands" class="section"><div class="container">
    <div class="heading-row" style="justify-content: center; text-align: center; flex-direction: column;">
      <div>
        <div class="eyebrow">Authorized For</div>
        <div class="divider-gold center"></div>
        <h2 class="section-heading">Our Brand Portfolio</h2>
      </div>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 24px; margin-top: 40px; align-items: center;">
      ${BRANDS.map(b => `
        <div data-link="/brand/${b.slug}" style="cursor: pointer; text-align: center; padding: 24px 12px; border: 1px solid var(--gray-200); border-radius: var(--radius); transition: all 0.2s; background: white;">
          <div class="brand-logo" style="width: 56px; height: 56px; font-size: 18px; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; overflow: hidden; background: white;">
            ${b.logo ? `<img src="${b.logo}" alt="${escapeHtml(b.name)}" style="width: 100%; height: 100%; object-fit: contain; padding: 6px;">` : b.initial}
          </div>
          <div style="font-family: 'Playfair Display', serif; color: var(--emerald); font-weight: 600; font-size: 14px;">${escapeHtml(b.name)}</div>
          <div style="font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold-dark); margin-top: 2px;">${escapeHtml(b.country)}</div>
        </div>
      `).join('')}
    </div>
    <div style="text-align: center; margin-top: 40px;">
      <a class="btn btn-outline-emerald" data-link="/brands">View All Brands</a>
    </div>
  </div></section>

  <!-- GUN GALLERY STRIP -->
  <section style="background: var(--emerald-darker); padding: 0; overflow: hidden;">
    <div class="gun-gallery-strip" style="display: grid; grid-template-columns: repeat(5, 1fr); height: 220px;">
      <div style="overflow:hidden; position:relative; cursor:pointer;" data-link="/shop?cat=pistols">
        <img src="https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&q=70" alt="Pistols" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.6);transition:all 0.4s;" onmouseover="this.style.filter='brightness(0.8)';this.style.transform='scale(1.05)'" onmouseout="this.style.filter='brightness(0.6)';this.style.transform='scale(1)'">
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;pointer-events:none;">
          <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold-light);font-weight:600;margin-bottom:6px;">Browse</div>
          <div style="font-family:'Playfair Display',serif;font-size:20px;font-weight:600;">Pistols</div>
        </div>
      </div>
      <div style="overflow:hidden; position:relative; cursor:pointer;" data-link="/shop?cat=revolvers">
        <img src="https://c4.wallpaperflare.com/wallpaper/369/169/169/weapon-firearm-gun-revolver-wallpaper-preview.jpg" alt="Revolvers" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.6);transition:all 0.4s;" onmouseover="this.style.filter='brightness(0.8)';this.style.transform='scale(1.05)'" onmouseout="this.style.filter='brightness(0.6)';this.style.transform='scale(1)'">
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;pointer-events:none;">
          <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold-light);font-weight:600;margin-bottom:6px;">Browse</div>
          <div style="font-family:'Playfair Display',serif;font-size:20px;font-weight:600;">Revolvers</div>
        </div>
      </div>
      <div style="overflow:hidden; position:relative; cursor:pointer;" data-link="/shop?cat=rifles">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCRUoxNEblVshGH70kz9dr7VV9_4OE2txKuQ&s" alt="Rifles" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.6);transition:all 0.4s;" onmouseover="this.style.filter='brightness(0.8)';this.style.transform='scale(1.05)'" onmouseout="this.style.filter='brightness(0.6)';this.style.transform='scale(1)'">
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;pointer-events:none;">
          <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold-light);font-weight:600;margin-bottom:6px;">Browse</div>
          <div style="font-family:'Playfair Display',serif;font-size:20px;font-weight:600;">Rifles</div>
        </div>
      </div>
      <div style="overflow:hidden; position:relative; cursor:pointer;" data-link="/shop?cat=shotguns">
        <img src="https://t3.ftcdn.net/jpg/05/37/77/74/360_F_537777455_wX7HNEjrvGNS4SIBVJzO8hwtGDzm4cw9.jpg" alt="Shotguns" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.6);transition:all 0.4s;" onmouseover="this.style.filter='brightness(0.8)';this.style.transform='scale(1.05)'" onmouseout="this.style.filter='brightness(0.6)';this.style.transform='scale(1)'">
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;pointer-events:none;">
          <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold-light);font-weight:600;margin-bottom:6px;">Browse</div>
          <div style="font-family:'Playfair Display',serif;font-size:20px;font-weight:600;">Shotguns</div>
        </div>
      </div>
      <div style="overflow:hidden; position:relative; cursor:pointer;" data-link="/shop?cat=accessories">
        <img src="https://wallpapershome.com/images/pages/ico_h/25097.jpg" alt="Accessories" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.6);transition:all 0.4s;" onmouseover="this.style.filter='brightness(0.8)';this.style.transform='scale(1.05)'" onmouseout="this.style.filter='brightness(0.6)';this.style.transform='scale(1)'">
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;pointer-events:none;">
          <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold-light);font-weight:600;margin-bottom:6px;">Browse</div>
          <div style="font-family:'Playfair Display',serif;font-size:20px;font-weight:600;">Accessories</div>
        </div>
      </div>
    </div>
  </section>

  <!-- STOREFRONT PANEL -->
  <section id="contact" style="background: var(--paper);"><div class="container">
    <div class="storefront-panel">
      <div class="storefront-photo" style="padding: 0; background: none; border-radius: var(--radius); overflow: hidden; position: relative; aspect-ratio: 4/3;">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4360.309617836286!2d76.71366107557864!3d30.68849487460561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feebe777cddff%3A0xe85ddecdab4bb7fd!2sSahibzada%20Gun%20House!5e1!3m2!1sen!2sin!4v1778396445259!5m2!1sen!2sin" width="100%" height="100%" style="border:0; position: absolute; inset: 0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div class="storefront-info">
        <div class="eyebrow">Visit Our Showroom</div>
        <div class="divider-gold"></div>
        <h2>SCO 371, Sector 69<br>Mohali, Punjab</h2>
        <p>Step inside our showroom for hands-on demonstrations, gunsmithing consultations, and unhurried conversations about your next firearm. We welcome licensed shooters, prospective licence applicants, and curious collectors alike.</p>
        <div class="info-row">
          <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <div><strong>Address</strong><div class="info-detail">SCO 371 / Shop 126, Sector 69, Sahibzada Ajit Singh Nagar (Mohali), Punjab — 160062</div></div>
        </div>
        <div class="info-row">
          <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          <div><strong>Showroom Hours</strong><div class="info-detail">Mon–Sat: 10:00 am – 8:00 pm · Sun: By appointment only</div></div>
        </div>
        <div class="info-row">
          <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <div><strong>Phone & WhatsApp</strong><div class="info-detail">+91 96530 01001</div></div>
        </div>
        <div style="margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap;">
          <a class="btn btn-primary btn-sm" href="https://wa.me/919653001001" target="_blank">WhatsApp Us</a>
          <a class="btn btn-outline-emerald btn-sm" href="tel:+919653001001">Call Direct</a>
        </div>
      </div>
    </div>
  </div></section>

  <!-- INSTAGRAM FEED -->
  <section class="section-sm"><div class="container">
    <div class="heading-row" style="justify-content: center; text-align: center; flex-direction: column;">
      <div>
        <div class="eyebrow">Follow @sahibzadagunhouse</div>
        <div class="divider-gold center"></div>
        <h2 class="section-heading">Our Customers</h2>
      </div>
    </div>
    <div class="customer-slider-container" style="margin-top: 32px;">
      <div class="customer-slider">
        ${Array(16).fill(0).map((_, i) => `
          <div class="customer-slide">
            <img src="https://picsum.photos/400/400?random=${i + 1}" alt="Customer ${i + 1}" loading="lazy">
          </div>
        `).join('')}
        ${Array(16).fill(0).map((_, i) => `
          <div class="customer-slide">
            <img src="https://picsum.photos/400/400?random=${i + 1}" alt="Customer ${i + 1}" loading="lazy">
          </div>
        `).join('')}
      </div>
    </div>
  </div></section>
`;
}

// ============================================================
// PAGE: SHOP / CATALOG
// ============================================================
function renderShop(params = {}) {
  const cat = params.cat;
  let products = PRODUCTS.slice();
  let pageTitle = 'All Firearms & Accessories';
  let pageSub = 'The complete collection from Sahibzada Gun House.';

  if (cat) {
    const c = getCategoryBySlug(cat);
    if (c) {
      pageTitle = c.name;
      pageSub = c.desc;
      if (cat === 'preowned') return renderPreowned();
      products = products.filter(p => p.category === cat);
    }
  }
  if (params.tag === 'exclusive') {
    pageTitle = 'Exclusive Imports';
    pageSub = 'Available only at Sahibzada Gun House in our region.';
    products = products.filter(p => p.isExclusive);
  }

  return `
  <section class="shop-header"><div class="container">
    <div class="breadcrumb">
      <a data-link="/">Home</a> <span class="sep">›</span>
      <a data-link="/shop">Shop</a>
      ${cat ? `<span class="sep">›</span> ${escapeHtml(pageTitle)}` : ''}
    </div>
    <h1>${escapeHtml(pageTitle)}</h1>
    <p>${escapeHtml(pageSub)}</p>
  </div></section>

  <div class="container">
    ${cat === 'ammunition' ? `
      <div class="compliance-banner" style="margin: 24px 0 0;">
        <strong>Ammunition is for display only on our website.</strong>
        To purchase ammunition, you must visit Sahibzada Gun House in person with your valid Indian arms licence carrying the appropriate bore endorsement (NPB / PB). Online sale of ammunition is not permitted under Indian law.
      </div>
    ` : ''}
    ${cat === 'airguns' ? `
      <div class="compliance-banner" style="margin: 24px 0 0; background: var(--blue-soft); border-left-color: var(--blue);">
        <strong>Air & CO2 Guns Below Threshold</strong>
        The air weapons listed here operate below the 20 J / 4.5mm bore licensing threshold. Aadhar verification will be required at checkout for our records and is reviewed by our team within 24 hours before order processing.
      </div>
    ` : ''}

    <div class="shop-layout">
      <aside class="filter-sidebar">
        <h3>Filter</h3>
        <div class="filter-group">
          <h4>Brand</h4>
          ${BRANDS.map(b => {
    const count = PRODUCTS.filter(p => p.brand === b.slug && (!cat || p.category === cat)).length;
    return count ? `<label class="filter-option"><input type="checkbox"> ${escapeHtml(b.name)} <span class="count">(${count})</span></label>` : '';
  }).join('')}
        </div>
        <div class="filter-group">
          <h4>Bore Type</h4>
          <label class="filter-option"><input type="checkbox"> NPB · Non-Prohibited <span class="count">(${PRODUCTS.filter(p => p.bore === 'NPB').length})</span></label>
          <label class="filter-option"><input type="checkbox"> PB · Prohibited <span class="count">(${PRODUCTS.filter(p => p.bore === 'PB').length})</span></label>
          <label class="filter-option"><input type="checkbox"> Air-gun (no licence) <span class="count">(${PRODUCTS.filter(p => p.bore === 'AIR').length})</span></label>
        </div>
        <div class="filter-group">
          <h4>Caliber</h4>
          <label class="filter-option"><input type="checkbox"> .32 ACP <span class="count">(${PRODUCTS.filter(p => p.caliber === '.32 ACP').length})</span></label>
          <label class="filter-option"><input type="checkbox"> .32 S&W <span class="count">(${PRODUCTS.filter(p => (p.caliber || '').startsWith('.32 S')).length})</span></label>
          <label class="filter-option"><input type="checkbox"> .315 Sporting <span class="count">(${PRODUCTS.filter(p => (p.caliber || '').startsWith('.315')).length})</span></label>
          <label class="filter-option"><input type="checkbox"> 12 Gauge <span class="count">(${PRODUCTS.filter(p => p.caliber === '12 Gauge').length})</span></label>
          <label class="filter-option"><input type="checkbox"> .177 / 4.5mm <span class="count">(${PRODUCTS.filter(p => (p.caliber || '').includes('4.5mm')).length})</span></label>
        </div>
        <div class="filter-group">
          <h4>Price (₹)</h4>
          <div class="price-inputs">
            <input type="number" placeholder="Min" />
            <span>–</span>
            <input type="number" placeholder="Max" />
          </div>
        </div>
        <div class="filter-group">
          <h4>Availability</h4>
          <label class="filter-option"><input type="checkbox"> In stock</label>
          <label class="filter-option"><input type="checkbox"> Display showroom only</label>
        </div>
      </aside>

      <div>
        <div class="shop-toolbar">
          <div class="shop-results">Showing <strong>${products.length}</strong> products</div>
          <div class="shop-sort">
            <span>Sort by:</span>
            <select>
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
              <option>Brand A–Z</option>
            </select>
          </div>
        </div>
        <div class="product-grid three">
          ${products.length ? products.map(renderProductCard).join('') : '<div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--charcoal-light);">No products in this category yet. <a data-link="/shop" style="color: var(--gold-dark); font-weight: 600;">View all →</a></div>'}
        </div>
      </div>
    </div>
  </div>
`;
}

// ============================================================
// PAGE: PRE-OWNED
// ============================================================
function renderPreowned() {
  const oneOfKind = PREOWNED.filter(p => p.isOneOfKind);
  const recent = PREOWNED.filter(p => p.recentlyListed && !p.isOneOfKind);
  const others = PREOWNED.filter(p => !p.isOneOfKind && !p.recentlyListed);

  return `
  <section class="shop-header"><div class="container">
    <div class="breadcrumb">
      <a data-link="/">Home</a> <span class="sep">›</span> Pre-Owned
    </div>
    <h1>Pre-Owned Inventory</h1>
    <p>Each piece is condition-graded, photographed in detail, and listed with full provenance. Available for inspection at our Mohali showroom.</p>
  </div></section>

  <div class="container">
    <div style="margin: 24px 0;">
      <div class="intimation-notice">
        <div class="icon">!</div>
        <div>
          <strong>Section 5, Arms Act 1959 — 45-Day Intimation Required</strong>
          All pre-owned firearm transfers in India are subject to a mandatory 45-day intimation period to the licensing authority. After your express-interest is verified and you visit our showroom, the formal intimation begins. Final transfer occurs after regulatory clearance.
        </div>
      </div>
    </div>

    ${oneOfKind.length ? `
      <h2 class="brands-section-title">One of a Kind</h2>
      <div class="product-grid three">${oneOfKind.map(renderProductCard).join('')}</div>
    ` : ''}

    ${recent.length ? `
      <h2 class="brands-section-title">Recently Listed</h2>
      <div class="product-grid three">${recent.map(renderProductCard).join('')}</div>
    ` : ''}

    ${others.length ? `
      <h2 class="brands-section-title">More Pre-Owned</h2>
      <div class="product-grid three">${others.map(renderProductCard).join('')}</div>
    ` : ''}

    <!-- TRADE-IN PITCH -->
    <section style="margin: 56px 0; background: linear-gradient(135deg, var(--emerald-dark), var(--emerald)); color: white; padding: 56px 48px; border-radius: var(--radius); position: relative; overflow: hidden;">
      <div style="position: absolute; right: -60px; top: -60px; width: 240px; height: 240px; border-radius: 50%; background: radial-gradient(circle, var(--gold-soft), transparent 70%);"></div>
      <div style="position: relative; z-index: 2; max-width: 720px;">
        <div class="eyebrow light">Looking to Sell or Trade?</div>
        <div class="divider-gold" style="margin: 12px 0;"></div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 600; line-height: 1.1; margin-bottom: 16px;">We Welcome Trading Deals</h2>
        <p style="font-size: 15px; line-height: 1.8; color: rgba(255,255,255,0.85); margin-bottom: 24px;">
          We offer the best prices for pre-owned firearms in Punjab. If you are looking to sell your licensed firearm or trade up to something new, our team assists with the entire process — from obtaining sale permission from the District Magistrate, to handling the 45-day intimation, to fair valuation. Visit our showroom in Sector 69, Mohali, or call us at <strong style="color: var(--gold-light);">+91 96530 01001</strong> to discuss.
        </p>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a class="btn btn-gold" data-link="/help/sell">Read the Full Guide</a>
          <a class="btn btn-outline-light" href="https://wa.me/919653001001" target="_blank">WhatsApp Us</a>
        </div>
      </div>
    </section>
  </div>
`;
}

// ============================================================
// PAGE: PRODUCT DETAIL (PDP)
// ============================================================
function renderProduct(slug) {
  const p = getProductByIdOrSlug(slug);
  if (!p) return `<div class="container" style="padding: 80px 0; text-align: center;"><h2>Product not found</h2><a class="btn btn-primary" data-link="/shop" style="margin-top: 20px;">Back to Shop</a></div>`;

  const brandObj = getBrandBySlug(p.brand);
  const brandName = brandObj ? brandObj.name : p.brand;
  const isAmmo = p.flow === 'display-only';
  const isPreowned = p.flow === 'license-preowned';
  const isLicense = p.flow === 'license' || isPreowned;
  const isAadhar = p.flow === 'aadhar';
  const isCart = p.flow === 'cart';

  // Compliance banner
  let banner = '';
  if (isLicense && !isPreowned) {
    banner = `<div class="compliance-banner"><strong>Licence Required</strong>This is a licensed firearm. Online checkout is not available. Express your interest below; we will verify your licence, UIN, and bore endorsement and arrange in-store completion as required by law.</div>`;
  } else if (isPreowned) {
    banner = `<div class="compliance-banner danger"><strong>Pre-Owned Firearm — 45-Day Intimation</strong>This pre-owned firearm is subject to mandatory intimation under Section 5 of the Arms Act 1959. After your express-interest is verified, the 45-day clock begins. Final ownership transfer occurs in-store after regulatory clearance.</div>`;
  } else if (isAmmo) {
    banner = `<div class="compliance-banner"><strong>Display Only</strong>Documents required to purchase. Please contact or visit Sahibzada Gun House with valid Indian firearm licence carrying the appropriate bore endorsement.</div>`;
  } else if (isAadhar) {
    banner = `<div class="compliance-banner" style="background: var(--blue-soft); border-left-color: var(--blue);"><strong>Aadhar Verification at Checkout</strong>This air-weapon operates below the licensing threshold. Aadhar verification is required at checkout per our compliance policy and is reviewed by our team within 24 hours before order processing.</div>`;
  }

  // Action buttons
  let actions = '';
  if (isLicense) {
    actions = `
    <button class="btn btn-primary" data-action="express-interest" data-id="${p.id}">Express Interest</button>
    <button class="btn btn-outline-emerald" data-action="payment-request" data-id="${p.id}">Request Custom Quote</button>
  `;
  } else if (isAmmo) {
    actions = `
    <button class="btn btn-outline-emerald" disabled style="cursor: not-allowed; opacity: 0.6;">Visit Showroom to Purchase</button>
    <a class="btn btn-primary" href="https://wa.me/919653001001" target="_blank">WhatsApp Inquiry</a>
  `;
  } else if (isAadhar) {
    actions = `
    <button class="btn btn-gold" data-action="add-to-cart" data-id="${p.id}">Add to Cart</button>
    <button class="btn btn-outline-emerald" data-action="buy-now-aadhar" data-id="${p.id}">Buy Now</button>
  `;
  } else {
    actions = `
    <button class="btn btn-primary" data-action="add-to-cart" data-id="${p.id}">Add to Cart</button>
    <button class="btn btn-outline-emerald" data-action="buy-now" data-id="${p.id}">Buy Now</button>
  `;
  }

  // Related products (same category, exclude self)
  const related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);

  // Specs table
  const specs = [
    ['Brand', brandName],
    ['Caliber', p.caliber],
    ['Barrel Length', p.barrel],
    ['Capacity', p.capacity],
    ['Material / Finish', p.material],
    ['Bore Classification', p.bore === 'NPB' ? 'NPB · Non-Prohibited Bore' : p.bore === 'PB' ? 'PB · Prohibited Bore' : p.bore === 'AIR' ? 'Air weapon' : '—'],
    ['Year', p.year || 'Current production'],
    ['Condition', p.condition || 'New'],
    ['Stock', p.stock === 'inquire' ? 'Inquire in store' : (p.stock || 1) + ' available']
  ].filter(s => s[1]);

  return `
  <div class="container">
    <div style="padding: 24px 0 0;" class="breadcrumb">
      <a data-link="/">Home</a> <span class="sep">›</span>
      <a data-link="/shop">Shop</a> <span class="sep">›</span>
      ${escapeHtml(p.name)}
    </div>

    <div class="pdp-layout">
      <div class="pdp-gallery">
        <div class="pdp-thumbs">
          <div class="pdp-thumb active" style="color: var(--emerald);">${SVG[p.svg] ? SVG[p.svg]() : SVG.pistol1911()}</div>
          <div class="pdp-thumb" style="color: var(--emerald);">${SVG.scope()}</div>
          <div class="pdp-thumb" style="color: var(--emerald);">${SVG.holster()}</div>
          <div class="pdp-thumb" style="color: var(--emerald);">${SVG.case()}</div>
        </div>
        <div class="pdp-main" style="color: var(--emerald);">
          <div class="pdp-badges">
            ${p.bore === 'NPB' ? '<span class="badge npb">NPB</span>' : ''}
            ${p.bore === 'PB' ? '<span class="badge pb">PB</span>' : ''}
            ${p.bore === 'AIR' ? '<span class="badge airgun">Air-gun</span>' : ''}
            ${p.isExclusive ? '<span class="badge gold">Exclusive</span>' : ''}
            ${p.isOneOfKind ? '<span class="badge one-of-kind">One of a Kind</span>' : ''}
            ${p.condition ? `<span class="badge condition-${p.condition.toLowerCase().replace(/ /g, '-')}">${escapeHtml(p.condition)}</span>` : ''}
          </div>
          ${SVG[p.svg] ? SVG[p.svg]() : SVG.pistol1911()}
          <div class="pdp-zoom">⊕ Zoom</div>
        </div>
      </div>

      <div class="pdp-info">
        <div class="pdp-brand">${escapeHtml(brandName)}</div>
        <h1>${escapeHtml(p.name)}</h1>
        <div class="pdp-sub">${escapeHtml(p.tagline || '')}</div>

        <div class="pdp-rating">
          <span class="pdp-stars">★ ★ ★ ★ ★</span>
          <span class="count">12 verified buyer reviews</span>
        </div>

        ${p.price ? `<div class="pdp-price">${formatINR(p.price)}</div>` : '<div class="pdp-price" style="font-size: 22px;">Pricing on inquiry</div>'}
        <div class="pdp-price-note">All prices include GST · Final invoicing in-store with documentation</div>

        ${banner}

        <div class="pdp-actions">${actions}</div>

        <div class="pdp-share">
          <span>Share:</span>
          <div class="pdp-share-btn" data-action="share-whatsapp" data-id="${p.id}" title="WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.5-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.6.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1.1 1.1-1.1 2.6c0 1.6 1.1 3.1 1.3 3.3.2.2 2.2 3.4 5.4 4.7 3.2 1.3 3.2.9 3.8.8.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.4z"/></svg>
          </div>
          <div class="pdp-share-btn" title="Copy link" data-action="share-link" data-id="${p.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          </div>
          <div class="pdp-share-btn" title="Email" data-action="share-email" data-id="${p.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
        </div>

        <div class="pdp-summary">
          <h4>About this firearm</h4>
          <p>${escapeHtml(p.summary || '')}</p>
        </div>
      </div>
    </div>

    <!-- TABS -->
    <div class="pdp-tabs">
      <div class="pdp-tab-headers">
        <div class="pdp-tab-header active" data-tab="desc">Description</div>
        <div class="pdp-tab-header" data-tab="specs">Specifications</div>
        <div class="pdp-tab-header" data-tab="compliance">Compliance</div>
        <div class="pdp-tab-header" data-tab="reviews">Reviews (12)</div>
      </div>
      <div class="pdp-tab-content active" data-tab="desc">
        <h3>Description</h3>
        ${(p.description || p.summary || '').split('\n\n').map(para => `<p>${escapeHtml(para)}</p>`).join('')}
      </div>
      <div class="pdp-tab-content" data-tab="specs">
        <h3>Specifications</h3>
        <table class="specs-table">
          ${specs.map(([k, v]) => `<tr><td>${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`).join('')}
        </table>
      </div>
      <div class="pdp-tab-content" data-tab="compliance">
        <h3>Compliance & Documentation</h3>
        ${isLicense && !isPreowned ? `
          <p><strong>This is a licensed firearm requiring an Indian arms licence to acquire.</strong></p>
          <ul>
            <li>Valid Indian arms licence with appropriate bore endorsement (NPB / PB).</li>
            <li>UIN (Unique Identification Number) for the licence holder.</li>
            <li>Government-issued photo ID and recent photograph.</li>
            <li>The actual transfer occurs in-store at our Mohali showroom following document verification.</li>
            <li>We coordinate the licence-endorsement update with the licensing authority on your behalf.</li>
          </ul>
        ` : ''}
        ${isPreowned ? `
          <p><strong>Pre-owned firearms are subject to the 45-day intimation period under Section 5 of the Arms Act 1959.</strong></p>
          <ul>
            <li>Prior owner has obtained sale permission from the District Magistrate.</li>
            <li>Buyer must hold a valid Indian arms licence with matching bore endorsement.</li>
            <li>Upon expression of interest and document verification, the 45-day intimation begins.</li>
            <li>Final transfer occurs at our showroom after regulatory clearance.</li>
            <li>Sahibzada Gun House manages all paperwork and coordinates with the licensing authority.</li>
          </ul>
        ` : ''}
        ${isAmmo ? `
          <p><strong>Ammunition is for display only on this website.</strong></p>
          <ul>
            <li>Indian law requires in-person verification for ammunition sales.</li>
            <li>You must visit our showroom with a valid arms licence carrying matching bore endorsement.</li>
            <li>Purchase quantities are subject to your endorsement and prior off-take.</li>
            <li>Air-gun pellets do not require a firearm licence but air weapons above 20J / 4.5mm bore do.</li>
          </ul>
        ` : ''}
        ${isAadhar ? `
          <p><strong>This air weapon operates below the licensing threshold.</strong></p>
          <ul>
            <li>No firearm licence required.</li>
            <li>Aadhar verification at checkout is required by our internal compliance policy.</li>
            <li>Aadhar data is encrypted at rest, masked in display, and deleted after order fulfilment per UIDAI guidelines.</li>
            <li>Order remains in PENDING_APPROVAL status until our team reviews the verification.</li>
            <li>Air weapons above 20J / 4.5mm bore are subject to separate licensing under the Arms Rules 2016.</li>
          </ul>
        ` : ''}
        ${isCart ? `
          <p>This is an accessory item with no licensing requirements. Standard delivery and returns apply.</p>
          <ul>
            <li>Free delivery within Punjab on orders over ₹5,000.</li>
            <li>7-day return policy on unused, undamaged items.</li>
            <li>Showroom pickup available at SCO 371, Sector 69, Mohali.</li>
          </ul>
        ` : ''}
      </div>
      <div class="pdp-tab-content" data-tab="reviews">
        <h3>Verified Buyer Reviews</h3>
        <p style="font-style: italic; color: var(--charcoal-light);">Reviews are submitted only by customers verified through our showroom records.</p>
        <div style="border: 1px solid var(--gray-200); padding: 20px; border-radius: var(--radius); margin-top: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="color: var(--emerald);">A. Singh — Verified buyer</strong>
            <span class="pdp-stars">★ ★ ★ ★ ★</span>
          </div>
          <p style="font-size: 14px; color: var(--charcoal-light);">"Outstanding craftsmanship. The trigger pull is exactly as described — clean and predictable. Sahibzada team handled all the paperwork for me, which made the entire experience effortless."</p>
          <p style="font-size: 11px; color: var(--gray-400); margin-top: 8px; letter-spacing: 0.06em; text-transform: uppercase;">12 March 2026</p>
        </div>
        <div style="border: 1px solid var(--gray-200); padding: 20px; border-radius: var(--radius); margin-top: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="color: var(--emerald);">V. Sharma — Verified buyer</strong>
            <span class="pdp-stars">★ ★ ★ ★ ★</span>
          </div>
          <p style="font-size: 14px; color: var(--charcoal-light);">"Genuine product, all import papers, and exactly as advertised. The Sahibzada team was patient with all my questions about the licence-endorsement update."</p>
          <p style="font-size: 11px; color: var(--gray-400); margin-top: 8px; letter-spacing: 0.06em; text-transform: uppercase;">8 February 2026</p>
        </div>
      </div>
    </div>

    ${related.length ? `
      <section class="section"><div class="heading-row">
        <div>
          <div class="eyebrow">Related</div>
          <div class="divider-gold"></div>
          <h2 class="section-heading">You Might Also Like</h2>
        </div>
      </div>
      <div class="product-grid">${related.map(renderProductCard).join('')}</div></section>
    ` : ''}
  </div>
`;
}

// ============================================================
// PAGE: BRANDS
// ============================================================
function renderBrands() {
  const intl = BRANDS.filter(b => b.region === 'international');
  const indian = BRANDS.filter(b => b.region === 'indian');

  return `
  <section class="page-header"><div class="container">
    <div class="breadcrumb"><a data-link="/">Home</a> <span class="sep">›</span> Brands</div>
    <h1>Authorized Brand Portfolio</h1>
    <p>Sahibzada Gun House is an authorized dealer for the most respected names in firearms manufacturing — from European heritage houses to India's leading domestic producers.</p>
  </div></section>

  <div class="container" style="padding: 48px 0;">
    <h2 class="brands-section-title">International Brands</h2>
    <div class="brand-grid">
      ${intl.map(b => `
        <div class="brand-card" data-link="/brand/${b.slug}">
          <div class="brand-logo">${b.initial}</div>
          <h3>${escapeHtml(b.name)}</h3>
          <div class="brand-origin">${escapeHtml(b.country)}</div>
          <p>${escapeHtml(b.desc)}</p>
          <div class="auth-badge">Authorized Dealer</div>
        </div>
      `).join('')}
    </div>

    <h2 class="brands-section-title">Indian Brands</h2>
    <div class="brand-grid">
      ${indian.map(b => `
        <div class="brand-card" data-link="/brand/${b.slug}">
          <div class="brand-logo">${b.initial}</div>
          <h3>${escapeHtml(b.name)}</h3>
          <div class="brand-origin">${escapeHtml(b.country)}</div>
          <p>${escapeHtml(b.desc)}</p>
          <div class="auth-badge">Authorized Dealer</div>
        </div>
      `).join('')}
    </div>
  </div>
`;
}

function renderBrandDetail(slug) {
  const b = getBrandBySlug(slug);
  if (!b) return `<div class="container" style="padding: 80px 0; text-align: center;"><h2>Brand not found</h2></div>`;
  const products = PRODUCTS.filter(p => p.brand === slug);

  return `
  <section class="page-header"><div class="container">
    <div class="breadcrumb">
      <a data-link="/">Home</a> <span class="sep">›</span>
      <a data-link="/brands">Brands</a> <span class="sep">›</span>
      ${escapeHtml(b.name)}
    </div>
    <div style="display: flex; align-items: center; gap: 24px;">
      <div class="brand-logo" style="width: 80px; height: 80px; font-size: 28px;">${b.initial}</div>
      <div>
        <h1>${escapeHtml(b.name)}</h1>
        <div style="font-size: 13px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--gold-dark); margin-top: 4px;">${escapeHtml(b.country)}</div>
      </div>
    </div>
    <p style="margin-top: 20px; max-width: 800px;">${escapeHtml(b.desc)}</p>
    <div class="auth-badge" style="margin-top: 12px;">Sahibzada is an Authorized Dealer for ${escapeHtml(b.name)}</div>
  </div></section>

  <div class="container" style="padding: 48px 0;">
    <h2 class="brands-section-title">${escapeHtml(b.name)} Collection</h2>
    ${products.length ? `<div class="product-grid three">${products.map(renderProductCard).join('')}</div>`
      : `<p style="color: var(--charcoal-light); padding: 40px; text-align: center;">More products from ${escapeHtml(b.name)} coming soon. Visit our showroom or contact us for current availability.</p>`}
  </div>
`;
}

// ============================================================
// PAGE: HELP CENTRE
// ============================================================
function renderHelp() {
  return `
  <section class="page-header"><div class="container">
    <div class="breadcrumb"><a data-link="/">Home</a> <span class="sep">›</span> Help Centre</div>
    <h1>Licensing & Help Centre</h1>
    <p>Practical, plain-language guidance on Indian firearms law, licensing procedures, transport rules, and common ownership questions. Curated by the Sahibzada team.</p>
  </div></section>

  <div class="container" style="padding: 48px 0;">
    <div class="help-grid">
      ${HELP_ARTICLES.map(a => `
        <div class="help-card ${a.featured ? 'featured' : ''}" data-link="/help/${a.slug}">
          <div class="help-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              ${a.featured ? '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>' : '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>'}
            </svg>
          </div>
          <h3>${escapeHtml(a.title)}</h3>
          <p>${escapeHtml(a.desc)}</p>
          <div class="read-more">Read article →</div>
        </div>
      `).join('')}
    </div>

    <!-- GOVERNMENT LINKS -->
    <div style="margin-top: 56px;">
      <div class="gov-links">
        <h3>Official Government Resources</h3>
        <p style="color: var(--charcoal-light); font-size: 14px; margin-bottom: 16px;">Verified links to official government portals for licensing, applications, and verification. Always confirm current procedures with your local licensing authority.</p>
        <div class="gov-link-item">
          <span><strong>Ministry of Home Affairs</strong> — Arms & Ammunition policy</span>
          <span class="ext">↗ EXTERNAL</span>
        </div>
        <div class="gov-link-item">
          <span><strong>Punjab Police Citizen Portal</strong> — Licence applications, status check</span>
          <span class="ext">↗ EXTERNAL</span>
        </div>
        <div class="gov-link-item">
          <span><strong>Arms Act 1959 (Bare Act, English)</strong> — Full text on India Code</span>
          <span class="ext">↗ EXTERNAL</span>
        </div>
        <div class="gov-link-item">
          <span><strong>Arms Rules 2016</strong> — As amended</span>
          <span class="ext">↗ EXTERNAL</span>
        </div>
        <div class="gov-link-item">
          <span><strong>UIDAI / Aadhar Verification</strong> — For air-weapon orders</span>
          <span class="ext">↗ EXTERNAL</span>
        </div>
        <div class="gov-link-item">
          <span><strong>NDAL (National Database of Arms Licences)</strong> — UIN registration</span>
          <span class="ext">↗ EXTERNAL</span>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div style="margin-top: 56px; text-align: center; padding: 48px; background: linear-gradient(135deg, var(--ivory-dark), var(--ivory)); border-radius: var(--radius);">
      <h3 style="font-family: 'Playfair Display', serif; font-size: 28px; color: var(--emerald); margin-bottom: 12px;">Couldn't find your answer?</h3>
      <p style="color: var(--charcoal-light); margin-bottom: 24px;">Our team is happy to help you navigate licensing, transport, transfers, and other regulatory questions.</p>
      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        <a class="btn btn-primary" href="https://wa.me/919653001001" target="_blank">WhatsApp Us</a>
        <a class="btn btn-outline-emerald" href="tel:+919653001001">Call +91 96530 01001</a>
      </div>
    </div>
  </div>
`;
}

function renderHelpArticle(slug) {
  const a = HELP_ARTICLES.find(x => x.slug === slug);
  if (!a) return `<div class="container" style="padding: 80px 0; text-align: center;"><h2>Article not found</h2></div>`;

  // Long-form content per article
  const content = {
    license: `<p>Applying for an arms licence in Punjab is a multi-step process governed by the Arms Act 1959 and Arms Rules 2016, administered through your jurisdictional Deputy Commissioner / District Magistrate.</p>
<p><strong>Step 1: Determine eligibility.</strong> You must be a citizen of India, at least 21 years of age (lower in some specified cases), of sound mind, and not disqualified under Section 9 of the Arms Act. You must demonstrate genuine reason — typically self-defence (with security threat assessment) or sporting use (with shooting club affiliation).</p>
<p><strong>Step 2: Collect documents.</strong> Form A application (signed in front of a gazetted officer), four recent photographs, age proof, residence proof, character certificate, income proof, two character references, and any threat-assessment evidence.</p>
<p><strong>Step 3: Submit application.</strong> File your complete application at the District Magistrate's office with the prescribed fee. You will receive a receipt acknowledgement.</p>
<p><strong>Step 4: Verification.</strong> The application will be referred to local police for character verification. This typically involves a visit to your residence by the local Station House Officer or designated officer.</p>
<p><strong>Step 5: Decision.</strong> The DM may grant, defer, or reject the application based on verification reports, threat assessment, and the bore type requested. Typical timelines range from 6 months to 18 months.</p>
<p style="background: var(--ivory-dark); padding: 16px; border-left: 4px solid var(--gold); margin: 24px 0;"><strong>How Sahibzada helps:</strong> While we cannot apply on your behalf, we provide application-form guidance, document checklists, sporting-club affiliation references, and post-grant firearm consultation. Visit our showroom or call to discuss your specific situation.</p>`,
    sell: `<p><strong>We welcome trading deals and offer the best prices for pre-owned firearms in Punjab.</strong></p>
<p>If you are looking to sell your licensed firearm or trade up to something new, our team assists with the entire process — from obtaining sale permission from the District Magistrate, to handling the 45-day intimation, to fair valuation. Visit our showroom in Sector 69, Mohali, or call us at <strong>+91 96530 01001</strong> to discuss.</p>
<h3 style="margin-top: 32px;">How the Process Works</h3>
<p><strong>Step 1: Initial conversation.</strong> Visit our showroom or call us to discuss the firearm you wish to sell. We will provide an honest condition assessment and a fair-market valuation. Bring the firearm, your licence, and original documentation if available.</p>
<p><strong>Step 2: Sale permission.</strong> Sale of a licensed firearm requires written permission from your jurisdictional District Magistrate. We can guide you through the application and provide a written purchase undertaking on Sahibzada Gun House letterhead to support your application.</p>
<p><strong>Step 3: Section 5 intimation.</strong> Once permission is granted, the mandatory 45-day intimation period under Section 5 of the Arms Act 1959 begins. During this period, the sale is intimated to the licensing authority.</p>
<p><strong>Step 4: Final transfer.</strong> After intimation clears, the firearm is formally transferred to our inventory or to the new buyer. All paperwork is updated and you receive your payment.</p>
<p style="background: var(--ivory-dark); padding: 16px; border-left: 4px solid var(--gold); margin: 24px 0;"><strong>Why sell through Sahibzada?</strong></p>
<ul style="padding-left: 20px;">
<li>Best prices in Punjab — we are active buyers, not just intermediaries.</li>
<li>Clean paperwork — we manage every step, with no shortcuts.</li>
<li>Trade-up option — apply your firearm's value toward something new.</li>
<li>Discretion — your transaction details are not shared.</li>
</ul>`,
    renewal: `<p>Indian arms licences require periodic renewal, typically every 3 years for civilian licences (subject to current rules). Renewal must be applied for before expiry to avoid gaps.</p>
<p><strong>When to apply:</strong> Submit your renewal application at least 90 days before the expiry date printed on your licence book.</p>
<p><strong>Documents required:</strong> Original licence book, renewal application form, recent photographs, current residence and income proof, fee receipt, and any updated firearm endorsements.</p>
<p><strong>Process:</strong> Submit at the issuing DM's office. Verification is typically lighter than initial issuance. Renewal is generally granted unless there are pending complaints or a change in your eligibility status.</p>
<p style="background: var(--ivory-dark); padding: 16px; border-left: 4px solid var(--gold); margin: 24px 0;"><strong>Late renewal:</strong> If your licence has lapsed, immediately surrender or deposit your firearm at the nearest police station and apply for renewal with a delay-condonation petition. Possession of a firearm with an expired licence is a serious offence.</p>`,
    uin: `<p>The UIN (Unique Identification Number) is mandatory under the Arms (Amendment) Act 2019 and Arms Rules 2016 amendments. It functions as a centralized identifier for all licensed firearms in India, recorded in the National Database of Arms Licences.</p>
<p><strong>Who needs a UIN:</strong> Every existing arms licence holder. New licences are issued with UIN attached.</p>
<p><strong>How to apply:</strong> Visit the licensing authority that issued your licence with your original licence book, photographs, and the prescribed UIN application form. Some states permit online UIN application via citizen portals.</p>
<p><strong>What you receive:</strong> A unique alphanumeric code linked to your licence and each firearm endorsement, recorded centrally. The code may be embossed or stamped on your physical licence book.</p>
<p>Sahibzada Gun House cannot directly process your UIN, but we can advise on the typical procedure for Punjab applicants and provide guidance specific to your case.</p>`,
    'bore-change': `<p>Changing the bore type on a licensed firearm — for example, from smoothbore to rifled — requires prior written permission from the District Magistrate and gunsmith certification.</p>
<p><strong>Reasons bore-change may be requested:</strong> Sport-shooting evolution, hunting requirements, or transitioning between civilian-class calibers within the same firearm.</p>
<p><strong>Procedure:</strong> Apply in writing to your DM with the licence book, current firearm details, requested change, and reasons. After permission, work is completed by an authorized gunsmith. The licensing authority then updates your licence endorsement.</p>
<p>Sahibzada provides bore-change services for permitted conversions. <a data-link="/services" style="color: var(--gold-dark); font-weight: 600;">View our gunsmithing services →</a></p>`,
    endorsement: `<p>Adding an additional firearm to your existing licence requires an endorsement amendment. This is generally simpler than applying for a fresh licence, but still requires DM approval.</p>
<p><strong>Process:</strong> Submit an endorsement application at your DM's office along with details of the firearm to be added (make, model, caliber, source — new or pre-owned), your existing licence book, and the prescribed fee.</p>
<p><strong>Source of firearm:</strong> Whether you are buying new or pre-owned changes the documentation. Pre-owned firearms additionally require sale-permission from the seller's side and the 45-day Section 5 intimation.</p>
<p>Sahibzada Gun House handles all paperwork on the dealer side and provides documentation supporting your endorsement application.</p>`,
    transfer: `<p>Transfer of licensed firearms upon the death of the original holder is governed by the Arms Act and succession rules. The firearms cannot pass to heirs automatically — they must be either transferred to a licensed heir, sold to a licensed buyer or dealer, surrendered to police, or deposited.</p>
<p><strong>Immediate steps:</strong> Upon the death of a licence holder, the family should secure the firearms and intimate the local police station within a reasonable time. The firearms may be deposited at the police station for safekeeping pending final disposition.</p>
<p><strong>Transfer to legal heir:</strong> The heir must be eligible (age 21+, no disqualification), apply for an arms licence in their name with the inherited firearms specified, and obtain a No-Objection Certificate (NOC) from co-heirs.</p>
<p><strong>Sale to dealer:</strong> Sahibzada Gun House regularly assists families with the sale of inherited firearms, handling the entire paperwork chain including the 45-day Section 5 intimation.</p>`,
    surrender: `<p>Surrender or deposit of a firearm may be voluntary or required (e.g., during overseas travel, licence dispute, or temporary unavailability of the holder). Both procedures involve the local police station of jurisdiction.</p>
<p><strong>Voluntary surrender:</strong> The licence holder permanently relinquishes the firearm to police custody. The firearm is logged and disposed of per departmental procedure. This is generally not reversible.</p>
<p><strong>Deposit (temporary):</strong> The firearm is held in police safekeeping for a defined period (e.g., during the holder's overseas travel). The holder may reclaim the firearm upon return with proper documentation.</p>
<p><strong>Documentation in either case:</strong> Original licence book, receipt of deposit (kept safely — required for reclaim), and travel documents in the case of deposit.</p>`,
    transport: `<p>Transport of licensed firearms within India is permitted but heavily regulated. Carrying a firearm in transit without compliance with these rules can result in serious legal consequences, even for licensed owners.</p>
<p><strong>By road:</strong> The firearm should be unloaded, in a locked case, separated from ammunition. The licence book must accompany the firearm. Transport across state lines may require advance intimation depending on the state.</p>
<p><strong>By rail:</strong> Indian Railways permits transport of licensed firearms in checked baggage with prior declaration. Specific procedures apply at major junctions; advance booking is recommended.</p>
<p><strong>By air:</strong> Domestic air travel with firearms requires prior arrangement with the airline (typically 48-hour advance notice), packaging in airline-approved cases, separate ammunition packing, and surrender at check-in for transport in the cargo hold.</p>
<p><strong>Inter-state:</strong> Some states have additional intimation requirements when entering with a firearm. Always check destination-state procedures before traveling.</p>`,
    'arms-act': `<p>The Arms Act 1959 is the principal central legislation governing firearms in India, supplemented by the Arms Rules 2016 (as amended). Below is a plain-language summary of key provisions.</p>
<p><strong>Section 3 — Licence requirement:</strong> Acquisition, possession, manufacture, sale, transport, and import-export of firearms and ammunition are prohibited without a valid licence.</p>
<p><strong>Section 5 — 45-day intimation for transfers:</strong> Sale or transfer of any firearm between licence holders requires intimation to the licensing authority, with a 45-day window for any objection.</p>
<p><strong>Section 9 — Disqualifications:</strong> Persons under 21 (with limited exceptions), of unsound mind, or with certain criminal convictions are disqualified from holding a licence.</p>
<p><strong>Section 25 — Penalties for unlicensed possession:</strong> Severe imprisonment terms apply for unlicensed possession of firearms or ammunition. Penalties for prohibited bore (PB) firearms are substantially higher.</p>
<p><strong>Arms (Amendment) Act 2019:</strong> Reduced number of firearms permitted per licence (typically two), increased penalties, and introduced UIN.</p>
<p><strong>Arms Rules 2016:</strong> Detail the application process, forms (Form A through Form S), bore classifications, dealer responsibilities (including Form VIII for dealers), and air-weapon thresholds.</p>`,
    'air-weapons': `<p>Air weapons in India are governed by both the Arms Rules 2016 and ALNR (Air Weapons Notification) provisions. The licensing requirement depends on muzzle energy and bore.</p>
<p><strong>Below threshold (no licence required):</strong> Air weapons under 20 Joules muzzle energy AND under 4.5mm bore. These can be purchased by any adult subject to internal compliance (we require Aadhar verification).</p>
<p><strong>Above threshold (licence required):</strong> Air weapons exceeding 20J or 4.5mm bore are subject to the same licensing as conventional firearms.</p>
<p><strong>Pellets vs. air-guns:</strong> Pellets and steel BBs do not require a licence regardless of where they will be used. Compressed-gas cartridges (CO2) for air pistols are also unrestricted.</p>
<p><strong>Sahibzada policy:</strong> All air-weapon sales below threshold require Aadhar verification at checkout, retained encrypted and deleted post-fulfilment per UIDAI guidelines.</p>`,
    faq: `<p><strong>Q: Can I buy a firearm online?</strong></p>
<p>No. Indian law requires in-person verification and physical transfer of all licensed firearms. Our website serves as a catalog and inquiry platform; the actual transaction occurs at our showroom in Mohali.</p>
<p><strong>Q: Why do I need to "Express Interest" instead of "Add to Cart" for licensed firearms?</strong></p>
<p>Because online checkout for licensed firearms is not legally permitted. Expressing interest creates an inquiry which our team verifies (licence, UIN, bore endorsement) before scheduling an in-store visit.</p>
<p><strong>Q: Can I buy ammunition online?</strong></p>
<p>No. Our ammunition section is for display only. Visit our showroom with your licence book to purchase ammunition in person.</p>
<p><strong>Q: What is the 45-day intimation?</strong></p>
<p>Section 5 of the Arms Act 1959 requires that any transfer of a licensed firearm be intimated to the licensing authority, with a 45-day window for objection. This applies to all pre-owned firearm transactions.</p>
<p><strong>Q: How do air-gun purchases work?</strong></p>
<p>Air weapons below the 20J / 4.5mm threshold can be purchased without a firearm licence. We require Aadhar verification at checkout for our internal compliance records, reviewed by our team before order processing.</p>
<p><strong>Q: Do you ship across India?</strong></p>
<p>Accessories and air-gun pellets can be shipped subject to courier acceptance. Licensed firearms and ammunition cannot be shipped — they are transferred only in-person at our showroom.</p>
<p><strong>Q: Do you offer trade-ins?</strong></p>
<p>Yes. We welcome trading deals and offer competitive prices on pre-owned firearms in Punjab. <a data-link="/help/sell" style="color: var(--gold-dark); font-weight: 600;">Read more about selling/trading →</a></p>`
  };

  const articleContent = content[slug] || `<p>${escapeHtml(a.desc)}</p><p style="margin-top: 24px; color: var(--charcoal-light); font-style: italic;">Full article content is being prepared by our team. For immediate guidance on this topic, please contact us.</p>`;

  return `
  <section class="page-header"><div class="container">
    <div class="breadcrumb">
      <a data-link="/">Home</a> <span class="sep">›</span>
      <a data-link="/help">Help Centre</a> <span class="sep">›</span>
      ${escapeHtml(a.title)}
    </div>
    <h1>${escapeHtml(a.title)}</h1>
    <p>${escapeHtml(a.desc)}</p>
  </div></section>

  <div class="container-narrow" style="padding: 48px 0;">
    <article style="font-size: 15px; line-height: 1.85; color: var(--charcoal);">
      ${articleContent}
    </article>

    <div style="margin-top: 48px; padding: 32px; background: var(--ivory-dark); border-radius: var(--radius); text-align: center;">
      <h3 style="font-family: 'Playfair Display', serif; color: var(--emerald); font-size: 22px; margin-bottom: 12px;">Need Personalized Help?</h3>
      <p style="color: var(--charcoal-light); margin-bottom: 20px;">Our team can walk you through your specific situation. Call us, WhatsApp us, or visit our showroom.</p>
      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        <a class="btn btn-primary btn-sm" href="https://wa.me/919653001001" target="_blank">WhatsApp</a>
        <a class="btn btn-outline-emerald btn-sm" href="tel:+919653001001">Call Us</a>
        <a class="btn btn-outline-emerald btn-sm" data-link="/help">Back to Help Centre</a>
      </div>
    </div>
  </div>
`;
}

// ============================================================
// PAGE: SERVICES
// ============================================================
function renderServices() {
  return `
  <section class="page-header"><div class="container">
    <div class="breadcrumb"><a data-link="/">Home</a> <span class="sep">›</span> Services</div>
    <h1>Gunsmithing & Services</h1>
    <p>Care, customization, and craftsmanship from our authorized service centre. Licensed gunsmith services performed in our Mohali workshop.</p>
  </div></section>

  <div class="container" style="padding: 48px 0;">
    <!-- Gunsmith intro panel -->
    <div class="gunsmith-panel">
      <div class="gunsmith-photo" style="color: var(--gold);">${SVG.gunsmith()}</div>
      <div class="gunsmith-text">
        <div class="creds">Authorized Service Centre</div>
        <h3>Master Gunsmiths,<br>Heritage Craftsmanship</h3>
        <p>Our in-house gunsmith team brings decades of combined experience working on imported and domestic firearms. From routine cleaning and inspection to delicate antique restoration, every service is performed in compliance with Indian law and to the original manufacturer's specifications.</p>
        <p>All bore-change and modification work is done only after appropriate regulatory permissions are in place. We will never work outside the bounds of your licence.</p>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button class="btn btn-gold btn-sm" data-action="book-service">Book a Service</button>
          <a class="btn btn-outline-light btn-sm" href="https://wa.me/919653001001" target="_blank">WhatsApp Consult</a>
        </div>
      </div>
    </div>

    <h2 class="brands-section-title">Service Catalog</h2>
    <div class="services-grid">
      ${SERVICES.map(s => `
        <div class="service-card">
          <div class="service-price">${escapeHtml(s.price)}</div>
          <div class="service-turnaround">Turnaround: ${escapeHtml(s.turnaround)}</div>
          <h3>${escapeHtml(s.title)}</h3>
          <p>${escapeHtml(s.desc)}</p>
          <button class="btn btn-outline-emerald btn-sm" data-action="book-service" data-service="${s.slug}">Book This Service</button>
        </div>
      `).join('')}
    </div>
  </div>
`;
}

// ============================================================
// PAGE: ACCOUNT (customer dashboard)
// ============================================================
function renderAccount(tab = 'overview') {
  const navItems = [
    { slug: 'overview', label: 'Overview', icon: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>' },
    { slug: 'orders', label: 'My Orders', icon: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>' },
    { slug: 'inquiries', label: 'My Inquiries', icon: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>', count: 2 },
    { slug: 'license', label: 'Licence on File', icon: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M15 8h2M15 12h2M7 14h10"/>' },
    { slug: 'wishlist', label: 'Wishlist', icon: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>' },
    { slug: 'addresses', label: 'Addresses', icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>' },
    { slug: 'settings', label: 'Settings', icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>' }
  ];

  // Tab content
  let tabContent = '';
  if (tab === 'overview') {
    tabContent = `
    <h2>Welcome back, Aman</h2>
    <div class="dash-sub">Your account at a glance.</div>
    <div class="dash-stat-grid">
      <div class="dash-stat"><div class="lbl">Active Inquiries</div><div class="val">2</div><div class="delta">1 awaiting verification</div></div>
      <div class="dash-stat"><div class="lbl">Lifetime Orders</div><div class="val">7</div><div class="delta">Last: 5 May</div></div>
      <div class="dash-stat"><div class="lbl">Wishlist</div><div class="val">5</div><div class="delta">2 in stock</div></div>
      <div class="dash-stat"><div class="lbl">Licence Expiry</div><div class="val">2027</div><div class="delta warn">14 months remaining</div></div>
    </div>
    <h3 style="font-family: 'Playfair Display', serif; color: var(--emerald); font-size: 20px; margin: 32px 0 16px;">Recent Activity</h3>
    <table class="dash-table">
      <thead><tr><th>Date</th><th>Activity</th><th>Reference</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td>2026-05-08</td><td><span class="item-name">Express Interest — Kiehberg 1911 Chrome</span></td><td>INQ-2026-0042</td><td><span class="status-pill new">New</span></td></tr>
        <tr><td>2026-05-07</td><td><span class="item-name">Order — Premium Leather Holster</span></td><td>ORD-2026-0187</td><td><span class="status-pill shipped">Shipped</span></td></tr>
        <tr><td>2026-05-06</td><td><span class="item-name">Wishlist — Beretta 686 Silver Pigeon</span></td><td>—</td><td>—</td></tr>
        <tr><td>2026-05-04</td><td><span class="item-name">Service booking — Annual Cleaning</span></td><td>SVC-2026-0011</td><td><span class="status-pill completed">Completed</span></td></tr>
      </tbody>
    </table>
  `;
  } else if (tab === 'orders') {
    tabContent = `
    <h2>My Orders</h2>
    <div class="dash-sub">All orders placed via cart-flow products (accessories and air weapons).</div>
    <table class="dash-table">
      <thead><tr><th>Order ID</th><th>Date</th><th>Product</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        ${MOCK_ORDERS.map(o => `
          <tr>
            <td><strong>${o.id}</strong></td>
            <td>${o.date}</td>
            <td><span class="item-name">${escapeHtml(o.product)}</span></td>
            <td>${formatINR(o.amount)}</td>
            <td><span class="status-pill ${o.status}">${o.status}</span></td>
            <td><span class="dash-action">View</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  } else if (tab === 'inquiries') {
    tabContent = `
    <h2>My Inquiries</h2>
    <div class="dash-sub">Express-interest inquiries for licensed firearms. Each is reviewed against your licence on file.</div>
    <table class="dash-table">
      <thead><tr><th>Inquiry ID</th><th>Date</th><th>Product</th><th>Status</th><th>Next Step</th></tr></thead>
      <tbody>
        <tr><td><strong>INQ-2026-0042</strong></td><td>2026-05-08</td><td><span class="item-name">Kiehberg 1911 Chrome</span></td><td><span class="status-pill new">New</span></td><td>Awaiting team review</td></tr>
        <tr><td><strong>INQ-2026-0035</strong></td><td>2026-04-22</td><td><span class="item-name">Webley Mk IV Revolver</span></td><td><span class="status-pill approved">Verified</span></td><td>Visit showroom to complete transfer</td></tr>
      </tbody>
    </table>
  `;
  } else if (tab === 'license') {
    tabContent = `
    <h2>Licence on File</h2>
    <div class="dash-sub">Your licence is securely stored and used to pre-fill express-interest inquiries. We never share licence data.</div>
    <div style="background: var(--ivory-dark); padding: 32px; border-radius: var(--radius); margin-top: 16px; max-width: 640px; border-left: 4px solid var(--gold);">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 14px;">
        <div><div style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold-dark); margin-bottom: 4px;">Licence Number</div><div style="font-weight: 600; color: var(--emerald);">PB/AL/12345</div></div>
        <div><div style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold-dark); margin-bottom: 4px;">UIN</div><div style="font-weight: 600; color: var(--emerald);">UIN-2018-PB-78901</div></div>
        <div><div style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold-dark); margin-bottom: 4px;">Issuing Authority</div><div style="font-weight: 600; color: var(--emerald);">DM SAS Nagar (Mohali)</div></div>
        <div><div style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold-dark); margin-bottom: 4px;">Bore Type(s)</div><div style="font-weight: 600; color: var(--emerald);">NPB</div></div>
        <div><div style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold-dark); margin-bottom: 4px;">Issued Date</div><div style="font-weight: 600; color: var(--emerald);">12 March 2018</div></div>
        <div><div style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold-dark); margin-bottom: 4px;">Expiry</div><div style="font-weight: 600; color: var(--amber);">11 July 2027</div></div>
      </div>
      <div style="margin-top: 24px; display: flex; gap: 12px;">
        <button class="btn btn-outline-emerald btn-sm">Update Licence</button>
        <button class="btn btn-outline-emerald btn-sm">Set Renewal Reminder</button>
      </div>
    </div>
    <div class="intimation-notice" style="margin-top: 24px; max-width: 640px;">
      <div class="icon">!</div>
      <div><strong>Renewal Reminder</strong> Your licence expires in approximately 14 months. Apply for renewal at least 90 days before expiry. We'll send you an automated reminder 120 days out.</div>
    </div>
  `;
  } else if (tab === 'wishlist') {
    const wishlistItems = PRODUCTS.filter(p => ['p001', 'p013', 'p007', 'p018', 'p022'].includes(p.id));
    tabContent = `
    <h2>Wishlist</h2>
    <div class="dash-sub">Products you've saved for later.</div>
    <div class="product-grid three" style="margin-top: 24px;">${wishlistItems.map(renderProductCard).join('')}</div>
  `;
  } else if (tab === 'addresses') {
    tabContent = `
    <h2>Addresses</h2>
    <div class="dash-sub">Your delivery and billing addresses.</div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 24px;">
      <div style="background: var(--ivory-dark); padding: 24px; border-radius: var(--radius); border-left: 4px solid var(--gold);">
        <div style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold-dark); font-weight: 600; margin-bottom: 8px;">Default Delivery</div>
        <strong style="color: var(--emerald); display: block; margin-bottom: 6px;">Aman Singh</strong>
        <div style="font-size: 14px; color: var(--charcoal-light); line-height: 1.7;">House 142, Phase 7<br>Mohali, Punjab — 160062<br>+91 98XXX XXX42</div>
      </div>
      <div style="background: white; padding: 24px; border: 2px dashed var(--gray-300); border-radius: var(--radius); text-align: center; color: var(--charcoal-light); font-size: 14px;">+ Add new address</div>
    </div>
  `;
  } else if (tab === 'settings') {
    tabContent = `
    <h2>Settings</h2>
    <div class="dash-sub">Profile, password, and notification preferences.</div>
    <div style="max-width: 640px; margin-top: 24px;">
      <div class="form-row split">
        <div><label>First Name</label><input type="text" value="Aman"/></div>
        <div><label>Last Name</label><input type="text" value="Singh"/></div>
      </div>
      <div class="form-row"><label>Email</label><input type="email" value="aman.singh@example.com"/></div>
      <div class="form-row"><label>Phone</label><input type="tel" value="+91 98XXX XXX42"/></div>
      <h3 style="font-family: 'Playfair Display', serif; color: var(--emerald); margin: 24px 0 16px;">Notifications</h3>
      <label class="filter-option"><input type="checkbox" checked> Email me when an inquiry status changes</label>
      <label class="filter-option"><input type="checkbox" checked> WhatsApp updates for orders</label>
      <label class="filter-option"><input type="checkbox" checked> Notify me 120 days before licence expiry</label>
      <label class="filter-option"><input type="checkbox"> Marketing newsletter</label>
      <div style="margin-top: 24px;"><button class="btn btn-primary">Save Changes</button></div>
    </div>
  `;
  }

  return `
  <div class="container">
    <div class="dash-layout">
      <aside class="dash-sidebar">
        <div class="dash-user">
          <div class="dash-avatar">A</div>
          <div class="dash-user-info">
            <div class="name">Aman Singh</div>
            <div class="email">aman.singh@example.com</div>
          </div>
        </div>
        <div class="dash-nav">
          ${navItems.map(n => `
            <div class="dash-nav-item ${n.slug === tab ? 'active' : ''}" data-link="/account?tab=${n.slug}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${n.icon}</svg>
              ${escapeHtml(n.label)}
              ${n.count ? `<span class="badge-count">${n.count}</span>` : ''}
            </div>
          `).join('')}
          <div class="dash-nav-item" style="margin-top: 12px; color: var(--red);">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Log Out
          </div>
        </div>
      </aside>
      <div class="dash-content">${tabContent}</div>
    </div>
  </div>
`;
}

// ============================================================
// PAGE: ADMIN PREVIEW
// ============================================================
function renderAdmin(tab = 'dashboard') {
  const navItems = [
    { slug: 'dashboard', label: 'Dashboard', icon: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>' },
    { slug: 'products', label: 'Products', icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>' },
    { slug: 'preowned', label: 'Pre-Owned', icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>' },
    { slug: 'inquiries', label: 'License Inquiries', icon: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>', count: 5 },
    { slug: 'orders', label: 'Cart Orders', icon: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>' },
    { slug: 'aadhar', label: 'Aadhar Queue', icon: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/>', count: 2 },
    { slug: 'payments', label: 'Payment Links', icon: '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>' },
    { slug: 'content', label: 'Content & Help', icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>' },
    { slug: 'audit', label: 'Audit Log', icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>' },
    { slug: 'users', label: 'Users & Roles', icon: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/>' }
  ];

  let tabContent = '';
  if (tab === 'dashboard') {
    tabContent = `
    <h2>Admin Overview</h2>
    <div class="dash-sub">Real-time view of inquiries, orders, and content. All actions are audit-logged.</div>
    <div class="admin-banner">
      <div class="icon-circle">!</div>
      <div><strong>Demo Mode</strong> — This is a clickable preview of the admin portal. In production, every action shown here would be available to authorized Sahibzada team members.</div>
    </div>
    <div class="dash-stat-grid">
      <div class="dash-stat"><div class="lbl">New Inquiries</div><div class="val">5</div><div class="delta">↑ 2 since yesterday</div></div>
      <div class="dash-stat"><div class="lbl">Pending Aadhar</div><div class="val">2</div><div class="delta warn">Awaiting review</div></div>
      <div class="dash-stat"><div class="lbl">Active Orders</div><div class="val">12</div><div class="delta">3 to ship</div></div>
      <div class="dash-stat"><div class="lbl">This Month Sales</div><div class="val">₹14.8L</div><div class="delta">↑ 28% MoM</div></div>
    </div>
    <h3 style="font-family: 'Playfair Display', serif; color: var(--emerald); font-size: 20px; margin: 32px 0 16px;">Latest License Inquiries</h3>
    <table class="dash-table">
      <thead><tr><th>ID</th><th>Date</th><th>Product</th><th>Customer</th><th>Licence</th><th>UIN</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        ${MOCK_INQUIRIES.map(i => `
          <tr>
            <td><strong>${i.id}</strong></td>
            <td>${i.date}</td>
            <td><span class="item-name">${escapeHtml(i.product)}</span></td>
            <td>${escapeHtml(i.customer)}</td>
            <td>${escapeHtml(i.license)}</td>
            <td>${escapeHtml(i.uin)}</td>
            <td><span class="status-pill ${i.status}">${i.status}</span></td>
            <td><span class="dash-action">Verify</span><span class="dash-action">Reply</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  } else if (tab === 'products') {
    tabContent = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
      <div><h2>Products</h2><div class="dash-sub">Add, edit, and manage your product catalog.</div></div>
      <button class="btn btn-gold btn-sm">+ Add Product</button>
    </div>
    <table class="dash-table">
      <thead><tr><th>Image</th><th>Name</th><th>Brand</th><th>Category</th><th>Price</th><th>Flow</th><th>Stock</th><th>Actions</th></tr></thead>
      <tbody>
        ${PRODUCTS.slice(0, 12).map(p => `
          <tr>
            <td><div style="width: 50px; height: 36px; background: var(--ivory-dark); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--emerald);">${SVG[p.svg] ? `<div style="width: 80%; height: 80%;">${SVG[p.svg]()}</div>` : ''}</div></td>
            <td><span class="item-name">${escapeHtml(p.name)}</span></td>
            <td>${escapeHtml(getBrandBySlug(p.brand)?.name || p.brand)}</td>
            <td>${escapeHtml(p.category)}</td>
            <td>${formatINR(p.price)}</td>
            <td><span class="status-pill ${p.flow === 'license' ? 'pending' : p.flow === 'display-only' ? 'rejected' : p.flow === 'aadhar' ? 'new' : 'completed'}">${p.flow}</span></td>
            <td>${p.stock === 'inquire' ? '—' : p.stock || 0}</td>
            <td><span class="dash-action">Edit</span><span class="dash-action">Photos</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  } else if (tab === 'preowned') {
    tabContent = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
      <div><h2>Pre-Owned Inventory</h2><div class="dash-sub">Manage curated pre-owned firearms. Each entry tracks year, condition, and 45-day intimation status.</div></div>
      <button class="btn btn-gold btn-sm">+ Add Pre-Owned Item</button>
    </div>
    <table class="dash-table">
      <thead><tr><th>ID</th><th>Item</th><th>Year</th><th>Condition</th><th>Asking Price</th><th>Intimation Status</th><th>Actions</th></tr></thead>
      <tbody>
        ${PREOWNED.map(p => `
          <tr>
            <td><strong>${p.id}</strong></td>
            <td><span class="item-name">${escapeHtml(p.name)}</span></td>
            <td>${escapeHtml(p.year)}</td>
            <td><span class="badge condition-${p.condition.toLowerCase().replace(/ /g, '-')}">${escapeHtml(p.condition)}</span></td>
            <td>${formatINR(p.price)}</td>
            <td><span class="status-pill ${p.recentlyListed ? 'pending' : 'approved'}">${p.recentlyListed ? 'Awaiting buyer' : 'Listed'}</span></td>
            <td><span class="dash-action">Edit</span><span class="dash-action">Track</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  } else if (tab === 'inquiries') {
    tabContent = `
    <h2>License Inquiries Queue</h2>
    <div class="dash-sub">Express-interest inquiries for licensed firearms. Verify licence and UIN before reply.</div>
    <div style="display: flex; gap: 12px; margin: 16px 0; flex-wrap: wrap;">
      <button class="btn btn-outline-emerald btn-sm">All (5)</button>
      <button class="btn btn-outline-emerald btn-sm">New (2)</button>
      <button class="btn btn-outline-emerald btn-sm">Verified (2)</button>
      <button class="btn btn-outline-emerald btn-sm">Pending (1)</button>
    </div>
    <table class="dash-table">
      <thead><tr><th>ID</th><th>Date</th><th>Product</th><th>Customer</th><th>Licence #</th><th>UIN</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        ${MOCK_INQUIRIES.map(i => `
          <tr>
            <td><strong>${i.id}</strong></td>
            <td>${i.date}</td>
            <td><span class="item-name">${escapeHtml(i.product)}</span></td>
            <td>${escapeHtml(i.customer)}</td>
            <td>${escapeHtml(i.license)}</td>
            <td>${escapeHtml(i.uin)}</td>
            <td><span class="status-pill ${i.status}">${i.status}</span></td>
            <td><span class="dash-action">View</span><span class="dash-action">Verify</span><span class="dash-action">Reply</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  } else if (tab === 'orders') {
    tabContent = `
    <h2>Cart Orders</h2>
    <div class="dash-sub">Orders placed via standard checkout (accessories) and air-weapon cart (pending Aadhar approval).</div>
    <table class="dash-table">
      <thead><tr><th>Order ID</th><th>Date</th><th>Product</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        ${MOCK_ORDERS.map(o => `
          <tr>
            <td><strong>${o.id}</strong></td>
            <td>${o.date}</td>
            <td><span class="item-name">${escapeHtml(o.product)}</span></td>
            <td>${formatINR(o.amount)}</td>
            <td><span class="status-pill ${o.status}">${o.status}</span></td>
            <td><span class="dash-action">View</span><span class="dash-action">Update Status</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  } else if (tab === 'aadhar') {
    tabContent = `
    <h2>Aadhar Verification Queue</h2>
    <div class="dash-sub">Air-weapon orders awaiting Aadhar review. SLA: 24 hours. Approve or reject before order processes.</div>
    <div class="admin-banner" style="background: linear-gradient(135deg, #1E40AF, #3B82F6);">
      <div class="icon-circle">⚿</div>
      <div><strong>Privacy notice:</strong> Aadhar files are encrypted at rest, displayed masked (last-4 only), and deleted after order fulfilment per UIDAI guidelines.</div>
    </div>
    <table class="dash-table">
      <thead><tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Aadhar Uploaded</th><th>Amount</th><th>Actions</th></tr></thead>
      <tbody>
        ${MOCK_AADHAR_QUEUE.map(o => `
          <tr>
            <td><strong>${o.id}</strong></td>
            <td>${escapeHtml(o.customer)}</td>
            <td><span class="item-name">${escapeHtml(o.product)}</span></td>
            <td>${escapeHtml(o.uploaded)}</td>
            <td>${formatINR(o.amountPaise)}</td>
            <td>
              <span class="dash-action">View Aadhar</span>
              <span class="dash-action" style="color: #047857;">Approve</span>
              <span class="dash-action danger">Reject</span>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  } else if (tab === 'payments') {
    tabContent = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
      <div><h2>Payment Request Links</h2><div class="dash-sub">Send custom Razorpay payment links via WhatsApp, Email, or SMS for bespoke orders, partial payments, or holds.</div></div>
      <button class="btn btn-gold btn-sm" data-action="payment-request">+ New Payment Link</button>
    </div>
    <table class="dash-table">
      <thead><tr><th>Link ID</th><th>Sent</th><th>Customer</th><th>Amount</th><th>Channel</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        ${MOCK_PAYMENT_LINKS.map(p => `
          <tr>
            <td><strong>${p.id}</strong></td>
            <td>${escapeHtml(p.sent)}</td>
            <td>${escapeHtml(p.customer)}</td>
            <td>${formatINR(p.amount)}</td>
            <td><span class="status-pill ${p.channel === 'WhatsApp' ? 'completed' : p.channel === 'Email' ? 'new' : 'pending'}">${escapeHtml(p.channel)}</span></td>
            <td><span class="status-pill ${p.status === 'paid' ? 'approved' : p.status === 'expired' ? 'rejected' : p.status === 'sent' ? 'new' : 'pending'}">${escapeHtml(p.status)}</span></td>
            <td><span class="dash-action">Resend</span><span class="dash-action">Copy Link</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  } else if (tab === 'content') {
    tabContent = `
    <h2>Content & Help Centre</h2>
    <div class="dash-sub">Manage Help Centre articles, government links, and homepage banners. Each article supports rich text and PDF attachments.</div>
    <table class="dash-table">
      <thead><tr><th>Article</th><th>Slug</th><th>Last Updated</th><th>Views</th><th>Actions</th></tr></thead>
      <tbody>
        ${HELP_ARTICLES.slice(0, 8).map(a => `
          <tr>
            <td><span class="item-name">${escapeHtml(a.title)}</span></td>
            <td>/help/${a.slug}</td>
            <td>${a.featured ? '2026-05-08' : '2026-04-12'}</td>
            <td>${Math.floor(Math.random() * 800 + 50)}</td>
            <td><span class="dash-action">Edit</span><span class="dash-action">Attach PDF</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  } else if (tab === 'audit') {
    tabContent = `
    <h2>Audit Log</h2>
    <div class="dash-sub">Tamper-evident log of every administrative action. Searchable, exportable, immutable.</div>
    <table class="dash-table">
      <thead><tr><th>Timestamp</th><th>User</th><th>Action</th><th>Resource</th><th>IP</th></tr></thead>
      <tbody>
        <tr><td>2026-05-08 17:42</td><td><strong style="color: var(--emerald);">team@sahibzada</strong></td><td>VERIFY_LICENSE</td><td>INQ-2026-0042</td><td>103.×.×.45</td></tr>
        <tr><td>2026-05-08 16:18</td><td><strong style="color: var(--emerald);">team@sahibzada</strong></td><td>UPDATE_PRODUCT</td><td>PROD-p001</td><td>103.×.×.45</td></tr>
        <tr><td>2026-05-08 14:32</td><td>system</td><td>AADHAR_RECEIVED</td><td>ORD-2026-0188</td><td>—</td></tr>
        <tr><td>2026-05-08 11:20</td><td><strong style="color: var(--emerald);">team@sahibzada</strong></td><td>SEND_PAYMENT_LINK</td><td>PAY-2026-0091</td><td>103.×.×.45</td></tr>
        <tr><td>2026-05-07 17:08</td><td>system</td><td>PAYMENT_RECEIVED</td><td>PAY-2026-0090</td><td>—</td></tr>
        <tr><td>2026-05-07 09:42</td><td><strong style="color: var(--emerald);">team@sahibzada</strong></td><td>SEND_PAYMENT_LINK</td><td>PAY-2026-0089</td><td>103.×.×.45</td></tr>
        <tr><td>2026-05-06 15:11</td><td><strong style="color: var(--emerald);">team@sahibzada</strong></td><td>APPROVE_AADHAR</td><td>ORD-2026-0185</td><td>103.×.×.45</td></tr>
        <tr><td>2026-05-06 12:03</td><td><strong style="color: var(--emerald);">team@sahibzada</strong></td><td>ADD_PREOWNED</td><td>PO-po001</td><td>103.×.×.45</td></tr>
      </tbody>
    </table>
  `;
  } else if (tab === 'users') {
    tabContent = `
    <h2>Users & Roles</h2>
    <div class="dash-sub">Team member access. Granular permissions per role.</div>
    <table class="dash-table">
      <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Permissions</th><th>Last Login</th><th>Actions</th></tr></thead>
      <tbody>
        <tr><td><strong style="color: var(--emerald);">Team Lead</strong></td><td>team@sahibzadagunhouse.com</td><td><span class="status-pill approved">Owner</span></td><td>All</td><td>2026-05-08 17:42</td><td><span class="dash-action">Edit</span></td></tr>
        <tr><td><strong style="color: var(--emerald);">Showroom Manager</strong></td><td>showroom@sahibzadagunhouse.com</td><td><span class="status-pill new">Manager</span></td><td>Inquiries · Orders · Pre-owned</td><td>2026-05-08 16:18</td><td><span class="dash-action">Edit</span></td></tr>
        <tr><td><strong style="color: var(--emerald);">Compliance Officer</strong></td><td>compliance@sahibzadagunhouse.com</td><td><span class="status-pill pending">Compliance</span></td><td>Inquiries · Aadhar Queue · Audit</td><td>2026-05-07 09:14</td><td><span class="dash-action">Edit</span></td></tr>
      </tbody>
    </table>
  `;
  }

  return `
  <div class="container">
    <div style="padding: 24px 0 0;" class="breadcrumb">
      <a data-link="/">Home</a> <span class="sep">›</span> Admin Preview
    </div>
    <div class="dash-layout">
      <aside class="dash-sidebar">
        <h3>Admin Portal</h3>
        <div class="dash-nav">
          ${navItems.map(n => `
            <div class="dash-nav-item ${n.slug === tab ? 'active' : ''}" data-link="/admin?tab=${n.slug}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${n.icon}</svg>
              ${escapeHtml(n.label)}
              ${n.count ? `<span class="badge-count">${n.count}</span>` : ''}
            </div>
          `).join('')}
        </div>
      </aside>
      <div class="dash-content">${tabContent}</div>
    </div>
  </div>
`;
}

// ============================================================
// PAGE: CART
// ============================================================
function renderCart() {
  const ids = Object.keys(state.cart);

  if (ids.length === 0) {
    return `
    <section class="page-header"><div class="container">
      <div class="breadcrumb"><a data-link="/">Home</a> <span class="sep">›</span> Cart</div>
      <h1>Your Cart</h1>
    </div></section>
    <div class="container" style="padding: 48px 0;">
      <div class="cart-items cart-empty">
        <h3>Your cart is empty</h3>
        <p>Browse our accessories and air-weapons to add items to your cart. Licensed firearms are inquired for, not added to cart.</p>
        <div style="margin-top: 24px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <a class="btn btn-primary" data-link="/shop?cat=accessories">Browse Accessories</a>
          <a class="btn btn-outline-emerald" data-link="/shop?cat=airguns">Browse Air-guns</a>
        </div>
      </div>
    </div>
  `;
  }

  let subtotal = 0;
  let hasAadhar = false;
  const itemsHtml = ids.map(id => {
    const p = getProductByIdOrSlug(id);
    if (!p) return '';
    const qty = state.cart[id];
    const lineTotal = (p.price || 0) * qty;
    subtotal += lineTotal;
    if (p.flow === 'aadhar') hasAadhar = true;
    return `
    <div class="cart-item">
      <div class="cart-item-thumb" style="color: var(--emerald);">${SVG[p.svg] ? SVG[p.svg]() : SVG.holster()}</div>
      <div class="cart-item-info">
        <div class="brand">${escapeHtml(getBrandBySlug(p.brand)?.name || '')}</div>
        <div class="name">${escapeHtml(p.name)}</div>
        <div class="qty-row">
          <button data-action="cart-decrease" data-id="${p.id}">−</button>
          <span>Qty: <strong>${qty}</strong></span>
          <button data-action="cart-increase" data-id="${p.id}">+</button>
        </div>
        <button class="remove-btn" data-action="cart-remove" data-id="${p.id}">Remove</button>
      </div>
      <div class="cart-item-price">${formatINR(lineTotal)}</div>
    </div>
  `;
  }).join('');

  const shipping = subtotal > 500000 ? 0 : 30000;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  return `
  <section class="page-header"><div class="container">
    <div class="breadcrumb"><a data-link="/">Home</a> <span class="sep">›</span> Cart</div>
    <h1>Your Cart</h1>
    <p>${ids.length} ${ids.length === 1 ? 'item' : 'items'}</p>
  </div></section>

  <div class="container">
    ${hasAadhar ? `
      <div class="compliance-banner" style="margin: 24px 0 0; background: var(--blue-soft); border-left-color: var(--blue);">
        <strong>Aadhar verification required at checkout</strong>
        Your cart contains air-weapon items below the licensing threshold. You will be asked to upload your Aadhar at checkout. Your Aadhar is encrypted, masked in display, and deleted after order fulfilment per UIDAI guidelines.
      </div>
    ` : ''}

    <div class="cart-layout">
      <div class="cart-items">${itemsHtml}</div>

      <div class="cart-summary">
        <h3>Order Summary</h3>
        <div class="cart-line"><span>Subtotal</span><span>${formatINR(subtotal)}</span></div>
        <div class="cart-line"><span>Shipping ${subtotal > 500000 ? '(free over ₹5,000)' : ''}</span><span>${shipping ? formatINR(shipping) : 'FREE'}</span></div>
        <div class="cart-line"><span>GST (18%)</span><span>${formatINR(tax)}</span></div>
        <div class="cart-line total"><span>Total</span><span class="price">${formatINR(total)}</span></div>
        <button class="btn btn-primary btn-block" style="margin-top: 20px;" data-action="${hasAadhar ? 'checkout-aadhar' : 'checkout-standard'}">${hasAadhar ? 'Proceed to Aadhar Verification' : 'Proceed to Checkout'}</button>
        <div style="text-align: center; margin-top: 16px; font-size: 11px; color: var(--charcoal-light); letter-spacing: 0.06em;">
          🔒 Secure checkout via Razorpay
        </div>
      </div>
    </div>
  </div>
`;
}
