=====================================================================
 THE OPENS JOURNEY - TRAVEL AGENCY WEBSITE
 Complete README (setup, customization, hosting, reviews, troubleshooting)
=====================================================================

TABLE OF CONTENTS
  1.  What this project is
  2.  Features
  3.  Folder structure
  4.  Quick start (run it in 1 minute)
  5.  Step-by-step: make the site ready for the real business
        5.1  Add the real logo
        5.2  Add destination photos
        5.3  Set contact details (config.js)
        5.4  Edit destination text
        5.5  Change colors and fonts
  6.  How each part of the website works
        6.1  Navigation bar
        6.2  Front (hero) section
        6.3  Destination catalog and filters
        6.4  Destination detail window
        6.5  Reviews
        6.6  Enquiry form
  7.  Making reviews public for ALL visitors (Supabase setup)
  8.  Adding a new destination
  9.  Photos: the three ways, and which one wins
  10. Putting the website online (hosting)
        10.1 Netlify (easiest)
        10.2 GitHub Pages
        10.3 Vercel
        10.4 Cloudflare Pages
        10.5 Connecting a custom domain
  11. Responsive design notes
  12. Accessibility and performance notes
  13. Security and privacy notes
  14. Troubleshooting / FAQ
  15. Ideas for future upgrades
  16. Credits and legal notes


---------------------------------------------------------------------
1. WHAT THIS PROJECT IS
---------------------------------------------------------------------
A modern, professional, mobile-friendly website for "The OPENS Journey",
a travel agency that plans trips to:

    Sikkim | Darjeeling | Kalimpong | Dooars | Kashmir | Goa |
    Andaman | Northeast India

It is written with plain HTML, CSS and JavaScript. There is NO build
step, NO framework and NO installation required. You can open it by
double-clicking index.html, or upload the folder to any web host.

IMPORTANT NOTE ABOUT THE DATA
The Facebook page could not be read automatically (Facebook blocks
automated access). So the text, tagline and destination descriptions
were written from general travel knowledge. The real logo, phone
number, WhatsApp number, email, address and photos must be added by
the owner. Please have the owner review all descriptions for accuracy.


---------------------------------------------------------------------
2. FEATURES
---------------------------------------------------------------------
  - Front section with the logo and agency name, mountain-sunrise
    background, tagline and two call-to-action buttons
  - Sticky navigation bar that becomes solid white when scrolling
  - Hamburger menu on phones
  - Catalog of 8 destinations with filter buttons by region
  - Each destination card shows image, region tag, short description,
    and average star rating with review count
  - Click a card to open a detail window: description, best time to
    visit, suggested trip length, highlights, traveller reviews
  - Public review system with 1-5 star rating, name and comment
  - Optional shared online database for reviews (Supabase, free)
  - Enquiry form that opens WhatsApp with a pre-filled message
  - Built-in drawn artwork for each destination when no photo exists
  - Admin photo upload mode for quick previews
  - Fully responsive: phone, tablet, laptop, large desktop
  - Keyboard friendly (Escape closes windows, focus is managed)
  - Respects "reduce motion" system setting


---------------------------------------------------------------------
3. FOLDER STRUCTURE
---------------------------------------------------------------------
  opens-journey/
  |
  |-- index.html        The page structure (sections, modal, form)
  |-- styles.css        All design: colors, layout, animations
  |-- app.js            All behavior: catalog, reviews, form, menu
  |-- config.js         The ONLY file the owner needs to edit for
  |                     contact details, logo path, Supabase keys
  |-- README.txt        This guide
  |-- assets/
        |-- logo.png    (you add this) the real logo
        |-- places/     (you add photos here)
              sikkim.jpg
              darjeeling.jpg
              kalimpong.jpg
              dooars.jpg
              kashmir.jpg
              goa.jpg
              andaman.jpg
              northeast.jpg


---------------------------------------------------------------------
4. QUICK START
---------------------------------------------------------------------
  1. Unzip opens-journey.zip.
  2. Double-click index.html. It opens in your browser.
  3. Done. The site works immediately with placeholder logo and
     drawn artwork.

For editing, use any text editor (VS Code recommended). To see changes,
save the file and refresh the browser (Ctrl+R, or Ctrl+Shift+R for a
hard refresh).

Optional: run a local server so the browser behaves exactly like real
hosting:
      cd opens-journey
      python3 -m http.server 8000
  then open  http://localhost:8000


