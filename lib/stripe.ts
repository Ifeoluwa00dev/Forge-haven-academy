import Stripe from "stripe";

// Server-only. STRIPE_SECRET_KEY must never be exposed with a
// NEXT_PUBLIC_ prefix or used in a "use client" component.
export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_placeholder",
  {
    apiVersion: "2026-08-26.dahlia",
  }
);

// PLACEHOLDER conversion rate — this needs to be confirmed with the
// client. Once she gives an exact Naira price for an event, store that
// directly instead of converting from the USD figure at checkout time.
export const NGN_PER_USD_PLACEHOLDER = 1500;

export function usdToNgnKobo(usdAmount: number): number {
  // Stripe amounts are in the smallest currency unit — for NGN that's
  // kobo (1 NGN = 100 kobo), same idea as cents for USD.
  const ngnAmount = usdAmount * NGN_PER_USD_PLACEHOLDER;
  return Math.round(ngnAmount * 100);
}