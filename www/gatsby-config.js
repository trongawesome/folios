require("dotenv").config();

const siteMetadata = {
  title: `Pafolios`,
  name: `Awesome design portfolio ands case studies`,
  siteUrl: `https://pafolios.com`,
  description: `Awesome product and UX design portfolio and case study inspirations`,
  hero: {
    portfoliosHeading: `Portfolio Inspirations`,
    portfoliosSubtitle: `Awesome portfolios and case studies in Product Design & UX Design`,
    blogHeading: `Journal`,
    blogSubtitle: `Guides and resources on building your portfolio and UX case studies`,
    featuredArticlesHeading: `Staff Picks`,
    featuredArticlesSubtitle: `The best design portfolios on the internet, great visual, awesome case studies, handpicked by our editors`,
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
      authorsPage: false,
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
      name: `Parfolios`,
      short_name: `Parfolios`,
      start_url: `/`,
      background_color: `#FFFFFF`,
      display: `standalone`,
      icon: `src/assets/favicon.png`,
      include_favicon: false,
    },
  },
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: "UA-55380266-6'",
    },
  },
  {
    resolve: "gatsby-plugin-mailchimp",
    options: {
      endpoint:
        "https://gmail.us17.list-manage.com/subscribe/post?u=9104eef27bb18633c2f62b228&amp;id=a355a2bdaf",
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
