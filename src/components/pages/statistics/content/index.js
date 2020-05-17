import AbstractComponent from '../../../abstract-component';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {createTimeControlsComponent} from '../time-controls';
import {createStatisticsTemplate} from './template.js';
import {createStatisticsTitleRankTemplate} from '../title-rank';
import {createStatInfoTemplate} from '../stat-info';
import {ensureArray} from '../../../../utils';
import {StatisticsTime, CssClass} from '../../../../consts';

export default class StatisticsComponent extends AbstractComponent {

  constructor() {
    super();
    this._films = null;
    this._curStatsTimeFilter = StatisticsTime.MONTH;
    this._chartInfo = {};
    this._timeFilterClickHandler = this._timeFilterClickHandler.bind(this);
  }

  getTemplate() {
    const fullStatisticsInfo = this._getFullFormedStatisticsInfo();

    const templateTitleRank = fullStatisticsInfo.numberFilms
      ? createStatisticsTitleRankTemplate(fullStatisticsInfo.numberFilms)
      : ``;

    const templateTimeControls =
      createTimeControlsComponent(this._curStatsTimeFilter);

    const templateStatInfo = createStatInfoTemplate({
      numberFilms: fullStatisticsInfo.numberFilms,
      totalDurationHours: fullStatisticsInfo.totalDurationHours,
      totalDurationMinutes: fullStatisticsInfo.totalDurationMinutes,
      topGenre: fullStatisticsInfo.topGenre,
    });

    this._chartInfo = fullStatisticsInfo.mapGenreToNumberFilms;

    return createStatisticsTemplate({
      templateTitleRank,
      templateTimeControls,
      templateStatInfo,
    });
  }

  getDomElement() {
    super.getDomElement();
    this._createChart(this._chartInfo);
    this._domElement.addEventListener(`click`, this._timeFilterClickHandler);

    return this._domElement;
  }

  setStatisticsInfo(statisticsInfo) {
    this._films = statisticsInfo.filmsWatched;
    this._curStatsTimeFilter = statisticsInfo.curStatsTimeFilter;
    this._timeFilterChangeHandler = statisticsInfo.timeFilterChangeHandler;
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

  _createChart(chartInfo = {}) {
    const BAR_HEIGHT = 50;
    const statisticCtx = this._domElement.querySelector(`.${CssClass.CHART}`);
    const genresLabels = [];
    const numbersFilms = [];

    chartInfo = Object.entries(chartInfo).sort((genreInfo1, genreInfo2) => {
      return genreInfo2[1] - genreInfo1[1];
    });
    chartInfo.forEach((genreInfo) => {
      genresLabels.push(genreInfo[0]);
      numbersFilms.push(genreInfo[1]);
    });

    if (!chartInfo.length) {
      return;
    }

    statisticCtx.height = BAR_HEIGHT * chartInfo.length;

    new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: genresLabels,
        datasets: [{
          data: numbersFilms,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: 'start',
            align: 'start',
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  };

  _timeFilterClickHandler(evt) {
    const curHtmlFor =
      `statistics-${this._curStatsTimeFilter.toLowerCase().split(` `).join(`-`)}`;

    if (
      !evt.target.classList.contains(CssClass.STATISTICS_FILTER_LABEL)
      || evt.target.htmlFor === curHtmlFor
    ) {
      evt.preventDefault();
      return;
    }

    let newTimeFilter = evt.target.htmlFor.split(`-`).slice(1).join(` `);
    newTimeFilter =
      `${newTimeFilter.slice(0, 1).toUpperCase()}${newTimeFilter.slice(1)}`;

    this._timeFilterChangeHandler(newTimeFilter);

  }

}
