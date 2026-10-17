
import { useState } from "react";
import {
  Star,
  ShoppingCart,
  ArrowRight,
  Heart,
  Check,
} from "lucide-react";

const products = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    category: "Audio",
    price: 2499,
    oldPrice: 3499,
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",
    badge: "BESTSELLER",
  },
  {
    id: 2,
    title: "Minimal Classic Watch",
    category: "Accessories",
    price: 1899,
    oldPrice: 2599,
    rating: 4.6,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85",
    badge: "POPULAR",
  },
  {
    id: 3,
    title: "Everyday Travel Backpack",
    category: "Lifestyle",
    price: 1499,
    oldPrice: 1999,
    rating: 4.7,
    reviews: 76,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",
    badge: "TRENDING",
  },
  {
    id: 4,
    title: "Sport Edition Sneakers",
    category: "Footwear",
    price: 2199,
    oldPrice: 2999,
    rating: 4.9,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
    badge: "TOP RATED",
  },
];

const AllProducts = () => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [addedProduct, setAddedProduct] = useState(null);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product.id]);
    setAddedProduct(product.id);

    setTimeout(() => {
      setAddedProduct((prev) =>
        prev === product.id ? null : prev
      );
    }, 1500);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const buyNow = (product) => {
    console.log("Buy now:", product);
    // Add your checkout navigation here.
  };

  return (
    <section className="min-h-screen bg-[#0b0b0f] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1 w-7 rounded-full bg-violet-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Explore Our Collection
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            All <span className="text-violet-400">Products</span>
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Discover our collection of everyday essentials.
          </p>
        </div>

        {/* Exactly Four Product Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101014] transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-950/20"
            >
              {/* Product Image */}
              <div className="relative m-2 overflow-hidden rounded-xl bg-[#191920]">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-52"
                />

                <span className="absolute left-3 top-3 rounded-md border border-violet-400/20 bg-[#171322]/95 px-2 py-1 text-[9px] font-bold tracking-wider text-violet-300">
                  {product.badge}
                </span>

                {/* Favorite */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  aria-label="Toggle favorite"
                  className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 backdrop-blur-md transition ${
                    favorites.includes(product.id)
                      ? "bg-violet-600 text-white"
                      : "bg-black/50 text-gray-300 hover:bg-violet-600 hover:text-white"
                  }`}
                >
                  <Heart
                    size={17}
                    fill={
                      favorites.includes(product.id)
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-4 pt-2">
                <p className="text-xs font-medium text-violet-400">
                  {product.category}
                </p>

                <h2 className="mt-2 min-h-10 text-sm font-semibold leading-5 text-gray-100 transition group-hover:text-violet-300">
                  {product.title}
                </h2>

                {/* Dynamic Rating */}
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={13}
                        className={
                          product.rating >= star
                            ? "fill-amber-400 text-amber-400"
                            : product.rating >= star - 0.5
                              ? "fill-amber-400/50 text-amber-400"
                              : "text-gray-700"
                        }
                      />
                    ))}
                  </div>

                  <span className="text-xs font-semibold text-gray-300">
                    {product.rating.toFixed(1)}
                  </span>

                  <span className="text-xs text-gray-600">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xl font-bold text-white">
                    {formatPrice(product.price)}
                  </span>

                  <span className="text-xs text-gray-500 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => buyNow(product)}
                    className="flex items-center justify-center gap-1 rounded-lg bg-violet-600 px-2 py-2.5 text-xs font-semibold text-white transition hover:bg-violet-500 sm:text-sm"
                  >
                    Buy Now
                    <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={() => addToCart(product)}
                    className="flex items-center justify-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-2.5 text-xs font-semibold text-gray-300 transition hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300 sm:text-sm"
                  >
                    {addedProduct === product.id ? (
                      <>
                        <Check size={15} />
                        Added
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={15} />
                        Add Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Cart Feedback */}
        {cart.length > 0 && (
          <div className="mt-6 flex items-center justify-between rounded-xl border border-violet-500/20 bg-violet-500/[0.06] px-4 py-3">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-violet-300">
                {cart.length}
              </span>{" "}
              items added to your cart.
            </p>

            <a
              href="/cart"
              className="text-sm font-semibold text-violet-400 transition hover:text-violet-300"
            >
              View Cart →
            </a>
          </div>
        )}

      </div>
    </section>
  );
};

export default AllProducts;
