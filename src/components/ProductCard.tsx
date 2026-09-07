import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Eye, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, addToCart, settings, toggleWishlist, isInWishlist } = useStore();
  const isSoldOut = product.isSoldOut || product.availableQuantity <= 0;
  const isWishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    navigateTo('product-detail', { productId: product.id });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSoldOut) {
      addToCart(product);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const primaryImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1590483256085-f5b252ce6480?auto=format&fit=crop&w=800&q=80';

  return (
    <div
      onClick={handleCardClick}
      className="group bg-[#F8F3EA] rounded-2xl border border-[#E8DCCB] hover:border-[#C7A98A] overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col h-full"
    >
      {/* Image container */}
      <div className="relative aspect-square w-full bg-[#E8DCCB]/40 overflow-hidden">
        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          type="button"
          className={`absolute top-2.5 right-2.5 z-20 p-2 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer shadow-sm ${
            isWishlisted
              ? 'bg-[#F8F3EA] text-[#C2410C] scale-105 hover:scale-110 shadow-md ring-2 ring-[#C2410C]/30'
              : 'bg-[#F8F3EA]/85 text-[#5A3E2B] hover:text-[#C2410C] hover:bg-[#F8F3EA] hover:scale-105'
          }`}
          title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Heart
            className={`w-4 h-4 transition-all duration-200 ${
              isWishlisted ? 'fill-[#C2410C] text-[#C2410C]' : 'text-[#5A3E2B]'
            }`}
          />
        </button>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {isSoldOut ? (
            <span className="bg-[#3B2920]/90 backdrop-blur-xs text-[#F8F3EA] text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Sold Out
            </span>
          ) : product.isNewArrival ? (
            <span className="bg-[#A67C52] text-[#F8F3EA] text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full shadow-xs">
              New
            </span>
          ) : product.isPopular ? (
            <span className="bg-[#5A3E2B] text-[#F8F3EA] text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full shadow-xs">
              Bestseller
            </span>
          ) : null}
        </div>

        {/* Quick view icon on hover */}
        <div className="hidden sm:flex absolute inset-0 bg-[#3B2920]/15 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center gap-2">
          <span className="bg-[#F8F3EA] text-[#3B2920] px-3.5 py-1.5 rounded-full text-xs font-medium shadow-md flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" /> View Details
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-2.5 bg-[#F8F3EA]">
        <div>
          <span className="text-[11px] font-medium text-[#A67C52] uppercase tracking-wider block mb-1">
            {product.category}
          </span>
          <h3 className="font-serif-heading text-base sm:text-lg font-bold text-[#3B2920] group-hover:text-[#A67C52] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-[#5A3E2B]/75 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="pt-2 border-t border-[#E8DCCB]/60 flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-[#5A3E2B]/70 block text-[10px] uppercase">Price</span>
            <span className="text-base sm:text-lg font-bold text-[#3B2920]">
              {settings.currencySymbol}{product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isSoldOut}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isSoldOut
                ? 'bg-[#E8DCCB] text-[#5A3E2B]/50 cursor-not-allowed'
                : 'bg-[#5A3E2B] hover:bg-[#A67C52] text-[#F8F3EA] active:scale-95 shadow-sm'
            }`}
            aria-label={isSoldOut ? 'Sold Out' : 'Add to Cart'}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">{isSoldOut ? 'Sold Out' : 'Add'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
