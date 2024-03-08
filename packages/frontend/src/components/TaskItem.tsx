import {
  DeleteTaskDocument,
  GetTasksDocument,
  TaskItemFragment,
  ToggleTaskCompletedDocument,
} from "@/generated/graphql";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons/lib";
import { useMutation } from "@apollo/client";
import { Button, Checkbox, Flex } from "antd/lib";
import { useState } from "react";
import { TaskUpdateForm } from "./TaskUpdateForm";

type TaskItemProps = {
  task: TaskItemFragment;
};

export function TaskItem({ task }: TaskItemProps) {
  const [isEdit, setIsEdit] = useState(false);

  const [toggleTaskCompleted] = useMutation(ToggleTaskCompletedDocument, {
    variables: { taskId: task.id },
  });

  const [deleteTask] = useMutation(DeleteTaskDocument, {
    variables: { taskId: task.id },
    refetchQueries: [GetTasksDocument],
  });

  const onChangeCompleted = async () => {
    await toggleTaskCompleted();
  };

  const onDelete = async () => {
    await deleteTask();
  };

  return isEdit ? (
    <TaskUpdateForm task={task} onSubmit={() => setIsEdit(false)} onCancel={() => setIsEdit(false)} />
  ) : (
    <Flex align="center" justify="space-between" className="min-w-80">
      <Flex gap="small">
        <Checkbox checked={task.completed} onChange={onChangeCompleted} />
        <div>{task.title}</div>
      </Flex>

      <Flex gap="small">
        <Button size="small" onClick={() => setIsEdit(true)}>
          <EditOutlined />
        </Button>
        <Button size="small" onClick={onDelete}>
          <DeleteOutlined />
        </Button>
      </Flex>
    </Flex>
  );
}
