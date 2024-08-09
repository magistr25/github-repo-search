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
    repos: [],
    status: 'idle',
    total_count: 0,
};

// Thunk для поиска репозиториев
export const fetchRepos = createAsyncThunk(
    'repos/fetchRepos',
    async ({ query, sort, direction, page, rowsPerPage }:
               { query: string, sort: string, direction: 'asc' | 'desc', page: number, rowsPerPage: number },
           { rejectWithValue }) => {
        if (!query.trim()) {
            // Если запрос пустой, возвращаем пустой массив и нулевой счетчик
            return { items: [], total_count: 0 };
        }

        try {
            const response = await axios.get(`https://api.github.com/search/repositories`, {
                params: {
                    q: query,
                    sort: sort,
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
                // Если ошибка пришла от axios, мы можем безопасно получить доступ к error.response
                return rejectWithValue(error.response?.data);
            } else {
                // Если ошибка неизвестного типа, просто отклоняем с сообщением
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
);

const reposSlice = createSlice({
    name: 'repos',
    initialState,
    reducers: {
        resetRepos: (state) => {
            state.repos = [];
            state.total_count = 0;
            state.status = 'idle';
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

export const { resetRepos } = reposSlice.actions;

export default reposSlice.reducer;


