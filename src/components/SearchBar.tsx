import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useAppDispatch } from '../redux/store';
import { fetchRepos, resetRepos } from '../redux/reposSlice';
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
            dispatch(fetchRepos({ query, sort: 'stars', direction: 'desc', page: 0, rowsPerPage: 10 }));
        }
        onSearch(); // Вызов функции, переданной через пропсы
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
