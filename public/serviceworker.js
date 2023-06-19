const CACHE_NAME = "version1";
const urls = ["index.html", "/static/js/main.chunk.js", "/static/js/0.chunk.js", "/static/js/bundle.js", "/", "/styles.css",];

const self = this;
let deferredPrompt;

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("opened cache");
                return cache.addAll(urls);
            })
    )
})

self.addEventListener("fetch", (event) => {
    if (!navigator.onLine) {
        event.respondWith(
            caches.match(event.request).then((resp) => {
                if (resp) {
                    return resp;
                }
            })
        )
    }
})

self.addEventListener("activate", (event) => {
    const requiredCache = [];
    requiredCache.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!requiredCache.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    )
})
