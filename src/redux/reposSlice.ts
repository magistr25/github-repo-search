import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * Интерфейс описывает структуру объекта репозитория (Repo).
 *
 * @property {number} id - Уникальный идентификатор репозитория.
 * @property {string} name - Название репозитория.
 * @property {string} language - Язык программирования, используемый в репозитории.
 * @property {number} forks_count - Количество форков репозитория.
 * @property {number} stargazers_count - Количество звезд у репозитория.
 * @property {string} updated_at - Дата последнего обновления репозитория.
 * @property {Repo | null} selectedRepo - Выбранный репозиторий, может быть null.
 * @property {string | null} description - Описание репозитория, может быть null.
 * @property {{ name: string } | null} license - Лицензия репозитория, может быть null.
 * @property {string[]} [topics] - Список тем (topics) репозитория, может отсутствовать.
 */
export interface Repo {
    id: number;
    name: string;
    language: string;
    forks_count: number;
    stargazers_count: number;
    updated_at: string;
    selectedRepo: Repo | null;
    description: string | null;
    license: {
        name: string;
    } | null;
    topics?: string[];
}

/**
 * Интерфейс описывает структуру состояния хранилища для управления репозиториями.
 *
 * @property {Repo[]} repos - Массив репозиториев.
 * @property {'idle' | 'loading' | 'succeeded' | 'failed'} status - Текущий статус запроса.
 * @property {number} total_count - Общее количество найденных репозиториев.
 * @property {string} searchQuery - Строка поискового запроса.
 * @property {number} page - Номер текущей страницы в результатах поиска.
 * @property {number} rowsPerPage - Количество строк на одной странице.
 * @property {'forks' | 'stars' | 'updated'} [sortField] - Поле сортировки (необязательное).
 * @property {'asc' | 'desc'} [sortDirection] - Направление сортировки (необязательное).
 * @property {string | null} error - Сообщение об ошибке, если она возникла.
 * @property {Repo | null} selectedRepo - Выбранный репозиторий, может быть null.
 */
