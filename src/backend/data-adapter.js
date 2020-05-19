import {Emoji, FilmFilter} from '../consts';

export const dataAdapter = {

  createServerFilm() {
  },

  createServerComment(clientComment) {
    const partsOfFullPath = clientComment.pathToEmotion.split(`/`);
    const lengthOfPartsOfFullPath = partsOfFullPath.length;
    const lastPartOfFullPath = partsOfFullPath[lengthOfPartsOfFullPath - 1];
    const emotion = lastPartOfFullPath.split('.')[0];

    return {
      id: clientComment.id,
      author: clientComment.author,
      comment: clientComment.text,
      date: new Date(clientComment.date).toISOString(),
      emotion: emotion
    }
  },

  createClientFilm(serverFilm) {
    return {
      id: serverFilm.id,
      pathToPosterImg: serverFilm.film_info.poster,
      title: serverFilm.film_info.title,
      titleOrig: serverFilm.film_info.alternative_title,
      rate: serverFilm.film_info.total_rating,
      director: serverFilm.film_info.director,
      scenarists: serverFilm.film_info.writers,
      actors: serverFilm.film_info.actors,
      prodDate: +new Date(serverFilm.film_info.release.date),
      duration: serverFilm.film_info.runtime,
      country: serverFilm.film_info.release.release_country,
      genres: serverFilm.film_info.genre,
      description: serverFilm.film_info.description,
      ageRating: serverFilm.film_info.age_rating,
      comments: serverFilm.comments,
      [FilmFilter.SCHEDULED]: serverFilm.user_details.watchlist,
      [FilmFilter.WATCHED]: serverFilm.user_details.already_watched,
      [FilmFilter.FAVORITE]: serverFilm.user_details.favorite,
      awaitConfirmChangingCategory: false,
      awaitConfirmAddingComment: false,
      watchingDate: +new Date(serverFilm.user_details.watching_date)
    }
  },

  createClientComment(serverComment) {
    const emojiImg = Emoji.Images[serverComment.emotion.toUpperCase()];
    const fullPathToImg = `${Emoji.RELATIVE_PATH}${emojiImg}`;

    return {
      id: serverComment.id,
      text: serverComment.comment,
      author: serverComment.author,
      pathToEmotion: fullPathToImg,
      date: +new Date(serverComment.date),
      awaitConfirmDeletingComment: false,
    }
  }

};

