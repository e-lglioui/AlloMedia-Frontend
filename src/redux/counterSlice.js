// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 3,
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        // Additional reducers can be added here
    },
});

// Export the actions and the reducer
export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer; // This is important to export the reducer
