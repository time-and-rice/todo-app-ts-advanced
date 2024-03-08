import {
  DeleteTaskDocument,
  GetTasksDocument,
  TaskItemFragment,
  ToggleTaskCompletedDocument,
} from "@/generated/graphql";
import { useMutation } from "@apollo/client";
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <input type="checkbox" checked={task.completed} onChange={onChangeCompleted} />
      <div>{task.title}</div>
      <button onClick={() => setIsEdit(true)}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}
