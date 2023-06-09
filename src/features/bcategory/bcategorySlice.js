import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bCategoryService from "./bcategoryService";

export const getCategories = createAsyncThunk(
  "blogCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await bCategoryService.getBlogCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createBCategory = createAsyncThunk(
  "blogCategory/create-blogCategory",
  async (bCategoryData, thunkAPI) => {
    try {
      return await bCategoryService.createBCategory(bCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateBCategory = createAsyncThunk(
  "blogCategory/update-blogCategory",
  async (categoryData, thunkAPI) => {
    try {
      return await bCategoryService.updateBCategory(categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getBCategoryById = createAsyncThunk(
  "blogCategory/get-blogCategory",
  async (id, thunkAPI) => {
    try {
      return await bCategoryService.getBCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteBCategory = createAsyncThunk(
  "blogCategory/delete-blogCategory",
  async (id, thunkAPI) => {
    try {
      return await bCategoryService.deleteBCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  bCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const bCategoriesSlice = createSlice({
  name: "bCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bCategories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBCategory = action.payload;
      })
      .addCase(createBCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getBCategoryById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBCategoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryName = action.payload.title;
      })
      .addCase(getBCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateBCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryUpdate = action.payload.title;
      })
      .addCase(updateBCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteBCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleteCategory = action.payload;
      })
      .addCase(deleteBCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default bCategoriesSlice.reducer;
