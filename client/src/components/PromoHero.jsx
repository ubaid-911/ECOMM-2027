
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Clock3,
  HeartPulse,
  Smartphone,
  BatteryCharging,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headset,
} from "lucide-react";

const PromoHero = () => {
  const [seconds, setSeconds] = useState(15 * 60);
  const [activeSlide, setActiveSlide] = useState(0);

  const campaigns = [
    {
      eyebrow: "LIMITED TIME OFFER",
      title: "Smart Choice",
      highlight: "Bigger Savings.",
      description:
        "Upgrade your lifestyle with our latest smartwatches. Track your activity, stay connected, and do more every day.",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85",
      discount: "50%",
      price: "₹2,499",
      oldPrice: "₹4,999",
      feature1: "Smart Design",
      feature2: "Everyday Comfort",
      feature3: "Long Battery Life",
      category: "Smart Accessories",
    },
    {
      eyebrow: "TECH DEALS ARE HERE",
      title: "Feel Every Beat.",
      highlight: "Love Every Note.",
      description:
        "Discover immersive audio, rich bass, and premium comfort with headphones built for your everyday moments.",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85",
      discount: "40%",
      price: "₹1,799",
      oldPrice: "₹2,999",
      feature1: "Rich Audio",
      feature2: "Premium Comfort",
      feature3: "Wireless Freedom",
      category: "Premium Audio",
    },
    {
      eyebrow: "STYLE YOUR EVERYDAY",
      title: "Made to Move.",
      highlight: "Built for You.",
      description:
        "Refresh your everyday look with modern sneakers that bring together comfort, versatility, and standout style.",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85",
      discount: "30%",
      price: "₹2,099",
      oldPrice: "₹2,999",
      feature1: "Modern Style",
      feature2: "All-Day Comfort",
      feature3: "Everyday Versatility",
      category: "Featured Footwear",
    },
  ];

  const campaign = campaigns[activeSlide];

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev <= 0 ? 15 * 60 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const sliderTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % campaigns.length);
    }, 7000);

    return () => clearInterval(sliderTimer);
  }, []);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <section className="overflow-hidden bg-[#0b0b0f] px-4 py-6 text-white sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Main Advertisement */}
        <div className="relative isolate overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-[#12111c] via-[#0e0e14] to-[#171020] sm:rounded-3xl">

          {/* Background Effects */}
          <div className="pointer-events-none absolute -left-20 top-0 -z-10 h-72 w-72 rounded-full bg-violet-700/20 blur-[100px]" />

          <div className="pointer-events-none absolute right-0 top-10 -z-10 h-96 w-96 rounded-full bg-purple-600/15 blur-[120px]" />

          <div
            key={activeSlide}
            className="grid min-h-[620px] items-center gap-8 p-6 animate-[promoFade_0.7s_ease-out] sm:p-10 lg:min-h-[590px] lg:grid-cols-2 lg:gap-12 lg:p-12 xl:p-16"
          >
            {/* LEFT CONTENT */}
            <div className="relative z-10 flex flex-col items-start">

              {/* Offer Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-300 sm:text-xs">
                <Sparkles size={15} className="animate-pulse" />
                {campaign.eyebrow}
              </div>

              {/* Heading */}
              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                {campaign.category}
              </p>

              <h1 className="mt-3 text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl xl:text-6xl">
                {campaign.title}

                <span className="mt-1 block bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-500 bg-clip-text text-transparent">
                  {campaign.highlight}
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-sm leading-7 text-gray-400 sm:text-base">
                {campaign.description}
              </p>

              {/* Product Benefits */}
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
                {[campaign.feature1, campaign.feature2, campaign.feature3].map(
                  (feature, index) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-xs text-gray-300 sm:text-sm"
                    >
                      {index === 0 ? (
                        <HeartPulse size={17} className="text-violet-400" />
                      ) : index === 1 ? (
                        <Smartphone size={17} className="text-violet-400" />
                      ) : (
                        <BatteryCharging
                          size={17}
                          className="text-violet-400"
                        />
                      )}
                      {feature}
                    </div>
                  )
                )}
              </div>

              {/* Price */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="text-3xl font-extrabold sm:text-4xl">
                  {campaign.price}
                </span>

                <span className="text-sm text-gray-500 line-through">
                  {campaign.oldPrice}
                </span>

                <span className="rounded-md bg-emerald-500/10 px-2.5 py-1.5 text-xs font-bold text-emerald-400">
                  SAVE {campaign.discount}
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a
                  href="/products"
                  className="group inline-flex items-center gap-3 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition duration-300 hover:-translate-y-1 hover:bg-violet-500"
                >
                  Shop Now
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>

                <a
                  href="/deals"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3.5 text-sm font-medium text-gray-300 transition hover:border-violet-400/40 hover:text-violet-300"
                >
                  <Zap size={16} />
                  Explore Deals
                </a>
              </div>

              {/* Countdown Demo */}
              <div className="mt-7 flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-3 sm:gap-4 sm:p-4">
                <Clock3 size={21} className="text-violet-400" />

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500">
                    Demo countdown
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-200">
                    Offer timer preview
                  </p>
                </div>

                <div className="ml-1 flex items-center gap-1.5 font-mono text-lg font-bold">
                  <span className="rounded-md border border-white/10 bg-white/[0.05] px-2 py-1.5">
                    {String(minutes).padStart(2, "0")}
                  </span>

                  <span className="text-violet-400">:</span>

                  <span className="rounded-md border border-white/10 bg-white/[0.05] px-2 py-1.5">
                    {String(remainingSeconds).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT PRODUCT IMAGE */}
            <div className="relative flex min-h-[280px] items-center justify-center sm:min-h-[400px] lg:min-h-[460px]">

              {/* Glowing Circle */}
              <div className="absolute h-56 w-56 animate-pulse rounded-full border border-violet-500/30 bg-violet-600/10 shadow-[0_0_100px_rgba(124,58,237,0.18)] sm:h-80 sm:w-80 lg:h-96 lg:w-96" />

              <div className="absolute h-44 w-44 rounded-full bg-purple-500/20 blur-[70px] sm:h-64 sm:w-64" />

              {/* Product Image */}
              <img
                key={`image-${activeSlide}`}
                src={campaign.image}
                alt={campaign.category}
                className="relative z-10 h-[280px] w-full animate-[productFloat_5s_ease-in-out_infinite] object-contain drop-shadow-[0_25px_45px_rgba(124,58,237,0.25)] sm:h-[390px] lg:h-[440px]"
              />

              {/* Discount Badge */}
              <div className="absolute right-0 top-3 z-20 flex h-24 w-24 rotate-6 flex-col items-center justify-center rounded-full border border-violet-300/30 bg-gradient-to-br from-violet-500 to-purple-800 shadow-xl shadow-violet-600/30 transition duration-500 hover:rotate-0 sm:right-3 sm:h-32 sm:w-32">
                <span className="text-[10px] font-medium uppercase tracking-wider sm:text-xs">
                  Up to
                </span>

                <span className="text-3xl font-extrabold sm:text-4xl">
                  {campaign.discount}
                </span>

                <span className="text-xs font-bold tracking-widest">
                  OFF
                </span>
              </div>

              {/* Floating Product Label */}
              <div className="absolute bottom-2 left-0 z-20 rounded-xl border border-white/10 bg-[#14111d]/90 p-3 shadow-xl backdrop-blur-xl sm:bottom-6 sm:left-2 sm:p-4">
                <p className="text-[10px] text-gray-400 sm:text-xs">
                  Featured price
                </p>
                <p className="mt-1 text-lg font-bold text-white sm:text-2xl">
                  {campaign.price}
                </p>
                <p className="mt-1 flex items-center gap-1 text-[10px] font-medium text-emerald-400 sm:text-xs">
                  <Sparkles size={12} />
                  Special collection
                </p>
              </div>

              {/* Slide Dots */}
              <div className="absolute bottom-3 right-1 z-20 flex flex-col gap-2 sm:right-3 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2">
                {campaigns.map((item, index) => (
                  <button
                    key={item.eyebrow}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Show campaign ${index + 1}`}
                    aria-pressed={activeSlide === index}
                    className={`rounded-full transition-all duration-300 ${
                      activeSlide === index
                        ? "h-7 w-2 bg-violet-400 sm:h-8"
                        : "h-2 w-2 bg-gray-600 hover:bg-violet-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Animated Accent */}
          <div className="h-0.5 overflow-hidden bg-white/[0.03]">
            <div className="h-full w-1/3 animate-[promoProgress_7s_linear_infinite] bg-gradient-to-r from-violet-600 via-fuchsia-400 to-violet-600" />
          </div>
        </div>

        {/* Service Benefits Strip */}
        <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-white/[0.06] bg-[#101014] p-5 sm:grid-cols-4 sm:gap-5 sm:p-6">
          {[
            {
              icon: Truck,
              title: "Free Shipping",
              detail: "On eligible orders",
            },
            {
              icon: ShieldCheck,
              title: "Secure Payments",
              detail: "Protected checkout",
            },
            {
              icon: RotateCcw,
              title: "Easy Returns",
              detail: "See return policy",
            },
            {
              icon: Headset,
              title: "Customer Support",
              detail: "We're here to help",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 sm:h-12 sm:w-12">
                  <Icon size={21} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-200 sm:text-sm">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PromoHero;
