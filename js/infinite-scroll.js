/**
 * infinite-scroll.js - Infinite Scroll and Product Card Rendering
 * Handles product card creation and infinite scroll functionality
 */

let currentProductIndex = 0; // Start from the beginning
let isLoading = false;
const productsPerLoad = 4;

// Cache DOM elements for performance
let cachedProductsGrid = null;
let cachedLoadingIndicator = null;

/**
 * Create a product card HTML element
 * @param {Object} product - Product object from data.js
 * @param {string} lang - Current language ('ko' or 'en')
 * @returns {HTMLElement} Product card element
 */
function createProductCard(product, lang) {
  // Create card container
  const card = document.createElement('div');
  card.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer';
  card.setAttribute('data-product-id', product.id);
  card.setAttribute('data-product-slug', product.slug);
  
  // Get localized product data
  const productName = product.name[lang];
  const productDescription = product.shortDescription[lang];
  const productImage = product.images.thumbnail;
  
  // Create card HTML structure
  card.innerHTML = `
    <div class="product-image-container relative overflow-hidden" style="aspect-ratio: 16/10;">
      <img 
        src="${productImage}" 
        alt="${productName}" 
        class="product-image w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        loading="lazy"
      />
    </div>
    <div class="product-content p-6">
      <h3 class="product-name text-2xl font-bold mb-3 brand-text" style="font-family: 'Audiowide', cursive; text-transform: uppercase; letter-spacing: 0.05em; color: #1C2B33;">
        ${productName}
      </h3>
      <p class="product-description text-base mb-4 opacity-80" style="color: #1C2B33; line-height: 1.6;">
        ${productDescription}
      </p>
      <button class="btn-learn-more w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg" style="background-color: #0082FB;" data-i18n="products.learnMore">
        ${lang === 'ko' ? '자세히 보기' : 'Learn More'}
      </button>
    </div>
  `;
  
  // Add click handler to navigate to product detail page
  card.addEventListener('click', function() {
    // Navigate to dedicated product page
    window.location.href = `${product.slug}.html`;
  });
  
  // Add hover effect to button
  const button = card.querySelector('.btn-learn-more');
  button.addEventListener('mouseenter', function() {
    this.style.backgroundColor = '#0064E0';
  });
  button.addEventListener('mouseleave', function() {
    this.style.backgroundColor = '#0082FB';
  });
  
  return card;
}

/**
 * Get cached products grid element
 * @returns {HTMLElement|null} Products grid element
 */
function getProductsGrid() {
  if (!cachedProductsGrid) {
    cachedProductsGrid = document.getElementById('products-grid');
  }
  return cachedProductsGrid;
}

/**
 * Get cached loading indicator element
 * @returns {HTMLElement|null} Loading indicator element
 */
function getLoadingIndicator() {
  if (!cachedLoadingIndicator) {
    cachedLoadingIndicator = document.getElementById('loading-indicator');
  }
  return cachedLoadingIndicator;
}

/**
 * Render products to the grid
 * @param {number} startIndex - Starting index in products array
 * @param {number} endIndex - Ending index in products array
 */
function renderProducts(startIndex, endIndex) {
  const productsGrid = getProductsGrid();
  if (!productsGrid) {
    console.error('Products grid element not found');
    return;
  }
  
  const allProducts = getProducts();
  const lang = getCurrentLanguage();
  
  // Create a document fragment for better performance
  const fragment = document.createDocumentFragment();
  
  // Create product cards
  for (let i = startIndex; i < endIndex && i < allProducts.length; i++) {
    const product = allProducts[i];
    const card = createProductCard(product, lang);
    
    // Add initial opacity for fade-in animation
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    fragment.appendChild(card);
  }
  
  // Append all cards at once using DocumentFragment
  productsGrid.appendChild(fragment);
  
  // Trigger staggered fade-in animation
  const newCards = productsGrid.querySelectorAll('.product-card');
  const cardsToAnimate = Array.from(newCards).slice(startIndex);
  
  cardsToAnimate.forEach((card, index) => {
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100); // Stagger by 100ms
  });
}

/**
 * Load more products (for infinite scroll)
 */
function loadMoreProducts() {
  if (isLoading) return;
  
  const allProducts = getProducts();
  if (currentProductIndex >= allProducts.length) {
    return; // No more products to load
  }
  
  isLoading = true;
  showLoadingIndicator();
  
  // Simulate loading delay for better UX
  setTimeout(() => {
    const endIndex = Math.min(
      currentProductIndex + productsPerLoad,
      allProducts.length
    );
    
    renderProducts(currentProductIndex, endIndex);
    currentProductIndex = endIndex;
    
    hideLoadingIndicator();
    isLoading = false;
  }, 500);
}

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
 * Handle scroll event for infinite scroll
 */
function handleScroll() {
  if (isLoading) return;
  
  const scrollPosition = window.innerHeight + window.pageYOffset;
  const threshold = document.body.offsetHeight - 500; // 500px from bottom
  
  if (scrollPosition >= threshold) {
    loadMoreProducts();
  }
}

// Create debounced version of handleScroll for performance
const debouncedHandleScroll = debounce(handleScroll, 100);

/**
 * Show loading indicator
 */
function showLoadingIndicator() {
  const loadingIndicator = getLoadingIndicator();
  if (loadingIndicator) {
    loadingIndicator.classList.remove('hidden');
  }
}

/**
 * Hide loading indicator
 */
function hideLoadingIndicator() {
  const loadingIndicator = getLoadingIndicator();
  if (loadingIndicator) {
    loadingIndicator.classList.add('hidden');
  }
}

/**
 * Setup infinite scroll
 * Attaches scroll event listener with debouncing for performance
 */
function setupInfiniteScroll() {
  // Use debounced scroll handler for better performance
  window.addEventListener('scroll', debouncedHandleScroll);
  
  // Listen for language changes to re-render product cards
  document.addEventListener('languageChanged', function() {
    // Clear existing products
    const productsGrid = getProductsGrid();
    if (productsGrid) {
      productsGrid.innerHTML = '';
    }
    
    // Reset index and re-render
    currentProductIndex = 0;
    renderProducts(0, Math.min(productsPerLoad, getProducts().length));
    currentProductIndex = Math.min(productsPerLoad, getProducts().length);
  });
}

/**
 * Render initial products
 * Called on page load
 */
function renderInitialProducts() {
  const allProducts = getProducts();
  const initialCount = Math.min(productsPerLoad, allProducts.length);
  
  renderProducts(0, initialCount);
  currentProductIndex = initialCount;
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createProductCard,
    renderProducts,
    loadMoreProducts,
    setupInfiniteScroll,
    renderInitialProducts
  };
}
