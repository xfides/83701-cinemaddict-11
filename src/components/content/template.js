import {createTemplateFilmCardBlock} from '../film-card-block/template.js';
import {CountFilmCards} from '../../consts/index.js';

export const createTemplateContent = () => {
  const titleFilmCardCommon = `All movies. Upcoming`;
  const titleFilmCardTopRated = `Top rated`;
  const titleFilmCardMostCommented = `Most commented`;

  const blockFilmCardCommon = createTemplateFilmCardBlock(
    CountFilmCards.COMMON,
    {
      title: {
        text: titleFilmCardCommon,
        isHidden: true
      },
      isShowMore: true,
      isExtraBlock: false
    }
  );
  const blockFilmCardTopRated = createTemplateFilmCardBlock(
    CountFilmCards.TOP_RATED,
    {
      title: {
        text: titleFilmCardTopRated,
        isHidden: false
      },
      isShowMore: false,
      isExtraBlock: true
    }
  );
  const blockFilmCardMostCommented = createTemplateFilmCardBlock(
    CountFilmCards.MOST_COMMENTED,
    {
      title: {
        text: titleFilmCardMostCommented,
        isHidden: false
      },
      isShowMore: false,
      isExtraBlock: true
    }
  );

  return `
    <section class="films">
      ${blockFilmCardCommon}
      ${blockFilmCardTopRated}
      ${blockFilmCardMostCommented}
    </section>
  `;
};
