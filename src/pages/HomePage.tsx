import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import {
  Sparkles,
  ArrowRight,
  Instagram,
  Heart,
  Truck,
  ShieldCheck,
  Palette,
  ArrowUpRight,
} from 'lucide-react';
import { INSTAGRAM_POSTS, CUSTOMER_REVIEWS } from '../data/sampleData';

export const HomePage: React.FC = () => {
  const { products, categories, navigateTo, settings } = useStore();

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. HERO SECTION - Split screen */}
      <section className="bg-gradient-to-b from-[#E8DCCB]/40 to-transparent border-b border-[#E8DCCB]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8DCCB] text-[#5A3E2B] text-xs font-semibold tracking-wide border border-[#C7A98A]/40">
                <Sparkles className="w-3.5 h-3.5 text-[#A67C52]" />
                <span>Handmade with Love & Care</span>
              </div>

              <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#3B2920] leading-[1.15]">
                Made by hand, <br className="hidden sm:inline" />
                <span className="italic font-normal text-[#A67C52]">made with love.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#5A3E2B]/85 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Thoughtfully handcrafted crochet pieces made specially for you. Everlasting flowers, cozy accessories, whimsical keychains, and custom creations.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <button
                  onClick={() => navigateTo('shop')}
                  className="bg-[#5A3E2B] hover:bg-[#A67C52] text-[#F8F3EA] px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Shop Collection
                </button>
                <button
                  onClick={() => navigateTo('custom-order')}
                  className="bg-[#E8DCCB] hover:bg-[#C7A98A]/50 text-[#3B2920] border border-[#C7A98A] px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all cursor-pointer"
                >
                  Custom Order
                </button>
              </div>

              {/* Instagram link mini pill */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-2 text-xs text-[#5A3E2B]/80">
                <span>Directly connected with</span>
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#A67C52] hover:text-[#5A3E2B] inline-flex items-center gap-1 underline underline-offset-2"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  @{settings.instagramHandle}
                </a>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="aspect-[4/3] sm:aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#F8F3EA] bg-[#E8DCCB]">
                  <img
                    src="https://images.unsplash.com/photo-1590483256085-f5b252ce6480?auto=format&fit=crop&w=1200&q=80"
                    alt="Handmade crochet flowers and handmade pieces"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating mini badge */}
                <div className="absolute -bottom-4 -left-4 sm:bottom-6 sm:-left-6 bg-[#F8F3EA] p-3.5 rounded-2xl border border-[#C7A98A]/50 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E8DCCB] flex items-center justify-center text-[#5A3E2B]">
                    <Heart className="w-5 h-5 fill-[#A67C52] text-[#A67C52]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#3B2920]">100% Handcrafted</p>
                    <p className="text-[11px] text-[#5A3E2B]/80">Premium soft yarn</p>
                  </div>
                </div>

                <div className="hidden sm:flex absolute -top-4 -right-4 bg-[#5A3E2B] text-[#F8F3EA] px-4 py-2 rounded-2xl shadow-lg items-center gap-2 text-xs font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#C7A98A]" />
                  <span>Custom orders welcome</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PRODUCTS (Little Handmade Treasures) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A67C52]">
              Handpicked Pieces
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#3B2920] mt-1">
              Little Handmade Treasures
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#5A3E2B] hover:text-[#A67C52] transition-colors cursor-pointer group self-start sm:self-auto"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. PRODUCT CATEGORIES */}
      <section className="bg-[#E8DCCB]/30 border-y border-[#E8DCCB] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A67C52]">
              Explore by Style
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#3B2920] mt-1">
              Shop by Category
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.slice(0, 6).map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigateTo('shop', { categorySlug: cat.slug })}
                className="group p-3 rounded-2xl bg-[#F8F3EA] border border-[#E8DCCB] hover:border-[#A67C52] transition-all hover:shadow-md text-center cursor-pointer flex flex-col items-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-3 border-2 border-[#E8DCCB] group-hover:scale-105 transition-transform">
                  <img
                    src={cat.image || 'https://images.unsplash.com/photo-1590483256085-f5b252ce6480?auto=format&fit=crop&w=400&q=80'}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#3B2920] group-hover:text-[#A67C52] transition-colors">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A67C52]">
              Fresh Off the Hook
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#3B2920] mt-1">
              New Arrivals
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#5A3E2B] hover:text-[#A67C52] transition-colors cursor-pointer group self-start sm:self-auto"
          >
            <span>Browse Full Store</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. CUSTOM ORDER CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#E8DCCB] border border-[#C7A98A]/50 p-6 sm:p-10 lg:p-14 overflow-hidden relative shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <span className="inline-block text-xs uppercase tracking-wider font-semibold text-[#A67C52] bg-[#F8F3EA] px-3 py-1 rounded-full border border-[#C7A98A]/30">
                Custom Crochet Request
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#3B2920]">
                Have something special in mind?
              </h2>
              <p className="text-sm sm:text-base text-[#5A3E2B]/85 max-w-lg mx-auto lg:mx-0">
                Tell us your idea and we'll turn it into a handmade crochet piece. Pick custom flower colors, bag dimensions, character keychains, or personalized gifts.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('custom-order')}
                  className="bg-[#5A3E2B] hover:bg-[#3B2920] text-[#F8F3EA] px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Create Custom Order
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-xs aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-[#F8F3EA]">
                <img
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
                  alt="Custom crochet request examples"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INSTAGRAM SECTION (6-image grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A67C52] mb-1">
            <Instagram className="w-4 h-4" />
            <span>@{settings.instagramHandle}</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#3B2920]">
            Follow our little handmade world
          </h2>
          <p className="text-xs sm:text-sm text-[#5A3E2B]/80 mt-1">
            Tag us on Instagram to be featured with your handmade crochet pieces
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#E8DCCB] shadow-xs cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-[#3B2920]/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center text-[#F8F3EA]">
                <Instagram className="w-5 h-5 mb-1" />
                <span className="text-[10px] line-clamp-2">{post.caption}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-6">
          <a
            href={settings.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#E8DCCB] hover:bg-[#C7A98A]/50 text-[#3B2920] border border-[#C7A98A] px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all"
          >
            <Instagram className="w-4 h-4 text-[#A67C52]" />
            <span>Follow on Instagram</span>
          </a>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS */}
      <section className="bg-[#E8DCCB]/25 border-t border-[#E8DCCB] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A67C52]">
              Customer Love
            </span>
            <h2 className="font-serif-heading text-3xl font-bold text-[#3B2920]">
              From our Instagram family
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUSTOMER_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="p-5 rounded-2xl bg-[#F8F3EA] border border-[#E8DCCB] space-y-3 shadow-xs"
              >
                <div className="flex items-center gap-1 text-[#A67C52]">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#5A3E2B] italic leading-relaxed">
                  "{review.text}"
                </p>
                <div className="pt-2 border-t border-[#E8DCCB]/60 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#3B2920]">{review.name}</span>
                  <span className="text-[#A67C52] text-[11px] font-medium">{review.product}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
