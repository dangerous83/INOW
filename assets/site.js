// Header state on scroll
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile nav toggle
const burger = document.getElementById('burger');
if (burger) {
  burger.addEventListener('click', () => {
    document.querySelector('nav.links').classList.toggle('open');
    burger.classList.toggle('open');
  });
  document.querySelectorAll('nav.links a').forEach(a => a.addEventListener('click', () => {
    document.querySelector('nav.links').classList.remove('open');
    burger.classList.remove('open');
  }));
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => io.observe(el));

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form — no server backend, so it hands the enquiry to the
// visitor's own email client addressed to info@inow.ae
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const subject = this.subject.value.trim();
    const message = this.message.value.trim();

    const mailSubject = subject ? `INOW Enquiry: ${subject}` : `INOW Enquiry from ${name}`;
    const mailBody = `Name: ${name}\nEmail: ${email}\nInterested in: ${subject || '—'}\n\n${message}`;
    const mailtoUrl = `mailto:info@inow.ae?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    window.location.href = mailtoUrl;

    const btn = this.querySelector('.form-submit');
    const original = btn.innerHTML;
    btn.innerHTML = 'Opening Email…';
    this.reset();
    setTimeout(() => { btn.innerHTML = original; }, 2600);
  });
}

// Hero: cinematic reveal on load + mouse & scroll parallax
// (parallax scroll moves the wrap; the Ken Burns zoom animates the image
// itself, so the two transforms don't fight for the same element)
const heroImages = document.querySelectorAll('.hero-bg-image');
const heroWrap = document.querySelector('.hero-canvas-wrap');
if (heroImages.length) {
  requestAnimationFrame(() => heroImages.forEach(img => img.classList.add('revealed')));
}
if (heroWrap) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY * 0.2;
    heroWrap.style.transform = `translateY(${offset}px)`;
  }, { passive: true });
}

const heroContent = document.querySelector('.hero-content');
if (heroContent) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    heroContent.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
}

// Hero slider (Home): rotates background image + heading + copy together
const heroSlider = document.getElementById('heroSlider');
if (heroSlider) {
  const slideBgs = heroSlider.querySelectorAll('.hero-slide-bg');
  const slideTexts = heroSlider.querySelectorAll('.hero-slide-text');
  const dots = heroSlider.querySelectorAll('.hero-dots .dot');
  let current = 0;
  let timer;

  function goToSlide(index) {
    slideBgs.forEach((el, i) => el.classList.toggle('active', i === index));
    slideTexts.forEach((el, i) => el.classList.toggle('active', i === index));
    dots.forEach((el, i) => el.classList.toggle('active', i === index));
    current = index;
  }

  function nextSlide() {
    goToSlide((current + 1) % slideBgs.length);
  }

  function restartAutoplay() {
    clearInterval(timer);
    timer = setInterval(nextSlide, 6000);
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => {
    goToSlide(i);
    restartAutoplay();
  }));

  restartAutoplay();
}