---------------------------------------------------------------------
5. STEP-BY-STEP: MAKE THE SITE READY FOR THE REAL BUSINESS
---------------------------------------------------------------------

5.1 ADD THE REAL LOGO
  - Get the logo image from the Facebook page (profile picture) or,
    better, ask your friend for the original file.
  - Rename it to:  logo.png
  - Put it in:     opens-journey/assets/logo.png
  - Square or round logos look best. Transparent PNG is ideal.
  - Recommended size: at least 400 x 400 pixels.
  - The logo appears in three places: top-left of the menu, large in
    the front section, and in the footer.
  - If the file is missing, a built-in placeholder logo is shown.
  - To use another file name or folder, change "logoPath" in
    config.js.

5.2 ADD DESTINATION PHOTOS
  - Put images inside assets/places/
  - Name them EXACTLY (lowercase, .jpg):
        sikkim.jpg      darjeeling.jpg    kalimpong.jpg
        dooars.jpg      kashmir.jpg       goa.jpg
        andaman.jpg     northeast.jpg
  - Recommended: landscape photos, around 1200 x 900 pixels, under
    300 KB each (compress with squoosh.app or tinypng.com) so the
    site loads fast on mobile data.
  - Use only photos the agency owns, took on its own trips, or has
    permission to use. Free options: unsplash.com, pexels.com,
    pixabay.com (check each license).
  - Want PNG or WEBP? Either rename to .jpg is NOT enough. Instead
    edit the line in app.js:
        img.src = getPhoto(d.slug) || `assets/places/${d.slug}.jpg`;
    and change ".jpg" to ".png" or ".webp".

5.3 SET CONTACT DETAILS (config.js)
  Open config.js. It looks like this:

      window.SITE_CONFIG = {
        logoPath: "assets/logo.png",
        facebookUrl: "https://www.facebook.com/people/The-OPENS-Journey/61591687175224/",
        whatsapp: "",
        phone: "",
        email: "",
        address: "Siliguri, West Bengal",
        supabase: { url: "", anonKey: "" }
      };

  Fill in:
    whatsapp : digits only, with country code, no + or spaces.
               Example for an Indian number 98765 43210:
                   whatsapp: "919876543210",
    phone    : any format, shown on the page.
               Example:  phone: "+91 98765 43210",
    email    : Example:  email: "hello@example.com",
    address  : change if the office is not in Siliguri. Delete the
               text between the quotes to hide it.

  WARNING: the address "Siliguri, West Bengal" is only a guess because
  the real location was not available. Please confirm with the owner.

  If whatsapp is left empty, the enquiry form button sends visitors
  to the Facebook page instead.

5.4 EDIT DESTINATION TEXT
  Open app.js. Near the top you will find the DESTS list. Each
  destination looks like:

      { slug: "sikkim", name: "Sikkim", region: "Himalaya",
        theme: "snow", c: ["#1b4965", "#62b6cb", "#fff"],
        short: "Monasteries, glacial lakes and Kanchenjunga views.",
        desc: "Tiny in size, huge in scenery...",
        best: "Mar-Jun, Oct-Dec", days: "5-7 days",
        highlights: ["Gangtok & MG Marg", "Tsomgo (Changu) Lake", ...] }

  Fields explained:
    slug       Short lowercase id. Used for the photo file name and
               for saving reviews. DO NOT change it after reviews
               exist, or old reviews will no longer match.
    name       Name shown on the card.
    region     Used by the filter buttons. Cards with the same region
               text are grouped together.
    theme      Which drawn artwork to use when there is no photo:
               snow, tea, hills, forest, lake, beach, island, valley
    c          Three colors for the drawn artwork (sky top, sky
               bottom, sun).
    short      One line shown on the card.
    desc       Paragraph shown in the detail window.
    best       Best time to visit.
    days       Suggested trip length.
    highlights List of bullet points in the detail window.

  Tip: have the owner replace "best", "days" and "highlights" with
  their real packages, prices and itineraries.

5.5 CHANGE COLORS AND FONTS
  Open styles.css. The first lines define the whole color scheme:

      :root{
        --ink:#10222b;      main text color
        --muted:#5d6f78;    grey secondary text
        --bg:#fbfaf6;       page background
        --alt:#f1efe6;      alternate section background
        --brand:#0e7c7b;    main teal color
        --brand-d:#0a5857;  dark teal
        --accent:#f08a24;   orange buttons and stars
        --line:#e4e1d6;     borders
      }

  Change a value and every place using it updates. To match the real
  logo, set --brand and --accent to the logo's main colors (use a
  color picker on the logo image to get the hex codes).

  Fonts are loaded from Google Fonts in index.html (Fraunces for
  headings, Inter for text). To change, edit the <link> line in
  index.html and the --serif and --sans values in styles.css.


