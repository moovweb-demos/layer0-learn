import { skipWaiting, clientsClaim } from 'workbox-core'
import { Prefetcher, prefetch } from '@layer0/prefetch/sw'
import DeepFetchPlugin, { DeepFetchCallbackParam } from '@layer0/prefetch/sw/DeepFetchPlugin'

skipWaiting()
clientsClaim()

new Prefetcher({
  plugins: [
    new DeepFetchPlugin([
      {
        selector: 'script',
        maxMatches: 20,
        attribute: 'src',
        as: 'script',
        callback: deepFetchObject,
      },
      {
        selector: '[rel="stylesheet"]',
        maxMatches: 20,
        attribute: 'href',
        as: 'style',
        callback: deepFetchObject,
      },
      {
        selector: '[rel="preload"]',
        maxMatches: 20,
        attribute: 'href',
        as: 'style',
        callback: deepFetchObject,
      },
      {
        selector: 'img',
        maxMatches: 1,
        attribute: 'src',
        as: 'image',
        callback: deepFetchObject,
      },
    ]),
  ],
})
  .route()
  .cache(/^https:\/\/(.*?)\.com\/.*/)
  .cache(/^https:\/\/(.*?)\.net\/.*/)

function deepFetchObject({ $el, el, $ }: DeepFetchCallbackParam) {
  let objectLinks = ['src', 'href', 'srcset']
  objectLinks.forEach((i) => {
    let urlTemplate = $(el).attr(i)
    if (urlTemplate) {
      prefetch(urlTemplate)
    }
  })
}
