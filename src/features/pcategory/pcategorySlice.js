import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import pCategoryService from "./pcategoryService";

export const getCategories = createAsyncThunk(
  "productCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await pCategoryService.getProductCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createpCategory = createAsyncThunk(
  "productCategory/create-pCategory",
  async (categoryData, thunkAPI) => {
    try {
      return await pCategoryService.createpCategory(categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getpCategoryById = createAsyncThunk(
  "pCategory/get-pCategory",
  async (id, thunkAPI) => {
    try {
      return await pCategoryService.getPCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updatepCategory = createAsyncThunk(
  "pCategory/update-pCategory",
  async (pCategoryData, thunkAPI) => {
    try {
      return await pCategoryService.updatePCategory(pCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deletepCategory = createAsyncThunk(
  "pCategory/delete-pCategory",
  async (id, thunkAPI) => {
    try {
      return await pCategoryService.deletePCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  pCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const pCategoriesSlice = createSlice({
  name: "pCategories",
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
        state.pCategories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createpCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createpCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCategory = action.payload;
      })
      .addCase(createpCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getpCategoryById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getpCategoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pCategoryName = action.payload.title;
      })
      .addCase(getpCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updatepCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatepCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pCategoryUpdate = action.payload.title;
      })
      .addCase(updatepCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deletepCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletepCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletePCategory = action.payload;
      })
      .addCase(deletepCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default pCategoriesSlice.reducer;
