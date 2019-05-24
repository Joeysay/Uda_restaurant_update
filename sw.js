
var staticCacheName = 'restaurant_v2';
var urlTOCache = [
  '/',
  '/restaurant.html',
  '/css/styles.css',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/js/dbhelper.js',
  '/js/sw_control.js',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
];

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
          return cacheName.startsWith('restaurant_') &&
          cacheName != staticCacheName;
        }).map(function (cacheName) {
          return cache.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  const requestUrl = new URL(event.request.url);

    // only highjack request made to our app (not mapbox maps or leaflet, for example)
    if (requestUrl.origin === location.origin) {
      // Since requests made to restaurant.html have search params (like ?id=1), the url can't be used as the
      // key to access the cache, so just respondWith restaurant.html if pathname startsWith '/restaurant.html'
      if (requestUrl.pathname.startsWith('/restaurant.html')) {
        event.respondWith(caches.match('/restaurant.html'));
        return; // Done handling request, so exit early.
      }
    }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
