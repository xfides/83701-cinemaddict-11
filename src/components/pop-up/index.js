import AbstractComponent from '../abstract-component/index.js';
import {createPopUpTemplate} from './template.js';
import {createFilmFullInfoComponent} from '../film-full-info/index.js';
import {createFilmFullInfoControlTemplate} from '../film-full-info-control';
import {createCommentsBlockComponent} from '../comments-block/index.js';
import {createDomElement, cloneObj} from '../../utils/common.js';
import {CssClass, KeyCode} from '../../consts/index.js';

export default class PopUpComponent extends AbstractComponent {
  constructor(controlData) {
    super();
    this._domElement = null;
    this._controlData = controlData;
    this.handleClick = this.handleClick.bind(this);
    this.handleClosingPopUp = this.handleClosingPopUp.bind(this);
  }

  getTemplate() {
    const filmIdentifier = this._controlData.getPopUpIdentifier();
    const filmsAll = this._controlData.getFilms();
    let film = filmsAll.find((oneFilm) => {
      return oneFilm.title.trim() === filmIdentifier;
    });
    film = film ? cloneObj(film) : undefined;

    const templates = {
      filmFullInfo: createFilmFullInfoComponent(film),
      commentsBlock: film ? createCommentsBlockComponent(film.comments) : ``,
      filmFullInfoControl: film ? createFilmFullInfoControlTemplate() : ``
    };

    return createPopUpTemplate(templates);
  }

  getDomElement() {
    if (this._domElement) {
      return this._domElement;
    }

    this._domElement = createDomElement(this.getTemplate());
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

  handleClosingPopUp(evt) {
    if (evt.type === `keydown` && evt.keyCode === KeyCode.ESC) {
      this._controlData.setPopUpIdentifier(null);
    }
  }
}
