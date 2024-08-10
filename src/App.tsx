import React, { useState } from 'react';
import { useAppSelector } from './redux/store';
import SearchBar from './components/SearchBar';
import RepoTable from "./components/RepoTable";
import styles from './styles/App.module.scss';
import { Box, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Repo } from './redux/reposSlice'; // Импортируем тип Repo

const App: React.FC = () => {
    const [hasSearched, setHasSearched] = useState(false);
    const selectedRepo = useAppSelector((state): Repo | null => state.repos.selectedRepo);

    const handleSearch = () => {
        setHasSearched(true);
    };

    return (
        <Box
            sx={{
                width: '1440px',
                height: '1024px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f5f5f5',
            }}
        >
            <SearchBar onSearch={handleSearch} />
            {!hasSearched ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexGrow: 1,
                    }}
                >
                    <Typography variant="h4" className={styles.welcome}>
                        Добро пожаловать
                    </Typography>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <RepoTable />

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
                                {selectedRepo ? (
                                    <Box sx={{ padding: '20px' }}>
                                        <Typography sx={{ margin: '0 auto' }} variant="h6"> {selectedRepo.name}</Typography>
                                        <Typography variant="body1">
                                            {selectedRepo.description || 'Описание отсутствует'}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {selectedRepo.license?.name || 'Лицензия не указана'}
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            textAlign: 'center',
                                            color: 'rgba(0, 0, 0, 0.6)',
                                            paddingLeft: '30px',
                                            fontSize: '14px',
                                        }}
                                    >
                                        Выберите репозиторий
                                    </Typography>
                                )}
                            </Grid>
                        </Paper>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default App;
