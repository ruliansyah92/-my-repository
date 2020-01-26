const CACHE_NAME = 'firstpwa-v4';
var urlsToCache = [
	'/',
	'/nav.html',
	'/index.html',
	'/pages/home.html',
	'/pages/fixture.html',
	'/pages/standing.html',
	'/pages/statistic.html',
	'/pages/admin.html',
	'/css/materialize.min.css',
	'/img/iniGambar2.png',
	'/img/khg.jpg',
	'/js/materialize.min.js',
	'/js/script.js',
	'/push.js',
	'/js/idb.js',
	'/js/db-controller.js',
];

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function (cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys()
		.then(function (cacheNames) {
			return Promise.all(
				cacheNames.map(function (cacheName) {
					if (cacheName != CACHE_NAME) {
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request, {
			cacheName: CACHE_NAME
		})
		.then(function (response) {
			if (response) {
				console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
				return response;
			}

			console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
			return fetch(event.request);
		})
	);
});