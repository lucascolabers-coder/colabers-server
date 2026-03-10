if (!process.env.APP_SECRET) {
  throw new Error('APP_SECRET environment variable is required.');
}

export default {
  jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: '1d',
  },
};
