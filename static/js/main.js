// ====================================================
// Faire project page — interactions
// ====================================================

(function () {
  'use strict';

  // --- BibTeX copy ---
  const bibBlock   = document.getElementById('bibtex-block');
  const bibBtn     = document.getElementById('copy-bibtex');
  const heroBibBtn = document.getElementById('copy-bibtex-hero');
  const toast      = document.getElementById('toast');

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('is-visible'), 1800);
  }

  async function copyBibtex(triggerBtn) {
    if (!bibBlock) return;
    const text = bibBlock.innerText.trim();
    try {
      await navigator.clipboard.writeText(text);
      showToast('BibTeX copied to clipboard ✓');
      if (triggerBtn) {
        triggerBtn.classList.add('copied');
        const span = triggerBtn.querySelector('span');
        const orig = span ? span.textContent : null;
        if (span) span.textContent = 'Copied';
        setTimeout(() => {
          triggerBtn.classList.remove('copied');
          if (span && orig) span.textContent = orig;
        }, 1600);
      }
    } catch (err) {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); showToast('BibTeX copied to clipboard ✓'); }
      catch (e) { showToast('Press Ctrl/Cmd + C to copy'); }
      document.body.removeChild(ta);
    }
  }

  if (bibBtn)     bibBtn.addEventListener('click', () => copyBibtex(bibBtn));
  if (heroBibBtn) heroBibBtn.addEventListener('click', () => copyBibtex(heroBibBtn));

  // --- Lightbox ---
  const lb        = document.getElementById('lightbox');
  const lbImg     = lb ? lb.querySelector('.lightbox-img') : null;
  const lbCap     = lb ? lb.querySelector('.lightbox-caption') : null;
  const lbClose   = lb ? lb.querySelector('.lightbox-close') : null;
  const tiles     = document.querySelectorAll('.demo-tile');

  function openLB(src, caption) {
    if (!lb) return;
    lbImg.src = src;
    lbImg.alt = caption || '';
    lbCap.textContent = caption || '';
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLB() {
    if (!lb) return;
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const src = tile.dataset.src || tile.querySelector('img').src;
      const cap = tile.dataset.caption || '';
      openLB(src, cap);
    });
  });

  if (lb) {
    lb.addEventListener('click', (e) => {
      if (e.target === lb || e.target === lbImg) {
        // Allow clicking image background to close (but not the image itself unless it's the bg)
        if (e.target === lb) closeLB();
      }
    });
  }
  if (lbClose) lbClose.addEventListener('click', closeLB);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLB();
  });

  // --- Smooth scroll w/ sticky-nav offset ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = document.querySelector('.topnav')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
      window.scrollTo({ top, behavior: 'smooth' });
      history.replaceState(null, '', id);
    });
  });

  // --- Reveal-on-scroll (subtle) ---
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(ent => {
        if (ent.isIntersecting) {
          ent.target.style.opacity = '1';
          ent.target.style.transform = 'translateY(0)';
          io.unobserve(ent.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.figure, .tldr-card, .card, .paradox-col, .result-card, .demo-tile, .claims-list li').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity .55s ease, transform .55s ease';
      io.observe(el);
    });
  }
})();
