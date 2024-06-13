import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

const currentTurnSlice = createSlice({
  name: "current-turn",
  initialState: 0,
  reducers: {
    setNextTurn: (state, action: PayloadAction<number>) => {
      return action.payload;
    },
  },
});

const scoresSlice = createSlice({
  name: "score",
  initialState: [0, 0, 0, 0],
  reducers: {
    setScores: (state, action: PayloadAction<number>) => {
      state[action.payload]++;
    },
    setInitial: () => {
      return [0, 0, 0, 0];
    },
  },
});

export const store = configureStore({
  reducer: {
    currentTurn: currentTurnSlice.reducer,
    scoresSlice: scoresSlice.reducer,
  },
});
export const { setNextTurn } = currentTurnSlice.actions;
export const { setScores, setInitial } = scoresSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
