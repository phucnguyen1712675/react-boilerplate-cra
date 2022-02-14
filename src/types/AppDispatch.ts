import store from 'store/configureStore';

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch;

export default AppDispatch;
