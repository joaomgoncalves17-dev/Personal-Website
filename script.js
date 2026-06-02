function smoothScrollAnchors() {
  const smoothLinks = document.querySelectorAll('a[href^="#"]');

  smoothLinks.forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function typeHeroSubtitle() {
  const heroSubtitle = document.querySelector('.hero-text h2');
  if (!heroSubtitle) return;

  const text = heroSubtitle.textContent.trim();
  heroSubtitle.textContent = '';
  let index = 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    heroSubtitle.textContent = text;
    return;
  }

  const intervalId = window.setInterval(() => {
    heroSubtitle.textContent += text[index] || '';
    index += 1;
    if (index >= text.length) {
      window.clearInterval(intervalId);
    }
  }, 55);
}

function revealOnScroll() {
  const elements = document.querySelectorAll('.card, .skill-card');
  if (!elements.length) return;

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  const reveal = entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(reveal);
  }, {
    threshold: 0.2,
  });

  elements.forEach(el => observer.observe(el));
}

function setupEmailClipboard() {
  const emailLink = document.querySelector('a[href^="mailto:"]');
  if (!emailLink || !navigator.clipboard) return;

  emailLink.addEventListener('click', async event => {
    const email = emailLink.getAttribute('href').replace('mailto:', '');
    try {
      await navigator.clipboard.writeText(email);
      emailLink.title = 'Email copied to clipboard';
    } catch (err) {
      emailLink.title = 'Unable to copy email';
    }
  });
}

function initializeSiteInteractions() {
  smoothScrollAnchors();
  typeHeroSubtitle();
  revealOnScroll();
  setupEmailClipboard();
}

document.addEventListener('DOMContentLoaded', initializeSiteInteractions);
