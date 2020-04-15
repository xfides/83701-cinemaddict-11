import {createNavItemTemplate} from '../nav-item/index.js';
import {createNavTemplate} from './template.js';
import {FilmFilter} from '../../consts/index.js';
import {filterFilmsByField} from '../../utils/common.js';

export const createNavComponent = (films = []) => {
  const categoriesTemplate = Object.keys(FilmFilter)
    .map((oneCategory) => {
      return createNavItemTemplate({
        name: FilmFilter[oneCategory],
        id: FilmFilter[oneCategory].toLowerCase(),
        count: filterFilmsByField(films, FilmFilter[oneCategory]).length
      });
    })
    .join(``);

  return createNavTemplate(categoriesTemplate);
};
