import React from 'react';
import { useStore } from '../context/StoreContext';
import { Trash2, ArrowRight, ShoppingBag, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    navigateTo,
    settings,
  } = useStore();

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-[#E8DCCB] text-[#5A3E2B] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8 text-[#A67C52]" />
        </div>
        <h1 className="font-serif-heading text-3xl font-bold text-[#3B2920]">
          Your basket is currently empty
        </h1>
        <p className="text-xs sm:text-sm text-[#5A3E2B]/80 max-w-sm mx-auto">
          Explore our collection of handcrafted crochet flowers, plushies, bags, and keychains.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigateTo('shop')}
            className="bg-[#5A3E2B] hover:bg-[#A67C52] text-[#F8F3EA] px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors shadow-md cursor-pointer"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E8DCCB] pb-6">
        <div>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#3B2920]">
            Your Shopping Basket
          </h1>
          <p className="text-xs sm:text-sm text-[#5A3E2B]/80 mt-1">
            Carefully crafted pieces waiting for you
          </p>
        </div>
        <button
          onClick={() => navigateTo('shop')}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A3E2B] hover:text-[#A67C52] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart items list */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item, idx) => {
            const itemImage =
              item.product.images && item.product.images.length > 0
                ? item.product.images[0]
                : 'https://images.unsplash.com/photo-1590483256085-f5b252ce6480?auto=format&fit=crop&w=800&q=80';

            return (
              <div
                key={`${item.product.id}-${item.selectedColor || idx}`}
                className="bg-[#F8F3EA] rounded-2xl border border-[#E8DCCB] p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 shadow-xs"
              >
                {/* Product Thumbnail */}
                <div
                  onClick={() => navigateTo('product-detail', { productId: item.product.id })}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#E8DCCB] shrink-0 cursor-pointer"
                >
                  <img src={itemImage} alt={item.product.name} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#A67C52]">
                    {item.product.category}
                  </span>
                  <h3
                    onClick={() => navigateTo('product-detail', { productId: item.product.id })}
                    className="font-serif-heading text-lg font-bold text-[#3B2920] hover:text-[#A67C52] transition-colors cursor-pointer"
                  >
                    {item.product.name}
                  </h3>
                  {item.selectedColor && (
                    <p className="text-xs text-[#5A3E2B]/80">
                      Variant: <span className="font-semibold text-[#3B2920]">{item.selectedColor}</span>
                    </p>
                  )}
                  <p className="text-xs font-semibold text-[#5A3E2B]">
                    {settings.currencySymbol}{item.product.price.toFixed(2)} each
                  </p>
                </div>

                {/* Stepper & Subtotal */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="flex items-center border border-[#C7A98A] rounded-xl bg-[#F8F3EA] p-1">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                      className="w-7 h-7 rounded text-[#5A3E2B] hover:bg-[#E8DCCB] flex items-center justify-center font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-semibold text-[#3B2920]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                      disabled={item.quantity >= item.product.availableQuantity}
                      className="w-7 h-7 rounded text-[#5A3E2B] hover:bg-[#E8DCCB] flex items-center justify-center font-bold text-xs disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-[70px]">
                    <span className="text-[10px] text-[#5A3E2B]/60 uppercase block">Subtotal</span>
                    <span className="text-sm sm:text-base font-bold text-[#3B2920]">
                      {settings.currencySymbol}{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                    className="p-2 text-[#5A3E2B]/60 hover:text-red-600 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 bg-[#E8DCCB]/40 border border-[#C7A98A]/50 rounded-3xl p-6 space-y-6">
          <h2 className="font-serif-heading text-2xl font-bold text-[#3B2920]">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs sm:text-sm text-[#5A3E2B]">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold text-[#3B2920]">
                {settings.currencySymbol}{cartSubtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Standard Delivery</span>
              <span className="font-semibold text-[#3B2920]">
                {deliveryFee === 0 ? (
                  <span className="text-emerald-800 font-bold uppercase">Free</span>
                ) : (
                  `${settings.currencySymbol}${deliveryFee.toFixed(2)}`
                )}
              </span>
            </div>

            {deliveryFee > 0 && (
              <p className="text-[11px] text-[#A67C52] bg-[#F8F3EA] p-2 rounded-xl border border-[#C7A98A]/30">
                Add {settings.currencySymbol}{(settings.freeDeliveryThreshold - cartSubtotal).toFixed(2)} more for FREE shipping!
              </p>
            )}

            <div className="pt-3 border-t border-[#C7A98A]/40 flex justify-between text-base sm:text-lg font-bold text-[#3B2920]">
              <span>Total</span>
              <span>{settings.currencySymbol}{cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigateTo('checkout')}
            className="w-full py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-[#5A3E2B] hover:bg-[#A67C52] text-[#F8F3EA] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-[11px] text-[#5A3E2B]/80 justify-center">
            <ShieldCheck className="w-4 h-4 text-[#A67C52]" />
            <span>Secure checkout & order tracking included</span>
          </div>
        </div>
      </div>
    </div>
  );
};
