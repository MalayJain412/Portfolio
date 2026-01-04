/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 50,
      backSpeed: 20,
      backDelay: 1500
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Resume Download Loader and Message
   */
// Resume loader logic removed for better UX


})();

/**
 * Theme toggle
 */
const themeToggleBtn = document.querySelector('#theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeIcon.classList.replace('bi-moon', 'bi-sun');
}

themeToggleBtn.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
  themeIcon.classList.replace(isDark ? 'bi-sun' : 'bi-moon', isDark ? 'bi-moon' : 'bi-sun');
});

/* Voice Orb: move from inline HTML to main JS */
document.addEventListener('DOMContentLoaded', () => {
  // Render Lucide icons used inside the orb
  if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();

  const coreEl = document.getElementById('voice-core');
  const iconEl = document.getElementById('voice-icon');
  const visEl = document.getElementById('voice-visualizer');
  const ring1 = document.getElementById('voice-ring-1');
  const ring2 = document.getElementById('voice-ring-2');
  const tooltip = document.getElementById('voice-tooltip');

  if (!coreEl || !iconEl || !visEl || !ring1 || !ring2) {
    // Required DOM nodes not present; silently skip
    return;
  }

  let voiceState = 'idle'; // idle, listening, speaking

  // Expose toggle for the inline onclick
  window.toggleVoice = function() {
    if (!('speechSynthesis' in window)) {
      // Fallback: briefly flash tooltip
      if (tooltip) {
        tooltip.textContent = 'Speech not supported in this browser';
        setTimeout(() => tooltip.textContent = '🎤 Tap to hear my intro', 2000);
      }
      return;
    }

    if (voiceState === 'speaking') {
      window.speechSynthesis.cancel();
      setVoiceState('idle');
      return;
    }

    if (voiceState === 'idle') {
      setVoiceState('listening');
      setTimeout(() => speakIntro(), 800);
    }
  };

  function setVoiceState(state) {
    voiceState = state;

    // reset classes
    coreEl.classList.remove('listening', 'speaking');
    visEl.classList.remove('active');
    if (tooltip) tooltip.style.opacity = '';
    ring1.style.transition = '';
    ring2.style.transition = '';

    // clear icon container
    iconEl.innerHTML = '';

    if (state === 'idle') {
      const micIcon = document.createElement('i');
      micIcon.setAttribute('data-lucide', 'mic');
      micIcon.style.width = '40px';
      micIcon.style.height = '40px';
      iconEl.appendChild(micIcon);
      if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
    }

    if (state === 'listening') {
      coreEl.classList.add('listening');
      if (tooltip) tooltip.style.opacity = '0';

      const spinner = document.createElement('div');
      spinner.className = 'spinner-border text-purple-500';
      spinner.style.width = '36px';
      spinner.style.height = '36px';
      spinner.style.borderWidth = '3px';
      iconEl.appendChild(spinner);
    }

    if (state === 'speaking') {
      coreEl.classList.add('speaking');
      visEl.classList.add('active');
      if (tooltip) tooltip.style.opacity = '0';

      // Expand rings visually
      ring1.style.transform = 'scale(1.5)';
      ring1.style.opacity = '0';
      ring2.style.transform = 'scale(1.25)';
      ring2.style.opacity = '0';

      const pauseIcon = document.createElement('i');
      pauseIcon.setAttribute('data-lucide', 'pause');
      pauseIcon.style.width = '40px';
      pauseIcon.style.height = '40px';
      iconEl.appendChild(pauseIcon);
      if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
    }
  }

  function speakIntro() {
    if (!('speechSynthesis' in window)) return setVoiceState('idle');

    setVoiceState('speaking');

    const text = "Hello! I'm Malay. I build scalable web applications and integrate intelligent AI solutions. Welcome to my portfolio.";
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onend = () => setVoiceState('idle');

    // choose a friendly voice if available
    const voices = window.speechSynthesis.getVoices() || [];
    const preferred = voices.find(v => /Google|Samantha|Microsoft/i.test(v.name));
    if (preferred) utterance.voice = preferred;
    utterance.pitch = 1;
    utterance.rate = 1.05;

    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis error', err);
      setVoiceState('idle');
    }
  }

  // preload voices in some browsers
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    // some browsers populate asynchronously
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  }

  // initial state
  setVoiceState('idle');

});
