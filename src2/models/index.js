import {createFakeFilms} from '../mocks';

export default class Model {

  constructor() {
    // this._films = null;
    // this._countCommonFilms = configApp.countCommonFilms;
    // this._popUpIdentifier = null;
    // this._curCategory = FilmFilter.ALL;
    // this._curSortKind = SortKind.DEFAULT;
  }

  loadData() {
    return Promise.resolve(createFakeFilms());
  }


}
