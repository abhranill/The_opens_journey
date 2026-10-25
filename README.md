# The OPENS Journey — website

Plain HTML + CSS + JavaScript. No build step. Open `index.html`, or upload the folder to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages).

## 1. Add the real logo
Save it as `assets/logo.png`. Until then a placeholder logo is shown.

## 2. Add destination photos (shown to everyone)
Put images in `assets/places/` named: `sikkim.jpg, darjeeling.jpg, kalimpong.jpg, dooars.jpg, kashmir.jpg, goa.jpg, andaman.jpg, northeast.jpg`.
Use photos you own or have permission to use. Without a photo, a drawn scene is shown.

Quick preview alternative: open `index.html?admin`, open a destination, click **Add photo**. This saves only in your own browser.

## 3. Contact details
Edit `config.js` (WhatsApp, phone, email, address).

## 4. Make reviews public for everyone
By default reviews are stored in the visitor's own browser. For truly public reviews, create a free Supabase project, run this in the SQL editor, and paste the URL + anon key into `config.js`:

```sql
create table reviews (
  id bigint generated always as identity primary key,
  destination text not null,
  name text not null check (char_length(name) <= 40),
  rating int not null check (rating between 1 and 5),
  comment text not null check (char_length(comment) <= 500),
  created_at timestamptz default now()
);
alter table reviews enable row level security;
create policy "anyone can read" on reviews for select using (true);
create policy "anyone can post" on reviews for insert with check (true);
```
