import {Event} from '../consts';
import Model from '../models';
import EventManager from '../event-manager';
import StatisticsComponent from '../components/pages/statistics/content';
import {AppPage, DomNode} from '../consts';

export default class StatisticsController {

  constructor() {
    this._modelInstance = Model.getInstance();
    this._eventManager = EventManager.getInstance();
    this._components = {
      [StatisticsComponent.name]: new StatisticsComponent(),
    };
    this._timeFilterChangeHandler = this._timeFilterChangeHandler.bind(this);
  }

  run() {
    this._eventManager.on(
        Event.CHANGE_PAGE,
        this._decorateCheckAppPage(this._renderStatistics).bind(this)
    );
    this._eventManager.on(
        Event.CHANGE_STATISTICS_TIME_FILTER,
        this._decorateCheckAppPage(this._renderStatistics).bind(this)
    );
  }

  _renderStatistics() {
    this._components[StatisticsComponent.name]
      .setStatisticsInfo(this._getStatisticsInfo())
      .render(DomNode.BLOCK_MAIN);
  }

  _getStatisticsInfo() {
    return {
      filmsWatched: this._modelInstance.getFilmsWatched(),
      curStatsTimeFilter: this._modelInstance.getCurStatsTimeFilter(),
      timeFilterChangeHandler: this._timeFilterChangeHandler
    };
  }

  _decorateCheckAppPage(innerFunc) {
    return (...args) => {
      const curPage = this._modelInstance.getCurPage();

      if (curPage === AppPage.STATISTICS) {
        innerFunc.apply(this, args);
        return;
      }

      this._components[StatisticsComponent.name].removeDomElement();
    };
  }

  _timeFilterChangeHandler(newTimeFilter) {
    this._modelInstance.setCurStatsTimeFilter(newTimeFilter);
  }

}
