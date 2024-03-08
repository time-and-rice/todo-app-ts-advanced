import { atom } from "recoil";

export type TaskListFilterState = "ALL" | "ACTIVE" | "COMPLETED";

export const taskListFilterState = atom<TaskListFilterState>({
  key: "taskListFilterState",
  default: "ALL",
});
