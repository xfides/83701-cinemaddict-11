import Model from '../models';
import LayoutController from './layout';
import PageController from './page';
import PopUpController from './pop-up';
import StatisticsController from './statistics';
import {LoadingStatus} from '../consts';

export default class Application {

  constructor() {
    this._controllers = {
      layout: new LayoutController(),
      page: new PageController(),
      popUp: new PopUpController(),
      statistics: new StatisticsController(),
    };
    this._modelInstance = Model.getInstance();
  }

  run() {
    this._controllers.layout.run();
    this._controllers.page.run();
    this._controllers.popUp.run();
    this._controllers.statistics.run();
    this._modelInstance.setCurLoadingStatus(LoadingStatus.LOADING);

    if (!this._modelInstance.getFilmsAll()) {
      this._modelInstance.loadData();
    }
  }

}

