const CACHE_NAME = "bogor-cache";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/sejarah.html",
    "/pages/wisata.html",
    "/pages/kuliner.html",
    "/assets/style/css/materialize.css",
    "/assets/style/css/style.css",
    "/assets/style/css/materialize.min.css",
    "/assets/images/icon-navbar.jpg",
    "/assets/images/icon-512x512.png",
    "/assets/images/kebun-raya.jpeg",
    "/assets/images/Lambang_Kabupaten_Bogor.png",
    "/assets/images/lap-sempur.jpg",
    "/assets/images/tugu-kujang.jpg",
    "/assets/images/kuliner.png",
    "/assets/images/istana-bogor.jpg",
    "/assets/images/gunung-bunder.jpeg",
    "/assets/images/gunung-gede.jpg",
    "/assets/images/soto-bogor.jpeg",
    "/assets/images/toge-goreng.jpg",
    "/assets/images/logo_big.png",
    "/assets/images/logo_small.png",
    "/assets/images/asinan-bogor.jpg",
    "/assets/js/materialize.min.js",
    "/assets/js/nav.js"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function (response) {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log(
                    "ServiceWorker: Memuat aset dari server: ",
                    event.request.url
                );
                return fetch(event.request);
            })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
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
});


