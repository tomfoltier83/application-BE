import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "node",
  initialState: {
    email: "test@test.com",
    score: 0,
    question: 0
  },
  reducers: {
    setEmail: (state, action) => {
      state["email"] = action.payload
    },
    setScore: (state, action) => {
      state["score"] ++
    },
    setQuestion: (state, action) => {
      state.question ++
    }
  },
});

export const { setEmail, setScore, setQuestion } = userSlice.actions;

export const store = configureStore({
  reducer: {
    userInformations: userSlice.reducer,
  },
});