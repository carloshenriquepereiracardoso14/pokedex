const CACHE_NAME = "pokedex-cache-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./css/style.css",
  "./script.js",
  "./manifest.json",
  "./img/icon-192.png",
  "./img/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting(); // ativa imediatamente após instalar
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim(); // assume controle das tabs abertas imediatamente
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        // Atualiza o cache em segundo plano
        fetch(event.request).then((networkResponse) => {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
        });
        return response;
      }
      return fetch(event.request).catch(() =>
        caches.match("./offline.html") // ou alguma página de fallback
      );
    })
  );
});