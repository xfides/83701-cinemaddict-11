import {createFakeFilms} from './utils/fakeData.js';
import {FilmSection} from './consts/index.js';
import Application from './components/application/index.js';

const fakeFilms = createFakeFilms();
const configApp = {
  films: fakeFilms,
  countCommonFilms: FilmSection.COMMON.countFilmsToShow
};

const app = new Application(configApp).run();
