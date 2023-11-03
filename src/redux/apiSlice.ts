import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: "idle",
  error: null,
};

export const fetchData = createAsyncThunk("api/fetchData", async () => {
  const response = await axios.get(import.meta.env.VITE_API);
  return response.data;
});

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = "idle";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = "idle";
        // @ts-ignore
        state.error = action.error.message;
      });
  },
});

export const selectData = (state: { api: { data: any; }; }) => state.api.data;

export default apiSlice.reducer;
