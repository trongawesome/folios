/* eslint-disable */

/**
 * In order to improve the authoring experience we'll set a fallback for hero images
 * when they're not provided. This will allow you to write articles without immediately
 * adding a hero image.
 *
 * @param {Object} heroSource
 */
function normalizeHero(article) {
  let hero = {
    full: {},
    regular: {},
    narrow: {},
    seo: {},
  };

  if (article.hero) {
    hero = {
      full: article.hero.full.fluid,
      regular: article.hero.regular.fluid,
      narrow: article.hero.narrow.fluid,
      seo: article.hero.seo.fixed,
    };
  } else {
    console.log('\u001B[33m', `Missing hero for "${article.title}"`);
  }

  return hero;
}

function normalizeHeroBook(article) {
  let hero = {
    full: {},
    narrow: {},
    seo: {},
  };

  if (article.hero) {
    hero = {
      full: article.hero.full.fluid,
      narrow: article.hero.narrow.fluid,
      seo: article.hero.seo.fixed,
    };
  } else {
    console.log('\u001B[33m', `Missing hero for "${article.title}"`);
  }

  return hero;
}

function normalizeThumnail(article) {
  let thumbnail = {
    regular: {},
  };

  if (article.thumbnail) {
    thumbnail = {
      regular: article.thumbnail.regular.fluid,
    };
  } else {
    console.log('\u001B[33m', `Missing thumbnail for "${article.title}"`);
  }

  return thumbnail;
}

function normalizeAvatar(author) {
  let avatar = {
    small: {},
    medium: {},
    large: {},
  };

  if (author.avatar) {
    avatar = {
      small: author.avatar.small.fluid,
      medium: author.avatar.medium.fluid,
      large: author.avatar.large.fluid,
    };
  } else {
    console.log('\u001B[33m', `Missing avatar for "${author.name}"`);
  }

  return avatar;
}

module.exports.local = {
  articles: ({ node: article }) => {
    return {
      ...article,
      hero: normalizeHero(article),
    };
  },
  portfolios: ({ node: portfolio }) => {
    return {
      ...portfolio,
      hero: normalizeHero(portfolio),
      thumbnail: normalizeThumnail(portfolio),
    };
  },
  readings: ({ node: reading }) => {
    return {
      ...reading,
      hero: normalizeHeroBook(reading),
    };
  },
  authors: ({ node: author }) => {
    return {
      ...author,
      avatar: normalizeAvatar(author),
    };
  },
};

module.exports.contentful = {
  articles: ({ node: article }) => {
    const author = article.author.reduce((curr, next, index, array) => {
      if (array.length === 1) {
        return next.name;
      }

      return `${curr + next.name}, `;
    }, ``);

    return {
      ...article,
      author,
      body: article.body.childMdx.body,
      timeToRead: article.body.childMdx.timeToRead,
    };
  },
  portfolios: ({ node: portfolio }) => {
    const author = portfolio.author.reduce((curr, next, index, array) => {
      if (array.length === 1) {
        return next.name;
      }

      return `${curr + next.name}, `;
    }, ``);

    return {
      ...portfolio,
      author,
      body: portfolio.body.childMdx.body,
      timeToRead: portfolio.body.childMdx.timeToRead,
    };
  },

  readings: ({ node: reading }) => {
    const author = reading.author.reduce((curr, next, index, array) => {
      if (array.length === 1) {
        return next.name;
      }

      return `${curr + next.name}, `;
    }, ``);

    return {
      ...reading,
      author,
      body: reading.body.childMdx.body,
      timeToRead: reading.body.childMdx.timeToRead,
    };
  },

  authors: ({ node: author }) => {
    return {
      ...author,
      social: author.social.map(s => ({ url: s })),
      slug: author.fields.slug,
      authorsPage: author.fields.authorsPage,
    };
  },
};
