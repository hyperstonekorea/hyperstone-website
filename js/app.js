/**
 * app.js - Main Application File
 * Initializes and coordinates all modules for the HYPERSTONE website
 */

/**
 * Initialize the application
 * Main entry point that sets up all modules and renders initial content
 */
function init() {
  try {
    console.log('Initializing HYPERSTONE website...');
    
    // Step 1: Load language preference from localStorage
    loadLanguagePreference();
    console.log(`Language loaded: ${getCurrentLanguage()}`);
    
    // Step 2: Initialize navigation module
    if (typeof setupNavigation === 'function') {
      setupNavigation();
      console.log('Navigation initialized');
    } else {
      console.error('setupNavigation function not found. Make sure navigation.js is loaded.');
    }
    
    // Step 3: Initialize infinite scroll module
    if (typeof setupInfiniteScroll === 'function') {
      setupInfiniteScroll();
      console.log('Infinite scroll initialized');
    } else {
      console.error('setupInfiniteScroll function not found. Make sure infinite-scroll.js is loaded.');
    }
    
    // Step 4: Initialize animations module
    if (typeof setupAnimations === 'function') {
      setupAnimations();
      console.log('Animations initialized');
    } else {
      console.error('setupAnimations function not found. Make sure animations.js is loaded.');
    }
    
    // Step 5: Render initial content
    renderInitialContent();
    console.log('Initial content rendered');
    
    console.log('HYPERSTONE website initialized successfully!');
    
  } catch (error) {
    console.error('Error during initialization:', error);
    displayErrorMessage('An error occurred while loading the website. Please refresh the page.');
  }
}

/**
 * Render initial content on page load
 * Loads the first batch of products and updates all translations
 */
function renderInitialContent() {
  try {
    // Check if we're on the main page (index.html)
    const productsGrid = document.getElementById('products-grid');
    
    if (productsGrid) {
      // Render initial products (first 4 products)
      if (typeof renderInitialProducts === 'function') {
        renderInitialProducts();
        console.log('Initial products rendered');
      } else {
        console.error('renderInitialProducts function not found. Make sure infinite-scroll.js is loaded.');
      }
    }
    
    // Update all translations in the DOM
    if (typeof updateAllTranslations === 'function') {
      updateAllTranslations();
      console.log('Translations updated');
    } else {
      console.error('updateAllTranslations function not found. Make sure i18n.js is loaded.');
    }
    
  } catch (error) {
    console.error('Error rendering initial content:', error);
    throw error;
  }
}

/**
 * Display user-friendly error message
 * Shows an error banner at the top of the page
 * @param {string} message - Error message to display
 */
function displayErrorMessage(message) {
  // Create error message container
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message fixed top-0 left-0 right-0 z-50 p-4 text-center text-white';
  errorDiv.style.backgroundColor = '#DC2626'; // Red color
  errorDiv.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
  
  // Set error message text
  errorDiv.innerHTML = `
    <div class="container mx-auto flex items-center justify-between">
      <span>${message}</span>
      <button onclick="this.parentElement.parentElement.remove()" class="ml-4 px-3 py-1 bg-white text-red-600 rounded hover:bg-gray-100 transition-colors">
        Close
      </button>
    </div>
  `;
  
  // Insert at the beginning of body
  document.body.insertBefore(errorDiv, document.body.firstChild);
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (errorDiv.parentElement) {
      errorDiv.remove();
    }
  }, 10000);
}

/**
 * Check if all required modules are loaded
 * Validates that all dependencies are available
 * @returns {boolean} True if all modules are loaded, false otherwise
 */
function checkDependencies() {
  const requiredFunctions = [
    { name: 'loadLanguagePreference', module: 'i18n.js' },
    { name: 'getCurrentLanguage', module: 'i18n.js' },
    { name: 'updateAllTranslations', module: 'i18n.js' },
    { name: 'setupNavigation', module: 'navigation.js' },
    { name: 'setupInfiniteScroll', module: 'infinite-scroll.js' },
    { name: 'renderInitialProducts', module: 'infinite-scroll.js' },
    { name: 'setupAnimations', module: 'animations.js' },
    { name: 'getProducts', module: 'data.js' }
  ];
  
  let allLoaded = true;
  const missingModules = [];
  
  requiredFunctions.forEach(({ name, module }) => {
    if (typeof window[name] !== 'function') {
      allLoaded = false;
      if (!missingModules.includes(module)) {
        missingModules.push(module);
      }
    }
  });
  
  if (!allLoaded) {
    console.error('Missing required modules:', missingModules.join(', '));
    displayErrorMessage(`Failed to load required modules: ${missingModules.join(', ')}. Please check your internet connection and refresh the page.`);
  }
  
  return allLoaded;
}

