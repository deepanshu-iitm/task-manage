import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskState } from '../types/task';

const loadTasksFromStorage = (): Task[] => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToStorage = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const initialState: TaskState = {
  tasks: loadTasksFromStorage(),
  filter: {
    status: null,
    priority: null,
    sortBy: 'date',
    sortOrder: 'desc',
  },
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const newTask: Task = {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
      saveTasksToStorage(state.tasks);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
        saveTasksToStorage(state.tasks);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToStorage(state.tasks);
    },
    reorderTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      saveTasksToStorage(state.tasks);
    },
    setFilter: (state, action: PayloadAction<Partial<TaskState['filter']>>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

export const { addTask, updateTask, deleteTask, reorderTasks, setFilter } = taskSlice.actions;
export default taskSlice.reducer;