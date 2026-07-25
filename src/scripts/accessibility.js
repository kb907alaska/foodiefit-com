/**
 * Foodie Fit WCAG 2.2 AA Accessibility Engine
 * Framework-free, lightweight vanilla JS accessibility manager
 */

const STORAGE_KEY = 'siteAccessibilitySettings';

export class AccessibilityManager {
  constructor() {
    this.panel = document.getElementById('a11y-panel');
    this.overlay = document.getElementById('a11y-overlay');
    this.trigger = document.getElementById('a11y-floating-trigger');
    this.closeBtn = document.getElementById('a11y-close-btn');
    this.resetBtn = document.getElementById('a11y-reset-btn');
    this.controlBtns = document.querySelectorAll('.a11y-control-btn');

    this.activeSettings = new Set();
    this.previouslyFocusedElement = null;

    this.init();
  }

  init() {
    if (!this.panel || !this.trigger) return;

    this.loadSavedSettings();
    this.bindEvents();
  }

  loadSavedSettings() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const settings = JSON.parse(saved);
        if (Array.isArray(settings)) {
          settings.forEach(setting => this.applySetting(setting, false));
        }
      }
    } catch (e) {
      console.warn('Could not read accessibility settings from localStorage:', e);
    }
  }

  saveSettings() {
    try {
      const arr = Array.from(this.activeSettings);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch (e) {
      console.warn('Could not save accessibility settings to localStorage:', e);
    }
  }

  bindEvents() {
    this.trigger.addEventListener('click', () => this.togglePanel());
    if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.closePanel());
    if (this.overlay) this.overlay.addEventListener('click', () => this.closePanel());
    if (this.resetBtn) this.resetBtn.addEventListener('click', () => this.resetSettings());

    this.controlBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const setting = e.currentTarget.getAttribute('data-a11y-target');
        if (setting) {
          this.toggleSetting(setting, e.currentTarget);
        }
      });
    });

    // Keyboard Listeners
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isPanelOpen()) {
        this.closePanel();
      }
    });

    if (this.panel) {
      this.panel.addEventListener('keydown', (e) => this.trapFocus(e));
    }
  }

  isPanelOpen() {
    return this.panel?.classList.contains('is-open') || false;
  }

  togglePanel() {
    if (this.isPanelOpen()) {
      this.closePanel();
    } else {
      this.openPanel();
    }
  }

  openPanel() {
    this.previouslyFocusedElement = document.activeElement;

    this.panel?.classList.add('is-open');
    this.panel?.removeAttribute('aria-hidden');
    this.overlay?.classList.add('is-active');

    this.trigger?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Move focus inside panel
    setTimeout(() => {
      this.closeBtn?.focus();
    }, 50);
  }

  closePanel() {
    this.panel?.classList.remove('is-open');
    this.panel?.setAttribute('aria-hidden', 'true');
    this.overlay?.classList.remove('is-active');

    this.trigger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    // Restore focus to floating trigger button
    if (this.previouslyFocusedElement && typeof this.previouslyFocusedElement.focus === 'function') {
      this.previouslyFocusedElement.focus();
    } else {
      this.trigger?.focus();
    }
  }

  toggleSetting(setting, buttonEl) {
    if (setting === 'a11y-text-lg') {
      this.removeSetting('a11y-text-sm');
    } else if (setting === 'a11y-text-sm') {
      this.removeSetting('a11y-text-lg');
    }

    if (this.activeSettings.has(setting)) {
      this.removeSetting(setting, buttonEl);
    } else {
      this.applySetting(setting, true, buttonEl);
    }
  }

  applySetting(setting, save = true, buttonEl = null) {
    this.activeSettings.add(setting);
    document.documentElement.classList.add(setting);

    const btn = buttonEl || document.querySelector(`[data-a11y-target="${setting}"]`);
    if (btn) {
      btn.setAttribute('aria-pressed', 'true');
      btn.classList.add('is-active');
    }

    if (save) this.saveSettings();
  }

  removeSetting(setting, buttonEl = null) {
    this.activeSettings.delete(setting);
    document.documentElement.classList.remove(setting);

    const btn = buttonEl || document.querySelector(`[data-a11y-target="${setting}"]`);
    if (btn) {
      btn.setAttribute('aria-pressed', 'false');
      btn.classList.remove('is-active');
    }

    this.saveSettings();
  }

  resetSettings() {
    this.activeSettings.forEach(setting => {
      document.documentElement.classList.remove(setting);
    });
    this.activeSettings.clear();

    this.controlBtns.forEach(btn => {
      btn.setAttribute('aria-pressed', 'false');
      btn.classList.remove('is-active');
    });

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Could not clear accessibility settings:', e);
    }
  }

  trapFocus(e) {
    if (e.key !== 'Tab' || !this.isPanelOpen()) return;

    const focusables = this.panel.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

// Auto-initialize on load and route changes
let a11yManager = null;
function initA11y() {
  a11yManager = new AccessibilityManager();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initA11y);
} else {
  initA11y();
}

document.addEventListener('astro:after-swap', initA11y);
