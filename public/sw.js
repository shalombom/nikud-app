const CACHE_NAME = 'nikud-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/App.jsx',
  '/src/index.css',
  '/video/kamatz.mp4',
  '/video/hirik.mp4',
  '/video/holam.mp4',
  '/video/segol.mp4',
  '/video/shuruk.mp4'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
}); 