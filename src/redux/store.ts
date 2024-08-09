import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

// Определение интерфейса для данных репозитория
interface Repo {
    id: number;
    name: string;
    language: string;
    forks_count: number;
    stargazers_count: number;
    updated_at: string;
}

// Определение интерфейса для состояния хранилища
interface ReposState {
    repos: Repo[];
    status: string;
    total_count: number,
}

// Начальное состояние
const initialState: ReposState = {
    repos: [],
    status: 'idle',
    total_count: 0,
};

// Thunk для поиска репозиториев
export const fetchRepos = createAsyncThunk('repos/fetchRepos', async ({ query, sort, direction }: { query: string; sort: string; direction: 'asc' | 'desc' }) => {
    const response = await axios.get(`https://api.github.com/search/repositories?q=${query}&sort=${sort}&order=${direction}`);
    return response.data.items;
});

const reposSlice = createSlice({
    name: 'repos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRepos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRepos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.repos = action.payload;
            })
            .addCase(fetchRepos.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

const store = configureStore({
    reducer: {
        repos: reposSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
