import { MongoClient } from "mongodb";

export type GlobalWithMongo = typeof global & {
  _mongoConnection?: MongoConnection;
};
