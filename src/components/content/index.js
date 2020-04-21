import {createContentTemplate} from './template.js';
import {createFilmsBlockComponent} from '../films-block/index.js';
import {FilmSection, CssClass} from '../../consts/index.js';
import {
  sortFilmsByFieldWithClone,
  sortFilmsByField, createDomElement
} from '../../utils/common.js';


export default class ContentComponent {

  constructor(controlData) {
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
    if(evt.target.classList.contains(CssClass.SHOW_MORE)){
      let curCountCommonFilms = this._controlData.getCountCommonFilms();
      this._controlData.setCountCommonFilms(
        curCountCommonFilms+curCountCommonFilms
      )
    }

   //   обложке фильма, заголовку, количеству комментариев



  }

  handleClickShowMore(evt) {

  }

  handleClickShowPopUp(evt) {

  }

  isRendered() {
    return (
      this._domElement
      && !(this._domElement.parentNode instanceof DocumentFragment)
    );
  }

  removeDomElement() {
    this._domElement = null;
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
  };

  sortFilmsByKind(films, sortKind) {
    if (!films) {
      return undefined;
    }

    if(sortKind.associatedFilmField) {
      return sortFilmsByFieldWithClone(films, sortKind.associatedFilmField);
    }

    return films;
  }

}
