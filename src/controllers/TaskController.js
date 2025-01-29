import TaskRepository from "../repositories/TaskRepository.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const userId = req.user.id;

    if (!title) return res.status(400).json({ message: "Título é obrigatório." });

    const task = await TaskRepository.createTask({ title, description, priority, userId });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar tarefa.", error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskRepository.getTasksByUserId(req.user.id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar tarefas.", error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await TaskRepository.updateTask(id, { ...req.body, userId: req.user.id });

    if (!updatedTask) return res.status(404).json({ message: "Tarefa não encontrada." });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar tarefa.", error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await TaskRepository.deleteTask(id, req.user.id);

    if (!deleted) return res.status(404).json({ message: "Tarefa não encontrada." });

    res.status(200).json({ message: "Tarefa excluída com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir tarefa.", error: error.message });
  }
};
