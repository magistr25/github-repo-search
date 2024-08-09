import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
    status: string;
    total_count: number;
    searchQuery: string; // Добавляем searchQuery в состояние
}

const initialState: ReposState = {
    repos: [],
    status: 'idle',
    total_count: 0,
    searchQuery: '', // Инициализируем searchQuery пустой строкой
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

            // Проверяем, что данные пришли правильно
            return { items: response.data.items, total_count: response.data.total_count };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
);


const reposSlice = createSlice({
    name: 'repos',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        resetRepos: (state) => {
            state.repos = [];
            state.total_count = 0;
            state.status = 'idle';
            state.searchQuery = ''; // Сбрасываем searchQuery
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRepos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRepos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.repos = action.payload.items || [];
                state.total_count = action.payload.total_count;
            })
            .addCase(fetchRepos.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { setSearchQuery, resetRepos } = reposSlice.actions;

export default reposSlice.reducer;
