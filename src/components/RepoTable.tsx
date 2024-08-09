import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchRepos } from '../redux/reposSlice';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Typography
} from '@mui/material';
import styles from '../styles/RepoTable.module.scss';

interface Repo {
    id: number;
    name: string;
    language: string;
    forks_count: number;
    stargazers_count: number;
    updated_at: string;
}

const RepoTable: React.FC = () => {
    const repos = useAppSelector((state) => state.repos.repos);
    const totalCount = useAppSelector((state) => state.repos.total_count); // Получаем total_count из состояния
    const dispatch = useAppDispatch();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
        dispatch(fetchRepos({ query: 'github-repo-search', sort: 'stars', direction: 'desc', page: newPage, rowsPerPage }));
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        dispatch(fetchRepos({ query: 'github-repo-search', sort: 'stars', direction: 'desc', page: 0, rowsPerPage: newRowsPerPage }));
    };

    useEffect(() => {
        dispatch(fetchRepos({ query: 'github-repo-search', sort: 'stars', direction: 'desc', page, rowsPerPage }));
    }, [dispatch, page, rowsPerPage]);

    return (
        <>
            <TableContainer component={Paper} className={styles.repoTable}>
                <Typography variant="h3" className={styles.resultsHeading}>
                    Результаты поиска
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell>Язык</TableCell>
                            <TableCell>Число форков</TableCell>
                            <TableCell>Число звёзд</TableCell>
                            <TableCell>Дата обновления</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(repos) && repos.length > 0 ? (
                            repos.map((repo) => (
                                <TableRow key={repo.id} className={styles.tableRow}>
                                    <TableCell>{repo.name}</TableCell>
                                    <TableCell>{repo.language}</TableCell>
                                    <TableCell>{repo.forks_count}</TableCell>
                                    <TableCell>{repo.stargazers_count}</TableCell>
                                    <TableCell>{new Date(repo.updated_at).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5}>Нет данных для отображения</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={totalCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                        className={styles.tablePagination}
                    />
                </Table>

            </TableContainer>
        </>
    );
};

export default RepoTable;
