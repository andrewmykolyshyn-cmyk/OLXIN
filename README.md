# OLXIN

OLXIN is a peer-to-peer classifieds marketplace for Spain. Users can browse and search ads by category, view ad details, contact sellers, publish their own ads (paying €1 per ad via Stripe), manage their ads, and rate sellers. An admin panel allows editing the site configuration.

## Tech Stack

- **Frontend**: React 18 + Vite 5, plain CSS (CSS variables for theming)
- **Routing**: react-router-dom v6
- **State**: React hooks + context (no Redux)
- **Backend**: Node 18 + Express 4 (Stripe PaymentIntents + webhook only)
- **Database / Auth / Storage**: Supabase (Postgres + Auth + Storage)
- **Payments**: Stripe (card + Google Pay + Apple Pay)
- **i18n**: Hand-rolled dictionary (5 languages: ES, EN, CA, UK, RU)

## Project Structure

```
olxin/
├── README.md
├── package.json
├── vite.config.js          # Dev proxy /api -> localhost:4242
├── index.html
├── .env.example
├── supabase/
│   ├── schema.sql          # Tables, RLS, views, RPCs
│   └── seed.sql            # Demo categories + listings + ratings
├── src/
│   ├── main.jsx            # Entry point with providers
│   ├── App.jsx             # Routes + layout + favorites
│   ├── styles.css          # Complete design system
│   ├── lib/
│   │   ├── supabase.js     # Supabase client init
│   │   ├── api.js          # All data access functions
│   │   └── format.js       # money(), timeAgo(), compressImage()
│   ├── i18n/
│   │   ├── i18n.jsx        # I18nProvider + useT() hook
│   │   └── strings.js      # All translations for 5 languages
│   ├── context/
│   │   ├── AuthContext.jsx # Auth state + admin detection
│   │   └── ThemeContext.jsx# Color theming from DB
│   ├── components/
│   │   ├── Header.jsx      # Sticky header with search
│   │   ├── CategoryStrip.jsx
│   │   ├── Footer.jsx
│   │   ├── ListingCard.jsx
│   │   ├── ListingGrid.jsx
│   │   ├── FilterBar.jsx
│   │   ├── StarRating.jsx
│   │   ├── PhotoUploader.jsx
│   │   ├── Modal.jsx
│   │   ├── Toast.jsx
│   │   ├── Spinner.jsx
│   │   ├── EmptyState.jsx
│   │   └── ProtectedRoute.jsx
│   └── pages/
│       ├── HomePage.jsx
│       ├── ResultsPage.jsx
│       ├── ListingPage.jsx
│       ├── PublishPage.jsx
│       ├── CheckoutModal.jsx
│       ├── MyAdsPage.jsx
│       ├── SellerPage.jsx
│       ├── AuthPage.jsx
│       ├── AdminPage.jsx
│       ├── FavoritesPage.jsx
│       └── NotFoundPage.jsx
└── server/
    ├── package.json
    ├── .env.example
    └── server.js           # Express + Stripe + Supabase webhook
```

## Setup

### Prerequisites

- Node.js 18+
- npm
- Supabase project (free tier works)
- Stripe account (test mode by default)

### 1. Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Go to the SQL Editor and run `supabase/schema.sql`
3. Then run `supabase/seed.sql` to populate demo data
4. Go to Storage → Create a new public bucket called `listing-photos`
5. Set bucket policies:
   - `listing-photos`: SELECT = true (public), INSERT = authenticated, DELETE = authenticated owner

### 2. Environment Variables

#### Frontend (`/.env`)

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_API_BASE=/api
```

#### Server (`/server/.env`)

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
AD_FEE_EUR=1
PORT=4242
```

### 3. Install & Run

```bash
# Frontend dependencies
npm install

# Server dependencies
cd server && npm install && cd ..

# Copy env files
cp .env.example .env
cp server/.env.example server/.env
# Edit both .env files with your actual keys

# Start the Express server (port 4242)
cd server && npm start

# In another terminal, start the Vite dev server (port 5173)
npm run dev
```

Open http://localhost:5173

### 4. Stripe Webhook (local development)

To test the payment flow locally, forward Stripe webhooks to your server:

```bash
stripe listen --forward-to localhost:4242/api/webhook
```

This will give you a webhook signing secret to put in `server/.env`.

### 5. Test Card

Use Stripe test card: `4242 4242 4242 4242` with any future expiry and CVC.

## Features

- **5 Languages**: ES (default), EN, CA, UK, RU — switchable in header
- **16 Categories**: Coches, Motos, Inmobiliaria, Empleo, Reformas, Electronica, Hogar, Moda, Deporte, Bebes, Animales, Servicios, Coleccionismo, Agricultura, Regalo, Alquiler
- **Search**: Text search + province filter
- **Photo Upload**: Up to 5 photos, compressed to 1600px, stored in Supabase Storage
- **Payments**: €1 per ad via Stripe (card + Google Pay + Apple Pay)
- **Ratings**: 5-star seller ratings, one per user per seller
- **Favorites**: Client-side saved in localStorage
- **Admin Panel**: Edit site name, primary color, categories, listings, ad fee
- **Responsive**: Mobile-first, 3 breakpoints
- **Accessibility**: Focus rings, ARIA labels, prefers-reduced-motion, keyboard nav

## Admin Access

Admin rights are granted via email allow-list. The default admin email is `andriimykolyshyn@gmail.com`. Sign up with this email (or add your email to the `admins` table in Supabase), then log in normally. The admin bar and `/admin` route will appear automatically.

## Demo Mode

If Stripe keys are not configured, the app runs in demo mode with a simulated payment flow. A warning banner is shown, and ads are activated immediately without real charges.

## License

OLXIN — Not affiliated with OLX Group.
