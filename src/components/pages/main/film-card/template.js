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
               ${film.isScheduledActive}
               ">
          Add to watchlist
        </button>
        <button 
          class="film-card__controls-item 
               button 
               film-card__controls-item--mark-as-watched
               ${film.isWatchedActive}
               ">
          Mark as watched
        </button>
        <button 
          class="film-card__controls-item 
               button 
               film-card__controls-item--favorite
               ${film.isFavoriteActive}
               ">
          Mark as favorite
        </button>
       </form>
    </article>
  `);
};
