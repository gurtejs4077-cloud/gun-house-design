  'use strict';

  // ============================================================
  // MODALS
  // ============================================================
  function openModal(html) {
    const host = document.getElementById('modal-host');
    host.innerHTML = `<div class="modal-overlay open" id="modalOverlay">${html}</div>`;
    // Close on overlay click
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
      if (e.target.id === 'modalOverlay') closeModal();
    });
  }
  function closeModal() {
    document.getElementById('modal-host').innerHTML = '';
  }

  function productSummaryBlock(p) {
    if (!p) return '';
    const brandName = getBrandBySlug(p.brand)?.name || '';
    return `
  <div class="form-product-summary">
    <div class="thumb" style="color: var(--emerald);">${SVG[p.svg] ? SVG[p.svg]() : SVG.pistol1911()}</div>
    <div>
      <div class="name">${escapeHtml(p.name)}</div>
      <div class="price">${escapeHtml(brandName)}${p.caliber ? ' · ' + escapeHtml(p.caliber) : ''}${p.price ? ' · <strong>' + formatINR(p.price) + '</strong>' : ''}</div>
    </div>
  </div>
`;
  }

  // Express Interest modal (license-required products)
  function openExpressInterest(productId) {
    const p = getProductByIdOrSlug(productId);
    const isPreowned = p && p.flow === 'license-preowned';

    openModal(`
  <div class="modal">
    <div class="modal-header">
      <div class="eyebrow">Step 1 of 1</div>
      <h2>Express Interest</h2>
      <button class="modal-close" data-action="modal-close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      ${productSummaryBlock(p)}

      ${isPreowned ? `
        <div class="intimation-notice" style="margin-bottom: 20px;">
          <div class="icon">!</div>
          <div><strong>Pre-owned firearm</strong> — A 45-day intimation period under Section 5 of the Arms Act 1959 begins after document verification. Final transfer occurs at our showroom after regulatory clearance.</div>
        </div>
      ` : `
        <div class="compliance-banner" style="margin-bottom: 20px;">
          <strong>Licensed firearm</strong>
          Online checkout is not legally permitted. Our team will verify your licence and arrange the transfer in-store.
        </div>
      `}

      <div class="form-row split">
        <div><label>First Name <span class="req">*</span></label><input type="text" required placeholder="Aman" /></div>
        <div><label>Last Name <span class="req">*</span></label><input type="text" required placeholder="Singh" /></div>
      </div>
      <div class="form-row split">
        <div><label>Phone <span class="req">*</span></label><input type="tel" required placeholder="+91 98XXX XXXXX" /></div>
        <div><label>Email <span class="req">*</span></label><input type="email" required placeholder="aman@example.com" /></div>
      </div>

      <h3 style="font-family: 'Playfair Display', serif; color: var(--emerald); font-size: 18px; margin: 24px 0 16px; padding-top: 16px; border-top: 1px solid var(--gray-200);">Licence Details</h3>

      <div class="form-row split">
        <div><label>Licence Number <span class="req">*</span></label><input type="text" required placeholder="PB/AL/12345" /></div>
        <div><label>UIN <span class="req">*</span></label><input type="text" required placeholder="UIN-XXXX-PB-XXXXX" /></div>
      </div>
      <div class="form-row split">
        <div>
          <label>Issuing State <span class="req">*</span></label>
          <select required>
            <option value="">Select state</option>
            <option>Punjab</option><option>Haryana</option><option>Chandigarh (UT)</option>
            <option>Delhi</option><option>Himachal Pradesh</option><option>Other</option>
          </select>
        </div>
        <div><label>Licence Expiry <span class="req">*</span></label><input type="date" required /></div>
      </div>
      <div class="form-row">
        <label>Bore Endorsement <span class="req">*</span></label>
        <select required>
          <option value="">Select bore type</option>
          <option>NPB · Non-Prohibited Bore</option>
          <option>PB · Prohibited Bore</option>
          <option>Both NPB and PB</option>
        </select>
      </div>
      <div class="form-row">
        <label>Upload Government Photo ID <span class="req">*</span></label>
        <input type="file" accept="image/*,.pdf" required />
        <div class="help-text">Aadhar / PAN / Passport / Driving Licence. Max 5 MB.</div>
      </div>

      <div class="form-row">
        <label>Preferred Visit Time</label>
        <select>
          <option>Any weekday morning (10am–1pm)</option>
          <option>Any weekday afternoon (2pm–5pm)</option>
          <option>Saturday</option>
          <option>Will call to confirm</option>
        </select>
      </div>
      <div class="form-row">
        <label>Notes (optional)</label>
        <textarea placeholder="Any specific questions or preferences"></textarea>
      </div>

      <div style="font-size: 11px; color: var(--charcoal-light); line-height: 1.6; padding: 12px; background: var(--ivory-dark); border-radius: 4px;">
        By submitting, you confirm that all licence details are accurate and current. Sahibzada Gun House will verify against your licence book and relevant government records before scheduling your in-store visit.
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline-emerald btn-sm" data-action="modal-close">Cancel</button>
      <button class="btn btn-primary btn-sm" data-action="submit-interest">Submit Inquiry</button>
    </div>
  </div>
`);
  }

  // Aadhar verification modal (CO2 / air guns)
  function openAadhar(productId) {
    const p = getProductByIdOrSlug(productId);
    openModal(`
  <div class="modal">
    <div class="modal-header">
      <div class="eyebrow">Compliance Step</div>
      <h2>Aadhar Verification</h2>
      <button class="modal-close" data-action="modal-close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      ${p ? productSummaryBlock(p) : ''}

      <div class="compliance-banner" style="background: var(--blue-soft); border-left-color: var(--blue); margin-bottom: 20px;">
        <strong>Why we ask for Aadhar</strong>
        This air-weapon operates below the 20J / 4.5mm licensing threshold. Aadhar verification is our internal compliance policy and is reviewed by Team Sahibzada within 24 hours before order processing.
      </div>

      <div class="form-row split">
        <div><label>Full Name (as on Aadhar) <span class="req">*</span></label><input type="text" required /></div>
        <div><label>Date of Birth <span class="req">*</span></label><input type="date" required /></div>
      </div>
      <div class="form-row">
        <label>Aadhar Number <span class="req">*</span></label>
        <input type="text" maxlength="14" placeholder="XXXX XXXX XXXX" required />
        <div class="help-text">Stored encrypted. Displayed masked. Deleted post-fulfilment per UIDAI guidelines.</div>
      </div>
      <div class="form-row">
        <label>Upload Aadhar (front + back) <span class="req">*</span></label>
        <input type="file" accept="image/*,.pdf" multiple required />
        <div class="help-text">Either masked Aadhar or full Aadhar. Max 5 MB each.</div>
      </div>
      <div class="form-row">
        <label>Delivery Address <span class="req">*</span></label>
        <textarea required placeholder="Full address with PIN code"></textarea>
      </div>

      <div style="background: var(--ivory-dark); padding: 16px; border-radius: 4px; font-size: 12px; color: var(--charcoal-light); line-height: 1.7;">
        <strong style="color: var(--emerald); display: block; margin-bottom: 6px;">Privacy commitment</strong>
        Your Aadhar is encrypted at rest, displayed only as last-4 digits in our admin system, accessed only by authorized compliance staff, and permanently deleted within 30 days of order fulfilment.
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline-emerald btn-sm" data-action="modal-close">Cancel</button>
      <button class="btn btn-gold btn-sm" data-action="submit-aadhar">Submit & Continue to Payment</button>
    </div>
  </div>
`);
  }

  // Custom Payment Request modal (admin demo)
  function openPaymentRequest(productId) {
    const p = productId ? getProductByIdOrSlug(productId) : null;
    openModal(`
  <div class="modal wide">
    <div class="modal-header">
      <div class="eyebrow">Admin · Payment Tools</div>
      <h2>Send Custom Payment Link</h2>
      <button class="modal-close" data-action="modal-close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      ${p ? productSummaryBlock(p) : ''}

      <div class="compliance-banner" style="background: var(--gold-soft); border-left-color: var(--gold); margin-bottom: 20px;">
        <strong>Custom Payment Link</strong>
        Generates a secure Razorpay payment link for partial payment, holds, custom orders, or installments. Sent via WhatsApp, Email, or SMS.
      </div>

      <div class="form-row split">
        <div><label>Customer Name <span class="req">*</span></label><input type="text" required placeholder="V. Sharma" /></div>
        <div><label>Customer Phone <span class="req">*</span></label><input type="tel" required placeholder="+91 98XXX XXXXX" /></div>
      </div>
      <div class="form-row split">
        <div><label>Customer Email</label><input type="email" placeholder="customer@example.com" /></div>
        <div><label>Reference / Order ID</label><input type="text" placeholder="INQ-2026-0042" value="${p ? 'PROD-' + p.id : ''}" /></div>
      </div>
      <div class="form-row split">
        <div>
          <label>Amount (₹) <span class="req">*</span></label>
          <input type="number" required placeholder="50000" value="${p && p.price ? p.price / 100 : ''}" />
        </div>
        <div>
          <label>Payment Type <span class="req">*</span></label>
          <select required>
            <option>Full Payment</option>
            <option>Hold / Token</option>
            <option>Partial / Installment</option>
            <option>Service Charge</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <label>Send Via <span class="req">*</span></label>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 8px;">
          <label class="filter-option" style="border: 1px solid var(--gray-300); padding: 12px; border-radius: 4px; cursor: pointer;"><input type="checkbox" checked /> WhatsApp</label>
          <label class="filter-option" style="border: 1px solid var(--gray-300); padding: 12px; border-radius: 4px; cursor: pointer;"><input type="checkbox" /> Email</label>
          <label class="filter-option" style="border: 1px solid var(--gray-300); padding: 12px; border-radius: 4px; cursor: pointer;"><input type="checkbox" /> SMS</label>
        </div>
      </div>
      <div class="form-row">
        <label>Message to Customer</label>
        <textarea placeholder="Hi, please find your payment link below..."></textarea>
      </div>
      <div class="form-row split">
        <div><label>Link Validity</label><select><option>24 hours</option><option>48 hours</option><option>7 days</option><option>30 days</option></select></div>
        <div><label>Currency</label><select><option>INR ₹</option></select></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline-emerald btn-sm" data-action="modal-close">Cancel</button>
      <button class="btn btn-gold btn-sm" data-action="submit-payment-link">Generate & Send Link</button>
    </div>
  </div>
`);
  }

  // Service booking modal
  function openServiceBooking(serviceSlug) {
    const svc = SERVICES.find(s => s.slug === serviceSlug);
    openModal(`
  <div class="modal">
    <div class="modal-header">
      <div class="eyebrow">Gunsmith Booking</div>
      <h2>${svc ? escapeHtml(svc.title) : 'Book a Service'}</h2>
      <button class="modal-close" data-action="modal-close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      ${svc ? `
        <div class="form-product-summary">
          <div class="thumb" style="color: var(--emerald);">${SVG.cleaning()}</div>
          <div>
            <div class="name">${escapeHtml(svc.title)}</div>
            <div class="price"><strong>${escapeHtml(svc.price)}</strong> · Turnaround ${escapeHtml(svc.turnaround)}</div>
          </div>
        </div>
      ` : ''}

      <div class="form-row split">
        <div><label>Your Name <span class="req">*</span></label><input type="text" required /></div>
        <div><label>Phone <span class="req">*</span></label><input type="tel" required /></div>
      </div>
      ${!svc ? `
        <div class="form-row">
          <label>Service Type <span class="req">*</span></label>
          <select required>
            ${SERVICES.map(s => `<option value="${s.slug}">${escapeHtml(s.title)} — ${escapeHtml(s.price)}</option>`).join('')}
          </select>
        </div>
      ` : ''}
      <div class="form-row split">
        <div><label>Firearm Make / Model <span class="req">*</span></label><input type="text" required placeholder="e.g. Webley Mk IV" /></div>
        <div><label>Caliber</label><input type="text" placeholder=".32 S&W Long" /></div>
      </div>
      <div class="form-row">
        <label>Licence Number <span class="req">*</span></label>
        <input type="text" required placeholder="PB/AL/XXXXX" />
        <div class="help-text">Required for any in-shop work involving a licensed firearm.</div>
      </div>
      <div class="form-row">
        <label>Preferred Drop-off Date</label>
        <input type="date" />
      </div>
      <div class="form-row">
        <label>Issue Description / Notes</label>
        <textarea placeholder="Describe any specific issues or requirements"></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline-emerald btn-sm" data-action="modal-close">Cancel</button>
      <button class="btn btn-primary btn-sm" data-action="submit-service">Book Service</button>
    </div>
  </div>
`);
  }

  // ============================================================
  // CART LOGIC
  // ============================================================
  function addToCart(productId) {
    const p = getProductByIdOrSlug(productId);
    if (!p) return;
    state.cart[productId] = (state.cart[productId] || 0) + 1;
    updateCartCount();
    toast(`Added "${p.name}" to cart`, 'success');
  }
  function removeFromCart(productId) {
    delete state.cart[productId];
    updateCartCount();
    if (parseRoute().path === '/cart') renderRoute();
  }
  function changeCartQty(productId, delta) {
    const cur = state.cart[productId] || 0;
    const next = cur + delta;
    if (next <= 0) removeFromCart(productId);
    else { state.cart[productId] = next; updateCartCount(); if (parseRoute().path === '/cart') renderRoute(); }
  }
  function updateCartCount() {
    const count = Object.values(state.cart).reduce((a, b) => a + b, 0);
    const el = document.getElementById('cartCount');
    if (count > 0) { el.textContent = count; el.classList.remove('hidden'); }
    else el.classList.add('hidden');
  }

  // ============================================================
  // TOAST
  // ============================================================
  function toast(message, type = '') {
    const host = document.getElementById('toast-host');
    const el = document.createElement('div');
    el.className = 'toast ' + type;
    el.textContent = message;
    host.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(20px)'; }, 3000);
    setTimeout(() => { el.remove(); }, 3500);
  }

  // ============================================================
  // SHARE
  // ============================================================
  function shareWhatsApp(productId) {
    const p = getProductByIdOrSlug(productId);
    if (!p) return;
    const text = `Take a look at this ${p.name} from Sahibzada Gun House: ${p.summary || ''} — ${p.price ? formatINR(p.price) : 'Pricing on inquiry'}.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }
  function shareLink(productId) {
    const url = `${location.origin}${location.pathname}#/product/${productId}`;
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(() => toast('Link copied to clipboard', 'success'));
    else toast('Link: ' + url);
  }
  function shareEmail(productId) {
    const p = getProductByIdOrSlug(productId);
    if (!p) return;
    const subject = `${p.name} — Sahibzada Gun House`;
    const body = `${p.summary || ''}\n\n${p.price ? formatINR(p.price) : 'Pricing on inquiry'}\n\nView: ${location.origin}${location.pathname}#/product/${productId}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  // ============================================================
  // ROUTER
  // ============================================================
  function parseRoute() {
    const hash = location.hash.replace(/^#/, '') || '/';
    const [pathRaw, queryRaw] = hash.split('?');
    const path = pathRaw || '/';
    const params = {};
    if (queryRaw) {
      queryRaw.split('&').forEach(pair => {
        const [k, v] = pair.split('=');
        if (k) params[decodeURIComponent(k)] = v ? decodeURIComponent(v) : '';
      });
    }
    return { path, params };
  }

  function renderRoute() {
    const { path, params } = parseRoute();
    const app = document.getElementById('app');
    let html = '';

    // Update nav active state
    $$('.nav-link').forEach(el => el.classList.remove('active'));

    if (path === '/' || path === '') {
      html = renderHome();
      $$('.nav-link').forEach(el => { if (el.dataset.scroll === 'home') el.classList.add('active'); });
    } else if (path === '/shop') {
      html = renderShop(params);
      $$('.nav-link').forEach(el => { if (el.dataset.link === '/shop' || el.dataset.scroll === 'products') el.classList.add('active'); });
    } else if (path === '/preowned') {
      html = renderPreowned();
      $$('.nav-link').forEach(el => { if (el.dataset.link === '/preowned') el.classList.add('active'); });
    } else if (path.startsWith('/product/')) {
      const slug = path.replace('/product/', '');
      html = renderProduct(slug);
    } else if (path === '/brands') {
      html = renderBrands();
      $$('.nav-link').forEach(el => { if (el.dataset.link === '/brands' || el.dataset.scroll === 'brands') el.classList.add('active'); });
    } else if (path.startsWith('/brand/')) {
      const slug = path.replace('/brand/', '');
      html = renderBrandDetail(slug);
    } else if (path === '/help') {
      html = renderHelp();
      $$('.nav-link').forEach(el => { if (el.dataset.link === '/help') el.classList.add('active'); });
    } else if (path.startsWith('/help/')) {
      const slug = path.replace('/help/', '');
      html = renderHelpArticle(slug);
    } else if (path === '/services') {
      html = renderServices();
      $$('.nav-link').forEach(el => { if (el.dataset.link === '/services') el.classList.add('active'); });
    } else if (path === '/account') {
      html = renderAccount(params.tab || 'overview');
    } else if (path === '/admin') {
      html = renderAdmin(params.tab || 'dashboard');
      $$('.nav-link').forEach(el => { if (el.dataset.link === '/admin') el.classList.add('active'); });
    } else if (path === '/cart') {
      html = renderCart();
    } else {
      html = `<div class="container" style="padding: 80px 0; text-align: center;"><h1 style="font-family: 'Playfair Display', serif; color: var(--emerald);">Page not found</h1><p style="margin: 16px 0;">The page you're looking for doesn't exist.</p><a class="btn btn-primary" data-link="/">Back to Home</a></div>`;
    }

    app.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Re-init slider whenever home is rendered
    if (path === '/' || path === '') setTimeout(initHeroSlider, 80);

    // PDP tab switcher (re-attach after each render)
    $$('.pdp-tab-header').forEach(h => {
      h.addEventListener('click', () => {
        const target = h.dataset.tab;
        $$('.pdp-tab-header').forEach(x => x.classList.toggle('active', x.dataset.tab === target));
        $$('.pdp-tab-content').forEach(x => x.classList.toggle('active', x.dataset.tab === target));
      });
    });

    // PDP thumb switcher
    $$('.pdp-thumb').forEach(t => {
      t.addEventListener('click', () => {
        $$('.pdp-thumb').forEach(x => x.classList.remove('active'));
        t.classList.add('active');
      });
    });
  }

  function navigate(path) {
    if (path.startsWith('#')) path = path.replace(/^#/, '');
    if (!path.startsWith('/')) path = '/' + path;
    location.hash = path;
  }

  window.addEventListener('hashchange', renderRoute);

  // ============================================================
  // EVENT DELEGATION
  // ============================================================
  document.addEventListener('click', (e) => {
    // Scroll via [data-scroll]
    const scrollEl = e.target.closest('[data-scroll]');
    if (scrollEl) {
      e.preventDefault();

      // Close mobile menu if open
      const menu = document.getElementById('navMenu');
      if (menu && menu.style.display === 'flex') menu.style.display = '';

      const id = scrollEl.dataset.scroll;
      const { path } = parseRoute();

      const performScroll = () => {
        const target = document.getElementById(id);
        if (target) {
          const navHeight = 84;
          const top = target.offsetTop - navHeight;
          window.scrollTo({ top, behavior: 'smooth' });

          // Update active state manually
          $$('.nav-link').forEach(el => el.classList.remove('active'));
          scrollEl.classList.add('active');
        }
      };

      if (path === '/' || path === '') {
        performScroll();
      } else {
        navigate('/');
        setTimeout(performScroll, 150);
      }
      return;
    }

    // Navigation via [data-link]
    const linkEl = e.target.closest('[data-link]');
    if (linkEl) {
      e.preventDefault();
      navigate(linkEl.dataset.link);
      return;
    }

    // Action buttons via [data-action]
    const actionEl = e.target.closest('[data-action]');
    if (!actionEl) return;
    const action = actionEl.dataset.action;
    const id = actionEl.dataset.id;

    switch (action) {
      case 'express-interest':
        openExpressInterest(id);
        break;
      case 'add-to-cart':
        addToCart(id);
        break;
      case 'buy-now':
        addToCart(id);
        navigate('/cart');
        break;
      case 'buy-now-aadhar':
        addToCart(id);
        navigate('/cart');
        break;
      case 'wishlist':
        e.stopPropagation();
        toast('Added to wishlist');
        break;
      case 'share-whatsapp': shareWhatsApp(id); break;
      case 'share-link': shareLink(id); break;
      case 'share-email': shareEmail(id); break;
      case 'cart-increase': changeCartQty(id, 1); break;
      case 'cart-decrease': changeCartQty(id, -1); break;
      case 'cart-remove': removeFromCart(id); break;
      case 'checkout-standard':
        toast('Redirecting to Razorpay checkout…', 'success');
        setTimeout(() => toast('In production, this opens secure Razorpay payment'), 1200);
        break;
      case 'checkout-aadhar':
        // Find first aadhar product in cart for the modal context
        const aadharId = Object.keys(state.cart).find(pid => {
          const p = getProductByIdOrSlug(pid);
          return p && p.flow === 'aadhar';
        });
        openAadhar(aadharId);
        break;
      case 'payment-request': openPaymentRequest(id); break;
      case 'book-service': openServiceBooking(actionEl.dataset.service); break;
      case 'modal-close': closeModal(); break;
      case 'submit-interest':
        closeModal();
        toast('✓ Inquiry submitted. Our team will verify and reply within 24 hours.', 'success');
        setTimeout(() => toast('Reference: INQ-2026-' + String(Math.floor(Math.random() * 9000) + 1000)), 1500);
        break;
      case 'submit-aadhar':
        closeModal();
        toast('✓ Aadhar received. Order placed in PENDING_APPROVAL.', 'success');
        setTimeout(() => toast('Our compliance team will review within 24 hours'), 1500);
        state.cart = {};
        updateCartCount();
        navigate('/account?tab=orders');
        break;
      case 'submit-payment-link':
        closeModal();
        toast('✓ Payment link sent via WhatsApp', 'success');
        break;
      case 'submit-service':
        closeModal();
        toast('✓ Service booking received. We will call to confirm.', 'success');
        break;
    }
  });

  // ============================================================
  // MOBILE MENU TOGGLE
  // ============================================================
  document.getElementById('hamburgerBtn')?.addEventListener('click', () => {
    const menu = document.getElementById('navMenu');
    if (menu.style.display === 'flex') {
      menu.style.display = '';
    } else {
      menu.style.display = 'flex';
      menu.style.position = 'fixed';
      menu.style.top = '64px';
      menu.style.left = '0';
      menu.style.right = '0';
      menu.style.background = 'var(--emerald-dark)';
      menu.style.flexDirection = 'column';
      menu.style.padding = '20px';
      menu.style.zIndex = '99';
      menu.style.boxShadow = 'var(--shadow-lg)';
    }
  });

  // ============================================================
  // HERO SLIDER
  // ============================================================
  function initHeroSlider() {
    const slider = document.querySelector('[data-slider]');
    if (!slider) return;
    const slides = slider.querySelectorAll('.hero-slide');
    const track = document.getElementById('heroSlides');
    const dots = slider.querySelectorAll('.slider-dot');
    const counter = document.getElementById('slideCounter');
    const total = slides.length;
    let current = 0;
    let autoTimer = null;

    function goTo(idx) {
      idx = ((idx % total) + total) % total;
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('active');
      current = idx;
      track.style.transform = `translateX(-${current * 100}%)`;
      requestAnimationFrame(() => slides[current].classList.add('is-active'));
      dots[current].classList.add('active');
      if (counter) counter.textContent = `${String(current + 1).padStart(2,'0')} / ${String(total).padStart(2,'0')}`;
    }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(() => goTo(current + 1), 6000);
    }
    function stopAuto() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }

    document.getElementById('sliderPrev')?.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
    document.getElementById('sliderNext')?.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
    dots.forEach(dot => dot.addEventListener('click', () => { stopAuto(); goTo(+dot.dataset.slide); startAuto(); }));

    let touchStartX = 0;
    slider.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) { stopAuto(); goTo(current + (dx < 0 ? 1 : -1)); startAuto(); }
    }, { passive: true });

    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);
    slides[0].classList.add('is-active');
    startAuto();
  }

  // ============================================================
  // INIT
  // ============================================================
  function _init() {
    renderRoute();
    updateCartCount();
    setTimeout(initHeroSlider, 80);
  }

  document.addEventListener('DOMContentLoaded', _init);
  if (document.readyState !== 'loading') { _init(); }
