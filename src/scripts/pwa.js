/**
 * Foodie Fit PWA Registration & Install Prompt Handler
 */

let deferredPrompt = null;

export function initPWA() {
  // 1. Register Service Worker safely
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          console.log('Foodie Fit PWA Service Worker Registered:', reg.scope);
        })
        .catch((err) => {
          console.warn('Foodie Fit PWA Service Worker Registration Failed:', err);
        });
    });
  }

  // 2. Capture beforeinstallprompt for custom install banner
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    showInstallBanner();
  });
}

function showInstallBanner() {
  if (sessionStorage.getItem('pwa_banner_dismissed') === 'true') return;

  let banner = document.getElementById('pwa-install-banner');
  if (banner) return;

  banner = document.createElement('div');
  banner.id = 'pwa-install-banner';
  banner.className = 'fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-slate-900 text-white border-2 border-brand-500 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4 transition-all duration-300 transform translate-y-4 opacity-0';

  banner.innerHTML = `
    <div class="flex items-center gap-3">
      <img src="/images/foodiefit-logo.png" alt="Foodie Fit" class="h-10 w-auto object-contain" />
      <div>
        <h4 class="font-display font-bold text-xs uppercase text-white">Install Foodie Fit App</h4>
        <p class="text-[10px] text-slate-400">Faster ordering & offline meal planning</p>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <button id="pwa-install-btn" type="button" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white transition-colors cursor-pointer">
        Install
      </button>
      <button id="pwa-dismiss-btn" type="button" class="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer" aria-label="Dismiss">
        ✕
      </button>
    </div>
  `;

  document.body.appendChild(banner);

  setTimeout(() => {
    banner.classList.remove('translate-y-4', 'opacity-0');
  }, 100);

  document.getElementById('pwa-install-btn')?.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`PWA install prompt outcome: ${outcome}`);
    deferredPrompt = null;
    banner.remove();
  });

  document.getElementById('pwa-dismiss-btn')?.addEventListener('click', () => {
    sessionStorage.setItem('pwa_banner_dismissed', 'true');
    banner.remove();
  });
}

initPWA();
document.addEventListener('astro:after-swap', initPWA);
