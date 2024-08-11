import React from 'react';
import { Grid, Chip } from "@mui/material";

/**
 * Интерфейс для пропсов компонента RepoTopics.
 *
 * @property {string[]} topics - Список тем (topics), связанных с репозиторием.
 */
interface RepoTopicsProps {
    topics: string[];
}

/**
 * Компонент RepoTopics отображает список тем (topics) репозитория.
 *
 * Пропсы, содержащие список тем репозитория.
 * Возвращает JSX элемент с отображением списка тем.
 */
const RepoTopics: React.FC<RepoTopicsProps> = ({ topics }) => (
    <Grid container spacing={1} sx={{ mb: 2 }}>
{topics.map((topic) => (
    <Grid item key={topic}>
<Chip
    label={topic}
    variant="outlined"
    sx={{ backgroundColor: 'rgba(0, 0, 0, 0.08)', color: '#000', border: 'none' }}
    />
    </Grid>
))}
</Grid>
);

export default RepoTopics;
