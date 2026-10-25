(() => {
  const CFG = window.SITE_CONFIG || {};
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") n.className = v; else if (k === "text") n.textContent = v; else n.setAttribute(k, v);
    }
    kids.forEach(k => n.append(k));
    return n;
  };
  const IS_ADMIN = new URLSearchParams(location.search).has("admin");

  /* ---------------- Destination data ---------------- */
  const DESTS = [
    { slug: "sikkim", name: "Sikkim", region: "Himalaya", theme: "snow", c: ["#1b4965", "#62b6cb", "#fff"],
      short: "Monasteries, glacial lakes and Kanchenjunga views.",
      desc: "Tiny in size, huge in scenery. From the lively streets of Gangtok to the high-altitude lakes and valleys of the north, Sikkim mixes Buddhist culture with big mountain views.",
      best: "Mar–Jun, Oct–Dec", days: "5–7 days",
      highlights: ["Gangtok & MG Marg", "Tsomgo (Changu) Lake", "Nathula Pass (permit needed)", "Lachung & Yumthang Valley", "Pelling & Rabdentse ruins"] },
    { slug: "darjeeling", name: "Darjeeling", region: "Himalaya", theme: "tea", c: ["#2d6a4f", "#95d5b2", "#fff3d6"],
      short: "Tea gardens, toy train and sunrise at Tiger Hill.",
      desc: "The Queen of the Hills. Ride the heritage toy train, walk through misty tea estates and watch sunrise light up the Kanchenjunga range.",
      best: "Mar–May, Sep–Nov", days: "3–4 days",
      highlights: ["Tiger Hill sunrise", "Darjeeling Himalayan Railway", "Batasia Loop", "Happy Valley Tea Estate", "Peace Pagoda"] },
    { slug: "kalimpong", name: "Kalimpong", region: "Himalaya", theme: "hills", c: ["#5a189a", "#c77dff", "#ffe8d6"],
      short: "Quiet hill town of flowers, monasteries and viewpoints.",
      desc: "A calmer alternative to bigger hill stations. Kalimpong is known for its nurseries, colonial-era houses, monasteries and easy day trips to Lava and Rishop.",
      best: "Mar–May, Sep–Nov", days: "2–3 days",
      highlights: ["Deolo Hill", "Zong Dog Palri Fo-Brang Monastery", "Flower nurseries", "Lava & Rishop", "Teesta river viewpoints"] },
    { slug: "dooars", name: "Dooars", region: "Jungle & Foothills", theme: "forest", c: ["#1b4332", "#74c69d", "#f6e7b4"],
      short: "Jungle safaris, rivers and tea belts at the foothills.",
      desc: "Green plains between the Himalaya and the Brahmaputra. Go on jeep safaris, spot wildlife, bird-watch and stay beside rivers and tea gardens.",
      best: "Oct–Apr", days: "2–3 days",
      highlights: ["Jaldapara National Park", "Gorumara National Park", "Chapramari Wildlife Sanctuary", "Samsing & Suntalekhola", "Murti river"] },
    { slug: "kashmir", name: "Kashmir", region: "Himalaya", theme: "lake", c: ["#0b3c5d", "#8ecae6", "#ffd6a5"],
      short: "Dal Lake, Mughal gardens and snow-capped valleys.",
      desc: "Houseboats on Dal Lake, tulip and Mughal gardens, meadows of Gulmarg and the green valley of Pahalgam — a classic that never gets old.",
      best: "Apr–Oct (snow: Dec–Feb)", days: "6–8 days",
      highlights: ["Dal Lake shikara ride", "Gulmarg gondola", "Pahalgam & Betaab Valley", "Sonamarg", "Mughal Gardens"] },
    { slug: "goa", name: "Goa", region: "Beach", theme: "beach", c: ["#fb8500", "#ffb703", "#219ebc"],
      short: "Beaches, Portuguese heritage, cafés and nightlife.",
      desc: "Sun, sea and slow evenings. North Goa for energy and nightlife, South Goa for quiet beaches, plus churches, forts and seafood in between.",
      best: "Nov–Feb", days: "4–5 days",
      highlights: ["Baga & Calangute", "Palolem & Agonda (South)", "Old Goa churches", "Fort Aguada", "Dudhsagar Falls"] },
    { slug: "andaman", name: "Andaman", region: "Islands", theme: "island", c: ["#006d77", "#83c5be", "#edf6f9"],
      short: "Crystal water, coral reefs and white-sand islands.",
      desc: "Turquoise water and white beaches across Port Blair, Havelock (Swaraj Dweep) and Neil Island. Great for snorkelling, scuba and sunsets.",
      best: "Oct–May", days: "5–7 days",
      highlights: ["Radhanagar Beach", "Cellular Jail light & sound show", "Elephant Beach snorkelling", "Neil Island", "Scuba diving"] },
    { slug: "northeast", name: "Northeast", region: "Seven Sisters", theme: "valley", c: ["#264653", "#2a9d8f", "#e9c46a"],
      short: "Meghalaya, Assam, Arunachal and more — India's hidden gem.",
      desc: "Living root bridges, the cleanest village in Asia, rhino country in Kaziranga and misty monasteries — the Northeast rewards curious travellers.",
      best: "Oct–Apr (varies by state)", days: "6–10 days",
      highlights: ["Shillong & Cherrapunji", "Dawki & Mawlynnong", "Kaziranga National Park", "Tawang Monastery", "Majuli island"] }
  ];

  /* ---------------- Logo (uses assets/logo.png, falls back to built-in SVG) ---------------- */
  const FALLBACK_LOGO = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The OPENS Journey logo">
    <defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0e7c7b"/><stop offset="1" stop-color="#0b2e3a"/></linearGradient></defs>
    <circle cx="50" cy="50" r="48" fill="url(#lg)" stroke="#f08a24" stroke-width="3"/>
    <circle cx="68" cy="32" r="8" fill="#ffd9a0"/>
    <path d="M12 72 34 40l12 16 10-14 32 30z" fill="#fff" opacity=".95"/>
    <path d="M12 72 34 40l8 11-6 5z" fill="#cfe9ea"/>
    <path d="M10 78q20-10 40 0t40 0" fill="none" stroke="#f08a24" stroke-width="3" stroke-linecap="round"/>
  </svg>`;
  document.querySelectorAll("[data-logo]").forEach(slot => {
    slot.innerHTML = FALLBACK_LOGO.replace('id="lg"', 'id="lg' + Math.random().toString(36).slice(2, 6) + '"');
    const img = new Image();
    img.alt = "The OPENS Journey logo";
    img.onload = () => { slot.textContent = ""; slot.append(img); };
    img.src = CFG.logoPath || "assets/logo.png";
  });

  /* ---------------- Generated artwork (fallback when no photo) ---------------- */
  function art(d) {
    const [a, b, c] = d.c; const id = "g" + d.slug;
    const sky = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="400" height="300" fill="url(#${id})"/><circle cx="305" cy="70" r="26" fill="${c}" opacity=".9"/>`;
    const mt = (col, o = 1) => `<path d="M0 300V190l60-70 50 50 70-100 80 110 60-60 80 90v90z" fill="${col}" opacity="${o}"/>`;
    const scenes = {
      snow: mt("#ffffff", .5) + `<path d="M0 300V220l70-70 60 60 80-90 90 100 100-50v130z" fill="#0b2e3a" opacity=".85"/><path d="M210 120l-22 26 14-6 8 10 10-10 14 6z" fill="#fff"/>`,
      tea: mt("#1b4332", .6) + [0, 1, 2, 3, 4].map(i => `<path d="M0 ${215 + i * 18}q100-24 200 0t200 0V300H0z" fill="#${["40916c", "2d6a4f", "52b788", "2d6a4f", "1b4332"][i]}"/>`).join(""),
      hills: mt("#3c096c", .55) + `<path d="M0 300V230q90-70 190-10t210-30v110z" fill="#7b2cbf"/><path d="M0 300V260q120-50 220 0t180-20v60z" fill="#240046"/>`,
      forest: [0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path d="M${i * 55 - 10} 300l28-120 28 120z" fill="#${["081c15", "1b4332", "2d6a4f"][i % 3]}"/>`).join("") + `<rect y="270" width="400" height="30" fill="#081c15"/><ellipse cx="200" cy="200" rx="30" ry="14" fill="#f4a261" opacity=".0"/>`,
      lake: mt("#ffffff", .4) + `<rect y="205" width="400" height="95" fill="#023e8a" opacity=".85"/><path d="M80 238h240M110 255h180" stroke="#caf0f8" stroke-width="3" stroke-linecap="round" opacity=".6"/><path d="M160 224l40-8 40 8-12 12h-56z" fill="#e63946"/>`,
      beach: `<path d="M0 205q100-20 200 0t200 0V300H0z" fill="#219ebc"/><path d="M0 250q100-25 200 0t200 0V300H0z" fill="#f4e285"/><path d="M290 250V150" stroke="#5e3b1c" stroke-width="6"/><path d="M290 150q-40-10-60 14M290 150q40-10 60 14M290 150q-10-34-40-36M290 150q14-34 44-34" stroke="#2d6a4f" stroke-width="7" fill="none" stroke-linecap="round"/>`,
      island: `<rect y="190" width="400" height="110" fill="#00b4d8"/><path d="M0 230q100-16 200 0t200 0V300H0z" fill="#0096c7" opacity=".7"/><path d="M90 215q70-70 150 0z" fill="#2d6a4f"/><path d="M60 218h220" stroke="#f1e3b5" stroke-width="10" stroke-linecap="round"/><path d="M280 232q40-30 80 0z" fill="#40916c"/>`,
      valley: mt("#264653", .5) + `<path d="M0 300V215q80-50 160-10t240-30v125z" fill="#2a9d8f"/><path d="M0 300V255q130-40 230 0t170-15v60z" fill="#1d3b3a"/>`
    };
    return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${sky}${scenes[d.theme] || ""}</svg>`;
  }

  /* ---------------- Photos: saved admin upload > assets/places/<slug>.jpg > generated art ---------------- */
  const photoKey = s => "oj_photo_" + s;
  function getPhoto(slug) { try { return localStorage.getItem(photoKey(slug)); } catch { return null; } }
  function picNode(d) {
    const box = el("div", { class: "pic-inner" });
    box.style.cssText = "position:relative;width:100%;height:100%";
    const bg = el("div"); bg.style.cssText = "position:absolute;inset:0"; bg.innerHTML = art(d);
    bg.firstChild.style.cssText = "width:100%;height:100%";
    box.append(bg);
    const img = new Image();
    img.alt = d.name + " — travel photo"; img.loading = "lazy";
    img.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover";
    img.onload = () => box.append(img);
    img.src = getPhoto(d.slug) || `assets/places/${d.slug}.jpg`;
    return box;
  }
  function resizeToDataURL(file, max = 1200) {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onerror = rej;
      r.onload = () => {
        const i = new Image();
        i.onerror = rej;
        i.onload = () => {
          const k = Math.min(1, max / Math.max(i.width, i.height));
          const c = document.createElement("canvas"); c.width = i.width * k; c.height = i.height * k;
          c.getContext("2d").drawImage(i, 0, 0, c.width, c.height);
          res(c.toDataURL("image/jpeg", .82));
        };
        i.src = r.result;
      };
      r.readAsDataURL(file);
    });
  }

  /* ---------------- Reviews store (localStorage, or Supabase if configured) ---------------- */
  const SB = CFG.supabase && CFG.supabase.url && CFG.supabase.anonKey ? CFG.supabase : null;
  const sbHeaders = () => ({ apikey: SB.anonKey, Authorization: "Bearer " + SB.anonKey, "Content-Type": "application/json" });
  const store = {
    async all() {
      if (SB) {
        try {
          const r = await fetch(`${SB.url}/rest/v1/reviews?select=destination,name,rating,comment,created_at&order=created_at.desc&limit=1000`, { headers: sbHeaders() });
          if (r.ok) return await r.json();
        } catch { /* fall through */ }
        return [];
      }
      try { return JSON.parse(localStorage.getItem("oj_reviews") || "[]"); } catch { return []; }
    },
    async add(rv) {
      if (SB) {
        const r = await fetch(`${SB.url}/rest/v1/reviews`, { method: "POST", headers: { ...sbHeaders(), Prefer: "return=minimal" }, body: JSON.stringify(rv) });
        if (!r.ok) throw new Error("save failed");
        return;
      }
      const list = await this.all();
      list.unshift({ ...rv, created_at: new Date().toISOString() });
      localStorage.setItem("oj_reviews", JSON.stringify(list.slice(0, 500)));
    }
  };
  let REVIEWS = [];
  const forDest = s => REVIEWS.filter(r => r.destination === s);
  const avg = s => { const l = forDest(s); return l.length ? l.reduce((a, r) => a + r.rating, 0) / l.length : 0; };
  const starStr = n => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));

  /* ---------------- Catalog ---------------- */
  const grid = $("#grid"), filters = $("#filters");
  let activeFilter = "All";
  function renderFilters() {
    filters.textContent = "";
    ["All", ...new Set(DESTS.map(d => d.region))].forEach(r => {
      const b = el("button", { class: "chip-btn" + (r === activeFilter ? " on" : ""), type: "button", text: r });
      b.onclick = () => { activeFilter = r; renderFilters(); renderGrid(); };
      filters.append(b);
    });
  }
  function renderGrid() {
    grid.textContent = "";
    DESTS.filter(d => activeFilter === "All" || d.region === activeFilter).forEach(d => {
      const pic = el("div", { class: "pic" }, picNode(d), el("span", { class: "tag", text: d.region }));
      const n = forDest(d.slug).length;
      const meta = el("div", { class: "meta" },
        el("span", { class: n ? "stars" : "norev", text: n ? starStr(avg(d.slug)) + " " + avg(d.slug).toFixed(1) + " (" + n + ")" : "No reviews yet" }),
        el("span", { class: "more", text: "View details →" }));
      const card = el("button", { class: "card dest", type: "button", "aria-label": "Open " + d.name },
        pic, el("div", { class: "info" }, el("h3", { text: d.name }), el("p", { text: d.short }), meta));
      card.onclick = () => openModal(d);
      grid.append(card);
    });
  }

  /* ---------------- Modal ---------------- */
  const modal = $("#modal");
  let current = null, rating = 0;
  function renderReviews() {
    const box = $("#mReviews"); box.textContent = "";
    const list = forDest(current.slug);
    $("#mRating").textContent = list.length ? `${starStr(avg(current.slug))}  ${avg(current.slug).toFixed(1)} · ${list.length} review${list.length > 1 ? "s" : ""}` : "No reviews yet — be the first!";
    list.forEach(r => {
      const when = r.created_at ? new Date(r.created_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "";
      box.append(el("div", { class: "review" },
        el("div", {}, el("b", { text: r.name }), el("span", { class: "stars", text: starStr(r.rating) }), el("small", { text: "  " + when })),
        el("p", { text: r.comment })));
    });
  }
  function openModal(d) {
    current = d; rating = 0; paintStars();
    $("#mHero").textContent = ""; $("#mHero").append(picNode(d));
    $("#mTitle").textContent = d.name;
    $("#mDesc").textContent = d.desc;
    const chips = $("#mChips"); chips.textContent = "";
    [["📅 Best time: " + d.best], ["⏱ Suggested: " + d.days], ["📍 " + d.region]].forEach(([t]) => chips.append(el("span", { text: t })));
    const hl = $("#mHigh"); hl.textContent = "";
    d.highlights.forEach(h => hl.append(el("li", { text: h })));
    $("#mPlan").onclick = e => { e.preventDefault(); closeModal(); $("#enqDest").value = d.name; location.hash = "#contact"; };
    $("#reviewForm").reset(); $("#reviewNote").textContent = "";
    renderReviews();
    modal.hidden = false; document.body.style.overflow = "hidden";
    $("#mClose").focus();
  }
  function closeModal() { modal.hidden = true; document.body.style.overflow = ""; }
  $("#mClose").onclick = closeModal;
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  // star input
  const starsBox = $("#starsInput");
  for (let i = 1; i <= 5; i++) {
    const b = el("button", { type: "button", role: "radio", "aria-label": i + " star" + (i > 1 ? "s" : ""), text: "★" });
    b.onclick = () => { rating = i; paintStars(); };
    starsBox.append(b);
  }
  function paintStars() { [...starsBox.children].forEach((b, i) => b.classList.toggle("on", i < rating)); }

  $("#reviewForm").addEventListener("submit", async e => {
    e.preventDefault();
    const note = $("#reviewNote");
    if (!rating) { note.textContent = "Please choose a star rating."; return; }
    const f = new FormData(e.target);
    const rv = { destination: current.slug, name: String(f.get("name")).trim().slice(0, 40), rating, comment: String(f.get("comment")).trim().slice(0, 500) };
    if (!rv.name || !rv.comment) return;
    const now = Date.now(), last = Number(localStorage.getItem("oj_last") || 0);
    if (now - last < 15000) { note.textContent = "Please wait a few seconds before posting again."; return; }
    try {
      await store.add(rv);
      localStorage.setItem("oj_last", String(now));
      REVIEWS = await store.all();
      e.target.reset(); rating = 0; paintStars();
      note.textContent = SB ? "Thanks! Your review is live." : "Thanks! Saved in this browser (see README to make reviews public for everyone).";
      renderReviews(); renderGrid();
    } catch { note.textContent = "Could not save the review. Please try again."; }
  });

  // admin photo upload (open the site with ?admin)
  if (IS_ADMIN) {
    document.querySelectorAll(".admin-only").forEach(n => n.hidden = false);
    $("#mUpload").addEventListener("change", async e => {
      const file = e.target.files[0]; if (!file) return;
      try {
        localStorage.setItem(photoKey(current.slug), await resizeToDataURL(file));
        $("#mHero").textContent = ""; $("#mHero").append(picNode(current)); renderGrid();
      } catch { alert("Could not save this photo (too large for browser storage). Put it in assets/places/" + current.slug + ".jpg instead."); }
      e.target.value = "";
    });
  }

  /* ---------------- Contact ---------------- */
  const enqDest = $("#enqDest");
  DESTS.forEach(d => enqDest.append(el("option", { value: d.name, text: d.name })));
  enqDest.append(el("option", { value: "Not sure yet", text: "Not sure yet" }));
  const list = $("#contactList");
  const addItem = (label, href, text) => list.append(el("li", {}, label + " ", el("a", { href, target: href.startsWith("http") ? "_blank" : "_self", rel: "noopener", text })));
  if (CFG.phone) addItem("📞", "tel:" + CFG.phone.replace(/\s/g, ""), CFG.phone);
  if (CFG.email) addItem("✉️", "mailto:" + CFG.email, CFG.email);
  if (CFG.address) list.append(el("li", { text: "📍 " + CFG.address }));
  if (CFG.facebookUrl) addItem("📘", CFG.facebookUrl, "Follow us on Facebook");
  const wa = (CFG.whatsapp || "").replace(/\D/g, "");
  $("#enqNote").textContent = wa ? "" : "WhatsApp number not set yet — your enquiry will open on Facebook instead.";
  $("#enquiry").addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const msg = `Hello The OPENS Journey! I'm ${f.get("name")}. I'm interested in ${f.get("dest")}. ${f.get("details") || ""}`.trim();
    if (wa) window.open(`https://wa.me/${wa}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    else window.open(CFG.facebookUrl, "_blank", "noopener");
  });

  /* ---------------- Nav ---------------- */
  const nav = $("#nav"), burger = $("#burger"), links = $("#links");
  const onScroll = () => nav.classList.toggle("solid", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  burger.onclick = () => { const o = links.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };
  links.addEventListener("click", e => { if (e.target.closest("a")) { links.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); } });
  $("#year").textContent = new Date().getFullYear();

  /* ---------------- Init ---------------- */
  renderFilters(); renderGrid();
  store.all().then(r => { REVIEWS = r; renderGrid(); });
})();
