importScripts('/assets/js/serviceworker-cache-polyfill.js');

var CACHE_VERSION = '3';
var CACHE_NAME = 'memelopers-cache-v'+CACHE_VERSION;

var urlsToCache = [
  '/',
  '/app.min.js',
  '/assets/css/main.min.css',
  '/assets/fonts/FontAwesome.otf'
];
// Set the callback for the install step
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
		    console.log('Opened cache');
		    return cache.addAll(urlsToCache);
		})
	);
});
self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			// Cache hit - return response
			if (response) {
				console.log('serving cached file');
				console.log(response);
				return response;
			}
			var fetchRequest = event.request.clone();
			return fetch(fetchRequest).then(function(response) {
				// Check if we received a valid response
				if(!response || response.status !== 200 || response.type !== 'basic') {
					console.log('bad response');
					console.log(response);
					return response;
				}

				// IMPORTANT: Clone the response. A response is a stream
				// and because we want the browser to consume the response
				// as well as the cache consuming the response, we need
				// to clone it so we have 2 stream.
				var responseToCache = response.clone();
				caches.open(CACHE_NAME).then(function(cache) {
					console.log('caching file');
					console.log(responseToCache);
					cache.put(event.request, responseToCache);
				});
				return response;
			});
		})
	);
});