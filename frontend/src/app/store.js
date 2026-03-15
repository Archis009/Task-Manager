import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import tasksReducer from '../features/tasks/tasksSlice';
import projectsReducer from '../features/projects/projectsSlice';
import authReducer from '../features/auth/authSlice';

const customStorage = {
  getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key, item) => {
    window.localStorage.setItem(key, item);
    return Promise.resolve();
  },
  removeItem: (key) => {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
};
const rootReducer = combineReducers({
  tasks: tasksReducer,
  projects: projectsReducer,
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  version: 2,
  storage: customStorage,
  migrate: (state) => {
    if (state && state._persist && state._persist.version < 2) {
      // Clear old tags from persisted tasks
      if (state.tasks && state.tasks.entities) {
        const entities = { ...state.tasks.entities };
        Object.keys(entities).forEach((id) => {
          entities[id] = { ...entities[id], tags: [] };
        });
        state = {
          ...state,
          tasks: { ...state.tasks, entities },
        };
      }
    }
    return Promise.resolve(state);
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
