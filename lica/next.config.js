/* eslint-disable no-unused-vars */
const withImages = require('next-images');

const redirects = {
  async redirects() {
    return [
      {
        source: '/dashboards',
        destination: '/dashboards/crypto',
        permanent: true
      }
    ];
  }
};

module.exports = withImages({
  
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  ...redirects
});
