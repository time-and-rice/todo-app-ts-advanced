import { atom } from "recoil";

type TaskListFilterState = "ALL" | "ACTIVE" | "COMPLETED";

export const taskListFilterState = atom<TaskListFilterState>({
  key: "taskListFilterState",
  default: "ALL",
});
