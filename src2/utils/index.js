import {UserRank} from '../consts/index.js';
import {ShortDescParam} from '../consts';

export const cloneObj = (obj) => {
  const target = Array.isArray(obj) ? [] : {};

  Object.keys(obj).forEach((key) => {
    target[key] = obj[key] === `object` ? cloneObj(obj[key]) : obj[key];
  });

  return target;
};

export const renderHTML = (container, strHtml) => {
  container.insertAdjacentHTML(`beforeend`, strHtml);
};

export const truncateStr = (str,
                            newLength = ShortDescParam.COUNT_SYMBOLS,
                            endSymbol = ShortDescParam.END_SYMBOL) => {
  return str.length < 140 ? str : `${str.slice(0, newLength)}${endSymbol}`;
};

export const sortFilmsByField = (films, field) => {
  const isArrayField = Array.isArray(films[0] ? films[0][field] : false);

  if (isArrayField) {
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

export const getUserRank = (countFilmsWatched) => {
  if (
    countFilmsWatched >= UserRank.NOVICE.from
    && countFilmsWatched <= UserRank.NOVICE.to
  ) {
    return UserRank.NOVICE.text;
  }

  if (
    countFilmsWatched >= UserRank.FAN.from
    && countFilmsWatched <= UserRank.FAN.to
  ) {
    return UserRank.FAN.text;
  }

  if (countFilmsWatched >= UserRank.MOVIE_BUFF.from) {
    return UserRank.MOVIE_BUFF.text;
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

export const ensureArray = (data) => {
  return Array.isArray(data) ? data : [];
};


// export const hasChangesInProps = (checkingObj, newObj) => {
//   return Object.keys(newObj).some((keyOfNewObj) => {
//     return checkingObj[keyOfNewObj] !== newObj[keyOfNewObj];
//   });
// };

// export const createDomElement = (templateStrHtml) => {
//   const templateTag = document.createElement(`template`);
//   templateTag.innerHTML = templateStrHtml;
//
//   return templateTag.content.firstElementChild;
// };

// export const renderDOM = (container, domElement) => {
//   container.append(domElement);
// };
//
// export const replaceDOM = (oldDomElement, newDomElement) => {
//   const parentDomElement = oldDomElement.parentElement;
//
//   const isExistElements =
//     !!(parentDomElement && oldDomElement && newDomElement);
//
//   if (isExistElements && parentDomElement.contains(oldDomElement)) {
//     parentDomElement.replaceChild(newDomElement, oldDomElement);
//   }
// };

// export const filterFilmsByField = (films, field) => {
//   return films.filter((oneFilm) => {
//     return !!oneFilm[field];
//   });
// };

// export const removeDom = (instance) => {
//   instance.getDomElement().remove();
//   instance.removeDomElement();
//
//   if (instance.removeAfter && (typeof instance.removeAfter) === `function`) {
//     instance.removeAfter();
//   }
// };
