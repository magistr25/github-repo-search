import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchRepos, setPage, setRowsPerPage, setSortDirection, setSortField } from '../redux/reposSlice';
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

const CustomTableSortLabel = styled(TableSortLabel)({
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    alignItems: 'center',
});

const RepoTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const repos = useAppSelector((state) => state.repos.repos);
    const totalCount = useAppSelector((state) => state.repos.total_count);
    const searchQuery = useAppSelector((state) => state.repos.searchQuery);
    const page = useAppSelector((state) => state.repos.page);
    const rowsPerPage = useAppSelector((state) => state.repos.rowsPerPage);
    const sortField = useAppSelector((state) => state.repos.sortField);
    const sortDirection = useAppSelector((state) => state.repos.sortDirection);

    const handleSort = (field: 'name' | 'stargazers_count' | 'forks_count' | 'updated_at') => {
        const isAsc = sortField === field && sortDirection === 'asc';
        dispatch(setSortDirection(isAsc ? 'desc' : 'asc'));
        dispatch(setSortField(field));
        dispatch(fetchRepos({ query: searchQuery, sort: field, direction: isAsc ? 'desc' : 'asc', page: 0, rowsPerPage }));
    };

    const handlePageChange = (event: unknown, newPage: number) => {
        dispatch(setPage(newPage));
        dispatch(fetchRepos({ query: searchQuery, sort: sortField, direction: sortDirection, page: newPage, rowsPerPage }));
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        dispatch(setRowsPerPage(newRowsPerPage));
        dispatch(fetchRepos({ query: searchQuery, sort: sortField, direction: sortDirection, page: 0, rowsPerPage: newRowsPerPage }));
    };

    useEffect(() => {
        dispatch(fetchRepos({ query: searchQuery, sort: sortField, direction: sortDirection, page, rowsPerPage }));
    }, [dispatch, searchQuery, page, rowsPerPage, sortField, sortDirection]);

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
                                <CustomTableSortLabel
                                    active={sortField === 'forks_count'}
                                    direction={sortField === 'forks_count' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('forks_count')}
                                >
                                    Число форков
                                </CustomTableSortLabel>
                            </TableCell>
                            <TableCell className={styles.tableCell}>
                                <CustomTableSortLabel
                                    active={sortField === 'stargazers_count'}
                                    direction={sortField === 'stargazers_count' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('stargazers_count')}
                                >
                                    Число звёзд
                                </CustomTableSortLabel>
                            </TableCell>
                            <TableCell className={styles.tableCell}>
                                <CustomTableSortLabel
                                    active={sortField === 'updated_at'}
                                    direction={sortField === 'updated_at' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('updated_at')}
                                >
                                    Дата обновления
                                </CustomTableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={styles.tableBody}>
                        {Array.isArray(repos) && repos.length > 0 ? (
                            repos.map((repo) => (
                                <TableRow key={repo.id} className={styles.tableRow}>
                                    <TableCell className={styles.tableCell}>{repo.name}</TableCell>
                                    <TableCell className={styles.tableCell}>{repo.language || 'Не указан'}</TableCell>
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
            <div className={styles.tablePaginationContainer}>
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
            </div>
        </>
    );
};

export default RepoTable;
