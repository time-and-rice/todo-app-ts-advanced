import { CreateTaskDocument, GetTasksDocument } from "@/generated/graphql";
import { useTextInput } from "@/hooks/useTextInput";
import { gql, useMutation } from "@apollo/client";
import { FormEvent } from "react";

gql`
  mutation createTask($title: String!) {
    createTask(title: $title) {
      id
    }
  }
`;

export function TaskCreateForm() {
  const [createTask] = useMutation(CreateTaskDocument, {
    refetchQueries: [GetTasksDocument],
  });

  const titleInput = useTextInput();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createTask({
      variables: { title: titleInput.value },
    });
    titleInput.set("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" {...titleInput.bind} />
      <button type="submit" style={{ marginLeft: "8px" }}>
        Post
      </button>
    </form>
  );
}
