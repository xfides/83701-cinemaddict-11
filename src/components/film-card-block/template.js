import {createTemplateFilmCard} from '../film-card/template.js';
import {createTemplateBtnShowMore} from '../show-more/template.js';

export const createTemplateFilmCardBlock = (numberOfCards, contentData) => {
  const {title: {text, isHidden}, isShowMore, isExtraBlock} = contentData;

  const textTitle = typeof text === `string` ? text : ``;
  const classHiddenTitle = isHidden ? `visually-hidden` : ``;
  const templateShowMore = isShowMore ? createTemplateBtnShowMore() : ``;
  const classExtraBlock = isExtraBlock ? `films-list--extra` : `films-list`;

  const templateFilmCards =
    new Array(numberOfCards).fill(createTemplateFilmCard()).join(``);

  return `
    <section class="${classExtraBlock}">
      <h2 class="films-list__title ${classHiddenTitle}">
        ${textTitle}
      </h2>
      <div class="films-list__container">
        ${templateFilmCards}
      </div>
      ${templateShowMore}
    </section>
  `;
};
