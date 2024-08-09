import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useAppDispatch } from '../redux/store';
import { fetchRepos } from '../redux/reposSlice';
import styles from '../styles/SearchBar.module.scss';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const dispatch = useAppDispatch();

    const handleSearch = () => {
        dispatch(fetchRepos({ query, sort: 'stars', direction: 'desc', page: 0, rowsPerPage: 10 }));
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
        </div>
    );
};

export default SearchBar;
