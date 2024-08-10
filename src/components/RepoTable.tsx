import React, { useEffect, useState } from 'react';
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

// Кастомный TableSortLabel для поля "Название"
const CustomTableSortLabelForName = styled(TableSortLabel)({

        display: 'flex',
        flexDirection: 'row-reverse', // Стрелка будет справа
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

    // Локальное состояние для сортировки по названию
    const [nameSortDirection, setNameSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleSort = (field: 'forks' | 'stars' | 'updated') => {
        const isAsc = sortField === field && sortDirection === 'asc';
        dispatch(setSortDirection(isAsc ? 'desc' : 'asc'));
        dispatch(setSortField(field));
        dispatch(fetchRepos({ query: searchQuery, sort: field, direction: isAsc ? 'desc' : 'asc', page: 0, rowsPerPage }));
    };

    const handleNameSort = () => {
        setNameSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');

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
        <div className={styles.wrapper}>
            <TableContainer component={Paper} className={styles.repoTable}>
                <Typography variant="h3" className={styles.resultsHeading}>
                    Результаты поиска
                </Typography>
                <Table>
                    <TableHead className={styles.tableHead}>
                        <TableRow>
                            <TableCell className={styles.tableCell}>
                                <CustomTableSortLabelForName
                                    direction={nameSortDirection}
                                    onClick={handleNameSort}
                                    active
                                >
                                    Название
                                </CustomTableSortLabelForName>
                            </TableCell>
                            <TableCell className={styles.tableCell}>Язык</TableCell>
                            <TableCell className={styles.tableCell}>
                                <TableSortLabel
                                    active={sortField === 'forks'}
                                    direction={sortField === 'forks' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('forks')}
                                >
                                    Число форков
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className={styles.tableCell}>
                                <TableSortLabel
                                    active={sortField === 'stars'}
                                    direction={sortField === 'stars' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('stars')}
                                >
                                    Число звёзд
                                </TableSortLabel>
                            </TableCell>
                            <TableCell className={styles.tableCell}>
                                <TableSortLabel
                                    active={sortField === 'updated'}
                                    direction={sortField === 'updated' ? sortDirection : 'desc'}
                                    onClick={() => handleSort('updated')}
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
        </div>
    );
};

export default RepoTable;
