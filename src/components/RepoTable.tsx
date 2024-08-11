import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
    fetchRepos,
    setPage,
    setRowsPerPage,
    setSortDirection,
    setSortField,
    setSelectedRepo, Repo,
} from '../redux/reposSlice';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Typography,
    TableSortLabel,
    Box,
    styled,
    TableCell,
} from '@mui/material';

const CustomTableSortLabelForName = styled(TableSortLabel)({
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
    const error = useAppSelector((state) => state.repos.error);

    const [nameSortDirection, setNameSortDirection] = useState<'asc' | 'desc'>(
        'asc'
    );

    const handleSort = (field: 'forks' | 'stars' | 'updated') => {
        const isAsc = sortField === field && sortDirection === 'asc';
        dispatch(setSortDirection(isAsc ? 'desc' : 'asc'));
        dispatch(setSortField(field));
        dispatch(
            fetchRepos({
                query: searchQuery,
                sort: field,
                direction: isAsc ? 'desc' : 'asc',
                page: 0,
                rowsPerPage,
            })
        );
    };

    const handleNameSort = () => {
        setNameSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    };

    const handlePageChange = (event: unknown, newPage: number) => {
        dispatch(setPage(newPage));
        dispatch(
            fetchRepos({
                query: searchQuery,
                sort: sortField,
                direction: sortDirection,
                page: newPage,
                rowsPerPage,
            })
        );
    };

    const handleRowsPerPageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        dispatch(setRowsPerPage(newRowsPerPage));
        dispatch(
            fetchRepos({
                query: searchQuery,
                sort: sortField,
                direction: sortDirection,
                page: 0,
                rowsPerPage: newRowsPerPage,
            })
        );
    };

    useEffect(() => {
        dispatch(
            fetchRepos({
                query: searchQuery,
                sort: sortField,
                direction: sortDirection,
                page,
                rowsPerPage,
            })
        );
    }, [dispatch, searchQuery, page, rowsPerPage, sortField, sortDirection]);

    const handleRepoClick = (repo: Repo) => {
        dispatch(setSelectedRepo(repo));
    };

    return (
        <Box
            sx={{
                width: '970px',
                position: 'relative',
                marginLeft: '-24px',
                border: 'none',
                height: '912px', // Высота контейнера 912px

            }}
        >
            <TableContainer
                component={Paper}
                sx={{
                    width: '970px',
                    padding: '0',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%', // Высота контейнера теперь занимает всю высоту доступного пространства
                    border: 'none',
                    boxShadow: 'none',
                    paddingLeft: '10px'
                }}
            >
                <Typography
                    variant="h3"
                    sx={{ margin: '24px 0',paddingLeft: '26px', color: 'rgba(0, 0, 0, 0.87)' }}
                >
                    Результаты поиска
                </Typography>
                <Box sx={{ flex: 1, overflowY: 'auto', paddingX: '20px' }}>
                    <Table stickyHeader>
                        <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1000, fontWeight: 600 }}>
                            <TableRow sx={{ height: '52px' }}> {/* Высота строки заголовка */}
                                <TableCell sx={{ width: '20%', height: '52px', padding: '0 10px', fontWeight: 'bold', borderRight: 'none', borderLeft: 'none' }}>
                                    <CustomTableSortLabelForName
                                        direction={nameSortDirection}
                                        onClick={handleNameSort}
                                        active
                                    >
                                        Название
                                    </CustomTableSortLabelForName>
                                </TableCell>
                                <TableCell sx={{ width: '20%', height: '52px', padding: '0 10px', fontWeight: 'bold', borderRight: 'none', borderLeft: 'none' }}>
                                    Язык
                                </TableCell>
                                <TableCell sx={{ width: '20%', height: '52px', padding: '0 10px', fontWeight: 'bold', borderRight: 'none', borderLeft: 'none' }}>
                                    <TableSortLabel
                                        active={sortField === 'forks'}
                                        direction={sortField === 'forks' ? sortDirection : 'asc'}
                                        onClick={() => handleSort('forks')}
                                    >
                                        Число форков
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ width: '20%', height: '52px', padding: '0 10px', fontWeight: 'bold', borderRight: 'none', borderLeft: 'none' }}>
                                    <TableSortLabel
                                        active={sortField === 'stars'}
                                        direction={sortField === 'stars' ? sortDirection : 'asc'}
                                        onClick={() => handleSort('stars')}
                                    >
                                        Число звёзд
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ width: '20%', height: '52px', padding: '0 10px', fontWeight: 'bold', borderRight: 'none', borderLeft: 'none' }}>
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
                        <TableBody>
                            {error ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        {error}
                                    </TableCell>
                                </TableRow>
                            ) : Array.isArray(repos) && repos.length > 0 ? (
                                repos.map((repo) => (
                                    <TableRow
                                        key={repo.id}
                                        sx={{
                                            cursor: 'pointer',
                                            height: '52px', // Высота строк таблицы 52px

                                            '&:hover': {
                                                backgroundColor: '#f5f5f5',
                                                transition: 'background-color 0.3s ease',
                                            },
                                        }}
                                        onClick={() => handleRepoClick(repo)}
                                    >
                                        <TableCell sx={{ padding: '0 10px', borderRight: 'none', borderLeft: 'none' }}>{repo.name}</TableCell>
                                        <TableCell sx={{ padding: '0 10px', borderRight: 'none', borderLeft: 'none' }}>{repo.language || 'Не указан'}</TableCell>
                                        <TableCell sx={{ padding: '0 10px', borderRight: 'none', borderLeft: 'none' }}>{repo.forks_count}</TableCell>
                                        <TableCell sx={{ padding: '0 10px', borderRight: 'none', borderLeft: 'none' }}>{repo.stargazers_count}</TableCell>
                                        <TableCell sx={{ padding: '0 10px', borderRight: 'none', borderLeft: 'none' }}>{new Date(repo.updated_at).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        Нет данных для отображения
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Box>
            </TableContainer>
            <Box sx={{ position: 'absolute', backgroundColor: 'white', bottom: '4px', zIndex: 1000, width: '100%' }}>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    sx={{ marginLeft: '500px' }}
                />
            </Box>
        </Box>
    );
};

export default RepoTable;
