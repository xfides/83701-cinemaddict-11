import {PLURALS} from '../../consts/index.js';

const templateGenres = (genres) => {
  return genres
    .map((genre) => {
      return `<span class="film-details__genre">${genre}</span>`;
    })
    .join(``);
};

const titleGenre = (genres) => {
  return genres.length === 1 ? `Genre` : PLURALS.Genre;
};

export const templateFilmFullInfo = (filmFull) => {
  return `
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" 
             src="${filmFull.pathToPosterImg}" 
             alt="">
        <p class="film-details__age">
          ${filmFull.ageRating}
        </p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">
              ${filmFull.title}
            </h3>
            <p class="film-details__title-original">
              ${filmFull.titleOrig}
            </p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">
               ${filmFull.rate}
            </p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">
               ${filmFull.director}
            </td>
          </tr>
          
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">
              ${filmFull.scenarists}
            </td>
          </tr>
            
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">
               ${filmFull.actors}
            </td>
          </tr>
            
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">
              ${filmFull.prodDate}
            </td>
          </tr>
            
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">
              ${filmFull.duration}
            </td>
          </tr>
            
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">
              ${filmFull.country}
            </td>
          </tr>
            
          <tr class="film-details__row">
            <td class="film-details__term">
              ${titleGenre(filmFull.genres)} 
            </td>
            <td class="film-details__cell">
              ${templateGenres(filmFull.genres)}
            </td>
          </tr>
            
        </table>

        <p class="film-details__film-description">
          ${filmFull.description}
        </p>
      </div>
    </div>
  `;
};
