// Prevent automatic page reloads
console.log('Initializing reload prevention...');

// Create a variable to track if we're in a reload loop
let reloadCount = 0;
const RELOAD_THRESHOLD = 3; // Maximum allowed reloads in quick succession
const RELOAD_TIMEFRAME = 5000; // 5 seconds timeframe

// Get the reload count from session storage or initialize it
function getReloadData() {
  const storedData = sessionStorage.getItem('reloadData');
  if (storedData) {
    return JSON.parse(storedData);
  } else {
    return { count: 0, lastTime: 0 };
  }
}

// Save reload data to session storage
function saveReloadData(data) {
  sessionStorage.setItem('reloadData', JSON.stringify(data));
}

document.addEventListener('DOMContentLoaded', () => {
  const now = Date.now();
  const reloadData = getReloadData();
  
  // If we're reloading too frequently
  if (now - reloadData.lastTime < RELOAD_TIMEFRAME) {
    reloadData.count++;
    
    if (reloadData.count >= RELOAD_THRESHOLD) {
      console.error('Reload loop detected! Taking preventive action...');
      
      // Look for and disable potential causes
      const newWebsiteScript = document.querySelector('script[src*="new.website"]');
      if (newWebsiteScript) {
        console.log('Disabling new.website script to prevent reloads');
        newWebsiteScript.setAttribute('disabled', 'disabled');
        newWebsiteScript.remove();
      }
      
      // Override the location.reload function to prevent further reloads
      const originalReload = window.location.reload;
      window.location.reload = function() {
        console.log('Reload prevented');
        return false;
      };
      
      // Reset counter after taking action
      reloadData.count = 0;
    }
  } else {
    // Not a frequent reload, reset counter
    reloadData.count = 1;
  }
  
  // Update last reload time
  reloadData.lastTime = now;
  saveReloadData(reloadData);
  
  // Listen for beforeunload to check if it's a user-initiated navigation
  window.addEventListener('beforeunload', (event) => {
    const activeElement = document.activeElement;
    
    // If the user is typing in an input field, prevent refresh
    if (activeElement && (
      activeElement.tagName === 'INPUT' || 
      activeElement.tagName === 'TEXTAREA' || 
      activeElement.isContentEditable
    )) {
      const reloadData = getReloadData();
      if (reloadData.count >= RELOAD_THRESHOLD - 1) {
        console.log('Preventing reload while editing');
        event.preventDefault();
        return (event.returnValue = 'Changes you made may not be saved.');
      }
    }
  });
});

// Patch any known issue points
document.addEventListener('submit', (e) => {
  // Prevent forms without explicit handling from reloading the page
  if (!e.target.hasAttribute('data-form-type') && 
      !e.target.hasAttribute('action')) {
    console.log('Preventing form submission reload');
    e.preventDefault();
  }
});