/**
 * Setup hero video background
 * Handles video playback and fade-out effect
 */
function setupHeroVideo() {
  const heroVideo = document.getElementById('hero-video');
  const heroContent = document.getElementById('hero-content');
  const heroSection = document.getElementById('home');
  
  if (heroVideo) {
    console.log('Setting up hero video...');
    
    // Handle video end event
    heroVideo.addEventListener('ended', function() {
      console.log('Video ended, fading out...');
      // Add fade-out class to trigger CSS transition
      heroVideo.classList.add('fade-out');
      
      // Change background to blue on mobile when video ends
      if (heroSection && window.innerWidth <= 767) {
        heroSection.classList.remove('hero-bg-initial');
        heroSection.classList.add('hero-bg-blue');
        console.log('Mobile: Changed hero background to blue');
      }
      
      // Fade in hero text content after video starts fading
      if (heroContent) {
        heroContent.classList.remove('hero-text-hidden');
        heroContent.classList.add('hero-text-visible');
      }
      
      // Remove video from DOM after fade-out completes
      setTimeout(() => {
        heroVideo.remove();
        console.log('Video removed from DOM');
      }, 1500); // Match the CSS transition duration
    });
    
    // Handle video error
    heroVideo.addEventListener('error', function(e) {
      console.error('Video failed to load:', e);
      // Remove video if it fails to load
      heroVideo.remove();
      // Change background to blue on mobile
      if (heroSection && window.innerWidth <= 767) {
        heroSection.classList.remove('hero-bg-initial');
        heroSection.classList.add('hero-bg-blue');
      }
      // Show text immediately if video fails
      if (heroContent) {
        heroContent.classList.remove('hero-text-hidden');
        heroContent.classList.add('hero-text-visible');
      }
    });
    
    // Ensure video plays (some browsers may block autoplay)
    heroVideo.play().catch(function(error) {
      console.warn('Autoplay prevented:', error);
      // If autoplay is blocked, fade out immediately and show text
      heroVideo.classList.add('fade-out');
      // Change background to blue on mobile
      if (heroSection && window.innerWidth <= 767) {
        heroSection.classList.remove('hero-bg-initial');
        heroSection.classList.add('hero-bg-blue');
      }
      if (heroContent) {
        heroContent.classList.remove('hero-text-hidden');
        heroContent.classList.add('hero-text-visible');
      }
      setTimeout(() => {
        heroVideo.remove();
      }, 1500);
    });
  } else {
    // If no video element, show text immediately
    // Change background to blue on mobile
    if (heroSection && window.innerWidth <= 767) {
      heroSection.classList.remove('hero-bg-initial');
      heroSection.classList.add('hero-bg-blue');
    }
    if (heroContent) {
      heroContent.classList.remove('hero-text-hidden');
      heroContent.classList.add('hero-text-visible');
    }
  }
}

/**
 * DOMContentLoaded event listener
 * Triggers initialization when the DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded');
  
  // Setup hero video first
  setupHeroVideo();
  
  // Check if all dependencies are loaded
  if (checkDependencies()) {
    // Initialize the application
    init();
  } else {
    console.error('Cannot initialize application: missing dependencies');
  }
});

/**
 * Window load event listener
 * Additional initialization after all resources are loaded
 */
window.addEventListener('load', function() {
  console.log('All resources loaded');
  
  // Hide any loading screens if present
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 300);
  }
});

/**
 * Handle page visibility changes
 * Useful for pausing/resuming animations when tab is not visible
 */
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    console.log('Page hidden');
    // Pause animations or reduce activity
  } else {
    console.log('Page visible');
    // Resume animations or activity
  }
});

/**
 * Handle errors globally
 * Catches unhandled errors and displays user-friendly message
 */
window.addEventListener('error', function(event) {
  console.error('Global error caught:', event.error);
  
  // Don't show error message for script loading errors (already handled)
  if (event.error && event.error.message && !event.error.message.includes('Script error')) {
    displayErrorMessage('An unexpected error occurred. The page may not function correctly.');
  }
});

/**
 * Handle unhandled promise rejections
 * Catches async errors that weren't caught
 */
window.addEventListener('unhandledrejection', function(event) {
  console.error('Unhandled promise rejection:', event.reason);
  displayErrorMessage('An unexpected error occurred. Please try again.');
});

// Export init function for testing purposes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    init,
    renderInitialContent,
    displayErrorMessage,
    checkDependencies
  };
}
