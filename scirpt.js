// Simple Responsive Menu - Perfect for Client Projects
document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // DOM Elements
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
  const body = document.body;

  // State
  let isMobileMenuOpen = false;

  // Mobile Menu Toggle
  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    if (isMobileMenuOpen) {
      openMobileMenu();
    } else {
      closeMobileMenu();
    }
  }

  // Open Mobile Menu
  function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    mobileMenuBtn.classList.add('active');
    body.style.overflow = 'hidden';
    isMobileMenuOpen = true;
  }

  // Close Mobile Menu
  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    body.style.overflow = '';
    isMobileMenuOpen = false;

    // Close all mobile dropdowns
    document.querySelectorAll('.mobile-dropdown.active').forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  }

  // Mobile Dropdown Toggle
  function toggleMobileDropdown(dropdown) {
    const isActive = dropdown.classList.contains('active');

    // Close all other dropdowns
    document.querySelectorAll('.mobile-dropdown.active').forEach(otherDropdown => {
      if (otherDropdown !== dropdown) {
        otherDropdown.classList.remove('active');
      }
    });

    // Toggle current dropdown
    if (isActive) {
      dropdown.classList.remove('active');
    } else {
      dropdown.classList.add('active');
    }
  }

  // Event Listeners
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      if (mobileMenu.classList.contains("active")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
  }

  // Mobile dropdown event listeners
  mobileDropdownBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const dropdown = btn.closest(".mobile-dropdown");
      const dropdownContent = dropdown.querySelector(".mobile-dropdown-content");
      const menuContent = document.querySelector(".mobile-menu-content");

      // Toggle this dropdown only
      const isActive = dropdown.classList.contains("active");
      closeAllDropdowns(); // Close all first

      if (!isActive) {
        dropdown.classList.add("active");

        // Wait for the dropdown to expand, then scroll
        setTimeout(() => {
          // Get the position of the dropdown button relative to the menu content
          const btnRect = btn.getBoundingClientRect();
          const menuRect = menuContent.getBoundingClientRect();
          const dropdownHeight = dropdownContent.scrollHeight;

          // Calculate if dropdown extends beyond visible area
          const dropdownBottom = btnRect.bottom - menuRect.top + dropdownHeight;
          const menuHeight = menuContent.clientHeight;

          if (dropdownBottom > menuHeight) {
            // Scroll the menu content to show the dropdown
            const scrollTop = menuContent.scrollTop;
            const targetScroll = scrollTop + (dropdownBottom - menuHeight) + 20; // 20px padding
            menuContent.scrollTo({ top: targetScroll, behavior: "smooth" });
          }
        }, 150); // Wait for CSS transition to start
      }
    });
  });

  // Helper: Close all dropdowns
  function closeAllDropdowns() {
    document.querySelectorAll(".mobile-dropdown.active").forEach((item) => {
      item.classList.remove("active");
    });
  }

  // Close mobile menu on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isMobileMenuOpen) {
      closeMobileMenu();
    }
  });

  // Close mobile menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMobileMenuOpen) {
      closeMobileMenu();
    }
  });

  // Prevent body scroll when mobile menu is open
  function preventBodyScroll(e) {
    if (isMobileMenuOpen && !mobileMenu.contains(e.target)) {
      e.preventDefault();
    }
  }

  // Add touch event listeners for better mobile experience
  document.addEventListener('touchmove', preventBodyScroll, { passive: false });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    // Close desktop dropdowns if clicking outside
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }

    // Close mobile dropdowns when clicking outside mobile menu
    if (!e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-btn')) {
      if (isMobileMenuOpen) {
        closeMobileMenu();
      }
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Close mobile menu if open
        if (isMobileMenuOpen) {
          closeMobileMenu();
        }
      }
    });
  });

  // Add loading state for buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Add your button click logic here
      console.log('Button clicked:', this.textContent);
    });
  });

  // Improve scrolling within dropdown content areas
  document.querySelectorAll(".mobile-dropdown-content").forEach(content => {
    // Enable smooth scrolling for dropdown content
    content.style.scrollBehavior = "smooth";
    // Add touch scroll momentum for iOS
    content.style.webkitOverflowScrolling = "touch";
  });

  // Ensure mobile menu content is scrollable
  const mobileMenuContent = document.querySelector(".mobile-menu-content");
  if (mobileMenuContent) {
    mobileMenuContent.style.scrollBehavior = "smooth";
    mobileMenuContent.style.webkitOverflowScrolling = "touch";
  }

  // Initialize
  console.log('✅ Simple Responsive Menu initialized successfully!');
});


