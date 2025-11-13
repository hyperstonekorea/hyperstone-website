/**
 * product-detail.js - Product Detail Page Logic
 * Handles loading and displaying product details
 */

/**
 * Get URL parameter by name
 * @param {string} name - Parameter name
 * @returns {string|null} Parameter value or null if not found
 */
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

/**
 * Load and display product details
 */
function loadProductDetails() {
  // Get product slug from URL parameter
  const productSlug = getUrlParameter('product');
  
  if (!productSlug) {
    console.error('No product slug provided in URL');
    showErrorMessage();
    return;
  }
  
  // Get product data by slug
  const product = getProductBySlug(productSlug);
  
  if (!product) {
    console.error(`Product not found: ${productSlug}`);
    showErrorMessage();
    return;
  }
  
  // Get current language
  const lang = getCurrentLanguage();
  
  // Populate product information
  populateProductInfo(product, lang);
  populateImageGallery(product);
  populateFeatures(product, lang);
  populateSpecifications(product, lang);
  populateApplications(product, lang);
  
  // Update page title
  document.title = `${product.name[lang]} - HYPERSTONE`;
}

/**
 * Populate product name and description
 * @param {Object} product - Product object
 * @param {string} lang - Language code
 */
function populateProductInfo(product, lang) {
  const productNameElement = document.getElementById('product-name');
  const productDescriptionElement = document.getElementById('product-description');
  
  if (productNameElement) {
    // Wrap "DULITE" in brand-text span for Audiowide font
    const productName = product.name[lang];
    const formattedProductName = productName.replace(/DULITE/g, '<span class="brand-text">DULITE</span>');
    productNameElement.innerHTML = formattedProductName;
  }
  
  if (productDescriptionElement) {
    productDescriptionElement.textContent = product.fullDescription[lang];
  }
}

/**
 * Populate image gallery with main image and thumbnails
 * @param {Object} product - Product object
 */
function populateImageGallery(product) {
  const mainImageElement = document.getElementById('main-image');
  const thumbnailGridElement = document.getElementById('thumbnail-grid');
  
  if (!mainImageElement || !thumbnailGridElement) {
    return;
  }
  
  // Set main image
  const mainImageUrl = product.images.main || product.images.thumbnail;
  mainImageElement.src = mainImageUrl;
  mainImageElement.alt = product.name[getCurrentLanguage()];
  
  // Clear existing thumbnails
  thumbnailGridElement.innerHTML = '';
  
  // Create thumbnails from gallery images
  const galleryImages = product.images.gallery || [mainImageUrl];
  
  galleryImages.forEach((imageUrl, index) => {
    const thumbnailWrapper = document.createElement('div');
    thumbnailWrapper.className = 'cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 hover:border-opacity-100';
    thumbnailWrapper.style.borderColor = index === 0 ? '#0082FB' : 'transparent';
    
    const thumbnail = document.createElement('img');
    thumbnail.src = imageUrl;
    thumbnail.alt = `${product.name[getCurrentLanguage()]} ${index + 1}`;
    thumbnail.className = 'w-full h-auto object-cover';
    thumbnail.style.aspectRatio = '16/10';
    
    // Add click handler to change main image
    thumbnailWrapper.addEventListener('click', () => {
      mainImageElement.src = imageUrl;
      
      // Update active thumbnail border
      const allThumbnails = thumbnailGridElement.querySelectorAll('div');
      allThumbnails.forEach(thumb => {
        thumb.style.borderColor = 'transparent';
      });
      thumbnailWrapper.style.borderColor = '#0082FB';
    });
    
    thumbnailWrapper.appendChild(thumbnail);
    thumbnailGridElement.appendChild(thumbnailWrapper);
  });
}

/**
 * Populate features list
 * @param {Object} product - Product object
 * @param {string} lang - Language code
 */
function populateFeatures(product, lang) {
  const featuresListElement = document.getElementById('features-list');
  
  if (!featuresListElement) {
    return;
  }
  
  // Clear existing features
  featuresListElement.innerHTML = '';
  
  const features = product.features[lang] || [];
  
  features.forEach(feature => {
    const listItem = document.createElement('li');
    listItem.className = 'flex items-start';
    
    // Create checkmark icon
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1';
    iconWrapper.style.backgroundColor = 'rgba(0, 130, 251, 0.1)';
    
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('class', 'w-4 h-4');
    icon.setAttribute('fill', 'none');
    icon.setAttribute('stroke', '#0082FB');
    icon.setAttribute('viewBox', '0 0 24 24');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('d', 'M5 13l4 4L19 7');
    
    icon.appendChild(path);
    iconWrapper.appendChild(icon);
    
    // Create feature text
    const text = document.createElement('span');
    text.className = 'text-lg';
    text.style.color = '#1C2B33';
    text.textContent = feature;
    
    listItem.appendChild(iconWrapper);
    listItem.appendChild(text);
    featuresListElement.appendChild(listItem);
  });
}

