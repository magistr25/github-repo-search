import React from 'react';
import { Grid, Typography, Box, Chip } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { Repo } from '../../redux/reposSlice';

/**
 * Интерфейс для пропсов компонента RepoInfo.
 *
 * @property {Repo} repo - Репозиторий, информация о котором будет отображена.
 */
interface RepoInfoProps {
    repo: Repo;
}

/**
 * Компонент RepoInfo отображает основную информацию о репозитории.
 * Включает язык программирования и количество звезд.
 *
 * Пропсы, содержащие информацию о репозитории.
 * Возвращает JSX элемент с информацией о репозитории.
 */
const RepoInfo: React.FC<RepoInfoProps> = ({ repo }) => (
    <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2, width: '410px' }}>
        <Chip
            label={repo.language || 'Unknown'}
            sx={{ backgroundColor: 'rgba(33, 150, 243, 1)', color: '#fff' }}
        />
        <Box display="flex" alignItems="center">
            <StarIcon sx={{ color: 'gold' }} />
            <Typography variant="body1" sx={{ ml: 1, color: 'rgba(0, 0, 0, 0.87)'}}>
                {repo.stargazers_count.toLocaleString()}
            </Typography>
        </Box>
    </Grid>
);

export default RepoInfo;
