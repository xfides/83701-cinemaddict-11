export const createNavItemTemplate = (category) => {
  return (`
    <a href="#${category.id}" class="main-navigation__item">
        ${category.name}
      <span class="main-navigation__item-count">
       ${category.count}
      </span>
    </a>
  `);
};

