// require('dotenv').config();
const got = require('got');

module.exports = class Client {
  constructor(credentials = {}) {
    this.clientId = credentials.CLIENT_ID || process.env.CLIENT_ID;
    this.clientSecret = credentials.CLIENT_SECRET || process.env.CLIENT_SECRET;
    this.redirectUri = credentials.REDIRECT_URI || process.env.REDIRECT_URI;
    this.authorizationCode = '';
    this.accessToken = '';
    this.refreshToken = '';
  }

  generateAuthUrl() {
    return `https://auth.mercadolibre.com/authorization?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectUri}`;
  }

  async getToken(authCode) {
    try {
      this.authorizationCode = authCode;
      const endpoint = 'https://api.mercadolibre.com/oauth/token';
      const json = {
        grant_type: 'authorization_code',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code: authCode,
        redirect_uri: this.redirectUri,
      };
      const headers = {
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
      };
      const { body } = await got.post(endpoint, { json, headers, responseType: 'json' });
      this.accessToken = body.access_token;
      this.refreshToken = body.refresh_token;
      return body.access_token;
    } catch (error) {
      console.log('ERROR!');
      console.error(error.response.body);
    }
  }

  async createTestUser(accessToken = '') {
    try {
      const endpoint = 'https://api.mercadolibre.com/users/test_user';
      const json = {
        site_id: 'MLA',
      };
      const headers = {
        Authorization: `Bearer ${this.accessToken || accessToken}`,
      };
      const { body } = await got.post(endpoint, { json, headers, responseType: 'json' });
      return body;
    } catch (error) {
      console.log('ERROR!');
      console.error(error.response.body);
    }
  }
};
