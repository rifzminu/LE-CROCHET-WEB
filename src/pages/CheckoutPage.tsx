import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, ShieldCheck, CreditCard, Banknote, Sparkles } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, deliveryFee, cartTotal, placeOrder, navigateTo, settings } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'gateway'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <p className="text-sm text-[#5A3E2B]">Your cart is empty.</p>
        <button
          onClick={() => navigateTo('shop')}
          className="bg-[#5A3E2B] text-[#F8F3EA] px-6 py-2.5 rounded-full text-xs font-semibold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim() || !phone.trim() || !address.trim() || !city.trim() || !pincode.trim()) {
      setErrorMsg('Please fill in all required delivery details.');
      return;
    }

    setIsSubmitting(true);

    try {
      const order = placeOrder({
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        address: address.trim(),
        city: city.trim(),
        state: state.trim() || 'N/A',
        pincode: pincode.trim(),
        orderNotes: orderNotes.trim() || undefined,
        items: [...cart],
        paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment (Razorpay/UPI Ready)',
      });

      navigateTo('order-confirmation', { orderId: order.id });
    } catch (err) {
      setErrorMsg('There was an error processing your order. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="flex items-center justify-between border-b border-[#E8DCCB] pb-4">
        <button
          onClick={() => navigateTo('cart')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A3E2B] hover:text-[#A67C52] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Basket</span>
        </button>
        <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#3B2920]">
          Checkout
        </h1>
        <span className="text-xs text-[#A67C52] font-semibold">Step 2 of 2</span>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Delivery Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#F8F3EA] rounded-3xl border border-[#E8DCCB] p-6 sm:p-8 space-y-4">
            <h2 className="font-serif-heading text-xl font-bold text-[#3B2920] border-b border-[#E8DCCB] pb-3">
              Shipping & Contact Details
            </h2>

            {errorMsg && (
              <div className="bg-red-50 text-red-700 text-xs px-4 py-2.5 rounded-xl border border-red-200">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#3B2920] uppercase tracking-wide mb-1">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Emma Watson"
                  className="w-full bg-[#F8F3EA] border border-[#E8DCCB] focus:border-[#A67C52] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#3B2920] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B2920] uppercase tracking-wide mb-1">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +1 (555) 345-6789"
                  className="w-full bg-[#F8F3EA] border border-[#E8DCCB] focus:border-[#A67C52] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#3B2920] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3B2920] uppercase tracking-wide mb-1">
                Email Address <span className="text-[#A67C52] text-[10px] font-normal">(Optional for updates)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. emma@example.com"
                className="w-full bg-[#F8F3EA] border border-[#E8DCCB] focus:border-[#A67C52] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#3B2920] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3B2920] uppercase tracking-wide mb-1">
                Street Address <span className="text-red-600">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House / Flat / Apartment, Street, Landmark"
                className="w-full bg-[#F8F3EA] border border-[#E8DCCB] focus:border-[#A67C52] rounded-xl p-3 text-xs sm:text-sm text-[#3B2920] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#3B2920] uppercase tracking-wide mb-1">
                  City <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="w-full bg-[#F8F3EA] border border-[#E8DCCB] focus:border-[#A67C52] rounded-xl px-3 py-2 text-xs text-[#3B2920] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#3B2920] uppercase tracking-wide mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State"
                  className="w-full bg-[#F8F3EA] border border-[#E8DCCB] focus:border-[#A67C52] rounded-xl px-3 py-2 text-xs text-[#3B2920] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#3B2920] uppercase tracking-wide mb-1">
                  PIN Code <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="PIN code"
                  className="w-full bg-[#F8F3EA] border border-[#E8DCCB] focus:border-[#A67C52] rounded-xl px-3 py-2 text-xs text-[#3B2920] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3B2920] uppercase tracking-wide mb-1">
                Order Notes / Gift Message <span className="text-[#A67C52] text-[10px] font-normal">(Optional)</span>
              </label>
              <textarea
                rows={2}
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Any special gift packaging or delivery requests"
                className="w-full bg-[#F8F3EA] border border-[#E8DCCB] focus:border-[#A67C52] rounded-xl p-3 text-xs text-[#3B2920] focus:outline-none"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-[#F8F3EA] rounded-3xl border border-[#E8DCCB] p-6 space-y-3">
            <h3 className="font-serif-heading text-lg font-bold text-[#3B2920]">
              Select Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'bg-[#E8DCCB] border-[#5A3E2B] shadow-xs'
                    : 'bg-[#F8F3EA] border-[#E8DCCB] hover:border-[#C7A98A]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="text-[#5A3E2B] focus:ring-[#A67C52]"
                />
                <div className="flex items-center gap-2">
                  <Banknote className="w-4 h-4 text-[#5A3E2B]" />
                  <div>
                    <p className="text-xs font-bold text-[#3B2920]">Cash on Delivery</p>
                    <p className="text-[10px] text-[#5A3E2B]/70">Pay when delivered</p>
                  </div>
                </div>
              </label>

              <label
                className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'gateway'
                    ? 'bg-[#E8DCCB] border-[#5A3E2B] shadow-xs'
                    : 'bg-[#F8F3EA] border-[#E8DCCB] hover:border-[#C7A98A]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'gateway'}
                  onChange={() => setPaymentMethod('gateway')}
                  className="text-[#5A3E2B] focus:ring-[#A67C52]"
                />
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#A67C52]" />
                  <div>
                    <p className="text-xs font-bold text-[#3B2920]">UPI / Card / NetBanking</p>
                    <p className="text-[10px] text-[#5A3E2B]/70">Razorpay / Stripe Gateway</p>
                  </div>
                </div>
              </label>
            </div>

            {paymentMethod === 'gateway' && settings.paymentUpiId && (
              <div className="p-3.5 bg-[#E8DCCB] rounded-2xl border border-[#C7A98A] text-xs text-[#3B2920] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold">Store UPI ID:</span>
                  <code className="bg-[#F8F3EA] px-2.5 py-1 rounded-md font-mono font-bold text-[#5A3E2B] border border-[#C7A98A]/50">
                    {settings.paymentUpiId}
                  </code>
                </div>
                {settings.paymentInstructions && (
                  <p className="text-[11px] text-[#5A3E2B]/85 leading-relaxed">
                    {settings.paymentInstructions}
                  </p>
                )}
              </div>
            )}

            <p className="text-[11px] text-[#5A3E2B]/70 pt-1">
              Payment gateway integration architecture is in place and connects securely without storing card information.
            </p>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#E8DCCB]/40 border border-[#C7A98A]/50 rounded-3xl p-6 space-y-4">
            <h2 className="font-serif-heading text-xl font-bold text-[#3B2920] border-b border-[#C7A98A]/30 pb-3">
              Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 text-xs border-b border-[#E8DCCB]/50 pb-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#5A3E2B] text-[#F8F3EA] text-[10px] flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>
                    <div>
                      <p className="font-semibold text-[#3B2920] line-clamp-1">{item.product.name}</p>
                      {item.selectedColor && (
                        <p className="text-[10px] text-[#A67C52]">{item.selectedColor}</p>
                      )}
                    </div>
                  </div>
                  <span className="font-bold text-[#3B2920]">
                    {settings.currencySymbol}{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2 text-xs text-[#5A3E2B]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{settings.currencySymbol}{cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {deliveryFee === 0 ? 'FREE' : `${settings.currencySymbol}${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#C7A98A]/40 flex justify-between text-base font-bold text-[#3B2920]">
                <span>Total Amount</span>
                <span>{settings.currencySymbol}{cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-[#5A3E2B] hover:bg-[#A67C52] text-[#F8F3EA] shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#5A3E2B]/80 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A67C52]" />
              <span>We'll confirm your order on phone or WhatsApp</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
