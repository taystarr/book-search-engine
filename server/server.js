const express = require('express');
const path = require('path');
const db = require('./config/connection');
// remove routes add typedefs/reselvers and apollo + auth
const { typeDefs, resolvers } = require('./schemas');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');

const server = new ApolloServer({ typeDefs, resolvers, context: authMiddleWare });
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  // integrate apollo server with express as middleware
  server.applyMiddleware({ app });
};

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

// call async function to start server
startApolloServer(typeDefs, resolvers);