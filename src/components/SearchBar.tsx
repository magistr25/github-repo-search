import React from 'react';
import { TextField, Button } from '@mui/material';
import styles from '../styles/SearchBar.module.scss';

const SearchBar: React.FC = () => {
    return (
        <div className={styles.searchBar}>
            <TextField
                label="Введите поисковый запрос"
                variant="outlined"
                className={styles.searchInput}
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
            >
                ИСКАТЬ
            </Button>
        </div>
    );
};

export default SearchBar;

