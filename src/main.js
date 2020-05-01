import {createFakeFilms} from './utils/fakeData.js';
import {FilmSection} from './consts/index.js';
import Application from './components/application/index.js';

const fakeFilms = createFakeFilms();
const configApp = {
  films: fakeFilms,
  countCommonFilms: FilmSection.COMMON.countFilmsToShow
};

new Application(configApp).run();
