const overviewItems = [
  "Bespoke interior concepts",
  "Luxury accessories curation",
  "Residential & boutique commercial designs",
  "Smart styling with timeless finishes",
];

const services = [
  {
    title: "Full Home Interiors",
    description: "Complete interior design services from space planning to custom furniture, lighting, and finishes.",
    image: "images/full-home.jpg",
    alt: "Luxury living room interior with layered textures",
  },
  {
    title: "Accessory Styling",
    description: "Curated décor, textiles, and art direction that elevate living spaces with personality and balance.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
    alt: "Styled table with curated interior accessories",
  },
  {
    title: "Project Consulting",
    description: "Expert guidance for renovations, room refreshes, and luxury home launches.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80",
    alt: "Designer reviewing interior plans with client",
  },
  {
    title: "Bespoke Furnishings",
    description: "Tailor-made pieces designed to fit your lifestyle, layout, and decorative vision.",
    image: "images/bespoke-furnishings.jpg",
    alt: "Custom furniture in a stylish modern interior",
  },
];

const portfolioItems = [
  {
    label: "Cozy Apartment",
    title: "Modern Victorian retreat",
    description: "A warm, layered living space with brass touches, textured fabrics, and elegant neutrality.",
    image: "images/cozy-apartment.jpg",
    alt: "Victorian-inspired living space with elegant neutrals",
    tags: ["residential"],
  },
  {
    label: "Boutique Office",
    title: "Creative workplace with character",
    description: "Thoughtful zones for collaboration, display, and comfort in a refined brand environment.",
    image: "images/boutique-office.jpg",
    alt: "Boutique office interior with modern furnishings",
    tags: ["commercial"],
  },
  {
    label: "Luxury Suite",
    title: "Hotel-inspired bedroom sanctuary",
    description: "Soft palettes, sculptural lighting, and rich materials for a relaxing personal haven.",
    image: "images/luxury-suite.jpg",
    alt: "Luxury bedroom suite with soft ambient lighting",
    tags: ["hospitality"],
  },
];

const accessories = [
  {
    name: "Artisan Candle Set",
    detail: "Hand-poured scents in minimal glass vessels for atmosphere and gift-ready styling.",
  },
  {
    name: "Marble Tray Duo",
    detail: "Natural stone trays designed to anchor entryways, bathrooms, and dining tables.",
  },
  {
    name: "Textured Throw Pillow",
    detail: "Layer soft neutrals with tactile linens and boucle for depth in every room.",
  },
  {
    name: "Brass Accent Mirror",
    detail: "A statement finishing piece that reflects light and elevates room composition.",
  },
];

function renderList(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = items.map((text) => `<li>${text}</li>`).join("");
}

function renderCards(containerId, cards) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = cards
    .map(
      (card) => `
      <article class="card">
        <div class="card-image">
          <img src="${card.image}" alt="${card.alt}" />
        </div>
        <div class="card-copy">
          <h3>${card.title}</h3>
          <p>${card.description}</p>
        </div>
      </article>
    `
    )
    .join("");
}

function renderPortfolio(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = items
    .map(
      (item) => `
      <article class="portfolio-card fade-in" data-tags="${(item.tags || []).join(',')}">
        <div class="portfolio-image">
          <img src="${item.image}" alt="${item.alt}" />
          <div class="card-overlay">
            <div>
              <span class="item-label">${item.label}</span>
              <h3>${item.title}</h3>
            </div>
            <div class="quick-actions">
              <button class="view-btn" data-label="${item.label}">View</button>
              <button class="like-btn" aria-label="Like">❤</button>
            </div>
          </div>
        </div>
        <div class="portfolio-copy">
          <p>${item.description}</p>
        </div>
      </article>
    `
    )
    .join("");
}

function renderAccessories(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = items
    .map(
      (item) => `
      <article class="accessory-card">
        <span class="badge">Accessory</span>
        <h3>${item.name}</h3>
        <p>${item.detail}</p>
      </article>
    `
    )
    .join("");
}

// --- Forms validation ---
function setupForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('contact-feedback');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearFieldErrors(f) {
    Array.from(f.querySelectorAll('.input-error')).forEach(el => el.classList.remove('input-error'));
    Array.from(f.querySelectorAll('.field-error')).forEach(el => el.remove());
  }

  function addFieldError(input, msg) {
    input.classList.add('input-error');
    const err = document.createElement('div');
    err.className = 'field-error';
    err.textContent = msg;
    input.parentNode.insertBefore(err, input.nextSibling);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearFieldErrors(form);
    feedback.textContent = '';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    let hasError = false;
    if (!name) { addFieldError(form.name, 'Please enter your name.'); hasError = true; }
    if (!email) { addFieldError(form.email, 'Please enter your email.'); hasError = true; }
    else if (!validateEmail(email)) { addFieldError(form.email, 'Please enter a valid email address.'); hasError = true; }

    if (hasError) { feedback.textContent = 'Please fix the highlighted fields.'; return; }

    feedback.textContent = 'Sending...';
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    const formData = new FormData(form);
    fetch(form.action, { method: form.method, body: formData })
      .then(response => {
        if (response.ok) {
          feedback.textContent = `Thanks, ${name}! Your message has been sent.`;
          form.reset();
        } else {
          feedback.textContent = 'Error sending message. Please try again.';
        }
      })
      .catch(() => { feedback.textContent = 'Error sending message. Please try again.'; })
      .finally(() => { if (submitBtn) submitBtn.disabled = false; });
  });

  form.addEventListener('input', (e) => {
    const target = e.target;
    if (target.classList && target.classList.contains('input-error')) {
      target.classList.remove('input-error');
      const next = target.nextSibling;
      if (next && next.classList && next.classList.contains('field-error')) next.remove();
    }
  });
}

