const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  defaultConfig.exportPathMap = async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      '/': { page: '/assessment' }
    }
  }

  if (phase !== PHASE_DEVELOPMENT_SERVER) {
    defaultConfig.assetPrefix = "/novum-snowflake"
  }

  return defaultConfig
}
