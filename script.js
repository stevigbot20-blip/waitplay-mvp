const track = (eventName, payload = {}) => {
  const data = { eventName, ts: new Date().toISOString(), ...payload };
  console.log('[waitplay:event]', data);
};

const apps = [
  {
    id: 'easy-mini-app',
    title: '🪧 Sign Sprint',
    description: 'Plant as many yard signs as you can before time runs out!',
    url: './apps/easy-mini-app/',
    exists: true
  },
  {
    id: 'better-mini-game',
    title: '🎯 Whack-a-Lead',
    description: 'Tap the hot leads before they bounce. Build combos for multipliers!',
    url: './apps/better-mini-game/',
    exists: true
  },
  {
    id: 'memory-match',
    title: '🧠 Listing Match',
    description: 'Match every house with its buyer in the fewest moves.',
    url: './apps/memory-match/',
    exists: true
  },
  {
    id: 'reaction-test',
    title: '⚡ Offer Alert',
    description: 'An offer just dropped — accept it before it\'s gone. Best of 5!',
    url: './apps/reaction-test/',
    exists: true
  },
  {
    id: 'snake',
    title: '🐍 Key Collector',
    description: 'Steer the agent, grab every key, don\'t hit the fence!',
    url: './apps/snake/',
    exists: true
  },
  {
    id: 'simon-says',
    title: '🚪 Showing Day',
    description: 'Watch the showing route, then repeat it door for door.',
    url: './apps/simon-says/',
    exists: true,
    comingSoon: true
  },
  {
    id: 'number-rush',
    title: '💰 Commission Rush',
    description: '30 seconds of quick commission math. Close every deal.',
    url: './apps/number-rush/',
    exists: true,
    comingSoon: true
  },
  {
    id: 'color-match',
    title: '🔎 House Hunt',
    description: 'One house doesn\'t match the listing photos. Spot it fast.',
    url: './apps/color-match/',
    exists: true,
    comingSoon: true
  }
];

function renderApps() {
  const grid = document.getElementById('apps-grid');
  if (!grid) return;

  grid.innerHTML = apps.map(app => `
    <article class="app-card">
      <span class="badge ${app.comingSoon ? 'muted' : 'ok'}">${app.comingSoon ? 'Coming soon' : 'Available'}</span>
      <h3>${app.title}</h3>
      <p>${app.description}</p>
      ${app.comingSoon
        ? `<button class="btn" disabled>Coming soon</button>`
        : `<a class="btn" href="${app.url}" data-track="open_app_${app.id}">Open app</a>`}
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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
      msg.textContent = 'Please enter a valid email address.';
      track('email_submit_invalid', { emailLength: email.length });
      return;
    }

    msg.textContent = 'Submitting…';

    try {
      const res = await fetch('https://formsubmit.co/ajax/stevigbot2.0@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          _subject: 'WaitPlay newsletter signup',
          email,
          source: 'waitplay-mvp'
        })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      msg.textContent = 'Subscribed. Thank you!';
      input.value = '';
      track('email_submit_success', { emailDomain: email.split('@')[1] || '' });
    } catch (err) {
      msg.textContent = 'Submit failed. Try again in a moment.';
      track('email_submit_error', { error: String(err) });
    }
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
