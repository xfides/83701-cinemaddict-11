import {CssClass, FilmFilter} from '../../../../consts';

const configureButtonClasses = (film, category) => {
  let classes = ` `;

  if (film.awaitConfirmChangingCategory === category) {
    classes = ` ${classes} ${CssClass.FILM_CARD_BUTTON_LOAD} `;
  }
  if (film[category]) {
    classes = ` ${classes} ${CssClass.FILM_CARD_BUTTON_ACTIVE} `;
  }

  return classes;
};

const getDisabledBtnAttr = (film) => {
  return film.awaitConfirmChangingCategory ? `disabled` : ``;
};

export const createFilmCardTemplate = (film) => {
  return (`
    <article class="film-card" data-id="${film.id}">
      <h3 class="film-card__title">
        ${film.title}
      </h3>
      <p class="film-card__rating">
        ${film.rate}
      </p>
      <p class="film-card__info">
        <span class="film-card__year">${film.year}</span>
        <span class="film-card__duration">${film.duration}</span>
        <span class="film-card__genre">${film.genre}</span>
      </p>
      <img 
        src="${film.pathToPosterImg}" 
        alt="" 
        class="film-card__poster">
      <p class="film-card__description">
        ${film.description}
      </p>
      <a class="film-card__comments">
        ${film.countComments} comments
      </a>
      <form class="film-card__controls">
        <button 
          class="film-card__controls-item 
               button 
               film-card__controls-item--add-to-watchlist
               ${configureButtonClasses(film, FilmFilter.SCHEDULED)}"
          ${getDisabledBtnAttr(film)}>
               
          Add to watchlist
        </button>
        <button 
          class="film-card__controls-item 
               button 
               film-card__controls-item--mark-as-watched
               ${configureButtonClasses(film, FilmFilter.WATCHED)}"
          ${getDisabledBtnAttr(film)}>
          Mark as watched
        </button>
        <button 
          class="film-card__controls-item 
               button 
               film-card__controls-item--favorite
               ${configureButtonClasses(film, FilmFilter.FAVORITE)}"
          ${getDisabledBtnAttr(film)}>     
          Mark as favorite
        </button>
       </form>
    </article>
  `);
};
