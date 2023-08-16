// prettier-ignore

const CACHE_NAME = 'version-1'
const routesToCache = [
  '/',
  '/forum',
  '/forum-topic',
  '/game',
  '/leaderboard',
  '/login',
  '/profile',
  '/signup',
]

self.addEventListener('install', event => {
  (event as InstallEvent).waitUntil(cacheRoutes())
})

self.addEventListener('fetch', event => {
  (event as FetchEvent).respondWith(fetchOrFallback(event as FetchEvent))
})

self.addEventListener('activate', event => {
  (event as ExtendableEvent).waitUntil(cleanOldCaches())
})

async function cacheRoutes() {
  try {
    const cache = await caches.open(CACHE_NAME)
    return cache.addAll(routesToCache)
  } catch (error) {
    console.error('Error caching routes:', error)
  }
}

async function fetchOrFallback(event: FetchEvent): Promise<Response> {
  try {
    const cachedResponse = await caches.match(event.request)
    if (cachedResponse) {
      return cachedResponse
    }

    const response = await fetch(event.request)
    const cache = await caches.open(CACHE_NAME)
    await cache.put(event.request, response.clone())
    return response
  } catch (error) {
    console.error('Error fetching or falling back:', error)
    return new Response('Service Worker Fetch Error', { status: 500 })
  }
}

async function cleanOldCaches() {
  const cacheNames = await caches.keys()
  const cacheWhitelist = [CACHE_NAME]
  return Promise.all(
    cacheNames.map(async cacheName => {
      if (!cacheWhitelist.includes(cacheName)) {
        return caches.delete(cacheName)
      }
    })
  )
}
