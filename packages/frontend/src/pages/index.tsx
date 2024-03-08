import { TaskCreateForm } from "@/components/TaskCreateForm";
import { TaskList } from "@/components/TaskList";
import { TaskListFooter } from "@/components/TaskListFooter";

export default function Home() {
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
        <TaskList />
        <TaskListFooter />
      </div>
    </div>
  );
}