document.addEventListener('DOMContentLoaded', function() {
  // Get slider elements
  const slideContainer = document.getElementById('slideContainer');
  const slides = document.querySelectorAll('.slide');
  const dotContainer = document.getElementById('dotContainer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  // Initialize variables
  let currentIndex = 0;
  let slideWidth = slides[0].clientWidth;
  let autoSlideInterval;
  let touchStartX = 0;
  let touchEndX = 0;
  
  // Create dots based on number of slides
  function createDots() {
    slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (index === 0) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => goToSlide(index));
      dotContainer.appendChild(dot);
    });
  }
  
  // Update the slider position
  function updateSlider() {
    slideContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    
    // Update active dot
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  // Go to specific slide
  function goToSlide(index) {
    // Handle bounds
    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }
    
    currentIndex = index;
    slideWidth = slides[0].clientWidth; // Update slide width in case of resize
    updateSlider();
  }
  
  // Next slide function
  function nextSlide() {
    goToSlide(currentIndex + 1);
    resetAutoSlide();
  }
  
  // Previous slide function
  function prevSlide() {
    goToSlide(currentIndex - 1);
    resetAutoSlide();
  }
  
  // Start auto sliding
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }
  
  // Stop auto sliding
  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
  }
  
  // Reset auto slide timer
  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }
  
  // Handle window resize
  function handleResize() {
    slideWidth = slides[0].clientWidth;
    updateSlider();
  }
  
  // Touch events for mobile swiping
  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
  }
  
  function handleTouchMove(e) {
    touchEndX = e.touches[0].clientX;
  }
  
  function handleTouchEnd() {
    const touchDiff = touchStartX - touchEndX;
    
    // If the touch was significant enough (prevent accidental swipes)
    if (Math.abs(touchDiff) > 50) {
      if (touchDiff > 0) {
        nextSlide(); // Swipe left, go to next
      } else {
        prevSlide(); // Swipe right, go to previous
      }
    }
  }
  
  // Preload images for smoother experience
  function preloadImages() {
    slides.forEach(slide => {
      const bgImg = slide.querySelector('.slide-image');
      if (bgImg) {
        const style = window.getComputedStyle(bgImg);
        const bgUrl = style.backgroundImage.replace(/url$$['"]?(.*?)['"]?$$/i, '$1');
        
        if (bgUrl && bgUrl !== 'none') {
          const img = new Image();
          img.src = bgUrl;
        }
      }
    });
  }
  
  // Initialize slider
  function initSlider() {
    // Create navigation dots
    createDots();
    
    // Set initial position
    updateSlider();
    
    // Start auto sliding
    startAutoSlide();
    
    // Add event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    window.addEventListener('resize', handleResize);
    
    // Touch events
    slideContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    slideContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
    slideContainer.addEventListener('touchend', handleTouchEnd);
    
    // Pause auto-slide on hover
    slideContainer.addEventListener('mouseenter', stopAutoSlide);
    slideContainer.addEventListener('mouseleave', startAutoSlide);
    
    // Preload images
    preloadImages();
  }
  
  // Initialize the slider
  initSlider();
  
  // Make functions available globally for inline onclick handlers
  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;
});

    //start
    document.addEventListener('DOMContentLoaded', function() {
  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero Section Animations
  const heroTimeline = gsap.timeline();
  
  heroTimeline.fromTo(
    '.hero-content .animate-item',
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out' }
  );
  
  gsap.fromTo(
    '.hero-image',
    { clipPath: 'inset(15%)', scale: 1.2 },
    {
      clipPath: 'inset(0%)',
      scale: 1,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      },
    }
  );
  
  // Mission Cards Animation
  gsap.fromTo(
    '.mission-card',
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.mission-section',
        start: 'top 70%',
      },
    }
  );
  
  // Set mission card icon colors
  document.querySelectorAll('.mission-card').forEach(card => {
    const color = card.getAttribute('data-color');
    if (color) {
      card.querySelector('.card-icon').style.backgroundColor = color;
    }
  });
  
  // Services Animation
  gsap.fromTo(
    '.service-card',
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.services-section',
        start: 'top 70%',
      },
    }
  );
  
  // Stats Counter Animation
  const statElements = document.querySelectorAll('.stat-value');
  
  function animateStats() {
    statElements.forEach(stat => {
      const value = parseFloat(stat.getAttribute('data-value'));
      const duration = 2000;
      const startTime = Date.now();
      const startValue = parseFloat(stat.textContent);
      
      function updateValue() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = startValue + (value - startValue) * progress;
        stat.textContent = Number.isInteger(value) ? Math.floor(currentValue) : currentValue.toFixed(1);
        
        if (progress < 1) {
          requestAnimationFrame(updateValue);
        }
      }
      
      updateValue();
    });
  }
  
  ScrollTrigger.create({
    trigger: '.stats-section',
    start: 'top 70%',
    onEnter: animateStats,
    once: true
  });
  
  // Team Members Animation
  gsap.fromTo(
    '.team-member',
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.team-section',
        start: 'top 70%',
      },
    }
  );
  
  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let testimonialInterval;
  
  function showSlide(index) {
    testimonialSlides.forEach((slide, i) => {
      slide.classList.remove('active');
      dots[i].classList.remove('active');
    });
    
    testimonialSlides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
  }
  
  // Initialize testimonial slider
  testimonialInterval = setInterval(nextSlide, 6000);
  
  // Add click event to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(testimonialInterval);
      showSlide(index);
      testimonialInterval = setInterval(nextSlide, 6000);
    });
  });
  
  // Client Logos Animation
  gsap.fromTo(
    '.client-logo',
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.clients-section',
        start: 'top 80%',
      },
    }
  );
  
  // CTA Section Animation
  gsap.fromTo(
    '.cta-content .animate-item',
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 70%',
      },
    }
  );
});




