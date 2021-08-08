const express = require("express"); // include express module to the package
const { ApolloServer } = require("apollo-server-express"); // include apollo module
const cors = require("cors");
require("dotenv").config();

const DbConnection = require("./db");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const protect = require("./middleware/protect");

// create an express instance
const app = express();
const PORT = process.env.PORT || 8090;

app.use(express.json());

app.use(cors());

// connect to database
DbConnection();

// create apollo server async function
//this is only apprecable if you are using newer version of apolloserver
(async () => {
  // create an instance of the apollo server
  const apollosever = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return { reqUser: protect(req) };
    },
  });

  // start the apollo server
  await apollosever.start();

  // apply the apollo graphql middleware and set the path to /api
  apollosever.applyMiddleware({ app, path: "/api" });
})();

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
