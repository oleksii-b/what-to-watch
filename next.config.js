const modules = [
  'react-simple-captcha'
]

const withTM = require('next-transpile-modules')(modules)

const config = {
  reactStrictMode: true,
  webpack(config) {
    const originalEntry = config.entry

    config.entry = async function () {
      const entries = await originalEntry()

      if (
        entries['main.js'] &&
        !entries['main.js'].includes('./scripts/polyfills.js')
      ) {
        entries['main.js'].unshift('./scripts/polyfills.js')
      }

      return entries
    }

    return config
  },
}

module.exports = withTM(config)
