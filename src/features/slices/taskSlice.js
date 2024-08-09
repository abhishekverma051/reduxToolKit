 import { createSlice,nanoid } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: nanoid(),
        text: action.payload.text,
        completed: false,
      });
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    editTask:(state,action)=>{
       
        const {id,text} = action.payload;
        const task = state.tasks.find(task => task.id===id)
        if (task){
            task.text = text
        }

    },
    importantTask : (state,action)=>{

    }
  },
});

export const { addTask, removeTask, toggleTask,editTask } = taskSlice.actions;
export default taskSlice.reducer;
