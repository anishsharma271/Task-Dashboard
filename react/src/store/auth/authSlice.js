import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../utility/http/baseUrl";
import { Toastify } from "../../utility/toastify/toastContainer";

export const signUp = createAsyncThunk(
    "auth/signUp",
    async (data, { dispatch }) => {
        const { confirmPassword, ...rest } = data
        const newData = rest
        try {
            const response = await http.post("/user/signUP", newData);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            Toastify({ data: "error", msg: error.response.data.message });
            return false
        }
    }
);

export const signIn = createAsyncThunk(
    "auth/signIn",
    async (data, { dispatch }) => {
        try {
            const response = await http.post("/user/signIn", data);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            Toastify({ data: "error", msg: error.response.data.message })
            return false

        }
    }
);





const authSlice = createSlice({
    name: "auth",
    initialState: {

        User: [],
        token: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //  signUp
            .addCase(signUp.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
            })

            //signIn
            .addCase(signIn.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(signIn.fulfilled, (state, action) => {

                if (action.payload !== false) {
                    localStorage.setItem("token", action.payload.data.token);
                    state.token = action.payload.data.token;
                }

                state.loading = false;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;
            })


    },
});
export default authSlice.reducer;
