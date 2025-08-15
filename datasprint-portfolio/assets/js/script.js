document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.getElementById('site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('show');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth scroll is handled by CSS; ensure focus for accessibility
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  // Reveal on scroll
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        revealer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('[data-reveal]').forEach((el) => revealer.observe(el));

  // Footer year
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Apply form handling
  const form = document.getElementById('apply-form');
  const message = document.querySelector('.form__message');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      if (!name || !email) {
        if (message) message.textContent = 'Please provide your name and email.';
        return;
      }
      if (message) message.textContent = 'Thanks! Your interest has been recorded.';
      form.reset();
    });
  }
});