// Reveal blocks one at a time, terminal-style
const blocks = document.querySelectorAll('.block');
blocks.forEach((b, i) => {
  b.style.opacity = '0';
  b.style.transform = 'translateY(8px)';
  b.style.transition = 'opacity .35s ease, transform .35s ease';
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

blocks.forEach(b => io.observe(b));
