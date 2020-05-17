import AbstractComponent from '../../abstract-component';
import {createUserRankTemplate} from './template.js';
import {getUserRank} from '../../../utils';

export default class UserRankComponent extends AbstractComponent {

  constructor() {
    super();
    this._filmsWatched = null;
  }

  getTemplate() {
    if (this._filmsWatched.length <= 0) {
      return `<section class="header__profile profile"></section>`;
    }

    return createUserRankTemplate(getUserRank(this._filmsWatched.length));
  }

  setFilmsWatched(newFilmsWatched) {
    this._filmsWatched = newFilmsWatched;
    return this;
  }

}
