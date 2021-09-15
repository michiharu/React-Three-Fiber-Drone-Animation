import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import ThreeModule from './modules/three/module';


export const rootReducer = combineReducers({
  three: ThreeModule.reducer,
});

export type RootState = ReturnType<typeof rootReducer>

export const setupStore = () => {
  const middlewares = getDefaultMiddleware({thunk: false});

  const store = configureStore({
      reducer: rootReducer,
      middleware: middlewares,
  });

  return store
}