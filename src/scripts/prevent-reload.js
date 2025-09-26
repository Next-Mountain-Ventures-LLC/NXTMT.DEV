// Prevent automatic page reloads
console.log('Initializing reload prevention...');

// Create a variable to track if we're in a reload loop
let reloadCount = 0;
const RELOAD_THRESHOLD = 3; // Maximum allowed reloads in quick succession
const RELOAD_TIMEFRAME = 5000; // 5 seconds timeframe

// Function to safely get from session storage
function getReloadData() {
  try {
    const data = sessionStorage.getItem('reloadTracker');
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading reload data:', e);
  }
  
  return { count: 0, lastTime: 0 };
}

// Function to safely save to session storage
function saveReloadData(data) {
  try {
    sessionStorage.setItem('reloadTracker', JSON.stringify(data));
  } catch (e) {
    console.error('Error saving reload data:', e);
  }
}

// On page load, check if we're in a reload loop
document.addEventListener('DOMContentLoaded', () => {
  const now = Date.now();
  const reloadData = getReloadData();
  
  // If we're reloading too frequently
  if (now - reloadData.lastTime < RELOAD_TIMEFRAME) {
    reloadData.count++;
    console.warn(`Rapid reload detected (${reloadData.count} in ${RELOAD_TIMEFRAME}ms)`);
    
    if (reloadData.count >= RELOAD_THRESHOLD) {
      console.error('Reload loop detected! Taking preventive action...');
      
      // Look for and disable potential causes
      
      // 1. Disable the new.website script
      const newWebsiteScript = document.querySelector('script[src*="new.website"]');
      if (newWebsiteScript) {
        console.warn('Found new.website script - disabling');
        newWebsiteScript.setAttribute('disabled', 'disabled');
        newWebsiteScript.remove();
      }
      
      // 2. Check for meta refresh tags
      const metaTags = document.querySelectorAll('meta[http-equiv="refresh"]');
      if (metaTags.length > 0) {
        console.warn('Found meta refresh tags - removing');
        metaTags.forEach(tag => tag.remove());
      }
      
      // 3. Override the reload function
      const originalReload = window.location.reload;
      window.location.reload = function() {
        console.warn('Reload attempt blocked to prevent infinite loop');
        return false;
      };
      
      // Reset counter after taking action
      reloadData.count = 0;
    }
  } else {
    // Reset counter if enough time has passed
    reloadData.count = 1;
  }
  
  reloadData.lastTime = now;
  saveReloadData(reloadData);
  
  // Add debugging message
  console.log('Page load complete - monitoring for reload loops');
});