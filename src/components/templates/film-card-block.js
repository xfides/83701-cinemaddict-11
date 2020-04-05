import {createTemplateFilmCard} from './film-card.js';
import {createTemplateBtnShowMore} from './show-more.js';

export const createTemplateFilmCardBlock = (numberOfCards, contentData) => {
  const {title: {text, isHidden}, isShowMore, isExtraBlock} = contentData;

  const textTitle = typeof text === `string` ? text : ``;
  const classHiddenTitle = isHidden ? `visually-hidden` : ``;
  const templateShowMore = isShowMore ? createTemplateBtnShowMore() : ``;
  const classExtraBlock = isExtraBlock ? `films-list--extra` : `films-list`;

  return `
    <section class="${classExtraBlock}">
      <h2 class="films-list__title ${classHiddenTitle}">
        ${textTitle}
      </h2>
      <div class="films-list__container">
        ${new Array(numberOfCards).fill(createTemplateFilmCard()).join(``)}
      </div>
      ${templateShowMore}
    </section>
  `;
};
