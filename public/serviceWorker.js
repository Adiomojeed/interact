const version = 'v1/';
const assetsToCache = [
    '/',
    '/background.eac20b93.jpg',
    '/check.95c69dfe.js',
    '/Index.3b5df515.css',
    '/Index.3b5df515.js',
    '/male.1a9d74b9.png',
    '/logo.6aeba3ef.png',
    '/manifest.webmanifest',
];

self.addEventListener('install', (event) => {
    self.skipWaiting();

    event.waitUntil(
        caches
            .open(version + 'assetsToCache')
            .then((cache) => cache.addAll(assetsToCache))
            .then(() => console.log('assets cached')),
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method === 'GET') {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(event.request);
            }),
        );
    }
});