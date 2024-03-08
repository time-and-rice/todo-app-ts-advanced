import { useState, ChangeEvent } from "react";
import { gql, useMutation } from "@apollo/client";
import { TaskUpdateForm } from "./TaskUpdateForm";
import {
  DeleteTaskDocument,
  GetTasksDocument,
  TaskItemFragment,
  ToggleTaskCompletedDocument,
} from "@/generated/graphql";

gql`
  fragment TaskItem on Task {
    id
    title
    completed
  }
`;

gql`
  mutation toggleTaskCompleted($taskId: Int!) {
    toggleTaskCompleted(taskId: $taskId) {
      id
      completed
    }
  }
`;

gql`
  mutation deleteTask($taskId: Int!) {
    deleteTask(taskId: $taskId) {
      id
    }
  }
`;

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
    <TaskUpdateForm
      task={task}
      onSubmit={() => setIsEdit(false)}
      onCancel={() => setIsEdit(false)}
    />
  ) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onChangeCompleted}
      />
      <div>{task.title}</div>
      <button onClick={() => setIsEdit(true)}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}
