
import { useState } from "react";
import {
  UserRound,
  ShoppingBag,
  ShoppingCart,
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock3,
  XCircle,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  CreditCard,
  ArrowRight,
  RotateCcw,
  ShoppingBasket,
} from "lucide-react";

const initialOrders = [
  {
    id: "NS-2026-1001",
    date: "2026-10-12",
    status: "Delivered",
    payment: "Paid",
    method: "UPI",
    total: 4999,
    items: [
      {
        id: 1,
        name: "Premium Smart Watch",
        category: "Wearables",
        price: 4999,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      },
    ],
  },
  {
    id: "NS-2026-1002",
    date: "2026-10-14",
    status: "Shipped",
    payment: "Paid",
    method: "Credit Card",
    total: 4998,
    items: [
      {
        id: 2,
        name: "Wireless Headphones",
        category: "Audio",
        price: 2499,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      },
    ],
  },
  {
    id: "NS-2026-1003",
    date: "2026-10-16",
    status: "Processing",
    payment: "Paid",
    method: "UPI",
    total: 3499,
    items: [
      {
        id: 3,
        name: "Premium Sneakers",
        category: "Footwear",
        price: 3499,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      },
    ],
  },
  {
    id: "NS-2026-1004",
    date: "2026-10-17",
    status: "Cancelled",
    payment: "Refunded",
    method: "UPI",
    total: 1999,
    items: [
      {
        id: 4,
        name: "Everyday Backpack",
        category: "Accessories",
        price: 1999,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      },
    ],
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const statusStyles = {
  Delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Shipped: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  Processing: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

const StatusIcon = ({ status }) => {
  if (status === "Delivered") {
    return <CheckCircle2 size={15} />;
  }

  if (status === "Shipped") {
    return <Truck size={15} />;
  }

  if (status === "Cancelled") {
    return <XCircle size={15} />;
  }

  return <Clock3 size={15} />;
};

function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const filters = [
    "All",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      activeFilter === "All" || order.status === activeFilter;

    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );

    return matchesFilter && matchesSearch;
  });

  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const activeOrders = orders.filter(
    (order) =>
      order.status === "Processing" || order.status === "Shipped"
  ).length;

  const totalSpent = orders
    .filter((order) => order.payment === "Paid")
    .reduce((sum, order) => sum + order.total, 0);

  // Demo cancellation action for processing orders.
  const cancelOrder = (orderId) => {
    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: "Cancelled" }
          : order
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-violet-400 text-sm font-medium mb-2">
            NOVASTORE / ACCOUNT / ORDERS
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold">
            My Orders
          </h1>

          <p className="text-gray-400 mt-2">
            Track your purchases and manage your orders.
          </p>
        </div>

        {/* Account Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          <a
            href="/profile"
            className="flex items-center justify-center sm:justify-start gap-3 p-4 rounded-2xl border border-white/10 bg-[#101014] text-gray-300 hover:border-violet-500/40 hover:text-violet-300 transition"
          >
            <UserRound size={20} />
            <span className="text-sm font-medium">My Profile</span>
          </a>

          <a
            href="/orders"
            className="flex items-center justify-center sm:justify-start gap-3 p-4 rounded-2xl border border-violet-500/40 bg-violet-500/10 text-violet-300 transition"
          >
            <ShoppingBag size={20} />
            <span className="text-sm font-medium">My Orders</span>
          </a>

          <a
            href="/cart"
            className="col-span-2 sm:col-span-1 flex items-center justify-center sm:justify-start gap-3 p-4 rounded-2xl border border-white/10 bg-[#101014] text-gray-300 hover:border-violet-500/40 hover:text-violet-300 transition"
          >
            <ShoppingCart size={20} />
            <span className="text-sm font-medium">My Cart</span>
          </a>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-[#101014] border border-white/10 hover:border-violet-500/30 transition">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-400">Total Orders</p>
              <Package size={20} className="text-violet-400" />
            </div>

            <h2 className="text-3xl font-bold">{totalOrders}</h2>

            <p className="text-xs text-gray-500 mt-2">
              Orders placed
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#101014] border border-white/10 hover:border-violet-500/30 transition">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-400">In Progress</p>
              <Truck size={20} className="text-sky-400" />
            </div>

            <h2 className="text-3xl font-bold">{activeOrders}</h2>

            <p className="text-xs text-gray-500 mt-2">
              Processing or shipped
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#101014] border border-white/10 hover:border-violet-500/30 transition">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-400">Total Paid</p>
              <CreditCard size={20} className="text-emerald-400" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-violet-400">
              {formatPrice(totalSpent)}
            </h2>

            <p className="text-xs text-gray-500 mt-2">
              {deliveredOrders} delivered{" "}
              {deliveredOrders === 1 ? "order" : "orders"}
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-[#101014] border border-white/10 rounded-2xl p-4 sm:p-5 mb-6">
          <div className="relative mb-5">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order ID or product name..."
              className="w-full bg-[#191920] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-violet-500 transition placeholder-gray-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition border ${
                  activeFilter === filter
                    ? "bg-violet-600 border-violet-500 text-white"
                    : "bg-[#191920] border-white/10 text-gray-400 hover:text-white hover:border-violet-500/40"
                }`}
              >
                {filter}
                {filter === "All" && (
                  <span className="ml-2 opacity-70">
                    {totalOrders}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-5">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const isExpanded = expandedOrder === order.id;

              const itemCount = order.items.reduce(
                (sum, item) => sum + item.quantity,
                0
              );

              return (
                <div
                  key={order.id}
                  className="bg-[#101014] border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/30 transition duration-300"
                >
                  {/* Order Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 sm:p-6 border-b border-white/10">
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          ORDER ID
                        </p>
                        <p className="font-semibold text-sm">
                          {order.id}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          ORDER DATE
                        </p>
                        <p className="flex items-center gap-2 text-sm text-gray-300">
                          <CalendarDays
                            size={15}
                            className="text-violet-400"
                          />
                          {formatDate(order.date)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          TOTAL
                        </p>
                        <p className="font-semibold text-violet-400">
                          {formatPrice(order.total)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-start gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-medium ${
                          statusStyles[order.status]
                        }`}
                      >
                        <StatusIcon status={order.status} />
                        {order.status}
                      </span>

                      <button
                        onClick={() =>
                          setExpandedOrder(
                            isExpanded ? null : order.id
                          )
                        }
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#191920] border border-white/10 text-sm text-gray-300 hover:text-violet-300 hover:border-violet-500/40 transition"
                      >
                        Details
                        {isExpanded ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Product Preview */}
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                          {order.items.slice(0, 3).map((item) => (
                            <div
                              key={item.id}
                              className="w-16 h-16 rounded-xl bg-[#191920] border-2 border-[#101014] overflow-hidden"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>

                        <div>
                          <h3 className="font-semibold text-sm sm:text-base">
                            {order.items[0].name}
                            {order.items.length > 1 &&
                              ` + ${order.items.length - 1} more`}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            {itemCount}{" "}
                            {itemCount === 1 ? "item" : "items"} in this
                            order
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          setExpandedOrder(
                            isExpanded ? null : order.id
                          )
                        }
                        className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition"
                      >
                        View order details
                        <ArrowRight size={16} />
                      </button>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-white/10 animate-[promoFade_0.3s_ease-out]">
                        <h4 className="font-semibold mb-4">
                          Order Items
                        </h4>

                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-4"
                            >
                              <div className="w-16 h-16 shrink-0 rounded-xl bg-[#191920] overflow-hidden">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm">
                                  {item.name}
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
                                  {item.category} · Qty: {item.quantity}
                                </p>
                              </div>

                              <p className="font-semibold text-sm">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                          <div className="p-4 rounded-xl bg-[#191920] border border-white/5">
                            <p className="text-xs text-gray-500 mb-2">
                              PAYMENT METHOD
                            </p>

                            <p className="text-sm font-medium">
                              {order.method}
                            </p>

                            <p
                              className={`text-xs mt-2 ${
                                order.payment === "Refunded"
                                  ? "text-amber-400"
                                  : "text-emerald-400"
                              }`}
                            >
                              {order.payment}
                            </p>
                          </div>

                          <div className="p-4 rounded-xl bg-[#191920] border border-white/5">
                            <p className="text-xs text-gray-500 mb-2">
                              ORDER TOTAL
                            </p>

                            <p className="text-xl font-bold text-violet-400">
                              {formatPrice(order.total)}
                            </p>
                          </div>
                        </div>

                        {order.status === "Processing" && (
                          <button
                            onClick={() => cancelOrder(order.id)}
                            className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 transition text-sm"
                          >
                            <XCircle size={16} />
                            Cancel Order
                          </button>
                        )}

                        {order.status === "Delivered" && (
                          <button
                            onClick={() =>
                              alert(
                                "Connect your backend to create a return or replacement request."
                              )
                            }
                            className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-[#191920] text-gray-300 hover:text-violet-300 hover:border-violet-500/40 transition text-sm"
                          >
                            <RotateCcw size={16} />
                            Return / Replace
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            /* No Results */
            <div className="min-h-[320px] flex flex-col items-center justify-center text-center bg-[#101014] border border-white/10 rounded-3xl p-8">
              <div className="w-20 h-20 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-5">
                <ShoppingBasket
                  size={36}
                  className="text-violet-400"
                />
              </div>

              <h2 className="text-xl font-bold mb-2">
                No orders found
              </h2>

              <p className="text-gray-400 text-sm max-w-sm mb-6">
                Try another search or select a different order status.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setActiveFilter("All");
                }}
                className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 transition font-semibold text-sm"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Continue Shopping */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-violet-950/40 to-[#101014] border border-violet-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <h2 className="text-lg font-bold">
              Looking for something new?
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Explore our latest products and deals.
            </p>
          </div>

          <a
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 transition font-semibold text-sm"
          >
            Continue Shopping
            <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Orders;
