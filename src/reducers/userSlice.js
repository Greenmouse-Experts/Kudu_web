import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { data: null, currencies: null },
    reducers: {
        setKuduUser(state, action) {
            state.data = action.payload;
        },

        setCurrencyData(state, action) {
            state.currencies = action.payload;
        },
    },
});

export const { setKuduUser, setCurrencyData } = userSlice.actions;
export default userSlice.reducer;