/**
 * Populate specifications table
 * @param {Object} product - Product object
 * @param {string} lang - Language code
 */
function populateSpecifications(product, lang) {
  const specificationsTableElement = document.getElementById('specifications-table');
  
  if (!specificationsTableElement) {
    return;
  }
  
  // Clear existing specifications
  const tbody = specificationsTableElement.querySelector('tbody');
  if (tbody) {
    tbody.innerHTML = '';
  }
  
  const specifications = product.specifications[lang] || [];
  
  specifications.forEach((spec, index) => {
    const row = document.createElement('tr');
    row.className = 'border-b transition-colors duration-300 hover:bg-gray-50';
    
    // Striped rows
    if (index % 2 === 0) {
      row.style.backgroundColor = '#F1F5F8';
    }
    
    // Label cell
    const labelCell = document.createElement('td');
    labelCell.className = 'py-4 px-6 font-semibold';
    labelCell.style.color = '#1C2B33';
    labelCell.textContent = spec.label;
    
    // Value cell
    const valueCell = document.createElement('td');
    valueCell.className = 'py-4 px-6';
    valueCell.style.color = '#1C2B33';
    valueCell.textContent = `${spec.value} ${spec.unit}`;
    
    row.appendChild(labelCell);
    row.appendChild(valueCell);
    tbody.appendChild(row);
  });
}

/**
 * Populate applications list
 * @param {Object} product - Product object
 * @param {string} lang - Language code
 */
function populateApplications(product, lang) {
  const applicationsListElement = document.getElementById('applications-list');
  
  if (!applicationsListElement) {
    return;
  }
  
  // Clear existing applications
  applicationsListElement.innerHTML = '';
  
  const applications = product.applications[lang] || [];
  
  applications.forEach(application => {
    const listItem = document.createElement('li');
    listItem.className = 'flex items-start';
    
    // Create bullet icon
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1';
    iconWrapper.style.backgroundColor = 'rgba(0, 130, 251, 0.1)';
    
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('class', 'w-4 h-4');
    icon.setAttribute('fill', 'none');
    icon.setAttribute('stroke', '#0082FB');
    icon.setAttribute('viewBox', '0 0 24 24');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('d', 'M9 5l7 7-7 7');
    
    icon.appendChild(path);
    iconWrapper.appendChild(icon);
    
    // Create application text
    const text = document.createElement('span');
    text.className = 'text-lg';
    text.style.color = '#1C2B33';
    text.textContent = application;
    
    listItem.appendChild(iconWrapper);
    listItem.appendChild(text);
    applicationsListElement.appendChild(listItem);
  });
}

/**
 * Show error message when product is not found
 */
function showErrorMessage() {
  const mainElement = document.querySelector('main');
  
  if (mainElement) {
    mainElement.innerHTML = `
      <div class="container mx-auto px-4 py-20 text-center">
        <div class="bg-white rounded-lg shadow-lg p-12">
          <svg class="w-24 h-24 mx-auto mb-6" style="color: #0082FB;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h1 class="text-3xl font-bold mb-4" style="color: #1C2B33;">
            ${getCurrentLanguage() === 'ko' ? '제품을 찾을 수 없습니다' : 'Product Not Found'}
          </h1>
          <p class="text-lg mb-8" style="color: #1C2B33; opacity: 0.8;">
            ${getCurrentLanguage() === 'ko' ? '요청하신 제품 정보를 찾을 수 없습니다.' : 'The requested product information could not be found.'}
          </p>
          <a href="index.html#products" class="inline-block px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg" style="background-color: #0082FB;">
            ${getCurrentLanguage() === 'ko' ? '제품 목록으로 돌아가기' : 'Back to Products'}
          </a>
        </div>
      </div>
    `;
  }
}

/**
 * Initialize product detail page
 */
function initProductDetail() {
  try {
    // Load language preference
    loadLanguagePreference();
    
    // Setup navigation
    if (typeof setupNavigation === 'function') {
      setupNavigation();
    }
    
    // Load product details
    loadProductDetails();
    
    // Update all translations
    updateAllTranslations();
    
    // Listen for language change events
    document.addEventListener('languageChanged', () => {
      loadProductDetails();
    });
  } catch (error) {
    console.error('Error initializing product detail page:', error);
    showErrorMessage();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductDetail);
} else {
  initProductDetail();
}
