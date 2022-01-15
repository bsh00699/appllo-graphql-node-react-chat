const userResolvers = require('./users')
const messageResolvers = require('./messages')

module.exports = {
  Message: {
    createdAt: (_) => _.createdAt.toISOString()
  },
  Query: {
    ...userResolvers.Query,
    ...messageResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...messageResolvers.Mutation
  }
}