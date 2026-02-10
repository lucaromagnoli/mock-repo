/**
 * Navigation Menu JavaScript
 *
 * Provides interactive functionality for the responsive navigation menu:
 * - Mobile hamburger menu toggle (open/close)
 * - Active page detection and highlighting based on current URL
 * - Keyboard navigation support (Tab, Enter, Escape)
 * - Focus management for accessibility
 * - Body scroll locking when mobile menu is open
 *
 * Uses IIFE pattern to avoid polluting global namespace.
 * Follows progressive enhancement - works without JS (basic links).
 */
(function () {
  'use strict';

  // ============================================
  // Configuration
  // ============================================
  var CONFIG = {
    breakpoint: 768, // Desktop breakpoint in pixels
    debounceDelay: 200, // Resize debounce delay in ms
    selectors: {
      toggle: '.nav__toggle',
      menu: '.nav__menu',
      overlay: '.nav__overlay',
      links: '.nav__link',
      nav: '.nav'
    },
    classes: {
      menuOpen: 'nav__menu--open',
      overlayVisible: 'nav__overlay--visible',
      linkActive: 'nav__link--active',
      bodyLocked: 'nav-open'
    }
  };

  // ============================================
  // State
  // ============================================
  var state = {
    isMenuOpen: false
  };

  // ============================================
  // DOM Element References (cached)
  // ============================================
  var elements = {
    toggle: null,
    menu: null,
    overlay: null,
    links: null,
    nav: null
  };

  // ============================================
  // Utility Functions
  // ============================================

  /**
   * Debounce function to limit execution rate
   * @param {Function} func - Function to debounce
   * @param {number} delay - Delay in milliseconds
   * @returns {Function} Debounced function
   */
  function debounce(func, delay) {
    var timeoutId;
    return function () {
      var context = this;
      var args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        func.apply(context, args);
      }, delay);
    };
  }

  /**
   * Normalize URL path for comparison
   * Removes trailing slashes, handles index.html variations
   * @param {string} path - URL path to normalize
   * @returns {string} Normalized path
   */
  function normalizePath(path) {
    // Remove trailing slash (except for root)
    var normalized = path.replace(/\/$/, '') || '/';

    // Handle index.html variations
    normalized = normalized.replace(/\/index\.html$/, '/');

    // Handle cases where path might just be "index.html" without leading slash
    if (normalized === 'index.html') {
      normalized = '/';
    }

    return normalized;
  }

  /**
   * Get the pathname from a URL string
   * @param {string} href - Full URL or relative path
   * @returns {string} Pathname
   */
  function getPathFromHref(href) {
    try {
      var url = new URL(href, window.location.origin);
      return url.pathname;
    } catch (e) {
      // Fallback for older browsers or malformed URLs
      return href;
    }
  }

  // ============================================
  // Menu Toggle Functions
  // ============================================

  /**
   * Open the mobile navigation menu
   */
  function openMenu() {
    if (!elements.toggle || !elements.menu || !elements.overlay) {
      return;
    }

    state.isMenuOpen = true;

    // Update DOM
    elements.menu.classList.add(CONFIG.classes.menuOpen);
    elements.overlay.classList.add(CONFIG.classes.overlayVisible);
    elements.toggle.setAttribute('aria-expanded', 'true');
    elements.toggle.setAttribute('aria-label', 'Close menu');
    document.body.classList.add(CONFIG.classes.bodyLocked);

    // Focus first link in menu for accessibility
    var firstLink = elements.menu.querySelector(CONFIG.selectors.links);
    if (firstLink) {
      // Small delay to ensure menu is visible before focusing
      setTimeout(function () {
        firstLink.focus();
      }, 100);
    }
  }

  /**
   * Close the mobile navigation menu
   * @param {boolean} returnFocus - Whether to return focus to toggle button
   */
  function closeMenu(returnFocus) {
    if (!elements.toggle || !elements.menu || !elements.overlay) {
      return;
    }

    // Default returnFocus to true
    if (typeof returnFocus === 'undefined') {
      returnFocus = true;
    }

    state.isMenuOpen = false;

    // Update DOM
    elements.menu.classList.remove(CONFIG.classes.menuOpen);
    elements.overlay.classList.remove(CONFIG.classes.overlayVisible);
    elements.toggle.setAttribute('aria-expanded', 'false');
    elements.toggle.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove(CONFIG.classes.bodyLocked);

    // Return focus to toggle button for accessibility
    if (returnFocus) {
      elements.toggle.focus();
    }
  }

  /**
   * Toggle the mobile navigation menu open/closed
   */
  function toggleMenu() {
    if (state.isMenuOpen) {
      closeMenu(true);
    } else {
      openMenu();
    }
  }

  // ============================================
  // Active Page Detection
  // ============================================

  /**
   * Set the active navigation link based on current URL
   */
  function setActiveLink() {
    if (!elements.links || elements.links.length === 0) {
      return;
    }

    var currentPath = normalizePath(window.location.pathname);

    // Loop through all nav links and check for match
    Array.prototype.forEach.call(elements.links, function (link) {
      var linkPath = normalizePath(getPathFromHref(link.href));

      // Check for exact match (ignoring query params and hashes)
      var isActive = currentPath === linkPath;

      // Special handling for home page
      // If current path is "/" or "/index.html", match home link
      if (!isActive && (currentPath === '/' || currentPath === '')) {
        var linkHref = link.getAttribute('href');
        if (linkHref === 'index.html' || linkHref === '/' || linkHref === './') {
          isActive = true;
        }
      }

      if (isActive) {
        link.classList.add(CONFIG.classes.linkActive);
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove(CONFIG.classes.linkActive);
        link.removeAttribute('aria-current');
      }
    });
  }

  // ============================================
  // Event Handlers
  // ============================================

  /**
   * Handle click on toggle button
   * @param {Event} event - Click event
   */
  function handleToggleClick(event) {
    event.preventDefault();
    toggleMenu();
  }

  /**
   * Handle click on overlay (close menu)
   * @param {Event} event - Click event
   */
  function handleOverlayClick(event) {
    if (state.isMenuOpen) {
      closeMenu(true);
    }
  }

  /**
   * Handle keyboard events
   * @param {KeyboardEvent} event - Keyboard event
   */
  function handleKeydown(event) {
    // Close menu on Escape key
    if (event.key === 'Escape' && state.isMenuOpen) {
      event.preventDefault();
      closeMenu(true);
    }
  }

  /**
   * Handle window resize
   * Close mobile menu if viewport expands to desktop size
   */
  var handleResize = debounce(function () {
    if (window.innerWidth >= CONFIG.breakpoint && state.isMenuOpen) {
      // Close menu without returning focus (viewport changed, not user action)
      closeMenu(false);
    }
  }, CONFIG.debounceDelay);

  /**
   * Handle navigation link clicks
   * Close mobile menu when a link is clicked
   * @param {Event} event - Click event
   */
  function handleLinkClick(event) {
    // Only close menu on mobile
    if (window.innerWidth < CONFIG.breakpoint && state.isMenuOpen) {
      // Let the navigation happen, but close the menu
      // Use setTimeout to allow the click to complete
      setTimeout(function () {
        closeMenu(false);
      }, 100);
    }
  }

  // ============================================
  // Initialization
  // ============================================

  /**
   * Cache DOM element references
   * @returns {boolean} True if all required elements found
   */
  function cacheElements() {
    elements.toggle = document.querySelector(CONFIG.selectors.toggle);
    elements.menu = document.querySelector(CONFIG.selectors.menu);
    elements.overlay = document.querySelector(CONFIG.selectors.overlay);
    elements.links = document.querySelectorAll(CONFIG.selectors.links);
    elements.nav = document.querySelector(CONFIG.selectors.nav);

    // Check for required elements
    if (!elements.toggle || !elements.menu) {
      console.warn('Navigation: Required elements not found (toggle or menu)');
      return false;
    }

    return true;
  }

  /**
   * Attach event listeners
   */
  function attachEventListeners() {
    // Toggle button click
    if (elements.toggle) {
      elements.toggle.addEventListener('click', handleToggleClick);
    }

    // Overlay click (close menu)
    if (elements.overlay) {
      elements.overlay.addEventListener('click', handleOverlayClick);
    }

    // Keyboard events (document level for Escape key)
    document.addEventListener('keydown', handleKeydown);

    // Window resize
    window.addEventListener('resize', handleResize);

    // Navigation link clicks (close menu on mobile)
    if (elements.links) {
      Array.prototype.forEach.call(elements.links, function (link) {
        link.addEventListener('click', handleLinkClick);
      });
    }
  }

  /**
   * Initialize the navigation module
   */
  function init() {
    // Cache DOM elements
    if (!cacheElements()) {
      return;
    }

    // Attach event listeners
    attachEventListeners();

    // Set initial active link based on current URL
    setActiveLink();
  }

  // ============================================
  // DOM Ready Handler
  // ============================================

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM is already ready
    init();
  }

  // ============================================
  // Handle browser navigation (back/forward)
  // ============================================
  window.addEventListener('popstate', function () {
    // Update active link when user navigates with browser buttons
    setActiveLink();
  });
})();
