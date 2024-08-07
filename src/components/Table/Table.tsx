import { AppDispatch, RootState } from '../../store/store';
import {
    Box,
    Collapse,
    Container,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Typography,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Order, Repository } from '../../types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchRepositories } from '../../store/slices/repositorySlice';

export const TableComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const repositories = useSelector(
        (state: RootState) => state.repository.repositories
    );
    const status = useSelector((state: RootState) => state.repository.status);
    const error = useSelector((state: RootState) => state.repository.error);

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] =
        useState<keyof Repository>('stargazers_count');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState<Record<number, boolean>>({});

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchRepositories());
        }
    }, [status, dispatch]);

    const handleRequestSort = (property: keyof Repository) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortedRepositories = repositories.slice().sort((a, b) => {
        if (orderBy === 'stargazers_count' || orderBy === 'forks_count') {
            return order === 'asc'
                ? (a[orderBy] as number) - (b[orderBy] as number)
                : (b[orderBy] as number) - (a[orderBy] as number);
        } else {
            return order === 'asc'
                ? new Date(a[orderBy] as string).getTime() -
                      new Date(b[orderBy] as string).getTime()
                : new Date(b[orderBy] as string).getTime() -
                      new Date(a[orderBy] as string).getTime();
        }
    });

    const handleClickOpen = (index: number) => {
        setOpen((prevState) => ({ ...prevState, [index]: !prevState[index] }));
    };

    return (
        <Container>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>{error}</p>}
            {status === 'succeeded' && (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Название</TableCell>
                                    <TableCell>Язык</TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === 'forks_count'}
                                            direction={
                                                orderBy === 'forks_count'
                                                    ? order
                                                    : 'asc'
                                            }
                                            onClick={() =>
                                                handleRequestSort('forks_count')
                                            }
                                        >
                                            Число форков
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={
                                                orderBy === 'stargazers_count'
                                            }
                                            direction={
                                                orderBy === 'stargazers_count'
                                                    ? order
                                                    : 'asc'
                                            }
                                            onClick={() =>
                                                handleRequestSort(
                                                    'stargazers_count'
                                                )
                                            }
                                        >
                                            Число звёзд
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={orderBy === 'updated_at'}
                                            direction={
                                                orderBy === 'updated_at'
                                                    ? order
                                                    : 'asc'
                                            }
                                            onClick={() =>
                                                handleRequestSort('updated_at')
                                            }
                                        >
                                            Дата обновления
                                        </TableSortLabel>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedRepositories
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((repo, index) => (
                                        <React.Fragment key={repo.id}>
                                            <TableRow>
                                                <TableCell>
                                                    <IconButton
                                                        aria-label="expand row"
                                                        size="small"
                                                        onClick={() =>
                                                            handleClickOpen(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        {open[index] ? (
                                                            <KeyboardArrowUp />
                                                        ) : (
                                                            <KeyboardArrowDown />
                                                        )}
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell>
                                                    {repo.name}
                                                </TableCell>
                                                <TableCell>
                                                    {repo.language}
                                                </TableCell>
                                                <TableCell>
                                                    {repo.forks_count}
                                                </TableCell>
                                                <TableCell>
                                                    {repo.stargazers_count}
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(
                                                        repo.updated_at
                                                    ).toLocaleDateString()}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell
                                                    style={{
                                                        paddingBottom: 0,
                                                        paddingTop: 0,
                                                    }}
                                                    colSpan={6}
                                                >
                                                    <Collapse
                                                        in={open[index]}
                                                        timeout="auto"
                                                        unmountOnExit
                                                    >
                                                        <Box margin={1}>
                                                            <Typography
                                                                variant="h6"
                                                                gutterBottom
                                                                component="div"
                                                            >
                                                                Детали
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                Название:{' '}
                                                                {repo.name}
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                Описание:{' '}
                                                                {
                                                                    repo.description
                                                                }
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                Лицензия:{' '}
                                                                {repo.license
                                                                    ?.name ||
                                                                    'N/A'}
                                                            </Typography>
                                                        </Box>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={repositories.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            )}
        </Container>
    );
};
