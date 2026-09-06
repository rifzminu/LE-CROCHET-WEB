import React from 'react';
import { useStore } from '../context/StoreContext';
import { Instagram, Mail, Phone, Heart, Sparkles, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, navigateTo } = useStore();

  return (
    <footer className="bg-[#3B2920] text-[#F8F3EA] border-t border-[#5A3E2B]">
      {/* Mini Instagram CTA banner */}
      <div className="border-b border-[#5A3E2B]/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-[#5A3E2B] flex items-center justify-center text-[#C7A98A] border border-[#A67C52]/40 shrink-0 mx-auto md:mx-0">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <p className="font-serif-heading text-xl text-[#F8F3EA]">Follow Our Instagram Crochet Page</p>
              <p className="text-xs text-[#C7A98A]">Behind the stitches, process videos, and daily story updates</p>
            </div>
          </div>

          <a
            href={settings.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#A67C52] hover:bg-[#C7A98A] hover:text-[#3B2920] text-[#F8F3EA] px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-md group"
          >
            <span>Follow @{settings.instagramHandle}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-4">
            <h3 className="font-serif-heading text-2xl font-bold tracking-tight text-[#F8F3EA]">
              {settings.storeName}
            </h3>
            <p className="text-xs text-[#E8DCCB]/80 leading-relaxed max-w-sm">
              Each piece is individually crocheted by hand using premium soft yarns. From everlasting flower bouquets to whimsical keychains and custom creations.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#5A3E2B] hover:bg-[#A67C52] text-[#F8F3EA] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <button
                onClick={() => navigateTo('custom-order')}
                className="inline-flex items-center gap-1.5 text-xs text-[#C7A98A] hover:text-[#F8F3EA] transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Request Custom Order</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif-heading text-lg font-semibold mb-4 text-[#C7A98A]">Explore</h4>
            <ul className="space-y-2.5 text-xs text-[#E8DCCB]/80">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-[#F8F3EA] transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop')}
                  className="hover:text-[#F8F3EA] transition-colors text-left"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('categories')}
                  className="hover:text-[#F8F3EA] transition-colors text-left"
                >
                  Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('custom-order')}
                  className="hover:text-[#F8F3EA] transition-colors text-left"
                >
                  Custom Crochet Request
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('cart')}
                  className="hover:text-[#F8F3EA] transition-colors text-left"
                >
                  Shopping Bag
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif-heading text-lg font-semibold mb-4 text-[#C7A98A]">Customer Care</h4>
            <ul className="space-y-2.5 text-xs text-[#E8DCCB]/80">
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-[#F8F3EA] transition-colors text-left"
                >
                  About Our Craft
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-[#F8F3EA] transition-colors text-left"
                >
                  Contact & Inquiries
                </button>
              </li>
              <li>
                <span className="text-[#E8DCCB]/60 cursor-pointer hover:text-[#F8F3EA]">
                  Shipping & Handmade Care
                </span>
              </li>
              <li>
                <span className="text-[#E8DCCB]/60 cursor-pointer hover:text-[#F8F3EA]">
                  Privacy Policy & Terms
                </span>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admin-login')}
                  className="text-[#C7A98A] hover:text-[#F8F3EA] text-left pt-1"
                >
                  Store Owner Login
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif-heading text-lg font-semibold mb-4 text-[#C7A98A]">Get in Touch</h4>
            <ul className="space-y-3 text-xs text-[#E8DCCB]/80">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C7A98A] shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-[#F8F3EA]">
                  {settings.contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C7A98A] shrink-0" />
                <span>{settings.contactPhone}</span>
              </li>
              <li className="pt-2 text-[11px] text-[#E8DCCB]/60 leading-normal">
                Direct Message on Instagram for instant inquiries about custom colors and rush orders.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-[#5A3E2B] flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8DCCB]/60 gap-4">
          <p>© {new Date().getFullYear()} {settings.storeName}. All handmade pieces crafted with love.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted for Instagram crochet community</span>
            <Heart className="w-3.5 h-3.5 text-[#A67C52] fill-[#A67C52]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
