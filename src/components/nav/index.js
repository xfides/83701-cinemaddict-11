import {templateNavItem} from '../nav-item/index.js';
import {templateNav} from './template.js';
import {FilmFilter} from '../../consts/index.js';
import {filterFilmsByField} from '../../utils/common.js';

export const nav = (films = []) => {
  const categoriesTemplate = Object.keys(FilmFilter)
    .map((oneCategory) => {
      return templateNavItem({
        name: FilmFilter[oneCategory],
        id: FilmFilter[oneCategory].toLowerCase(),
        count: filterFilmsByField(films, FilmFilter[oneCategory]).length
      });
    })
    .join(``);

  return templateNav(categoriesTemplate);
};
