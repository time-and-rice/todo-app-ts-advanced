import { getFragmentData } from "@/generated";
import { GetTasksDocument, TaskItemFragmentDoc } from "@/generated/graphql";
import { taskListFilterState } from "@/recoil/atoms/taskListFilterState";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { useRecoilState } from "recoil";
import { TaskItem } from "./TaskItem";

export function TaskList() {
  const [taskListFilter] = useRecoilState(taskListFilterState);

  const { data } = useQuery(GetTasksDocument);

  const tasks = useMemo(() => {
    return getFragmentData(TaskItemFragmentDoc, data?.tasks) || [];
  }, [data?.tasks]);

  const filteredTasks = useMemo(() => {
    switch (taskListFilter) {
      case "ALL":
        return tasks;
      case "ACTIVE":
        return tasks.filter((t) => !t.completed);
      case "COMPLETED":
        return tasks.filter((t) => t.completed);
    }
  }, [taskListFilter, tasks]);

  return (
    <>
      {filteredTasks.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {filteredTasks.map((t) => (
            <TaskItem key={t.id} task={t} />
          ))}
        </div>
      ) : null}
    </>
  );
}
