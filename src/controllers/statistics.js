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
  }

  run() {
    this._eventManager.on(
      Event.CHANGE_PAGE,
      this._decorateCheckAppPage(this._renderStatistics).bind(this)
    );
  }

  _renderStatistics() {
    this._components[StatisticsComponent.name]
      .setStatisticsInfo(this._getStatisticsInfo())
      .render(DomNode.blockMain);
  }

  _getStatisticsInfo() {
    return {
      filmsWatched: this._modelInstance.getFilmsWatched(),
      curStatsTimeFilter: this._modelInstance.getCurStatsTimeFilter()
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

}
