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
    Typography,
    TableSortLabel
} from '@mui/material';
import styles from '../styles/RepoTable.module.scss';
import { styled } from '@mui/system';

interface Repo {
    id: number;
    name: string;
    language: string;
    forks_count: number;
    stargazers_count: number;
    updated_at: string;
}

// Создаем стилизованный компонент для TableSortLabel с измененной позицией стрелки
const CustomTableSortLabel = styled(TableSortLabel)({
    display: 'flex',
    flexDirection: 'row-reverse', // Изменяем порядок элементов: стрелка слева, текст справа
    justifyContent: 'flex-end',
    alignItems: 'center',
});

const RepoTable: React.FC = () => {
    const repos = useAppSelector((state) => state.repos.repos);
    const totalCount = useAppSelector((state) => state.repos.total_count);
    const dispatch = useAppDispatch();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortField, setSortField] = useState<'name' | 'stargazers_count' | 'forks_count' | 'updated_at'>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleSort = (field: 'name' | 'stargazers_count' | 'forks_count' | 'updated_at') => {
        const isAsc = sortField === field && sortDirection === 'asc';
        setSortDirection(isAsc ? 'desc' : 'asc');
        setSortField(field);
        setPage(0);
        dispatch(fetchRepos({ query: 'github-repo-search', sort: field, direction: isAsc ? 'desc' : 'asc', page: 0, rowsPerPage }));
    };

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
        dispatch(fetchRepos({ query: 'github-repo-search', sort: sortField, direction: sortDirection, page: newPage, rowsPerPage }));
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        dispatch(fetchRepos({ query: 'github-repo-search', sort: sortField, direction: sortDirection, page: 0, rowsPerPage: newRowsPerPage }));
    };

    useEffect(() => {
        dispatch(fetchRepos({ query: 'github-repo-search', sort: sortField, direction: sortDirection, page, rowsPerPage }));
    }, [dispatch, page, rowsPerPage, sortField, sortDirection]);

    return (
        <>
            <TableContainer component={Paper} className={styles.repoTable}>
                <Typography variant="h3" className={styles.resultsHeading}>
                    Результаты поиска
                </Typography>
                <Table>
                    <TableHead className={styles.tableHead}>
                        <TableRow>
                            <TableCell className={styles.tableCell}>
                                <CustomTableSortLabel
                                    active={sortField === 'name'}
                                    direction={sortField === 'name' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('name')}

                                >
                                    Название
                                </CustomTableSortLabel>
                            </TableCell>
                            <TableCell className={styles.tableCell}>Язык</TableCell>
                            <TableCell className={styles.tableCell}>
                                <TableSortLabel
                                    active={sortField === 'forks_count'}
                                    direction={sortField === 'forks_count' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('forks_count')}
                                >
                                    Число форков
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className={styles.tableCell}>
                                <TableSortLabel
                                    active={sortField === 'stargazers_count'}
                                    direction={sortField === 'stargazers_count' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('stargazers_count')}
                                >
                                    Число звёзд
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className={styles.tableCell}>
                                <TableSortLabel
                                    active={sortField === 'updated_at'}
                                    direction={sortField === 'updated_at' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('updated_at')}
                                >
                                    Дата обновления
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={styles.tableBody}>
                        {Array.isArray(repos) && repos.length > 0 ? (
                            repos.map((repo) => (
                                <TableRow key={repo.id} className={styles.tableRow}>
                                    <TableCell className={styles.tableCell}>{repo.name}</TableCell>
                                    <TableCell className={styles.tableCell}>{repo.language}</TableCell>
                                    <TableCell className={styles.tableCell}>{repo.forks_count}</TableCell>
                                    <TableCell className={styles.tableCell}>{repo.stargazers_count}</TableCell>
                                    <TableCell className={styles.tableCell}>{new Date(repo.updated_at).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className={styles.tableRow}>
                                <TableCell colSpan={5}>Нет данных для отображения</TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </TableContainer>
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
        </>
    );
};

export default RepoTable;
