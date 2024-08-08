import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Repository, RepositoryState } from '../../types';

import axios from 'axios';

export const fetchRepositories = createAsyncThunk(
  'repositories/fetchRepositories',
  async (searchQuery: string) => {
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&order=desc`
    );
    return response.data.items as Repository[];
  }
);

const initialState: RepositoryState = {
  repositories: [],
  status: 'idle',
  error: null,
  searchQuery: '',
};

const repositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchRepositories.fulfilled,
        (state, action: PayloadAction<Repository[]>) => {
          state.status = 'succeeded';
          state.repositories = action.payload;
        }
      )
      .addCase(fetchRepositories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setSearchQuery } = repositorySlice.actions;
export default repositorySlice.reducer;
