import AbstractComponent from '../abstract-component/index.js';
import {createContentTemplate} from './template.js';
import {createFilmsBlockComponent} from '../films-block/index.js';
import {FilmSection, CssClass} from '../../consts/index.js';
import {
  sortFilmsByFieldWithClone,
  createDomElement
} from '../../utils/common.js';

export default class ContentComponent extends AbstractComponent {
  constructor(controlData) {
    super();
    this._domElement = null;
    this._controlData = controlData;
    this.handleClick = this.handleClick.bind(this);
  }

  getTemplate() {
    const configFilms = {
      films: this._controlData.getFilms(),
      countCommonFilms: this._controlData.getCountCommonFilms(),
      curCategory: this._controlData.getCurCategory(),
      curSortKind: this._controlData.getCurSortKind(),
    };

    const extraFilms = configFilms.films ? configFilms.films : [];
    const filmsTR = sortFilmsByFieldWithClone(extraFilms, `rate`);
    const filmsMC = sortFilmsByFieldWithClone(extraFilms, `comments`);

    configFilms.films =
      this.getFilmsByCategory(configFilms.films, configFilms.curCategory);

    configFilms.films =
      this.sortFilmsByKind(configFilms.films, configFilms.curSortKind);

    const templatesOfFilmSections = {
      common: createFilmsBlockComponent(
          FilmSection.COMMON, configFilms.films, configFilms.countCommonFilms
      ),
      topRated: extraFilms.length
        ? createFilmsBlockComponent(FilmSection.TOP_RATED, filmsTR)
        : ``,
      mostCommented: extraFilms.length
        ? createFilmsBlockComponent(FilmSection.MOST_COMMENTED, filmsMC)
        : ``
    };

    return createContentTemplate(templatesOfFilmSections);
  }

  getDomElement() {
    if (this._domElement) {
      return this._domElement;
    }

    this._domElement = createDomElement(this.getTemplate());
    this._domElement.addEventListener(`click`, this.handleClick);

    return this._domElement;
  }

  handleClick(evt) {
    this.handleShowMore(evt);
    this.handleOpenPopUp(evt);
  }

  handleShowMore(evt) {
    if (evt.target.classList.contains(CssClass.SHOW_MORE)) {
      let curCountCommonFilms = this._controlData.getCountCommonFilms();
      this._controlData.setCountCommonFilms(
          curCountCommonFilms + FilmSection.COMMON.countFilmsToShow
      );
    }
  }

  handleOpenPopUp(evt) {
    if (
      evt.target.classList.contains(CssClass.FILM_CARD_POSTER)
      || evt.target.classList.contains(CssClass.FILM_CARD_TITLE)
      || evt.target.classList.contains(CssClass.FILM_CARD_COMMENTS)
    ) {
      const filmCheckedDom = evt.target.closest(`.${CssClass.FILM_CARD}`);

      if (!filmCheckedDom) {
        return;
      }

      const titleOfFilmChecked = filmCheckedDom
        .querySelector(`.${CssClass.FILM_CARD_TITLE}`)
        .textContent
        .trim();

      if (titleOfFilmChecked === this._controlData.getPopUpIdentifier()) {
        return;
      }

      this._controlData.setPopUpIdentifier(
          titleOfFilmChecked ? titleOfFilmChecked : null
      );
    }
  }

  getFilmsByCategory(films, category) {
    if (!films) {
      return undefined;
    }

    return films.filter((oneFilm) => {
      return (
        oneFilm[category] === true || oneFilm[category] === undefined
      );
    });
  }

  sortFilmsByKind(films, sortKind) {
    if (!films) {
      return undefined;
    }

    if (sortKind.associatedFilmField) {
      return sortFilmsByFieldWithClone(films, sortKind.associatedFilmField);
    }

    return films;
  }
}
