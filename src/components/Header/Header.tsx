import { Button, TextField } from '@mui/material';
import { ChangeEventHandler, useCallback, useState } from 'react';

import { HeaderProps } from '../../types';
import React from 'react';
import classes from './header.module.scss';

export const Header: React.FC<HeaderProps> = React.memo(({ onSearch }) => {
  const [text, setText] = useState('');

  const handleClick = useCallback(() => {
    onSearch(text);
  }, [text, onSearch]);

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
