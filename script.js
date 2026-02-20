const track = (eventName, payload = {}) => {
  const data = { eventName, ts: new Date().toISOString(), ...payload };
  console.log('[waitplay:event]', data);
};

const apps = [
  {
    id: 'easy-mini-app',
    title: 'Easy Mini App',
    description: 'Quick, lightweight mini app experience.',
    url: './apps/easy-mini-app/',
    exists: Boolean(window.WAITPLAY_APP_FLAGS?.easyMiniAppExists)
  },
  {
    id: 'better-mini-game',
    title: 'Better Mini Game',
    description: 'A richer mini-game for longer wait sessions.',
    url: './apps/better-mini-game/',
    exists: Boolean(window.WAITPLAY_APP_FLAGS?.betterMiniGameExists)
  }
];

function renderApps() {
  const grid = document.getElementById('apps-grid');
  if (!grid) return;

  grid.innerHTML = apps.map(app => `
    <article class="app-card">
      <span class="badge ${app.exists ? 'ok' : 'muted'}">${app.exists ? 'Available' : 'Not found locally'}</span>
      <h3>${app.title}</h3>
      <p>${app.description}</p>
      ${app.exists
        ? `<a class="btn" href="${app.url}" data-track="open_app_${app.id}">Open app</a>`
        : `<button class="btn" disabled>Missing app</button>`}
    </article>
  `).join('');
}

function bindTracking() {
  document.body.addEventListener('click', (e) => {
    const target = e.target.closest('[data-track]');
    if (!target) return;
    track(target.getAttribute('data-track'), {
      text: target.textContent?.trim() || ''
    });
  });
}

function bindEmailCapture() {
  const form = document.getElementById('emailForm');
  const msg = document.getElementById('formMsg');
  const input = document.getElementById('email');

  if (!form || !msg || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
      msg.textContent = 'Please enter a valid email address.';
      track('email_submit_invalid', { emailLength: email.length });
      return;
    }

    const subject = encodeURIComponent('WaitPlay newsletter signup');
    const body = encodeURIComponent(`Please add me to WaitPlay updates: ${email}`);
    window.location.href = `mailto:stevigbot2.0@gmail.com?subject=${subject}&body=${body}`;
    msg.textContent = 'Opened your mail app to confirm subscription.';
    track('email_submit_mailto_opened', { emailDomain: email.split('@')[1] || '' });
  });
}

function init() {
  renderApps();
  bindTracking();
  bindEmailCapture();
  document.getElementById('year').textContent = String(new Date().getFullYear());
  track('page_view', { page: 'home' });
}

document.addEventListener('DOMContentLoaded', init);
