
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Headphones,
} from "lucide-react";

const slides = [
  {
    tag: "LIMITED TIME OFFER",
    title: "Experience",
    highlight: "Pure Sound.",
    description:
      "Premium wireless headphones with crystal-clear audio, noise cancellation and all-day comfort.",
    price: "$89",
    oldPrice: "$129",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85",
    button: "Shop Headphones",
  },
  {
    tag: "NEW ARRIVALS",
    title: "Style Meets",
    highlight: "Technology.",
    description:
      "Discover premium accessories designed to make every moment smarter and more stylish.",
    price: "$59",
    oldPrice: "$79",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85",
    button: "Explore Watches",
  },
  {
    tag: "UPGRADE YOUR SETUP",
    title: "Work Smarter.",
    highlight: "Live Better.",
    description:
      "Powerful everyday technology to keep you productive, connected and ahead of the game.",
    price: "$99",
    oldPrice: "$149",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1000&q=85",
    button: "Explore Tech",
  },
  {
    tag: "EVERYDAY ESSENTIALS",
    title: "Carry Your",
    highlight: "World.",
    description:
      "Minimal design meets everyday functionality with accessories made for life on the move.",
    price: "$39",
    oldPrice: "$59",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85",
    button: "Shop Accessories",
  },
  {
    tag: "EXCLUSIVE DEALS",
    title: "Find Your",
    highlight: "Next Favorite.",
    description:
      "Explore handpicked products, incredible value and new favorites waiting to be discovered.",
    price: "$49",
    oldPrice: "$69",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85",
    button: "Explore Deals",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [paused]);

  const slide = slides[current];

  return (
    <section className="bg-[#0b0b0f] px-4 py-6 text-white sm:px-6 sm:py-10 lg:px-8">
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-[#101014] shadow-2xl shadow-black/30 sm:rounded-3xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Violet Background Glow */}
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-violet-600/20 blur-[100px] sm:h-96 sm:w-96" />

        {/* Slide Content */}
        <div
          key={current}
          className="relative grid min-h-[540px] items-center gap-6 p-6 animate-[fadeIn_0.7s_ease-in-out] sm:min-h-[500px] sm:p-10 lg:min-h-[530px] lg:grid-cols-2 lg:gap-10 lg:p-14"
        >
          {/* Text Content */}
          <div className="relative z-10 flex flex-col items-start">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-2 text-xs font-semibold tracking-wider text-violet-300">
              <Sparkles size={15} />
              {slide.tag}
            </span>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              {slide.title}
              <span className="block bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">
                {slide.highlight}
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-7 text-gray-400 sm:text-base">
              {slide.description}
            </p>

            {/* Product Features */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-gray-300 sm:text-sm">
              <span className="flex items-center gap-2">
                <Headphones size={17} className="text-violet-400" />
                Premium Quality
              </span>

              <span className="flex items-center gap-2">
                <ShoppingBag size={17} className="text-violet-400" />
                Great Value
              </span>
            </div>

            {/* Price */}
            <div className="mt-7 flex items-center gap-3">
              <span className="text-3xl font-bold">{slide.price}</span>
              <span className="text-sm text-gray-500 line-through">
                {slide.oldPrice}
              </span>
              <span className="rounded-md bg-violet-500/15 px-2 py-1 text-xs font-semibold text-violet-300">
                SPECIAL PRICE
              </span>
            </div>

            {/* Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="/shop"
                className="inline-flex items-center gap-3 rounded-xl bg-violet-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:-translate-y-0.5 hover:bg-violet-500 sm:px-6"
              >
                {slide.button}
                <ArrowRight size={18} />
              </a>

              <a
                href="/collections"
                className="text-sm font-medium text-gray-300 underline decoration-violet-500 underline-offset-8 transition hover:text-violet-400"
              >
                View Collection
              </a>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative flex min-h-[240px] items-center justify-center sm:min-h-[300px] lg:min-h-[360px]">
            <div className="absolute h-48 w-48 rounded-full bg-violet-600/20 blur-3xl sm:h-72 sm:w-72" />

            <img
              src={slide.image}
              alt={slide.highlight.replace(".", "")}
              className="relative z-10 h-64 w-full rounded-2xl object-cover shadow-2xl shadow-violet-950/30 transition-transform duration-700 hover:scale-105 sm:h-80 lg:h-[370px]"
            />

            {/* Floating Price Card */}
            <div className="absolute -right-1 top-3 z-20 rounded-xl border border-violet-400/30 bg-[#17151f]/95 p-3 shadow-xl backdrop-blur-md sm:right-0 sm:top-6 sm:p-4">
              <p className="text-xs text-gray-400">Now only</p>
              <p className="mt-1 text-xl font-bold text-white sm:text-2xl">
                {slide.price}
              </p>
            </div>
          </div>
        </div>

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#191923]/90 text-white transition hover:border-violet-400/50 hover:bg-violet-600 sm:left-5 sm:h-12 sm:w-12"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#191923]/90 text-white transition hover:border-violet-400/50 hover:bg-violet-600 sm:right-5 sm:h-12 sm:w-12"
        >
          <ArrowRight size={20} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 sm:bottom-6">
          {slides.map((item, index) => (
            <button
              key={item.tag}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={current === index ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                current === index
                  ? "w-8 bg-violet-500"
                  : "w-2.5 bg-gray-600 hover:bg-violet-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
