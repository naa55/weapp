const staticCacheName = "site-static";
const dynamicCache = "site-dynamic-v2";

const assets = [
  "/",
  "/server.js",
  "/index.html",
  "/images/weather.png",
  "/style.css",
  "/offline.html",
];

self.addEventListener("install", (event) => {
  console.log("Service worker installing...");
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell");
      cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(event.request).then((fetchRes) => {
            return caches.open(dynamicCache).then((cache) => {
              cache.put(event.request.url, fetchRes.clone());
              return fetchRes;
            });
          })
        );
      })
      .catch(() => caches.match("/offline.html"))
  );
});
