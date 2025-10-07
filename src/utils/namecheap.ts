/**
 * Namecheap API Utility Functions
 * 
 * This file contains utilities for interacting with the Namecheap API
 * to check domain availability and handle domain registrations.
 * 
 * For testing and development purposes, we're using simulated data until
 * server-side authentication is properly set up.
 */

// For server-side implementation, these credentials would be kept in environment variables
// We're using simulation for client-side until API access is working

// Since we're having authentication issues with the real Namecheap API,
// we'll use simulation data instead of making actual API calls

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
 * Check domain availability (simulated)
 * 
 * This implementation simulates checking domain availability until 
 * the server-side API authentication is resolved. The simulation provides
 * realistic data for testing the UI and user flow.
 * 
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

    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate simulated results
    const results = domainsToCheck.map(domain => {
      const tld = domain.substring(domain.lastIndexOf('.'));
      
      // Make common TLDs less likely to be available
      const availabilityChance = 
        tld === '.com' ? 0.2 :  // 20% chance of .com being available
        tld === '.net' ? 0.4 :  // 40% chance of .net being available
        tld === '.org' ? 0.5 :  // 50% chance of .org being available
        tld === '.io' ? 0.7 :   // 70% chance of .io being available
        0.8;                    // 80% chance of other TLDs being available
      
      // Some domains are consistently available or unavailable for testing
      const isAlwaysAvailable = 
        domain.includes('test') || 
        domain.includes('example') || 
        domain.includes('demo');
        
      const isNeverAvailable = 
        domain.includes('google') || 
        domain.includes('microsoft') || 
        domain.includes('amazon');
      
      // Determine availability
      const available = 
        isAlwaysAvailable ? true :
        isNeverAvailable ? false :
        Math.random() < availabilityChance;
      
      return {
        domain,
        available,
        price: getPricingForDomain(domain),
        // Only add error message if there's an actual error
        ...(available ? {} : { errorMessage: null })
      };
    });
    
    return results;
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