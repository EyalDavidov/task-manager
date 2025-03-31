import { getToken } from "../services/authService";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import * as taskService from "../services/taskService";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
};

type Subtask = {
  id: number;
  title: string;
  status: string;
  due_date: string;
};

type TaskContextType = {
  tasks: Task[];
  subtasks: Record<number, Subtask[]>;
  fetchTasks: () => void;
  addTask: (data: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  getSubtasks: (taskId: number) => Promise<void>;
  addSubtask: (taskId: number, data: Partial<Subtask>) => Promise<void>;
  deleteSubtask: (taskId: number, subtaskId: number) => Promise<void>;
};

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [subtasks, setSubtasks] = useState<Record<number, Subtask[]>>({});

  const fetchTasks = async () => {
    try {
      const res = await taskService.getTasks();
      setTasks(res.data);
    } catch {
      alert("Failed to load tasks");
    }
  };

  const addTask = async (data: Partial<Task>) => {
    try {
      await taskService.addTask(
        data as {
          title: string;
          description?: string;
          status: string;
          due_date?: string;
        }
      );

      fetchTasks();
    } catch {
      alert("Failed to add task");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await taskService.deleteTask(id);
      fetchTasks();
    } catch {
      alert("Failed to delete task");
    }
  };

  const getSubtasks = async (taskId: number) => {
    try {
      const res = await taskService.getSubtasks(taskId);
      setSubtasks((prev) => ({ ...prev, [taskId]: res.data }));
    } catch {
      alert("Failed to load subtasks");
    }
  };

  const addSubtask = async (taskId: number, data: Partial<Subtask>) => {
    try {
      await taskService.addSubtask(taskId, data);
      getSubtasks(taskId);
    } catch {
      alert("Failed to add subtask");
    }
  };

  const deleteSubtask = async (taskId: number, subtaskId: number) => {
    try {
      await taskService.deleteSubtask(taskId, subtaskId);
      getSubtasks(taskId);
    } catch {
      alert("Failed to delete subtask");
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchTasks();
    }
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        subtasks,
        fetchTasks,
        addTask,
        deleteTask,
        getSubtasks,
        addSubtask,
        deleteSubtask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};
