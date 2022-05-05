import install from '@layer0/prefetch/window/install'
import installDevtools from '@layer0/devtools/install'

document.addEventListener('DOMContentLoaded', function () {
  // @ts-ignore, Install the service worker
  install({
    includeCacheMisses: true, // DISABLE THIS LINE IN PRODUCTION
  })
  // Install the devtools to showcase prefetching and caching
  installDevtools()
})
