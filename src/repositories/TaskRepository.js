import Task from "../models/Task.js";

class TaskRepository {
  async createTask({ title, description, priority, userId }) {
    return await Task.create({ title, description, priority, userId });
  }

  async getTasksByUserId(userId) {
    return await Task.findAll({ where: { userId } });
  }

  async getTaskById(id, userId) {
    return await Task.findOne({ where: { id, userId } });
  }

  async updateTask(id, { title, description, priority, completed, userId }) {
    const task = await Task.findOne({ where: { id, userId } });
    if (!task) return null;

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.priority = priority ?? task.priority;
    task.completed = completed ?? task.completed;

    await task.save();
    return task;
  }

  async deleteTask(id, userId) {
    return await Task.destroy({ where: { id, userId } });
  }
}

export default new TaskRepository();
