(function () {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const backToTop = document.getElementById('backToTop');
  const skillBars = document.querySelectorAll('.skill-bar');

  function closeMenu() {
    if (!navMenu) return;
    navMenu.classList.remove('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    if (!navMenu) return;
    navMenu.classList.add('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
  }

  if (navToggle) {
    navToggle.addEventListener('click', function (e) {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Close on ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Close when clicking outside of menu
  document.addEventListener('click', function (e) {
    if (!navMenu || !navToggle) return;
    const target = e.target;
    const clickedToggle = navToggle.contains(target);
    const clickedMenu = navMenu.contains(target);
    if (!clickedToggle && !clickedMenu) closeMenu();
  });

  // Smooth scroll and set active link + URL hash
  function setActiveLinkByHash(hash) {
    navLinks.forEach(function (l) {
      const isActive = l.getAttribute('href') === hash;
      l.classList.toggle('active', isActive);
      if (isActive) {
        l.setAttribute('aria-current', 'page');
      } else {
        l.removeAttribute('aria-current');
      }
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
      const hash = link.getAttribute('href') || '#home';
      if (history.pushState) {
        history.pushState(null, '', hash);
      } else {
        window.location.hash = hash;
      }
      setActiveLinkByHash(hash);
    });
  });

  // Active link on scroll (IntersectionObserver)
  const sectionIds = navLinks
    .map(function (l) { return l.getAttribute('href'); })
    .filter(Boolean)
    .map(function (h) { return h.replace('#', ''); });
  const sections = sectionIds
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        const id = entry.target.getAttribute('id');
        if (entry.isIntersecting) {
          const hash = '#' + id;
          setActiveLinkByHash(hash);
        }
      });
    }, { root: null, rootMargin: '0px 0px -60% 0px', threshold: 0.25 });

    sections.forEach(function (sec) { observer.observe(sec); });
  }

  // Set initial active link from hash
  setActiveLinkByHash(window.location.hash || '#home');

  // Current year
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Back to top button
  function onScroll() {
    if (!backToTop) return;
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolled > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveLinkByHash('#home');
    });
  }

  // Skill bar animations
  function animateSkillBars() {
    skillBars.forEach(function (bar) {
      const level = bar.getAttribute('data-level');
      if (level) {
        bar.style.width = level + '%';
      }
    });
  }

  // Intersection Observer for skill bars
  if ('IntersectionObserver' in window && skillBars.length > 0) {
    const skillObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateSkillBars();
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    // Observe the skills section
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillObserver.observe(skillsSection);
    }
  }

  // Add smooth reveal animations for elements
  function revealOnScroll() {
    const elements = document.querySelectorAll('.project-card, .skill-card, .cert-card, .contact-item, .detail-item, .timeline-item');
    
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, { threshold: 0.1 });

      elements.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
      });
    }
  }

  // Initialize reveal animations
  revealOnScroll();

  // Add typing effect for hero title (optional enhancement)
  function typeWriter(element, text, speed = 100) {
    if (!element) return;
    
    let i = 0;
    element.innerHTML = '';
    
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }

  // Optional: Add typing effect to hero title
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && window.innerWidth > 768) {
    const originalText = heroTitle.innerHTML;
    // Uncomment the next line if you want the typing effect
    // typeWriter(heroTitle, originalText, 80);
  }

  // Add parallax effect to hero section (subtle)
  function addParallaxEffect() {
    const heroSection = document.querySelector('.home');
    if (!heroSection) return;

    window.addEventListener('scroll', function () {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      heroSection.style.transform = `translateY(${rate}px)`;
    }, { passive: true });
  }

  // Initialize parallax effect
  addParallaxEffect();

  // Add hover effects for project cards
  function enhanceProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  // Initialize project card enhancements
  enhanceProjectCards();

  // Add counter animation for stats
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(function (counter) {
      const target = parseInt(counter.textContent);
      const increment = target / 50;
      let current = 0;
      
      const updateCounter = function () {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current) + '+';
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + '+';
        }
      };
      
      updateCounter();
    });
  }

  // Initialize counter animations when hero section is visible
  const heroSection = document.querySelector('.home');
  if (heroSection && 'IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounters();
          heroObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    heroObserver.observe(heroSection);
  }

})(); 