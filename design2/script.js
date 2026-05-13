document.getElementById('year').textContent = new Date().getFullYear();

// Gentle fade-up on scroll
const targets = document.querySelectorAll('.feature, .numbers, .quote-section, .colophon');
targets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity .7s ease, transform .7s ease';
});

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

targets.forEach(el => io.observe(el));
