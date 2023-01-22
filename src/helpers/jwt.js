const { expressjwt } = require("express-jwt");
require("dotenv/config");
function expressJwt(req, res, next) {
  const api = process.env.API_URL;
  return expressjwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    isRevoked: isRevoked
  }).unless({
    path: [
      { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}

async function isRevoked(req, payload){
  console.log(payload.payload.isAdmin)
  if(!payload.payload.isAdmin){
    return true
  }
  return undefined
}

module.exports = expressJwt;
