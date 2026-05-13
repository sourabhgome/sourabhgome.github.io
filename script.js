// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle with persistence
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  if (next === 'dark') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  localStorage.setItem('theme', next);
});

// Animated number counters
const counters = document.querySelectorAll('.stat-num');
const animateCount = (el) => {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const isFloat = target % 1 !== 0;
  const duration = 1400;
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = (isFloat ? value.toFixed(1) : Math.floor(value)) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = (isFloat ? target.toFixed(1) : target) + suffix;
  };
  requestAnimationFrame(tick);
};

// IntersectionObserver: reveal sections + run counters once
const sections = document.querySelectorAll('.section, .hero');
sections.forEach(s => s.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // run counters if this is the hero
      const stats = entry.target.querySelectorAll('.stat-num');
      stats.forEach(animateCount);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

sections.forEach(s => io.observe(s));

// Smooth scroll active link highlighting
const navLinks = document.querySelectorAll('.nav-links a');
const targets = [...navLinks].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const linkFor = (id) => [...navLinks].find(a => a.getAttribute('href') === '#' + id);

const navIo = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.style.color = '');
      const active = linkFor(entry.target.id);
      if (active) active.style.color = 'var(--text)';
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

targets.forEach(t => navIo.observe(t));
