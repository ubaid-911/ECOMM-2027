import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Globe,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import "../Auth.css";
import { useNavigate } from "react-router-dom";
import { uploadImageToCloudinary } from "../utility/cloudImageUploder";
import { useAuthStore } from "../store/authStore";

const initialForm = {
  name: "",
  email: "",
  address: "",
  phoneNo: "",
  password: "",
  city: "",
  state: "",
  country: "",
  avatar: "",
};

const stepFields = [
  ["name", "email", "phoneNo"],
  ["address", "city", "state"],
  ["country", "password", "avatar"],
];

const labels = {
  name: "Full name",
  email: "Email address",
  address: "Street address",
  phoneNo: "Phone number",
  password: "Password",
  city: "City",
  state: "State",
  country: "Country",
  avatar: "Profile avatar",
};

const icons = {
  name: UserRound,
  email: Mail,
  address: MapPin,
  phoneNo: Phone,
  password: LockKeyhole,
  city: MapPin,
  state: MapPin,
  country: Globe,
};

const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
const maxImageSize = 5 * 1024 * 1024;

function validateField(field, value) {
  const text = typeof value === "string" ? value.trim() : value;

  if (field === "avatar") {
    return text ? "" : "Please upload a profile image.";
  }

  if (!text) return `${labels[field]} is required.`;

  if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
    return "Please enter a valid email address.";
  }

  if (field === "phoneNo" && !/^\+?[0-9\s()-]{7,20}$/.test(text)) {
    return "Please enter a valid phone number.";
  }

  if (field === "password" && text.length < 8) {
    return "Password must contain at least 8 characters.";
  }

  if (field === "password" && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(text)) {
    return "Use uppercase, lowercase, and a number.";
  }

  if (field === "name" && text.length < 2) {
    return "Name must contain at least 2 characters.";
  }

  return "";
}

