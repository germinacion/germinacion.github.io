---
layout: null
---

const staticCacheName = "germinacion-static-v2";

console.log("installing service worker");

const filesToCache = [
  "/",
  {% for page in site.html_pages %}
    '{{ page.url }}',
  {% endfor %}
  {% for plantas in site.plantas %}
    '{{ plantas.url }}',
  {% endfor %}
  "/img/back-home.jpg",
  "/img/back-search.jpg",
  "/img/ajenjo.jpg",
  "/img/calendula.jpg",
  "/img/cola-de-caballo.jpg",
  "/img/lavanda.jpg",
  "/img/manzanilla.jpg",
  "/img/menta.jpg",
  "/img/oregano.jpg",
  "/img/romero.jpg",
  "/img/salvia.jpg",
  "/img/sauce.jpg",
  "/img/tomillo.jpg",
  "/img/logo-germinacion.svg",
  "/js/lunr.min.js",
  "/js/lunr.unicodeNormalizer.js",
  "/js/search.js",
  "/style.css",
  "/index.html"
];

self.addEventListener("install", function(e){
  self.skipWaiting();

  e.waitUntil(
    caches.open(staticCacheName).then(function(cache){
      return cache.addAll(filesToCache);
    })
  )
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName.startsWith("germinacion-static-")
            && cacheName != staticCacheName;
        }).map(function(cacheName){
          return caches.delete(cacheName);
        })
      )
    })
  )
});

self.addEventListener("fetch", function(e){
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  )
});