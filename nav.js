/* ═══════════════════════════════════════════════════════════════════════════
   Shared Navigation — injected into all pages
   ═══════════════════════════════════════════════════════════════════════════ */
(function() {
  const pages = [
    { href: 'index.html', label: 'HOME' },
    { href: 'msd.html', label: 'MSD' },
    { href: 'battle.html', label: 'BATTLE' },
    { href: 'story.html', label: 'THRESHOLD' },
    { href: 'seeker-story.html', label: 'SEEKER' },
    { href: 'science.html', label: 'SCIENCE' },
    { href: 'timeline.html', label: 'TIMELINE' },
    { href: 'codex.html', label: 'CODEX' },
    { href: 'worlds.html', label: 'WORLDS' },
  ];

  const current = location.pathname.split('/').pop() || 'index.html';

  const nav = document.createElement('nav');
  nav.id = 'site-nav';

  const brand = document.createElement('span');
  brand.className = 'nav-brand';
  brand.innerHTML = '<span class="diamond"></span>ASCENT UNIVERSE';
  nav.appendChild(brand);

  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger';
  hamburger.textContent = '≡';
  hamburger.setAttribute('aria-label', 'Menu');
  hamburger.addEventListener('click', () => {
    links.classList.toggle('open');
  });
  nav.appendChild(hamburger);

  const links = document.createElement('div');
  links.className = 'nav-links';
  pages.forEach(p => {
    const a = document.createElement('a');
    a.href = p.href;
    a.textContent = p.label;
    if (current === p.href || (current === '' && p.href === 'index.html')) {
      a.className = 'active';
    }
    a.addEventListener('click', () => links.classList.remove('open'));
    links.appendChild(a);
  });
  nav.appendChild(links);

  // Inject scanlines
  const scan = document.createElement('div');
  scan.className = 'scanlines';

  // Inject status bar
  const bar = document.createElement('div');
  bar.className = 'status-bar';
  bar.innerHTML = '<span class="dim">ARCO INTERSTELLAR AGENCY</span><span class="bright" id="nav-clock"></span><span class="dim">CLEARANCE: DELTA</span>';

  document.addEventListener('DOMContentLoaded', () => {
    document.body.prepend(nav);
    document.body.appendChild(scan);
    document.body.appendChild(bar);

    // Clock
    function tick() {
      const el = document.getElementById('nav-clock');
      if (!el) return;
      const now = new Date();
      const yr = now.getFullYear() + 750;
      const p = n => String(n).padStart(2, '0');
      el.textContent = `${yr}.${p(now.getMonth()+1)}.${p(now.getDate())} ${p(now.getHours())}:${p(now.getMinutes())}:${p(now.getSeconds())} UST`;
    }
    tick();
    setInterval(tick, 1000);
  });
})();
