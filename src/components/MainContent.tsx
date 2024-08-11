import React from 'react';
import { Box, Grid, Typography } from "@mui/material";
import RepoTable from "./innerMainContent/RepoTable";
import { Repo } from '../redux/reposSlice';
import RepoDetails from './innerMainContent/RepoDetails';

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
 * Пропсы, содержащие информацию о выбранном репозитории.
 * Возвращает JSX элемент, представляющий основное содержание страницы.
 */
const MainContent: React.FC<MainContentProps> = ({ selectedRepo }) => (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '912px', padding: 0 }}>
        <Box sx={{ flexGrow: 1, padding: 0 }}>
            <RepoTable />
        </Box>

        <Box sx={{ width: '480px', backgroundColor: '#f5f5f5', border: 'none' }}>
            <Grid container direction="column" justifyContent={selectedRepo ? 'flex-start' : 'center'} alignItems="flex-start" sx={{ height: '100%' }}>
                {selectedRepo ? (
                    <RepoDetails repo={selectedRepo} />
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
                        Выберите репозиторий
                    </Typography>
                )}
            </Grid>
        </Box>
    </Box>
);

export default MainContent;
