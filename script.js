// ── Custom Cursor ──
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mx = 0, my = 0, fx = 0, fy = 0;

// Floating 'Hire me' click -> scroll to footer
const speak = document.querySelector('.speak-to-me');
if (speak) {
  speak.style.cursor = 'pointer';
  speak.addEventListener('click', () => {
    const ft = document.querySelector('footer');
    if (ft) ft.scrollIntoView({ behavior: 'smooth' });
  });
}

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top = fy + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .project-card, .service-item, .tech-item, .t-card, .blog-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px'; cursor.style.height = '20px';
    follower.style.width = '60px'; follower.style.height = '60px';
    follower.style.border = '1.5px solid rgba(255,255,255,0.15)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px'; cursor.style.height = '10px';
    follower.style.width = '36px'; follower.style.height = '36px';
  });
});

// ── Scroll behavior (progress bar removed) ┙
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY + 5) {
    nav.classList.add('nav-hidden');
  } else if (currentScrollY < lastScrollY - 5) {
    nav.classList.remove('nav-hidden');
  }
  lastScrollY = currentScrollY;
});

// ── Reveal on Scroll ──
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// ── Parallax ──
const parallaxItems = document.querySelectorAll('.parallax-item');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  parallaxItems.forEach(item => {
    const speed = parseFloat(item.dataset.speed) || 0;
    const rect = item.parentElement.getBoundingClientRect();
    const offset = (rect.top + scrollY) - scrollY;
    const shift = scrollY * speed;
    item.style.transform = `translateY(${shift}px)`;
  });
});

// ── 3D tilt on project cards ──
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) translateY(-8px) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── FAQ Toggle ──
function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ── Scroll-linked nav active link ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.boxShadow = window.scrollY > 50
    ? '0 8px 40px rgba(0,0,0,0.12)'
    : '0 4px 30px rgba(0,0,0,0.08)';

  const sections = ['hero','services','pricing','blog','cta-section'];
  const links = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) current = id;
  });
  links.forEach(a => {
    a.classList.remove('active');
    const href = a.getAttribute('href').replace('#','');
    if (href === current) a.classList.add('active');
  });
});
