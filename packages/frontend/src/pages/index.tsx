import { gql, useQuery } from "@apollo/client";
import { TaskCreateForm } from "@/components/TaskCreateForm";
import { TaskItem } from "@/components/TaskItem";
import { GetTasksDocument, TaskItemFragmentDoc } from "@/generated/graphql";
import { getFragmentData } from "@/generated";
import { useMemo } from "react";

gql`
  query getTasks {
    tasks {
      id
      ...TaskItem
    }
  }
`;

export default function Home() {
  const { data } = useQuery(GetTasksDocument);

  const tasks = useMemo(() => {
    return getFragmentData(TaskItemFragmentDoc, data?.tasks);
  }, [data?.tasks]);

  return (
    <div
      style={{
        width: "640px",
        margin: "0 auto",
      }}
    >
      <h1>Todo app</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TaskCreateForm />

        {tasks && tasks.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {tasks.map((t) => (
              <TaskItem key={t.id} task={t} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
