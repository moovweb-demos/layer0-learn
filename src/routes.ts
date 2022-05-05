import { CACHE_ASSETS } from './cache'
import { Router } from '@layer0/core/router'
import shoppingFlowRouteHandler from './shoppingFlowRouteHandler'

export default new Router()
  // Homepage
  .match('/', shoppingFlowRouteHandler)
  // Blog pages
  .match('/blog/:path*', shoppingFlowRouteHandler)
  // Assets
  .post('/assets/:path*', ({ cache, proxy, setResponseHeader, removeUpstreamResponseHeader }) => {
    setResponseHeader('cache-control', 'public, max-age=86400')
    removeUpstreamResponseHeader('set-cookie')
    cache(CACHE_ASSETS)
    proxy('origin')
  })
  // Proxied Assets
  .match('/l0-assets/:path*', ({ cache, proxy, setResponseHeader, removeUpstreamResponseHeader }) => {
    setResponseHeader('cache-control', 'public, max-age=86400')
    removeUpstreamResponseHeader('set-cookie')
    cache(CACHE_ASSETS)
    proxy('assets', { path: ':path*' })
  })
  // Layer0 Specific Assets
  .match('/service-worker.js', ({ serviceWorker }) => serviceWorker('dist/service-worker.js'))
  .match('/l0_main.js', ({ serveStatic, cache }) => {
    cache(CACHE_ASSETS)
    serveStatic('dist/browser.js')
  })
  .match(
    '/:path*/:file.:ext(js|mjs|css|png|ico|svg|jpg|jpeg|gif|ttf|woff|otf)',
    ({ cache, removeUpstreamResponseHeader, proxy, setResponseHeader }) => {
      setResponseHeader('cache-control', 'public, max-age=86400')
      removeUpstreamResponseHeader('set-cookie')
      cache(CACHE_ASSETS)
      proxy('origin')
    }
  )
  // Everything else to origin
  .fallback(({ proxy }) => {
    proxy('origin')
  })
