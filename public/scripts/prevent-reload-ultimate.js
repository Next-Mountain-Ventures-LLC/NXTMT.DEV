// ULTIMATE RELOAD PREVENTION SCRIPT
// This aggressively blocks all page reloads and focuses on the new.website functionality
(function() {
  console.log('🛑 Ultimate reload prevention active');
  
  // Track user activity to determine if we're in an editing session
  let isEditingPrompt = false;
  let userActivity = false;
  let lastActivity = Date.now();

  function trackActivity() {
    userActivity = true;
    lastActivity = Date.now();
    
    // Check if user is editing a prompt
    const activeElement = document.activeElement;
    isEditingPrompt = activeElement && (
      activeElement.tagName === 'INPUT' || 
      activeElement.tagName === 'TEXTAREA' || 
      activeElement.isContentEditable ||
      activeElement.closest('form')
    );
  }

  // Track all user interaction
  ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, trackActivity, { passive: true });
  });

  // 1. Completely override location.reload to prevent ALL reloads
  const originalReload = window.location.reload;
  window.location.reload = function() {
    console.warn('🛑 Reload completely blocked');
    return false;
  };

  // 2. Block all script execution from new.website domain
  function blockNewWebsiteScripts() {
    // Remove any existing new.website scripts
    document.querySelectorAll('script[src*="new.website"]').forEach(script => {
      console.warn('🛑 Removing new.website script:', script.src);
      script.parentNode.removeChild(script);
    });
    
    // Create a dummy newWebsite object to satisfy any dependencies
    window.newWebsite = {
      init: function() { console.log('Dummy init called'); return false; },
      reload: function() { console.log('Dummy reload prevented'); return false; },
      // Add any other methods that might be called
      reconnect: function() { console.log('Dummy reconnect prevented'); return false; },
      connect: function() { console.log('Dummy connect prevented'); return false; },
      disconnect: function() { console.log('Dummy disconnect prevented'); return false; }
    };
  }

  // 3. Override history methods to prevent navigation changes
  const originalPushState = window.history.pushState;
  window.history.pushState = function() {
    console.log('History pushState intercepted');
    if (isEditingPrompt || (Date.now() - lastActivity < 30000)) {
      console.warn('🛑 Blocked pushState during active editing');
      return false;
    }
    try {
      return originalPushState.apply(this, arguments);
    } catch (e) {
      console.warn('Prevented error in history.pushState', e);
      return false;
    }
  };
  
  const originalReplaceState = window.history.replaceState;
  window.history.replaceState = function() {
    console.log('History replaceState intercepted');
    if (isEditingPrompt || (Date.now() - lastActivity < 30000)) {
      console.warn('🛑 Blocked replaceState during active editing');
      return false;
    }
    try {
      return originalReplaceState.apply(this, arguments);
    } catch (e) {
      console.warn('Prevented error in history.replaceState', e);
      return false;
    }
  };

  // 4. Block beforeunload and unload events
  window.addEventListener('beforeunload', function(e) {
    if (isEditingPrompt || (Date.now() - lastActivity < 30000)) {
      console.warn('🛑 Prevented page unload during active editing');
      e.preventDefault();
      e.returnValue = '';
      return '';
    }
  }, true);

  window.addEventListener('unload', function(e) {
    if (isEditingPrompt || (Date.now() - lastActivity < 30000)) {
      console.warn('🛑 Prevented unload during active editing');
      e.preventDefault();
      return false;
    }
  }, true);

  // 5. Intercept all fetches to new.website
  const originalFetch = window.fetch;
  window.fetch = function(resource, init) {
    if (typeof resource === 'string' && resource.includes('new.website')) {
      console.warn('🛑 Intercepted fetch to new.website:', resource);
      // Return a fake successful response
      return Promise.resolve(new Response(JSON.stringify({success: true, status: "ok"}), {
        status: 200,
        headers: {'Content-Type': 'application/json'}
      }));
    }
    return originalFetch.apply(this, arguments);
  };

  // 6. Intercept XMLHttpRequest to new.website
  const originalXhrOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    if (typeof url === 'string' && url.includes('new.website')) {
      console.warn('🛑 Blocked XMLHttpRequest to new.website:', url);
      // Point to a non-existent endpoint that will fail silently
      url = 'about:blank';
    }
    return originalXhrOpen.call(this, method, url, ...rest);
  };

  // 7. Override timers to prevent potential reload loops
  const originalSetTimeout = window.setTimeout;
  window.setTimeout = function(callback, delay, ...args) {
    // Only intercept short timeouts that might be reload-related
    if (typeof callback === 'function' && delay < 5000) {
      const wrappedCallback = function() {
        try {
          if (!isEditingPrompt && Date.now() - lastActivity > 30000) {
            return callback.apply(this, args);
          } else {
            console.log('Skipped timer callback during active editing');
            return false;
          }
        } catch (e) {
          console.warn('Prevented error in setTimeout callback', e);
          return false;
        }
      };
      return originalSetTimeout.call(this, wrappedCallback, delay);
    }
    return originalSetTimeout.apply(this, arguments);
  };

  // Similar for setInterval
  const originalSetInterval = window.setInterval;
  window.setInterval = function(callback, delay, ...args) {
    if (typeof callback === 'function' && delay < 10000) {
      const wrappedCallback = function() {
        try {
          if (!isEditingPrompt && Date.now() - lastActivity > 30000) {
            return callback.apply(this, args);
          } else {
            console.log('Skipped interval callback during active editing');
            return false;
          }
        } catch (e) {
          console.warn('Prevented error in setInterval callback', e);
          return false;
        }
      };
      return originalSetInterval.call(this, wrappedCallback, delay);
    }
    return originalSetInterval.apply(this, arguments);
  };

  // 8. Use MutationObserver to detect and remove problematic elements
  function setupMutationObserver() {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(function(node) {
            // Check if this is an element node
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Remove any scripts from new.website
              if (node.tagName === 'SCRIPT') {
                const script = node;
                if (script.src && script.src.includes('new.website')) {
                  console.warn('🛑 Removing dynamically added script:', script.src);
                  script.remove();
                }
              }
              
              // Also check for script tags inside the added node
              const scripts = node.querySelectorAll('script[src*="new.website"]');
              scripts.forEach(script => {
                console.warn('🛑 Removing nested script:', script.src);
                script.remove();
              });
              
              // Block potential meta refresh tags
              const metaTags = node.querySelectorAll('meta[http-equiv="refresh"]');
              metaTags.forEach(tag => {
                console.warn('🛑 Removing refresh meta tag');
                tag.remove();
              });
            }
          });
        }
      });
    });
    
    // Start observing the entire document
    observer.observe(document, { 
      childList: true, 
      subtree: true 
    });
    
    return observer;
  }

  // 9. Prevent form submissions that might trigger page reloads
  function blockFormSubmissions() {
    document.addEventListener('submit', function(e) {
      const form = e.target;
      // Only prevent if it's not explicitly allowed
      if (!form.hasAttribute('data-form-type') && !form.hasAttribute('data-allow-submit')) {
        console.log('🛑 Preventing form submission');
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, true);
    
    // Also prevent Enter key from submitting forms
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        const activeElement = document.activeElement;
        if (activeElement && (
          activeElement.tagName === 'INPUT' ||
          (activeElement.tagName === 'TEXTAREA' && !activeElement.hasAttribute('data-allow-enter'))
        )) {
          const form = activeElement.closest('form');
          if (form && !form.hasAttribute('data-form-type') && !form.hasAttribute('data-allow-submit')) {
            console.log('🛑 Preventing Enter key form submission');
            e.preventDefault();
            return false;
          }
        }
      }
    }, true);
  }

  // Main initialization function
  function initializeReloadPrevention() {
    console.log('🛑 Initializing ultimate reload prevention');
    
    // Run all preventative measures
    blockNewWebsiteScripts();
    setupMutationObserver();
    blockFormSubmissions();
    
    // Set up periodic checking for new.website scripts
    setInterval(function() {
      blockNewWebsiteScripts();
    }, 5000);

    console.log('🛑 All reload prevention measures active');
  }

  // Run initialization immediately and on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeReloadPrevention);
  } else {
    initializeReloadPrevention();
  }
  
  // Run immediately to catch any early attempts
  blockNewWebsiteScripts();
})();