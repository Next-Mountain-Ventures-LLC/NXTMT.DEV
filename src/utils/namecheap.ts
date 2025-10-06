/**
 * Namecheap API Utility Functions
 * 
 * This file contains utilities for interacting with the Namecheap API
 * to check domain availability and handle domain registrations.
 * 
 * This integrates with our server-side API proxy that handles the 
 * actual Namecheap API calls with proper authentication.
 */

// API endpoint for our server that proxies Namecheap requests
const DOMAIN_API_ENDPOINT = 'https://api.new.website/api/domains/check';

// API credentials are stored securely on the server
// We don't need to include them in client-side code

// Common TLDs to check
export const POPULAR_TLDS = [
  '.com', '.net', '.org', '.io', '.co',
  '.dev', '.app', '.site', '.online', '.store'
];

/**
 * Interface for domain availability result
 */
export interface DomainAvailability {
  domain: string;
  available: boolean;
  errorMessage?: string;
  price?: number; // We don't get this from the API directly, but we can add it
}

/**
 * Server-side implementation of domain check (commented out as it requires server-side code)
 * This would be implemented on your API server, not in client-side code
 * 
 * Example server-side implementation:
 * 
 * ```
 * // Server-side code (e.g., in a Next.js API route)
 * export async function checkDomainsAPI(req, res) {
 *   const { domains } = req.body;
 *   
 *   // Build the Namecheap API URL
 *   const url = new URL('https://api.namecheap.com/xml.response');
 *   url.searchParams.append('ApiUser', process.env.NAMECHEAP_API_USER);
 *   url.searchParams.append('ApiKey', process.env.NAMECHEAP_API_KEY);
 *   url.searchParams.append('UserName', process.env.NAMECHEAP_USER_NAME);
 *   url.searchParams.append('ClientIp', process.env.SERVER_IP);
 *   url.searchParams.append('Command', 'namecheap.domains.check');
 *   url.searchParams.append('DomainList', domains.join(','));
 *   
 *   // Make the request
 *   const response = await fetch(url.toString());
 *   const xmlText = await response.text();
 *   
 *   // Parse XML (requires xml2js or similar)
 *   const result = await parseXml(xmlText);
 *   
 *   // Transform and return results
 *   // ...
 *   
 *   res.status(200).json({ results });
 * }
 * ```
 */

/**
 * Check if domains are available using our server API
 * @param domains Array of domains to check (without TLD if checkAllTlds is true)
 * @param checkAllTlds Whether to check all popular TLDs for each domain
 * @returns Promise with array of domain availability results
 */
export const checkDomainAvailability = async (
  domains: string[],
  checkAllTlds = false
): Promise<DomainAvailability[]> => {
  try {
    // Prepare domains to check
    let domainsToCheck: string[] = [];
    
    if (checkAllTlds) {
      domains.forEach(domain => {
        // Make sure the domain doesn't already have a TLD
        const baseDomain = domain.includes('.') 
          ? domain.substring(0, domain.lastIndexOf('.')) 
          : domain;
          
        POPULAR_TLDS.forEach(tld => {
          domainsToCheck.push(`${baseDomain}${tld}`);
        });
      });
    } else {
      domainsToCheck = domains;
    }

    // Call our server-side API endpoint
    const response = await fetch(DOMAIN_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ domains: domainsToCheck }),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${errorText}`);
    }

    // Parse the JSON response
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    // Map the API response to our interface
    return data.domains.map((domain: any): DomainAvailability => ({
      domain: domain.name,
      available: domain.available,
      price: domain.price || getPricingForDomain(domain.name),
      errorMessage: domain.error
    }));
  } catch (error) {
    console.error('Error checking domain availability:', error);
    
    // Return an error result for each domain
    return domains.map(domain => ({
      domain,
      available: false,
      errorMessage: error instanceof Error ? error.message : String(error)
    }));
  }
};

/**
 * Get a placeholder price for a domain based on TLD
 * In a real implementation, you might get these from the API or a configuration
 */
export const getPricingForDomain = (domain: string): number => {
  const tld = domain.substring(domain.lastIndexOf('.'));
  
  // Return a placeholder price based on TLD
  switch (tld) {
    case '.com': return 14.99;
    case '.net': return 12.99;
    case '.org': return 13.99;
    case '.io': return 39.99;
    case '.co': return 24.99;
    case '.dev': return 18.99;
    case '.app': return 19.99;
    case '.site': return 16.99;
    case '.online': return 9.99;
    case '.store': return 29.99;
    default: return 19.99;
  }
};

// Simulation function has been removed as we're using the real API now