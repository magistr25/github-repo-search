import React, { useState } from 'react';
import { useAppSelector } from './redux/store';
import SearchBar from './components/SearchBar';
import RepoTable from "./components/RepoTable";
import styles from './styles/App.module.scss';
import { Box, Typography, Chip, Grid } from "@mui/material";
import StarIcon from '@mui/icons-material/Star'; // Импортируем иконку звезды
import { Repo } from './redux/reposSlice'; // Импортируем тип Repo

const App: React.FC = () => {
    const [hasSearched, setHasSearched] = useState(false);
    const selectedRepo = useAppSelector((state): Repo | null => state.repos.selectedRepo);

    const handleSearch = () => {
        setHasSearched(true);
    };

    return (
        <Box className={styles.app}>
            <SearchBar onSearch={handleSearch} />
            {!hasSearched ? (
                <Box className={styles.welcomeContainer}>
                    <Typography variant="h4" className={styles.welcome}>
                        Добро пожаловать
                    </Typography>
                </Box>
            ) : (
                <Box className={styles.mainContent} sx={{ display: 'flex', flexDirection: 'row', width: '100%'}}>
                    <Box >
                        <RepoTable />
                    </Box>

                    <Box sx={{  width: '480px', backgroundColor: '#f5f5f5', padding: '20px' }}>
                        <Grid
                            container
                            direction="column"
                            justifyContent={selectedRepo ? 'flex-start' : 'center'}
                            alignItems="flex-start"
                            sx={{ height: '100%' }}
                        >
                            {selectedRepo ? (
                                <div style={{marginLeft:'20px'}}>
                                    <Typography variant="h5" sx={{ mb: 2, color:'rgba(0, 0, 0, 0.87)', fontSize: '32px', fontWeight: '400', lineHeight: '40px'  }}>
                                        {selectedRepo.name}
                                    </Typography>
                                    <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2, width: '410px' }}>
                                        <Chip
                                            label={selectedRepo.language || 'Unknown'}
                                            sx={{
                                                backgroundColor: 'rgba(33, 150, 243, 1)',
                                                color: '#fff'
                                            }}
                                        />
                                        <Box display="flex" alignItems="center">
                                            <StarIcon sx={{ color: 'gold' }} />
                                            <Typography variant="body1" sx={{ ml: 1 , color:
                                                    'rgba(0, 0, 0, 0.87)', marginRight: '10px'}}>
                                                {selectedRepo.stargazers_count.toLocaleString()}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    {selectedRepo.topics && (
                                        <Grid container spacing={1} sx={{ mb: 2 }}>
                                            {selectedRepo.topics.map((topic: string) => (
                                                <Grid item key={topic}>
                                                    <Chip  label={topic}
                                                           variant="outlined"
                                                           sx={{
                                                               backgroundColor:
                                                                   'rgba(0, 0, 0, 0.08)',
                                                               color: '#000',
                                                               border: 'none'
                                                           }}  />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    )}
                                    <Typography variant="body2" color="textSecondary" sx={{fontWeight: '400', fontSize: '14px', color:'rgba(0, 0, 0, 0.87)', lineHeight: '20.02px', letterSpacing:'0.17px', marginTop:'20px', marginBottom:'20px', }}>
                                        {selectedRepo.license?.name || 'Лицензия не указана'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 1, color:'rgba(0, 0, 0, 0.87)', lineHeight: '20.02px', letterSpacing:'0.17px' }}>
                                        {selectedRepo.description || 'Описание отсутствует'}
                                    </Typography>

                                </div>
                            ) : (
                                <Typography
                                    className={styles.selectionText}
                                    sx={{
                                        color:'rgba(0, 0, 0, 0.87)',
                                        textAlign: 'center',
                                        fontSize: '14px',
                                        letterSpacing: '0.17px',
                                        lineHeight: '20.02px',
                                        marginLeft: '150px',

                                    }}
                                >
                                    Выберите репозитарий
                                </Typography>
                            )}
                        </Grid>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default App;
