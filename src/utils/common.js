import {PosRender, UserRanks} from '../consts/index.js';

const cloneObj = (obj) => {

  const target = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {

      if (typeof (obj[key]) === `object`) {
        target[key] = cloneObj(obj[key]);
      } else {
        target[key] = obj[key];
      }

    }
  }

  return target;
};

export const render = (container, component, place = PosRender.BEFORE_END) => {
  container.insertAdjacentHTML(place, component);
};

export const truncateStr = (str, newLength, endSymbol) => {
  return `${str.slice(0, newLength)}${endSymbol}`;
};

export const sortFilmsByField = (films, field) => {
  if (films.length === 0) {
    return [];
  }

  if (Array.isArray(films[0][field])) {
    films.sort((oneFilm, anotherFilm) => {
      return anotherFilm[field][`length`] - oneFilm[field][`length`];
    });
  } else {
    films.sort((oneFilm, anotherFilm) => {
      return anotherFilm[field] - oneFilm[field];
    });
  }

  return films;
};

export const sortFilmsByFieldWithClone = (films, field) => {
  const cloneFilms = cloneObj(films);

  sortFilmsByField(cloneFilms, field);

  return cloneFilms;
};

export const filterFilmsByField = (films, field) => {
  return films.filter((oneFilm) => {
    return !!oneFilm[field];
  });
};

export const getUserRank = (countFilmsWatched) => {
  if (
    countFilmsWatched >= UserRanks.NOVICE.from
    && countFilmsWatched <= UserRanks.NOVICE.to
  ) {
    return UserRanks.NOVICE.text;
  }

  if (
    countFilmsWatched >= UserRanks.FAN.from
    && countFilmsWatched <= UserRanks.FAN.to
  ) {
    return UserRanks.FAN.text;
  }

  if (countFilmsWatched >= UserRanks.MOVIE_BUFF.from) {
    return UserRanks.MOVIE_BUFF.text;
  }

  return ``;
};

export const formatNumberWithSpaces = (number) => {
  return new Intl.NumberFormat(`ru`).format(number);
};

export const formatDurationMinutes = (numberOfMinutes) => {
  return numberOfMinutes >= 60 ? (
    `${(numberOfMinutes / 60 ^ 0)}h ${(numberOfMinutes % 60)}m`
  ) : (
    `${numberOfMinutes}m`
  );
};

export const formatMsToCommentDate = (milliseconds) => {
  const formatter = new Intl.DateTimeFormat(`en-GB`, {
    year: `numeric`,
    month: `2-digit`,
    day: `2-digit`,
    hour: `2-digit`,
    minute: `2-digit`,
  });

  const [ymd, hm] = formatter.format(new Date(milliseconds)).split(`, `);
  const [y, m, d] = ymd.split(`/`);

  return `${d}/${m}/${y} ${hm}`;
};

export const formatMsToFilmFullDate = (milliseconds) => {
  const formatter = new Intl.DateTimeFormat(`en-GB`, {
    year: `numeric`,
    month: `long`,
    day: `2-digit`,
  });

  return formatter.format(new Date(milliseconds));
};


