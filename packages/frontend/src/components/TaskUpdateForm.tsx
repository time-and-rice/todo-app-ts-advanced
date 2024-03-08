import { TaskItemFragment, UpdateTaskDocument } from "@/generated/graphql";
import { useMutation } from "@apollo/client";
import { Form, Input } from "antd/lib";

type FieldType = {
  title: string;
};

type TaskUpdateFormProps = {
  task: TaskItemFragment;
  onSubmit: () => void;
};

export function TaskUpdateForm({ task, onSubmit }: TaskUpdateFormProps) {
  const [updateTask] = useMutation(UpdateTaskDocument);

  const onFinish = async (v: FieldType) => {
    await updateTask({
      variables: { taskId: task.id, title: v.title },
    });
    onSubmit();
  };

  return (
    <Form
      className="min-w-80"
      initialValues={{
        title: task.title,
      }}
      onFinish={onFinish}
    >
      <Form.Item<FieldType> name="title" rules={[{ required: true }]} className="!mb-0">
        <Input />
      </Form.Item>
    </Form>
  );
}
