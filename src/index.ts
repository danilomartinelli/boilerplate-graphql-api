import { db } from "./db";
import { DocumentNode } from "graphql";
import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers";
import * as fs from "fs";
import * as path from "path";

interface ICallBackCtx {
  req: {
    headers: {
      authorization: string | undefined;
    };
  };
  connection: object | undefined;
}

const typeDefs: DocumentNode = fs.readFileSync(
  path.join(__dirname, "./schema.graphql"),
  "utf8"
) as any;

const server = new ApolloServer({
  typeDefs,
  formatError: (error: any) => {
    const exception = error.extensions.exception;
    return {
      name: exception.name,
      message: exception.message
    };
  },
  resolvers,
  context: ({ req, connection }: ICallBackCtx) => {
    if (connection) {
      return {};
    } else {
      return {
        db,
        token: req.headers.authorization
      };
    }
  }
});

db.sequelize
  .authenticate()
  .then(() => {
    server.listen({ port: 4055 }).then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  })
  .catch(err => {
    console.error(err);
    process.exit(0);
  });
