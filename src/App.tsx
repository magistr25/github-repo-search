import React, { useState } from 'react';
import { useAppSelector } from './redux/store';
import SearchBar from './components/SearchBar';
import RepoTable from "./components/RepoTable";
import styles from './styles/App.module.scss';
import { Box, Typography, Chip, Grid, Container } from "@mui/material";
import StarIcon from '@mui/icons-material/Star'; // Импортируем иконку звезды
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
                backgroundColor: 'black',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
                overflow: 'hidden' // Скрываем скролл для внешнего контейнера
            }}
        >
            <Container
                maxWidth={false}
                sx={{
                    width: 'auto',
                    maxWidth: '1440px',
                    padding: 0,
                    backgroundColor: 'rgba(242, 242, 242, 1)',
                    margin: 0,
                    maxHeight: '100vh',
                    overflowY: 'auto',
                    '::-webkit-scrollbar': { display: 'none' }, // Скрываем полосу прокрутки в WebKit-браузерах
                    msOverflowStyle: 'none', // Скрываем полосу прокрутки в IE и Edge
                    scrollbarWidth: 'none' // Скрываем полосу прокрутки в Firefox
                }}
            >
                <Box sx={{ height: '80px', backgroundColor: 'rgba(79, 79, 79, 1)', padding: 0,  marginLeft: '-25px', width: '100%' }}>
                    <SearchBar onSearch={handleSearch} />
                </Box>

                {!hasSearched ? (
                    <Box
                        className={styles.welcomeContainer}
                        sx={{
                            height: '912px',
                            padding: 0,
                            display: 'flex',
                            justifyContent: 'center', // Центрируем текст по горизонтали

                        }}
                    >
                        <Typography
                            variant="h4"
                            className={styles.welcome}
                            sx={{
                                marginTop: 'calc(100vh/2 - 33px)', // Отступ от верха до блока с текстом
                                fontFamily: 'Roboto, sans-serif', // Шрифт Roboto
                                fontWeight: 400, // Вес шрифта 400
                                fontSize: '46px', // Размер шрифта 46px
                                lineHeight: '65.78px', // Межстрочное расстояние 65.78px
                                letterSpacing: '0.17px', // Межбуквенное расстояние 0.17px
                                color: 'rgba(79, 79, 79, 1)', // Цвет текста
                                textAlign: 'center', // Центрирование текста по горизонтали
                            }}
                        >
                            Добро пожаловать
                        </Typography>
                    </Box>
                ) : (
                    <Box className={styles.mainContent} sx={{ display: 'flex', flexDirection: 'row', height: '912px',  padding: 0 }}>
                        <Box sx={{ flexGrow: 1, padding: 0 }}>
                            <RepoTable />
                        </Box>

                        <Box sx={{ width: '480px', backgroundColor: '#f5f5f5', padding: '20px' }}>
                            <Grid
                                container
                                direction="column"
                                justifyContent={selectedRepo ? 'flex-start' : 'center'}
                                alignItems="flex-start"
                                sx={{ height: '100%' }}
                            >
                                {selectedRepo ? (
                                    <div style={{ marginLeft: '20px' }}>
                                        <Typography variant="h5" sx={{ mb: 2, color: 'rgba(0, 0, 0, 0.87)', fontSize: '32px', fontWeight: '400', lineHeight: '40px' }}>
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
                                                <Typography variant="body1" sx={{ ml: 1, color: 'rgba(0, 0, 0, 0.87)', marginRight: '10px' }}>
                                                    {selectedRepo.stargazers_count.toLocaleString()}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        {selectedRepo.topics && (
                                            <Grid container spacing={1} sx={{ mb: 2 }}>
                                                {selectedRepo.topics.map((topic: string) => (
                                                    <Grid item key={topic}>
                                                        <Chip
                                                            label={topic}
                                                            variant="outlined"
                                                            sx={{
                                                                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                                                color: '#000',
                                                                border: 'none'
                                                            }}
                                                        />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        )}
                                        <Typography variant="body2" sx={{ fontWeight: '400', fontSize: '14px', color: 'rgba(0, 0, 0, 0.87)', lineHeight: '20.02px', letterSpacing: '0.17px', mt: '20px', mb: '20px' }}>
                                            {selectedRepo.license?.name || 'Лицензия не указана'}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 1, color: 'rgba(0, 0, 0, 0.87)', lineHeight: '20.02px', letterSpacing: '0.17px' }}>
                                            {selectedRepo.description || 'Описание отсутствует'}
                                        </Typography>
                                    </div>
                                ) : (
                                    <Typography
                                        className={styles.selectionText}
                                        sx={{
                                            color: 'rgba(0, 0, 0, 0.87)',
                                            textAlign: 'center',
                                            fontSize: '14px',
                                            letterSpacing: '0.17px',
                                            lineHeight: '20.02px',
                                            marginLeft: '150px',
                                        }}
                                    >
                                        Выберите репозиторий
                                    </Typography>
                                )}
                            </Grid>
                        </Box>
                    </Box>
                )}

                <Box
                    sx={{
                        height: '32px',
                        backgroundColor: 'rgba(79, 79, 79, 1)',
                        padding: 0,
                        width: '1440px', // Растягиваем footer на всю ширину родительского контейнера
                        marginTop: 'auto', // Позиционируем footer внизу контейнера
                        marginLeft: '-24px'
                    }}
                >

                </Box>
            </Container>
        </Box>
    );
};

export default App;
