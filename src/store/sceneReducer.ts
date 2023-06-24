import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  revolve: false,
  rotate: true,
};

const sceneSlice = createSlice({
  name: "scene",
  initialState,
  reducers: {},
});

export default sceneSlice;
