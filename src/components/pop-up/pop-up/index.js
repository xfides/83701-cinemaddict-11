import AbstractComponent from '../../abstract-component';
import {createPopUpTemplate} from './template.js';
import {createFilmFullInfoComponent} from '../film-full-info';
import {createFilmFullInfoControlTemplate} from '../film-full-info-control';
import {createCommentsBlockComponent} from '../comments-block';
import {CssClass, KeyCode} from '../../../consts';

export default class PopUpComponent extends AbstractComponent {

  constructor() {
    super();
    this._popUpFilm = null;
    this._popUpChangeHandler = null;
    this._popUpClickHandler = this._popUpClickHandler.bind(this);
    this._popUpKeyDownHandler = this._popUpKeyDownHandler.bind(this);
  }

  getTemplate() {
    const templates = {
      filmFullInfo: createFilmFullInfoComponent(this._popUpFilm),
      commentsBlock: this._popUpFilm
        ? createCommentsBlockComponent(this._popUpFilm.comments)
        : ``,
      filmFullInfoControl: this._popUpFilm
        ? createFilmFullInfoControlTemplate()
        : ``
    };

    return createPopUpTemplate(templates);
  }

  getDomElement() {
    super.getDomElement();
    this._domElement.addEventListener(`click`, this._popUpClickHandler);
    document.addEventListener(`keydown`, this._popUpKeyDownHandler);

    return this._domElement;
  }

  executeAfterRemove() {
    document.removeEventListener(`keydown`, this._popUpKeyDownHandler);
  }

  setPopUpInfo(popUpInfo) {
    this._popUpFilm = popUpInfo.popUpFilm;
    this._popUpChangeHandler = popUpInfo.popUpChangeHandler;
    return this;
  }

  _popUpClickHandler(evt) {
    const closePopUpDom =
      evt.target.classList.contains(`${CssClass.POPUP_CLOSE}`);

    if (closePopUpDom) {
      this._popUpChangeHandler(null);
    }
  }

  _popUpKeyDownHandler(evt) {
    if (evt.type === `keydown` && evt.keyCode === KeyCode.ESC) {
      this._popUpChangeHandler(null);
    }
  }

}
