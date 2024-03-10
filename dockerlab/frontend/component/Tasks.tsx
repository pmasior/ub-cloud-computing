"use client";

import { fetcher } from "@/lib/swr/fetcher";
import useSWR from "swr";
import { Task } from "./Task";

export const Tasks = () => {
  const { data: tasks } = useSWR<
    { _id: string; text: string; done: boolean }[]
  >("/api/task", fetcher);

  return (
    tasks &&
    tasks.map((task) => (
      <Task
        key={`task_${task._id.toString()}`}
        text={task.text}
        done={task.done}
        id={task._id.toString()}
      />
    ))
  );
};
