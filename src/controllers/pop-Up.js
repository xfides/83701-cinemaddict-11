import EventManager from '../event-manager';
import Model from '../models';
import PopUpComponent from '../components/pop-up/pop-up';
import {Event, DomNode} from '../consts';
import {cloneObj} from '../utils';

export default class PopUpController {

  constructor() {
    this._modelInstance = Model.getInstance();
    this._eventManager = EventManager.getInstance();
    this._components = {
      [PopUpComponent.name]: new PopUpComponent()
    };

    this._popUpChangeHandler = this._popUpChangeHandler.bind(this);
    this._popUpUpdateHandler = this._popUpUpdateHandler.bind(this);
  }

  run() {
    this._eventManager.on(
      Event.CHANGE_POP_UP_IDENTIFIER,
      this._popUpUpdateHandler
    );
  }

  _renderPopUp(popUpInfo) {
    this._components[PopUpComponent.name]
      .setPopUpInfo(popUpInfo)
      .render(DomNode.body);
  }

  _popUpUpdateHandler() {
    const curPopUpId = this._modelInstance.getCurPopUpId();
    if (!curPopUpId) {
      this._components[PopUpComponent.name].removeDomElement();

      return;
    }

    const filmById = this._modelInstance.getFilmById(curPopUpId);
    const popUpInfo = {
      popUpFilm: filmById ? cloneObj(filmById) : undefined,
      popUpChangeHandler: this._popUpChangeHandler
    };

    this._renderPopUp(popUpInfo);
  }

  _popUpChangeHandler(newPopUpId) {
    if (this._modelInstance.getCurPopUpId() !== newPopUpId) {
      this._modelInstance.setCurPopUpId(newPopUpId);
    }
  }

}


