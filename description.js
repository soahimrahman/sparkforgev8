/* ═══════════════════════════════════════════════════
   SparkForge — description.js
   Renders all page content + handles all behaviour.
   HTML is a bare shell — everything lives here.
═══════════════════════════════════════════════════ */

/* ── DATA ──────────────────────────────────────── */

const NAV_LINKS = [
  { href: 'index.html',       label: 'Home' },
  { href: 'description.html', label: 'Description' },
];

const HERO = {
  eyebrow: 'Platform overview',
  headline: 'Paste data.<br><em>Get CRM leads.</em><br>Verify emails.',
  desc: 'SparkForge is two tools in one — a free AI-powered lead extractor and a professional email verifier. No installs, no subscriptions, no nonsense.',
  pills: [
    { dot: 'spark', text: 'SparkForge — Lead extraction' },
    { dot: 'mx',    text: 'Email Verifier — DNS / MX / SMTP' },
  ],
};

const SECTIONS = [
  /* ── Overview ── */
  {
    label: "What's inside",
    heading: 'Two tools, one platform',
    lead: 'Switch between the two workspaces using the tabs at the top of the app. They work independently — use one, the other, or both together.',
    type: 'tool-cards',
    items: [
      {
        cls: 't1', bg: '01', icon: '⚡',
        heading: '01 — SparkForge<br>Lead extractor',
        body: 'Paste raw, messy data in any format — CSV, pipe-separated, plain text, mixed. AI reads it, pulls out every lead, and formats them into a clean CRM-ready table you can export instantly.',
        tag: { cls: 'groq', text: 'Powered by Groq AI' },
      },
      {
        cls: 't2', bg: '02', icon: '◆',
        heading: '02 — Email Verifier<br>DNS / MX / SMTP',
        body: 'Paste one email or a list of thousands. The server checks every address against live DNS records and mail servers, then gives each one a plain verdict: GOOD, DEAD, RISKY, or UNKNOWN.',
        tag: { cls: 'backend', text: 'No AI key needed' },
      },
    ],
  },

  /* ── Lead extractor steps ── */
  {
    label: 'Tool 01 — Lead extractor',
    heading: 'How lead extraction works',
    lead: 'You bring the raw data — scraped text, exported spreadsheets, copy-pasted profiles, anything. SparkForge does the rest.',
    type: 'steps',
    items: [
      {
        heading: 'Paste or upload your data',
        body: 'Use Quick Paste to drop raw text directly into the box, or switch to Agent Mode to upload a file (.txt, .csv, .xlsx, .xls, .tsv). Agent Mode handles large files — 1,000+ rows — automatically split into batches.',
      },
      {
        heading: 'Add your Groq API key',
        body: 'Lead extraction uses the free Groq AI API to understand messy, unstructured data. Get a free key at console.groq.com in under a minute. For large files, you can load multiple keys — they rotate automatically so you never hit a rate limit mid-run.',
      },
      {
        heading: 'AI reads and structures your data',
        body: 'No matter how your data is formatted — pipe-separated, comma-separated, plain sentences, Instagram bios — the AI extracts: name, brand, email, country, phone, username, role, and whether they\'re a decision maker.',
      },
      {
        heading: 'Review results in the table',
        body: 'Every extracted lead appears in a live table as it\'s processed. You can see name, brand, email, country, and more — all in one place.',
      },
      {
        heading: 'Verify emails directly from leads',
        body: 'Once leads are extracted, hit "Verify emails with SMTP" to run the email verifier on every address in your table — no copy-pasting needed. Results come back in the same table.',
      },
      {
        heading: 'Export your clean list',
        body: 'Download the full table as a CSV, or use the split export buttons to download only the good leads or only the bad/dead ones separately.',
      },
    ],
  },

  /* ── Email verifier steps ── */
  {
    label: 'Tool 02 — Email verifier',
    heading: 'How email verification works',
    lead: 'Every address goes through up to six checks. The moment one fails decisively, the address is marked dead and the rest are skipped — keeping things fast.',
    type: 'steps',
    items: [
      {
        heading: 'Format check',
        body: 'Is the address written correctly? Missing @, double dots, local part over 64 characters — all fail immediately. Common typos are also detected: "gmial.com" gets flagged with a suggestion to use "gmail.com".',
      },
      {
        heading: 'Domain existence check',
        body: 'Does the domain (everything after the @) actually exist on the internet? A domain with no DNS records at all can never receive email — it\'s dead.',
      },
      {
        heading: 'Mail server check (MX records)',
        body: 'The domain needs live mail servers set up to receive email. We check that those servers exist and are actually reachable. No working mail servers means the address is dead, even if the domain exists.',
      },
      {
        heading: 'Email security check (SPF, DMARC, DKIM)',
        body: 'Legitimate, maintained domains publish security records. We check for all three. A domain missing all of them is more likely to be abandoned or fake — and emails to it are more likely to land in spam.',
      },
      {
        heading: 'Address type detection',
        body: 'We flag role addresses (info@, support@, noreply@), free email providers (Gmail, Yahoo, Outlook), and known disposable/throwaway email services. These affect your verdict and risk score.',
      },
      {
        heading: 'Live mailbox probe (SMTP) — optional',
        body: 'When SMTP is turned on, we knock directly on the mail server and ask if the specific mailbox exists — without sending any actual email. Some servers refuse the probe by policy. When that happens, we report it honestly rather than guessing dead or alive.',
      },
    ],
  },

  /* ── Verdicts ── */
  {
    label: 'Reading your results',
    heading: 'What the verdicts mean',
    lead: 'Every address gets one of four verdicts. Here\'s what each one means and what to do with it.',
    type: 'verdicts',
    items: [
      { cls: 'good',    chip: '✅ GOOD',             body: 'Passed all checks. The domain has working mail servers, proper security records, and — when SMTP is on — the specific mailbox was confirmed to exist. Safe to send.' },
      { cls: 'dead',    chip: '❌ DEAD',             body: 'Will bounce. The domain doesn\'t exist, has no mail servers, the mailbox was explicitly rejected, or it\'s a disposable address. Remove it from your list.' },
      { cls: 'risky',   chip: '⚠️ RISKY',           body: 'Domain looks real but something is off — it\'s a role address (info@, support@), a free provider, or missing key security records. Use with caution or skip for cold outreach.' },
      { cls: 'unknown', chip: '⚠️ UNKNOWN (catch-all)', body: 'The mail server accepts every address at this domain — real or made up. We can\'t confirm whether this specific mailbox exists. Common on corporate domains.' },
    ],
  },

  /* ── Result details ── */
  {
    label: 'Your data',
    heading: 'What each result includes',
    type: 'checks',
    items: [
      { icon: '🎯', heading: 'Verdict',          body: 'GOOD, DEAD, RISKY, or UNKNOWN — the one thing you need to act on.' },
      { icon: '📊', heading: 'Quality score',    body: '0–100 score combining all signals. Higher = more trustworthy.' },
      { icon: '🏢', heading: 'Mail provider',    body: 'Who handles this domain\'s email — Google Workspace, Microsoft 365, Proton, etc.' },
      { icon: '🛡️', heading: 'SPF / DMARC / DKIM', body: 'Whether the domain\'s three email security records are published and valid.' },
      { icon: '⚠️', heading: 'Risk levels',     body: 'Address risk and domain risk separately, each rated low / medium / high.' },
      { icon: '🏷️', heading: 'Flags',           body: 'Specific notes: "Role account", "No SPF record", "Disposable domain", "Catch-all server".' },
      { icon: '✏️', heading: 'Typo suggestion', body: 'If the domain looks like a misspelling, we suggest the correct one.' },
      { icon: '💬', heading: 'Status detail',   body: 'One plain sentence explaining exactly why the address got its verdict.' },
    ],
  },

  /* ── Caveats ── */
  {
    label: 'Good to know',
    heading: 'Limits and honest notes',
    type: 'caveats',
    items: [
      'Bulk verification handles up to 2,000 emails per submission. For larger lists, split into batches.',
      'SMTP probing can be blocked by some mail servers as a privacy measure. When blocked, you get a clear "policy block" note — not a false DEAD result.',
      'Catch-all domains accept any address at their domain, so even a fake inbox appears to exist. We detect and flag this rather than guessing.',
      'GOOD means the address exists as far as we can tell — it doesn\'t guarantee the person reads it or that your email avoids spam filters.',
      'Lead extraction requires a free Groq API key. Get one at console.groq.com — no credit card needed.',
      'For very large files (1,000+ rows), Agent Mode with multiple API keys is the fastest path. Keys rotate automatically on rate limits.',
      'To protect the server, single checks are limited to 30 per minute and bulk checks to 5 per minute.',
    ],
  },
];

