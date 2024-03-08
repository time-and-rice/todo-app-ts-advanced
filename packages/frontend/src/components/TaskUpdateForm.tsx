import { TaskItemFragment, UpdateTaskDocument } from "@/generated/graphql";
import { useTextInput } from "@/hooks/useTextInput";
import { useMutation } from "@apollo/client";
import { FormEvent } from "react";

type TaskUpdateFormProps = {
  task: TaskItemFragment;
  onSubmit: () => void;
  onCancel: () => void;
};

export function TaskUpdateForm({ task, onSubmit, onCancel }: TaskUpdateFormProps) {
  const [updateTask] = useMutation(UpdateTaskDocument);

  const titleInput = useTextInput(task.title);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateTask({
      variables: { taskId: task.id, title: titleInput.value },
    });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" {...titleInput.bind} />
      <button type="submit" style={{ marginLeft: "8px" }}>
        Post
      </button>
      <button type="submit" style={{ marginLeft: "8px" }} onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}
