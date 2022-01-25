const { PubSub } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/env.json')
const pubsub = new PubSub()

module.exports = (ctx) => {
  // client http headers: { Authorization: Bearer <token> }
  // context.req.headers.authorization
  let token = null
  if (ctx.req && ctx.req.headers.authorization) {
    token = ctx.req.headers.authorization.split('Bearer ')[1]

  } else if (ctx.connection?.context.Authorization) {
    // subscription authorization
    token = ctx.connection?.context.Authorization.split('Bearer ')[1]
  }
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decode) => {
      // decode: { username: 'xingchao', iat: 1641997161, exp: 1642000761 }
      ctx.user = decode
    })
  }
  ctx.pubsub = pubsub
  return ctx
}