---------------------------------------------------------------------
6. HOW EACH PART OF THE WEBSITE WORKS
---------------------------------------------------------------------

6.1 NAVIGATION BAR
  - Fixed at the top. Transparent over the front section, turns white
    with a shadow after scrolling 40 pixels.
  - On screens narrower than 820 px the links collapse into a
    hamburger button. Tapping a link closes the menu.

6.2 FRONT (HERO) SECTION
  - Shows the logo (large), the agency name, the tagline and two
    buttons. The background is a pure CSS/SVG mountain scene, so no
    big image needs downloading.
  - To change the tagline, edit the line with class="tagline" in
    index.html.
  - To use a real photo background instead, in styles.css find
    .hero-bg and replace its background with:
        background: url("assets/hero.jpg") center/cover no-repeat;
    and put hero.jpg in assets/. Keep the dark overlay in mind so
    white text stays readable.

6.3 DESTINATION CATALOG AND FILTERS
  - Cards are generated by JavaScript from the DESTS list.
  - Filter buttons (All, Himalaya, Beach, Islands, ...) are created
    automatically from the "region" values.
  - Each card shows the average rating and number of reviews, or
    "No reviews yet".

6.4 DESTINATION DETAIL WINDOW
  - Opens when a card is clicked. Closes with the X button, by
    clicking the dark area outside, or by pressing Escape.
  - "Plan this trip" closes the window, pre-selects that destination
    in the enquiry form and scrolls to it.

6.5 REVIEWS
  - Visitors choose 1-5 stars, enter a name (max 40 characters) and a
    comment (max 500 characters).
  - A 15-second delay between posts reduces spam from one browser.
  - Text is inserted safely (never as raw HTML), which prevents
    script injection through comments.
  - Storage mode:
      A) Default: saved in the visitor's own browser (localStorage).
         Only that visitor sees it. Good for testing.
      B) With Supabase set up (section 7): saved in an online
         database and visible to everyone. This is what the real
         site needs.

6.6 ENQUIRY FORM
  - Collects name, destination and dates/group size.
  - On submit it opens WhatsApp (wa.me link) with a ready message to
    the number in config.js. No server needed.
  - Without a WhatsApp number it opens the Facebook page.
  - Nothing is stored by the website itself.


---------------------------------------------------------------------
7. MAKING REVIEWS PUBLIC FOR ALL VISITORS (SUPABASE SETUP)
---------------------------------------------------------------------
Why: a static website cannot share data between visitors by itself.
Supabase is a free hosted database. About 10 minutes of setup.

STEP 1  Go to supabase.com, sign in, click "New project". Choose a
        name (for example opens-journey), a strong database password
        and the closest region (Mumbai/Singapore for India).

STEP 2  When the project is ready, open "SQL Editor" and run:

   create table reviews (
     id bigint generated always as identity primary key,
     destination text not null,
     name text not null check (char_length(name) <= 40),
     rating int not null check (rating between 1 and 5),
     comment text not null check (char_length(comment) <= 500),
     created_at timestamptz default now()
   );

   alter table reviews enable row level security;

   create policy "anyone can read" on reviews
     for select using (true);

   create policy "anyone can post" on reviews
     for insert with check (true);

