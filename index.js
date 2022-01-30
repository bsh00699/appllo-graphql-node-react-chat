const { ApolloServer } = require('apollo-server-express');
const cors = require('cors')
const express = require('express');
const http = require('http');
const { sequelize } = require('./models')

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}
// The GraphQL schema
// A map of functions which return data for the schema.
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')
const ctxMiddleware = require('./utils/ctxMiddleware')

async function startApolloServer() {
  const PORT = 4000;
  const app = express();
  app.use(cors(corsOptions))
  app.use(express.static(__dirname + '/public/images'))
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ctxMiddleware,
    // subscriptions: {
    //   onConnect: async (connectionParams, webSocket) => {
    //     console.log('xxx', connectionParams);
    //   },
    // },
  });
  await server.start();
  server.applyMiddleware({ app })

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  // Make sure to call listen on httpServer, NOT on app.
  await new Promise(resolve => httpServer.listen(PORT, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
  return { server, app, httpServer };
}
startApolloServer()

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ctxMiddleware
// });
// const httpServer = http.createServer(app);

// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
//   sequelize.authenticate().then(() => {
//     console.log('Database connected!');
//   }).catch((err) => {
//     console.log('Database connection failed');
//   })
// });