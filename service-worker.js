self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('ib-static-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/page-transition.css',
        '/js/page-transition.js',
        '/assets/images/logo.png'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== 'ib-static-v1').map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
