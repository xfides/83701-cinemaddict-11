export const createNavTemplate = (categoriesTemplate) => {
  return (`
    <nav class="main-navigation">
      <div class="main-navigation__items">
        ${categoriesTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>
  `);
};
