import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useAppDispatch } from '../../redux/store';
import { fetchRepos, setSearchQuery, resetRepos } from '../../redux/reposSlice';
import styles from '../../styles/SearchBar.module.scss';

/**
 * Интерфейс для пропсов компонента SearchBar.
 *
 * onSearch - Функция, вызываемая для выполнения поиска.
 * width - Опциональная ширина компонента, по умолчанию 1480px.
 */
interface SearchBarProps {
    onSearch: () => void;
    width?: string;
}

/**
 * Компонент SearchBar отображает строку поиска с текстовым полем и кнопкой для выполнения поиска.
 *
 * Пропсы, содержащие функцию onSearch и опциональную ширину компонента.
 * Возвращает JSX элемент строки поиска.
 */
const SearchBar: React.FC<SearchBarProps> = ({ onSearch, width }) => {
    // Локальное состояние для хранения текущего поискового запроса
    const [query, setQuery] = useState('');

    // Хук для доступа к функции dispatch из Redux
    const dispatch = useAppDispatch();

    /**
     * Функция handleSearch выполняет обработку поиска.
     * Если запрос пуст, сбрасывает результаты поиска.
     * В противном случае отправляет запрос на поиск репозиториев.
     */
    const handleSearch = () => {
        if (query.trim() === '') {
            // Если строка поиска пустая, сбрасываем результаты поиска
            dispatch(resetRepos());
        } else {
            // Устанавливаем значение поискового запроса в store
            dispatch(setSearchQuery(query));
            // Выполняем запрос на получение репозиториев
            dispatch(fetchRepos({ query, sort: undefined, direction: undefined, page: 0, rowsPerPage: 10 }));
        }
        // Вызываем переданную функцию onSearch
        onSearch();
    };

    /**
     * Функция handleKeyPress обрабатывает нажатие клавиш в текстовом поле.
     * Если нажата клавиша Enter, выполняет поиск.
     *
     * @param {React.KeyboardEvent<HTMLDivElement>} event - Событие нажатия клавиши.
     */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Box className={styles.searchBar} sx={{ width: width || '1480px' }}>
            <TextField
                label="Введите поисковый запрос"
                variant="outlined"
                className={styles.searchInput}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown} // Добавляем обработчик нажатия клавиши
                InputLabelProps={{
                    className: styles.inputLabel,
                }}
                inputProps={{
                    className: styles.inputBase,
                }}
                InputProps={{ style: { height: '42px' } }}
            />
            <Button
                variant="contained"
                color="primary"
                className={styles.searchButton}
                size="large"
                onClick={handleSearch}
            >
                ИСКАТЬ
            </Button>
        </Box>
    );
};

export default SearchBar;
