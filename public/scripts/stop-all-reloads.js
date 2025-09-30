// AGGRESSIVE RELOAD PREVENTION
// This script blocks all automatic page reloads
(function() {
  console.log('🛑 Aggressive reload prevention active');
  
  // First, override the reload function immediately
  const originalReload = window.location.reload;
  window.location.reload = function() {
    console.warn('🛑 Reload blocked by prevention script');
    return false;
  };
  
  // Override fetch to prevent any reload-triggering requests
  const originalFetch = window.fetch;
  window.fetch = function(resource, options) {
    // Check if this is a request to new.website
    if (resource && typeof resource === 'string' && resource.includes('new.website')) {
      console.warn('🛑 Blocking fetch request to new.website');
      return Promise.resolve(new Response('{"status":"ok"}', {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }));
    }
    return originalFetch.apply(this, arguments);
  };
  
  // Override setInterval and setTimeout to prevent reload timers
  const originalSetInterval = window.setInterval;
  window.setInterval = function(callback, delay, ...args) {
    // Wrap the callback to prevent page reloads
    const safeCallback = typeof callback === 'function' 
      ? function() {
          try {
            return callback.apply(this, arguments);
          } catch (e) {
            console.warn('🛑 Caught error in interval callback', e);
            return false;
          }
        }
      : callback;
      
    return originalSetInterval.call(this, safeCallback, delay, ...args);
  };
  
  const originalSetTimeout = window.setTimeout;
  window.setTimeout = function(callback, delay, ...args) {
    // Wrap the callback to prevent page reloads
    const safeCallback = typeof callback === 'function' 
      ? function() {
          try {
            return callback.apply(this, arguments);
          } catch (e) {
            console.warn('🛑 Caught error in timeout callback', e);
            return false;
          }
        }
      : callback;
      
    return originalSetTimeout.call(this, safeCallback, delay, ...args);
  };
  
  // Run this as soon as possible
  function setupPreventions() {
    // Remove any script that might cause reloads
    document.querySelectorAll('script[src*="new.website"]').forEach(script => {
      console.warn('🛑 Removing script:', script.src);
      script.remove();
    });
    
    // Also stop any potential meta refresh
    document.querySelectorAll('meta[http-equiv="refresh"]').forEach(meta => {
      console.warn('🛑 Removing refresh meta tag');
      meta.remove();
    });
    
    // Hijack history methods that might cause reloads
    const originalPushState = history.pushState;
    history.pushState = function() {
      console.log('History pushState intercepted');
      try {
        return originalPushState.apply(this, arguments);
      } catch (e) {
        console.warn('Prevented error in history.pushState', e);
        return false;
      }
    };
    
    const originalReplaceState = history.replaceState;
    history.replaceState = function() {
      console.log('History replaceState intercepted');
      try {
        return originalReplaceState.apply(this, arguments);
      } catch (e) {
        console.warn('Prevented error in history.replaceState', e);
        return false;
      }
    };
    
    // Handle the beforeunload event to prevent unintended navigation
    window.addEventListener('beforeunload', function(e) {
      console.warn('🛑 Preventing page unload');
      e.preventDefault();
      e.returnValue = '';
      return '';
    });
    
    // Block document.write which can trigger reflows/reloads
    const originalWrite = document.write;
    document.write = document.writeln = function() {
      console.warn('🛑 document.write blocked');
      return false;
    };
    
    // Intercept window open which might cause focus shifts
    const originalOpen = window.open;
    window.open = function() {
      console.warn('🛑 window.open intercepted and blocked');
      return null;
    };
    
    // MutationObserver to catch and remove any dynamically added scripts
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(function(node) {
            // Check for scripts that might cause reloads
            if (node.tagName === 'SCRIPT') {
              const script = node;
              if (script.src && script.src.includes('new.website')) {
                console.warn('🛑 Removing dynamically added script:', script.src);
                script.remove();
              }
            }
          });
        }
      });
    });
    
    // Start observing the document
    observer.observe(document, { 
      childList: true, 
      subtree: true 
    });
    
    console.log('🛑 All reload preventions are now active');
  }
  
  // Set up on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupPreventions);
  } else {
    // DOM already loaded
    setupPreventions();
  }
  
  // Also run it right away in case scripts are already trying to reload
  setupPreventions();
})();