const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/env.json')


module.exports = (ctx) => {
  // client http headers: { Authorization: Bearer <token> }
  // context.req.headers.authorization
  if (ctx.req && ctx.req.headers.authorization) {
    const token = ctx.req.headers.authorization.split('Bearer ')[1]
    jwt.verify(token, JWT_SECRET, (err, decode) => {
      // decode: { username: 'xingchao', iat: 1641997161, exp: 1642000761 }
      ctx.user = decode
    })
  }
  return ctx
}