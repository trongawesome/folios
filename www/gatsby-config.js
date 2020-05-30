require("dotenv").config();

const siteMetadata = {
  title: `Trong Nguyen's Desk`,
  name: `Trong Nguyen`,
  siteUrl: `https://trongnguyen.co`,
  description: `Product Designer who's learning to write and express thoughts. Currently, I'm building Design System and improving Web Experience at Carousell.`,
  hero: {
    heading: `Hi, I’m Trong, <br/>product designer.`,
    writingHeading: `Writing is designing.`,
    readingHeading: `Books for product designers`,
    littleGalleryHeading: `Little big grid`,
    littleGallerySubtitle: `Little works and experiments but my big pride. I pour them all in this grid.`,
    maxWidth: 776,
  },
  social: [
    {
      url: `https://twitter.com/trongawesome`,
    },
    {
      name: 'medium',
      url: `https://medium.com/@trongawesome`,
    },
    {
      name: 'instagram',
      url: `https://www.instagram.com/trongawesome`,
    },
  ],
};

const plugins = [
  {
    resolve: "@narative/gatsby-theme-novela",
    options: {
      contentPosts: "content/posts",
      contentAuthors: "content/authors",
      contentPortfolios: "content/portfolios",
      rootPath: "/",
      basePath: "/",
      authorsPage: true,
      mailchimp: true,
      sources: {
        local: true,
        contentful: false,
      },
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Trong Nguyen's Desk`,
      short_name: `Trong`,
      start_url: `/`,
      background_color: `#D1E8EB`,
      display: `standalone`,
      icon: `src/assets/favicon.png`,
      include_favicon: false,
    },
  },
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: "UA-55380266-4",
    },
  },
  {
    resolve: "gatsby-plugin-mailchimp",
    options: {
      endpoint:
        "https://medium.us16.list-manage.com/subscribe/post?u=bd56b6b313e273cdd466f5abc&amp;id=736a1779cd",
    },
  },
];

/**
 * For development purposes if there's no Contentful Space ID and Access Token
 * set we don't want to add in gatsby-source-contentful because it will throw
 * an error.
 *
 * To enanble Contentful you must
 * 1. Create a new Space on contentful.com
 * 2. Import the Contentful Model from @narative/gatsby-theme-novela/conteful
 * 3. Add .env to www/ (see www/env.example)
 * 4. Enable contentful as a source in this file for @narative/gatsby-theme-novela
 */
if (process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN) {
  plugins.push({
    resolve: "gatsby-source-contentful",
    options: {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    },
  });
}

module.exports = {
  siteMetadata,
  plugins,
};
