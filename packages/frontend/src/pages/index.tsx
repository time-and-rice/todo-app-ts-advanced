import { TaskCreateForm } from "@/components/TaskCreateForm";
import { TaskList } from "@/components/TaskList";
import { TaskListFooter } from "@/components/TaskListFooter";
import { Layout, Space, Typography } from "antd/lib";

export default function Home() {
  return (
    <Layout className="!min-h-dvh">
      <Layout.Content className="mx-auto">
        <Typography.Title>Todo app</Typography.Title>

        <Space direction="vertical">
          <TaskCreateForm />
          <TaskList />
          <TaskListFooter />
        </Space>
      </Layout.Content>
    </Layout>
  );
}
