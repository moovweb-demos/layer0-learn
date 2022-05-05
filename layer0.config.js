module.exports = {
  routes: './src/routes.ts',
  connector: '@layer0/starter',
  backends: {
    origin: {
      domainOrIp: 'demos-guide-layer0-astro-example-default.layer0-limelight.link',
      hostHeader: 'demos-guide-layer0-astro-example-default.layer0-limelight.link',
      disableCheckCert: true
    },
    assets: {
      domainOrIp: 'images.unsplash.com',
      hostHeader: 'images.unsplash.com',
      disableCheckCert: true
    },
  },
}
