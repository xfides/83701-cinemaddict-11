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
    this._analyzePopUpIdentifier = null;
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
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
    this._domElement.addEventListener(`click`, this.handleMouseClick);
    document.addEventListener(`keydown`, this.handleKeyDown);

    return this._domElement;
  }

  handleMouseClick(evt) {
    const closePopUpDom =
      evt.target.classList.contains(`${CssClass.POPUP_CLOSE}`);

    if (closePopUpDom) {
      this._analyzePopUpIdentifier(null);
    }
  }

  handleKeyDown(evt) {
    if (evt.type === `keydown` && evt.keyCode === KeyCode.ESC) {
      this._analyzePopUpIdentifier(null);
    }
  }

  executeAfterRemove() {
    document.removeEventListener(`keydown`, this.handleKeyDown);
  }

  setPopUpFilm(popUpInfo) {
    this._popUpFilm = popUpInfo.film;
    this._analyzePopUpIdentifier = popUpInfo.analyzePopUpIdentifier;
    return this;
  }

}