export default function Auth() {
  const [mode, setMode] = useState("signup");
  const [step, setStep] = useState(0);

  // All input values, including sign-in email/password and avatar URL,
  // are managed in this single formData state.
  const [formData, setFormData] = useState(initialForm);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const fileInputRef = useRef(null);
  const previewUrlRef = useRef("");
  const navigate = useNavigate();
  const signUp = useAuthStore((state) => state.signUp);

  function clearPreviewUrl() {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = "";
    }
  }

  function switchMode(nextMode) {
    setMode(nextMode);
    setStep(0);
    setErrors({});
    setMessage("");
  }

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setMessage("");
  }

  async function handleImage(file) {
    if (!file) return;

    // Validate the original file before uploading it.
    if (file.size > maxImageSize) {
      setErrors((prev) => ({
        ...prev,
        avatar: "Image size must be 5 MB or less.",
      }));
      return;
    }

    if (!allowedImageTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        avatar: "Use a JPG, PNG, or WebP image.",
      }));
      return;
    }

    clearPreviewUrl();
    const localPreview = URL.createObjectURL(file);
    previewUrlRef.current = localPreview;
    setPreview(localPreview);

    // Clear the old URL while the new image is being uploaded.
    updateField("avatar", "");
    setIsUploadingImage(true);
    setErrors((prev) => ({ ...prev, avatar: "" }));

    try {
      const uploadedImageUrl = await uploadImageToCloudinary(file);

      if (typeof uploadedImageUrl !== "string" || !uploadedImageUrl.trim()) {
        throw new Error("Cloudinary did not return an image URL.");
      }

      // Store the Cloudinary URL in the same formData state.
      updateField("avatar", uploadedImageUrl);
    } catch (error) {
      console.error("Image upload failed:", error);
      updateField("avatar", "");
      setErrors((prev) => ({
        ...prev,
        avatar: "Image upload failed. Please select the image again.",
      }));
    } finally {
      setIsUploadingImage(false);
    }
  }

  function removeImage() {
    clearPreviewUrl();
    setPreview("");
    updateField("avatar", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function validateFields(fields) {
    const nextErrors = {};

    fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) nextErrors[field] = error;
    });

    setErrors((prev) => ({ ...prev, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  }

  function nextStep() {
    if (!validateFields(stepFields[step])) return;

    setErrors({});
    setStep((prev) => prev + 1);
  }

  function previousStep() {
    setErrors({});
    setMessage("");
    setStep((prev) => Math.max(0, prev - 1));
  }

  async function handleSignUp(event) {
    event.preventDefault();

    if (!validateFields(stepFields[2])) return;

    if (isUploadingImage) {
      setErrors((prev) => ({
        ...prev,
        avatar: "Please wait for the image upload to finish.",
      }));
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      // The whole signup form is sent from the single formData state.
      await signUp(formData);
      setMessage("Your account was created successfully.");
      // Add navigation here if your store/API returns successful signup.
      navigate("/");
    } catch (error) {
      console.error("Sign-up failed:", error);
      setMessage(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to create your account. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSignIn(event) {
    event.preventDefault();

    if (!validateFields(["email", "password"])) return;

    setIsSubmitting(true);
    setMessage("");

    try {
      // Sign-in also reads email/password from the same formData state.
      // Connect your sign-in Zustand action here when it is available.
      console.log("Sign-in formData:", formData);
      setMessage("Connect your sign-in Zustand action to complete sign-in.");
    } catch (error) {
      console.error("Sign-in failed:", error);
      setMessage("Unable to sign in. Please check your details.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function renderField(field) {
    const Icon = icons[field];
    const value = formData[field];
    const error = errors[field];

    return (
      <div className="auth-field" key={field}>
        <label htmlFor={`auth-${field}`}>
          {labels[field]} <span className="text-violet-400">*</span>
        </label>

        <div className={`auth-input-wrap ${error ? "auth-input-error" : ""}`}>
          <Icon size={18} className="auth-input-icon" />

          <input
            id={`auth-${field}`}
            type={
              field === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : field === "email"
                  ? "email"
                  : "text"
            }
            placeholder={
              field === "password"
                ? "Enter your password"
                : `Enter ${labels[field].toLowerCase()}`
            }
            value={value}
            autoComplete={
              field === "password"
                ? mode === "signin"
                  ? "current-password"
                  : "new-password"
                : field === "email"
                  ? "email"
                  : field === "name"
                    ? "name"
                    : "off"
            }
            onChange={(event) => updateField(field, event.target.value)}
          />

          {field === "password" && (
            <button
              type="button"
              className="auth-eye"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {error && <p className="auth-error">{error}</p>}
      </div>
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-orb auth-orb-one" />
      <div className="auth-orb auth-orb-two" />
      <div className="auth-grid" />

      <div className="auth-shell">
        <aside className="auth-brand-panel">
          <div
            onClick={() => navigate("/")}
            className="auth-brand cursor-pointer"
          >
            <ShoppingBag size={27} />
            <span>
              Q<span className="text-violet-400">STORE</span>
            </span>
          </div>

          <p className="auth-tagline">YOUR WORLD. YOUR STYLE.</p>

          <div className="auth-brand-copy">
            <span className="auth-eyebrow">
              <Sparkles size={15} /> THE NEXT LEVEL OF SHOPPING
            </span>
            <h1>
              Shop smarter.
              <br />
              <span>Live better.</span>
            </h1>
            <p>
              Discover products you'll love, exclusive deals, and a shopping
              experience made just for you.
            </p>
          </div>

          <div className="auth-benefits">
            <div>
              <span>
                <ShoppingBag size={19} />
              </span>
              <p>
                <strong>Curated products</strong>
                <small>Find your next favorite</small>
              </p>
            </div>
            <div>
              <span>
                <ShieldCheck size={19} />
              </span>
              <p>
                <strong>Secure accounts</strong>
                <small>Your details stay protected</small>
              </p>
            </div>
            <div>
              <span>
                <Sparkles size={19} />
              </span>
              <p>
                <strong>Exclusive experiences</strong>
                <small>A better way to shop</small>
              </p>
            </div>
          </div>

          <div className="auth-decoration" aria-hidden="true">
            <div className="auth-decoration-ring" />
            <div className="auth-decoration-bag">
              <ShoppingBag size={86} strokeWidth={1} />
            </div>
            <Sparkles className="auth-spark auth-spark-one" size={24} />
            <Sparkles className="auth-spark auth-spark-two" size={17} />
          </div>

          <p className="auth-brand-footer">MADE FOR YOUR NEXT DISCOVERY</p>
        </aside>

        <section className="auth-form-panel">
          <div className="auth-topbar">
            <span className="auth-mobile-brand">
              Q<span>STORE</span>
            </span>

            <div className="auth-toggle" aria-label="Authentication mode">
              <button
                type="button"
                className={mode === "signin" ? "active" : ""}
                onClick={() => switchMode("signin")}
              >
                Sign In
              </button>
              <button
                type="button"
                className={mode === "signup" ? "active" : ""}
                onClick={() => switchMode("signup")}
              >
                Sign Up
              </button>
            </div>
          </div>

          <div className="auth-heading" key={mode}>
            <span className="auth-eyebrow">
              {mode === "signup" ? "JOIN THE QStore COMMUNITY" : "WELCOME BACK"}
            </span>
            <h2>
              {mode === "signup" ? "Create your account" : "Welcome back"}
            </h2>
            <p>
              {mode === "signup"
                ? "A few details and you're ready to explore."
                : "Sign in to continue your shopping journey."}
            </p>
          </div>

          {mode === "signup" ? (
            <>
              <div className="auth-progress">
                {["Personal info", "Location", "Security"].map(
                  (label, index) => (
                    <div
                      key={label}
                      className={`auth-progress-step ${
                        index === step
                          ? "current"
                          : index < step
                            ? "complete"
                            : ""
                      }`}
                    >
                      <div className="auth-progress-circle">
                        {index < step ? <Check size={17} /> : index + 1}
                      </div>
                      <span>{label}</span>
                    </div>
                  ),
                )}
              </div>

              <form
                className="auth-form auth-step-enter"
                key={`step-${step}`}
                onSubmit={
                  step === 2
                    ? handleSignUp
                    : (event) => {
                        event.preventDefault();
                        nextStep();
                      }
                }
              >
                <div className="auth-step-heading">
                  <div>
                    <h3>
                      {step + 1}.{" "}
                      {
                        [
                          "Personal information",
                          "Address details",
                          "Account security",
                        ][step]
                      }
                    </h3>
                    <p>
                      {
                        [
                          "Let's get to know you better.",
                          "Where should we find you?",
                          "Secure your account and add a photo.",
                        ][step]
                      }
                    </p>
                  </div>
                  <span>STEP 0{step + 1}/03</span>
                </div>

                {step === 0 && (
                  <div className="auth-fields-grid">
                    {renderField("name")}
                    {renderField("email")}
                    {renderField("phoneNo")}
                  </div>
                )}

                {step === 1 && (
                  <div className="auth-fields-grid">
                    {renderField("address")}
                    {renderField("city")}
                    {renderField("state")}
                  </div>
                )}

                {step === 2 && (
                  <div className="auth-fields-grid">
                    {renderField("country")}
                    {renderField("password")}

                    <div className="auth-field auth-avatar-field">
                      <label htmlFor="signup-avatar">
                        Profile avatar{" "}
                        <span className="text-violet-400">*</span>
                      </label>

                      <input
                        id="signup-avatar"
                        ref={fileInputRef}
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(event) =>
                          handleImage(event.target.files?.[0])
                        }
                      />

                      <div className="auth-avatar-row">
                        <button
                          type="button"
                          className={`auth-dropzone ${isDragging ? "dragging" : ""}`}
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={(event) => {
                            event.preventDefault();
                            setIsDragging(true);
                          }}
                          onDragLeave={() => setIsDragging(false)}
                          onDrop={(event) => {
                            event.preventDefault();
                            setIsDragging(false);
                            handleImage(event.dataTransfer.files?.[0]);
                          }}
                        >
                          {preview ? (
                            <img
                              src={preview}
                              alt="Selected profile avatar"
                              className="auth-avatar-preview"
                            />
                          ) : (
                            <span className="auth-upload-icon">
                              <Upload size={23} />
                            </span>
                          )}
                          <strong>
                            {preview
                              ? "Change image"
                              : "Drag & drop your image"}
                          </strong>
                          <small>or select from your computer</small>
                          <span className="auth-select-file">Browse files</span>
                          <small>JPG, PNG or WebP · Max 5 MB</small>
                        </button>

                        {preview && (
                          <div className="auth-avatar-side">
                            <img src={preview} alt="Avatar preview" />
                            <button
                              type="button"
                              onClick={removeImage}
                              aria-label="Remove avatar"
                            >
                              <X size={15} />
                            </button>
                          </div>
                        )}
                      </div>

                      {errors.avatar && (
                        <p className="auth-error">{errors.avatar}</p>
                      )}
                      {isUploadingImage && (
                        <p className="auth-message" role="status">
                          Uploading image...
                        </p>
                      )}
                      {formData.avatar &&
                        !isUploadingImage &&
                        !errors.avatar && (
                          <p className="auth-message" role="status">
                            Image uploaded successfully.
                          </p>
                        )}
                    </div>
                  </div>
                )}

                {message && (
                  <p className="auth-message" role="status">
                    {message}
                  </p>
                )}

                <div className="auth-form-actions">
                  {step > 0 ? (
                    <button
                      type="button"
                      className="auth-back-button"
                      onClick={previousStep}
                    >
                      <ArrowLeft size={17} /> Back
                    </button>
                  ) : (
                    <span className="auth-secure-note">
                      <ShieldCheck size={15} /> Secure registration
                    </span>
                  )}

                  <button
                    type="submit"
                    className="auth-primary-button"
                    disabled={isSubmitting || isUploadingImage}
                  >
                    {isSubmitting
                      ? "Please wait..."
                      : step === 2
                        ? "Create account"
                        : "Continue"}
                    {!isSubmitting &&
                      (step === 2 ? (
                        <Check size={18} />
                      ) : (
                        <ArrowRight size={18} />
                      ))}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <form className="auth-form auth-step-enter" onSubmit={handleSignIn}>
              <div className="auth-login-icon">
                <LockKeyhole size={27} />
              </div>

              <div className="auth-fields-grid auth-login-fields">
                {renderField("email")}
                {renderField("password")}
              </div>

              {message && (
                <p className="auth-message" role="status">
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="auth-primary-button auth-login-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Please wait..." : "Sign in to your account"}
                <ArrowRight size={18} />
              </button>

              <p className="auth-login-note">
                <ShieldCheck size={15} /> Your account details are protected.
              </p>
            </form>
          )}

          <div className="auth-switch-note">
            {mode === "signup" ? (
              <>
                Already have an account?{" "}
                <button type="button" onClick={() => switchMode("signin")}>
                  Sign in
                </button>
              </>
            ) : (
              <>
                New to Q Store?{" "}
                <button type="button" onClick={() => switchMode("signup")}>
                  Create an account
                </button>
              </>
            )}
          </div>
        </section>
      </div>

      <footer className="auth-page-footer">
        <span /> Q<b>S T O R E</b> <span />
      </footer>
    </main>
  );
}