interface ReposState {
    repos: Repo[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    total_count: number;
    searchQuery: string;
    page: number;
    rowsPerPage: number;
    sortField?: 'forks' | 'stars' | 'updated';
    sortDirection?: 'asc' | 'desc';
    error: string | null;
    selectedRepo: null,
}

/**
 * Начальное состояние хранилища репозиториев.
 * Это состояние используется до выполнения каких-либо действий.
 */
const initialState: ReposState = {
    repos: [],
    status: 'idle',
    total_count: 0,
    searchQuery: '',
    page: 0,
    rowsPerPage: 10,
    sortField: undefined,
    sortDirection: undefined,
    error: null,
    selectedRepo: null,
};

/**
 * Асинхронный thunk для выполнения запроса к GitHub API и получения списка репозиториев.
 * Используется для получения данных на основе поискового запроса и параметров сортировки.
 *
 * @param {object} params - Параметры запроса.
 * @param {string} params.query - Строка поискового запроса.
 * @param {'forks' | 'stars' | 'updated'} [params.sort] - Поле, по которому выполняется сортировка.
 * @param {'asc' | 'desc'} [params.direction] - Направление сортировки.
 * @param {number} params.page - Номер текущей страницы.
 * @param {number} params.rowsPerPage - Количество строк на одной странице.
 *
 * @returns {Promise<object>} - Возвращает объект с массивом найденных репозиториев и общим количеством.
 */
export const fetchRepos = createAsyncThunk(
    'repos/fetchRepos',
    async ({ query, sort, direction, page, rowsPerPage }:
               { query: string, sort?: 'forks' | 'stars' | 'updated', direction?: 'asc' | 'desc', page: number, rowsPerPage: number },
           { rejectWithValue }) => {
        try {
            // Формируем параметры запроса для GitHub API
            const params: Record<string, any> = {
                q: query,
                per_page: rowsPerPage,
                page: page + 1, // GitHub API использует нумерацию страниц, начиная с 1
            };

            // Добавляем параметры сортировки, если они указаны
            if (sort) params.sort = sort;
            if (direction) params.order = direction;

            // Выполняем запрос к GitHub API для поиска репозиториев
            const response = await axios.get(`https://api.github.com/search/repositories`, {
                params,
                headers: {
                    Accept: 'application/vnd.github+json',
                    'User-Agent': 'magistr25'
                },
            });

            // Возвращаем массив найденных репозиториев и общее количество результатов
            return { items: response.data.items, total_count: response.data.total_count };
        } catch (error) {
            // Обрабатываем возможные ошибки запроса
            if (axios.isAxiosError(error)) {
                // Если возникла ошибка из-за превышения лимита запросов к API
                if (error.response?.status === 403) {
                    return rejectWithValue('Превышен лимит скорости API. Необходимо повторить запрос позже.');
                } else if (error.response?.status === 422) {
                    // Если запрос был некорректен и данные не могут быть отображены
                    return rejectWithValue('Нет данных для отображения');
                }
                // Возвращаем сообщение об ошибке, если она произошла по другой причине
                return rejectWithValue(error.response?.data.message || 'Ошибка при запросе к GitHub API');
            } else {
                // Обработка непредвиденной ошибки
                return rejectWithValue('Произошла неизвестная ошибка');
            }
        }
    }
);

/**
 * slice для управления состоянием репозиториев.
 * Содержит действия (reducers) и асинхронные действия (extraReducers), связанные с получением и управлением данными репозиториев.
 */
const reposSlice = createSlice({
    name: 'repos',
    initialState,
    reducers: {
        /**
         * Устанавливает строку поискового запроса и сбрасывает страницу на 0.
         *
         * @param {ReposState} state - Текущее состояние хранилища.
         * @param {PayloadAction<string>} action - Действие с новой строкой поискового запроса.
         */
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            state.page = 0;
        },
        /**
         * Устанавливает текущую страницу для пагинации.
         *
         * @param {ReposState} state - Текущее состояние хранилища.
         * @param {PayloadAction<number>} action - Действие с новым номером страницы.
         */
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        /**
         * Устанавливает количество строк на странице и сбрасывает текущую страницу на 0.
         *
         * @param {ReposState} state - Текущее состояние хранилища.
         * @param {PayloadAction<number>} action - Действие с новым количеством строк на странице.
         */
        setRowsPerPage: (state, action: PayloadAction<number>) => {
            state.rowsPerPage = action.payload;
            state.page = 0;
        },
        /**
         * Устанавливает поле для сортировки и сбрасывает текущую страницу на 0.
         *
         * @param {ReposState} state - Текущее состояние хранилища.
         * @param {PayloadAction<'forks' | 'stars' | 'updated'>} action - Действие с новым полем сортировки.
         */
        setSortField: (state, action: PayloadAction<'forks' | 'stars' | 'updated'>) => {
            state.sortField = action.payload;
            state.page = 0;
        },
        /**
         * Устанавливает направление сортировки.
         *
         * @param {ReposState} state - Текущее состояние хранилища.
         * @param {PayloadAction<'asc' | 'desc'>} action - Действие с новым направлением сортировки.
         */
        setSortDirection: (state, action: PayloadAction<'asc' | 'desc'>) => {
            state.sortDirection = action.payload;
        },
        /**
         * Сбрасывает данные о репозиториях и параметры поиска к начальному состоянию.
         *
         * @param {ReposState} state - Текущее состояние хранилища.
         */
        resetRepos: (state) => {
            state.repos = [];
            state.total_count = 0;
            state.status = 'idle';
            state.searchQuery = '';
            state.page = 0;
            state.rowsPerPage = 10;
            state.sortField = undefined;
            state.sortDirection = undefined;
            state.error = null;
        },
        /**
         * Устанавливает выбранный репозиторий.
         *
         * @param {ReposState} state - Текущее состояние хранилища.
         * @param {PayloadAction<Repo>} action - Действие с выбранным репозиторием.
         */
        setSelectedRepo: (state, action) => {
            state.selectedRepo = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Обработка состояния загрузки данных
        builder
            // Обработка ожидания ответа
            .addCase(fetchRepos.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            // Обработка успешного получения данных
            .addCase(fetchRepos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.repos = action.payload.items || [];
                state.total_count = action.payload.total_count;
            })
            // Обработка ошибки при получении данных
            .addCase(fetchRepos.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.repos = [];  // Обнуляем данные, если произошла ошибка
                state.total_count = 0; // Сбрасываем общее количество репозиториев
                state.error = action.payload as string; // Устанавливаем сообщение об ошибке
            });
    },
});

// Экспорт действий (actions), созданных срезом
export const {
    setSearchQuery,
    setPage,
    setRowsPerPage,
    setSortField,
    setSortDirection,
    resetRepos,
    setSelectedRepo
} = reposSlice.actions;

// Экспорт редьюсера по умолчанию
export default reposSlice.reducer;

