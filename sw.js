/* Service worker — Ingeniería Dennis / Programa iDeas */

const CACHE_NAME = "dennis-portafolio-v7";

const PRECACHE = [
  "./",
  "./offline.html",
  "./css/styles.css",
  "./css/fonts.css",
  "./js/main.js",
  "./manifest.webmanifest",
  "./favicon.ico",
  "./assets/logo-full-white.png",
  "./assets/logo-mark-white.svg",
  "./assets/logo-mark-blue.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/icon-maskable-512.png",
  "./assets/apple-touch-icon.png",
  "./assets/favicon-64.png",
  "./assets/fonts/archivo-latin.woff2",
  "./assets/fonts/archivo-latin-ext.woff2",
  "./assets/fonts/instrument-sans-latin.woff2",
  "./assets/fonts/instrument-sans-latin-ext.woff2",
  "./assets/fonts/ibm-plex-mono-400-latin.woff2",
  "./assets/fonts/ibm-plex-mono-400-latin-ext.woff2",
  "./assets/fonts/ibm-plex-mono-500-latin.woff2",
  "./assets/fonts/ibm-plex-mono-500-latin-ext.woff2",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith("/sw.js")) return;

  // Navegación: red primero, con respaldo en caché y página offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => {
          const cached =
            (await caches.match(request, { ignoreSearch: true })) ||
            (await caches.match("./")) ||
            (await caches.match("./offline.html"));

          return cached || Response.error();
        })
    );
    return;
  }

  // Recursos estáticos: caché primero y actualización en segundo plano.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === "basic") {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(
          () =>
            new Response("Recurso no disponible sin conexión.", {
              status: 503,
              headers: { "Content-Type": "text/plain; charset=utf-8" },
            })
        );

      return cached || network;
    })
  );
});
