const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('primary-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      toggle.focus();
    }
  });
}

for (const form of document.querySelectorAll('.guest-interest')) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const fields = [['Name', 'name'], ['Email', 'email'], ['Affiliation and role', 'affiliation'], ['Proposed topic', 'topic'], ['Student takeaways', 'description'], ['Availability and time zone', 'availability'], ['Preferred format', 'format'], ['Website', 'website']];
    const body = fields.map(([label, key]) => `${label}: ${String(values.get(key) || '').trim()}`).join('\n\n');
    const subject = `${form.dataset.course} guest lecturer interest`;
    const href = `mailto:ruolinl@usc.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const status = form.querySelector('.form-status');
    status.textContent = 'Your email draft is ready. Review and send it in your email app. If no app opens, copy the draft below and email ruolinl@usc.edu.';
    let draft = form.querySelector('.email-draft');
    if (!draft) {
      draft = document.createElement('textarea');
      draft.className = 'email-draft';
      draft.readOnly = true;
      draft.rows = 12;
      draft.setAttribute('aria-label', 'Email draft to copy');
      form.append(draft);
    }
    draft.value = `To: ruolinl@usc.edu\nSubject: ${subject}\n\n${body}`;
    window.location.href = href;
  });
}

// Pause on focus, hover, hidden tabs, or a reduced-motion preference.
const cinema = document.querySelector('.vision-cinema');
if (cinema) {
  const slides = [...cinema.querySelectorAll('.vision-slide')];
  const dots = [...cinema.querySelectorAll('.vision-dot')];
  const pause = cinema.querySelector('.vision-pause');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0, paused = motion.matches, hovered = false, focused = false, timer;
  function schedule() {
    clearTimeout(timer);
    if (!paused && !hovered && !focused && !document.hidden) timer = setTimeout(() => show((current + 1) % slides.length), 6500);
  }
  function show(index) {
    current = index;
    slides.forEach((slide, i) => { slide.classList.toggle('is-active', i === index); slide.setAttribute('aria-hidden', String(i !== index)); });
    dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === index)));
    schedule();
  }
  function updatePause() { pause.textContent = paused ? 'Play' : 'Pause'; pause.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow'); schedule(); }
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
  pause.addEventListener('click', () => { paused = !paused; updatePause(); });
  cinema.addEventListener('mouseenter', () => { hovered = true; schedule(); });
  cinema.addEventListener('mouseleave', () => { hovered = false; schedule(); });
  cinema.addEventListener('focusin', () => { focused = true; schedule(); });
  cinema.addEventListener('focusout', (event) => { focused = cinema.contains(event.relatedTarget); schedule(); });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => { paused = motion.matches; updatePause(); });
  updatePause();
}

// One quiet entrance per paragraph; content remains visible without JavaScript.
const manifesto = document.querySelector('.vision-manifesto');
if (manifesto && 'IntersectionObserver' in window) {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const entrances = [];
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    if (preference.matches) return;
    manifesto.querySelectorAll('.manifesto-copy p').forEach((paragraph, index) => {
      entrances.push(paragraph.animate([
        { opacity: 0, transform: 'translateY(22px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 850, delay: index * 220, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' }));
    });
  }, { threshold: 0.15 });
  observer.observe(manifesto);
  preference.addEventListener('change', () => {
    if (preference.matches) entrances.forEach(animation => animation.cancel());
  });
}
