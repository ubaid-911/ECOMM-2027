import { useState, useEffect } from "react";
import {
  Star,
  ShoppingCart,
  ArrowRight,
  Heart,
  Check,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Headphones,
  Sparkles,

} from "lucide-react";
import PromoHero from "../components/PromoHero";
import { useProductsStore } from "../store/productsStore";
import { useParams } from "react-router-dom";
import Loader from "../components/Loder";

// const product = {
//   id: 1,
//   title: "Premium Wireless Headphones",
//   category: "Audio & Accessories",
//   price: 2499,
//   oldPrice: 3499,
//   rating: 4.8,
//   reviews: 124,
//   description:
//     "Experience exceptional sound with premium wireless headphones designed for everyday comfort. Enjoy immersive audio, powerful bass, advanced noise isolation, and a long-lasting battery in a sleek, modern design.",
//   colors: [
//     { name: "Black", value: "#171717" },
//     { name: "Violet", value: "#8b5cf6" },
//     { name: "Silver", value: "#cbd5e1" },
//   ],
//   images: [
//     "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85",
//     "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=85",
//     "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=85",
//     "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=85",
//   ],
// };

const similarProducts = [
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
  {
    id: 5,
    title: "Wireless Audio Headset",
    category: "Audio",
    price: 2799,
    oldPrice: 3599,
    rating: 4.8,
    reviews: 102,
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=85",
    badge: "BESTSELLER",
  },
];

