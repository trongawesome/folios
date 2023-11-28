require("dotenv").config();

const siteMetadata = {
  title: `Pafolios`,
  name: `Best design portfolio examples and case studies in 2023`,
  siteUrl: `https://pafolios.com`,
  description: `Best design portfolio examples and case studies for Product, UI/UX, Creative Designers. Learn and improve your design skills with real-world examples.`,
  hero: {
    portfoliosHeading: `Only the best Portfolios`,
    portfoliosSubtitle: `Best design portfolio examples and case studies for Product, UI/UX, Creative Designers. Update daily.`,
    blogHeading: `Journal`,
    blogSubtitle: `Guides and resources on building your portfolio and UX case studies.`,
    featuredArticlesHeading: `We Choice`,
    featuredArticlesSubtitle: `The best design portfolios on the internet, great visual, awesome case studies, handpicked by our editors.`,
    caseStudyHeading: `product design case studies 2023`,
    caseStudySubtitle: `Learn and improve your product skills with real-world portfolio examples.`,
    partnersHeading: `Build Your Portfolios`,
    maxWidth: 776,
  },
  social: [
    {
      name: `twitter`,
      url: `https://twitter.com/pafolios`,
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
    resolve: `gatsby-plugin-gtag`,
    options: {
      trackingId: `G-YTNX8NJP8C`,
      head: true,
      anonymize: true,
    },
  },
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: "UA-55380266-6",
      head: true,
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Pafolios`,
      short_name: `Pafolios`,
      start_url: `/`,
      background_color: `#F8F0EA`,
      display: `standalone`,
      icon: `src/assets/favicon.png`,
      include_favicon: false,
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
