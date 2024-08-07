import React from 'react';
import { TextField, Button } from '@mui/material';
import styles from '../styles/SearchBar.module.scss';

const SearchBar: React.FC = () => {
    return (
        <div className={styles.searchBar}>
            <TextField
                label="Поисковый запрос"
                variant="outlined"
                className={styles.searchInput}
                InputProps={{ style: { height: '42px' } }} // Задаем высоту поля ввода
            />
            <Button variant="contained" color="primary" className={styles.searchButton}>
                Искать
            </Button>
        </div>
    );
};

export default SearchBar;
