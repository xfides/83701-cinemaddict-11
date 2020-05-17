import {getUserRank} from '../../../../utils';

export const createStatisticsTitleRankTemplate = (countFilms) => {
  return (`
    <p class="statistic__rank">
      Your rank
      <img 
        class="statistic__img" src="images/bitmap@2x.png" 
        alt="Avatar" 
        width="35" 
        height="35">
      <span class="statistic__rank-label">
        ${getUserRank(countFilms)}
      </span>
    </p>    
  `);
};
