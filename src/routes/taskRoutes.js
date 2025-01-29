import express from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/TaskController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Criar uma nova tarefa
router.post("/tasks", authMiddleware, createTask);

// Obter todas as tarefas do usuário autenticado
router.get("/tasks-user", authMiddleware, getTasks);

// Atualizar uma tarefa
router.put("/update-task/:id", authMiddleware, updateTask);

// Deletar uma tarefa
router.delete("/delete-task/:id", authMiddleware, deleteTask);

export default router;
