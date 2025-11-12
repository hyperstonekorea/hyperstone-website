/**
 * navigation.js - Navigation and Scroll Behavior Module
 * Handles smooth scrolling, scroll spy, mobile menu, and language toggle
 */

// Cache DOM elements for performance
let cachedNavbar = null;
let cachedMobileMenu = null;
let cachedMobileMenuButton = null;
let cachedLangToggle = null;
let cachedScrollIndicator = null;
let cachedSections = null;
let cachedNavLinks = null;

/**
 * Debounce function to limit how often a function can be called
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

/**
 * Get cached navbar element
 * @returns {HTMLElement|null} Navbar element
 */
function getNavbar() {
  if (!cachedNavbar) {
    cachedNavbar = document.getElementById('navbar');
  }
  return cachedNavbar;
}

/**
 * Get cached sections
 * @returns {NodeList} Section elements
 */
function getSections() {
  if (!cachedSections) {
    cachedSections = document.querySelectorAll('section[id]');
  }
  return cachedSections;
}

/**
 * Get cached navigation links
 * @returns {NodeList} Navigation link elements
 */
function getNavLinks() {
  if (!cachedNavLinks) {
    cachedNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  }
  return cachedNavLinks;
}

/**
 * Setup all navigation features
 * Main initialization function called on page load
 */
function setupNavigation() {
  setupSmoothScroll();
  setupScrollSpy();
  setupMobileMenu();
  setupLanguageToggle();
  setupNavbarScroll();
  setupScrollIndicator();
}

/**
 * Setup smooth scrolling for navigation links
 * Handles both desktop and mobile navigation links
 */
function setupSmoothScroll() {
  // Get all navigation links (desktop and mobile)
  const navLinks = getNavLinks();
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      
      // Close mobile menu if open
      if (!cachedMobileMenu) {
        cachedMobileMenu = document.getElementById('mobile-menu');
      }
      if (cachedMobileMenu && !cachedMobileMenu.classList.contains('hidden')) {
        toggleMobileMenu();
      }
      
      // Smooth scroll to target section
      smoothScrollTo(targetId);
    });
  });
}

/**
 * Smooth scroll to a specific section
 * @param {string} targetId - The ID of the target section (e.g., '#home')
 */
