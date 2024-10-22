import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the task interface
interface Task {
  id: string;
  name: string;
  done: boolean;
}

// Define the initial state for tasks
interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

// Create a Redux slice for managing tasks
export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: Task = {
        id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
        name: action.payload,
        done: false,
      };
      state.tasks.push(newTask);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.done = !task.done;
      }
    },
    editTask: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.name = action.payload.name;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

// Export the actions for tasks
export const { addTask, toggleTask, editTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
