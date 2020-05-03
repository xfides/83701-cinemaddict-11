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

  _getPopUpFilmByIdentifier(curPopUpIdentifier) {
    const filmsAll = this._modelInstance.getFilmsAll();

    return filmsAll.find((oneFilm) => {
      return oneFilm.title.trim() === curPopUpIdentifier;
    });
  }

  _popUpUpdateHandler() {
    const curPopUpIdentifier = this._modelInstance.getCurPopUpIdentifier();
    if (!curPopUpIdentifier) {
      this._components[PopUpComponent.name].removeDomElement();

      return;
    }

    const filmByIdentifier = this._getPopUpFilmByIdentifier(curPopUpIdentifier);
    const popUpInfo = {
      popUpFilm: filmByIdentifier ? cloneObj(filmByIdentifier) : undefined,
      popUpChangeHandler: this._popUpChangeHandler
    };

    this._renderPopUp(popUpInfo);
  }

  _popUpChangeHandler(newPopUpIdentifier) {
    if (this._modelInstance.getCurPopUpIdentifier() !== newPopUpIdentifier) {
      this._modelInstance.setCurPopUpIdentifier(newPopUpIdentifier);
    }
  }

}


