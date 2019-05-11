var staticCacheName = 'restaurant_v1';
var urlTOCache = [
  '../../',
  '../../restaurant.html',
  '../../css/style.css',
  '../../data/restaurant.json',
  '../../img/1.jpg',
  '../../img/2.jpg',
  '../../img/3.jpg',
  '../../img/4.jpg',
  '../../img/5.jpg',
  '../../img/6.jpg',
  '../../img/7.jpg',
  '../../img/8.jpg',
  '../../img/9.jpg',
  '../../img/10.jpg',
  '../../js/main.js',
  '../../js/restaurant_info.js',
  '../../js/dbhelper.js',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll(urlTOCache);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    // Get all the cache names exists, remove the old cache
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('restuarant_') &&
          cacheName != staticCacheName;
        }).map(function (cacheName) {
          return cache.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
