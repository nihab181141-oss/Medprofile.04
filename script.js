/**
 * ==========================================================================
 * DOCTOR PORTFOLIO TEMPLATE - MASTER JAVASCRIPT
 * ==========================================================================
 * 
 * Includes:
 * 1. Preloader Fade-out
 * 2. Sticky Navbar Scrolling Effects
 * 3. Mobile Menu Toggle & Navigation Drawer
 * 4. Smooth Scrolling with Offset Calculation
 * 5. Active Link Highlighting (Intersection Observer)
 * 6. Smooth FAQ Sliding Accordion
 * 7. Scroll-to-Top Button Toggle & Event
 * 8. Scroll Fade-In Scroll Animations
 */

document.addEventListener("DOMContentLoaded", () => {
  
  // Initialize Lucide Icons for dynamic tags injection
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  /* ==========================================================================
     1. PRELOADER ROUTINE
     ========================================================================== */
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.classList.add("opacity-0");
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500); // matches transition CSS delay
    });
    
    // Safety fallback: Hide preloader after 3 seconds in case window load event delays
    setTimeout(() => {
      if (preloader.style.display !== "none") {
        preloader.classList.add("opacity-0");
        setTimeout(() => preloader.style.display = "none", 500);
      }
    }, 3000);
  }

  /* ==========================================================================
     2. STICKY NAVBAR SCROLLING EFFECT
     ========================================================================== */
  const header = document.getElementById("main-header");
  const headerScrollOffset = 50; // Scroll distance in pixels to trigger scrolled state

  function handleNavbarScroll() {
    if (header) {
      if (window.scrollY > headerScrollOffset) {
        header.classList.add("sticky-scrolled");
      } else {
        header.classList.remove("sticky-scrolled");
      }
    }
  }

  window.addEventListener("scroll", handleNavbarScroll);
  handleNavbarScroll(); // Initial run on loads

  /* ==========================================================================
     3. MOBILE NAV DRAWER TOGGLE
     ========================================================================== */
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.contains("hidden");
      
      if (isHidden) {
        // Drop open mobile drawer
        mobileMenu.classList.remove("hidden");
        menuIcon.classList.add("hidden");
        closeIcon.classList.remove("hidden");
      } else {
        // Collapse mobile drawer
        mobileMenu.classList.add("hidden");
        menuIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
      }
    });

    // Close mobile menu whenever drawer items are clicked
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
      });
    });
  }

  /* ==========================================================================
     4. SMOOTH SCROLL OFFSET COMPENSATOR FOR STICKY NAVBAR
     ========================================================================== */
  // Offset needs to clear out the header space so content doesn't tuck behind the sticky navigation
  const headerHeightOffset = 88; // standard header height in scrolled state

  const navLinksList = document.querySelectorAll('a[href^="#"]');
  navLinksList.forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      // Allow safety for default anchor actions that are external or blank
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerHeightOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  /* ==========================================================================
     5. DYNAMIC NAVBAR ACTIVE HIGHLIGHT (Intersection Observer)
     ========================================================================== */
  const sections = document.querySelectorAll("section[id]");
  const desktopNavLinks = document.querySelectorAll("nav a.nav-link");
  const mobileNavLinks = document.querySelectorAll("#mobile-menu a.mobile-nav-link");

  const activeNavOptions = {
    root: null, // viewport matching
    rootMargin: "-100px 0px -40% 0px", // triggers when section fills middle of screen
    threshold: 0.15 // active when 15% of section enters viewport
  };

  const activeNavObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        // 1. Process Desktop Nav Links
        desktopNavLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });

        // 2. Process Mobile Nav Links
        mobileNavLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, activeNavOptions);

  sections.forEach(section => {
    activeNavObserver.observe(section);
  });

  /* ==========================================================================
     6. PREMIUM FAQ ACCORDION (Max-Height Transitions)
     ========================================================================== */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const button = item.querySelector(".faq-button");
    const content = item.querySelector(".faq-content");

    if (button && content) {
      button.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Collapse all other active FAQs first (Accordion Choice)
        faqItems.forEach(innerItem => {
          if (innerItem !== item && innerItem.classList.contains("active")) {
            innerItem.classList.remove("active");
            const innerContent = innerItem.querySelector(".faq-content");
            if (innerContent) {
              innerContent.style.maxHeight = null;
            }
          }
        });

        if (isActive) {
          // Collapse active panel
          item.classList.remove("active");
          content.style.maxHeight = null;
        } else {
          // Open target panel
          item.classList.add("active");
          // Calculate and set scrollHeight so CSS transition triggers smoothly
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
  });

  /* ==========================================================================
     7. SCROLL-TO-TOP DYNAMICS
     ========================================================================== */
  const scrollTopButton = document.getElementById("scroll-to-top");
  const topScrollOffset = 300; // reveal button after scroll index

  window.addEventListener("scroll", () => {
    if (scrollTopButton) {
      if (window.scrollY > topScrollOffset) {
        scrollTopButton.classList.add("visible");
      } else {
        scrollTopButton.classList.remove("visible");
      }
    }
  });

  if (scrollTopButton) {
    scrollTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* ==========================================================================
     8. SCROLL FADE-IN ANIMATION (Intersection Observer on Content)
     ========================================================================== */
  const observableElements = document.querySelectorAll(".section-obs");

  const scrollAnimationOptions = {
    threshold: 0.1, // trigger when 10% of element is in view
    rootMargin: "0px 0px -50px 0px" // triggers slightly before entry to avoid awkward flickers
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-visible");
        observer.unobserve(entry.target); // triggers once, avoids unnecessary recalculation
      }
    });
  }, scrollAnimationOptions);

  observableElements.forEach(elem => {
    scrollObserver.observe(elem);
  });
});
