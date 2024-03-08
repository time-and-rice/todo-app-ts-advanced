import { taskListFilterState } from "@/recoil/atoms/taskListFilterState";
import { useRecoilState } from "recoil";

export function TaskListFooter() {
  const [, setTaskListFilter] = useRecoilState(taskListFilterState);

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
      }}
    >
      <button onClick={() => setTaskListFilter("ALL")}>All</button>
      <button onClick={() => setTaskListFilter("ACTIVE")}>Active</button>
      <button onClick={() => setTaskListFilter("COMPLETED")}>Completed</button>
    </div>
  );
}
