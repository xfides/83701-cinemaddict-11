import {FilmFilter, CssClass} from '../../../consts';

const getInputState = (film, category) => {
  let attrs = ` `;

  if (film.awaitConfirmChangingCategory) {
    attrs = ` ${attrs} disabled `;
  }
  if (film.awaitConfirmChangingCategory === category) {
    attrs = ` ${attrs} data-load `;
  }
  if (film[category]) {
    attrs = ` ${attrs} checked `;
  }

  return attrs;
};

const getDisabledLabel = (film) => {
  return film.awaitConfirmChangingCategory
    ? CssClass.FILM_DETAILS_CONTROL_DISABLED
    : ``;
};

export const createFilmFullInfoControlTemplate = (film) => {
  return (`
    <section class="film-details__controls">
      <input 
        type="checkbox" 
        class="film-details__control-input visually-hidden" 
        id="watchlist" 
        name="watchlist"
        ${getInputState(film, FilmFilter.SCHEDULED)}>
      <label 
        for="watchlist" 
        class="film-details__control-label
             film-details__control-label--watchlist
             ${getDisabledLabel(film)}">
        Add to watchlist
      </label>
      <input 
        type="checkbox" 
        class="film-details__control-input visually-hidden" 
        id="watched" 
        name="watched"
        ${getInputState(film, FilmFilter.WATCHED)}>
      <label 
        for="watched" 
        class="film-details__control-label
             film-details__control-label--watched
             ${getDisabledLabel(film)}">
         Already watched
      </label>
      <input 
        type="checkbox" 
        class="film-details__control-input 
             visually-hidden" id="favorite" 
        name="favorite"
        ${getInputState(film, FilmFilter.FAVORITE)}>
      <label 
        for="favorite" 
        class="film-details__control-label
             film-details__control-label--favorite
             ${getDisabledLabel(film)}">
        Add to favorites
      </label>
    </section>
  `);
};
