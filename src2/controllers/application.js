import {AppPage, AppStatus} from '../consts';
import {ensureArray, hasChangesInProps} from '../utils';
import Model from '../models';
import LayoutController from './layout';
import PageController from './page';

export default class Application {

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

  run(newAppConfig = {status: AppStatus.LOADING, page: AppPage.MAIN}) {
    if (!hasChangesInProps(this._appConfig, newAppConfig)) {
      return;
    }

    this._appConfig = Object.assign(this._appConfig, newAppConfig);
    const configForControllers = Object.assign(
      {modelInstance: this._modelInstance},
      this._appConfig,
    );

    Object.values(this._controllers).forEach((oneController) => {
      oneController.run(configForControllers);
    });
  }

  loadData() {
    this._modelInstance.loadData().then(
      this.handleLoadDataSuccess,
      this.handleLoadDataError
    );

    return this;
  }

  handleLoadDataSuccess(newFilmsInfo) {
    const newAppConfig = {
      status: ensureArray(newFilmsInfo).length
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


