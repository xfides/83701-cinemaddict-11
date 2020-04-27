// import {AppPage, AppStatus} from '../consts';
// import {ensureArray, hasChangesInProps} from '../utils';
// import {eventManager} from '../event-manager';

import Model from '../models';
import LayoutController from './layout';
import PageController from './page';

export default class Application {

  constructor() {
    this._controllers = {
      layout: new LayoutController(),
      page: new PageController()
    };
    this._modelInstance = new Model();
    this.run = this.run.bind(this);
  }

  run() {
    const dataForController = {
      modelInstance: this._modelInstance
    };

    this._controllers.layout.run(dataForController);
    this._controllers.page.run(dataForController);

    if (!this._modelInstance.getFilmsAll()) {
      this._modelInstance.loadData();
    }
  }
}


/*
export default class Application2 {

  constructor() {
    this._appConfig = {
      status: null,
      page: null
    };
    this._controllers = {
      layout: new LayoutController(),
      page: new PageController()
    };
    this._modelInstance = new Model();
    this.run = this.run.bind(this);
    this.handleLoadDataSuccess = this.handleLoadDataSuccess.bind(this);
    this.handleLoadDataError = this.handleLoadDataError.bind(this);
  }

  handleAppConfig(newAppConfig) {
    this._appConfig = Object.assign(this._appConfig, newAppConfig);
    const configForControllers = Object.assign(
      {modelInstance: this._modelInstance},
      this._appConfig,
    );

    Object.values(this._controllers).forEach((oneController) => {
      oneController.run(configForControllers);
    });
  }

  run(newAppConfig = {status: AppStatus.LOADING, page: AppPage.MAIN}) {
    if (!hasChangesInProps(this._appConfig, newAppConfig)) {
      return;
    }

    this.handleAppConfig(newAppConfig);

    if (!this._modelInstance.getFilms()) {
      this.loadData();
    }
  }

  loadData() {
    this._modelInstance
      .loadData()
      .then(
        this.handleLoadDataSuccess,
        this.handleLoadDataError
      );

    return this;
  }

  handleLoadDataSuccess(newFilms) {
    const newAppConfig = {
      status: ensureArray(newFilms).length
        ? AppStatus.LOADING_SUCCESS_FULL
        : AppStatus.LOADING_SUCCESS_EMPTY,
      page: AppPage.MAIN
    };

    this.run(newAppConfig);
  }

  handleLoadDataError() {
    const newAppConfig = {
      status: AppStatus.LOADING_ERROR,
      page: AppPage.MAIN
    };

    this.run(newAppConfig);
  }


}
*/