function smoothScrollTo(targetId) {
  const target = document.querySelector(targetId);
  
  if (!target) {
    console.warn(`Target section not found: ${targetId}`);
    return;
  }
  
  // Get navbar height for offset using cached element
  const navbar = getNavbar();
  const navbarHeight = navbar ? navbar.offsetHeight : 0;
  
  // Calculate target position with offset
  const targetPosition = target.offsetTop - navbarHeight;
  
  // Smooth scroll to target
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

/**
 * Setup scroll spy functionality
 * Updates active navigation link based on scroll position with debouncing
 */
function setupScrollSpy() {
  // Use debounced scroll handler for better performance (100ms delay)
  const debouncedUpdateActiveLink = debounce(updateActiveLink, 100);
  
  window.addEventListener('scroll', debouncedUpdateActiveLink);
  
  // Initial update
  updateActiveLink();
}

/**
 * Update active navigation link based on current scroll position
 * Highlights the navigation link corresponding to the visible section
 */
function updateActiveLink() {
  const sections = getSections();
  const scrollY = window.pageYOffset;
  const navbar = getNavbar();
  const navbarHeight = navbar ? navbar.offsetHeight : 0;
  
  // Find the current section
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - navbarHeight - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSection = sectionId;
    }
  });
  
  // If we're at the very top, highlight home
  if (scrollY < 100) {
    currentSection = 'home';
  }
  
  // Update active class on navigation links using cached elements
  const navLinks = getNavLinks();
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    if (href === `#${currentSection}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Setup mobile menu toggle functionality
 * Handles opening/closing of mobile navigation drawer
 */
function setupMobileMenu() {
  if (!cachedMobileMenuButton) {
    cachedMobileMenuButton = document.getElementById('mobile-menu-button');
  }
  
  if (!cachedMobileMenuButton) {
    console.warn('Mobile menu button not found');
    return;
  }
  
  cachedMobileMenuButton.addEventListener('click', toggleMobileMenu);
}

/**
 * Toggle mobile menu visibility
 * Shows/hides the mobile navigation drawer with slide-in animation
 */
function toggleMobileMenu() {
  if (!cachedMobileMenu) {
    cachedMobileMenu = document.getElementById('mobile-menu');
  }
  
  if (!cachedMobileMenu) {
    console.warn('Mobile menu not found');
    return;
  }
  
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  
  // Toggle menu visibility with animation
  if (cachedMobileMenu.classList.contains('hidden')) {
    // Show menu
    cachedMobileMenu.classList.remove('hidden');
    // Trigger reflow to enable transition
    cachedMobileMenu.offsetHeight;
    cachedMobileMenu.classList.add('show');
  } else {
    // Hide menu
    cachedMobileMenu.classList.remove('show');
    // Wait for animation to complete before hiding
    setTimeout(() => {
      cachedMobileMenu.classList.add('hidden');
    }, 300);
  }
  
  // Toggle icons
  if (menuIcon && closeIcon) {
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
  }
}

/**
 * Setup language toggle functionality
 * Handles switching between Korean and English
 */
function setupLanguageToggle() {
  if (!cachedLangToggle) {
    cachedLangToggle = document.getElementById('lang-toggle');
  }
  
  if (!cachedLangToggle) {
    console.warn('Language toggle button not found');
    return;
  }
  
  // Update button text based on current language
  updateLanguageButton();
  
  // Add click event listener
  cachedLangToggle.addEventListener('click', () => {
    // Toggle language using i18n module
    if (typeof toggleLanguage === 'function') {
      toggleLanguage();
      updateLanguageButton();
    } else {
      console.error('toggleLanguage function not found. Make sure i18n.js is loaded.');
    }
  });
  
  // Listen for language change events from i18n module
  document.addEventListener('languageChanged', () => {
    updateLanguageButton();
  });
}

/**
 * Update language toggle button text
 * Shows current and alternative language
 */
function updateLanguageButton() {
  const currentLangSpan = document.getElementById('current-lang');
  const otherLangSpan = document.getElementById('other-lang');
  
  if (!currentLangSpan || !otherLangSpan) {
    return;
  }
  
  // Get current language from i18n module
  const currentLang = typeof getCurrentLanguage === 'function' 
    ? getCurrentLanguage() 
    : 'ko';
  
  if (currentLang === 'ko') {
    currentLangSpan.textContent = 'KO';
    otherLangSpan.textContent = 'EN';
  } else {
    currentLangSpan.textContent = 'EN';
    otherLangSpan.textContent = 'KO';
  }
}

/**
 * Setup navbar scroll behavior
 * Adds shadow and background changes on scroll with debouncing
 */
function setupNavbarScroll() {
  const updateNavbarShadow = () => {
    const navbar = getNavbar();
    if (!navbar) return;
    
    const currentScrollY = window.pageYOffset;
    
    // Add shadow when scrolled down
    if (currentScrollY > 10) {
      navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
  };
  
  // Use debounced scroll handler for better performance (100ms delay)
  const debouncedUpdateNavbarShadow = debounce(updateNavbarShadow, 100);
  
  window.addEventListener('scroll', debouncedUpdateNavbarShadow);
}

/**
 * Setup scroll indicator click behavior
 * Makes the scroll indicator in hero section clickable to scroll to about section
 */
function setupScrollIndicator() {
  if (!cachedScrollIndicator) {
    cachedScrollIndicator = document.getElementById('scroll-indicator');
  }
  
  if (!cachedScrollIndicator) {
    console.warn('Scroll indicator not found');
    return;
  }
  
  cachedScrollIndicator.addEventListener('click', () => {
    smoothScrollTo('#about');
  });
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    setupNavigation,
    smoothScrollTo,
    updateActiveLink,
    toggleMobileMenu
  };
}
