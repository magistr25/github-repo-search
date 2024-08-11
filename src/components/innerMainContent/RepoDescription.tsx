import React from 'react';
import { Typography } from "@mui/material";

/**
 * Интерфейс для пропсов компонента RepoDescription.
 *
 * @property {string | null} description - Описание репозитория, может быть null.
 */
interface RepoDescriptionProps {
    description: string | null;
}

/**
 * Компонент RepoDescription отображает описание репозитория.
 *
 * Пропсы, содержащие описание репозитория.
 * Возвращает JSX элемент с описанием репозитория.
 */
const RepoDescription: React.FC<RepoDescriptionProps> = ({ description }) => (
    <Typography
        variant="body2"
        sx={{ mb: 1, color: 'rgba(0, 0, 0, 0.87)', lineHeight: '20.02px', letterSpacing: '0.17px' }}
    >
        {description || 'Описание отсутствует'}
    </Typography>
);

export default RepoDescription;
