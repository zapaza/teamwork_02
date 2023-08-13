const CACHE_NAME = 'version-1'
// список урлов, которые хотим закэшировать
const routesToCache = [
  '/',
  '/main',
  '/forum',
  '/forum-topic',
  '/game',
  '/leaderboard',
  '/login',
  '/profile',
  '/signup',
]

self.addEventListener('install', event => {
  ;(event as InstallEvent).waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(routesToCache)
    })
  )
})

self.addEventListener('fetch', event => {
  ;(event as FetchEvent).respondWith(
    caches.match((event as FetchEvent).request).then(cachedResponse => {
      // Если ресурс в кэше, возвращаем его.
      if (cachedResponse) {
        return cachedResponse
      }

      // Иначе, делаем запрос к серверу.
      return fetch((event as FetchEvent).request).then(response => {
        // Кэшируем ответ для будущего.
        return caches.open(CACHE_NAME).then(cache => {
          cache.put((event as FetchEvent).request, response.clone())
          return response
        })
      })
    })
  )
})

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  (event as ExtendableEvent).waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
