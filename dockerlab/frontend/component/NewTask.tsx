"use client";

import { useSWRConfig } from "swr";

export const NewTask = () => {
  const { mutate: mutateSWR } = useSWRConfig();
  const create = async (formData: FormData) => {
    await fetch(`/api/task`, {
      body: JSON.stringify({
        text: formData.get("text"),
        done: false,
      }),
      method: "POST",
    });
    mutateSWR("/api/task");
  };

  return (
    <>
      <form action={create}>
        <input type="text" name="text" />

        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