const ProductDetails = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const [cart, setCart] = useState([]);
  const [addedProduct, setAddedProduct] = useState(null);

  const { id } = useParams();
  const singleProducts = useProductsStore((state) => state.singleProducts);
  const getProductsById = useProductsStore((state) => state.getProductsById);
  useEffect(() => {
    if (id) {
      getProductsById(id);
    }
  }, [id, getProductsById]);
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const addToCart = (item, qty = 1) => {
    setCart((prev) => [...prev, ...Array(qty).fill(item.id)]);
    setAddedProduct(item.id);

    setTimeout(() => {
      setAddedProduct((prev) => (prev === item.id ? null : prev));
    }, 1500);
  };

  const previousImage = () => {
    setActiveImage(
      (prev) => (prev - 1 + singleProducts.images.length) % singleProducts.images.length,
    );
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % singleProducts.images.length);
  };

  const buyNow = (item) => {
    console.log("Buy now:", {
      product: item,
      quantity,
      color: selectedColor,
    });
    // Navigate to checkout here.
  };

  console.log(singleProducts, "Single Products");
  if (!singleProducts) {
    return (
     <Loader/>
    );
  }
  return (
    <main className="min-h-screen bg-[#0b0b0f] text-white">
      {/* Product Details */}
      <section className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="mb-7 flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm">
            <a href="/" className="transition hover:text-violet-400">
              Home
            </a>
            <span>/</span>
            <a href="/products" className="transition hover:text-violet-400">
              Products
            </a>
            {/* <span>/</span> */}
            {/* <span className="text-violet-400">{product.category}</span> */}
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
            {/* LEFT: Animated Image Gallery */}
            <div className="min-w-0">
              {/* Main Image */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#101014] p-3 sm:rounded-3xl sm:p-5">
                <div className="pointer-events-none absolute -right-10 top-10 h-52 w-52 rounded-full bg-violet-600/20 blur-[80px]" />

                <div className="absolute left-5 top-5 z-20 flex items-center gap-1.5 rounded-full border border-violet-400/20 bg-[#171322]/90 px-3 py-1.5 text-[10px] font-bold tracking-wider text-violet-300 backdrop-blur-md">
                  <Sparkles size={13} />
                  PREMIUM PICK
                </div>

                <button
                  onClick={() => setFavorite(!favorite)}
                  aria-label="Toggle favorite"
                  className={`absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 backdrop-blur-md transition ${
                    favorite
                      ? "bg-violet-600 text-white"
                      : "bg-black/40 text-gray-300 hover:bg-violet-600 hover:text-white"
                  }`}
                >
                  <Heart size={19} fill={favorite ? "currentColor" : "none"} />
                </button>

                <div className="relative flex h-[300px] items-center justify-center overflow-hidden rounded-xl sm:h-[420px] lg:h-[450px]">
                  <div className="absolute h-48 w-48 rounded-full bg-violet-600/15 blur-3xl sm:h-72 sm:w-72" />

                  <img
                    key={activeImage}
                    src={singleProducts.images[activeImage]}
                    alt={`${singleProducts.name} view ${activeImage + 1}`}
                    className="relative z-10 h-full w-full animate-[productFade_0.45s_ease-out] object-contain transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gallery Navigation */}
                  <button
                    onClick={previousImage}
                    aria-label="Previous product image"
                    className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition hover:bg-violet-600 sm:left-4"
                  >
                    <ChevronLeft size={21} />
                  </button>

                  <button
                    onClick={nextImage}
                    aria-label="Next product image"
                    className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition hover:bg-violet-600 sm:right-4"
                  >
                    <ChevronRight size={21} />
                  </button>

                  <span className="absolute bottom-3 right-3 z-20 rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-gray-300 backdrop-blur-md">
                    {activeImage + 1} / {singleProducts.images.length}
                  </span>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="mt-4 grid grid-cols-4 gap-3">
                {singleProducts.images.map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setActiveImage(index)}
                    aria-label={`Show image ${index + 1}`}
                    aria-pressed={activeImage === index}
                    className={`overflow-hidden rounded-xl border-2 bg-[#101014] p-1 transition duration-300 ${
                      activeImage === index
                        ? "border-violet-500 shadow-lg shadow-violet-900/20"
                        : "border-white/10 opacity-70 hover:border-violet-400/50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Product thumbnail ${index + 1}`}
                      className="h-16 w-full rounded-lg object-cover sm:h-24"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: Product Information */}
            <div className="flex flex-col">
              <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {singleProducts.name}
              </h1>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400 ">
                {singleProducts.discription}
              </p>

              {/* Rating */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={
                        singleProducts.rating >= star
                          ? "fill-amber-400 text-amber-400"
                          : singleProducts.rating >= star - 0.5
                            ? "fill-amber-400/50 text-amber-400"
                            : "text-gray-700"
                      }
                    />
                  ))}
                </div>

                <span className="text-sm font-semibold text-white">
                  {singleProducts.rating}/5
                </span>

                {/* <span className="text-sm text-gray-500">
                  ({product.reviews} reviews)
                </span> */}

                <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
                  In Stock
                </span>
              </div>

              {/* Price */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-3xl font-bold tracking-tight">
                  {formatPrice(singleProducts.price)}
                </span>

                {/* <span className="text-base text-gray-500 line-through">
                  {formatPrice(product.oldPrice)}
                </span> */}

                {/* <span className="rounded-md bg-violet-500/15 px-2.5 py-1 text-xs font-bold text-violet-300">
                  {Math.round(
                    ((product.oldPrice - product.price) / product.oldPrice) *
                      100
                  )}
                  % OFF
                </span> */}
              </div>

              <p className="mt-6 text-sm leading-7 text-gray-400 sm:text-base">
                {singleProducts.description}
              </p>

              <div className="my-6 border-t border-white/10" />

              {/* Color Selection */}
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  Color:
                  <span className="font-normal text-gray-400">
                    {selectedColor}
                  </span>
                </div>

                {/* <div className="mt-4 flex items-center gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      aria-label={`Select ${color.name} color`}
                      aria-pressed={selectedColor === color.name}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                        selectedColor === color.name
                          ? "border-violet-400 ring-2 ring-violet-500/20"
                          : "border-white/10 hover:border-white/40"
                      }`}
                    >
                      <span
                        className="h-7 w-7 rounded-full border border-white/10"
                        style={{ backgroundColor: color.value }}
                      />
                    </button>
                  ))}
                </div> */}
              </div>

              {/* Quantity Selector */}
              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold">Quantity</p>

                <div className="inline-flex items-center gap-5 rounded-xl border border-white/10 bg-white/[0.03] p-2">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="rounded-lg p-2 text-gray-300 transition hover:bg-white/10 hover:text-white disabled:opacity-30"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="min-w-5 text-center text-sm font-semibold">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity((prev) => Math.min(10, prev + 1))
                    }
                    disabled={quantity >= 10}
                    aria-label="Increase quantity"
                    className="rounded-lg p-2 text-gray-300 transition hover:bg-white/10 hover:text-white disabled:opacity-30"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Maximum 10 items per order.
                </p>
              </div>

              {/* Buy & Cart Buttons */}
              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={() => buyNow(singleProducts)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:-translate-y-0.5 hover:bg-violet-500"
                >
                  Buy Now
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => addToCart(singleProducts, quantity)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-semibold text-gray-200 transition hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300"
                >
                  {addedProduct === singleProducts.id ? (
                    <>
                      <Check size={18} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>

              {/* Service Benefits */}
              <div className="mt-7 grid grid-cols-1 gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <Truck size={20} className="shrink-0 text-violet-400" />
                  <div>
                    <p className="text-xs font-semibold text-gray-200">
                      Fast Delivery
                    </p>
                    <p className="mt-1 text-[11px] text-gray-500">
                      Delivered to your door
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck size={20} className="shrink-0 text-violet-400" />
                  <div>
                    <p className="text-xs font-semibold text-gray-200">
                      Secure Payment
                    </p>
                    <p className="mt-1 text-[11px] text-gray-500">
                      Safe checkout
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <RotateCcw size={20} className="shrink-0 text-violet-400" />
                  <div>
                    <p className="text-xs font-semibold text-gray-200">
                      Easy Returns
                    </p>
                    <p className="mt-1 text-[11px] text-gray-500">
                      Hassle-free process
                    </p>
                  </div>
                </div>
              </div>

              {/* Cart Feedback */}
              {cart.length > 0 && (
                <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-violet-500/20 bg-violet-500/[0.06] p-3">
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-violet-300">
                      {cart.length}
                    </span>{" "}
                    {cart.length === 1 ? "item" : "items"} added to cart.
                  </p>

                  <a
                    href="/cart"
                    className="shrink-0 text-sm font-semibold text-violet-400 hover:text-violet-300"
                  >
                    View Cart →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Similar Products */}
      <section className="border-t border-white/[0.06] bg-[#0b0b0f] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1 w-7 rounded-full bg-violet-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                You May Also Like
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Similar <span className="text-violet-400">Products</span>
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Discover more products picked for you.
            </p>
          </div>

          {/* Four Similar Product Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {similarProducts.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101014] transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-950/20"
              >
                {/* Image */}
                <div className="relative m-2 overflow-hidden rounded-xl bg-[#191920]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-52"
                  />

                  <span className="absolute left-3 top-3 rounded-md border border-violet-400/20 bg-[#171322]/95 px-2 py-1 text-[9px] font-bold tracking-wider text-violet-300">
                    {item.badge}
                  </span>

                  <button
                    onClick={() => toggleFavorite(item.id)}
                    aria-label="Toggle favorite"
                    className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 backdrop-blur-md transition ${
                      favorite === item.id
                        ? "bg-violet-600 text-white"
                        : "bg-black/50 text-gray-300 hover:bg-violet-600 hover:text-white"
                    }`}
                  >
                    <Heart size={17} />
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 pt-2">
                  <p className="text-xs font-medium text-violet-400">
                    {item.category}
                  </p>

                  <h3 className="mt-2 min-h-10 text-sm font-semibold leading-5 text-gray-100 transition group-hover:text-violet-300">
                    {item.title}
                  </h3>

                  {/* Rating */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={13}
                          className={
                            item.rating >= star
                              ? "fill-amber-400 text-amber-400"
                              : item.rating >= star - 0.5
                                ? "fill-amber-400/50 text-amber-400"
                                : "text-gray-700"
                          }
                        />
                      ))}
                    </div>

                    <span className="text-xs font-semibold text-gray-300">
                      {item.rating.toFixed(1)}
                    </span>

                    <span className="text-xs text-gray-600">
                      ({item.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="text-xl font-bold text-white">
                      {formatPrice(item.price)}
                    </span>

                    <span className="text-xs text-gray-500 line-through">
                      {formatPrice(item.oldPrice)}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => buyNow(item)}
                      className="flex items-center justify-center gap-1 rounded-lg bg-violet-600 px-2 py-2.5 text-xs font-semibold text-white transition hover:bg-violet-500 sm:text-sm"
                    >
                      Buy Now
                      <ArrowRight size={14} />
                    </button>

                    <button
                      onClick={() => addToCart(item, 1)}
                      className="flex items-center justify-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-2.5 text-xs font-semibold text-gray-300 transition hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300 sm:text-sm"
                    >
                      {addedProduct === item.id ? (
                        <>
                          <Check size={14} />
                          Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={14} />
                          Add Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PromoHero />
    </main>
  );
};

export default ProductDetails;
