const CACHE_NAME = 'version-1'
// const urlsToCache: string[] = ['index.html', 'offline.html', './dist', './src', './assets', './public']

import fs from 'fs';
import path from 'path';

const distPath = path.join(__dirname, 'dist');
const files = fs.readdirSync(distPath);

const urlsToCache = files.map(file => `/dist/${file}`);
console.log('urlsToCache', urlsToCache);

// Установка SW
self.addEventListener('install', event => {
  ;(event as ExtendableEvent).waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache')
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('fetch', event => {
  const localEvent = event as FetchEvent
  localEvent.respondWith(
    caches.match(localEvent.request).then(response => {
      if (response) {
        return response
      }

      return fetch(localEvent.request).catch(() => {
        // Если запрос не удалось выполнить из-за отсутствия интернета, покажем offline.html
        return caches.match('offline.html') as Promise<Response>
      })
    })
  )
})

// Активация SW и удаление старых кэшей
self.addEventListener('activate', event => {
  const cacheWhitelist: string[] = [CACHE_NAME]

  ;(event as ExtendableEvent).waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName)
          }
        })
      )
    )
  )
})
