
import { ShoppingBag, Headset } from "lucide-react";
import SupportModal from "../pages/SupportModal";
import { useState } from "react";

const Footer = () => {
    const [isSupportOpen, setIsSupportOpen] = useState(false);
  return (
    <footer className="border-t border-white/10 bg-[#101014] text-gray-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <ShoppingBag size={22} className="text-violet-400" />
          <span className="text-lg font-bold text-white">
            Q <span className="text-violet-400">Store</span>
          </span>
        </a>

        {/* Copyright */}
        <p className="text-center text-xs sm:text-sm">
          © {new Date().getFullYear()} Q-Store. All rights reserved.
        </p>

        {/* Links & Social Icons */}
        <div className="flex items-center gap-5">
           <button
              onClick={() => setIsSupportOpen(true)}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-[#101014] px-4 py-2.5 text-sm text-gray-300 hover:border-violet-500/40 hover:text-violet-300 transition"
            >
              <Headset size={18} />
          
            </button>
            <SupportModal
              isOpen={isSupportOpen}
              onClose={() => setIsSupportOpen(false)}
            />
 
        </div>

      </div>
    </footer>
  );
};

export default Footer;
