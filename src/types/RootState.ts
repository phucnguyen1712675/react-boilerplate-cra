import store from 'store/configureStore';

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;

export default RootState;
