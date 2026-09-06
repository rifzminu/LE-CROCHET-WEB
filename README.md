# LEH_CROCHET Web App

A modern, responsive e-commerce web application for LEH_CROCHET featuring handmade baby crochet items, everlasting flower bouquets, plushies, custom crochet commission builder, and a comprehensive store admin portal.

---

## 🚀 Quick Start (Running Locally)

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18 or higher) installed on your computer.

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open your browser and visit:
[http://localhost:3000](http://localhost:3000)

---

## 🛠️ Making Changes

### Project Structure
- `src/pages/`
  - `HomePage.tsx` – Landing page, hero section, bestsellers, customer reviews.
  - `ShopPage.tsx` – Product catalog with filters and search.
  - `ProductDetailsPage.tsx` – Single product details and "Add to Cart".
  - `CartPage.tsx` & `CheckoutPage.tsx` – Shopping cart and checkout with UPI details.
  - `CustomOrderPage.tsx` – Custom crochet request & pricing calculator.
  - `AboutContactPage.tsx` – Brand story, artisan bio, and contact info.
  - `AdminPage.tsx` – Admin portal for managing products, orders, categories, and settings.
- `src/data/sampleData.ts` – Initial products, categories, reviews, and store settings.
- `src/context/StoreContext.tsx` – Central state management (products, cart, orders, settings).
- `src/components/Header.tsx` & `src/components/Footer.tsx` – Navigation bar and footer.

---

## 🔐 Admin Dashboard Access

- **Admin Login:** Click the **Admin** button in the top navigation bar or footer.
- **Admin Passcode:** `Minnu@098`
- To update your passcode or store details, navigate to **Admin Details & Settings** inside the dashboard or use the "Change Password" button on the login screen.

---

## 📦 Building for Production

To create a production-ready build:
```bash
npm run build
```

This compiles your application into the `dist/` directory, which can be deployed to platforms like **Vercel**, **Netlify**, or **GitHub Pages**.

---

## 🌐 Deploying with GitHub (Vercel or Netlify)

1. Push this repository to your GitHub account.
2. Go to [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com).
3. Connect your GitHub account and select this repository.
4. Framework preset: **Vite**
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy**!
