export const ScreenMsg = {
  NO_FILMS: `There are no movies`,
  LOADING: `Loading...`,
  NO_FILM_FULL_INFO: `Sorry. Not found such movie`,
  STUB_ADD_COMMENT: `Select reaction below and write comment here`,
  STUB_ADD_COMMENT_ZERO: `Great movie!`
};

export const FilmFilter = {
  ALL: `All movies`,
  SCHEDULED: `Watchlist`,
  WATCHED: `History`,
  FAVORITE: `Favorites`
};

export const SortKind = {
  DEFAULT: {
    description: `Sort by default`,
    associatedFilmField: null
  },
  DATE: {
    description: `Sort by date`,
    associatedFilmField: `prodDate`
  },
  RATE: {
    description: `Sort by rating`,
    associatedFilmField: `rate`
  },
  COUNT_COMMENTS: {
    description: `Sort by count of comments`,
    associatedFilmField: `comments`
  }
};

export const UserRank = {
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

export const FilmSection = {
  COMMON: {
    title: {
      text: `All movies. Upcoming`,
      isHidden: true
    },
    countFilmsToShow: 5,
    isExtraBlock: false
  },
  TOP_RATED: {
    title: {
      text: `Top rated`,
      isHidden: false
    },
    countFilmsToShow: 2,
    isExtraBlock: true
  },
  MOST_COMMENTED: {
    title: {
      text: `Most commented`,
      isHidden: false
    },
    countFilmsToShow: 2,
    isExtraBlock: true
  }
};

export const CssClass = {
  HIDDEN_BLOCK: `visually-hidden`,
  SECTION_FILMS_ALL: `films`,
  FILM_SECTION: `films-list`,
  FILM_SECTION_EXTRA: `films-list--extra`,
  SHOW_MORE: `films-list__show-more`,
  NAV_CATEGORY_ACTIVE: `main-navigation__item--active`,
  SORT_KIND_ACTIVE: `sort__button--active`,
  FILM_CARD_TITLE: `film-card__title`,
  FILM_CARD_COMMENTS: `film-card__comments`,
  FILM_CARD_POSTER: `film-card__poster`,
  FILM_CARD: `film-card`,
  POPUP_CLOSE: `film-details__close-btn`,
  HEADER: `header`,
  MAIN: `main`,
  FOOTER_STATISTICS: `footer__statistics`
};

export const Emoji = {
  RELATIVE_PATH: `./images/emoji/`,
  IMAGES: [
    `angry.png`,
    `puke.png`,
    `sleeping.png`,
    `smile.png`
  ],
  DEFAULT_IMG_COMMENT_ZERO: `smile.png`
};

export const Poster = {
  RELATIVE_PATH: `./images/posters/`,
  IMAGES: [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`,
  ]
};

export const KeyCode = {
  ESC: 27
};

export const ShortDescParam = {
  COUNT_SYMBOLS: 140,
  END_SYMBOL: `...`
};

export const AppPage = {
  MAIN: `main`,
  STATISTICS: `statistics`
};

export const LoadingStatus = {
  LOADING: `loading`,
  LOADING_ERROR: `loading_error`,
  LOADING_SUCCESS_FULL: `loading_success_full`,
  LOADING_SUCCESS_EMPTY: `loading_success_empty`
};

export const Event = {
  CHANGE_PAGE: `change_page`,
  CHANGE_LOADING_STATUS: `change_loading_status`,
  CHANGE_CUR_CATEGORY: `change_cur_category`,
  CHANGE_CUR_SORT_KIND: `change_cur_sort_kind`,
  CHANGE_COUNT_COMMON_FILMS: `change_count_common_films`
};

export const DomNode = {
  body: document.body,
  blockHeader: document.querySelector(`.${CssClass.HEADER}`),
  blockMain: document.querySelector(`.${CssClass.MAIN}`),
  blockFooterStatistics: document.querySelector(
    `.${CssClass.FOOTER_STATISTICS}`
  )
};
