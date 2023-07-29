import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const tasksAdapter = createEntityAdapter();

const initialState = tasksAdapter.getInitialState({
    tasksLoadingStatus: 'loading'
});

const tasksSlice = createSlice(
    {
        name: 'tasks',
        initialState,
        reducers: {
            authTokenExp: state => {state.tasksLoadingStatus = 'idle'},
            tasksFetching: state => {state.tasksLoadingStatus = 'loading'},
            tasksFetched: (state, action) => {
                state.tasksLoadingStatus = 'idle';
                // state.heroes = action.payload;
                tasksAdapter.setAll(state, action.payload);
            },
            tasksFetchingError: state => {
                state.tasksLoadingStatus ='error';
            },
            addTask: (state, action) => {
                // state.heroes.push(action.payload);
                tasksAdapter.addOne(state, action.payload)
                state.tasksLoadingStatus = 'idle';
            },
            editTask: (state, action) => {
                // tasksAdapter.addOne(state, action.payload)
                tasksAdapter.updateOne(state, action.payload);
                state.tasksLoadingStatus = 'idle';
            },
            removeTask: (state, action) => {
                // state.heroes = action.payload;
                tasksAdapter.setAll(state, action.payload);
                state.tasksLoadingStatus ='idle';
            }
        }
    }
);


const {actions, reducer} = tasksSlice;

export default reducer;

export const {selectAll} = tasksAdapter.getSelectors(state => state.tasks)

export const {
    tasksFetching,
    authTokenExp,
    tasksFetched,
    tasksFetchingError,
    addTask,
    editTask,
    removeTask
} = actions;