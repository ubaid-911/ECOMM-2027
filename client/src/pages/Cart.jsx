
import { useState } from "react";
import {
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  ShieldCheck,
  Truck,
  Tag,
  ShoppingCart,
  Check,
  PartyPopper,
  Heart,
  Home,
  X,
  Sparkles,
} from "lucide-react";

const initialCart = [
  {
    id: 1,
    name: "Premium Smart Watch",
    category: "Wearables",
    price: 4999,
    oldPrice: 6999,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    category: "Audio",
    price: 2499,
    oldPrice: 3499,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const confettiColors = [
  "#a78bfa",
  "#8b5cf6",
  "#c4b5fd",
  "#34d399",
  "#fbbf24",
  "#f472b6",
];

function Cart() {
  const [cartItems, setCartItems] = useState(initialCart);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  // Automatic price calculations
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const originalTotal = cartItems.reduce(
    (total, item) => total + item.oldPrice * item.quantity,
    0
  );

  const discount = originalTotal - subtotal;
  const delivery = subtotal === 0 || subtotal >= 999 ? 0 : 99;
  const total = subtotal + delivery;

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Show order success popup
  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    setPlacedOrder({
      total,
      quantity: totalQuantity,
      items: cartItems,
    });

    setOrderPlaced(true);
  };

  // Close popup and reset cart after the simulated order
  const closeOrderPopup = () => {
    setOrderPlaced(false);
    setCartItems([]);
    setPlacedOrder(null);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-violet-400 text-sm font-medium mb-2">
              NOVASTORE / CART
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold">
              Shopping Cart
            </h1>

            <p className="text-gray-400 mt-2">
              {totalQuantity}{" "}
              {totalQuantity === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <a
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-violet-400 transition"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </a>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="min-h-[400px] flex flex-col items-center justify-center text-center bg-[#101014] border border-white/10 rounded-3xl p-8">
            <div className="w-20 h-20 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-5">
              <ShoppingBag size={38} className="text-violet-400" />
            </div>

            <h2 className="text-2xl font-bold mb-2">
              Your cart is empty
            </h2>

            <p className="text-gray-400 max-w-sm mb-7">
              Looks like you haven't added anything to your cart yet.
              Discover something you'll love.
            </p>

            <a
              href="/products"
              className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 transition font-semibold"
            >
              Explore Products
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-[#101014] border border-white/10 rounded-2xl p-4 sm:p-5 hover:border-violet-500/40 transition duration-300 animate-[promoFade_0.5s_ease-out]"
                >
                  <div className="flex gap-4 sm:gap-6">

                    {/* Product Image */}
                    <div className="w-28 h-32 sm:w-40 sm:h-40 shrink-0 rounded-xl bg-[#191920] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <p className="text-xs text-violet-400 mb-2">
                          {item.category}
                        </p>

                        <h3 className="text-base sm:text-xl font-semibold leading-snug">
                          {item.name}
                        </h3>

                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <span className="text-lg font-bold">
                            {formatPrice(item.price)}
                          </span>

                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(item.oldPrice)}
                          </span>

                          <span className="text-xs text-emerald-400">
                            Save {formatPrice(item.oldPrice - item.price)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-5">

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 bg-[#191920] border border-white/10 rounded-xl p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label={`Decrease ${item.name} quantity`}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition"
                          >
                            <Minus size={15} />
                          </button>

                          <span className="w-5 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label={`Increase ${item.name} quantity`}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-violet-500/20 text-violet-400 transition"
                          >
                            <Plus size={15} />
                          </button>
                        </div>

                        {/* Remove Item */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition text-sm"
                        >
                          <Trash2 size={16} />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="border-t border-white/10 mt-4 pt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      Item total ({item.quantity})
                    </span>

                    <span className="font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#101014] border border-white/10">
                  <Truck className="text-violet-400 shrink-0" size={22} />
                  <div>
                    <p className="text-sm font-medium">Free Delivery</p>
                    <p className="text-xs text-gray-500">
                      On orders of ₹999 or more
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#101014] border border-white/10">
                  <ShieldCheck className="text-violet-400 shrink-0" size={22} />
                  <div>
                    <p className="text-sm font-medium">Secure Shopping</p>
                    <p className="text-xs text-gray-500">
                      Safe and secure checkout
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 bg-[#101014] border border-white/10 rounded-2xl p-5 sm:p-6">
                <h2 className="text-xl font-bold mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between gap-3 text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-white">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 text-gray-400">
                    <span className="flex items-center gap-2">
                      <Tag size={15} className="text-emerald-400" />
                      Product Discount
                    </span>

                    <span className="text-emerald-400">
                      -{formatPrice(discount)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 text-gray-400">
                    <span>Delivery Charges</span>

                    <span className={delivery === 0 ? "text-emerald-400" : "text-white"}>
                      {delivery === 0 ? "FREE" : formatPrice(delivery)}
                    </span>
                  </div>

                  {subtotal > 0 && subtotal < 999 && (
                    <p className="text-xs text-violet-400">
                      Add {formatPrice(999 - subtotal)} more for free delivery.
                    </p>
                  )}

                  <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                    <span className="text-base font-semibold">
                      Total Amount
                    </span>

                    <span className="text-2xl font-bold text-violet-400">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500">
                    You save {formatPrice(discount)} on this order.
                  </p>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  className="w-full mt-7 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 active:scale-[0.98] transition font-semibold shadow-lg shadow-violet-900/20 disabled:opacity-50"
                >
                  <ShoppingCart size={18} />
                  Proceed to Checkout
                </button>

                <div className="flex justify-center items-center gap-2 mt-4 text-xs text-gray-500">
                  <ShieldCheck size={15} />
                  Secure checkout
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* ORDER SUCCESS POPUP */}
      {orderPlaced && placedOrder && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-[promoFade_0.3s_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-success-title"
        >
          {/* Confetti */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 45 }, (_, index) => (
              <span
                key={index}
                className="absolute top-[-20px] w-2 h-3 rounded-sm animate-[confettiFall_3s_ease-in_forwards]"
                style={{
                  left: `${(index * 37) % 100}%`,
                  backgroundColor:
                    confettiColors[index % confettiColors.length],
                  animationDelay: `${(index % 15) * 0.12}s`,
                  animationDuration: `${2.5 + (index % 4) * 0.5}s`,
                  transform: `rotate(${index * 27}deg)`,
                }}
              />
            ))}
          </div>

          {/* Popup Card */}
          <div className="relative w-full max-w-md bg-[#101014] border border-violet-500/30 rounded-3xl p-6 sm:p-9 text-center shadow-2xl shadow-violet-950/40 animate-[successPop_0.45s_ease-out]">

            {/* Close Button */}
            <button
              onClick={closeOrderPopup}
              aria-label="Close order confirmation"
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition"
            >
              <X size={19} />
            </button>

            {/* Success Icon */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-violet-500/20 animate-ping" />

              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Check size={46} strokeWidth={3} className="text-white" />
              </div>

              <Sparkles
                size={25}
                className="absolute -top-2 -right-3 text-violet-300 animate-pulse"
              />

              <PartyPopper
                size={25}
                className="absolute -bottom-1 -left-4 text-amber-300"
              />
            </div>

            <p className="text-violet-400 text-sm font-semibold tracking-[0.2em] mb-3">
              NOVASTORE
            </p>

            <h2
              id="order-success-title"
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              Order Placed!
            </h2>

            <p className="text-gray-400 text-sm leading-6 mb-6">
              Woohoo! Your order has been placed successfully.
              Thank you for shopping with us!
            </p>

            {/* Order Details */}
            <div className="bg-[#191920] border border-white/10 rounded-2xl p-4 mb-6 text-left space-y-3">
              <div className="flex justify-between gap-3 text-sm">
                <span className="text-gray-400">Order status</span>

                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Successful
                </span>
              </div>

              <div className="flex justify-between gap-3 text-sm">
                <span className="text-gray-400">Total items</span>

                <span className="font-medium">
                  {placedOrder.quantity}
                </span>
              </div>

              <div className="border-t border-white/10 pt-3 flex justify-between gap-3 items-center">
                <span className="text-gray-300 font-medium">
                  Amount paid
                </span>

                <span className="text-xl font-bold text-violet-400">
                  {formatPrice(placedOrder.total)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={closeOrderPopup}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 active:scale-[0.98] transition font-semibold shadow-lg shadow-violet-900/20"
              >
                <Heart size={18} />
                Do More Shopping
              </button>

              <button
                onClick={() => {
                  closeOrderPopup();
                  window.location.href = "/";
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition font-semibold"
              >
                <Home size={18} />
                Go Home
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-5">
              Thank you for choosing NovaStore ✨
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
