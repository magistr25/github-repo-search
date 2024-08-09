import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
    total_count: number;
}

// Начальное состояние
const initialState: ReposState = {
    repos: [] as Repo[],  // Ensure it's an array
    status: 'idle',
    total_count: 0,
};

// Thunk для поиска репозиториев
export const fetchRepos = createAsyncThunk(
    'repos/fetchRepos',
    async ({ query, sort, direction, page, rowsPerPage }:
               { query: string, sort: string, direction: 'asc' | 'desc', page: number, rowsPerPage: number }) => {
        const response = await axios.get(`https://api.github.com/search/repositories`, {
            params: {
                q: query,
                sort: sort,
                order: direction,
                per_page: rowsPerPage,
                page: page + 1,  // GitHub API 1-based page indexing
            },
            headers: {
                authorization: `token TOKEN`,
            },
        });
        return { items: response.data.items, total_count: response.data.total_count };
    }
);

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
                state.repos = action.payload.items || [];  // Ensure it defaults to an empty array if no items
                state.total_count = action.payload.total_count;
            })
            .addCase(fetchRepos.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default reposSlice.reducer;
