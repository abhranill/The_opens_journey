(() => {
  "use strict";

  const CFG = window.SITE_CONFIG || {};
  const $ = (selector, root = document) => root.querySelector(selector);

  const el = (tag, attrs = {}, ...children) => {
    const node = document.createElement(tag);

    for (const [key, value] of Object.entries(attrs)) {
      if (key === "class") {
        node.className = value;
      } else if (key === "text") {
        node.textContent = value;
      } else {
        node.setAttribute(key, value);
      }
    }

    children.forEach(child => node.append(child));
    return node;
  };

  const IS_ADMIN = new URLSearchParams(location.search).has("admin");

  /* =========================================================
     DESTINATION DATA
  ========================================================= */

  const DESTS = [
    {
      slug: "sikkim",
      name: "Sikkim",
      region: "Himalaya",
      theme: "snow",
      c: ["#1b4965", "#62b6cb", "#fff"],
      short: "Monasteries, glacial lakes and Kanchenjunga views.",
      desc: "Tiny in size, huge in scenery. From the lively streets of Gangtok to the high-altitude lakes and valleys of the north, Sikkim mixes Buddhist culture with big mountain views.",
      best: "Mar–Jun, Oct–Dec",
      days: "5–7 days",
      highlights: [
        "Gangtok & MG Marg",
        "Tsomgo (Changu) Lake",
        "Nathula Pass (permit needed)",
        "Lachung & Yumthang Valley",
        "Pelling & Rabdentse ruins"
      ]
    },
    {
      slug: "darjeeling",
      name: "Darjeeling",
      region: "Himalaya",
      theme: "tea",
      c: ["#2d6a4f", "#95d5b2", "#fff3d6"],
      short: "Tea gardens, toy train and sunrise at Tiger Hill.",
      desc: "The Queen of the Hills. Ride the heritage toy train, walk through misty tea estates and watch sunrise light up the Kanchenjunga range.",
      best: "Mar–May, Sep–Nov",
      days: "3–4 days",
      highlights: [
        "Tiger Hill sunrise",
        "Darjeeling Himalayan Railway",
        "Batasia Loop",
        "Happy Valley Tea Estate",
        "Peace Pagoda"
      ]
    },
    {
      slug: "kalimpong",
      name: "Kalimpong",
      region: "Himalaya",
      theme: "hills",
      c: ["#5a189a", "#c77dff", "#ffe8d6"],
      short: "Quiet hill town of flowers, monasteries and viewpoints.",
      desc: "A calmer alternative to bigger hill stations. Kalimpong is known for its nurseries, colonial-era houses, monasteries and easy day trips to Lava and Rishop.",
      best: "Mar–May, Sep–Nov",
      days: "2–3 days",
      highlights: [
        "Deolo Hill",
        "Zong Dog Palri Fo-Brang Monastery",
        "Flower nurseries",
        "Lava & Rishop",
        "Teesta river viewpoints"
      ]
    },
    {
      slug: "dooars",
      name: "Dooars",
      region: "Jungle & Foothills",
      theme: "forest",
      c: ["#1b4332", "#74c69d", "#f6e7b4"],
      short: "Jungle safaris, rivers and tea belts at the foothills.",
      desc: "Green plains between the Himalaya and the Brahmaputra. Go on jeep safaris, spot wildlife, bird-watch and stay beside rivers and tea gardens.",
      best: "Oct–Apr",
      days: "2–3 days",
      highlights: [
        "Jaldapara National Park",
        "Gorumara National Park",
        "Chapramari Wildlife Sanctuary",
        "Samsing & Suntalekhola",
        "Murti river"
      ]
    },
    {
      slug: "kashmir",
      name: "Kashmir",
      region: "Himalaya",
      theme: "lake",
      c: ["#0b3c5d", "#8ecae6", "#ffd6a5"],
      short: "Dal Lake, Mughal gardens and snow-capped valleys.",
      desc: "Houseboats on Dal Lake, tulip and Mughal gardens, meadows of Gulmarg and the green valley of Pahalgam — a classic that never gets old.",
      best: "Apr–Oct (snow: Dec–Feb)",
      days: "6–8 days",
      highlights: [
        "Dal Lake shikara ride",
        "Gulmarg gondola",
        "Pahalgam & Betaab Valley",
        "Sonamarg",
        "Mughal Gardens"
      ]
    },
    {
      slug: "goa",
      name: "Goa",
      region: "Beach",
      theme: "beach",
      c: ["#fb8500", "#ffb703", "#219ebc"],
      short: "Beaches, Portuguese heritage, cafés and nightlife.",
      desc: "Sun, sea and slow evenings. North Goa for energy and nightlife, South Goa for quiet beaches, plus churches, forts and seafood in between.",
      best: "Nov–Feb",
      days: "4–5 days",
      highlights: [
        "Baga & Calangute",
        "Palolem & Agonda (South)",
        "Old Goa churches",
        "Fort Aguada",
        "Dudhsagar Falls"
      ]
    },
    {
      slug: "andaman",
      name: "Andaman",
      region: "Islands",
      theme: "island",
      c: ["#006d77", "#83c5be", "#edf6f9"],
      short: "Crystal water, coral reefs and white-sand islands.",
      desc: "Turquoise water and white beaches across Port Blair, Havelock (Swaraj Dweep) and Neil Island. Great for snorkelling, scuba and sunsets.",
      best: "Oct–May",
      days: "5–7 days",
      highlights: [
        "Radhanagar Beach",
        "Cellular Jail light & sound show",
        "Elephant Beach snorkelling",
        "Neil Island",
        "Scuba diving"
      ]
    },
    {
      slug: "northeast",
      name: "Northeast",
      region: "Seven Sisters",
      theme: "valley",
      c: ["#264653", "#2a9d8f", "#e9c46a"],
      short: "Meghalaya, Assam, Arunachal and more — India's hidden gem.",
      desc: "Living root bridges, the cleanest village in Asia, rhino country in Kaziranga and misty monasteries — the Northeast rewards curious travellers.",
      best: "Oct–Apr (varies by state)",
      days: "6–10 days",
      highlights: [
        "Shillong & Cherrapunji",
        "Dawki & Mawlynnong",
        "Kaziranga National Park",
        "Tawang Monastery",
        "Majuli island"
      ]
    }
  ];

  /* =========================================================
     LOGO
  ========================================================= */

  const FALLBACK_LOGO = `
    <svg viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="The OPENS Journey logo">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0e7c7b"/>
          <stop offset="1" stop-color="#0b2e3a"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48"
        fill="url(#lg)" stroke="#f08a24" stroke-width="3"/>
      <circle cx="68" cy="32" r="8" fill="#ffd9a0"/>
      <path d="M12 72 34 40l12 16 10-14 32 30z"
        fill="#fff" opacity=".95"/>
      <path d="M12 72 34 40l8 11-6 5z" fill="#cfe9ea"/>
      <path d="M10 78q20-10 40 0t40 0"
        fill="none" stroke="#f08a24"
        stroke-width="3" stroke-linecap="round"/>
    </svg>
  `;

  document.querySelectorAll("[data-logo]").forEach(slot => {
    const uniqueId = "lg" + Math.random().toString(36).slice(2, 8);

    slot.innerHTML = FALLBACK_LOGO.replace('id="lg"', `id="${uniqueId}"`);

    const img = new Image();
    img.alt = "The OPENS Journey logo";

    img.onload = () => {
      slot.textContent = "";
      slot.append(img);
    };

    img.onerror = () => {
      // Keep the built-in SVG logo if the image file is unavailable.
    };

    img.src = CFG.logoPath || "assets/logo.png";
  });

  /* =========================================================
     GENERATED DESTINATION ARTWORK
  ========================================================= */

  function art(destination) {
    const [a, b, c] = destination.c;
    const id = "g" + destination.slug;

    const sky = `
      <defs>
        <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${a}"/>
          <stop offset="1" stop-color="${b}"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#${id})"/>
      <circle cx="305" cy="70" r="26" fill="${c}" opacity=".9"/>
    `;

    const mountain = (colour, opacity = 1) => `
      <path d="M0 300V190l60-70 50 50 70-100
        80 110 60-60 80 90v90z"
        fill="${colour}" opacity="${opacity}"/>
    `;

    const scenes = {
      snow:
        mountain("#ffffff", 0.5) +
        `<path d="M0 300V220l70-70 60 60 80-90
          90 100 100-50v130z"
          fill="#0b2e3a" opacity=".85"/>
         <path d="M210 120l-22 26 14-6 8 10
          10-10 14 6z" fill="#fff"/>`,

      tea:
        mountain("#1b4332", 0.6) +
        [0, 1, 2, 3, 4].map(i => `
          <path d="M0 ${215 + i * 18}q100-24 200 0
            t200 0V300H0z"
            fill="#${["40916c", "2d6a4f", "52b788", "2d6a4f", "1b4332"][i]}"/>
        `).join(""),

      hills:
        mountain("#3c096c", 0.55) +
        `<path d="M0 300V230q90-70 190-10t210-30v110z"
          fill="#7b2cbf"/>
         <path d="M0 300V260q120-50 220 0t180-20v60z"
          fill="#240046"/>`,

      forest:
        [0, 1, 2, 3, 4, 5, 6, 7].map(i => `
          <path d="M${i * 55 - 10} 300l28-120 28 120z"
            fill="#${["081c15", "1b4332", "2d6a4f"][i % 3]}"/>
        `).join("") +
        `<rect y="270" width="400" height="30" fill="#081c15"/>`,

      lake:
        mountain("#ffffff", 0.4) +
        `<rect y="205" width="400" height="95"
          fill="#023e8a" opacity=".85"/>
         <path d="M80 238h240M110 255h180"
          stroke="#caf0f8" stroke-width="3"
          stroke-linecap="round" opacity=".6"/>
         <path d="M160 224l40-8 40 8-12 12h-56z"
          fill="#e63946"/>`,

      beach:
        `<path d="M0 205q100-20 200 0t200 0V300H0z"
          fill="#219ebc"/>
         <path d="M0 250q100-25 200 0t200 0V300H0z"
          fill="#f4e285"/>
         <path d="M290 250V150"
          stroke="#5e3b1c" stroke-width="6"/>
         <path d="M290 150q-40-10-60 14
          M290 150q40-10 60 14
          M290 150q-10-34-40-36
          M290 150q14-34 44-34"
          stroke="#2d6a4f" stroke-width="7"
          fill="none" stroke-linecap="round"/>`,

      island:
        `<rect y="190" width="400" height="110" fill="#00b4d8"/>
         <path d="M0 230q100-16 200 0t200 0V300H0z"
          fill="#0096c7" opacity=".7"/>
         <path d="M90 215q70-70 150 0z" fill="#2d6a4f"/>
         <path d="M60 218h220" stroke="#f1e3b5"
          stroke-width="10" stroke-linecap="round"/>
         <path d="M280 232q40-30 80 0z" fill="#40916c"/>`,

      valley:
        mountain("#264653", 0.5) +
        `<path d="M0 300V215q80-50 160-10t240-30v125z"
          fill="#2a9d8f"/>
         <path d="M0 300V255q130-40 230 0t170-15v60z"
          fill="#1d3b3a"/>`
    };

    return `
      <svg viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true">
        ${sky}
        ${scenes[destination.theme] || ""}
      </svg>
    `;
  }

  /* =========================================================
     DESTINATION PHOTOS AND ADMIN IMAGE UPLOADS
  ========================================================= */

  const photoKey = slug => "oj_photo_" + slug;

  function getPhoto(slug) {
    try {
      return localStorage.getItem(photoKey(slug));
    } catch {
      return null;
    }
  }

  function picNode(destination) {
    const box = el("div", { class: "pic-inner" });

    box.style.cssText = "position:relative;width:100%;height:100%";

    const background = el("div");
    background.style.cssText = "position:absolute;inset:0";
    background.innerHTML = art(destination);

    if (background.firstElementChild) {
      background.firstElementChild.style.cssText = "width:100%;height:100%";
    }

    box.append(background);

    const img = new Image();
    img.alt = destination.name + " — travel photo";
    img.loading = "lazy";
    img.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;object-fit:cover";

    img.onload = () => box.append(img);

    img.onerror = () => {
      // Generated artwork remains visible if the photo does not exist.
    };

    img.src =
      getPhoto(destination.slug) ||
      `assets/places/${destination.slug}.jpg`;

    return box;
  }

  function resizeToDataURL(file, max = 1200) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onerror = reject;

      reader.onload = () => {
        const image = new Image();

        image.onerror = reject;

        image.onload = () => {
          const scale = Math.min(
            1,
            max / Math.max(image.width, image.height)
          );

          const canvas = document.createElement("canvas");

          canvas.width = Math.round(image.width * scale);
          canvas.height = Math.round(image.height * scale);

          const context = canvas.getContext("2d");

          if (!context) {
            reject(new Error("Could not create image canvas."));
            return;
          }

          context.drawImage(
            image,
            0,
            0,
            canvas.width,
            canvas.height
          );

          resolve(canvas.toDataURL("image/jpeg", 0.82));
        };

        image.src = reader.result;
      };

      reader.readAsDataURL(file);
    });
  }

  /* =========================================================
     REVIEWS: LOCAL STORAGE OR SUPABASE
  ========================================================= */

  const SB =
    CFG.supabase &&
    CFG.supabase.url &&
    CFG.supabase.anonKey
      ? CFG.supabase
      : null;

  const sbHeaders = () => ({
    apikey: SB.anonKey,
    Authorization: "Bearer " + SB.anonKey,
    "Content-Type": "application/json"
  });

  const store = {
    async all() {
      if (SB) {
        try {
          const response = await fetch(
            `${SB.url}/rest/v1/reviews?select=destination,name,rating,comment,created_at&order=created_at.desc&limit=1000`,
            { headers: sbHeaders() }
          );

          if (response.ok) {
            return await response.json();
          }
        } catch {
          // Return an empty list if Supabase cannot be reached.
        }

        return [];
      }

      try {
        return JSON.parse(
          localStorage.getItem("oj_reviews") || "[]"
        );
      } catch {
        return [];
      }
    },

    async add(review) {
      if (SB) {
        const response = await fetch(
          `${SB.url}/rest/v1/reviews`,
          {
            method: "POST",
            headers: {
              ...sbHeaders(),
              Prefer: "return=minimal"
            },
            body: JSON.stringify(review)
          }
        );

        if (!response.ok) {
          throw new Error("Review save failed.");
        }

        return;
      }

      const reviews = await this.all();

      reviews.unshift({
        ...review,
        created_at: new Date().toISOString()
      });

      localStorage.setItem(
        "oj_reviews",
        JSON.stringify(reviews.slice(0, 500))
      );
    }
  };

  let REVIEWS = [];

  const forDest = slug =>
    REVIEWS.filter(review => review.destination === slug);

  const avg = slug => {
    const reviews = forDest(slug);

    return reviews.length
      ? reviews.reduce((sum, review) => sum + Number(review.rating), 0) /
          reviews.length
      : 0;
  };

  const starStr = rating =>
    "★".repeat(Math.round(rating)) +
    "☆".repeat(5 - Math.round(rating));

  /* =========================================================
     DESTINATIONS: SEARCH, FILTERS AND CARDS
  ========================================================= */

  const grid = $("#grid");
  const filters = $("#filters");
  const searchInput = $("#destinationSearch");
  const resultsCount = $("#resultsCount");

  let activeFilter = "All";
  let searchTerm = "";

  function matchingDestinations() {
    const query = searchTerm.trim().toLocaleLowerCase();

    return DESTS.filter(destination => {
      const matchesRegion =
        activeFilter === "All" ||
        destination.region === activeFilter;

      const searchableText = [
        destination.name,
        destination.region,
        destination.short,
        destination.desc,
        destination.best,
        destination.days,
        ...destination.highlights
      ]
        .join(" ")
        .toLocaleLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      return matchesRegion && matchesSearch;
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchTerm = searchInput.value;
      renderGrid();
    });
  }

  function renderFilters() {
    if (!filters) return;

    filters.textContent = "";

    const regions = [
      "All",
      ...new Set(DESTS.map(destination => destination.region))
    ];

    regions.forEach(region => {
      const button = el("button", {
        class: "chip-btn" + (
          region === activeFilter ? " on" : ""
        ),
        type: "button",
        text: region
      });

      button.setAttribute(
        "aria-pressed",
        String(region === activeFilter)
      );

      button.addEventListener("click", () => {
        activeFilter = region;
        renderFilters();
        renderGrid();
      });

      filters.append(button);
    });
  }

  function renderGrid() {
    if (!grid) return;

    grid.textContent = "";

    const matches = matchingDestinations();

    if (resultsCount) {
      const count = matches.length;
      const query = searchTerm.trim();

      resultsCount.textContent = query
        ? `${count} ${count === 1 ? "destination" : "destinations"} matching “${query}”`
        : `${count} ${count === 1 ? "destination" : "destinations"} to explore`;
    }

    matches.forEach(destination => {
      const picture = el(
        "div",
        { class: "pic" },
        picNode(destination),
        el("span", {
          class: "tag",
          text: destination.region
        })
      );

      const reviewCount = forDest(destination.slug).length;
      const averageRating = avg(destination.slug);

      const meta = el(
        "div",
        { class: "meta" },
        el("span", {
          class: reviewCount ? "stars" : "norev",
          text: reviewCount
            ? `${starStr(averageRating)} ${averageRating.toFixed(1)} (${reviewCount})`
            : "No reviews yet"
        }),
        el("span", {
          class: "more",
          text: "View details →"
        })
      );

      const card = el(
        "button",
        {
          class: "card dest",
          type: "button",
          "aria-label": "Open " + destination.name
        },
        picture,
        el(
          "div",
          { class: "info" },
          el("h3", { text: destination.name }),
          el("p", { text: destination.short }),
          meta
        )
      );

      card.addEventListener("click", () => openModal(destination));

      grid.append(card);
    });

    if (matches.length === 0) {
      const emptyState = el(
        "div",
        { class: "empty-results" },
        el("span", {
          class: "empty-icon",
          text: "⌕"
        }),
        el("h3", {
          text: "No journeys found just yet"
        }),
        el("p", {
          text: "Try another place or clear your search to see all destinations."
        })
      );

      const clearButton = el("button", {
        class: "clear-search",
        type: "button",
        text: "Clear search and filters"
      });

      clearButton.addEventListener("click", () => {
        activeFilter = "All";
        searchTerm = "";

        if (searchInput) {
          searchInput.value = "";
        }

        renderFilters();
        renderGrid();
      });

      emptyState.append(clearButton);
      grid.append(emptyState);
    }
  }

  /* =========================================================
     DESTINATION DETAILS MODAL
  ========================================================= */

  const modal = $("#modal");

  let current = null;
  let rating = 0;

  function renderReviews() {
    const box = $("#mReviews");

    if (!box || !current) return;

    box.textContent = "";

    const reviews = forDest(current.slug);
    const averageRating = avg(current.slug);

    $("#mRating").textContent = reviews.length
      ? `${starStr(averageRating)}  ${averageRating.toFixed(1)} · ${reviews.length} review${reviews.length > 1 ? "s" : ""}`
      : "No reviews yet — be the first!";

    reviews.forEach(review => {
      const date = review.created_at
        ? new Date(review.created_at).toLocaleDateString(
            undefined,
            {
              year: "numeric",
              month: "short",
              day: "numeric"
            }
          )
        : "";

      box.append(
        el(
          "div",
          { class: "review" },
          el(
            "div",
            {},
            el("b", { text: review.name }),
            el("span", {
              class: "stars",
              text: starStr(review.rating)
            }),
            el("small", { text: "  " + date })
          ),
          el("p", { text: review.comment })
        )
      );
    });
  }

  function openModal(destination) {
    current = destination;
    rating = 0;

    paintStars();

    $("#mHero").textContent = "";
    $("#mHero").append(picNode(destination));

    $("#mTitle").textContent = destination.name;
    $("#mDesc").textContent = destination.desc;

    const chips = $("#mChips");
    chips.textContent = "";

    [
      "📅 Best time: " + destination.best,
      "⏱ Suggested: " + destination.days,
      "📍 " + destination.region
    ].forEach(text => {
      chips.append(el("span", { text }));
    });

    const highlights = $("#mHigh");
    highlights.textContent = "";

    destination.highlights.forEach(highlight => {
      highlights.append(el("li", { text: highlight }));
    });

    $("#mPlan").onclick = event => {
      event.preventDefault();

      closeModal();

      const destinationSelect = $("#enqDest");

      if (destinationSelect) {
        destinationSelect.value = destination.name;
      }

      location.hash = "#contact";
    };

    $("#reviewForm").reset();
    $("#reviewNote").textContent = "";

    renderReviews();

    modal.hidden = false;
    document.body.style.overflow = "hidden";

    $("#mClose").focus();
  }

  function closeModal() {
    if (!modal) return;

    modal.hidden = true;
    document.body.style.overflow = "";
  }

  $("#mClose").addEventListener("click", closeModal);

  modal.addEventListener("click", event => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });

  /* =========================================================
     STAR RATING INPUT
  ========================================================= */

  const starsBox = $("#starsInput");

  for (let i = 1; i <= 5; i++) {
    const button = el("button", {
      type: "button",
      role: "radio",
      "aria-label": i + " star" + (i > 1 ? "s" : ""),
      "aria-checked": "false",
      text: "★"
    });

    button.addEventListener("click", () => {
      rating = i;
      paintStars();
    });

    starsBox.append(button);
  }

  function paintStars() {
    [...starsBox.children].forEach((button, index) => {
      const selected = index < rating;

      button.classList.toggle("on", selected);
      button.setAttribute("aria-checked", String(selected));
    });
  }

  /* =========================================================
     SUBMIT REVIEWS
  ========================================================= */

  $("#reviewForm").addEventListener("submit", async event => {
    event.preventDefault();

    const note = $("#reviewNote");

    if (!rating) {
      note.textContent = "Please choose a star rating.";
      return;
    }

    const formData = new FormData(event.target);

    const review = {
      destination: current.slug,
      name: String(formData.get("name") || "").trim().slice(0, 40),
      rating,
      comment: String(formData.get("comment") || "").trim().slice(0, 500)
    };

    if (!review.name || !review.comment) return;

    const now = Date.now();
    const lastReview = Number(
      localStorage.getItem("oj_last") || 0
    );

    if (now - lastReview < 15000) {
      note.textContent =
        "Please wait a few seconds before posting again.";
      return;
    }

    try {
      await store.add(review);

      localStorage.setItem("oj_last", String(now));

      REVIEWS = await store.all();

      event.target.reset();

      rating = 0;
      paintStars();

      note.textContent = SB
        ? "Thanks! Your review is live."
        : "Thanks! Saved in this browser (see README to make reviews public for everyone).";

      renderReviews();
      renderGrid();
    } catch (error) {
      console.error("Could not save review:", error);
      note.textContent =
        "Could not save the review. Please try again.";
    }
  });

  /* =========================================================
     ADMIN PHOTO UPLOAD
     Open the site with ?admin to enable the upload controls.
  ========================================================= */

  if (IS_ADMIN) {
    document.querySelectorAll(".admin-only").forEach(element => {
      element.hidden = false;
    });

    $("#mUpload").addEventListener("change", async event => {
      const file = event.target.files[0];

      if (!file || !current) return;

      try {
        const imageData = await resizeToDataURL(file);

        localStorage.setItem(
          photoKey(current.slug),
          imageData
        );

        $("#mHero").textContent = "";
        $("#mHero").append(picNode(current));

        renderGrid();
      } catch (error) {
        console.error("Photo upload failed:", error);

        alert(
          "Could not save this photo (too large for browser storage). Put it in assets/places/" +
          current.slug +
          ".jpg instead."
        );
      }

      event.target.value = "";
    });
  }

  /* =========================================================
     CONTACT DETAILS AND WHATSAPP ENQUIRY
  ========================================================= */

  const enqDest = $("#enqDest");

  DESTS.forEach(destination => {
    enqDest.append(
      el("option", {
        value: destination.name,
        text: destination.name
      })
    );
  });

  enqDest.append(
    el("option", {
      value: "Not sure yet",
      text: "Not sure yet"
    })
  );

  const contactList = $("#contactList");

  const addContactItem = (label, href, text) => {
    contactList.append(
      el(
        "li",
        {},
        label + " ",
        el("a", {
          href,
          target: href.startsWith("http") ? "_blank" : "_self",
          rel: "noopener",
          text
        })
      )
    );
  };

  if (CFG.phone) {
    addContactItem(
      "📞",
      "tel:" + CFG.phone.replace(/\s/g, ""),
      CFG.phone
    );
  }

  if (CFG.email) {
    addContactItem(
      "✉️",
      "mailto:" + CFG.email,
      CFG.email
    );
  }

  if (CFG.address) {
    contactList.append(
      el("li", { text: "📍 " + CFG.address })
    );
  }

  if (CFG.facebookUrl) {
    addContactItem(
      "📘",
      CFG.facebookUrl,
      "Follow us on Facebook"
    );
  }

  const wa = (CFG.whatsapp || "").replace(/\D/g, "");

  $("#enqNote").textContent = wa
    ? ""
    : "WhatsApp number not set yet — your enquiry will open on Facebook instead.";

  $("#enquiry").addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const name = String(formData.get("name") || "").trim();
    const destination = String(formData.get("dest") || "").trim();
    const details = String(formData.get("details") || "").trim();

   const message = (
  `Hello The OPENS Journey! I'm ${name}. ` +
  `I'm interested in ${destination}. ${details}`
).trim();
    if (wa) {
      window.open(
        `https://wa.me/${wa}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener"
      );
    } else if (CFG.facebookUrl) {
      window.open(CFG.facebookUrl, "_blank", "noopener");
    } else {
      $("#enqNote").textContent =
        "Please contact us directly to submit your enquiry.";
    }
  });

  /* =========================================================
     CURATED PACKAGE ENQUIRY BUTTONS
  ========================================================= */

  document.querySelectorAll(".package-enquire").forEach(button => {
    button.addEventListener("click", () => {
      const destination = button.dataset.dest;
      const packageName = button.dataset.package || "Custom journey";

      if (
        destination &&
        [...enqDest.options].some(option => option.value === destination)
      ) {
        enqDest.value = destination;
      }

      const detailsInput = $("#enquiry [name=details]");

      if (detailsInput) {
        detailsInput.value =
          `${packageName} — please share itinerary and pricing`;
      }

      location.hash = "#contact";

      setTimeout(() => {
        $("#enquiry [name=name]")?.focus({
          preventScroll: true
        });
      }, 350);
    });
  });

  /* =========================================================
     NAVIGATION AND MOBILE MENU
  ========================================================= */

  const nav = $("#nav");
  const burger = $("#burger");
  const links = $("#links");

  const onScroll = () => {
    nav.classList.toggle("solid", window.scrollY > 40);
  };

  window.addEventListener("scroll", onScroll, {
    passive: true
  });

  onScroll();

  burger.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");

    burger.setAttribute("aria-expanded", String(isOpen));
  });

  links.addEventListener("click", event => {
    if (event.target.closest("a")) {
      links.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  $("#year").textContent = new Date().getFullYear();

  /* =========================================================
     INITIALISE THE WEBSITE
  ========================================================= */

  renderFilters();
  renderGrid();

  store.all()
    .then(reviews => {
      REVIEWS = reviews;
      renderGrid();
    })
    .catch(error => {
      console.error("Could not load reviews:", error);
    });

})();