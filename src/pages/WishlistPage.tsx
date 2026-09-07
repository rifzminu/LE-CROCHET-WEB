import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles, Check, PackageOpen } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage: React.FC = () => {
  const {
    products,
    wishlist,
    wishlistCount,
    toggleWishlist,
    clearWishlist,
    addToCart,
    moveWishlistToCart,
    navigateTo,
    settings,
  } = useStore();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));
  const suggestedProducts = products.filter((p) => !wishlist.includes(p.id)).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Breadcrumbs & Header */}
      <div>
        <nav className="flex items-center gap-2 text-xs text-[#5A3E2B]/70 mb-3">
          <button
            onClick={() => navigateTo('home')}
            className="hover:text-[#3B2920] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#3B2920] font-medium">Wishlist</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8DCCB] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DCCB] text-[#5A3E2B] text-xs font-semibold mb-2">
              <Heart className="w-3.5 h-3.5 fill-[#C2410C] text-[#C2410C]" />
              <span>Saved for Later</span>
            </div>
            <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#3B2920]">
              My Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-[#5A3E2B]/80 mt-1">
              {wishlistCount === 0
                ? 'Your favorite handmade crochet treasures will appear here'
                : `${wishlistCount} item${wishlistCount === 1 ? '' : 's'} saved in your collection`}
            </p>
          </div>

          {wishlistCount > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={moveWishlistToCart}
                className="bg-[#5A3E2B] hover:bg-[#A67C52] text-[#F8F3EA] px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move In-Stock to Cart</span>
              </button>
              <button
                onClick={clearWishlist}
                className="text-xs text-[#5A3E2B]/70 hover:text-[#C2410C] px-3.5 py-2.5 rounded-full border border-[#C7A98A]/50 hover:border-[#C2410C]/40 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Wishlist Content */}
      {wishlistCount === 0 ? (
        /* Empty State */
        <div className="py-12 sm:py-16 text-center max-w-lg mx-auto space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#E8DCCB] border border-[#C7A98A]/60 flex items-center justify-center mx-auto text-[#A67C52] shadow-inner">
            <Heart className="w-9 h-9 text-[#C7A98A]" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#3B2920]">
              Your wishlist is empty
            </h2>
            <p className="text-xs sm:text-sm text-[#5A3E2B]/80 leading-relaxed">
              Explore our handmade crochet collection and tap the heart icon on any piece to save it for later or share with loved ones.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('shop')}
              className="bg-[#5A3E2B] hover:bg-[#A67C52] text-[#F8F3EA] px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Browse Shop
            </button>
            <button
              onClick={() => navigateTo('categories')}
              className="bg-[#E8DCCB] hover:bg-[#C7A98A]/40 text-[#3B2920] border border-[#C7A98A] px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all cursor-pointer"
            >
              Explore Categories
            </button>
          </div>

          {/* Suggested Items Preview */}
          {suggestedProducts.length > 0 && (
            <div className="pt-12 text-left">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif-heading text-xl font-bold text-[#3B2920] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#A67C52]" />
                  Popular Pieces You Might Love
                </h3>
                <button
                  onClick={() => navigateTo('shop')}
                  className="text-xs font-semibold text-[#5A3E2B] hover:text-[#A67C52] inline-flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {suggestedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Wishlist Items Grid */
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {wishlistedProducts.map((product) => {
              const isSoldOut = product.isSoldOut || product.availableQuantity <= 0;
              const primaryImage =
                product.images && product.images.length > 0
                  ? product.images[0]
                  : 'https://images.unsplash.com/photo-1590483256085-f5b252ce6480?auto=format&fit=crop&w=800&q=80';

              return (
                <div
                  key={product.id}
                  className="bg-[#F8F3EA] rounded-2xl border border-[#E8DCCB] hover:border-[#C7A98A] p-4 flex flex-col justify-between gap-4 transition-all shadow-xs hover:shadow-md relative group"
                >
                  {/* Top Image & Remove */}
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-[#E8DCCB]/40">
                    <img
                      src={primaryImage}
                      alt={product.name}
                      onClick={() => navigateTo('product-detail', { productId: product.id })}
                      className="w-full h-full object-cover object-center cursor-pointer group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Remove Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2.5 right-2.5 p-2 rounded-full bg-[#F8F3EA]/90 hover:bg-[#F8F3EA] text-[#C2410C] hover:scale-110 transition-all shadow-sm cursor-pointer"
                      title="Remove from wishlist"
                      aria-label={`Remove ${product.name} from wishlist`}
                    >
                      <Heart className="w-4 h-4 fill-[#C2410C] text-[#C2410C]" />
                    </button>

                    {/* Stock badge */}
                    <div className="absolute bottom-2.5 left-2.5">
                      {isSoldOut ? (
                        <span className="bg-[#3B2920]/90 text-[#F8F3EA] text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase">
                          Sold Out
                        </span>
                      ) : (
                        <span className="bg-[#F8F3EA]/95 text-emerald-800 text-[10px] font-medium px-2 py-0.5 rounded-md border border-emerald-200">
                          Handmade & Available
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-medium text-[#A67C52] tracking-wider">
                      {product.category}
                    </span>
                    <h3
                      onClick={() => navigateTo('product-detail', { productId: product.id })}
                      className="font-serif-heading text-base font-bold text-[#3B2920] hover:text-[#A67C52] transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#5A3E2B]/75 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-2 border-t border-[#E8DCCB] flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-[#5A3E2B]/70 uppercase block">Price</span>
                      <span className="text-base font-bold text-[#3B2920]">
                        {settings.currencySymbol}{product.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      disabled={isSoldOut}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isSoldOut
                          ? 'bg-[#E8DCCB] text-[#5A3E2B]/40 cursor-not-allowed'
                          : 'bg-[#5A3E2B] hover:bg-[#A67C52] text-[#F8F3EA] active:scale-95 shadow-xs'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{isSoldOut ? 'Sold Out' : 'Add to Cart'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Continue Shopping Footer */}
          <div className="rounded-2xl bg-[#E8DCCB]/40 border border-[#C7A98A]/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-[#E8DCCB] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-[#A67C52]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#3B2920]">Looking for something customized?</p>
                <p className="text-xs text-[#5A3E2B]/80">
                  Request custom colors, special sizes, or personalized designs anytime.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigateTo('custom-order')}
              className="bg-[#5A3E2B] hover:bg-[#A67C52] text-[#F8F3EA] px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer"
            >
              Custom Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
