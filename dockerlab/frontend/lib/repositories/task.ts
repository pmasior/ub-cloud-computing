import { ObjectId } from "mongodb";
import databaseConnection from "../mongo/databaseConnector";

export const getTasks = async () => {
  const clientPromise = await databaseConnection;
  const db = await clientPromise?.db();
  return await db?.collection("todo").find({}).toArray();
};

export const getTask = async (id: ObjectId) => {
  const clientPromise = await databaseConnection;
  const db = await clientPromise?.db();
  return await db?.collection("todo").findOne({ _id: id });
};

export const createTask = async (fields: { text: string; done: boolean }) => {
  const { text, done } = fields;
  const clientPromise = await databaseConnection;
  const db = await clientPromise?.db();
  return await db?.collection("todo").insertOne({ text: text, done: done });
};

export const updateTask = async (
  id: string,
  fields: { text?: string; done?: boolean }
) => {
  const { text, done } = fields;
  const clientPromise = await databaseConnection;
  const db = await clientPromise?.db();
  return await db?.collection("todo").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: JSON.parse(
        JSON.stringify({
          text: text !== undefined ? text : undefined,
          done: done,
        })
      ),
    }
  );
};

export const removeTask = async (id: ObjectId) => {
  const clientPromise = await databaseConnection;
  const db = await clientPromise?.db();
  return await db?.collection("todo").deleteOne({ _id: new ObjectId(id) });
};
