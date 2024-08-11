import { configureStore } from '@reduxjs/toolkit';
import reposReducer from './reposSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

/**
 * Создание и конфигурация Redux-хранилища.
 *  Это основное Redux-хранилище, настроенное с помощью configureStore, оно использует reposReducer для управления состоянием репозиториев.
 */
const store = configureStore({
    reducer: {
        repos: reposReducer, // Подключаем редьюсер
    },
});

/**
 * Тип RootState определяет тип корневого состояния Redux-хранилища, который используется в селекторах для обеспечения правильной типизации.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Тип AppDispatch определяет тип диспетчера Redux-хранилища, который используется в кастомных хуках для диспетчера.
 */
export type AppDispatch = typeof store.dispatch;

/**
 * useAppSelector — это кастомный хук, который оборачивает стандартный useSelector, добавляя типизацию состояния на основе RootState.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * useAppDispatch — это кастомный хук, который оборачивает стандартный useDispatch, добавляя типизацию диспетчера на основе AppDispatch.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

