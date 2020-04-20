import {CssClass, FilmFilter} from '../../consts/index.js';

const getActiveClass = (isCategoryActive) => {
  return isCategoryActive ? CssClass.NAV_CATEGORY_ACTIVE : ``;
};

const showCountFilmsInCategory = (category) => {
  if (category.name === FilmFilter.ALL) {
    return ``;
  }
  return (`
    <span class="main-navigation__item-count">
      ${category.count}
    </span>
  `);
};

export const createNavItemTemplate = (category) => {
  return (`
    <a 
      href="#${category.id}" 
      class="main-navigation__item ${getActiveClass(category.active)}">
        ${category.name}
      ${showCountFilmsInCategory(category)}
    </a>
  `);
};

