import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../utility/http/baseUrl";
import { Toastify } from "../../utility/toastify/toastContainer";

export const getTask = createAsyncThunk(
    "task/getTask",
    async () => {

        try {
            const response = await http.get("/task");
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            Toastify({ data: "error", msg: error.response.data.message });
            return false
        }
    }
);
export const createTask = createAsyncThunk(
    "task/createTask",
    async (data, { dispatch }) => {

        try {
            const response = await http.post("/task/create", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200) {
                dispatch(getTask())
                return response.data;

            }
        } catch (error) {
            Toastify({ data: "error", msg: error.response.data.message });
            return false
        }
    }
);
export const updateTask = createAsyncThunk(
    "task/updateTask",
    async (newData, { dispatch }) => {
        const { data, id } = newData
        try {
            const response = await http.patch(`/task/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200) {
                dispatch(getTask())
                return response.data;

            }
        } catch (error) {
            Toastify({ data: "error", msg: error.response.data.message });
            return false
        }
    }
);
export const deleteTask = createAsyncThunk(
    "task/deleteTask",
    async (id, { dispatch }) => {

        try {
            const response = await http.delete(`/task/${id}`);
            if (response.status === 200) {
                dispatch(getTask())
                return response.data;

            }
        } catch (error) {
            Toastify({ data: "error", msg: error.response.data.message });
            return false
        }
    }
);
export const getParticular = createAsyncThunk(
    "task/getParticular",
    async (id) => {

        try {
            const response = await http.get(`/task/${id}`);
            if (response.status === 200) {

                return response.data;

            }
        } catch (error) {
            Toastify({ data: "error", msg: error.response.data.message });
            return false
        }
    }
);







const taskSlice = createSlice({
    name: "task",
    initialState: {
        getOne: null,
        data: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //  getTask
            .addCase(getTask.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getTask.fulfilled, (state, action) => {

                if (action.payload.success === true) {
                    state.data = action.payload.data
                }
                state.loading = false;
            })
            .addCase(getTask.rejected, (state, action) => {
                state.loading = false;
            })
            //  createTask
            .addCase(createTask.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createTask.fulfilled, (state, action) => {

                if (action.payload.success === true) {
                    Toastify({ data: "success", msg: action.payload.message });
                }
                state.loading = false;
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false;
            })
            // updateTask
            .addCase(updateTask.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateTask.fulfilled, (state, action) => {

                if (action.payload.success === true) {
                    state.getOne = null
                    Toastify({ data: "success", msg: action.payload.message });
                }
                state.loading = false;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
            })
            // delete
            .addCase(deleteTask.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {

                if (action.payload.success === true) {
                    Toastify({ data: "success", msg: action.payload.message });
                }
                state.loading = false;
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
            })
            // get one 
            .addCase(getParticular.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getParticular.fulfilled, (state, action) => {
                console.log(
                    " action"
                    , action);
                if (action.payload.success === true) {
                    state.getOne = action.payload.data
                }
                state.loading = false;
            })
            .addCase(getParticular.rejected, (state, action) => {
                state.loading = false;
            })




    },
});
export default taskSlice.reducer;
