// Mobile nav toggle
const hamburger = document.querySelector('.nav-hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

// Highlight active nav link
const current = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === current || (current === '' && href === 'index.html')) a.classList.add('active');
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Contact form (Web3Forms)
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(form)
      });
      const data = await res.json();
      if (data.success) {
        form.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
      } else {
        btn.disabled = false;
        btn.textContent = 'Send Message';
        alert('Something went wrong. Please email us directly.');
      }
    } catch {
      btn.disabled = false;
      btn.textContent = 'Send Message';
      alert('Network error. Please try again.');
    }
  });
}
