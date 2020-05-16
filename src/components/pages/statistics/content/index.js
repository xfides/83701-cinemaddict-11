import AbstractComponent from '../../../abstract-component';
import {createTimeControlsComponent} from '../time-controls';
import {createStatisticsTemplate} from './template.js';
import {createStatisticsTitleRankTemplate} from '../title-rank';
import {createStatsInfoComponent} from '../stat-info';
import {createChartComponent} from '../chart';
import {ensureArray} from '../../../../utils';
import {StatisticsTime} from '../../../../consts';

export default class StatisticsComponent extends AbstractComponent {

  constructor() {
    super();
    this._films = null;
    this._curStatsTimeFilter = StatisticsTime.All_TIME;
  }

  setStatisticsInfo(statisticsInfo) {
    this._films = statisticsInfo.filmsWatched;
    this._curStatsTimeFilter = statisticsInfo.curStatsTimeFilter;
    return this;
  }

  _getFilmsByFilterPeriod() {
    const films = ensureArray(this._films);
    const pastTime = this._getPastDate();

    return films.filter((oneFilm) => {
      return oneFilm.watchingDate >= pastTime;
    });
  }

  _getFullFormedStatisticsInfo() {
    const mapGenreToNumberFilms = this._getMapOfGenreToNumberFilms();

    return {
      numberFilms: this._getFilmsByFilterPeriod().length,
      totalDurationHours: Math.trunc(this._getTotalDurationInMinutes() / 60),
      totalDurationMinutes: this._getTotalDurationInMinutes() % 60,
      mapGenreToNumberFilms: mapGenreToNumberFilms,
      topGenre: this._getTopGenre(mapGenreToNumberFilms)
    }
  }

  _getTotalDurationInMinutes() {
    return this._getFilmsByFilterPeriod().reduce((sumMinutes, oneFilm) => {
      return sumMinutes + oneFilm.duration;
    }, 0);
  }

  _getMapOfGenreToNumberFilms() {
    return this._getFilmsByFilterPeriod().reduce((mapGenreCount, oneFilm) => {
      oneFilm.genres.forEach((oneGenre) => {
        mapGenreCount[oneGenre] = mapGenreCount[oneGenre]
          ? ++mapGenreCount[oneGenre]
          : 1;
      });

      return mapGenreCount;
    }, {});
  }

  _getPastDate() {
    const timeNow = +new Date();
    const durationDay = 24 * 60 * 60 * 1000;
    const durationWeek = durationDay * 7;
    const durationMonth = durationWeek * 4 + 2;
    const durationYear = durationMonth * 12;
    let timePast = 0;

    switch (this._curStatsTimeFilter) {
      case StatisticsTime.TODAY:
        timePast = timeNow - durationDay;
        break;
      case StatisticsTime.WEAK:
        timePast = timeNow - durationWeek;
        break;
      case StatisticsTime.MONTH:
        timePast = timeNow - durationMonth;
        break;
      case StatisticsTime.YEAR:
        timePast = timeNow - durationYear;
        break;
      case StatisticsTime.All_TIME:
        timePast = 0;
        break;
    }

    return timePast;
  }

  _getTopGenre(mapGenreCount = {}) {
    const sortedListOfGenresCount = Object.entries(mapGenreCount).sort(
      (propOfMap1, propOfMap2) => {
        return propOfMap2[1] - propOfMap1[1];
      }
    );

    if (sortedListOfGenresCount.length) {
      return sortedListOfGenresCount[0][0];
    }

    return ``;
  }

  getTemplate() {
    const fullStatisticsInfo = this._getFullFormedStatisticsInfo();
    const templateTitleRank = fullStatisticsInfo.numberFilms
      ? createStatisticsTitleRankTemplate(fullStatisticsInfo.numberFilms)
      : ``;
    const templateTimeControls =
      createTimeControlsComponent(this._curStatsTimeFilter);
    const templateStatInfo = createStatsInfoComponent({
      numberFilms: fullStatisticsInfo.numberFilms,
      totalDurationHours: fullStatisticsInfo.totalDurationHours,
      totalDurationMinutes: fullStatisticsInfo.totalDurationMinutes,
      topGenre: fullStatisticsInfo.topGenre,
    });

    const templateChart =
      createChartComponent(fullStatisticsInfo.mapGenreToNumberFilms);

    const templatesOfSections = {
      templateTitleRank,
      templateTimeControls,
      templateStatInfo,
      templateChart
    };

    return createStatisticsTemplate(templatesOfSections);
  }

}