const FOOTER = {
  tagline: 'Free CRM lead extractor &amp; email verifier by SoSpark Design.',
  links: [
    { href: 'mailto:soahimrahman2024@gmail.com',                   label: 'Email' },
    { href: 'https://web.facebook.com/soahim.rahman.tasin17/',     label: 'Facebook', external: true },
    { href: 'https://wa.me/8801632952192',                         label: 'WhatsApp', external: true },
  ],
  copy: '© 2025 SparkForge — SoSpark Design',
};

/* ── RENDER HELPERS ─────────────────────────────── */

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

function logoHTML(iconCls, textCls) {
  return `<div class="${iconCls}">SF</div><span class="${textCls}">Spark<span class="spark">Forge</span></span>`;
}

/* ── HEADER ─────────────────────────────────────── */

function renderHeader() {
  const header = document.getElementById('site-header');

  /* Logo */
  const logoLink = el('a', 'logo-link', logoHTML('logo-icon', 'logo-text'));
  logoLink.href = 'index.html';
  logoLink.setAttribute('aria-label', 'SparkForge — go to home');

  /* Nav */
  const nav = el('nav', 'header-nav');
  const currentFile = location.pathname.split('/').pop() || 'index.html';
  NAV_LINKS.forEach(({ href, label }) => {
    const a = el('a', 'nav-btn', label);
    a.href = href;
    const active = href === currentFile || href.endsWith(currentFile);
    a.classList.add(active ? 'active' : 'inactive');
    nav.appendChild(a);
  });

  /* Profile */
  const right = el('div', 'header-right');
  right.innerHTML = `
    <div class="profile-meta">
      <div class="profile-name" id="profileName">Guest</div>
      <div class="profile-role" id="profileRole">Not signed in</div>
    </div>
    <div class="profile-avatar" id="profileAvatar">
      <span class="avatar-placeholder" id="avatarPlaceholder">?</span>
    </div>`;

  header.append(logoLink, nav, right);
}

