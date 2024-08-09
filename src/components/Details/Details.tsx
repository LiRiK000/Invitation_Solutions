import React from 'react';
import { Repository } from '../../types';
import classes from './Details.module.scss';

interface DetailViewProps {
  repository: Repository | null;
}

export const DetailView: React.FC<DetailViewProps> = ({ repository }) => {
  return (
    <div className={classes.detailView}>
      {repository ? (
        <>
          <h2>Детали репозитория</h2>
          <p>
            <strong>Название:</strong> {repository.name}
          </p>
          <p>
            <strong>Описание:</strong>{' '}
            {repository.description || 'Описание отсутствует'}
          </p>
          <p>
            <strong>Язык:</strong> {repository.language || 'N/A'}
          </p>
          <p>
            <strong>Лицензия:</strong> {repository.license?.name || 'N/A'}
          </p>
        </>
      ) : (
        <p>Репозиторий не выбран</p>
      )}
    </div>
  );
};
