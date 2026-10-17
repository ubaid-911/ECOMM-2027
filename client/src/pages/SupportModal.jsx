import { useState } from "react";
import {
  Headset,
  Mail,
  MessageSquareText,
  Send,
  X,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

function SupportModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [complaint, setComplaint] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !complaint.trim()) {
      setError("Please fill in your email and complaint.");
      return;
    }

    if (complaint.trim().length < 10) {
      setError("Please describe your complaint in at least 10 characters.");
      return;
    }

    setError("");

    // Connect your support API here to save the query.
    setSubmitted(true);
  };

  const handleClose = () => {
    setEmail("");
    setComplaint("");
    setSubmitted(false);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center h-[100vh] bg-black/75 backdrop-blur-md p-4 animate-[supportFade_0.25s_ease-out]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="support-title"
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-violet-500/25 bg-[#101014] shadow-2xl shadow-violet-950/40 animate-[supportPop_0.4s_ease-out]"
      >
        {/* Decorative background */}
        <div className="absolute -top-24 -right-20 w-56 h-56 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-20 w-56 h-56 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

        {/* Top accent line */}
        <div className="relative h-1 w-full overflow-hidden bg-white/5">
          <div className="h-full w-1/2 bg-gradient-to-r from-violet-600 via-violet-300 to-indigo-500 animate-[supportShimmer_3s_ease-in-out_infinite]" />
        </div>

        <div className="relative p-5 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-7">
            <div className="flex items-center gap-4">
              <div className="group w-14 h-14 shrink-0 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                <Headset
                  size={27}
                  className="text-violet-400 group-hover:scale-110 group-hover:-rotate-6 transition duration-300"
                />
              </div>

              <div>
                <p className="flex items-center gap-1.5 text-xs text-violet-400 font-medium mb-1">
                  <Sparkles size={13} />
                  NOVASTORE HELP CENTER
                </p>

                <h2
                  id="support-title"
                  className="text-2xl sm:text-3xl font-bold"
                >
                  User Support
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  We're here to help you.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close support modal"
              className="shrink-0 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition"
            >
              <X size={20} />
            </button>
          </div>

          {submitted ? (
            /* Success Message */
            <div className="py-6 text-center animate-[supportPop_0.4s_ease-out]">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-emerald-500/15 animate-ping" />

                <div className="relative w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2
                    size={42}
                    className="text-emerald-400"
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Query Submitted!
              </h3>

              <p className="text-sm text-gray-400 leading-6 mb-7">
                Thank you for contacting NovaStore. Your support request
                has been prepared successfully.
              </p>

              <div className="rounded-xl border border-white/10 bg-[#191920] p-4 text-left mb-6">
                <p className="text-xs text-gray-500 mb-2">
                  EMAIL ADDRESS
                </p>
                <p className="text-sm break-all">{email}</p>

                <div className="border-t border-white/10 my-3" />

                <p className="text-xs text-gray-500 mb-2">
                  YOUR COMPLAINT
                </p>
                <p className="text-sm text-gray-300 whitespace-pre-wrap break-words">
                  {complaint}
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 active:scale-[0.98] transition font-semibold shadow-lg shadow-violet-900/20"
              >
                <CheckCircle2 size={18} />
                Done
              </button>
            </div>
          ) : (
            /* Support Form */
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="support-email"
                    className="flex items-center gap-2 text-sm text-gray-300 mb-2"
                  >
                    <Mail size={16} className="text-violet-400" />
                    Email Address
                  </label>

                  <input
                    id="support-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-[#191920] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                  />
                </div>

                {/* Complaint */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <label
                      htmlFor="support-complaint"
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <MessageSquareText
                        size={16}
                        className="text-violet-400"
                      />
                      Describe Your Complaint
                    </label>

                    <span className="text-xs text-gray-500">
                      {complaint.length}/1000
                    </span>
                  </div>

                  <textarea
                    id="support-complaint"
                    value={complaint}
                    onChange={(e) => {
                      if (e.target.value.length <= 1000) {
                        setComplaint(e.target.value);
                        setError("");
                      }
                    }}
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    maxLength={1000}
                    required
                    className="w-full resize-y min-h-[130px] bg-[#191920] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                  />
                </div>

                {/* Error */}
                {error && (
                  <p
                    role="alert"
                    className="text-sm text-red-400 animate-[supportFade_0.2s_ease-out]"
                  >
                    {error}
                  </p>
                )}

                {/* Privacy note */}
                <div className="flex items-start gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <ShieldCheck
                    size={17}
                    className="text-violet-400 shrink-0 mt-0.5"
                  />

                  <p className="text-xs text-gray-400 leading-5">
                    Please provide a valid email so our support team can
                    respond to your query.
                  </p>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    type="submit"
                    className="group flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 active:scale-[0.98] transition font-semibold text-sm shadow-lg shadow-violet-900/20"
                  >
                    <Send
                      size={17}
                      className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform"
                    />
                    Raise Query
                  </button>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#191920] border border-white/10 hover:border-red-500/30 hover:text-red-400 active:scale-[0.98] transition font-semibold text-sm"
                  >
                    <X size={17} />
                    Cancel Query
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default SupportModal;