/* ── HERO ───────────────────────────────────────── */

function renderHero(parent) {
  const hero = el('div', 'hero');
  const inner = el('div', 'container hero-inner');

  /* eyebrow */
  const eyebrow = el('div', 'eyebrow hero-animate',
    `<span class="eyebrow-dot"></span>${HERO.eyebrow}`);

  /* h1 */
  const h1 = el('h1', 'hero-animate', HERO.headline);

  /* desc */
  const desc = el('p', 'hero-desc hero-animate', HERO.desc);

  /* pills */
  const pills = el('div', 'tool-pills hero-animate');
  HERO.pills.forEach(({ dot, text }) => {
    pills.appendChild(el('span', 'pill', `<span class="dot ${dot}"></span>${text}`));
  });

  inner.append(eyebrow, h1, desc, pills);

  /* watermark */
  const wm = el('div', 'hero-wm', 'SPARKFORGE');
  wm.setAttribute('aria-hidden', 'true');

  hero.append(inner, wm);
  parent.appendChild(hero);
}

/* ── SECTION CONTENT BUILDERS ───────────────────── */

function buildToolCards(items) {
  const wrap = el('div', 'tool-cards stagger');
  items.forEach(item => {
    const card = el('div', `tool-card ${item.cls}`);
    card.innerHTML = `
      <div class="tool-card-bg">${item.bg}</div>
      <div class="tool-icon">${item.icon}</div>
      <h3>${item.heading}</h3>
      <p>${item.body}</p>
      <span class="tool-tag ${item.tag.cls}">${item.tag.text}</span>`;
    wrap.appendChild(card);
  });
  return wrap;
}

function buildSteps(items) {
  const wrap = el('div', 'steps stagger');
  items.forEach((item, i) => {
    const step = el('div', 'step');
    step.innerHTML = `
      <div class="step-num-wrap"><div class="step-num">${i + 1}</div></div>
      <div><h3>${item.heading}</h3><p>${item.body}</p></div>`;
    wrap.appendChild(step);
  });
  return wrap;
}

