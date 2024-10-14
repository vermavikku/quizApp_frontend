import {configureStore} from '@reduxjs/toolkit'
import {persistStore} from 'redux-persist'
import {authApi} from './authApi'
import {topicApi} from './topicApi'
import {usersApi} from './usersApi'
import {questionApi} from './questionApi'
import {resultApi} from './resultApi'


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [topicApi.reducerPath]: topicApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [questionApi.reducerPath]: questionApi.reducer,
    [resultApi.reducerPath]: resultApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'authApi/executeMutation/fulfilled'],
        ignoredActionPaths: ['meta.baseQueryMeta.request', 'meta.baseQueryMeta.response'],
        ignoredPaths: ['meta.baseQueryMeta.request', 'meta.baseQueryMeta.response'],
      },
    }).concat(
      authApi.middleware,
      topicApi.middleware,
      usersApi.middleware,
      questionApi.middleware,
      resultApi.middleware,
    ),
})

export const persistor = persistStore(store)
