import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Repo {
    id: number;
    name: string;
    language: string;
    forks_count: number;
    stargazers_count: number;
    updated_at: string;
}

interface ReposState {
    repos: Repo[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    total_count: number;
    searchQuery: string;
    page: number;
    rowsPerPage: number;
    sortField: 'name' | 'stargazers_count' | 'forks_count' | 'updated_at';
    sortDirection: 'asc' | 'desc';
    error: string | null;
}

const initialState: ReposState = {
    repos: [],
    status: 'idle',
    total_count: 0,
    searchQuery: '',
    page: 0,
    rowsPerPage: 10,
    sortField: 'name',
    sortDirection: 'asc',
    error: null,
};

// Thunk для поиска репозиториев
export const fetchRepos = createAsyncThunk(
    'repos/fetchRepos',
    async ({ query, sort, direction, page, rowsPerPage }:
               { query: string, sort: string, direction: 'asc' | 'desc', page: number, rowsPerPage: number },
           { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://api.github.com/search/repositories`, {
                params: {
                    q: query,
                    sort: sort !== 'name' ? sort : undefined, // Убираем sort, если сортировка по name
                    order: direction,
                    per_page: rowsPerPage,
                    page: page + 1,
                },
                headers: {
                    Accept: 'application/vnd.github+json',
                    'User-Agent': 'magistr25'
                },
            });

            return { items: response.data.items, total_count: response.data.total_count };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || 'Ошибка при запросе к GitHub API');
            } else {
                return rejectWithValue('Произошла неизвестная ошибка');
            }
        }
    }
);

const reposSlice = createSlice({
    name: 'repos',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            state.page = 0;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setRowsPerPage: (state, action: PayloadAction<number>) => {
            state.rowsPerPage = action.payload;
            state.page = 0;
        },
        setSortField: (state, action: PayloadAction<'name' | 'stargazers_count' | 'forks_count' | 'updated_at'>) => {
            state.sortField = action.payload;
            state.page = 0;
        },
        setSortDirection: (state, action: PayloadAction<'asc' | 'desc'>) => {
            state.sortDirection = action.payload;
        },
        resetRepos: (state) => {
            state.repos = [];
            state.total_count = 0;
            state.status = 'idle';
            state.searchQuery = '';
            state.page = 0;
            state.rowsPerPage = 10;
            state.sortField = 'name';
            state.sortDirection = 'asc';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRepos.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchRepos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.repos = action.payload.items || [];
                state.total_count = action.payload.total_count;
            })
            .addCase(fetchRepos.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const {
    setSearchQuery,
    setPage,
    setRowsPerPage,
    setSortField,
    setSortDirection,
    resetRepos,
} = reposSlice.actions;

export default reposSlice.reducer;