function buildVerdicts(items) {
  const wrap = el('div', 'verdict-grid stagger');
  items.forEach(item => {
    const row = el('div', 'vrow');
    row.innerHTML = `<span class="vchip ${item.cls}">${item.chip}</span><p>${item.body}</p>`;
    wrap.appendChild(row);
  });
  return wrap;
}

function buildChecks(items) {
  const wrap = el('div', 'checks-grid stagger');
  items.forEach(item => {
    const card = el('div', 'check-card');
    card.innerHTML = `
      <div class="check-icon">${item.icon}</div>
      <h4>${item.heading}</h4>
      <p>${item.body}</p>`;
    wrap.appendChild(card);
  });
  return wrap;
}

function buildCaveats(items) {
  const list = el('ul', 'caveats stagger');
  items.forEach(text => {
    list.appendChild(el('li', '', text));
  });
  return list;
}

/* ── SECTIONS ───────────────────────────────────── */

function renderSections(parent) {
  SECTIONS.forEach(sec => {
    const section = el('section');
    const container = el('div', 'container');

    container.appendChild(el('div', 'section-label reveal', sec.label));
    container.appendChild(el('h2', 'reveal', sec.heading));
    if (sec.lead) container.appendChild(el('p', 'lead-p reveal', sec.lead));

    const builders = {
      'tool-cards': buildToolCards,
      'steps':      buildSteps,
      'verdicts':   buildVerdicts,
      'checks':     buildChecks,
      'caveats':    buildCaveats,
    };
    if (builders[sec.type]) {
      container.appendChild(builders[sec.type](sec.items));
    }

    section.appendChild(container);
    parent.appendChild(section);
  });
}

/* ── FOOTER ─────────────────────────────────────── */

function renderFooter(parent) {
  const footer = document.createElement('footer');

  const inner = el('div', 'footer-inner');

  /* Brand */
  const brand = el('div', 'footer-brand');
  const logoLink = el('a', 'footer-logo-link', logoHTML('footer-logo-icon', 'footer-logo-text'));
  logoLink.href = 'index.html';
  logoLink.setAttribute('aria-label', 'SparkForge — home');
  const tagline = el('p', 'footer-tagline', FOOTER.tagline);
  brand.append(logoLink, tagline);

  /* Links */
  const links = el('div', 'footer-links');
  const row = el('div', 'footer-links-row');
  FOOTER.links.forEach(({ href, label, external }) => {
    const a = el('a', '', label);
    a.href = href;
    if (external) { a.target = '_blank'; a.rel = 'noopener'; }
    row.appendChild(a);
  });
  links.appendChild(row);

  inner.append(brand, links);

  /* Copyright */
  const copy = el('div', 'footer-copy', `<span>${FOOTER.copy}</span>`);

  footer.append(inner, copy);
  parent.appendChild(footer);
}

/* ── BEHAVIOUR ──────────────────────────────────── */

function initScrollEffects() {
  /* Header darken */
  const header = document.getElementById('site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Reveal / stagger on scroll */
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .stagger').forEach(el => obs.observe(el));

  /* Hero watermark parallax */
  const wm = document.querySelector('.hero-wm');
  if (wm) {
    window.addEventListener('scroll', () => {
      wm.style.transform = `translateY(${window.scrollY * 0.14}px)`;
    }, { passive: true });
  }
}

/* ── PROFILE API ────────────────────────────────── */

/**
 * Call this from your backend after auth:
 *   window.setProfile("Soahim Rahman", "Admin", "/img/avatar.jpg");
 */
window.setProfile = (name, role, avatarUrl) => {
  const nameEl   = document.getElementById('profileName');
  const roleEl   = document.getElementById('profileRole');
  const avatarEl = document.getElementById('profileAvatar');
  if (nameEl  && name)      nameEl.textContent  = name;
  if (roleEl  && role)      roleEl.textContent  = role;
  if (avatarEl && avatarUrl) {
    avatarEl.innerHTML = `<img src="${avatarUrl}" alt="${name || 'Profile'}">`;
  }
};

/* ── BOOT ───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  const body = document.getElementById('page-body');

  renderHeader();
  renderHero(body);
  renderSections(body);
  renderFooter(body);
  initScrollEffects();
});
