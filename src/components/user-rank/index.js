import {templateUserRank} from './template.js';
import {fakeCountWatchedFilms} from '../../utils/fakeData.js';

const getUserRank = (countWatchedFilms) => {
  if (countWatchedFilms === 0) {
    return ``;
  }
  if (countWatchedFilms >= 1 && countWatchedFilms <= 10) {
    return `novice`;
  }
  if (countWatchedFilms >= 11 && countWatchedFilms <= 20) {
    return `fan`;
  }
  if (countWatchedFilms >= 21) {
    return `movie buff`;
  }
  return ``;
};

const userRankStatus = getUserRank(fakeCountWatchedFilms);

export const userRank = templateUserRank({userRankStatus});