//start
/**
 * Premium Before/After Image Comparison Slider
 * Enhanced version with smooth animations and better touch support
 */
document.addEventListener('DOMContentLoaded', function() {
  // Configuration options
  const config = {
    defaultPosition: 50, // Default slider position (percentage)
    animationDuration: 400, // Animation duration in ms
    sliderWidth: 40, // Width of slider handle in pixels
    touchThreshold: 5, // Threshold for touch movement detection
    labels: {
      before: 'BEFORE',
      after: 'AFTER'
    }
  };

  // Initialize all comparison sliders
  initializeAllSliders();

  /**
   * Initialize all image comparison sliders on the page
   */
  function initializeAllSliders() {
    const sliderContainers = document.querySelectorAll('.img-comp-container');
    
    sliderContainers.forEach((container, index) => {
      const slider = container.querySelector('.img-comp-slider');
      const overlay = container.querySelector('.img-comp-overlay');
      
      // Set initial position
      setSliderPosition(container, slider, overlay, config.defaultPosition);
      
      // Initialize events for this slider
      initializeSliderEvents(container, slider, overlay);
      
      // Add data attribute for tracking
      container.setAttribute('data-slider-id', `slider-${index}`);
      
      // Add initial animation
      setTimeout(() => {
        animateSlider(container, slider, overlay, 40, config.animationDuration);
        setTimeout(() => {
          animateSlider(container, slider, overlay, 60, config.animationDuration);
          setTimeout(() => {
            animateSlider(container, slider, overlay, config.defaultPosition, config.animationDuration);
          }, config.animationDuration + 100);
        }, config.animationDuration + 100);
      }, 500 + (index * 150)); // Stagger the animations
    });
    
    // Add window resize handler for responsive adjustments
    window.addEventListener('resize', debounce(() => {
      sliderContainers.forEach(container => {
        const slider = container.querySelector('.img-comp-slider');
        const overlay = container.querySelector('.img-comp-overlay');
        const currentPct = (parseFloat(overlay.style.width) / container.offsetWidth) * 100;
        
        // Update position based on percentage to maintain position during resize
        setSliderPosition(container, slider, overlay, currentPct);
      });
    }, 250));
  }

  /**
   * Initialize events for a specific slider
   */
  function initializeSliderEvents(container, slider, overlay) {
    let isDragging = false;
    let startX, startTouch;
    
    // Mouse events
    slider.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', endDrag);
    
    // Touch events with improved handling
    slider.addEventListener('touchstart', startDragTouch, { passive: false });
    window.addEventListener('touchmove', dragTouch, { passive: false });
    window.addEventListener('touchend', endDrag);
    window.addEventListener('touchcancel', endDrag);
    
    // Click anywhere on container to move slider
    container.addEventListener('click', function(e) {
      // Don't process if we're clicking on the slider itself
      if (e.target === slider || slider.contains(e.target)) return;
      
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = (x / container.offsetWidth) * 100;
      
      animateSlider(container, slider, overlay, pct, config.animationDuration);
    });
    
    function startDrag(e) {
      e.preventDefault();
      isDragging = true;
      startX = e.clientX;
      
      // Add active class for styling
      slider.classList.add('active');
    }
    
    function startDragTouch(e) {
      e.preventDefault();
      if (e.touches.length === 1) {
        isDragging = true;
        startTouch = e.touches[0].clientX;
        
        // Add active class for styling
        slider.classList.add('active');
      }
    }
    
    function drag(e) {
      if (!isDragging) return;
      e.preventDefault();
      
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = (x / container.offsetWidth) * 100;
      
      setSliderPosition(container, slider, overlay, pct);
    }
    
    function dragTouch(e) {
      if (!isDragging) return;
      e.preventDefault();
      
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const pct = (x / container.offsetWidth) * 100;
        
        setSliderPosition(container, slider, overlay, pct);
      }
    }
    
    function endDrag() {
      isDragging = false;
      slider.classList.remove('active');
    }
  }

  /**
   * Set slider position based on percentage
   */
  function setSliderPosition(container, slider, overlay, percentage) {
    // Constrain percentage between 0 and 100
    percentage = Math.max(0, Math.min(100, percentage));
    
    // Calculate pixel values
    const containerWidth = container.offsetWidth;
    const pixelPosition = (percentage / 100) * containerWidth;
    
    // Set positions
    overlay.style.width = `${pixelPosition}px`;
    slider.style.left = `${pixelPosition - (config.sliderWidth / 2)}px`;
    
    // Update labels visibility
    updateLabels(container, percentage);
  }

  /**
   * Animate slider to a specific position
   */
  function animateSlider(container, slider, overlay, targetPercentage, duration) {
    // Get current position
    const currentWidth = parseFloat(overlay.style.width) || 0;
    const containerWidth = container.offsetWidth;
    const currentPct = (currentWidth / containerWidth) * 100;
    
    // Constrain target percentage
    targetPercentage = Math.max(0, Math.min(100, targetPercentage));
    
    // Calculate target pixel position
    const targetPixels = (targetPercentage / 100) * containerWidth;
    
    // Animate using requestAnimationFrame for smooth performance
    const startTime = performance.now();
    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      const currentPixels = currentWidth + (targetPixels - currentWidth) * easedProgress;
      const currentSliderPos = currentPixels - (config.sliderWidth / 2);
      
      overlay.style.width = `${currentPixels}px`;
      slider.style.left = `${currentSliderPos}px`;
      
      // Update labels
      const currentAnimPct = (currentPixels / containerWidth) * 100;
      updateLabels(container, currentAnimPct);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  /**
   * Update the visibility of before/after labels
   */
  function updateLabels(container, percentage) {
    const beforeLabel = container.querySelector('.before-label');
    const afterLabel = container.querySelector('.after-label');
    
    if (beforeLabel && afterLabel) {
      // Fade labels based on slider position
      beforeLabel.style.opacity = percentage > 10 ? '1' : '0.3';
      afterLabel.style.opacity = percentage < 90 ? '1' : '0.3';
    }
  }

  /**
   * Easing function for smoother animations
   */
  function easeInOutCubic(t) {
    return t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  /**
   * Debounce function to limit how often a function is called
   */
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  // Add hover effects to service cards
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    // Enhanced hover effects with smoother transitions
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = 'var(--shadow-md)';
      this.querySelector('.service-title').style.color = 'var(--primary-color)';
      
      // Slightly increase slider size on hover
      const slider = this.querySelector('.slider-button');
      if (slider) {
        slider.style.transform = 'scale(1.1)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'var(--shadow-sm)';
      this.querySelector('.service-title').style.color = 'var(--gray-900)';
      
      // Reset slider size
      const slider = this.querySelector('.slider-button');
      if (slider) {
        slider.style.transform = 'scale(1)';
      }
    });
  });
});

