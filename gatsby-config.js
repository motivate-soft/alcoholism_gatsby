const { BLOCKS, INLINES } = require("@contentful/rich-text-types")

try {
  require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
  })
} catch (error) {
  console.log(`Failed to load .env.${process.env.NODE_ENV}`)
}

let contentfulConfig = {
  spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
  accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
}

if (process.env.HTTPS_PROXY) {
  const url = new URL(process.env.HTTPS_PROXY)
  contentfulConfig.proxy = {
    protocol: url.protocol,
    host: url.hostname,
    port: url.port,
  }
}

if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST
}

console.log("contentfulConfig", contentfulConfig)

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    "Contentful spaceId and the access token need to be provided."
  )
}

module.exports = {
  siteMetadata: {
    title: `Alcoholism.org`,
    description: `Alcoholism treatment program`,
    author: `Alcoholism Team`,
    siteUrl: `https://alcoholism.org`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/Images`,
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: contentfulConfig,
    },
    {
      resolve: "@contentful/gatsby-transformer-contentful-richtext",
      options: {
        renderOptions: {
          renderNode: {
            // [BLOCKS.EMBEDDED_ASSET]: node => {
            //   return renderEmbeddedAsset(node)
            // },
            // [BLOCKS.HEADING_3]: node => {
            //   return renderHeading(node)
            // },
            // [BLOCKS.EMBEDDED_ENTRY]: node => {
            //   return renderEmbeddedEntry(node)
            // },
          },
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `alcoholism.org`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-sass",
    // {
    //   resolve: "gatsby-plugin-sass",
    //   options: {
    //     sassOptions: {
    //       includePaths: ["src/images"],
    //     },
    //     // data: `@import "${__dirname}/src/styles/styles";`, // global styles
    //   },
    // },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /Icons/,
        },
      },
    },
    "gatsby-plugin-gatsby-cloud",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        // output: "/",
        entryLimit: 1000,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://alcoholism.gatsbyjs.io",
        sitemap: "https://alcoholism.gatsbyjs.io/sitemap/sitemap-index.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
