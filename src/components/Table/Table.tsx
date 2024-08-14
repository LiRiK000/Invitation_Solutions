import { AppDispatch, RootState } from '../../store/store';
import { Order, Repository } from '../../types';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { DetailView } from '../Details/Details';
import classes from './Table.module.scss';
import { fetchRepositories } from '../../store/slices/repositorySlice';

export const TableComponent = React.memo(
  ({ searchText }: { searchText: string }) => {
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
    const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);

    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchRepositories(searchText));
      }
    }, [status, dispatch, searchText]);

    /*
     * A callback function that handles sorting the table data based on a selected property.
     *
     * @param property - The property of the Repository object to sort by.
     * @returns {void}
     */
    const handleRequestSort = useCallback(
      (property: keyof Repository) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      },
      [order, orderBy]
    );

    const handleChangePage = useCallback((_event: unknown, newPage: number) => {
      setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      },
      []
    );

    /*
     * Sorts the repositories array based on the selected property and order.
     *
     * @param repositories - The array of repositories to sort.
     * @param orderBy - The property of the Repository object to sort by.
     * @param order - The order to sort the repositories ('asc' for ascending, 'desc' for descending).
     * @returns The sorted repositories array.
     */
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

    const handleRowClick = (repo: Repository) => {
      setSelectedRepo(repo);
    };

    return (
      <div className={classes.container}>
        {status !== 'succeeded' && (
          <div className={classes.progressStatusContainer}>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>{error}</p>}
          </div>
        )}
        {status === 'succeeded' && (
          <>
            <TableContainer className={classes.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Название</TableCell>
                    <TableCell>Язык</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'forks_count'}
                        direction={orderBy === 'forks_count' ? order : 'asc'}
                        onClick={() => handleRequestSort('forks_count')}
                      >
                        Число форков
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'stargazers_count'}
                        direction={
                          orderBy === 'stargazers_count' ? order : 'asc'
                        }
                        onClick={() => handleRequestSort('stargazers_count')}
                      >
                        Число звёзд
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'updated_at'}
                        direction={orderBy === 'updated_at' ? order : 'asc'}
                        onClick={() => handleRequestSort('updated_at')}
                      >
                        Дата обновления
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedRepositories
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((repo) => (
                      <TableRow
                        key={repo.id}
                        onClick={() => handleRowClick(repo)}
                        className={classes.tableRow}
                      >
                        <TableCell>{repo.name}</TableCell>
                        <TableCell>{repo.language}</TableCell>
                        <TableCell>{repo.forks_count}</TableCell>
                        <TableCell>{repo.stargazers_count}</TableCell>
                        <TableCell>
                          {new Date(repo.updated_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
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
              className={classes.pagination}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <DetailView repository={selectedRepo} />
          </>
        )}
      </div>
    );
  }
);
