export const PosRender = {
  BEFORE_END: `beforeend`,
  BEFORE_BEGIN: `beforebegin`
};

export const MSG_NO_FILMS = `There are no movies in our database`;

export const ScreenMsgs = {
  NO_FILMS: `There are no movies in our database`,
  LOADING: `Loading...`
};

export const FilmFilters = {
  SCHEDULED: `Watchlist`,
  WATCHED: `History`,
  FAVORITE: `Favorites`
};

export const UserRanks = {
  NOVICE: {
    text: `Novice`,
    from: 1,
    to: 10
  },
  FAN: {
    text: `Fun`,
    from: 11,
    to: 20
  },
  MOVIE_BUFF: {
    text: `Movie_buff`,
    from: 21,
  }
};

export const FilmSections = {
  COMMON: {
    title: {
      text: `All movies. Upcoming`,
      isHidden: true
    },
    countFilmsToShow: 5,
    isShowMore: true,
    isExtraBlock: false
  },
  TOP_RATED: {
    title: {
      text: `Top rated`,
      isHidden: false
    },
    countFilmsToShow: 2,
    isShowMore: false,
    isExtraBlock: true
  },
  MOST_COMMENTED: {
    title: {
      text: `Most commented`,
      isHidden: false
    },
    countFilmsToShow: 2,
    isShowMore: false,
    isExtraBlock: true
  }

};

export const CssClasses = {
  HIDDEN_BLOCK: `visually-hidden`,
  FILM_SECTION: `films-list`,
  FILM_SECTION_EXTRA: `films-list--extra`
};
