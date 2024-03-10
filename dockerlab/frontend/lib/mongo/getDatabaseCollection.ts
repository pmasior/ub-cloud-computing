import databaseConnection from "./databaseConnector";

const getDatabaseCollection = async (collection: string) =>
  (await databaseConnection)?.db().collection(collection);

export default getDatabaseCollection;
