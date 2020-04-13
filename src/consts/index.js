export const PosRender = {
  BEFORE_END: `beforeend`,
  BEFORE_BEGIN: `beforebegin`
};

export const ScreenMsgs = {
  NO_FILMS: `There are no movies in our database`,
  LOADING: `Loading...`,
  NO_FILM_FULL_INFO: `Sorry. Not found such movie`,
  STUB_ADD_COMMENT: `Select reaction below and write comment here`,
  STUB_ADD_COMMENT_ZERO: `Great movie!`
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

export const ShortDescParams = {
  COUNT_SYMBOLS: 140,
  END_SYMBOL: `...`
};

export const PLURALS = {
  Genre: `Genres`
};

export const Emojis = {
  RELATIVE_PATH: `./images/emoji/`,
  IMGS: [
    `angry.png`,
    `puke.png`,
    `sleeping.png`,
    `smile.png`
  ],
  DEFAULT_IMG_COMMENT_ZERO: `smile.png`
};

export const Posters = {
  RELATIVE_PATH: `./images/posters/`,
  IMGS: [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`,
  ]
};
