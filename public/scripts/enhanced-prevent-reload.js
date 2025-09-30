// Enhanced reload prevention script
console.log('Enhanced reload prevention initialized');

// Override the location.reload function globally
const originalReload = window.location.reload;
window.location.reload = function(forceGet) {
  console.log('Reload intercepted');
  
  // Check if we're in a prompt editing context
  const activeElement = document.activeElement;
  const isEditing = activeElement && (
    activeElement.tagName === 'INPUT' || 
    activeElement.tagName === 'TEXTAREA' || 
    activeElement.isContentEditable ||
    activeElement.closest('form')
  );
  
  // If in editing mode or form, prevent reload completely
  if (isEditing) {
    console.warn('Prevented reload during editing');
    return false;
  }
  
  // Otherwise allow the reload
  return originalReload.apply(this, arguments);
};

// Disable any automatic script reloads
window.addEventListener('DOMContentLoaded', function() {
  // Find and disable the new.website script
  const newWebsiteScript = document.querySelector('script[src*="new.website"]');
  if (newWebsiteScript) {
    console.log('Found and disabling new.website script');
    newWebsiteScript.setAttribute('disabled', 'disabled');
    
    // Create a replacement dummy script to satisfy any dependencies
    const dummyScript = document.createElement('script');
    dummyScript.textContent = `
      // Dummy replacement for new.website script
      console.log('Using dummy new.website script');
      window.newWebsite = window.newWebsite || {
        init: function() { console.log('Dummy init called'); },
        reload: function() { console.log('Dummy reload prevented'); return false; }
      };
    `;
    newWebsiteScript.replaceWith(dummyScript);
  }
  
  // Handle all forms to prevent default submission behavior
  document.addEventListener('submit', function(e) {
    // Only prevent if it doesn't have a specific handling attribute
    if (!e.target.hasAttribute('data-form-type') && 
        !e.target.hasAttribute('action')) {
      console.log('Preventing form submission reload');
      e.preventDefault();
    }
  }, true);
  
  // Capture and prevent beforeunload events during prompt entry
  window.addEventListener('beforeunload', function(e) {
    const activeElement = document.activeElement;
    const isEditing = activeElement && (
      activeElement.tagName === 'INPUT' || 
      activeElement.tagName === 'TEXTAREA' || 
      activeElement.isContentEditable ||
      activeElement.closest('form')
    );
    
    if (isEditing) {
      console.log('Preventing page unload during editing');
      e.preventDefault();
      e.returnValue = '';
      return '';
    }
  });
}, { once: true });

// Protect against prompt submissions causing reloads
document.addEventListener('keydown', function(e) {
  // Check for Enter key
  if (e.key === 'Enter') {
    const activeElement = document.activeElement;
    const isInput = activeElement && (
      activeElement.tagName === 'INPUT' || 
      activeElement.tagName === 'TEXTAREA'
    );
    
    // If in a form input and not in a textarea with shift+enter
    if (isInput && !(activeElement.tagName === 'TEXTAREA' && e.shiftKey)) {
      // Check if inside a form without explicit handling
      const form = activeElement.closest('form');
      if (form && !form.hasAttribute('data-form-type') && !form.hasAttribute('action')) {
        console.log('Preventing Enter key form submission');
        e.preventDefault();
      }
    }
  }
});