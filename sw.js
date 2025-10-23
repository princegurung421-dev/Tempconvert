const CACHE_NAME = 'temperature-converter-v1';
self.addEventListener('install', event => {
    event.waitUntil ((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll([
            '/',
            '/converter.js',
            '/converter.css',
            '/index.html', // Caching index.html directly
            '/manifest.json', // Caching manifest
            '/icon512.png' // Caching icon
        ]);
    })());
});

self.addEventListener('fetch', event => {
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
            return cachedResponse;
        } else {
            try {
                const fetchResponse = await fetch(event.request);
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
            } catch (e) {
                console.error('Fetch failed; returning offline page instead.', e);
            }
        }
    })());
});
