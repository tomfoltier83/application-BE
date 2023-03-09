import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "node",
  initialState: {
    score: 0,
    question: 0
  },
  reducers: {
    setEmail: (state, action) => {
      state["email"] = action.payload
    },
    setScore: (state, action) => {
      state["score"]++
    },
    setQuestion: (state, action) => {
      state.question++
    },
    resetAll: (state, action) => {
      state.score = 0
      state.question = 0
    }
  },
});

export const { setScore, setQuestion, resetAll } = userSlice.actions;

export const store = configureStore({
  reducer: {
    userInformations: userSlice.reducer,
  },
});