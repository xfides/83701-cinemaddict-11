const showCountFilmsInCategory = (category) => {
  if (!category.showCountFilms) {
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
      class="main-navigation__item ${category.activeClass}">
        ${category.name}
        ${showCountFilmsInCategory(category)}
    </a>
  `);
};

