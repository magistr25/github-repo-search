import React from 'react';
import { Typography } from "@mui/material";

/**
 * Интерфейс для пропсов компонента RepoLicense.
 *
 * @property {string | null} licenseName - Название лицензии репозитория, может быть null.
 */
interface RepoLicenseProps {
    licenseName: string | null;
}

/**
 * Компонент RepoLicense отображает информацию о лицензии репозитория.
 *
 * Пропсы, содержащие информацию о лицензии репозитория.
 * Возвращает JSX элемент с информацией о лицензии.
 */
const RepoLicense: React.FC<RepoLicenseProps> = ({ licenseName }) => (
    <Typography
        variant="body2"
        sx={{ fontWeight: '400', fontSize: '14px', color: 'rgba(0, 0, 0, 0.87)', lineHeight: '20.02px', letterSpacing: '0.17px', mt: '20px', mb: '20px' }}
    >
        {licenseName || 'Лицензия не указана'}
    </Typography>
);

export default RepoLicense;
