// Balanced reload prevention script
// This script prevents unwanted reloads but allows normal website functionality
(function() {
  console.log('Initializing balanced reload prevention...');
  
  // Variables to track state
  let isEditing = false;
  let reloadCount = 0;
  const RELOAD_THRESHOLD = 2; // Number of rapid reloads before prevention
  const RELOAD_WINDOW = 3000; // Time window for counting reloads (ms)
  let lastReloadTime = 0;
  
  // Check if we're in the editor
  const isInNewWebsiteEditor = window.location.hostname.includes('new.website') ||
                               window.location.search.includes('editor=true');

  // Only block when absolutely necessary (in editor mode)
  if (isInNewWebsiteEditor) {
    // Track when user is actively editing (typing, clicking on form fields)
    document.addEventListener('input', function(e) {
      if (e.target.tagName === 'INPUT' || 
          e.target.tagName === 'TEXTAREA' || 
          e.target.isContentEditable) {
        isEditing = true;
        setTimeout(() => { isEditing = false; }, 5000); // Reset after 5 seconds of inactivity
      }
    }, true);
    
    // Block rapid successive reloads
    const originalReload = window.location.reload;
    window.location.reload = function(...args) {
      const now = Date.now();
      
      // If we're in a rapid reload cycle
      if (now - lastReloadTime < RELOAD_WINDOW) {
        reloadCount++;
        
        // If we're editing or have hit the threshold, prevent reload
        if (isEditing || reloadCount >= RELOAD_THRESHOLD) {
          console.warn('Prevented reload while editing or due to rapid reloads');
          return false;
        }
      } else {
        // Reset counter if enough time has passed
        reloadCount = 0;
      }
      
      // Update last reload time
      lastReloadTime = now;
      
      // Allow the reload
      return originalReload.apply(this, args);
    };
  }
  
  // Handle specific new.website script integration more carefully
  function handleNewWebsiteScripts() {
    // Remove any broken or duplicate new.website scripts
    const scripts = document.querySelectorAll('script[src*="new.website"]');
    if (scripts.length > 1) {
      // Keep only the first instance
      for (let i = 1; i < scripts.length; i++) {
        scripts[i].remove();
      }
    }
  }
  
  // Prevent form submissions that might reload the page unexpectedly
  document.addEventListener('submit', function(e) {
    const form = e.target;
    
    // Only prevent forms without explicit handling that aren't utility forms
    if (!form.hasAttribute('action') && 
        !form.hasAttribute('data-form-type') && 
        form.method.toLowerCase() !== 'post') {
      console.log('Preventing form submission that would cause navigation');
      e.preventDefault();
    }
  }, false);

  // Run script initialization
  document.addEventListener('DOMContentLoaded', function() {
    handleNewWebsiteScripts();
  });
  
  // Clean up any broken scripts immediately
  if (document.readyState !== 'loading') {
    handleNewWebsiteScripts();
  }
})();