function setupConsultationForm() {
  const form = document.getElementById('consultation-form');
  const feedback = document.getElementById('consultation-feedback');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function validatePhone(phone) {
    return phone === '' || /^\+?[0-9\s\-()]{7,}$/.test(phone);
  }

  function clearFieldErrors(f) {
    Array.from(f.querySelectorAll('.input-error')).forEach(el => el.classList.remove('input-error'));
    Array.from(f.querySelectorAll('.field-error')).forEach(el => el.remove());
  }
  function addFieldError(input, msg) {
    input.classList.add('input-error');
    const err = document.createElement('div');
    err.className = 'field-error';
    err.textContent = msg;
    input.parentNode.insertBefore(err, input.nextSibling);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearFieldErrors(form);
    feedback.textContent = '';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const date = form.date.value;
    const service = form.service.value;

    let hasError = false;
    if (!name) { addFieldError(form.name, 'Please enter your name.'); hasError = true; }
    if (!email) { addFieldError(form.email, 'Please enter your email.'); hasError = true; }
    else if (!validateEmail(email)) { addFieldError(form.email, 'Please enter a valid email.'); hasError = true; }
    if (!date) { addFieldError(form.date, 'Please select a preferred date.'); hasError = true; }
    if (!service) { addFieldError(form.service, 'Please select a service.'); hasError = true; }
    if (!validatePhone(phone)) { addFieldError(form.phone, 'Please enter a valid phone number or leave blank.'); hasError = true; }

    if (hasError) { feedback.textContent = 'Please fix the highlighted fields.'; return; }

    feedback.textContent = 'Sending...';
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    const formData = new FormData(form);
    fetch(form.action, { method: form.method, body: formData })
      .then(response => {
        if (response.ok) {
          feedback.textContent = `Thank you, ${name}! Your consultation request has been sent. We'll contact you soon.`;
          form.reset();
        } else {
          feedback.textContent = 'Error sending request. Please try again.';
        }
      })
      .catch(() => { feedback.textContent = 'Error sending request. Please try again.'; })
      .finally(() => { if (submitBtn) submitBtn.disabled = false; });
  });

  form.addEventListener('input', (e) => {
    const target = e.target;
    if (target.classList && target.classList.contains('input-error')) {
      target.classList.remove('input-error');
      const next = target.nextSibling;
      if (next && next.classList && next.classList.contains('field-error')) next.remove();
    }
  });
}

// Portfolio filters & modal
function setupPortfolioFilters() {
  const filters = document.getElementById('portfolio-filters');
  if (!filters) return;
  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    Array.from(filters.querySelectorAll('button')).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    filterPortfolio(filter);
  });
}

function filterPortfolio(filter) {
  const cards = document.querySelectorAll('.portfolio-card');
  cards.forEach(card => {
    const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];
    if (filter === 'all' || tags.includes(filter)) {
      card.style.display = '';
      card.classList.add('fade-in');
    } else {
      card.style.display = 'none';
    }
  });
}

function setupPortfolioInteraction() {
  const grid = document.getElementById('portfolio-grid');
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  const backdrop = document.getElementById('modal-backdrop');

  function openModal(item) {
    modal.setAttribute('aria-hidden', 'false');
    modalBody.innerHTML = `
      <img src="${item.image}" alt="${item.alt}" />
      <div class="modal-details">
        <h3 id="modal-title">${item.title}</h3>
        <p>${item.description}</p>
        <p><strong>Category:</strong> ${(item.tags || []).join(', ')}</p>
      </div>
    `;
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modalBody.innerHTML = '';
  }

  grid.addEventListener('click', (e) => {
    const view = e.target.closest('.view-btn');
    const card = e.target.closest('.portfolio-card');
    if (view && card) {
      const label = view.dataset.label;
      const item = portfolioItems.find(i => i.label === label);
      if (item) openModal(item);
    } else if (card && !e.target.closest('button')) {
      const label = card.querySelector('.item-label')?.textContent;
      const item = portfolioItems.find(i => i.label === label);
      if (item) openModal(item);
    }
  });

  modalClose.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

// Admin uploader removed

function init() {
  renderList('overview-list', overviewItems);
  renderCards('services-grid', services);
  renderPortfolio('portfolio-grid', portfolioItems);
  renderAccessories('accessory-grid', accessories);
  setupForm();
  setupConsultationForm();

  // portfolio interactions
  setupPortfolioFilters();
  setupPortfolioInteraction();

  // Admin uploader removed

  const bookBtn = document.getElementById('book-btn');
  if (bookBtn) bookBtn.addEventListener('click', () => {
    const el = document.getElementById('book-consultation');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
}

window.addEventListener('DOMContentLoaded', init);
