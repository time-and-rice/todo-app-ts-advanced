import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

export const Task = objectType({
  name: "Task",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.boolean("completed");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });
  },
});

export const TaskQuery = extendType({
  type: "Query",

  definition(t) {
    t.nonNull.list.nonNull.field("tasks", {
      type: Task,
      resolve(_root, _args, ctx) {
        return ctx.db.task.findMany({
          orderBy: { createdAt: "desc" },
        });
      },
    });
  },
});

export const TaskMutation = extendType({
  type: "Mutation",

  definition(t) {
    t.nonNull.field("createTask", {
      type: "Task",
      args: {
        title: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.task.create({
          data: { title: args.title },
        });
      },
    });

    t.nonNull.field("updateTask", {
      type: "Task",
      args: {
        taskId: nonNull(intArg()),
        title: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.task.update({
          where: { id: args.taskId },
          data: { title: args.title },
        });
      },
    });

    t.nonNull.field("deleteTask", {
      type: "Task",
      args: {
        taskId: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.task.delete({
          where: { id: args.taskId },
        });
      },
    });

    t.nonNull.field("toggleTaskCompleted", {
      type: "Task",
      args: {
        taskId: nonNull(intArg()),
      },
      async resolve(_root, args, ctx) {
        const task = await ctx.db.task.findUniqueOrThrow({
          where: { id: args.taskId },
        });
        return ctx.db.task.update({
          where: { id: args.taskId },
          data: { completed: !task.completed },
        });
      },
    });
  },
});
