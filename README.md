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
 
