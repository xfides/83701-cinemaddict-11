const CACHE_PREFIX = `cinemaddict-cache`;
const CACHE_VER = `v1`;
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;
const resourcePaths = [
  `./`,
  `./index.html`,
  `./bundle.js`,
  `./bundle.js.map`,
  `./css/normalize.css`,
  `./css/main.css`,
  `./images/emoji/smile.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/angry.png`,
  `./images/icons/icon-watchlist-active.svg`,
  `./images/icons/icon-watchlist.svg`,
  `./images/icons/icon-watched-active.svg`,
  `./images/icons/icon-watched.svg`,
  `./images/icons/icon-favorite-active.svg`,
  `./images/icons/icon-favorite.svg`,
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
  `./images/background.png`,
  `./images/bitmap.png`,
  `./images/bitmap@2x.png`,
  `./images/bitmap@3x.png`
];

class ServiceWorker {

  static handleEvent(evt, handler) {
    self.addEventListener(evt, handler);
  }

  static getEventHandlers() {
    return {
      install: ServiceWorker.eventInstallHandler,
      activate: ServiceWorker.eventActivateHandler,
      fetch: ServiceWorker.eventFetchHandler,
    }
  }

  static run() {
    Object.entries(ServiceWorker.getEventHandlers()).forEach((entryEvent) => {
      ServiceWorker.handleEvent(entryEvent[0], entryEvent[1]);
    });
  }

  static eventInstallHandler(evt) {
    evt.waitUntil(caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(resourcePaths);
    }));
  }

  static eventActivateHandler(evt) {
    evt.waitUntil(ServiceWorker._handleCacheBeforeActivating());
  }

  static eventFetchHandler(evt) {
    const {request} = evt;
    const promiseOfParsingRequest = caches.match(request).then(
      (cacheResponse) => {
        if (cacheResponse) {
          return cacheResponse;
        }

        return ServiceWorker._fetchResourceAndAddToCache(request);
      }
    );

    evt.respondWith(promiseOfParsingRequest);
  }

  static _handleCacheBeforeActivating() {
    return caches.keys().then((cacheKeys) => {
      return ServiceWorker._clearOldCacheKeys(cacheKeys);
    })
  }

  static _clearOldCacheKeys(cacheKeys) {
    let promisesToDeleteOldCaches = cacheKeys.map((oneCacheKey) => {
      if (oneCacheKey.startsWith(CACHE_PREFIX) && oneCacheKey !== CACHE_NAME) {
        return caches.delete(oneCacheKey);
      }

      return null;
    });

    promisesToDeleteOldCaches = promisesToDeleteOldCaches.filter((promise) => {
      return promise !== null;
    });

    return Promise.all(promisesToDeleteOldCaches);
  }

  static _fetchResourceAndAddToCache(request) {
    return fetch(request)
      .then((response) => {
        if (
          !response || response.status !== 200 || response.type !== `basic`
        ) {
          return response;
        }

        const clonedResponse = response.clone();

        caches.open(CACHE_NAME)
          .then((cache) => {
            return cache.put(request, clonedResponse)
          });

        return response;
      }).catch(() => {
        // throw error;
      });
  }

}

ServiceWorker.run();
