"use client";

import { ObjectId } from "mongodb";
import { useSWRConfig } from "swr";

export const Task = ({
  text,
  done,
  id,
}: {
  text: string;
  done: boolean;
  id: string | ObjectId;
}) => {
  const { mutate: mutateSWR } = useSWRConfig();
  const markAsDone = async (id: string | ObjectId, done: boolean) => {
    await fetch(`/api/task/${id}`, {
      body: JSON.stringify({
        done: !done,
      }),
      method: "PATCH",
    });
    mutateSWR("/api/task");
  };

  const remove = async (id: string | ObjectId) => {
    await fetch(`/api/task/${id}`, {
      method: "DELETE",
    });
    mutateSWR("/api/task");
  };

  return (
    <>
      <div>
        <button onClick={() => markAsDone(id, done)}>{done ? "☑" : "☐"}</button>{" "}
        <button onClick={() => remove(id)}>🗑</button> {text}
      </div>
    </>
  );
};
