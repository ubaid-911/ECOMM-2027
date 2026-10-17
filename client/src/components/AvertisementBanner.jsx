
import { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  Zap,
  Clock3,
  X,
  Tag,
} from "lucide-react";

const AdvertisementBanner = () => {
  const [visible, setVisible] = useState(true);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev === 0 ? 59 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  return (
    <section className="bg-[#0b0b0f] px-4 py-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-r from-[#171122] via-[#171322] to-[#101014]">

        {/* Animated Background Glow */}
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 animate-pulse rounded-full bg-violet-600/20 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-24 right-10 h-56 w-56 animate-pulse rounded-full bg-purple-500/15 blur-[80px]" />

        {/* Close Button */}
        <button
          onClick={() => setVisible(false)}
          aria-label="Close advertisement"
          className="absolute right-3 top-3 z-20 rounded-lg p-1.5 text-gray-500 transition hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="relative flex flex-col items-center justify-between gap-5 p-5 text-center sm:p-7 md:flex-row md:gap-8 md:px-9 md:text-left">

          {/* Offer Details */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4 md:flex-1">

            {/* Discount Icon */}
            <div className="flex h-14 w-14 shrink-0 animate-[float_3s_ease-in-out_infinite] items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
              <Tag size={28} />
            </div>

            <div>
              <div className="mb-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-300">
                  <Sparkles size={12} />
                  Special Offer
                </span>

                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Zap size={13} className="text-yellow-400" />
                  Limited time
                </span>
              </div>

              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
                Upgrade Your Style.
                <span className="block bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent sm:inline sm:pl-2">
                  Save Big.
                </span>
              </h2>

              <p className="mt-2 max-w-xl text-xs leading-6 text-gray-400 sm:text-sm">
                Get up to 40% off selected products. Discover your favorites
                at prices you will love.
              </p>
            </div>
          </div>

          {/* Discount Badge */}
          <div className="flex shrink-0 items-center gap-4 sm:gap-6">
            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Save up to
              </p>

              <p className="mt-1 animate-pulse text-4xl font-extrabold tracking-tight text-violet-400 sm:text-5xl">
                40%
              </p>
              <p className="text-[10px] font-medium uppercase tracking-widest text-gray-500">
                OFF
              </p>
            </div>

            <div className="hidden h-14 w-px bg-white/10 sm:block" />

            {/* Countdown Display */}
            <div className="hidden sm:block">
              <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-400">
                <Clock3 size={14} />
                Offer timer demo
              </div>

              <div className="flex items-center gap-1.5">
                <span className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 font-mono text-lg font-bold text-white">
                  00
                </span>
                <span className="text-violet-400">:</span>
                <span className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 font-mono text-lg font-bold text-white">
                  {String(seconds).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="/deals"
              className="group inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-violet-500 sm:px-5"
            >
              Shop Deals
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        {/* Animated Bottom Accent */}
        <div className="h-0.5 w-full overflow-hidden bg-white/5">
          <div className="h-full w-1/3 animate-[bannerProgress_4s_ease-in-out_infinite] bg-gradient-to-r from-violet-600 via-purple-400 to-violet-600" />
        </div>
      </div>
    </section>
  );
};

export default AdvertisementBanner;
