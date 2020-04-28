import Model from '../models';
import LayoutController from './layout';
import PageController from './page';
import {LoadingStatus} from '../consts';

export default class Application {

  constructor() {
    this._controllers = {
      layout: new LayoutController(),
      page: new PageController()
    };
    this._modelInstance = Model.getInstance();
  }

  run() {
    this._controllers.layout.run();
    this._controllers.page.run();
    this._modelInstance.setLoadingStatus(LoadingStatus.LOADING);

    if (!this._modelInstance.getFilmsAll()) {
      this._modelInstance.loadData();
    }
  }

}

