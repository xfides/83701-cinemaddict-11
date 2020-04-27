/*
 ---   ---   ---
 Страницы меняются по переходам на ссылки
 У 2 страниц есть общий layout
 Общий layout включает в себя следующие компоненты:
 - UserRank
 - Nav
 - FooterStatistics

 ---   ---   ---
 Особенность компонента UserRank. Он не отображается, если
 у пользователя нет ранга вообще


 */



// import NavComponent from '../components/nav';
// import {createFooterStatisticsComponent} from '../components/footer-statistics';

import {eventManager} from '../event-manager';
import {createUserRankComponent} from '../components/user-rank';
import {LoadingStatus, CssClass, Event} from '../consts';
import {renderHTML} from '../utils';

export default class LayoutController {

  constructor() {
    this._modelInstance = null;
    this.status = null;
    this._domNodes = null;
    this.handleLoadingStatus = this.handleLoadingStatus.bind(this);
  }

  run(dataForController) {
    this._domNodes = {
      blockHeader: document.querySelector(`.${CssClass.HEADER}`),
      blockMain: document.querySelector(`.${CssClass.MAIN}`),
      blockFooterStatistics: document.querySelector(
        `.${CssClass.FOOTER_STATISTICS}`
      )
    };
    this._modelInstance = dataForController.modelInstance;
    eventManager.on(Event.CHANGE_LOADING_STATUS, this.handleLoadingStatus);
    eventManager.trigger(
      Event.CHANGE_LOADING_STATUS,
      {newStatus: LoadingStatus.LOADING}
    );
  }

  handleLoadingStatus(eventObj) {
    if (this.status === eventObj.triggerData.newStatus) {
      return;
    }

    const filmsWatched = this._modelInstance.getFilmsWatched();

    renderHTML(
      this._domNodes.blockHeader,
      createUserRankComponent(filmsWatched)
    );
  }


}
