import { TaskListFilterState, taskListFilterState } from "@/recoil/atoms/taskListFilterState";
import { Button, Space } from "antd/lib";
import { useCallback } from "react";
import { useRecoilState } from "recoil";

export function TaskListFooter() {
  const [taskListFilter, setTaskListFilter] = useRecoilState(taskListFilterState);

  const getButtonType = useCallback(
    (filter: TaskListFilterState) => {
      return filter === taskListFilter ? "primary" : "default";
    },
    [taskListFilter],
  );

  return (
    <Space>
      <Button type={getButtonType("ALL")} onClick={() => setTaskListFilter("ALL")}>
        All
      </Button>
      <Button type={getButtonType("ACTIVE")} onClick={() => setTaskListFilter("ACTIVE")}>
        Active
      </Button>
      <Button type={getButtonType("COMPLETED")} onClick={() => setTaskListFilter("COMPLETED")}>
        Completed
      </Button>
    </Space>
  );
}
