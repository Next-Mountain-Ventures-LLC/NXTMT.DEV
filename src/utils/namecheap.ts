/**
 * Namecheap API Utility Functions
 * 
 * This file contains utilities for interacting with the Namecheap API
 * to check domain availability and handle domain registrations.
 * 
 * Note: This is a client-side simulation of the Namecheap API.
 * In a production environment, you would need to implement a server-side
 * proxy to make the actual API calls to avoid CORS and IP validation issues.
 */

// Namecheap API credentials - stored here for demonstration
// In a real implementation, these would be kept server-side
const API_USER = 'nextmountain'; // API username 
const API_KEY = 'b73dec8a04e245a78e9c531a5e43db86'; // API key
const USER_NAME = API_USER; // Usually the same as API_USER
const CLIENT_IP = '127.0.0.1'; // Server's public IP address

// These credentials would be used server-side only
// Client-side code would call a server endpoint that uses these credentials

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
 * Check if domains are available - Client-side simulation
 * @param domains Array of domains to check (without TLD if checkAllTlds is true)
 * @param checkAllTlds Whether to check all popular TLDs for each domain
 * @returns Promise with array of domain availability results
 */
export const checkDomainAvailability = async (
  domains: string[],
  checkAllTlds = false
): Promise<DomainAvailability[]> => {
  // This is a stub that would call your backend API
  console.log('In a real implementation, this would call your backend API with:', {
    domains,
    checkAllTlds,
    credentials: {
      ApiUser: API_USER,
      UserName: USER_NAME,
      // ApiKey would be server-side only
    }
  });
  
  // For now, we'll just call our simulation function
  return simulateCheckDomainAvailability(domains, checkAllTlds);
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

/**
 * For client-side implementation, we'll create a simulated version
 * This will avoid CORS issues and ClientIP validation requirements
 */
export const simulateCheckDomainAvailability = async (
  domains: string[],
  checkAllTlds = false
): Promise<DomainAvailability[]> => {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // If checkAllTlds is true, expand each domain with all TLDs
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
  
  // Generate simulated results
  return domainsToCheck.map(domain => {
    const tld = domain.substring(domain.lastIndexOf('.'));
    
    // Make common TLDs less likely to be available
    const availabilityChance = tld === '.com' ? 0.2 : 
                               tld === '.net' || tld === '.org' ? 0.4 : 0.7;
    
    // Simulate some special cases for testing
    const isSpecialCase = domain.includes('test') || 
                          domain.includes('example') ||
                          domain.includes('nextmountain');
    
    return {
      domain,
      available: isSpecialCase ? true : Math.random() > (1 - availabilityChance),
      price: getPricingForDomain(domain)
    };
  });
};