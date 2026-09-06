import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Search, Menu, X, Instagram, Shield, Heart } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    cartCount,
    wishlistCount,
    settings,
  } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
    { label: 'Categories', page: 'categories' },
    { label: 'Custom Order', page: 'custom-order' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: string) => {
    navigateTo(page);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('shop');
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F3EA]/95 backdrop-blur-md border-b border-[#E8DCCB] transition-all">
      {/* Mini top announcement strip */}
      <div className="bg-[#5A3E2B] text-[#F8F3EA] text-xs py-1.5 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-3">
        <span>Handmade with love • Free shipping on orders over {settings.currencySymbol}{settings.freeDeliveryThreshold}</span>
        <a
          href={settings.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1 text-[#C7A98A] hover:text-[#F8F3EA] transition-colors"
        >
          <Instagram className="w-3.5 h-3.5" />
          <span>@{settings.instagramHandle}</span>
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Mobile hamburger button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#3B2920] hover:text-[#A67C52] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo & Brand Name */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="font-serif-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#3B2920] group-hover:text-[#A67C52] transition-colors">
                {settings.storeName}
              </span>
              <span className="hidden sm:block text-[11px] tracking-widest uppercase text-[#A67C52] font-medium -mt-1">
                Handmade Crochet Boutique
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`text-sm font-medium transition-colors relative py-1 cursor-pointer ${
                  currentPage === item.page
                    ? 'text-[#5A3E2B] font-semibold'
                    : 'text-[#5A3E2B]/80 hover:text-[#A67C52]'
                }`}
              >
                {item.label}
                {currentPage === item.page && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A67C52] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#5A3E2B] hover:text-[#A67C52] transition-colors rounded-full hover:bg-[#E8DCCB]/50"
              aria-label="Search Store"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Instagram Profile link */}
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Page"
              className="p-2 text-[#5A3E2B] hover:text-[#A67C52] transition-colors rounded-full hover:bg-[#E8DCCB]/50"
              title={`Visit @${settings.instagramHandle} on Instagram`}
            >
              <Instagram className="w-5 h-5" />
            </a>

            {/* Wishlist Icon with badge */}
            <button
              onClick={() => handleNavClick('wishlist')}
              className="relative p-2 text-[#5A3E2B] hover:text-[#A67C52] transition-colors rounded-full hover:bg-[#E8DCCB]/50"
              aria-label={`Wishlist with ${wishlistCount} saved items`}
              title="My Wishlist"
            >
              <Heart
                className={`w-5 h-5 transition-transform ${
                  wishlistCount > 0 ? 'fill-[#C2410C] text-[#C2410C]' : 'text-[#5A3E2B]'
                }`}
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#C2410C] text-[#F8F3EA] text-[11px] font-bold flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon with badge */}
            <button
              onClick={() => handleNavClick('cart')}
              className="relative p-2 text-[#5A3E2B] hover:text-[#A67C52] transition-colors rounded-full hover:bg-[#E8DCCB]/50"
              aria-label={`Shopping Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#A67C52] text-[#F8F3EA] text-[11px] font-bold flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin shortcut button */}
            <button
              onClick={() => handleNavClick('admin-login')}
              className="hidden sm:flex items-center gap-1 text-xs text-[#5A3E2B]/70 hover:text-[#3B2920] px-2.5 py-1.5 rounded-lg border border-[#C7A98A]/30 hover:border-[#A67C52]/60 hover:bg-[#E8DCCB]/40 transition-all"
              title="Store Admin"
            >
              <Shield className="w-3.5 h-3.5 text-[#A67C52]" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {searchOpen && (
          <form
            onSubmit={handleSearchSubmit}
            className="py-3 border-t border-[#E8DCCB] flex items-center gap-3 animate-fadeIn"
          >
            <Search className="w-5 h-5 text-[#A67C52] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crochet flowers, keychains, bags, magnets..."
              className="w-full bg-transparent text-sm text-[#3B2920] placeholder-[#A67C52]/70 focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="text-xs bg-[#5A3E2B] text-[#F8F3EA] px-3.5 py-1.5 rounded-full hover:bg-[#A67C52] transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="text-xs text-[#5A3E2B]/70 hover:text-[#3B2920]"
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F3EA] border-b border-[#E8DCCB] px-5 py-6 space-y-4 shadow-xl animate-fadeIn">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`text-left text-base font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                  currentPage === item.page
                    ? 'bg-[#E8DCCB] text-[#3B2920] font-semibold'
                    : 'text-[#5A3E2B] hover:bg-[#E8DCCB]/40'
                }`}
              >
                <span>{item.label}</span>
                {item.page === 'shop' && (
                  <span className="text-xs bg-[#C7A98A]/30 text-[#5A3E2B] px-2 py-0.5 rounded-full">
                    Catalog
                  </span>
                )}
              </button>
            ))}

            {/* Wishlist Mobile Link */}
            <button
              onClick={() => handleNavClick('wishlist')}
              className={`text-left text-base font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                currentPage === 'wishlist'
                  ? 'bg-[#E8DCCB] text-[#3B2920] font-semibold'
                  : 'text-[#5A3E2B] hover:bg-[#E8DCCB]/40'
              }`}
            >
              <span className="flex items-center gap-2">
                <Heart
                  className={`w-4 h-4 ${
                    wishlistCount > 0 ? 'fill-[#C2410C] text-[#C2410C]' : 'text-[#5A3E2B]'
                  }`}
                />
                <span>My Wishlist</span>
              </span>
              {wishlistCount > 0 && (
                <span className="text-xs bg-[#C2410C] text-[#F8F3EA] px-2 py-0.5 rounded-full font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>
          </nav>

          <div className="pt-4 border-t border-[#E8DCCB] flex items-center justify-between">
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#5A3E2B] font-medium"
            >
              <Instagram className="w-4 h-4 text-[#A67C52]" />
              <span>@{settings.instagramHandle}</span>
            </a>

            <button
              onClick={() => handleNavClick('admin-login')}
              className="flex items-center gap-1.5 text-xs text-[#5A3E2B] px-3 py-1.5 rounded-md bg-[#E8DCCB]/60"
            >
              <Shield className="w-3.5 h-3.5 text-[#A67C52]" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
