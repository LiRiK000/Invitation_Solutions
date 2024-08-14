import React from 'react';
import { Repository } from '../../types';
import StarIcon from '@mui/icons-material/Star';
import classes from './Details.module.scss';

interface DetailViewProps {
  repository: Repository | null;
}

export const DetailView: React.FC<DetailViewProps> = ({ repository }) => {
  if (!repository) {
    return (
      <div
        className={classes.detailView}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p className={classes.license}>Выберете репозиторий</p>
      </div>
    );
  }

  const { name, language, stargazers_count, license } = repository;

  return (
    <div className={classes.detailView}>
      <h2 className={classes.title}>{name}</h2>
      <div className={classes.metadata}>
        {language ? (
          <span className={classes.languageBadge}>{language}</span>
        ) : (
          <span className={classes.languageBadgeNotDef}>not defined</span>
        )}
        <span className={classes.stars}>
          <StarIcon className={classes.starIcon} />
          {stargazers_count.toLocaleString()}{' '}
        </span>
      </div>
      <div className={classes.license}>
        {license ? license.name : 'No license information'}
      </div>
    </div>
  );
};
