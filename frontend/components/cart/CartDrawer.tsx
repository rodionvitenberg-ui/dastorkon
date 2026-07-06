"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/store/useCartStore";
import { useCartUIStore } from "@/store/useCartUIStore";
import { submitOrder } from "@/lib/api";

function normalizeSrc(src: string | null | undefined): string | null {
  if (!src) return null;
  if (src.startsWith("http")) {
    return src.replace("http://localhost", "http://127.0.0.1");
  }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  const backendBase = apiUrl.replace(/\/api\/?$/, "");
  if (src.startsWith("/")) return `${backendBase}${src}`;
  return `${backendBase}/${src}`;
}

export default function CartDrawer() {
  const t = useTranslations("cart");
  const { items, removeItem, updateQuantity, clearCart } =
    useCartStore();
  const { isOpen, closeCart } = useCartUIStore();

  // Checkout form state
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(0);

  function handleClose() {
    closeCart();
    // Reset after animation
    setTimeout(() => {
      if (step === "success") {
        setStep("cart");
        setName("");
        setPhone("");
        setAddress("");
        setComment("");
        setError("");
      }
    }, 300);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError(t("fillRequired"));
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        customer_name: name.trim(),
        customer_phone: phone.trim(),
        address: address.trim(),
        comment: comment.trim() || undefined,
        items: items.map((item) => ({
          dish_id: item.id,
          quantity: item.quantity,
        })),
      };

      await submitOrder(payload);
      clearCart();
      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("orderError"));
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Slide-out panel */}
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-brand-cream shadow-2xl border-l border-brand-dark/10 overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-brand-dark/10">
            <h2 className="font-heading text-xl text-brand-dark tracking-wide">
              {step === "success" ? t("orderSuccess") : t("yourCart")}
              {step === "cart" && totalItems > 0 && (
                <span className="ml-2 text-sm font-sans text-brand-dark/50">
                  ({totalItems})
                </span>
              )}
            </h2>
            <button
              onClick={handleClose}
              className="w-10 h-10 flex items-center justify-center text-brand-dark/60 hover:text-brand-dark transition-colors"
              aria-label="Close cart"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* ─── STEP: SUCCESS ─── */}
          {step === "success" && (
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#166534"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl text-brand-dark mb-2">
                {t("successTitle")}
              </h3>
              <p className="font-sans text-brand-dark/60 leading-relaxed">
                {t("successDesc")}
              </p>
            </div>
          )}

          {/* ─── STEP: CART ─── */}
          {step === "cart" && (
            <>
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
                  <p className="font-sans text-brand-dark/50 text-lg mb-2">
                    {t("emptyCart")}
                  </p>
                  <button
                    onClick={handleClose}
                    className="text-sm font-sans text-brand-dark/70 underline hover:text-brand-dark transition-colors"
                  >
                    {t("backToMenu")}
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart items */}
                  <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                    {items.map((item) => {
                      const imgSrc = normalizeSrc(item.image) ?? "/images/placeholder-dish.jpg";
                      return (
                        <div
                          key={item.id}
                          className="flex gap-4 bg-brand-cream/50 p-3 rounded-sm"
                        >
                          {/* Thumbnail */}
                          <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-sm">
                            <Image
                              src={imgSrc}
                              alt={item.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-heading text-sm text-brand-dark leading-tight truncate">
                              {item.name}
                            </h4>
                            <p className="font-sans text-xs text-brand-dark/60 mt-0.5">
                              {item.price} СOM
                            </p>

                            {/* Quantity controls */}
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-6 h-6 flex items-center justify-center rounded-full border border-brand-dark/20 text-brand-dark/60 hover:border-brand-dark hover:text-brand-dark transition-colors text-xs"
                              >
                                −
                              </button>
                              <span className="font-sans text-sm font-medium text-brand-dark w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-6 h-6 flex items-center justify-center rounded-full border border-brand-dark/20 text-brand-dark/60 hover:border-brand-dark hover:text-brand-dark transition-colors text-xs"
                              >
                                +
                              </button>

                              {/* Remove */}
                              <button
                                onClick={() => removeItem(item.id)}
                                className="ml-auto text-[10px] text-red-500/60 hover:text-red-500 transition-colors uppercase tracking-wide"
                              >
                                {t("remove")}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer: total + checkout button */}
                  <div className="border-t border-brand-dark/10 px-6 py-4 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <span className="font-heading text-sm text-brand-dark/70">
                        {t("total")}
                      </span>
                      <span className="font-heading text-xl text-brand-dark">
                        {totalPrice} СOM
                      </span>
                    </div>
                    <button
                      onClick={() => setStep("checkout")}
                      className="w-full py-3 rounded-full bg-brand-dark text-brand-cream font-sans text-sm font-bold uppercase tracking-[1.5px] hover:bg-brand-dark/90 transition-colors"
                    >
                      {t("checkout")}
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {/* ─── STEP: CHECKOUT ─── */}
          {step === "checkout" && (
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {/* Back button */}
              <button
                onClick={() => {
                  setStep("cart");
                  setError("");
                }}
                className="flex items-center gap-1.5 text-sm text-brand-dark/60 hover:text-brand-dark transition-colors mb-6"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                {t("backToCart")}
              </button>

              <h3 className="font-heading text-lg text-brand-dark mb-6 tracking-wide">
                {t("deliveryDetails")}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="cart-name"
                    className="block font-sans text-xs font-semibold uppercase tracking-[1px] text-brand-dark/70 mb-1.5"
                  >
                    {t("nameLabel")} *
                  </label>
                  <input
                    id="cart-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("namePlaceholder")}
                    className="w-full px-4 py-3 rounded-sm border border-brand-dark/20 bg-white font-sans text-sm text-brand-dark placeholder:text-brand-dark/30 focus:outline-none focus:border-brand-dark transition-colors"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="cart-phone"
                    className="block font-sans text-xs font-semibold uppercase tracking-[1px] text-brand-dark/70 mb-1.5"
                  >
                    {t("phoneLabel")} *
                  </label>
                  <input
                    id="cart-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+996 (555) 00-00-00"
                    className="w-full px-4 py-3 rounded-sm border border-brand-dark/20 bg-white font-sans text-sm text-brand-dark placeholder:text-brand-dark/30 focus:outline-none focus:border-brand-dark transition-colors"
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="cart-address"
                    className="block font-sans text-xs font-semibold uppercase tracking-[1px] text-brand-dark/70 mb-1.5"
                  >
                    {t("addressLabel")} *
                  </label>
                  <input
                    id="cart-address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t("addressPlaceholder")}
                    className="w-full px-4 py-3 rounded-sm border border-brand-dark/20 bg-white font-sans text-sm text-brand-dark placeholder:text-brand-dark/30 focus:outline-none focus:border-brand-dark transition-colors"
                    required
                  />
                </div>

                {/* Comment */}
                <div>
                  <label
                    htmlFor="cart-comment"
                    className="block font-sans text-xs font-semibold uppercase tracking-[1px] text-brand-dark/70 mb-1.5"
                  >
                    {t("commentLabel")}
                  </label>
                  <textarea
                    id="cart-comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={t("commentPlaceholder")}
                    rows={3}
                    maxLength={500}
                    className="w-full px-4 py-3 rounded-sm border border-brand-dark/20 bg-white font-sans text-sm text-brand-dark placeholder:text-brand-dark/30 focus:outline-none focus:border-brand-dark transition-colors resize-none"
                  />
                  <p className="text-right text-[10px] text-brand-dark/40 mt-1">
                    {comment.length}/500
                  </p>
                </div>

                {/* Order summary */}
                <div className="bg-brand-cream/60 rounded-sm p-4 mt-4">
                  <p className="font-sans text-xs text-brand-dark/60 mb-2 uppercase tracking-[1px]">
                    {t("orderSummary")}
                  </p>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm font-sans text-brand-dark/80"
                    >
                      <span className="truncate mr-2">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="whitespace-nowrap">
                        {item.price * item.quantity} СOM
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between font-heading text-base text-brand-dark mt-2 pt-2 border-t border-brand-dark/10">
                    <span>{t("total")}</span>
                    <span>{totalPrice} СOM</span>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <p className="text-sm text-red-600 font-sans text-center">
                    {error}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-full bg-brand-dark text-brand-cream font-sans text-sm font-bold uppercase tracking-[1.5px] hover:bg-brand-dark/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      {t("submitting")}
                    </>
                  ) : (
                    t("submitOrder")
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}