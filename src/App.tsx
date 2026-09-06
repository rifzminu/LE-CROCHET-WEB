/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CustomOrderPage } from './pages/CustomOrderPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AboutContactPage } from './pages/AboutContactPage';
import { AdminPage } from './pages/AdminPage';
import { WishlistPage } from './pages/WishlistPage';

function StoreApp() {
  const { currentPage, navigateTo, selectedProductId, notification } = useStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedProductId]);

  // Admin section
  if (currentPage === 'admin' || currentPage === 'admin-login') {
    return (
      <div className="min-h-screen bg-[#F8F3EA] text-[#3B2920]">
        <AdminPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F3EA] text-[#3B2920]">
      <Header />

      {/* Global Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 bg-[#3B2920] text-[#F8F3EA] px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#A67C52]/40 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#C7A98A]" />
          <p className="text-xs sm:text-sm font-medium">{notification}</p>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'product-detail' && <ProductDetailsPage />}
        {currentPage === 'categories' && <CategoriesPage />}
        {currentPage === 'custom-order' && <CustomOrderPage />}
        {currentPage === 'wishlist' && <WishlistPage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'checkout' && <CheckoutPage />}
        {currentPage === 'order-confirmation' && <OrderConfirmationPage />}
        {(currentPage === 'about' || currentPage === 'contact') && (
          <AboutContactPage initialTab={currentPage === 'contact' ? 'contact' : 'about'} />
        )}
      </main>

      <Footer />

      {/* Quick Action floating pills on mobile */}
      <div className="md:hidden fixed bottom-5 right-4 z-40 flex items-center gap-2">
        <button
          onClick={() => navigateTo('custom-order')}
          className="bg-[#A67C52] text-[#F8F3EA] px-4 py-2.5 rounded-full text-xs font-semibold shadow-lg hover:bg-[#5A3E2B] transition-colors border border-[#F8F3EA]/30 flex items-center gap-1.5 cursor-pointer active:scale-95"
        >
          <span>Custom Order ✨</span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StoreApp />
    </StoreProvider>
  );
}

