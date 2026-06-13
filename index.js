/* ── DATA ── */
const NAV_LINKS = [
  { href: 'index.html',       label: 'Home' },
  { href: 'description.html', label: 'Description' },
];

/* ── HELPERS ── */
function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

function logoHTML(iconCls, textCls) {
  return `<div class="${iconCls}">SF</div><span class="${textCls}">Spark<span class="spark">Forge</span></span>`;
}

/* ── HEADER ── */
function renderHeader() {
  const header = document.getElementById('site-header');

  const logoLink = el('a', 'logo-link', logoHTML('logo-icon', 'logo-text'));
  logoLink.href = 'index.html';
  logoLink.setAttribute('aria-label', 'SparkForge — go to home');

  const nav = el('nav', 'header-nav');
  const currentFile = location.pathname.split('/').pop() || 'index.html';
  NAV_LINKS.forEach(({ href, label }) => {
    const a = el('a', 'nav-btn', label);
    a.href = href;
    const active = href === currentFile || href.endsWith(currentFile);
    a.classList.add(active ? 'active' : 'inactive');
    nav.appendChild(a);
  });

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

/* ── SCROLL EFFECT ── */
function initScrollEffects() {
  const header = document.getElementById('site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── PROFILE API ── */
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

/* ── BOOT ── */
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  initScrollEffects();
});