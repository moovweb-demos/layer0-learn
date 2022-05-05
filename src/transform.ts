import cheerio from 'cheerio'
import Request from '@layer0/core/router/Request'
import Response from '@layer0/core/router/Response'

export default function transformResponse(response: Response, request: Request) {
  if (response.body) {
    const $ = cheerio.load(response.body)

    $('[rel="preload"]').remove()
    $('[rel="preconnect"]').remove()
    $('[rel="dns-prefetch"]').remove()

    // Those 2 scripts are added using server side transformation just for Proof of Concept purposes.
    // For production these scripts should be included in original website base code.
    $('head').append(`
      <script src="/__layer0__/cache-manifest.js" defer="defer"></script>
      <script src="/l0_main.js" defer="defer"></script>
    `)

    response.body = $.html()
      .replace(/\=\"\/\//g, '="https://')
      .replace(/https?:\/\/demos\-guide\-layer0\-astro\-example\-default\.layer0\-limelight\.link\//g, '/')
      .replace(/https?:\/\/images\.unsplash\.com\//g, '/l0-assets/')
      .replace(/\?layer0\_dt\_pf\=1/g, '')
  }
}
