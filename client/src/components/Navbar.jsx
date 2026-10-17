import { useState } from "react";
import {
  ShoppingBag,
  Search,
  UserRound,
  ShoppingCart,
  Headset,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import SupportModal from "../pages/SupportModal";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      console.log("Searching for:", search);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#101014]/95 text-white backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Navbar */}
        <div className="flex h-[76px] items-center justify-between gap-5">
          {/* Logo */}
          <a href="/" className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-600/20">
              <ShoppingBag size={22} strokeWidth={2.2} />
            </div>

            <span className="text-xl font-bold tracking-tight sm:text-2xl">
              Q-<span className="text-violet-400">Store</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-7 lg:flex">
            <a
              href="/shop"
              className="text-sm text-gray-300 transition hover:text-violet-400"
            >
              Shop
            </a>
          </div>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden max-w-md flex-1 md:flex"
          >
            <div className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 transition focus-within:border-violet-500/60 focus-within:bg-white/[0.07]">
              <Search size={19} className="shrink-0 text-gray-400" />

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="h-11 w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
              />

              <button
                type="submit"
                className="hidden rounded-md bg-white/10 px-2 py-1 text-xs text-gray-400 transition hover:bg-violet-600 hover:text-white xl:block"
              >
                Search
              </button>
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Toggle search"
              className="rounded-xl p-2.5 text-gray-300 transition hover:bg-white/10 hover:text-white md:hidden"
            >
              {showSearch ? <X size={21} /> : <Search size={21} />}
            </button>

            {/* Support */}
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

            {/* User Profile */}
            <a
              href="/profile"
              aria-label="User profile"
              title="My Account"
              className="rounded-xl p-2.5 text-gray-300 transition hover:bg-white/10 hover:text-violet-400"
            >
              <UserRound size={21} />
            </a>

            {/* Shopping Cart */}
            <a
              href="/cart"
              aria-label="Shopping cart"
              title="Shopping Cart"
              className="group relative rounded-xl p-2.5 text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              <ShoppingCart size={22} />

              <span className="absolute right-0.5 top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-violet-500 px-1 text-[10px] font-bold text-white ring-2 ring-[#101014]">
                3
              </span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              aria-label="Toggle navigation menu"
              aria-expanded={showMenu}
              className="rounded-xl p-2.5 text-gray-300 transition hover:bg-white/10 hover:text-white lg:hidden"
            >
              {showMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <form onSubmit={handleSearch} className="pb-4 md:hidden">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-4 focus-within:border-violet-500/60">
              <Search size={19} className="text-gray-400" />

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
              />

              <button type="submit" aria-label="Submit search">
                <ArrowRight size={20} className="text-violet-400" />
              </button>
            </div>
          </form>
        )}

        {/* Mobile Navigation Menu */}
        {showMenu && (
          <div className="border-t border-white/10 py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              <a
                href="/shop"
                className="rounded-lg px-4 py-3 text-sm text-gray-300 transition hover:bg-white/[0.06] hover:text-violet-400"
              >
                Shop
              </a>

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
        )}
      </div>
    </nav>
  );
};

export default Navbar;
