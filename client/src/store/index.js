import {configureStore} from '@reduxjs/toolkit';
import tasks from '../components/ListItem/ListItemSlice';

const store = configureStore({
    reducer: {tasks},
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;