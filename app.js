document.addEventListener("DOMContentLoaded", () => {
  const destinationsGrid = document.getElementById("destinationsGrid");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");

  // Modal elements
  const modal = document.getElementById("modal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const mTitle = document.getElementById("mTitle");
  const mImg = document.getElementById("mImg");
  const mLoc = document.getElementById("mLoc");
  const mDesc = document.getElementById("mDesc");
  const mPrice = document.getElementById("mPrice");
  const mReviews = document.getElementById("mReviews");
  const reviewForm = document.getElementById("reviewForm");

  let currentActiveDestId = null;

  // 1. Render Destination Cards
  function renderDestinations(items) {
    destinationsGrid.innerHTML = "";

    if (items.length === 0) {
      destinationsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No destinations found matching your criteria.</p>`;
      return;
    }

    items.forEach((dest) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${dest.image}" alt="${dest.name}" class="card-img">
        <div class="card-body">
          <h3 class="card-title">${dest.name}</h3>
          <p class="card-location">📍 ${dest.location}</p>
          <p class="card-desc">${dest.description}</p>
          <div class="card-footer">
            <span class="price">${CONFIG.currency}${dest.price.toLocaleString("en-IN")}</span>
            <span class="rating">★ ${dest.rating}</span>
          </div>
        </div>
      `;
      card.addEventListener("click", () => openModal(dest.id));
      destinationsGrid.appendChild(card);
    });
  }

  // 2. Filter Handler
  function filterDestinations() {
    const query = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filtered = CONFIG.destinations.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query);
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    renderDestinations(filtered);
  }

  // 3. Open Modal
  function openModal(destId) {
    currentActiveDestId = destId;
    const item = CONFIG.destinations.find((d) => d.id === destId);
    if (!item) return;

    mTitle.textContent = item.name;
    mImg.src = item.image;
    mLoc.textContent = `📍 ${item.location}`;
    mDesc.textContent = item.description;
    mPrice.textContent = `Price: ${CONFIG.currency}${item.price.toLocaleString("en-IN")} / person`;

    renderReviews(item.reviews);
    modal.removeAttribute("hidden");
  }

  // 4. Close Modal
  function closeModal() {
    modal.setAttribute("hidden", "true");
    currentActiveDestId = null;
    reviewForm.reset();
  }

  // 5. Render Reviews Inside Modal
  function renderReviews(reviews) {
    mReviews.innerHTML = "";
    if (!reviews || reviews.length === 0) {
      mReviews.innerHTML = `<p style="color: var(--text-muted); font-size:0.9rem;">No reviews yet. Be the first to share your experience!</p>`;
      return;
    }

    reviews.forEach((r) => {
      const revEl = document.createElement("div");
      revEl.className = "review-item";
      revEl.innerHTML = `
        <div class="review-header">
          <span>${escapeHTML(r.name)}</span>
          <span style="color: #d97706;">${"★".repeat(r.rating)}</span>
        </div>
        <p style="font-size:0.9rem; color:#334155;">${escapeHTML(r.comment)}</p>
      `;
      mReviews.appendChild(revEl);
    });
  }

  // 6. Handle New Review Submission
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!currentActiveDestId) return;

    const name = document.getElementById("reviewerName").value;
    const rating = parseInt(document.getElementById("reviewerRating").value, 10);
    const comment = document.getElementById("reviewerComment").value;

    const dest = CONFIG.destinations.find((d) => d.id === currentActiveDestId);
    if (dest) {
      dest.reviews.push({ name, rating, comment });
      renderReviews(dest.reviews);
      reviewForm.reset();
    }
  });

  // Helper function to prevent XSS injection
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // Event Listeners
  searchInput.addEventListener("input", filterDestinations);
  categoryFilter.addEventListener("change", filterDestinations);
  closeModalBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Initial Render
  renderDestinations(CONFIG.destinations);
});