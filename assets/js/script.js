(() => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function initNavInteractions(){
    const navToggle = $('#navToggle');
    const nav = $('#primaryNav');
    if (navToggle && nav) {
      navToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
      });
    }
    const submenuParent = document.querySelector('.has-submenu');
    const submenuToggle = document.querySelector('.submenu-toggle');
    if (submenuParent && submenuToggle) {
      submenuToggle.addEventListener('click', (e) => {
        const nowOpen = submenuParent.classList.toggle('open');
        submenuToggle.setAttribute('aria-expanded', String(nowOpen));
        e.stopPropagation();
      });
      document.addEventListener('click', () => {
        submenuParent.classList.remove('open');
        submenuToggle.setAttribute('aria-expanded', 'false');
      });
      submenuParent.addEventListener('click', (e) => e.stopPropagation());
    }
  }

  // Services submenu (click to toggle on mobile, hover works on desktop via CSS)
  const submenuParent = document.querySelector('.has-submenu');
  const submenuToggle = document.querySelector('.submenu-toggle');
  if (submenuParent && submenuToggle) {
    submenuToggle.addEventListener('click', (e) => {
      const nowOpen = submenuParent.classList.toggle('open');
      submenuToggle.setAttribute('aria-expanded', String(nowOpen));
      e.stopPropagation();
    });
    document.addEventListener('click', () => {
      submenuParent.classList.remove('open');
      submenuToggle.setAttribute('aria-expanded', 'false');
    });
    submenuParent.addEventListener('click', (e) => e.stopPropagation());
  }

  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (!href || href.length < 2) return;
      const target = document.getElementById(href.slice(1));
      if (!target) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const focusable = target.querySelector('h1, h2, h3, [tabindex]');
      if (focusable) {
        setTimeout(() => focusable.focus?.(), 400);
      }
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const accordions = $$('.accordion');
  accordions.forEach(acc => {
    const allowMultiple = acc.hasAttribute('data-allow-multiple');
    const triggers = $$('.accordion-trigger', acc);
    triggers.forEach(btn => {
      btn.addEventListener('click', () => {
        const panel = btn.nextElementSibling;
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        if (!allowMultiple) {
          triggers.forEach(t => {
            if (t !== btn) {
              t.setAttribute('aria-expanded', 'false');
              const p = t.nextElementSibling;
              if (p) p.hidden = true;
            }
          });
        }
        btn.setAttribute('aria-expanded', String(!expanded));
        if (panel) panel.hidden = expanded;
      });
    });
  });

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Elevate header on scroll
  const header = document.querySelector('.site-header');
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    if (!header) return;
    if (y > 6) header.classList.add('is-scrolled'); else header.classList.remove('is-scrolled');
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll (IntersectionObserver)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -10% 0px' });

    $$('.reveal').forEach(el => io.observe(el));
  } else {
    $$('.reveal').forEach(el => el.classList.add('in'));
  }

  // Load header/footer partials if placeholders exist
  async function injectPartials(){
    const headerHost = document.getElementById('site-header');
    const footerHost = document.getElementById('site-footer');
    try {
      if (headerHost && !headerHost.children.length){
        const res = await fetch('/partials/header.html');
        headerHost.innerHTML = await res.text();
        initNavInteractions();
      }
      if (footerHost && !footerHost.children.length){
        const res = await fetch('/partials/footer.html');
        footerHost.innerHTML = await res.text();
        const yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
      }
    } catch(err) {
      console.error('Partial injection failed', err);
    }
  }

  // Initialize for static pages and then inject if needed
  initNavInteractions();
  injectPartials();
})();


