/**
 * CleanARK Dry Cleaners - Official Website Script
 * Interactive Catalog, Calculator, WhatsApp Booking, Particles & Animations
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==================== 1. PRELOADER ====================
  const loader = document.getElementById('page-loader');
  const loaderBar = document.getElementById('loader-bar');
  
  // Animate loader bar then dismiss
  setTimeout(() => {
    if (loaderBar) loaderBar.style.width = '100%';
    setTimeout(() => {
      if (loader) {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    }, 400);
  }, 1200);


  // ==================== 2. STICKY HEADER & ACTIVE NAV ====================
  const siteHeader = document.getElementById('site-header');
  const backToTopBtn = document.getElementById('back-to-top');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header shadow
    if (scrollY > 50) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Active nav highlight
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // ==================== 3. MOBILE DRAWER MENU ====================
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const drawerClose = document.getElementById('drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));


  // ==================== 4. BUBBLE PARTICLES CANVAS ====================
  const canvas = document.getElementById('bubble-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.offsetWidth;
    let height = canvas.height = canvas.parentElement.offsetHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    });

    class Bubble {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 50;
        this.radius = Math.random() * 8 + 3;
        this.speedY = Math.random() * 0.9 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.alpha = Math.random() * 0.35 + 0.15;
        this.shine = Math.random() * 0.8;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < -30) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 165, 233, ${this.alpha * 0.25})`;
        ctx.fill();

        ctx.strokeStyle = `rgba(2, 132, 199, ${this.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Highlight shine
        ctx.beginPath();
        ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 1.5})`;
        ctx.fill();
      }
    }

    const bubbles = Array.from({ length: 24 }, () => new Bubble());

    function animateBubbles() {
      ctx.clearRect(0, 0, width, height);
      bubbles.forEach(b => {
        b.update();
        b.draw();
      });
      requestAnimationFrame(animateBubbles);
    }
    animateBubbles();
  }


  // ==================== 5. OFFICIAL CATALOG DATA (EXACT FLYER) ====================
  const catalogData = [
    // Men's Wear
    { id: 'm1', name: 'Shirt', category: 'mens', catLabel: "Men's Wear", dryClean: 115, steamIron: 25 },
    { id: 'm2', name: 'Jeans', category: 'mens', catLabel: "Men's Wear", dryClean: 135, steamIron: 35 },
    { id: 'm3', name: 'T-Shirt', category: 'mens', catLabel: "Men's Wear", dryClean: 115, steamIron: 29 },
    { id: 'm4', name: 'Pant', category: 'mens', catLabel: "Men's Wear", dryClean: 115, steamIron: 25 },
    { id: 'm5', name: 'Suit (2 Pcs)', category: 'mens', catLabel: "Men's Wear", dryClean: 379, steamIron: 99 },
    { id: 'm6', name: 'Suit (3 Pcs)', category: 'mens', catLabel: "Men's Wear", dryClean: 449, steamIron: 125 },
    { id: 'm7', name: 'Jacket', category: 'mens', catLabel: "Men's Wear", dryClean: 199, steamIron: 69 },
    { id: 'm8', name: 'Coat / Blazer', category: 'mens', catLabel: "Men's Wear", dryClean: 289, steamIron: 75 },
    { id: 'm9', name: 'Kurta', category: 'mens', catLabel: "Men's Wear", dryClean: 119, steamIron: 29 },
    { id: 'm10', name: 'Kurta Pajama', category: 'mens', catLabel: "Men's Wear", dryClean: 199, steamIron: 59 },
    { id: 'm11', name: 'Sherwani', category: 'mens', catLabel: "Men's Wear", dryClean: 399, steamIron: 199 },

    // Women's Wear
    { id: 'w1', name: 'Blouse / Top', category: 'womens', catLabel: "Women's Wear", dryClean: 79, steamIron: 29 },
    { id: 'w2', name: 'Dress', category: 'womens', catLabel: "Women's Wear", dryClean: 229, steamIron: 129 },
    { id: 'w3', name: 'Lehenga + Choli + Dupatta', category: 'womens', catLabel: "Women's Wear", dryClean: 499, steamIron: 149 },
    { id: 'w4', name: 'Kameez / Kurta', category: 'womens', catLabel: "Women's Wear", dryClean: 115, steamIron: 49 },
    { id: 'w5', name: 'Salwar', category: 'womens', catLabel: "Women's Wear", dryClean: 109, steamIron: 25 },
    { id: 'w6', name: 'Bridal Lehenga', category: 'womens', catLabel: "Women's Wear", dryClean: 799, steamIron: 199 },
    { id: 'w7', name: 'Saree (Plain / Cotton)', category: 'womens', catLabel: "Women's Wear", dryClean: 149, steamIron: 49 },
    { id: 'w8', name: 'Saree (Silk / Heavy)', category: 'womens', catLabel: "Women's Wear", dryClean: 349, steamIron: 89 },
    { id: 'w9', name: 'Saree (Embroidered / Heavy)', category: 'womens', catLabel: "Women's Wear", dryClean: 329, steamIron: 79 },
    { id: 'w10', name: 'Anarkali Suit', category: 'womens', catLabel: "Women's Wear", dryClean: 449, steamIron: 139 },
    { id: 'w11', name: 'Skirt', category: 'womens', catLabel: "Women's Wear", dryClean: 199, steamIron: 25 },
    { id: 'w12', name: 'Heavy Saree', category: 'womens', catLabel: "Women's Wear", dryClean: 399, steamIron: 499 },

    // Woolen Wear
    { id: 'wl1', name: 'Jacket (F/H Sleeves)', category: 'woolens', catLabel: 'Woolen Wear', dryClean: 314, steamIron: null },
    { id: 'wl2', name: 'Jacket (H/S Sleeves)', category: 'woolens', catLabel: 'Woolen Wear', dryClean: 234, steamIron: null },
    { id: 'wl3', name: 'Sweater (F/H Sleeves)', category: 'woolens', catLabel: 'Woolen Wear', dryClean: 199, steamIron: null },
    { id: 'wl4', name: 'Sweat Shirt', category: 'woolens', catLabel: 'Woolen Wear', dryClean: 199, steamIron: null },
    { id: 'wl5', name: 'Long Coat', category: 'woolens', catLabel: 'Woolen Wear', dryClean: 249, steamIron: null },
    { id: 'wl6', name: 'Shawl', category: 'woolens', catLabel: 'Woolen Wear', dryClean: 199, steamIron: null },
    { id: 'wl7', name: 'Pashmina', category: 'woolens', catLabel: 'Woolen Wear', dryClean: 349, steamIron: null },
    { id: 'wl8', name: 'Leather Jacket', category: 'woolens', catLabel: 'Woolen Wear', dryClean: 599, steamIron: null },

    // Shoes & Bags
    { id: 'sb1', name: 'Sport Shoes', category: 'shoes-bags', catLabel: 'Shoes & Bags', dryClean: 325, steamIron: null },
    { id: 'sb2', name: 'Canvas (Non-Leather)', category: 'shoes-bags', catLabel: 'Shoes & Bags', dryClean: 249, steamIron: null },
    { id: 'sb3', name: 'Leather Shoes', category: 'shoes-bags', catLabel: 'Shoes & Bags', dryClean: 349, steamIron: null },
    { id: 'sb4', name: 'Suede Leather Shoes', category: 'shoes-bags', catLabel: 'Shoes & Bags', dryClean: 325, steamIron: null },
    { id: 'sb5', name: 'Boots', category: 'shoes-bags', catLabel: 'Shoes & Bags', dryClean: 399, steamIron: null },
    { id: 'sb6', name: 'Sneakers (Non-Leather)', category: 'shoes-bags', catLabel: 'Shoes & Bags', dryClean: 349, steamIron: null },
    { id: 'sb7', name: 'Handbag', category: 'shoes-bags', catLabel: 'Shoes & Bags', dryClean: 249, steamIron: null },
    { id: 'sb8', name: 'Canvas / Jute / Cloth Bag', category: 'shoes-bags', catLabel: 'Shoes & Bags', dryClean: 199, steamIron: null },
    { id: 'sb9', name: 'Leather Hand Bag', category: 'shoes-bags', catLabel: 'Shoes & Bags', dryClean: 375, steamIron: null },
    { id: 'sb10', name: 'Suitcase', category: 'shoes-bags', catLabel: 'Shoes & Bags', dryClean: 499, steamIron: null },
    { id: 'sb11', name: 'Wallet', category: 'shoes-bags', catLabel: 'Shoes & Bags', dryClean: 149, steamIron: null },

    // Household
    { id: 'hh1', name: 'Bath Mat', category: 'household', catLabel: 'Household', dryClean: 59, steamIron: null },
    { id: 'hh2', name: 'Carpet (Per Sq Ft / Piece)', category: 'household', catLabel: 'Household', dryClean: 25, steamIron: null },
    { id: 'hh3', name: 'Robe', category: 'household', catLabel: 'Household', dryClean: 179, steamIron: null },
    { id: 'hh4', name: 'Hand Towel', category: 'household', catLabel: 'Household', dryClean: 59, steamIron: null },
    { id: 'hh5', name: 'Bath Towel', category: 'household', catLabel: 'Household', dryClean: 119, steamIron: null },
    { id: 'hh6', name: 'Bed Sheet (Single / Double)', category: 'household', catLabel: 'Household', dryClean: 99, steamIron: 29 },
    { id: 'hh7', name: 'Cushion Cover', category: 'household', catLabel: 'Household', dryClean: 69, steamIron: 19 },
    { id: 'hh8', name: 'Pillow Cover', category: 'household', catLabel: 'Household', dryClean: 59, steamIron: null },
    { id: 'hh9', name: 'Blanket (Single / Double)', category: 'household', catLabel: 'Household', dryClean: 299, steamIron: null },
    { id: 'hh10', name: 'Quilt / Rajai (Single / Double)', category: 'household', catLabel: 'Household', dryClean: 399, steamIron: null },
    { id: 'hh11', name: 'Blanket / Quilt Cover', category: 'household', catLabel: 'Household', dryClean: 179, steamIron: null },
    { id: 'hh12', name: 'Soft Toy', category: 'household', catLabel: 'Household', dryClean: 119, steamIron: null },
    { id: 'hh13', name: 'Curtain / Panel', category: 'household', catLabel: 'Household', dryClean: 119, steamIron: null },
    { id: 'hh14', name: 'Teddy Large', category: 'household', catLabel: 'Household', dryClean: 499, steamIron: null },

    // Per KG Plans
    { id: 'kg1', name: 'Wash + Steam Iron (Per KG)', category: 'laundry-kg', catLabel: 'Per KG Laundry', dryClean: 129, steamIron: 129 },
    { id: 'kg2', name: 'Wash + Fold (Per KG)', category: 'laundry-kg', catLabel: 'Per KG Laundry', dryClean: 89, steamIron: null },
    { id: 'kg3', name: 'Only Steam Iron (Per KG above 2kg)', category: 'laundry-kg', catLabel: 'Per KG Laundry', dryClean: null, steamIron: 90 },
    { id: 'kg4', name: 'Regular Family Plan (Wash+Iron/Kg)', category: 'laundry-kg', catLabel: 'Family Plan', dryClean: 120, steamIron: 120 },
    { id: 'kg5', name: 'Regular Family Plan (Wash+Fold/Kg)', category: 'laundry-kg', catLabel: 'Family Plan', dryClean: 85, steamIron: null }
  ];

  let currentCategory = 'mens';
  let searchQuery = '';

  const catalogTbody = document.getElementById('catalog-tbody');
  const catalogSearch = document.getElementById('catalog-search');
  const clearSearchBtn = document.getElementById('clear-search');
  const tabButtons = document.querySelectorAll('.tab-btn');

  // Render Table Items
  function renderCatalog() {
    if (!catalogTbody) return;

    const filtered = catalogData.filter(item => {
      const matchCat = (currentCategory === 'all' || item.category === currentCategory);
      const matchSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.catLabel.toLowerCase().includes(searchQuery.toLowerCase());
      
      return searchQuery !== '' ? matchSearch : matchCat;
    });

    if (filtered.length === 0) {
      catalogTbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center; padding: 30px; color: var(--text-muted);">
            <i class="fa-solid fa-magnifying-glass" style="font-size:1.5rem; margin-bottom:8px; display:block;"></i>
            No garments found matching "<strong>${escapeHtml(searchQuery)}</strong>".
          </td>
        </tr>
      `;
      return;
    }

    catalogTbody.innerHTML = filtered.map(item => {
      const dryText = item.dryClean ? `₹${item.dryClean}+` : '—';
      const ironText = item.steamIron ? `₹${item.steamIron}+` : '—';
      const primaryRate = item.dryClean || item.steamIron || 0;

      return `
        <tr>
          <td><span class="garment-name">${escapeHtml(item.name)}</span></td>
          <td><span class="badge-category">${escapeHtml(item.catLabel)}</span></td>
          <td><strong class="price-tag ${item.dryClean ? 'highlight' : ''}">${dryText}</strong></td>
          <td><strong class="price-tag">${ironText}</strong></td>
          <td>
            <button class="add-item-btn" onclick="window.addToEstimate('${item.id}', '${item.dryClean ? 'Dry Clean' : 'Steam Iron'}')">
              <i class="fa-solid fa-plus"></i> Add
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Category Tab Click Handler
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      searchQuery = '';
      if (catalogSearch) catalogSearch.value = '';
      if (clearSearchBtn) clearSearchBtn.classList.remove('active');
      renderCatalog();
    });
  });

  // Search Input Handler
  if (catalogSearch) {
    catalogSearch.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      if (searchQuery.length > 0) {
        clearSearchBtn.classList.add('active');
      } else {
        clearSearchBtn.classList.remove('active');
      }
      renderCatalog();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      catalogSearch.value = '';
      searchQuery = '';
      clearSearchBtn.classList.remove('active');
      renderCatalog();
    });
  }

  // Initial render
  renderCatalog();


  // ==================== 6. ESTIMATE BASKET & CALCULATOR ====================
  const basket = [];
  const calcItemsList = document.getElementById('calc-items-list');
  const emptyBagMsg = document.getElementById('empty-bag-msg');
  const calcSummary = document.getElementById('calc-summary');
  const calcSubtotal = document.getElementById('calc-subtotal');
  const calcDiscount = document.getElementById('calc-discount');
  const calcGrandTotal = document.getElementById('calc-grand-total');
  const clearBagBtn = document.getElementById('calc-clear-btn');
  const sendCalcWhatsAppBtn = document.getElementById('send-calc-whatsapp');

  window.addToEstimate = function(itemId, serviceType) {
    const item = catalogData.find(i => i.id === itemId);
    if (!item) return;

    const rate = serviceType === 'Steam Iron' && item.steamIron ? item.steamIron : (item.dryClean || item.steamIron || 0);
    const existingIndex = basket.findIndex(b => b.id === itemId && b.serviceType === serviceType);

    if (existingIndex > -1) {
      basket[existingIndex].qty += 1;
    } else {
      basket.push({
        id: item.id,
        name: item.name,
        serviceType: serviceType,
        rate: rate,
        qty: 1
      });
    }

    renderBasket();

    // Scroll slightly to notify or show toast
    const calcSec = document.getElementById('calculator');
    if (calcSec) {
      // Gentle vibration if supported
      if (navigator.vibrate) navigator.vibrate(50);
    }
  };

  window.changeQty = function(index, delta) {
    if (basket[index]) {
      basket[index].qty += delta;
      if (basket[index].qty <= 0) {
        basket.splice(index, 1);
      }
      renderBasket();
    }
  };

  function renderBasket() {
    if (basket.length === 0) {
      if (emptyBagMsg) emptyBagMsg.style.display = 'block';
      if (calcSummary) calcSummary.style.display = 'none';
      if (calcItemsList) {
        calcItemsList.innerHTML = `
          <div class="empty-bag-msg" id="empty-bag-msg">
            <i class="fa-solid fa-basket-shopping"></i>
            <p>Your estimate bag is currently empty. Tap <strong>"+ Add"</strong> next to any garment in the price table above!</p>
          </div>
        `;
      }
      return;
    }

    if (emptyBagMsg) emptyBagMsg.style.display = 'none';
    if (calcSummary) calcSummary.style.display = 'block';

    let subtotal = 0;

    const itemsHtml = basket.map((item, idx) => {
      const itemTotal = item.rate * item.qty;
      subtotal += itemTotal;

      return `
        <div class="calc-item-row">
          <div class="calc-item-info">
            <span class="calc-item-name">${escapeHtml(item.name)}</span>
            <span class="calc-item-service">${escapeHtml(item.serviceType)} @ ₹${item.rate}</span>
          </div>
          <div class="calc-item-controls">
            <button class="qty-btn" onclick="window.changeQty(${idx}, -1)">−</button>
            <strong>${item.qty}</strong>
            <button class="qty-btn" onclick="window.changeQty(${idx}, 1)">+</button>
            <span style="min-width: 60px; text-align: right; font-weight:700; color:var(--primary);">₹${itemTotal}</span>
          </div>
        </div>
      `;
    }).join('');

    calcItemsList.innerHTML = itemsHtml;

    // 10% First Order Discount
    const discount = Math.round(subtotal * 0.10);
    const grandTotal = subtotal - discount;

    calcSubtotal.textContent = `₹${subtotal}`;
    calcDiscount.textContent = `-₹${discount}`;
    calcGrandTotal.textContent = `₹${grandTotal}`;
  }

  if (clearBagBtn) {
    clearBagBtn.addEventListener('click', () => {
      basket.length = 0;
      renderBasket();
    });
  }

  // Send Basket to WhatsApp
  if (sendCalcWhatsAppBtn) {
    sendCalcWhatsAppBtn.addEventListener('click', () => {
      if (basket.length === 0) return;

      let subtotal = 0;
      let itemListText = '';

      basket.forEach((b, i) => {
        const lineTotal = b.rate * b.qty;
        subtotal += lineTotal;
        itemListText += `${i + 1}. *${b.name}* (${b.serviceType}) x ${b.qty} = ₹${lineTotal}\n`;
      });

      const discount = Math.round(subtotal * 0.10);
      const grandTotal = subtotal - discount;

      const message = `🧺 *New Estimate Booking - CleanARK Dry Cleaners*\n` +
        `-----------------------------------------\n` +
        `*Items Selected:*\n${itemListText}` +
        `-----------------------------------------\n` +
        `💰 *Subtotal:* ₹${subtotal}\n` +
        `🎉 *First Order Discount (10% OFF):* -₹${discount}\n` +
        `🚚 *Doorstep Pickup & Delivery:* FREE\n` +
        `💵 *Estimated Total:* ₹${grandTotal}\n` +
        `-----------------------------------------\n` +
        `📍 *Location:* Gaur World Smartstreet / Greater Noida West\n` +
        `Please schedule my free doorstep pickup!`;

      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/918796702244?text=${encoded}`, '_blank');
    });
  }


  // ==================== 7. ONLINE PICKUP BOOKING FORM ====================
  const pickupForm = document.getElementById('pickup-form');
  if (pickupForm) {
    // Set default pickup date to today
    const dateInput = document.getElementById('pickup-date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.value = today;
      dateInput.min = today;
    }

    pickupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('user-name').value.trim();
      const phone = document.getElementById('user-phone').value.trim();
      const address = document.getElementById('user-address').value.trim();
      const service = document.getElementById('service-type').value;
      const date = document.getElementById('pickup-date').value;
      const slot = document.getElementById('pickup-slot').value;
      const notes = document.getElementById('pickup-notes').value.trim();

      if (!name || !phone || !address || !service || !date) {
        alert('Please fill in all required fields.');
        return;
      }

      const waMessage = 
        `🧺 *New Doorstep Pickup Request - CleanARK Dry Cleaners*\n` +
        `-----------------------------------------\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        `🏠 *Address:* ${address}\n` +
        `✨ *Service Required:* ${service}\n` +
        `📅 *Pickup Date:* ${date}\n` +
        `⏰ *Preferred Slot:* ${slot}\n` +
        (notes ? `📝 *Special Notes:* ${notes}\n` : '') +
        `-----------------------------------------\n` +
        `🎁 *Claim Offer:* 10% First Order Discount + FREE Pickup & Delivery\n` +
        `Please confirm our pickup slot!`;

      const encodedMsg = encodeURIComponent(waMessage);
      window.open(`https://wa.me/918796702244?text=${encodedMsg}`, '_blank');
    });
  }


  // ==================== 8. FAQ ACCORDION ====================
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const isOpen = q.classList.contains('active');

      // Close other accordions
      faqQuestions.forEach(otherQ => {
        otherQ.classList.remove('active');
        if (otherQ.nextElementSibling) {
          otherQ.nextElementSibling.style.maxHeight = null;
        }
      });

      if (!isOpen) {
        q.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });


  // ==================== 9. SCROLL REVEAL & STATS COUNTER ====================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const counters = document.querySelectorAll('.counter');
  let countersStarted = false;

  function runCounters() {
    if (countersStarted) return;
    countersStarted = true;

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1800;
      const step = Math.ceil(target / (duration / 25));
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = current;
        }
      }, 25);
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');

          if (entry.target.querySelector('.counter') || entry.target.classList.contains('stat-box')) {
            runCounters();
          }

          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is unavailable
    revealElements.forEach(el => el.classList.add('revealed'));
    runCounters();
  }

  // Update footer year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Utility function
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
