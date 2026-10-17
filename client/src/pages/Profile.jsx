
import { useState } from "react";
import {
  UserRound,
  ShoppingBag,
  ShoppingCart,
  Pencil,
  Save,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const initialProfile = {
  firstName: "Ubaid",
  lastName: "Qureshi",
  email: "ubaid@example.com",
  phone: "",
  country:"",
  state:"",
  address: "",
  city: "",
  postalCode: "",
};

function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSaved(true);

    // Connect your API here to persist profile changes.
  };

  const inputClass =
    "w-full bg-[#191920] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 disabled:opacity-70 disabled:cursor-not-allowed";

  const labelClass = "block text-sm text-gray-300 mb-2";

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">

        {/* Page Heading */}
        <div className="mb-8">
          <p className="text-violet-400 text-sm font-medium mb-2">
            NOVASTORE / ACCOUNT
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold">
            My Account
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Account Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          <a
            href="/profile"
            className="flex items-center justify-center sm:justify-start gap-3 p-4 rounded-2xl border border-violet-500/40 bg-violet-500/10 text-violet-300 transition"
          >
            <UserRound size={20} />
            <span className="text-sm font-medium">My Profile</span>
          </a>

          <a
            href="/orders"
            className="flex items-center justify-center sm:justify-start gap-3 p-4 rounded-2xl border border-white/10 bg-[#101014] text-gray-300 hover:border-violet-500/40 hover:text-violet-300 transition"
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

        {/* Profile Form Card */}
        <div className="max-w-4xl mx-auto bg-[#101014] border border-white/10 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xl shadow-black/10">

          {/* Form Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                <UserRound size={23} className="text-violet-400" />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Personal Information
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Update your personal details below.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsEditing((prev) => !prev);
                setSaved(false);
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-[#191920] hover:border-violet-500/40 hover:text-violet-300 transition text-sm"
            >
              <Pencil size={16} />
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </button>
          </div>

          {/* Success Message */}
          {saved && (
            <div className="flex items-center gap-2 mb-6 p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-sm">
              <CheckCircle2 size={18} />
              Your profile changes have been saved in this session.
            </div>
          )}

          <form onSubmit={handleSave}>

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className={labelClass} htmlFor="firstName">
                  First Name
                </label>

                <input
                  id="firstName"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                  placeholder="Enter first name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="lastName">
                  Last Name
                </label>

                <input
                  id="lastName"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                  placeholder="Enter last name"
                  className={inputClass}
                />
              </div>
            </div>

        

            {/* Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm text-gray-300 mb-2"
                >
                  <Mail size={15} className="text-violet-400" />
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                  placeholder="Enter email address"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="flex items-center gap-2 text-sm text-gray-300 mb-2"
                >
                  <Phone size={15} className="text-violet-400" />
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter phone number"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Address */}
            <div className="mb-5">
              <label
                htmlFor="address"
                className="flex items-center gap-2 text-sm text-gray-300 mb-2"
              >
                <MapPin size={15} className="text-violet-400" />
                Street Address
              </label>

              <textarea
                id="address"
                name="address"
                value={profile.address}
                onChange={handleChange}
                disabled={!isEditing}
                rows={3}
                placeholder="Enter your full address"
                className={`${inputClass} resize-y min-h-[90px]`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <div>
                <label className={labelClass} htmlFor="country">
                  Country
                </label>

                <input
                  id="country"
                  name="country"
                  value={profile.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter country"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="state">
                State
                </label>

                <input
                  id="state"
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter State"
                  className={inputClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <div>
                <label className={labelClass} htmlFor="city">
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter city"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="postalCode">
                  Postal Code
                </label>

                <input
                  id="postalCode"
                  name="postalCode"
                  value={profile.postalCode}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter postal code"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-white/10 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setSaved(false);
                  }}
                  className="px-6 py-3 rounded-xl border border-white/10 bg-[#191920] hover:bg-white/10 transition text-sm font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 active:scale-[0.98] transition font-semibold text-sm shadow-lg shadow-violet-900/20"
                >
                  <Save size={17} />
                  Save Changes
                </button>
              </div>
            )}

          </form>
        </div>

        {/* Bottom Security Note */}
        <div className="max-w-4xl mx-auto mt-5 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500">
          <ShieldCheck size={16} className="text-violet-400" />
          Your account information should be kept secure.
        </div>
      </div>
    </div>
  );
}

export default Profile;
