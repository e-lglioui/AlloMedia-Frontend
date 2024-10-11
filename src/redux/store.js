// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice'; // Change this line

const store = configureStore({
    reducer: { // Make sure to use 'reducer' here
        counter: counterReducer,
    },
});

export default store;
