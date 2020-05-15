import AbstractComponent from '../../../abstract-component';
import {createTimeControlsComponent} from '../time-controls';
import {createStatisticsTemplate} from './template.js';
import {createStatisticsTitleRankTemplate} from '../title-rank';
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

  getTemplate() {
    const countFilms = ensureArray(this._films).length;

    const templateTitleRank = countFilms
      ? createStatisticsTitleRankTemplate(countFilms)
      : ``;

    const templateTimeControls =
      createTimeControlsComponent(this._curStatsTimeFilter);

    const templatesOfSections = {
      templateTitleRank,
      templateTimeControls
    };

    return createStatisticsTemplate(templatesOfSections);
  }

}
