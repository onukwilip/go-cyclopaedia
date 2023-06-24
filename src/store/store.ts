import { configureStore } from "@reduxjs/toolkit";
import sceneSlice from "./sceneReducer";

const store = configureStore({
  reducer: {
    scene: sceneSlice.reducer,
  },
});

export default store;
