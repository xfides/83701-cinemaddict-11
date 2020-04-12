export const templateNav = (categoriesTemplate) => {
  return `
    <nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" 
           class="main-navigation__item main-navigation__item--active">
          All movies
        </a>
        ${categoriesTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>
  `;
};