//start 
document.addEventListener('DOMContentLoaded', function() {
  // File upload handling
  const fileInput = document.getElementById('sample');
  const fileLabel = document.querySelector('.file-label .file-text');
  
  if (fileInput && fileLabel) {
    fileInput.addEventListener('change', function() {
      if (this.files && this.files.length > 0) {
        fileLabel.textContent = this.files[0].name;
      } else {
        fileLabel.textContent = 'Upload Sample Image';
      }
    });
  }
  
  // Form submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Add loading state
      const submitButton = this.querySelector('.submit-button');
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
      submitButton.disabled = true;
      
      // Simulate form submission
      setTimeout(function() {
        // Reset form
        contactForm.reset();
        fileLabel.textContent = 'Upload Sample Image';
        
        // Show success message
        const formHeader = document.querySelector('.form-header h3');
        const originalHeader = formHeader.textContent;
        formHeader.textContent = 'Message Sent Successfully!';
        formHeader.style.color = '#28a745';
        
        // Reset button
        submitButton.innerHTML = '<span>Sent!</span> <i class="fas fa-check"></i>';
        submitButton.style.backgroundColor = '#28a745';
        
        // Reset after 3 seconds
        setTimeout(function() {
          formHeader.textContent = originalHeader;
          formHeader.style.color = '';
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
          submitButton.style.backgroundColor = '';
        }, 3000);
      }, 1500);
    });
  }
  
  // Animate elements on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .blog-post, .contact-form-container, .contact-item');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = element.classList.contains('service-card') && element.classList.contains('featured') 
          ? 'scale(1.05)' 
          : 'translateY(0)';
      }
    });
  }
  
  // Set initial state for animations
  const animatedElements = document.querySelectorAll('.service-card, .blog-post, .contact-form-container, .contact-item');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Run on page load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
});

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("pricingToggle")
  const perImageLabel = document.querySelector(".per-image")
  const bulkPricingLabel = document.querySelector(".bulk-pricing")
  const priceElements = document.querySelectorAll(".price")
  const priceUnits = document.querySelectorAll(".price-unit")
  const deliveryBadges = document.querySelectorAll(".delivery-badge")
  const featureLists = document.querySelectorAll(".features-list")

  // Pricing data
  const pricingData = {
    perImage: {
      basic: {
        price: "0.50",
        unit: "per image",
        delivery: "Next 24 Hours (500+ Images)",
        features: [
          "Simple product clipping",
          "Clean background removal",
          "Basic edge refinement",
          "24-hour delivery",
          "JPEG/PNG formats",
          "Free revisions",
        ],
      },
      standard: {
        price: "1.25",
        unit: "per image",
        delivery: "Next 24 Hours (500+ Images)",
        features: [
          "Medium complexity clipping",
          "Soft/fur edge refinement",
          "Shadow creation/removal",
          "Color correction",
          "12-hour delivery",
          "Free revisions (3x)",
        ],
      },
      premium: {
        price: "2.50",
        unit: "per image",
        delivery: "Next 24 Hours (500+ Images)",
        features: [
          "Complex multi-path clipping",
          "Jewelry & fine details",
          "Advanced retouching",
          "Multiple format delivery",
          "6-hour delivery",
          "Unlimited revisions",
        ],
      },
    },
    bulk: {
      basic: {
        price: "0.35",
        unit: "per image (100+ images)",
        delivery: "Next 48 Hours (Bulk Orders)",
        features: [
          "Simple product clipping",
          "Clean background removal",
          "Basic edge refinement",
          "48-hour delivery",
          "JPEG/PNG formats",
          "Free revisions",
          "Bulk discount applied",
          "Priority support",
        ],
      },
      standard: {
        price: "0.88",
        unit: "per image (100+ images)",
        delivery: "Next 48 Hours (Bulk Orders)",
        features: [
          "Medium complexity clipping",
          "Soft/fur edge refinement",
          "Shadow creation/removal",
          "Color correction",
          "24-hour delivery",
          "Free revisions (5x)",
          "Bulk discount applied",
          "Dedicated account manager",
        ],
      },
      premium: {
        price: "1.75",
        unit: "per image (100+ images)",
        delivery: "Next 48 Hours (Bulk Orders)",
        features: [
          "Complex multi-path clipping",
          "Jewelry & fine details",
          "Advanced retouching",
          "Multiple format delivery",
          "12-hour delivery",
          "Unlimited revisions",
          "Bulk discount applied",
          "White-glove service",
        ],
      },
    },
  }

  // Toggle functionality
  toggle.addEventListener("change", function () {
    const isBulk = this.checked

    // Update label states
    perImageLabel.classList.toggle("active", !isBulk)
    bulkPricingLabel.classList.toggle("active", isBulk)

    // Update pricing cards
    updatePricingCards(isBulk)

    // Add animation classes
    priceElements.forEach((price) => {
      price.classList.add("price-change")
      setTimeout(() => price.classList.remove("price-change"), 500)
    })

    featureLists.forEach((list) => {
      list.classList.add("features-update")
      setTimeout(() => list.classList.remove("features-update"), 600)
    })
  })

  function updatePricingCards(isBulk) {
    const mode = isBulk ? "bulk" : "perImage"
    const cards = ["basic", "standard", "premium"]

    cards.forEach((cardType, index) => {
      const data = pricingData[mode][cardType]

      // Update price
      const priceElement = priceElements[index]
      priceElement.textContent = data.price

      // Update price unit
      const priceUnitElement = priceUnits[index]
      priceUnitElement.textContent = data.unit

      // Update delivery badge
      const deliveryBadge = deliveryBadges[index]
      deliveryBadge.textContent = data.delivery

      // Update features list
      const featuresList = featureLists[index]
      featuresList.innerHTML = ""

      data.features.forEach((feature) => {
        const li = document.createElement("li")
        li.textContent = feature
        featuresList.appendChild(li)
      })
    })
  }

  // Add smooth scroll behavior for better UX
  document.querySelectorAll(".cta-button").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()

      // Add click animation
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)

      // You can add your actual CTA logic here
      console.log("CTA clicked for:", this.closest(".pricing-card").querySelector("h3").textContent)
    })
  })

  // Add hover effects for cards
  document.querySelectorAll(".pricing-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = this.classList.contains("popular") ? "scale(1.05) translateY(-10px)" : "translateY(-10px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = this.classList.contains("popular") ? "scale(1.05)" : ""
    })
  })

  // Initialize with per-image pricing
  updatePricingCards(false)
})


