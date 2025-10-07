import type { APIRoute } from 'astro';
import { verifyStripeWebhook, handleDomainRegistrationSuccess } from '@/utils/stripe-server';

export const post: APIRoute = async ({ request }) => {
  try {
    // Get the signature from the header
    const signature = request.headers.get('stripe-signature') || '';
    
    // Get the raw body text
    const body = await request.text();
    
    // Verify the webhook
    const event = await verifyStripeWebhook(body, signature);
    
    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        
        // Check if this is a domain registration
        if (session.metadata?.type === 'domain_registration') {
          await handleDomainRegistrationSuccess(session);
        }
        
        break;
      }
      // Add more event handlers as needed
    }
    
    // Return success
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error handling webhook:', error);
    
    // Return error
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Webhook error' 
      }),
      { 
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};