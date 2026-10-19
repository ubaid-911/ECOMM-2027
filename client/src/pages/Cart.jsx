import { useEffect, useState } from "react";
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
import { useCartStore } from "../store/cartStore";
import { useOrderStore } from "../store/orderStore";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price || 0);

const confettiColors = [
  "#a78bfa",
  "#8b5cf6",
  "#c4b5fd",
  "#34d399",
  "#fbbf24",
  "#f472b6",
];

function Cart() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const userCartData = useCartStore((state) => state.userCartData);
  const getCartByUserId = useCartStore((state) => state.getCartByUserId);
  const removeCartItem = useCartStore((state) => state.removeCartItem);
  const updateCart = useCartStore((state) => state.updateCart);
  const profile = JSON.parse(localStorage.getItem("profile"));
  const createOrder = useOrderStore((state) => state.createOrder);

  useEffect(() => {
    if (profile) {
      try {
        if (profile?.result?.id) {
          getCartByUserId(profile?.result?.id);
        }
      } catch (error) {
        console.error("Unable to read user profile:", error);
      }
    }
  }, [getCartByUserId]);
  console.log(userCartData, "I am user Cart ");

  // All calculations use Zustand cart data.
  const subtotal = userCartData.reduce(
    (total, item) =>
      total + Number(item?.products?.price || 0) * Number(item?.quantity || 1),
    0,
  );

  const originalTotal = userCartData.reduce(
    (total, item) =>
      total +
      Number(item?.products?.oldPrice ?? item?.products?.price ?? 0) *
        Number(item?.quantity || 1),
    0,
  );

  const discount = Math.max(0, originalTotal - subtotal);

  const delivery = subtotal === 0 || subtotal >= 999 ? 0 : 99;

  const total = subtotal + delivery;

  const totalQuantity = userCartData.reduce(
    (total, item) => total + Number(item?.quantity || 1),
    0,
  );

  // Separate function for increasing quantity.
  const handleIncrease = (cartItemId, quantity) => {
    if (quantity < 1) {
      return;
    }
    updateCart(cartItemId, { quantity: quantity + 1 });
  };

  // Separate function for decreasing quantity.
  const handleDecrease = (cartItemId, quantity) => {
    if (quantity < 1) {
      return;
    }
    updateCart(cartItemId, { quantity: quantity - 1 });
  };

  // Remove the cart row, not the product itself.
  const handleRemove = (cartItemId) => {
    removeCartItem(cartItemId);
  };

  const handleCheckout = () => {
    if (userCartData.length === 0) return;

    const myOrderData = {
      userId: profile?.result?.id,

      products: userCartData.map((item) => ({
        productsData: {
          ...item.products,
          quantity: item.quantity,
        },
      })),
    };
    createOrder(myOrderData);
    console.log(myOrderData);

    setPlacedOrder({
      total,
      quantity: totalQuantity,
      items: [...userCartData],
    });

    setOrderPlaced(true);
  };

  const closeOrderPopup = async () => {
    setOrderPlaced(false);

    if (placedOrder) {
      await Promise.all(
        placedOrder.items.map((item) => removeCartItem(item.id)),
      );
    }

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

            <h1 className="text-3xl sm:text-4xl font-bold">Shopping Cart</h1>

            <p className="text-gray-400 mt-2">
              {totalQuantity} {totalQuantity === 1 ? "item" : "items"} in your
              cart
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

        {/* Empty Cart */}
        {userCartData.length === 0 ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center text-center bg-[#101014] border border-white/10 rounded-3xl p-8">
            <div className="w-20 h-20 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-5">
              <ShoppingBag size={38} className="text-violet-400" />
            </div>

            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>

            <p className="text-gray-400 max-w-sm mb-7">
              Looks like you haven't added anything to your cart yet. Discover
              something you'll love.
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
              {userCartData.map((item) => (
                <div
                  key={item.id}
                  className="group bg-[#101014] border border-white/10 rounded-2xl p-4 sm:p-5 hover:border-violet-500/40 transition duration-300"
                >
                  <div className="flex gap-4 sm:gap-6">
                    {/* Product Image */}
                    <div className="w-28 h-32 sm:w-40 sm:h-40 shrink-0 rounded-xl bg-[#191920] overflow-hidden">
                      <img
                        src={
                          Array.isArray(item?.products?.images)
                            ? item.products.images[0]
                            : item?.products?.images
                        }
                        alt={item?.products?.name || "Product"}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base sm:text-xl font-semibold leading-snug">
                          {item?.products?.name}
                        </h3>

                        <p className="text-xs text-violet-400 mb-2 line-clamp-2">
                          {item?.products?.discription}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <span className="text-lg font-bold">
                            {formatPrice(item?.products?.price)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-5">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 bg-[#191920] border border-white/10 rounded-xl p-1">
                          <button
                            onClick={() =>
                              handleDecrease(item.id, item.quantity)
                            }
                            disabled={Number(item.quantity) <= 1}
                            aria-label={`Decrease ${item?.products?.name} quantity`}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <Minus size={15} />
                          </button>

                          <span className="w-5 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              handleIncrease(item.id, item.quantity)
                            }
                            aria-label={`Increase ${item?.products?.name} quantity`}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-violet-500/20 text-violet-400 transition"
                          >
                            <Plus size={15} />
                          </button>
                        </div>

                        {/* Remove Item */}
                        <button
                          onClick={() => handleRemove(item.id)}
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
                      {formatPrice(
                        Number(item?.products?.price || 0) *
                          Number(item?.quantity || 1),
                      )}
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
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between gap-3 text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-white">{formatPrice(subtotal)}</span>
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

                    <span
                      className={
                        delivery === 0 ? "text-emerald-400" : "text-white"
                      }
                    >
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
                  disabled={userCartData.length === 0}
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

      {/* Order Success Popup */}
      {orderPlaced && placedOrder && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
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
          <div className="relative w-full max-w-md bg-[#101014] border border-violet-500/30 rounded-3xl p-6 sm:p-9 text-center shadow-2xl shadow-violet-950/40">
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
              Woohoo! Your order has been placed successfully. Thank you for
              shopping with us!
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
                <span className="font-medium">{placedOrder.quantity}</span>
              </div>

              <div className="border-t border-white/10 pt-3 flex justify-between gap-3 items-center">
                <span className="text-gray-300 font-medium">Amount paid</span>

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
                onClick={async () => {
                  await closeOrderPopup();
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
