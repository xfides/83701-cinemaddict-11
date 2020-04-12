import {templateNavItem} from '../nav-item/index.js';
import {templateNav} from './template.js';
import {FilmFilters} from '../../consts/index.js'
import {filterFilmsByField} from '../../utils/common.js';

export const nav = (films) => {
  const categories = Object.keys(FilmFilters);

  const categoriesTemplate = categories
    .map((oneCategory) => {
      return templateNavItem({
        name: FilmFilters[oneCategory],
        id: FilmFilters[oneCategory].toLowerCase(),
        count: filterFilmsByField(films, FilmFilters[oneCategory]).length
      })
    })
    .join(``);

  return templateNav(categoriesTemplate);
};
