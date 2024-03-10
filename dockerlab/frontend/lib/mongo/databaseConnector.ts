import { MongoClient } from "mongodb";
import type { GlobalWithMongo } from "./databaseConnector.d";

if (!process.env.DATABASE_URI) {
  throw new Error("Please specify a database uri");
}

const uri = process.env.DATABASE_URI;
const options = {};

let databaseConnection: Promise<MongoClient> | null = null;

const connectMongoDatabase = async (): Promise<MongoClient> =>
  await new MongoClient(uri, options).connect();

/**
 * Return mongo connection for development environment
 *
 * Using global value for preserving connection across module reloads caused
 * by Hot Module Replacement in next.js
 */
const createDatabaseConnectionForDevelopmentEnvironment =
  async (): Promise<MongoClient> => {
    let globalWithMongo: GlobalWithMongo = global;

    if (!globalWithMongo._mongoConnection) {
      globalWithMongo._mongoConnection = connectMongoDatabase();
    }

    return globalWithMongo._mongoConnection;
  };

if (process.env.NODE_ENV === "development") {
  databaseConnection = createDatabaseConnectionForDevelopmentEnvironment();
} else {
  databaseConnection = connectMongoDatabase();
}

export default databaseConnection;
