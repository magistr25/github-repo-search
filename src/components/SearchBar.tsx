import React, { useState } from 'react';
import {TextField, Button, Box} from '@mui/material';
import { useAppDispatch } from '../redux/store';
import { fetchRepos, setSearchQuery, resetRepos } from '../redux/reposSlice';
import styles from '../styles/SearchBar.module.scss';


interface SearchBarProps {
    onSearch: () => void;
    width?: string; // Добавляем width
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, width }) => {
    const [query, setQuery] = useState('');
    const dispatch = useAppDispatch();

    const handleSearch = () => {
        if (query.trim() === '') {
            dispatch(resetRepos());
        } else {
            dispatch(setSearchQuery(query)); // Устанавливаем значение query в store
            // первый запрос выполняется без сортировки (используется best match по умолчанию)
            dispatch(fetchRepos({ query, sort: undefined, direction: undefined, page: 0, rowsPerPage: 10 }));
        }
        onSearch();
    };

    return (
        <Box className={styles.searchBar} sx={{ width: width || '1480px' }}>
            <TextField
                label="Введите поисковый запрос"
                variant="outlined"
                className={styles.searchInput}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputLabelProps={{
                    className: styles.inputLabel,
                }}
                inputProps={{
                    className: styles.inputBase,
                }}
                InputProps={{ style: { height: '42px'} }}
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
