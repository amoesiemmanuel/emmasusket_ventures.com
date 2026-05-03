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
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
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
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1000&q=80",
    alt: "Custom furniture in a stylish modern interior",
  },
];

const portfolioItems = [
  {
    label: "Cozy Apartment",
    title: "Modern Victorian retreat",
    description: "A warm, layered living space with brass touches, textured fabrics, and elegant neutrality.",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1000&q=80",
    alt: "Victorian-inspired living space with elegant neutrals",
  },
  {
    label: "Boutique Office",
    title: "Creative workplace with character",
    description: "Thoughtful zones for collaboration, display, and comfort in a refined brand environment.",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=1000&q=80",
    alt: "Boutique office interior with modern furnishings",
  },
  {
    label: "Luxury Suite",
    title: "Hotel-inspired bedroom sanctuary",
    description: "Soft palettes, sculptural lighting, and rich materials for a relaxing personal haven.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
    alt: "Luxury bedroom suite with soft ambient lighting",
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
      <article class="portfolio-card">
        <div class="portfolio-image">
          <img src="${item.image}" alt="${item.alt}" />
        </div>
        <div class="portfolio-copy">
          <span class="item-label">${item.label}</span>
          <h3>${item.title}</h3>
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

function setupForm() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("contact-feedback");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email) {
      feedback.textContent = "Please provide your name and email.";
      return;
    }

    feedback.textContent = "Sending...";

    const formData = new FormData(form);
    fetch(form.action, {
      method: form.method,
      body: formData
    })
    .then(response => {
      if (response.ok) {
        feedback.textContent = `Thanks, ${name}! Your message has been sent.`;
        form.reset();
      } else {
        feedback.textContent = "Error sending message. Please try again.";
      }
    })
    .catch(error => {
      feedback.textContent = "Error sending message. Please try again.";
    });
  });
}

function setupConsultationForm() {
  const form = document.getElementById("consultation-form");
  const feedback = document.getElementById("consultation-feedback");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const date = form.date.value;
    const service = form.service.value;
    const message = form.message.value.trim();

    if (!name || !email || !date || !service) {
      feedback.textContent = "Please fill in all required fields.";
      return;
    }

    feedback.textContent = "Sending...";

    const formData = new FormData(form);
    fetch(form.action, {
      method: form.method,
      body: formData
    })
    .then(response => {
      if (response.ok) {
        feedback.textContent = `Thank you, ${name}! Your consultation request has been sent. We'll contact you soon.`;
        form.reset();
      } else {
        feedback.textContent = "Error sending request. Please try again.";
      }
    })
    .catch(error => {
      feedback.textContent = "Error sending request. Please try again.";
    });
  });
}

function init() {
  renderList("overview-list", overviewItems);
  renderCards("services-grid", services);
  renderPortfolio("portfolio-grid", portfolioItems);
  renderAccessories("accessory-grid", accessories);
  setupForm();
  setupConsultationForm();

  const bookBtn = document.getElementById("book-btn");
  bookBtn.addEventListener("click", () => {
    document.getElementById("book-consultation").scrollIntoView({ behavior: "smooth" });
  });
}

window.addEventListener("DOMContentLoaded", init);
