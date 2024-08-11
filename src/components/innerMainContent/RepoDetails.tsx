import React from 'react';
import { Typography } from "@mui/material";
import { Repo } from '../../redux/reposSlice';
import RepoInfo from './RepoInfo';
import RepoTopics from './RepoTopics';
import RepoLicense from './RepoLicense';
import RepoDescription from './RepoDescription';

/**
 * Интерфейс для пропсов компонента RepoDetails.
 *
 * @property {Repo} repo - Репозиторий, информация о котором будет отображена.
 */
interface RepoDetailsProps {
    repo: Repo;
}

/**
 * Компонент RepoDetails отображает полную информацию о выбранном репозитории.
 * Включает название, язык программирования, количество звезд, форков, тем, лицензии и описание.
 *
 * Пропсы, содержащие информацию о репозитории.
 *  Возвращает JSX элемент с детальной информацией о репозитории.
 */
const RepoDetails: React.FC<RepoDetailsProps> = ({ repo }) => (
    <div style={{ marginLeft: '20px' }}>
        <Typography
            variant="h5"
            sx={{ mb: 2, color: 'rgba(0, 0, 0, 0.87)', fontSize: '32px', fontWeight: '400', lineHeight: '40px', marginTop: '24px' }}
        >
            {repo.name}
        </Typography>

        <RepoInfo repo={repo} />

        {repo.topics && <RepoTopics topics={repo.topics} />}

        {/* Приводим undefined к null, если license.name отсутствует */}
        <RepoLicense licenseName={repo.license?.name ?? null} />

        <RepoDescription description={repo.description} />
    </div>
);

export default RepoDetails;

