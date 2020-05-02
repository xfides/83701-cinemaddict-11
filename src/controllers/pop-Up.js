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

    this.handlePopUp = this.handlePopUp.bind(this);
    this.analyzePopUpIdentifier = this.analyzePopUpIdentifier.bind(this);
  }

  run() {
    this._eventManager.on(Event.CHANGE_POP_UP_IDENTIFIER, this.handlePopUp);
  }

  handlePopUp() {
    const curPopUpIdentifier = this._modelInstance.getCurPopUpIdentifier();
    const filmsAll = this._modelInstance.getFilmsAll();

    if (!curPopUpIdentifier) {
      this._components[PopUpComponent.name].removeDomElement();

      return;
    }

    const film = filmsAll.find((oneFilm) => {
      return oneFilm.title.trim() === curPopUpIdentifier;
    });

    if (!film) {
      return;
    }

    const popUpInfo = {
      film: cloneObj(film),
      analyzePopUpIdentifier: this.analyzePopUpIdentifier
    };

    this.renderPopUp(popUpInfo);
  }

  renderPopUp(popUpInfo) {
    this._components[PopUpComponent.name]
      .setPopUpFilm(popUpInfo)
      .render(DomNode.body);
  }

  analyzePopUpIdentifier(newPopUpIdentifier) {
    if (this._modelInstance.getCurPopUpIdentifier() !== newPopUpIdentifier) {
      this._modelInstance.setCurPopUpIdentifier(newPopUpIdentifier);
    }
  }

}


