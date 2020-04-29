import AbstractComponent from '../../abstract-component';
import {createPopUpTemplate} from './template.js';
import {createFilmFullInfoComponent} from '../film-full-info';
import {createFilmFullInfoControlTemplate} from '../film-full-info-control';
import {createCommentsBlockComponent} from '../comments-block';
import {createDomElement, cloneObj} from '../../../utils';
import {CssClass, KeyCode} from '../../../consts';

export default class PopUpComponent extends AbstractComponent {
  constructor() {
    super();
    this._popUpFilm = null;
    this.handleClick = this.handleClick.bind(this);
    this.handleClosingPopUp = this.handleClosingPopUp.bind(this);
  }

  getTemplate() {



    const templates = {
      filmFullInfo: createFilmFullInfoComponent(film),
      commentsBlock: film ? createCommentsBlockComponent(film.comments) : ``,
      filmFullInfoControl: film ? createFilmFullInfoControlTemplate() : ``
    };

    return createPopUpTemplate(templates);
  }

  getDomElement() {
    super.getDomElement();

    this._domElement.addEventListener(`click`, this.handleClick);
    document.addEventListener(`keydown`, this.handleClosingPopUp);

    return this._domElement;
  }

  handleClick(evt) {
    const closePopUpDom =
      evt.target.classList.contains(`${CssClass.POPUP_CLOSE}`);

    if (closePopUpDom) {
      this._controlData.setPopUpIdentifier(null);
    }
  }

  removeAfter() {
    document.removeEventListener(`keydown`, this.handleClosingPopUp);
  }

  setPopUpIdentifier(popUpFilm){
    this._popUpFilm = popUpFilm;
    return this;
  }

  handleClosingPopUp(evt) {
    if (evt.type === `keydown` && evt.keyCode === KeyCode.ESC) {
      this._controlData.setPopUpIdentifier(null);
    }
  }
}
