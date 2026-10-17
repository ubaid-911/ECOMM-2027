
import { ShoppingBag, Sparkles } from "lucide-react";

function Loader({ text = "Preparing your experience..." }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0b0b0f] text-white"
      role="status"
      aria-live="polite"
      aria-label="Loading NovaStore"
    >
      {/* Background Glow */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-violet-600/10 blur-[100px] animate-pulse" />

      {/* Decorative Rings */}
      <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-violet-500/10 animate-[loaderRotate_12s_linear_infinite]" />

      <div className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-dashed border-violet-400/20 animate-[loaderRotate_18s_linear_infinite_reverse]" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">

        {/* Animated Shopping Bag */}
        <div className="relative w-32 h-32 flex items-center justify-center mb-8">

          {/* Orbiting Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-400 border-r-violet-600 animate-spin" />

          {/* Outer Glow */}
          <div className="absolute inset-3 rounded-full bg-violet-500/10 blur-md animate-pulse" />

          {/* Icon Box */}
          <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-600/30 to-indigo-600/10 border border-violet-400/30 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.2)] animate-[loaderFloat_2s_ease-in-out_infinite]">
            <ShoppingBag
              size={38}
              strokeWidth={1.5}
              className="text-violet-300"
            />

            <Sparkles
              size={17}
              className="absolute -top-2 -right-2 text-violet-300 animate-pulse"
            />
          </div>

          {/* Orbiting Dots */}
          <span className="absolute top-2 right-5 w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_12px_#a78bfa] animate-pulse" />

          <span className="absolute bottom-4 left-3 w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_12px_#818cf8] animate-ping" />
        </div>

        {/* Brand */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-[0.2em]">
          Q 
          <span className="text-violet-400">STORE</span>
        </h1>

        <p className="text-[10px] tracking-[0.45em] text-gray-500 mt-3 uppercase">
          Your world. Your style.
        </p>

        {/* Loading Text */}
        <div className="flex items-center gap-2 mt-9 text-sm text-gray-400">
          <span>{text}</span>

          <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-violet-400 animate-bounce [animation-delay:0ms]" />
            <span className="w-1 h-1 rounded-full bg-violet-400 animate-bounce [animation-delay:150ms]" />
            <span className="w-1 h-1 rounded-full bg-violet-400 animate-bounce [animation-delay:300ms]" />
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-56 sm:w-64 h-1 mt-6 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-700 via-violet-400 to-indigo-400 animate-[loaderProgress_1.8s_ease-in-out_infinite]" />
        </div>

        <p className="text-[10px] text-gray-600 mt-4 tracking-widest">
          PLEASE WAIT A MOMENT
        </p>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
    </div>
  );
}

export default Loader;
