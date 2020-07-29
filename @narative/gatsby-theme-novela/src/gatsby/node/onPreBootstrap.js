const fs = require('fs-extra'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = async ({ reporter }, themeOptions) => {
  const authorsPath = themeOptions.contentAuthors || 'content/authors';
  const postsPath = themeOptions.contentPosts || 'content/posts';
  const portfoliosPath = themeOptions.contentPortfolios || 'content/portfolios';

  if (!fs.existsSync(authorsPath)) {
    reporter.warn(`
      Missing directory for Authors.
      We are creating the "${authorsPath}" directory for you.
      Please ensure you add your authors within "${authorsPath}"
    `);

    fs.mkdirSync(authorsPath, { recursive: true });
  }

  if (!fs.existsSync(postsPath)) {
    reporter.warn(`
      Missing directory for Posts.
      We are creating the "${postsPath}" directory for you.
      Please ensure you add your posts within "${postsPath}"
    `);

    fs.mkdirSync(postsPath, { recursive: true });
  }

  if (!fs.existsSync(portfoliosPath)) {
    reporter.warn(`
      Missing directory for Portfolio.
      We are creating the "${portfoliosPath}" directory for you.
      Please ensure you add your posts within "${portfoliosPath}"
    `);

    fs.mkdirSync(portfoliosPath, { recursive: true });
  }
};
