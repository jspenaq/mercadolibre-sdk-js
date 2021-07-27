require('dotenv').config();
const Client = require('./client');

const meli = new Client();
console.log('meli :>> ', meli);

const authCode = process.env.AUTH_CODE;

(async () => {
  const url = meli.generateAuthUrl();
  // 2. Open Url and Grant Access
  console.log(`Open URL: ${url}`);

  const token = await meli.getToken(authCode);
  console.log('token :>> ', token);
  const user = await meli.createTestUser();
  console.log('user :>> ', user);
})();