STEP 3  Open Project Settings > API. Copy:
          - Project URL            (looks like https://abcd.supabase.co)
          - anon public key        (long text starting with eyJ...)

STEP 4  Paste them into config.js:

          supabase: {
            url: "https://abcd.supabase.co",
            anonKey: "eyJ...your key..."
          }

        The anon key is meant to be public. Safety comes from the
        row-level-security policies above (visitors can only read
        and add reviews; they cannot edit or delete).

STEP 5  Save, upload the site again, post a test review, and check
        that it appears in Supabase > Table Editor > reviews, and on
        another phone/browser.

MODERATION (removing bad reviews)
  - Open Supabase > Table Editor > reviews, select the row, delete it.
  - Only the owner (logged into Supabase) can delete.

STOPPING SPAM (optional, recommended once the site is popular)
  - Add a rating-limit or captcha through a Supabase Edge Function,
    or switch the policy so new reviews need approval:
        alter table reviews add column approved boolean default false;
    then change the read policy to:
        create policy "read approved" on reviews
          for select using (approved = true);
    (drop the old "anyone can read" policy first) and approve rows
    manually in the Table Editor.
    In that case, change the fetch URL in app.js to match.


---------------------------------------------------------------------
8. ADDING A NEW DESTINATION
---------------------------------------------------------------------
Example: add "Bhutan".

  1. In app.js, copy an existing block inside DESTS and paste it
     before the closing bracket. Change the values:

       { slug: "bhutan", name: "Bhutan", region: "International",
         theme: "valley", c: ["#7f1d1d", "#f59e0b", "#fff7ed"],
         short: "Dzongs, monasteries and peaceful mountain valleys.",
         desc: "Write 2-3 sentences here.",
         best: "Mar-May, Sep-Nov", days: "5-6 days",
         highlights: ["Thimphu", "Paro Taktsang", "Punakha Dzong"] },

  2. Add assets/places/bhutan.jpg (optional).
  3. Save and refresh. A new filter button "International" appears
     automatically.
  4. Also update the footer text in index.html if you want the new
     place listed there.


---------------------------------------------------------------------
9. PHOTOS: THE THREE WAYS, AND WHICH ONE WINS
---------------------------------------------------------------------
Priority order for each destination:

  1st  A photo saved with the admin "Add photo" button (only in
       THAT browser, for previewing)
  2nd  The file assets/places/<slug>.jpg (shown to EVERYONE)
  3rd  The built-in drawn artwork

ADMIN PREVIEW MODE
  - Open the site with ?admin at the end of the address, e.g.
        index.html?admin
        https://yoursite.com/?admin
  - Open any destination: an "Add photo" button appears.
  - The picture is resized to 1200 px and stored in your own browser
    only. Visitors will NOT see it.
  - To remove the preview photo: clear site data in the browser, or
    run in the browser console:
        localStorage.removeItem("oj_photo_sikkim")
  - For real visitors always use method 2 (files in assets/places).


---------------------------------------------------------------------
10. PUTTING THE WEBSITE ONLINE (HOSTING)
---------------------------------------------------------------------
All options below are free for a site like this.

10.1 NETLIFY (EASIEST - drag and drop)
  1. Go to app.netlify.com and sign up.
  2. Open "Sites" and drag the whole opens-journey FOLDER onto the
     page.
  3. You get an address like random-name.netlify.app within seconds.
  4. To update later: drag the updated folder again.

10.2 GITHUB PAGES
  1. Create a GitHub repository, upload all files (index.html must be
     at the top level).
  2. Settings > Pages > Source: "Deploy from a branch", branch "main",
     folder "/ (root)". Save.
  3. After a minute the site is at
        https://USERNAME.github.io/REPOSITORY/

10.3 VERCEL
  1. Sign in at vercel.com with GitHub.
  2. "Add New Project", import the repository.
  3. Framework preset: "Other". No build command, output directory
     left empty. Deploy.

10.4 CLOUDFLARE PAGES
  1. Cloudflare dashboard > Workers & Pages > Create > Pages.
  2. Upload assets (drag the folder) or connect GitHub. No build
     command.

10.5 CONNECTING A CUSTOM DOMAIN (example: theopensjourney.com)
  1. Buy a domain from a registrar (GoDaddy, Namecheap, Hostinger,
     Cloudflare Registrar; .in domains are cheap).
  2. In your host (Netlify/Vercel/etc.) open Domain settings > Add
     custom domain and follow the DNS instructions shown there
     (usually an A record or CNAME).
  3. HTTPS is enabled automatically and is free.
  4. Wait up to a few hours for DNS to update.


---------------------------------------------------------------------
11. RESPONSIVE DESIGN NOTES
---------------------------------------------------------------------
  - Layout uses CSS Grid and Flexbox. The catalog grid automatically
    changes between 1, 2, 3 or more columns based on screen width.
  - Main breakpoint: 820 px. Below it the menu becomes a hamburger,
    the contact section stacks vertically, and spacing shrinks.
  - Text sizes use clamp(), so headings scale smoothly.
  - Hero uses 100svh so it fits properly on phones with moving
    browser bars.
  - Tested widths: 390 px (phone) and 1366 px (laptop) with no
    horizontal scrolling.
  - To test yourself: browser > right-click > Inspect > device icon.


---------------------------------------------------------------------
12. ACCESSIBILITY AND PERFORMANCE NOTES
---------------------------------------------------------------------
  - Cards are real <button> elements, so keyboard users can Tab and
    press Enter.
  - The detail window uses role="dialog", closes with Escape, and
    moves focus to the close button when it opens.
  - Star-rating buttons have text labels for screen readers.
  - Animations are turned off for visitors who set "reduce motion".
  - Photos use lazy loading (loaded only when needed).
  - Total code size is small (about 15 KB zipped before photos).
  - Biggest speed factor is photo size: keep each under 300 KB.


---------------------------------------------------------------------
13. SECURITY AND PRIVACY NOTES
---------------------------------------------------------------------
  - Reviews and names are inserted as plain text, never as HTML.
  - The Supabase anon key in config.js is public by design. Never
    put the "service_role" key or database password in any file of
    this website.
  - Without Supabase, nothing leaves the visitor's browser.
  - The site sets no tracking cookies. Google Fonts is the only
    third-party request (it can be removed by self-hosting fonts).
  - If you collect names and reviews from real users, consider adding
    a short privacy note to the footer.
  - Do not publish other people's photos or copyrighted images
    without permission.


---------------------------------------------------------------------
14. TROUBLESHOOTING / FAQ
---------------------------------------------------------------------
Q: The logo shows the placeholder, not my logo.
A: Check that the file is exactly assets/logo.png (lowercase, correct
   folder). On hosting, file names are case-sensitive: Logo.PNG will
   NOT work.

Q: My destination photo does not show.
A: Name must match the slug, lowercase, .jpg, inside assets/places/.
   Hard refresh with Ctrl+Shift+R. Check the file is not corrupted.

Q: Reviews disappear or only I can see them.
A: That is the default (browser-only) mode. Set up Supabase
   (section 7).

Q: I set up Supabase but reviews do not save.
A: Open the browser console (F12) and look for errors.
   - Check url and anonKey have no extra spaces.
   - Make sure the SQL from section 7 was run fully, especially
     "enable row level security" and the two policies.
   - The destination, name, rating and comment column names must
     match exactly.

Q: The WhatsApp button does nothing.
A: Allow pop-ups for the site. Make sure whatsapp in config.js is
   digits only with country code (919876543210).

Q: Changes I made do not appear.
A: Save the file, then hard refresh (Ctrl+Shift+R). On a host,
   re-upload the changed files.

Q: Fonts look different offline.
A: Google Fonts need internet. Offline, the browser falls back to
   Georgia / system fonts, which is fine.

Q: Can I use this inside React or Next.js?
A: Yes, but it would need conversion. Ask for a Next.js version;
   the DESTS data, styles and review logic can be reused almost
   directly.

Q: Can I delete the "?admin" feature?
A: Yes. Delete the block starting "if (IS_ADMIN)" in app.js and the
   "Add photo" label in index.html. It is harmless to visitors:
   without ?admin the button stays hidden.


---------------------------------------------------------------------
15. IDEAS FOR FUTURE UPGRADES
---------------------------------------------------------------------
  - Real package pages with prices, day-by-day itineraries, inclusions
    and exclusions
  - Photo gallery per destination with swipe
  - Instagram / Facebook feed section
  - Customer photo uploads with reviews (Supabase Storage)
  - Review moderation panel and "verified traveller" badges
  - Online enquiry saved to a database and email alerts
  - Blog / travel guides for SEO (best time to visit Sikkim, etc.)
  - Google Maps embed and office location
  - Multi-language support (English / Bengali / Hindi)
  - Payment links (Razorpay) for booking advances
  - Google Analytics or privacy-friendly Plausible analytics
  - SEO: add Open Graph image, sitemap.xml, robots.txt, and
    structured data (TravelAgency schema)
  - Convert to Next.js + Supabase + Tailwind for a full admin
    dashboard


---------------------------------------------------------------------
16. CREDITS AND LEGAL NOTES
---------------------------------------------------------------------
  - Fonts: Fraunces and Inter via Google Fonts (open license).
  - Drawn destination artwork and placeholder logo are original
    generated graphics, free to use with this project.
  - Brand name, logo and Facebook page belong to their owner.
  - Destination descriptions are general information. Verify
    permits, entry rules (for example Sikkim protected-area permits
    or Nathula Pass rules), seasons and prices before publishing
    them as promises to customers.

  Thank you, and happy travels!
=====================================================================