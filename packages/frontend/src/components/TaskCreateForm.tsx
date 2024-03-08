import { CreateTaskDocument, GetTasksDocument } from "@/generated/graphql";
import { useMutation } from "@apollo/client";
import { Form, Input } from "antd/lib";

type FieldType = {
  title: string;
};

export function TaskCreateForm() {
  const [form] = Form.useForm();

  const [createTask] = useMutation(CreateTaskDocument, {
    refetchQueries: [GetTasksDocument],
  });

  const onFinish = async (v: FieldType) => {
    await createTask({
      variables: v,
    });
    form.resetFields();
  };

  return (
    <Form form={form} className="min-w-80" onFinish={onFinish}>
      <Form.Item<FieldType> name="title" rules={[{ required: true }]} className="!mb-0">
        <Input />
      </Form.Item>
    </Form>
  );
}
