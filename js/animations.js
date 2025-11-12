/**
 * animations.js
 * Handles scroll animations, fade-in effects, and counter animations
 * Uses Intersection Observer for efficient lazy loading of animations
 */

// Cache observers for cleanup if needed
let scrollObserver = null;
let counterObserver = null;

/**
 * Main function to initialize all animations
 */
function setupAnimations() {
  setupScrollAnimations();
  setupCounterAnimations();
}

/**
 * Setup scroll-triggered animations using Intersection Observer
 * Elements with class 'animate-on-scroll' will fade in when they come into view
 * Uses Intersection Observer for efficient lazy loading of animations
 */
function setupScrollAnimations() {
  // Create Intersection Observer with options
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
  };

  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation class when element enters viewport
        entry.target.classList.add('animate-in');
        
        // Stop observing after animation for better performance (one-time animation)
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with 'animate-on-scroll' class
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(element => {
    scrollObserver.observe(element);
  });
}

/**
 * Setup counter animations for statistics numbers
 * Animates numbers from 0 to their target value when they come into view
 * Uses Intersection Observer for efficient lazy loading
 */
function setupCounterAnimations() {
  const counterElements = document.querySelectorAll('.counter');
  
  if (counterElements.length === 0) {
    return; // No counters to animate
  }

  // Create Intersection Observer for counters
  counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        // Mark as counted to prevent re-animation
        entry.target.classList.add('counted');
        
        // Get target value from data attribute
        const target = parseInt(entry.target.getAttribute('data-target'));
        
        // Animate the counter
        animateCounter(entry.target, target);
        
        // Stop observing after animation for better performance
        counterObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5 // Trigger when 50% of counter is visible
  });

  // Observe all counter elements
  counterElements.forEach(counter => {
    counterObserver.observe(counter);
  });
}

/**
 * Animate a counter element from 0 to target value
 * @param {HTMLElement} element - The counter element to animate
 * @param {number} target - The target number to count to
 * @param {number} duration - Animation duration in milliseconds (default: 2000ms)
 */
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();
  
  // Use easeOutQuad easing function for smooth animation
  const easeOutQuad = (t) => t * (2 - t);
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Apply easing function
    const easedProgress = easeOutQuad(progress);
    
    // Calculate current value
    const current = Math.floor(easedProgress * target);
    
    // Update element text
    element.textContent = current;
    
    // Continue animation if not complete
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      // Ensure final value is exact
      element.textContent = target;
    }
  }
  
  // Start animation
  requestAnimationFrame(updateCounter);
}

/**
 * Debounce function to limit how often a function can be called
 * Useful for optimizing scroll event handlers
 * @param {Function} func - The function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export functions for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    setupAnimations,
    setupScrollAnimations,
    setupCounterAnimations,
    animateCounter,
    debounce
  };
}
