/**
 * Pankaj Prasad - Portfolio Website
 * Vanilla JavaScript | Interactive & Animated
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initScrollProgress();
  initNavbar();
  initSectionReveal();
  initProgressBars();
  initSkillCardHoverEffects();
  initBackToTop();
  initContactForm();
  initMobileMenu();
  initDarkModeToggle();
  initSmoothScroll();
  initParallax();
});

/**
 * Animated Typing Effect in Hero Section - Professional Roles
 */
function initTypingEffect() {
  const dynamicRole = document.getElementById('dynamicRole');
  const typedCursor = document.getElementById('typedCursor');
  
  const roles = ['Web Developer', 'Software Engineer', 'BSc IT Graduate'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const pauseTime = 2000;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      dynamicRole.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      dynamicRole.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 500;
    }

    setTimeout(type, delay);
  }

  if (dynamicRole && typedCursor) {
    setTimeout(type, 1000);
  }
}

/**
 * Scroll Progress Indicator at Top
 */
function initScrollProgress() {
  const scrollProgress = document.getElementById('scrollProgress');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    
    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }
  });
}

/**
 * Sticky Navbar with Blur & Scroll State
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });
}

/**
 * Section Reveal Animation (Left to Right on Scroll)
 */
function initSectionReveal() {
  const reveals = document.querySelectorAll('.section-reveal');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('revealed');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
}

/**
 * Animated Progress Bars (triggered on scroll)
 */
function initProgressBars() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const progressFills = skillsSection.querySelectorAll('.progress-fill');
  const percentageLabels = skillsSection.querySelectorAll('.skill-percentage');
  const entranceContainer = skillsSection.querySelector('.skills-entrance');

  if (!progressFills.length) return;

  const animatePercent = (el, target) => {
    let start = null;
    const duration = 1200;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const value = Math.round(progress * target);
      el.textContent = `${value}%`;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${target}%`;
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          progressFills.forEach((bar) => {
            const progress = parseInt(bar.getAttribute('data-progress') || '0', 10);
            bar.style.setProperty('--progress-width', `${progress}%`);
            bar.classList.add('animated');
          });

          percentageLabels.forEach((label) => {
            const target = parseInt(label.getAttribute('data-skill-percent') || '0', 10);
            animatePercent(label, target);
          });

          entranceContainer?.classList.add('visible');
          obs.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(skillsSection);
}


/**
 * Card tilt + mouse-follow glow for skills cards
 */
function initSkillCardHoverEffects() {
  const cards = document.querySelectorAll('.skills-card');

  cards.forEach((card) => {
    const glow = card.querySelector('.skills-mouse-glow');
    if (!glow) return;

    const maxTilt = 4;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      glow.style.opacity = 0.4;
      glow.style.transform = `translate3d(${x - 40}px, ${y - 40}px, 0)`;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    };

    const handleLeave = () => {
      glow.style.opacity = 0;
      card.style.transform = '';
    };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
  });
}

/**
 * Back to Top Floating Button
 */
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  const footerToTop = document.getElementById('footerToTop');

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop?.classList.add('visible');
    } else {
      backToTop?.classList.remove('visible');
    }
  });

  backToTop?.addEventListener('click', scrollToTop);

  footerToTop?.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToTop();
  });
}

/**
 * Contact Form Submit via Web3Forms API + Success Popup
 */
function initContactForm() {
  const form = document.getElementById('contactForm');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn?.innerHTML;

    try {
      submitBtn && (submitBtn.disabled = true);
      submitBtn && (submitBtn.innerHTML = '<span class="animate-pulse">Sending...</span>');

      const formData = new FormData(form);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();

      if (result.success) {
        showSuccessPopup();
        form.reset();
      } else {
        showErrorPopup(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      showErrorPopup('Failed to send. Please check your connection and try again.');
    } finally {
      submitBtn && (submitBtn.disabled = false);
      if (submitBtn && originalText) submitBtn.innerHTML = originalText;
    }
  });
}

/**
 * Show Error Popup
 */
function showErrorPopup(message) {
  const popup = document.getElementById('errorPopup');
  const messageEl = document.getElementById('errorMessage');
  if (messageEl) messageEl.textContent = message;
  popup?.classList.add('active');
  setTimeout(() => popup?.classList.remove('active'), 4000);
}

/**
 * Show Success Popup Animation
 */
function showSuccessPopup() {
  const popup = document.getElementById('successPopup');
  popup?.classList.add('active');
  
  setTimeout(() => {
    popup?.classList.remove('active');
  }, 3000);
}

/**
 * Live Demo - Coming Soon Popup
 */
function showComingSoon(event) {
  if (event) event.preventDefault();
  const popup = document.getElementById('comingSoonPopup');
  popup?.classList.add('active');
}

function closeComingSoon() {
  const popup = document.getElementById('comingSoonPopup');
  popup?.classList.remove('active');
}

// Expose for inline onclick
window.showComingSoon = showComingSoon;
window.closeComingSoon = closeComingSoon;

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  menuBtn?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });

  // Close menu when clicking a link
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.add('hidden');
    });
  });
}

/**
 * Dark Mode Toggle (Theme Switcher - Light/Dark)
 */
function initDarkModeToggle() {
  const toggle = document.getElementById('darkModeToggle');
  const sunIcon = toggle?.querySelector('.sun-icon');
  const moonIcon = toggle?.querySelector('.moon-icon');

  // Check saved preference (default: dark)
  const isLight = localStorage.getItem('theme') === 'light';

  const setTheme = (useLight) => {
    if (useLight) {
      document.documentElement.classList.add('light');
      sunIcon?.classList.add('hidden');
      moonIcon?.classList.remove('hidden');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      sunIcon?.classList.remove('hidden');
      moonIcon?.classList.add('hidden');
      localStorage.setItem('theme', 'dark');
    }
  };

  setTheme(isLight);

  toggle?.addEventListener('click', () => {
    const currentlyLight = document.documentElement.classList.contains('light');
    setTheme(!currentlyLight);
  });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Subtle Parallax Effect on Scroll
 */
function initParallax() {
  const heroContent = document.querySelector('#hero .relative');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const rate = scrolled * 0.15;
    
    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${rate}px)`;
    }
  });
}
