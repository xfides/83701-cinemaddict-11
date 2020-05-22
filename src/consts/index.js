export const ScreenMsg = {
  NO_FILMS: `There are no movies`,
  LOADING: `Loading...`,
  NO_FILM_FULL_INFO: `Sorry. Not found such movie`,
  STUB_ADD_COMMENT: `Select reaction below and write comment here`,
  STUB_ADD_COMMENT_ZERO: `Great movie!`,
  FETCH_ABORTED: `OOOPS! Something went wrong. Please try later...`
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
  NAV_STATISTICS: `main-navigation__additional`,
  SORT_KIND_ACTIVE: `sort__button--active`,
  FILM_CARD_TITLE: `film-card__title`,
  FILM_CARD_COMMENTS: `film-card__comments`,
  FILM_CARD_POSTER: `film-card__poster`,
  FILM_CARD: `film-card`,
  FILM_DETAILS: `film-details`,
  POPUP_CLOSE: `film-details__close-btn`,
  HEADER: `header`,
  MAIN: `main`,
  CHART: `statistic__chart`,
  FOOTER_STATISTICS: `footer__statistics`,
  FILM_CARD_BUTTON: `film-card__controls-item`,
  FILM_CARD_BUTTON_LOAD: `film-card__controls-item--load`,
  FILM_CARD_BUTTON_ACTIVE: `film-card__controls-item--active`,
  FILM_CARD_BUTTON_SCHEDULED: `film-card__controls-item--add-to-watchlist`,
  FILM_CARD_BUTTON_WATCHED: `film-card__controls-item--mark-as-watched`,
  FILM_CARD_BUTTON_FAVORITE: `film-card__controls-item--favorite`,
  FILM_DETAILS_CONTROL: `film-details__control-label`,
  FILM_DETAILS_CONTROL_DISABLED: `film-details__control-label--disabled`,
  FILM_DETAILS_CONTROL_SCHEDULED: `film-details__control-label--watchlist`,
  FILM_DETAILS_CONTROL_WATCHED: `film-details__control-label--watched`,
  FILM_DETAILS_CONTROL_FAVORITE: `film-details__control-label--favorite`,
  FILM_DETAILS_EMOJI_LABEL: `film-details__emoji-label`,
  FILM_DETAILS_EMOJI_LABEL_ADD: `film-details__add-emoji-label`,
  FILM_DETAILS_EMOJI_LIST: `film-details__emoji-list`,
  FILM_DETAILS_EMOJI_ITEM: `film-details__emoji-item`,
  FILM_DETAILS_COMMENT: `film-details__comment`,
  FILM_DETAILS_COMMENT_NEW: `film-details__new-comment`,
  FILM_DETAILS_COMMENT_LOAD_NEW: `film-details__new-comment--load`,
  FILM_DETAILS_COMMENT_INPUT: `film-details__comment-input`,
  FILM_DETAILS_COMMENT_DELETE: `film-details__comment-delete`,
  FILM_DETAILS_COMMENTS_COUNT: `film-details__comments-count`,
  STATISTICS_FILTER_LABEL: `statistic__filters-label`,
};

export const Emoji = {
  RELATIVE_PATH: `images/emoji/`,
  Images: {
    ANGRY: `angry.png`,
    PUKE: `puke.png`,
    SLEEPING: `sleeping.png`,
    SMILE: `smile.png`
  },
  DEFAULT_IMG_COMMENT_ZERO: `smile.png`
};

export const Poster = {
  RELATIVE_PATH: `images/posters/`,
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
  ESC: `Escape`,
  ENTER: `Enter`,
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
  CHANGE_COUNT_COMMON_FILMS: `change_count_common_films`,
  CHANGE_POP_UP_IDENTIFIER: `change_pop_up_identifier`,
  CHANGE_STATISTICS_TIME_FILTER: `change_statistics_time_filter`,
  FILM_CHANGE_CATEGORY_DONE: `film_change_category_done`,
  FILM_CHANGE_CATEGORY_START: `film_change_category_start`,
  FILM_DELETE_COMMENT_START: `film_delete_comment_start`,
  FILM_DELETE_COMMENT_DONE: `film_delete_comment_done`,
  FILM_ADD_COMMENT_START: `film_add_comment_start`,
  FILM_ADD_COMMENT_DONE: `film_add_comment_done`
};

export const DomNode = {
  BODY: document.body,
  BLOCK_HEADER: document.querySelector(`.${CssClass.HEADER}`),
  BLOCK_MAIN: document.querySelector(`.${CssClass.MAIN}`),
  BLOCK_FOOTER_STATISTICS: document.querySelector(
      `.${CssClass.FOOTER_STATISTICS}`
  )
};

export const Animation = {
  HEAD_SHAKE: {
    class: `animate__headShake`,
    duration: 1000
  },
  ERROR_IN_FORM: {
    class: `animate__errorBlink`,
    duration: 1000
  }
};

export const Error = {
  FORM_EMPTY_USER_MSG: `form_empty_user_msg`,
  FORM_NO_CHECKED_EMOJI: `form_no_checked_emoji`
};

export const StatisticsTime = {
  ALL_TIME: `All time`,
  TODAY: `Today`,
  WEAK: `Weak`,
  MONTH: `Month`,
  YEAR: `Year`,
};

export const Backend = {
  END_POINT: `https://11.ecmascript.pages.academy/cinemaddict/`,
  RESOURCE_MOVIES: `movies`,
  RESOURCE_COMMENTS: `comments`,
  REQUEST_METHOD_GET: `GET`,
  REQUEST_METHOD_POST: `POST`,
  REQUEST_METHOD_PUT: `PUT`,
  REQUEST_METHOD_DELETE: `DELETE`,
  Headers: {
    CONTENT_TYPE_JSON: [`Content-Type`, `application/json`],
    BASIC_AUTH: [`Authorization`, `Basic g2i3b4b5e6r7i8s9hh`]
  }
};
