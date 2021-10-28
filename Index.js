const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const { typeDefs } = require("./Graphql.typeDefs");
const { resolvers } = require("./Graphql.resolver");

const cors = require("cors");

const app = express();

//allow cors
app.use(cors());

const connectServer = async (app) => {
   try {
      //connect to database
      await mongoose.connect(
         "mongodb+srv://freecharles:12345@cluster0.yacww.mongodb.net/medico?retryWrites=true&w=majority",
         { useNewUrlParser: true, useUnifiedTopology: true },
         mongoose.connection.once("open", () => {
            console.log("connected to database");
         })
      );
      const server = new ApolloServer({ typeDefs, resolvers });
      await server.start();
      server.applyMiddleware({ app });
      app.listen({ port: 3001 }, () => {
         console.log("Server running on port 3001");
      });
   } catch (error) {
      console.log(error);
   }
};

connectServer(app);
