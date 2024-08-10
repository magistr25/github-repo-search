import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import styles from './styles/App.module.scss';
import RepoTable from "./components/RepoTable";
import { Box, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';

const App: React.FC = () => {
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = () => {
        setHasSearched(true);
    };

    return (
        <Box
            sx={{
                width: '1440px',
                height: '1024px',
                margin: '0 auto', // Центрирование по горизонтали
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f5f5f5', // можете изменить на нужный цвет фона
            }}
        >
            <SearchBar onSearch={handleSearch} />
            {!hasSearched ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexGrow: 1, // занимает доступное пространство
                    }}
                >
                    <Typography variant="h4" className={styles.welcome}>
                        Добро пожаловать
                    </Typography>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <RepoTable/>

                    <Box sx={{ flexShrink: 0, width: '530px', marginLeft: 'auto', backgroundColor: '#f5f5f5' }}>
                        <Paper
                            elevation={1}
                            sx={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'inherit',
                            }}
                        >
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ height: '100%' }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        textAlign: 'center',
                                        color: 'rgba(0, 0, 0, 0.6)',
                                        paddingLeft: '30px',
                                        fontSize: '14px',
                                    }}
                                >
                                    Выберите репозитарий
                                </Typography>
                            </Grid>
                        </Paper>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default App;

