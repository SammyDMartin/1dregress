/* ═══════════════════════════════════════════════════════════════════════════
   Shared Navigation — injected into all pages
   ═══════════════════════════════════════════════════════════════════════════ */
(function() {
  const pages = [
    { href: 'index.html', label: 'HOME' },
    { href: 'stories.html', label: 'STORIES' },
    { href: 'msd.html', label: 'MSD' },
    { href: 'battle.html', label: 'BATTLE' },
    { href: 'science.html', label: 'SCIENCE' },
    { href: 'timeline.html', label: 'TIMELINE' },
    { href: 'codex.html', label: 'CODEX' },
    { href: 'worlds.html', label: 'WORLDS' },
    { href: 'facilitator.html', label: 'FACILITATOR' },
    { href: 'anthropic-trap.html', label: 'TRAP' },
    { href: 'threads.html', label: 'THREADS' },
    { href: 'utilitaria.html', label: 'UTILITARIA' },
    { href: 'utilitaria-chat.html', label: 'EMISSARY' },
    { href: 'orrery.html', label: 'ORRERY' },
    { href: 'ai-analysis.html', label: 'AI ANALYSIS' },
    { href: 'interstice-map.html', label: 'NETWORK' },
    { href: 'reflections.html', label: 'REFLECTIONS' },
    { href: 'drafts.html', label: 'DRAFTS' },
  ];

  const current = location.pathname.split('/').pop() || 'index.html';
  const storyPages = ['reader.html','story.html','seeker-story.html','worlds-within-story.html','headhunted-story.html','inheritor-story.html','oblivion-story.html','sixty-percent-story.html'];

  const nav = document.createElement('nav');
  nav.id = 'site-nav';

  const brand = document.createElement('span');
  brand.className = 'nav-brand';
  brand.innerHTML = '<span class="diamond"></span>ASCENT UNIVERSE';
  nav.appendChild(brand);

  // Theme toggle
  const themeBtn = document.createElement('button');
  themeBtn.className = 'theme-toggle';
  themeBtn.setAttribute('aria-label', 'Toggle light/dark mode');
  const saved = localStorage.getItem('au-theme');
  if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');
  function updateThemeIcon() {
    themeBtn.textContent = document.documentElement.getAttribute('data-theme') === 'light' ? '◐' : '◑';
  }
  updateThemeIcon();
  themeBtn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('au-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('au-theme', 'light');
    }
    updateThemeIcon();
  });
  nav.appendChild(themeBtn);

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
    if (current === p.href || (current === '' && p.href === 'index.html') ||
        (p.href === 'stories.html' && storyPages.includes(current))) {
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