class BeforeAfterSlider {
    constructor(element) {
        this.container = element;
        this.afterImage = element.querySelector('.after-image');
        this.sliderLine = element.querySelector('.slider-line');
        this.sliderHandle = element.querySelector('.slider-handle');
        this.isDragging = false;
        this.sliderPosition = 50; // Initial position at 50%
        
        this.init();
    }
    
    init() {
        // Mouse events
        this.sliderHandle.addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        
        // Touch events for mobile
        this.sliderHandle.addEventListener('touchstart', this.handleTouchStart.bind(this));
        document.addEventListener('touchmove', this.handleTouchMove.bind(this));
        document.addEventListener('touchend', this.handleTouchEnd.bind(this));
        
        // Click on container to move slider
        this.container.addEventListener('click', this.handleContainerClick.bind(this));
        
        // Prevent default drag behavior on images
        const images = this.container.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('dragstart', e => e.preventDefault());
        });
    }
    
    handleMouseDown(e) {
        e.preventDefault();
        this.isDragging = true;
        document.body.classList.add('dragging');
    }
    
    handleTouchStart(e) {
        e.preventDefault();
        this.isDragging = true;
        document.body.classList.add('dragging');
    }
    
    handleMouseMove(e) {
        if (!this.isDragging) return;
        this.updateSliderPosition(e.clientX);
    }
    
    handleTouchMove(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        this.updateSliderPosition(e.touches[0].clientX);
    }
    
    handleMouseUp() {
        this.isDragging = false;
        document.body.classList.remove('dragging');
    }
    
    handleTouchEnd() {
        this.isDragging = false;
        document.body.classList.remove('dragging');
    }
    
    handleContainerClick(e) {
        // Don't trigger if clicking on the handle
        if (e.target.closest('.slider-handle')) return;
        
        this.updateSliderPosition(e.clientX);
    }
    
    updateSliderPosition(clientX) {
        const rect = this.container.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        
        this.sliderPosition = percentage;
        this.applySliderPosition();
    }
    
    applySliderPosition() {
        // Update clip-path for after image
        this.afterImage.style.clipPath = `inset(0 ${100 - this.sliderPosition}% 0 0)`;
        
        // Update slider line position
        this.sliderLine.style.left = `${this.sliderPosition}%`;
    }
}

// Initialize all sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.before-after-slider');
    
    sliders.forEach(slider => {
        new BeforeAfterSlider(slider);
    });
});

// Handle window resize
window.addEventListener('resize', function() {
    // Reinitialize sliders on resize to ensure proper positioning
    const sliders = document.querySelectorAll('.before-after-slider');
    sliders.forEach(slider => {
        const afterImage = slider.querySelector('.after-image');
        const sliderLine = slider.querySelector('.slider-line');
        
        // Reset to 50% position on resize
        afterImage.style.clipPath = 'inset(0 50% 0 0)';
        sliderLine.style.left = '50%';
    });
});