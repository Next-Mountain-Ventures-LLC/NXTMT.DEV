/**
 * Stripe Client-side Utility Functions
 * 
 * This file contains safe client-side utilities for Stripe integration.
 * No sensitive API keys are stored here.
 */

import { loadStripe } from '@stripe/stripe-js';

// Publishable key is safe to include in client-side code
// This should be your Stripe publishable key, not the secret key
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51HP6LDK0WMG0vZwdMALnzxzdJ2cD9nppBxbHb7vGJ3Cka1JGEgyu8Q2vdMKdYwVCNKQmZ9DdL3oRkENQUGxY5J6F00eoKQxKgY';

// Initialize Stripe with the publishable key
let stripePromise: Promise<any> | null = null;

/**
 * Gets the Stripe instance (initializes it if not already done)
 */
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

/**
 * Redirects to Stripe Checkout for domain purchase
 * 
 * @param domains Array of domain names with prices to purchase
 * @param email Customer's email address
 * @returns Promise that resolves after redirecting to Stripe
 */
export const redirectToCheckout = async (
  domains: { name: string; price: number }[],
  email: string
) => {
  try {
    // Call our API endpoint to create a checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        domains,
        email,
        success_url: `${window.location.origin}/domains/success`,
        cancel_url: `${window.location.origin}/domains`
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create checkout session: ${errorText}`);
    }

    const { sessionId } = await response.json();

    // Get Stripe instance and redirect to checkout
    const stripe = await getStripe();
    const result = await stripe.redirectToCheckout({ sessionId });

    if (result.error) {
      throw new Error(result.error.message);
    }

    return { success: true };
  } catch (error) {
    console.error('Error redirecting to Stripe checkout:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};