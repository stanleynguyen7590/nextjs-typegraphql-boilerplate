import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "@adapters/resolvers/";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

let apolloServerHandler: (req: any, res: any) => Promise<void>;

const createSchema = async (shouldEmitSchemaFile = true) => {
  // build the schema as always
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });
  return schema;
};

const getApolloServerHandler = async () => {
  if (!apolloServerHandler) {
    const schema = await createSchema();

    apolloServerHandler = new ApolloServer({ schema }).createHandler({
      path: "/api/graphql",
    });
  }
  return apolloServerHandler;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const apolloServerHandler = await getApolloServerHandler();
  return apolloServerHandler(req, res);
};
