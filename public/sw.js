/**
 * Foodie Fit High-Performance Progressive Web App Service Worker
 */

const CACHE_NAME = 'foodiefit-pwa-v1';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/offline.html',
  '/images/foodiefit-logo.png',
  '/images/meals/korean-steak.jpg',
  '/images/meals/impossible-dumplings.jpg',
  '/images/meals/red-velvet-pancakes.jpg'
];

// 1. Install Event: Cache Core Static Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// 2. Activate Event: Clean Old Cache Releases
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Fetch Event: Network-First for Navigation, Cache-First for Static Assets
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Ignore non-GET requests or browser extensions
  if (req.method !== 'GET' || !url.protocol.startsWith('http')) return;

  // Navigation requests (HTML pages) -> Network First with Offline Fallback
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => {
        return caches.match(req).then((cached) => {
          return cached || caches.match('/offline.html');
        });
      })
    );
    return;
  }

  // Static Assets (Images, CSS, JS, Fonts) -> Cache First
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      return fetch(req).then((networkRes) => {
        if (networkRes && networkRes.status === 200 && networkRes.type === 'basic') {
          const resClone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, resClone);
          });
        }
        return networkRes;
      }).catch(() => {
        if (req.headers.get('accept')?.includes('image')) {
          return caches.match('/images/foodiefit-logo.png');
        }
      });
    })
  );
});
