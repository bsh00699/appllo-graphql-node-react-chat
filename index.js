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
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ctxMiddleware,
  subscriptions: {
    onConnect: async (connectionParams, webSocket) => {
      console.log('xxx', connectionParams);
    },
  },
  cors: cors(corsOptions)
  // {
  //   origin: (origin, callback) => {
  //     const whitelist = ["http://localhost:3000"];
  //     if (whitelist.indexOf(origin) !== -1) {
  //       callback(null, true)
  //     } else {
  //       callback(new Error("Not allowed by CORS"))
  //     }
  //   }
  // }
});

const httpServer = http.createServer(app);

// server.applyMiddleware({
//   app, cors: {
//     credentials: true,
//     origin: 'http://localhost:3000'
//   }
// });
server.applyMiddleware({ app });
server.installSubscriptionHandlers(httpServer);
httpServer.listen(4000, () => {
  console.log(`🚀 Server ready at http://localhost:4000`);
  sequelize.authenticate().then(() => {
    console.log('Database connected!');
  }).catch((err) => {
    console.log('Database connection failed');
  })
});

// async function startApolloServer() {
//   const PORT = 4000;
//   const app = express();
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: ctxMiddleware
//   });
//   await server.start();
//   server.applyMiddleware({ app })

//   const httpServer = http.createServer(app);
//   server.installSubscriptionHandlers(httpServer);

//   // Make sure to call listen on httpServer, NOT on app.
//   await new Promise(resolve => httpServer.listen(PORT, resolve));
//   console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
//   console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
//   try {
//     await sequelize.authenticate();
//     console.log('Database connected!');
//   } catch (error) {
//     console.error('Database connection failed:', error);
//   }
//   return { server, app, httpServer };
// }
// startApolloServer()

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ctxMiddleware
// });
// const httpServer = http.createServer(app);
// server.applyMiddleware({ app });
// server.installSubscriptionHandlers(httpServer);

// httpServer.listen(4000, () => {
//   console.log(`🚀 Server ready at http://localhost:4000`);
//   sequelize.authenticate().then(() => {
//     console.log('Database connected!');
//   }).catch((err) => {
//     console.log('Database connection failed');
//   })
// })

// server.listen().then(({ url, subscriptionsUrl }) => {
//   console.log(`🚀 Server ready at ${url}`);
//   console.log(`🚀 Susbscription ready at ${subscriptionsUrl}`)
//   sequelize.authenticate().then(() => {
//     console.log('Database connected!');
//   }).catch((err) => {
//     console.log('Database connection failed');
//   })
// });