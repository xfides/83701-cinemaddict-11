import {CssClass} from '../../../consts';

export const createNavTemplate = (categoriesTemplate, isStatisticsPage) => {
  return (`
    <nav class="main-navigation">
      <div class="main-navigation__items">
        ${categoriesTemplate}
      </div>
      <a 
        href="#stats" 
        class="main-navigation__additional 
            ${isStatisticsPage ? CssClass.NAV_CATEGORY_ACTIVE : ``}">
          Stats
      </a>
    </nav>
  `);
};
