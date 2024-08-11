import React from 'react';
import { Box, Grid, Typography, Chip } from "@mui/material";
import RepoTable from "./RepoTable";
import StarIcon from '@mui/icons-material/Star';
import { Repo } from '../redux/reposSlice';

/**
 * Интерфейс для пропсов компонента MainContent.
 *
 * @property {Repo | null} selectedRepo - Выбранный репозиторий, который будет отображен. Может быть null, если репозиторий не выбран.
 */
interface MainContentProps {
    selectedRepo: Repo | null;
}

/**
 * Компонент MainContent отображает основное содержание страницы.
 * Включает таблицу репозиториев и информацию о выбранном репозитории.
 *
 * @param {MainContentProps} props - Пропсы, содержащие информацию о выбранном репозитории.
 * @returns {JSX.Element} Возвращает JSX элемент, представляющий основное содержание страницы.
 */
const MainContent: React.FC<MainContentProps> = ({ selectedRepo }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '912px', padding: 0 }}>
            <Box sx={{ flexGrow: 1, padding: 0 }}>
                {/* Компонент таблицы репозиториев */}
                <RepoTable />
            </Box>

            <Box sx={{ width: '480px', backgroundColor: '#f5f5f5', border: 'none' }}>
                <Grid
                    container
                    direction="column"
                    justifyContent={selectedRepo ? 'flex-start' : 'center'}
                    alignItems="flex-start"
                    sx={{ height: '100%' }}
                >
                    {selectedRepo ? (
                        <div style={{ marginLeft: '20px' }}>
                            {/* Название выбранного репозитория */}
                            <Typography
                                variant="h5"
                                sx={{ mb: 2, color: 'rgba(0, 0, 0, 0.87)', fontSize: '32px', fontWeight: '400', lineHeight: '40px', marginTop: '24px' }}
                            >
                                {selectedRepo.name}
                            </Typography>

                            {/* Отображение языка репозитория и количества звезд */}
                            <Grid
                                container
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ mb: 2, width: '410px' }}
                            >
                                <Chip
                                    label={selectedRepo.language || 'Unknown'}
                                    sx={{
                                        backgroundColor: 'rgba(33, 150, 243, 1)',
                                        color: '#fff'
                                    }}
                                />
                                <Box display="flex" alignItems="center">
                                    <StarIcon sx={{ color: 'gold' }} />
                                    <Typography variant="body1" sx={{ ml: 1, color: 'rgba(0, 0, 0, 0.87)'}}>
                                        {selectedRepo.stargazers_count.toLocaleString()}
                                    </Typography>
                                </Box>
                            </Grid>

                            {/* Отображение списка топиков (тем) репозитория */}
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

                            {/* Отображение лицензии репозитория */}
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: '400', fontSize: '14px', color: 'rgba(0, 0, 0, 0.87)', lineHeight: '20.02px', letterSpacing: '0.17px', mt: '20px', mb: '20px' }}
                            >
                                {selectedRepo.license?.name || 'Лицензия не указана'}
                            </Typography>

                            {/* Отображение описания репозитория */}
                            <Typography
                                variant="body2"
                                sx={{ mb: 1, color: 'rgba(0, 0, 0, 0.87)', lineHeight: '20.02px', letterSpacing: '0.17px' }}
                            >
                                {selectedRepo.description || 'Описание отсутствует'}
                            </Typography>
                        </div>
                    ) : (
                        <Typography
                            sx={{
                                color: 'rgba(0, 0, 0, 0.87)',
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
    );
};

export default MainContent;
