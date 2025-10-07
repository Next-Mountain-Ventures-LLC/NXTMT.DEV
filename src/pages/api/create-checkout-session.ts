import type { APIRoute } from 'astro';
import { createDomainCheckoutSession } from '@/utils/stripe-server';

export const post: APIRoute = async ({ request }) => {
  try {
    // Parse the request body
    const body = await request.json();
    const { domains, email, success_url, cancel_url } = body;
    
    // Validate required fields
    if (!domains || !Array.isArray(domains) || domains.length === 0) {
      return new Response(
        JSON.stringify({ error: 'At least one domain is required' }),
        { status: 400 }
      );
    }
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Customer email is required' }),
        { status: 400 }
      );
    }
    
    // Create Stripe checkout session
    const session = await createDomainCheckoutSession(
      domains,
      email,
      success_url || `${new URL(request.url).origin}/domains/success`,
      cancel_url || `${new URL(request.url).origin}/domains`
    );
    
    // Return the session details
    return new Response(
      JSON.stringify({ 
        sessionId: session.sessionId,
        url: session.url
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    // Return error response
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An error occurred processing your request' 
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};