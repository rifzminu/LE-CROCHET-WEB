import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, ShoppingBag, ArrowRight, Instagram, PackageCheck, Clock } from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { orders, latestOrderId, navigateTo, settings } = useStore();

  const order =
    orders.find((o) => o.id === latestOrderId) || (orders.length > 0 ? orders[0] : null);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <p className="text-sm text-[#5A3E2B]">No recent order found.</p>
        <button
          onClick={() => navigateTo('shop')}
          className="bg-[#5A3E2B] text-[#F8F3EA] px-6 py-2.5 rounded-full text-xs font-semibold"
        >
          Browse Shop
        </button>
      </div>
    );
  }

  const statusSteps = [
    'Order Received',
    'Confirmed',
    'In Progress',
    'Ready',
    'Shipped',
    'Delivered',
  ];

  const currentStepIndex = statusSteps.indexOf(order.status) !== -1
    ? statusSteps.indexOf(order.status)
    : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Confirmation Banner */}
      <div className="bg-[#E8DCCB] rounded-3xl border border-[#C7A98A] p-8 sm:p-10 text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-[#5A3E2B] text-[#F8F3EA] flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-9 h-9 text-[#C7A98A]" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#A67C52]">
            Order #{order.id}
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#3B2920] mt-1">
            Order Placed Successfully!
          </h1>
          <p className="text-xs sm:text-sm text-[#5A3E2B] mt-2 max-w-md mx-auto leading-relaxed">
            Thank you for supporting our handmade crochet craft. We're carefully getting your handmade items ready.
          </p>
        </div>

        {/* Status Tracker */}
        <div className="pt-6 border-t border-[#C7A98A]/50">
          <div className="flex items-center justify-between text-[10px] sm:text-xs font-semibold text-[#3B2920] mb-2 px-1">
            <span>Status:</span>
            <span className="bg-[#5A3E2B] text-[#F8F3EA] px-2.5 py-0.5 rounded-full">
              {order.status}
            </span>
          </div>

          <div className="w-full bg-[#F8F3EA] h-2 rounded-full overflow-hidden border border-[#C7A98A]/40">
            <div
              className="bg-[#A67C52] h-full transition-all duration-500 rounded-full"
              style={{
                width: `${Math.max(15, ((currentStepIndex + 1) / statusSteps.length) * 100)}%`,
              }}
            />
          </div>

          <div className="flex justify-between text-[10px] text-[#5A3E2B]/70 pt-2 overflow-x-auto">
            <span>Received</span>
            <span>Confirmed</span>
            <span>Crafting</span>
            <span>Shipped</span>
            <span>Delivered</span>
          </div>
        </div>
      </div>

      {/* Order Details Breakdown */}
      <div className="bg-[#F8F3EA] rounded-3xl border border-[#E8DCCB] p-6 sm:p-8 space-y-6">
        <h2 className="font-serif-heading text-xl font-bold text-[#3B2920] border-b border-[#E8DCCB] pb-3">
          Order Summary
        </h2>

        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-[#E8DCCB]/40">
              <div>
                <span className="font-semibold text-[#3B2920]">
                  {item.quantity}x {item.product.name}
                </span>
                {item.selectedColor && (
                  <span className="text-[11px] text-[#A67C52] ml-2">({item.selectedColor})</span>
                )}
              </div>
              <span className="font-bold text-[#3B2920]">
                {settings.currencySymbol}{(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-1.5 text-xs text-[#5A3E2B] pt-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{settings.currencySymbol}{order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{order.deliveryCharge === 0 ? 'FREE' : `${settings.currencySymbol}${order.deliveryCharge.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between font-bold text-[#3B2920] text-sm pt-2 border-t border-[#E8DCCB]">
            <span>Total Paid / Due</span>
            <span>{settings.currencySymbol}{order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Customer & Shipping summary */}
        <div className="bg-[#E8DCCB]/30 rounded-2xl p-4 text-xs text-[#5A3E2B] space-y-1.5">
          <p className="font-bold text-[#3B2920]">Delivery To:</p>
          <p>{order.customerName} • {order.phone}</p>
          <p>{order.address}, {order.city}, {order.state} {order.pincode}</p>
          <p><span className="text-[#A67C52] font-semibold">Payment:</span> {order.paymentMethod}</p>
          {order.orderNotes && <p><span className="font-semibold">Notes:</span> {order.orderNotes}</p>}
        </div>

        {/* Action buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto flex-1 bg-[#5A3E2B] hover:bg-[#A67C52] text-[#F8F3EA] py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors text-center shadow-md cursor-pointer"
          >
            Continue Shopping
          </button>
          <a
            href={settings.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 bg-[#E8DCCB] hover:bg-[#C7A98A]/40 text-[#3B2920] border border-[#C7A98A] py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors text-center flex items-center justify-center gap-1.5"
          >
            <Instagram className="w-4 h-4 text-[#A67C52]" />
            <span>DM on Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
};
