import { configureStore } from '@reduxjs/toolkit';

import usersReducer from 'store/usersSlice';
import postsReducer from 'store/postsSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
  },
});

export default store;
