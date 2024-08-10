import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useAppDispatch } from '../redux/store';
import { fetchRepos, setSearchQuery, resetRepos } from '../redux/reposSlice';
import styles from '../styles/SearchBar.module.scss';

interface SearchBarProps {
    onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
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
        <div className={styles.searchBar}>
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
        </div>
    );
};

export default SearchBar;
