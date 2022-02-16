import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import type { RootState } from 'types';
import axiosClient from 'services/api';
import REQUEST_STATUS from 'constants/REQUEST_STATUS';

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.userId - a.userId,
});

const initialState = postsAdapter.getInitialState({
  status: REQUEST_STATUS.IDLE,
  error: null,
} as {
  status: REQUEST_STATUS;
  error?: string | null;
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axiosClient.get('/posts');
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
});

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost: { title: string; body: string; userId: number }) => {
    try {
      const response = await axiosClient.post('/posts', initialPost);
      return response.data;
    } catch (error) {
      throw new Error(error as string);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated(state, action) {
      const { id, title, body } = action.payload;
      const existingPost = state.entities[id];
      if (existingPost) {
        existingPost.title = title;
        existingPost.body = body;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = REQUEST_STATUS.LOADING;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne);
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors<RootState>((state) => state.posts);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (_, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);

export default postsSlice.reducer;
