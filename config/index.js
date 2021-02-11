module.exports = {
  title: 'Fliker API',
  env: {
    dev: process.env.NODE_ENV === 'development',
    prod: process.env.NODE_ENV === 'production',
  },
  api: {
    flickrURL: 'https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1',
  },
};
