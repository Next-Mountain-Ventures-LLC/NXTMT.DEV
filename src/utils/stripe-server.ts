/**
 * Stripe Server-side Utility Functions
 * 
 * IMPORTANT: This file should ONLY be imported in server-side code (API routes),
 * never in client-side components. The API key must remain server-side only.
 */

import Stripe from 'stripe';

// Initialize Stripe with the API key
// In a production environment, this would be stored in environment variables
// NEVER expose this key in client-side code or public repositories
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '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', {
  apiVersion: '2023-10-16' // Use the latest stable API version
});

/**
 * Creates a Stripe checkout session for domain purchases
 * 
 * @param domains Array of domains to purchase with prices
 * @param customerEmail Customer's email address
 * @param successUrl URL to redirect to after successful payment
 * @param cancelUrl URL to redirect to if payment is cancelled
 * @returns Checkout session ID and URL
 */
export async function createDomainCheckoutSession(
  domains: { name: string; price: number }[],
  customerEmail: string,
  successUrl: string,
  cancelUrl: string
) {
  try {
    // Create line items for each domain
    const lineItems = domains.map(domain => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `Domain Registration: ${domain.name}`,
          description: `1-year registration for ${domain.name}`,
          metadata: {
            domain_name: domain.name,
            type: 'domain_registration'
          }
        },
        unit_amount: Math.round(domain.price * 100), // Stripe uses cents
      },
      quantity: 1,
    }));

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: customerEmail,
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        domains: JSON.stringify(domains.map(d => d.name)),
        type: 'domain_registration'
      }
    });

    return {
      sessionId: session.id,
      url: session.url
    };
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    throw error;
  }
}

/**
 * Verifies a Stripe webhook signature
 * 
 * @param payload The raw request body
 * @param signature The Stripe signature from the request header
 * @returns The verified Stripe event object
 */
export async function verifyStripeWebhook(payload: string, signature: string) {
  try {
    // In a production environment, this would be stored in environment variables
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';
    
    // Verify the webhook signature
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    return event;
  } catch (error) {
    console.error('Error verifying Stripe webhook:', error);
    throw error;
  }
}

/**
 * Handles successful domain registration payments
 * 
 * @param session The Stripe checkout session
 * @returns Result of domain registration process
 */
export async function handleDomainRegistrationSuccess(session: Stripe.Checkout.Session) {
  try {
    // Extract domain names from session metadata
    const domainsJson = session.metadata?.domains || '[]';
    const domainNames = JSON.parse(domainsJson);
    
    // In a real implementation, this would call the domain registrar API
    // to register the domains after payment confirmation
    
    return {
      success: true,
      message: `Successfully processed payment for domains: ${domainNames.join(', ')}`,
      domains: domainNames
    };
  } catch (error) {
    console.error('Error handling domain registration:', error);
    throw error;
  }
}

export default stripe;