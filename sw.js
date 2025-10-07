// Service Worker for Travel Booking Platform
// Version: 1.0.0

const CACHE_NAME = "travel-booking-v1";
const STATIC_CACHE = "static-v1";
const IMAGES_CACHE = "images-v1";

// ===================================
// CACHE CONFIGURATION
// ===================================

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/search.html",
  "/styles/base.css",
  "/styles/components.css",
  "/styles/landing.css",
  "/styles/pages.css",
  "/js/search.js",
  "/js/booking.js",
  "/js/data.js",
  "/js/performance-optimizer.js",
  "/data/mockData.js",
  "/public/favicon-16x16.png",
  "/public/android-chrome-192x192.png",
  "/public/android-chrome-512x512.png",
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
];

const CACHE_STRATEGIES = {
  // Static assets - Cache First
  static: [/\.css$/, /\.js$/, /\.woff2?$/, /\.svg$/, /\.ico$/],

  // Images - Cache First with fallback
  images: [/\.(?:png|jpg|jpeg|webp|gif)$/, /images\.unsplash\.com/, /cdn\./],

  // HTML - Network First
  html: [/\.html$/, /\/$/],

  // API - Network First with timeout
  api: [/\/api\//, /\.json$/],
};

// ===================================
// SERVICE WORKER EVENTS
// ===================================

self.addEventListener("install", (event) => {
  console.log("🔧 Service Worker installing...");

  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(STATIC_CACHE);
        await cache.addAll(STATIC_ASSETS);
        console.log("✅ Static assets cached");

        // Skip waiting to activate immediately
        self.skipWaiting();
      } catch (error) {
        console.error("❌ Cache installation failed:", error);
      }
    })()
  );
});

self.addEventListener("activate", (event) => {
  console.log("🚀 Service Worker activating...");

  event.waitUntil(
    (async () => {
      try {
        // Clean up old caches
        const cacheNames = await caches.keys();
        const oldCaches = cacheNames.filter(
          (name) =>
            name.startsWith("travel-booking-") &&
            name !== CACHE_NAME &&
            name !== STATIC_CACHE &&
            name !== IMAGES_CACHE
        );

        await Promise.all(oldCaches.map((name) => caches.delete(name)));

        if (oldCaches.length > 0) {
          console.log(`🗑️ Cleaned up ${oldCaches.length} old caches`);
        }

        // Claim all clients immediately
        self.clients.claim();
        console.log("✅ Service Worker activated and claimed clients");
      } catch (error) {
        console.error("❌ Service Worker activation failed:", error);
      }
    })()
  );
});

self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith("http")) {
    return;
  }

  event.respondWith(handleFetch(event.request));
});

// ===================================
// FETCH HANDLING STRATEGIES
// ===================================

async function handleFetch(request) {
  const url = new URL(request.url);

  try {
    // Determine cache strategy based on request
    if (matchesPattern(request.url, CACHE_STRATEGIES.static)) {
      return await cacheFirstStrategy(request, STATIC_CACHE);
    }

    if (matchesPattern(request.url, CACHE_STRATEGIES.images)) {
      return await cacheFirstStrategy(request, IMAGES_CACHE);
    }

    if (matchesPattern(request.url, CACHE_STRATEGIES.html)) {
      return await networkFirstStrategy(request, CACHE_NAME);
    }

    if (matchesPattern(request.url, CACHE_STRATEGIES.api)) {
      return await networkFirstWithTimeoutStrategy(request, CACHE_NAME, 3000);
    }

    // Default: Network First for everything else
    return await networkFirstStrategy(request, CACHE_NAME);
  } catch (error) {
    console.error("❌ Fetch handling failed:", error);
    return await fallbackResponse(request);
  }
}

// ===================================
// CACHING STRATEGIES
// ===================================

// Cache First - Good for static assets
async function cacheFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    // Update cache in background
    updateCacheInBackground(request, cache);
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return await fallbackResponse(request);
  }
}

// Network First - Good for HTML and dynamic content
async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    return cachedResponse || (await fallbackResponse(request));
  }
}

// Network First with Timeout - Good for APIs
async function networkFirstWithTimeoutStrategy(request, cacheName, timeout) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const networkResponse = await fetch(request, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    return cachedResponse || (await fallbackResponse(request));
  }
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

function matchesPattern(url, patterns) {
  return patterns.some((pattern) => pattern.test(url));
}

async function updateCacheInBackground(request, cache) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse);
    }
  } catch (error) {
    // Silently fail background updates
  }
}

async function fallbackResponse(request) {
  const url = new URL(request.url);

  // Fallback for images
  if (matchesPattern(request.url, CACHE_STRATEGIES.images)) {
    return new Response(
      '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" font-family="Inter, sans-serif" font-size="16" fill="#6b7280" text-anchor="middle" dominant-baseline="middle">Image unavailable</text></svg>',
      {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "no-cache",
        },
      }
    );
  }

  // Fallback for HTML pages
  if (matchesPattern(request.url, CACHE_STRATEGIES.html)) {
    return new Response(
      `<!DOCTYPE html>
            <html lang="fr">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Page indisponible</title>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        background: linear-gradient(135deg, #1a1a1a 0%, #2d3748 100%);
                        color: white;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-height: 100vh;
                        margin: 0;
                        text-align: center;
                    }
                    .container {
                        background: rgba(255, 255, 255, 0.1);
                        backdrop-filter: blur(20px);
                        border-radius: 16px;
                        padding: 2rem;
                        border: 1px solid rgba(255, 255, 255, 0.2);
                    }
                    h1 { margin: 0 0 1rem 0; }
                    button {
                        background: #3b82f6;
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                        margin-top: 1rem;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>🌐 Page indisponible</h1>
                    <p>Cette page n'est pas disponible hors ligne.</p>
                    <button onclick="window.location.reload()">Réessayer</button>
                </div>
            </body>
            </html>`,
      {
        headers: {
          "Content-Type": "text/html",
          "Cache-Control": "no-cache",
        },
      }
    );
  }

  // Generic fallback
  return new Response("Service unavailable", {
    status: 503,
    statusText: "Service Unavailable",
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache",
    },
  });
}

// ===================================
// BACKGROUND SYNC & NOTIFICATIONS
// ===================================

self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Sync any queued data when network is available
    console.log("🔄 Background sync triggered");

    // Send queued analytics, form data, etc.
    // Implementation depends on your specific needs
  } catch (error) {
    console.error("❌ Background sync failed:", error);
  }
}

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  // Handle notification clicks
  event.waitUntil(clients.openWindow("/"));
});

// ===================================
// PERIODIC CACHE CLEANUP
// ===================================

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "CACHE_CLEANUP") {
    event.waitUntil(cleanupCaches());
  }
});

async function cleanupCaches() {
  try {
    const caches = await self.caches.keys();
    const imageCache = await self.caches.open(IMAGES_CACHE);
    const requests = await imageCache.keys();

    // Remove old images (keep only last 50)
    if (requests.length > 50) {
      const toDelete = requests.slice(0, requests.length - 50);
      await Promise.all(toDelete.map((req) => imageCache.delete(req)));
      console.log(`🗑️ Cleaned up ${toDelete.length} old cached images`);
    }
  } catch (error) {
    console.error("❌ Cache cleanup failed:", error);
  }
}

// ===================================
// ERROR HANDLING
// ===================================

self.addEventListener("error", (event) => {
  console.error("❌ Service Worker error:", event.error);
});

self.addEventListener("unhandledrejection", (event) => {
  console.error("❌ Service Worker unhandled rejection:", event.reason);
  event.preventDefault();
});

console.log("🎯 Service Worker loaded successfully");
