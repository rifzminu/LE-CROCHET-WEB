import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import {
  ShoppingBag,
  Heart,
  Sparkles,
  ArrowLeft,
  Check,
  Truck,
  ShieldCheck,
  RefreshCw,
  Share2,
} from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    settings,
    showNotification,
  } = useStore();

  // Find selected product or default to first
  const product =
    products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors && product.colors.length > 0 ? product.colors[0] : ''
  );
  const [quantity, setQuantity] = useState(1);

  // Sync color when product changes
  React.useEffect(() => {
    if (product?.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
    setActiveImageIndex(0);
    setQuantity(1);
  }, [product?.id]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-sm text-[#5A3E2B]">Product not found.</p>
        <button
          onClick={() => navigateTo('shop')}
          className="mt-4 bg-[#5A3E2B] text-[#F8F3EA] px-5 py-2 rounded-full text-xs font-semibold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const isSoldOut = product.isSoldOut || product.availableQuantity <= 0;
  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : ['https://images.unsplash.com/photo-1590483256085-f5b252ce6480?auto=format&fit=crop&w=800&q=80'];

  const handleAddToCart = () => {
    if (!isSoldOut) {
      addToCart(product, quantity, selectedColor);
    }
  };

  const handleBuyNow = () => {
    if (!isSoldOut) {
      addToCart(product, quantity, selectedColor);
      navigateTo('checkout');
    }
  };

  const handleCustomizeThis = () => {
    // Navigate to custom order
    navigateTo('custom-order');
    showNotification(`Customizing "${product.name}"`);
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Back button & breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A3E2B] hover:text-[#A67C52] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shop</span>
        </button>

        <span className="text-xs text-[#A67C52] uppercase tracking-wider font-semibold">
          {product.category}
        </span>
      </div>

      {/* Product Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Product Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden bg-[#E8DCCB]/40 border border-[#E8DCCB] shadow-sm">
            <img
              src={productImages[activeImageIndex] || productImages[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />

            {/* Wishlist Button on Image */}
            <button
              onClick={() => toggleWishlist(product.id)}
              type="button"
              className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer shadow-md ${
                isInWishlist(product.id)
                  ? 'bg-[#F8F3EA] text-[#C2410C] scale-105 ring-2 ring-[#C2410C]/30'
                  : 'bg-[#F8F3EA]/90 text-[#5A3E2B] hover:text-[#C2410C] hover:bg-[#F8F3EA] hover:scale-105'
              }`}
              title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Save to wishlist'}
              aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart
                className={`w-5 h-5 transition-transform duration-200 ${
                  isInWishlist(product.id) ? 'fill-[#C2410C] text-[#C2410C]' : ''
                }`}
              />
            </button>

            {isSoldOut && (
              <div className="absolute top-4 left-4 bg-[#3B2920]/90 text-[#F8F3EA] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                Sold Out
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {productImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-18 h-18 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-[#5A3E2B] scale-95 shadow-md'
                      : 'border-[#E8DCCB] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Actions */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold text-[#A67C52] uppercase tracking-wider">
                Handcrafted Item
              </span>
              <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#3B2920] mt-1">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl sm:text-3xl font-bold text-[#3B2920]">
                {settings.currencySymbol}{product.price.toFixed(2)}
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                isSoldOut
                  ? 'bg-red-100 text-red-800'
                  : 'bg-[#E8DCCB] text-[#5A3E2B]'
              }`}>
                {isSoldOut ? 'Sold Out' : 'Handmade & Available'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#5A3E2B]/85 leading-relaxed">
              {product.description}
            </p>

            {/* Colors / Variants */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-[#E8DCCB]">
                <label className="block text-xs font-semibold text-[#3B2920] uppercase tracking-wide">
                  Color / Variant: <span className="font-normal text-[#A67C52]">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                        selectedColor === col
                          ? 'bg-[#5A3E2B] text-[#F8F3EA] border-[#5A3E2B] shadow-xs'
                          : 'bg-[#F8F3EA] text-[#5A3E2B] border-[#C7A98A]/50 hover:border-[#A67C52]'
                      }`}
                    >
                      {selectedColor === col && <Check className="w-3 h-3" />}
                      <span>{col}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            {!isSoldOut && (
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-[#3B2920] uppercase tracking-wide">
                  Quantity
                </label>
                <div className="inline-flex items-center border border-[#C7A98A] rounded-xl bg-[#F8F3EA] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-lg text-[#5A3E2B] hover:bg-[#E8DCCB] flex items-center justify-center font-bold text-sm disabled:opacity-30 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs sm:text-sm font-semibold text-[#3B2920]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.availableQuantity, quantity + 1))}
                    disabled={quantity >= product.availableQuantity}
                    className="w-8 h-8 rounded-lg text-[#5A3E2B] hover:bg-[#E8DCCB] flex items-center justify-center font-bold text-sm disabled:opacity-30 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Main Action Buttons */}
            <div className="space-y-2.5 pt-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isSoldOut}
                  className={`flex-1 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSoldOut
                      ? 'bg-[#E8DCCB] text-[#5A3E2B]/50 cursor-not-allowed'
                      : 'bg-[#5A3E2B] hover:bg-[#A67C52] text-[#F8F3EA] shadow-md active:scale-98'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isSoldOut ? 'Sold Out' : 'Add to Cart'}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  type="button"
                  className={`p-3.5 rounded-full border transition-all cursor-pointer shadow-xs ${
                    isInWishlist(product.id)
                      ? 'bg-[#F8F3EA] border-[#C2410C] text-[#C2410C] ring-2 ring-[#C2410C]/25 shadow-sm'
                      : 'bg-[#F8F3EA] border-[#C7A98A] text-[#5A3E2B] hover:text-[#C2410C] hover:border-[#C2410C]'
                  }`}
                  title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Save to wishlist'}
                  aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isInWishlist(product.id) ? 'fill-[#C2410C] text-[#C2410C] scale-110' : ''
                    }`}
                  />
                </button>
              </div>

              {!isSoldOut && (
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-[#A67C52] hover:bg-[#5A3E2B] text-[#F8F3EA] shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  Buy Now
                </button>
              )}
            </div>

            {/* Customise This Callout Box */}
            <div className="rounded-2xl bg-[#E8DCCB]/40 border border-[#C7A98A]/50 p-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-[#3B2920] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#A67C52]" />
                  Need a custom version?
                </p>
                <p className="text-[11px] text-[#5A3E2B]/80 mt-0.5">
                  Request special colors, different size, or personalization
                </p>
              </div>
              <button
                onClick={handleCustomizeThis}
                className="text-xs bg-[#F8F3EA] hover:bg-[#C7A98A]/30 text-[#5A3E2B] font-semibold px-3 py-1.5 rounded-full border border-[#C7A98A] transition-colors whitespace-nowrap cursor-pointer"
              >
                Customise This
              </button>
            </div>
          </div>

          {/* Mini Trust perks */}
          <div className="pt-4 border-t border-[#E8DCCB] grid grid-cols-2 gap-3 text-[11px] text-[#5A3E2B]/80">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#A67C52] shrink-0" />
              <span>Safe delivery with bubble wrap</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#A67C52] shrink-0" />
              <span>100% handmade guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Care details tabs */}
      <div className="border-t border-[#E8DCCB] pt-8 space-y-6">
        <h2 className="font-serif-heading text-2xl font-bold text-[#3B2920]">
          Product Details & Care
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#E8DCCB]/25 p-6 rounded-3xl border border-[#E8DCCB]">
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#A67C52]">
              Handmade Specifications
            </h3>
            <ul className="space-y-2 text-xs text-[#5A3E2B]">
              {product.details ? (
                product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A67C52]" />
                    <span>{detail}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A67C52]" />
                    <span>Material: 100% Premium Milk Cotton Yarn</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A67C52]" />
                    <span>Technique: Hand-crocheted single & double stitch</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#A67C52]">
              Care Instructions
            </h3>
            <p className="text-xs text-[#5A3E2B] leading-relaxed">
              {product.careInstructions ||
                'Spot clean gently with cold water and mild soap. Lay flat on a clean dry towel to dry. Do not wring or machine wash to keep shape intact.'}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-[#E8DCCB] pt-10 space-y-6">
          <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#3B2920]">
            More From {product.category}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
