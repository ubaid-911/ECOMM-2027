import { useEffect, useState } from "react";
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
import { useOrderStore } from "../store/orderStore";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price || 0);

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const statusStyles = {
  Delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Shipped: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  Processing: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

const StatusIcon = ({ status }) => {
  if (status === "Delivered") return <CheckCircle2 size={15} />;
  if (status === "Shipped") return <Truck size={15} />;
  if (status === "Cancelled") return <XCircle size={15} />;

  return <Clock3 size={15} />;
};

function Orders() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [localStatuses, setLocalStatuses] = useState({});

  const usersOrder = useOrderStore((state) => state.usersOrder);
  const getOrderByUserId = useOrderStore((state) => state.getOrderByUserId);

  const filters = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

  useEffect(() => {
    try {
      const profile = JSON.parse(localStorage.getItem("profile") || "null");

      const userId = profile?.result?.id;

      if (userId) {
        getOrderByUserId(userId);
      }
    } catch (error) {
      console.error("Unable to fetch user orders:", error);
    }
  }, [getOrderByUserId]);

  // Map the API response into a structure the UI can use.
  const orders = (usersOrder || []).map((order) => {
    const items = (order.products || [])
      .filter((item) => item?.productsData)
      .map((item, index) => {
        const product = item.productsData;

        return {
          ...product,
          // Keep repeated products as separate entries if the API
          // returns them separately.
          uniqueKey: `${product.id}-${index}`,
          quantity: Number(product.quantity) || 0,
          price: Number(product.price) || 0,
          image: product.images?.[0] || "",
        };
      });

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return {
      id: order.id,
      created_at: order.created_at,
      items,
      total,
      status: localStatuses[order.id] || order.status || "Processing",
      payment: order.payment || "Pending",
      method: order.method || "Cash On Deleviry",
    };
  });

  // Search and status filtering.
  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      activeFilter === "All" || order.status === activeFilter;

    const searchText = search.toLowerCase();

    const matchesSearch =
      String(order.id).toLowerCase().includes(searchText) ||
      order.items.some((item) => item.name?.toLowerCase().includes(searchText));

    return matchesFilter && matchesSearch;
  });

  // Calculate statistics from the actual API data.
  const totalOrders = orders.length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered",
  ).length;

  const activeOrders = orders.filter(
    (order) => order.status === "Processing" || order.status === "Shipped",
  ).length;

  const totalSpent = orders
    .filter((order) => order.payment === "Paid")
    .reduce((sum, order) => sum + order.total, 0);

  // Demo-only cancellation: this does not update the database.
  const cancelOrder = (orderId) => {
    setLocalStatuses((previous) => ({
      ...previous,
      [orderId]: "Cancelled",
    }));
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <p className="text-violet-400 text-sm font-medium mb-2">
            Q STORE / ACCOUNT / ORDERS
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold">My Orders</h1>

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
            className="flex items-center justify-center sm:justify-start gap-3 p-4 rounded-2xl border border-violet-500/40 bg-violet-500/10 text-violet-300"
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

            <p className="text-xs text-gray-500 mt-2">Orders placed</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#101014] border border-white/10 hover:border-violet-500/30 transition">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-400">In Progress</p>
              <Truck size={20} className="text-sky-400" />
            </div>

            <h2 className="text-3xl font-bold">{activeOrders}</h2>

            <p className="text-xs text-gray-500 mt-2">Processing or shipped</p>
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
                  <span className="ml-2 opacity-70">{totalOrders}</span>
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
                0,
              );

              const firstItem = order.items[0];

              return (
                <div
                  key={order.id}
                  className="bg-[#101014] border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/30 transition duration-300"
                >
                  {/* Order Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 sm:p-6 border-b border-white/10">
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">ORDER ID</p>
                        <p className="font-semibold text-sm">#{order.id}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">ORDER DATE</p>

                        <p className="flex items-center gap-2 text-sm text-gray-300">
                          <CalendarDays size={15} className="text-violet-400" />
                          {formatDate(order.created_at)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">TOTAL</p>

                        <p className="font-semibold text-violet-400">
                          {formatPrice(order.total)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-start gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-medium ${
                          statusStyles[order.status] || statusStyles.Processing
                        }`}
                      >
                        <StatusIcon status={order.status} />
                        {order.status}
                      </span>

                      <button
                        onClick={() =>
                          setExpandedOrder(isExpanded ? null : order.id)
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
                              key={item.uniqueKey}
                              className="w-16 h-16 rounded-xl bg-[#191920] border-2 border-[#101014] overflow-hidden"
                            >
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package
                                    size={22}
                                    className="text-gray-500"
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        <div>
                          <h3 className="font-semibold text-sm sm:text-base">
                            {firstItem?.name || "Products unavailable"}

                            {order.items.length > 1 &&
                              ` + ${order.items.length - 1} more`}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            {itemCount} {itemCount === 1 ? "item" : "items"} in
                            this order
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          setExpandedOrder(isExpanded ? null : order.id)
                        }
                        className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition"
                      >
                        View order details
                        <ArrowRight size={16} />
                      </button>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <h4 className="font-semibold mb-4">Order Items</h4>

                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div
                              key={item.uniqueKey}
                              className="flex items-center gap-4"
                            >
                              <div className="w-16 h-16 shrink-0 rounded-xl bg-[#191920] overflow-hidden">
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Package
                                      size={22}
                                      className="text-gray-500"
                                    />
                                  </div>
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm">
                                  {item.name}
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
                                  Price: {formatPrice(item.price)}
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
                                  Quantity: {item.quantity}
                                </p>
                              </div>

                              <p className="font-semibold text-sm">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Payment and Total */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                          <div className="p-4 rounded-xl bg-[#191920] border border-white/5">
                            <p className="text-xs text-gray-500 mb-2">
                              PAYMENT METHOD
                            </p>

                            <p className="font-medium text-sm">
                              {order.method}
                            </p>

                            <p
                              className={`text-xs mt-2 ${
                                order.payment === "Refunded"
                                  ? "text-amber-400"
                                  : order.payment === "Paid"
                                    ? "text-emerald-400"
                                    : "text-gray-400"
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
                                "Connect your backend to create a return or replacement request.",
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
                <ShoppingBasket size={36} className="text-violet-400" />
              </div>

              <h2 className="text-xl font-bold mb-2">No orders found</h2>

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
            <h2 className="text-lg font-bold">Looking for something new?</h2>

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
