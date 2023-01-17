const { expressjwt } = require("express-jwt");
require("dotenv/config");
function expressJwt(req, res, next) {
  const api = process.env.API_URL;
  return expressjwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
  }).unless({
    path: [
      { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}

module.exports = expressJwt;
