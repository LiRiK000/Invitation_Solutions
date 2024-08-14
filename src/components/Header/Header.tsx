import { Button, TextField } from '@mui/material';
import { ChangeEventHandler, useCallback, useState } from 'react';

import { AppDispatch } from '../../store/store';
import { HeaderProps } from '../../types';
import React from 'react';
import classes from './header.module.scss';
import { fetchRepositories } from '../../store/slices/repositorySlice';
import { useDispatch } from 'react-redux';

export const Header: React.FC<HeaderProps> = React.memo(({ onSearch }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = useCallback(() => {
    onSearch(text);
    dispatch(fetchRepositories(text));
  }, [onSearch, text, dispatch]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setText(event.target.value);
    },
    []
  );

  return (
    <header className={classes.header}>
      <TextField
        label="Введите поисковый запрос"
        variant="filled"
        value={text}
        onChange={handleInputChange}
      />
      <Button variant="contained" onClick={handleClick}>
        Искать
      </Button>
    </header>
  );
});
