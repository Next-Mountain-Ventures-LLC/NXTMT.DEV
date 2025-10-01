// Bloom Form Loader
// This script handles loading and displaying Bloom forms with enhanced error handling

(function() {
    console.log('[Bloom] Loader initializing');
    
    // Configuration
    const BLOOM_CONFIG = {
        formId: 'j469v68857e0q',
        userId: '38kd520pldwvr',
        profileId: 'kxe70rqrq7o4z'
    };
    
    let loadAttempts = 0;
    const maxAttempts = 3;
    let scriptLoaded = false;
    
    function log(message, level = 'info') {
        console[level](`[Bloom] ${message}`);
    }
    
    function showLoading() {
        const containers = document.querySelectorAll('[data-bloom-form-id="' + BLOOM_CONFIG.formId + '"]');
        containers.forEach(container => {
            if (!container.querySelector('.bloom-loading')) {
                container.innerHTML = `
                    <div class="bloom-loading" style="display: flex; align-items: center; justify-content: center; padding: 3rem; color: #9CA3AF;">
                        <div style="
                            width: 32px; 
                            height: 32px; 
                            border: 2px solid #374151; 
                            border-top-color: #3B82F6; 
                            border-radius: 50%; 
                            animation: spin 1s linear infinite;
                        "></div>
                        <span style="margin-left: 12px;">Loading form...</span>
                    </div>
                    <style>
                        @keyframes spin {
                            to { transform: rotate(360deg); }
                        }
                    </style>
                `;
            }
        });
    }
    
    function hideLoading() {
        const loadingElements = document.querySelectorAll('.bloom-loading');
        loadingElements.forEach(el => el.remove());
    }
    
    function showError(message = 'Form temporarily unavailable') {
        const containers = document.querySelectorAll('[data-bloom-form-id="' + BLOOM_CONFIG.formId + '"]');
        containers.forEach(container => {
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #EF4444;">
                    <p>${message}</p>
                    <button onclick="window.bloomLoader.retry()" style="
                        margin-top: 1rem;
                        background: #3B82F6;
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 6px;
                        cursor: pointer;
                    ">
                        Try Again
                    </button>
                </div>
            `;
        });
    }
    
    function loadBloomScript() {
        loadAttempts++;
        log(`Loading attempt ${loadAttempts}/${maxAttempts}`);
        
        if (scriptLoaded) {
            log('Script already loaded');
            return Promise.resolve();
        }
        
        return new Promise((resolve, reject) => {
            // Set global settings
            window.bloomSettings = {
                userId: BLOOM_CONFIG.userId,
                profileId: BLOOM_CONFIG.profileId
            };
            
            // Check if script already exists
            const existingScript = document.querySelector('script[src*="bloom.io/widget"]');
            if (existingScript) {
                log('Script already exists in DOM');
                scriptLoaded = true;
                resolve();
                return;
            }
            
            // Fetch version and load script
            const versionUrl = `https://code.bloom.io/version?t=${Date.now()}`;
            log(`Fetching version from ${versionUrl}`);
            
            fetch(versionUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Version fetch failed: ${response.status}`);
                    }
                    return response.text();
                })
                .then(version => {
                    log(`Got version: ${version}`);
                    
                    const script = document.createElement('script');
                    script.async = true;
                    script.src = `https://code.bloom.io/widget.js?v=${version}`;
                    
                    script.onload = () => {
                        log('Script loaded successfully');
                        scriptLoaded = true;
                        hideLoading();
                        resolve();
                    };
                    
                    script.onerror = (error) => {
                        log(`Script load error: ${error}`, 'error');
                        reject(new Error('Script failed to load'));
                    };
                    
                    document.head.appendChild(script);
                })
                .catch(error => {
                    log(`Load error: ${error.message}`, 'error');
                    reject(error);
                });
        });
    }
    
    function initializeBloom() {
        log('Initializing Bloom form');
        
        // Show loading state
        showLoading();
        
        // Start loading
        loadBloomScript()
            .then(() => {
                log('Bloom form ready');
                // Give the script time to initialize the form
                setTimeout(() => {
                    const containers = document.querySelectorAll('[data-bloom-form-id="' + BLOOM_CONFIG.formId + '"]');
                    containers.forEach(container => {
                        if (container.children.length === 1 && container.querySelector('.bloom-loading')) {
                            log('Form still not loaded, retrying...', 'warn');
                            if (loadAttempts < maxAttempts) {
                                retry();
                            } else {
                                showError();
                            }
                        }
                    });
                }, 3000);
            })
            .catch(error => {
                log(`Failed to load: ${error.message}`, 'error');
                if (loadAttempts < maxAttempts) {
                    setTimeout(retry, 2000);
                } else {
                    showError();
                }
            });
    }
    
    function retry() {
        log('Retrying Bloom form load');
        scriptLoaded = false;
        
        // Remove existing scripts
        const existingScripts = document.querySelectorAll('script[src*="bloom.io"]');
        existingScripts.forEach(script => script.remove());
        
        initializeBloom();
    }
    
    // Public API
    window.bloomLoader = {
        init: initializeBloom,
        retry: retry,
        config: BLOOM_CONFIG
    };
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeBloom);
    } else {
        // DOM is already ready
        setTimeout(initializeBloom, 100);
    }
    
    log('Bloom loader initialized');
})();