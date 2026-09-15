// Mobile Navigation
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');

if (menuButton && navigation) {
  const closeNavigation = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    navigation.classList.remove('is-open');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNavigation);
  });

  // Close when clicking outside
  document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target) && navigation.classList.contains('is-open')) {
      closeNavigation();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
      closeNavigation();
      menuButton.focus();
    }
  });
}

// Copy Email Functionality
const copyBtn = document.querySelector('#copy-email-btn');
const copyNotice = document.querySelector('#copy-notice');

if (copyBtn && copyNotice) {
  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.getAttribute('data-email') || 'saideepak219@gmail.com';
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }
      copyNotice.textContent = 'Email copied to clipboard.';
      setTimeout(() => {
        copyNotice.textContent = '';
      }, 3500);
    } catch (err) {
      copyNotice.textContent = 'Email: saideepak219@gmail.com';
    }
  });
}

// Progressive, Non-blocking Scroll Reveal
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealElements = document.querySelectorAll('.reveal');

if (!reducedMotion && 'IntersectionObserver' in window && revealElements.length > 0) {
  document.body.classList.add('js-reveal-enabled');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -30px 0px',
    threshold: 0.05
  });

  revealElements.forEach((el) => revealObserver.observe(el));
}
