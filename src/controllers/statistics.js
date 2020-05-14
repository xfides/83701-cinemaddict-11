import {Event} from '../consts';
import Model from '../models';
import EventManager from '../event-manager';
import StatisticsComponent from '../components/pages/statistics/content';
import {AppPage, DomNode} from '../consts';

export default class StatisticsController{

  constructor() {
    this._modelInstance = Model.getInstance();
    this._eventManager = EventManager.getInstance();
    this._components = {
      [StatisticsComponent.name]: new StatisticsComponent(),
    };
    this._pageChangeHandler = this._pageChangeHandler.bind(this);

  }

  run() {
    this._eventManager.on(Event.CHANGE_PAGE, this._pageChangeHandler);
  }

  _pageChangeHandler(evt){
    if (evt.triggerData.newPage === AppPage.STATISTICS){
      this._components[StatisticsComponent.name].render(DomNode.blockMain);
      return undefined;
    }

    this._components[StatisticsComponent.name].removeDomElement();
  }

}
