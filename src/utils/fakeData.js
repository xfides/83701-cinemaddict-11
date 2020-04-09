import {default as faker} from 'faker';
import {createObjectByStructure} from './index';

const dataFactory = {
  countFilmsInDB() {
    return faker.random.number({min: 99999, max: 999999});
  },
  countWatchedFilms() {
    return faker.random.number({min: 0, max: 31});
  },
  filteredFilms() {
    return {
      history: faker.random.number({min: 0, max: 2}),
      favorites: faker.random.number({min: 0, max: 10}),
      watchList: faker.random.number({min: 0, max: 20})
    };
  },
  title() {
    return faker.lorem.sentence();
  },
  rate() {
    return faker.random.number({min: 11, max: 100}) / 10;
  },
  prodDate() {
    return faker.date.between(`1989-01-01`, `2020-01-01`);
  },
  pathToPosterImg() {
    const relativePart = `./images/posters/`;
    const posterNames = [
      `made-for-each-other.png`,
      `popeye-meets-sinbad.png`,
      `sagebrush-trail.jpg`,
      `santa-claus-conquers-the-martians.jpg`,
      `the-dance-of-life.jpg`,
      `the-great-flamarion.jpg`,
      `the-man-with-the-golden-arm.jpg`,
    ];
    const randomPosterNumber = faker.random.number({
      min: 0, max: posterNames.length - 1
    });

    return `${relativePart}${posterNames[randomPosterNumber]}`;
  },
  duration() {
    return faker.random.number({min: 80, max: 180});
  },
  description() {
    return faker.lorem.sentences(faker.random.number({min: 1, max: 6}));
  },
  genres() {
    const allGenres = [
      `Musical`,
      `Western`,
      `Drama`,
      `Comedy`,
      `Cartoon`,
      `Mystery`,
      `Action`,
      `Adventure`,
      `Historical`,
      `Horror`,
    ];
    const selectedGenres = [];
    const countGenresForFilm = faker.random.number({min: 1, max: 3});

    for (let count = 0; count < countGenresForFilm; count++) {
      const allGenresLength = allGenres.length;
      const randomIndexGenre = faker.random.number({
        min: 0,
        max: allGenresLength - 1
      });
      const randomGenre = allGenres[randomIndexGenre];

      selectedGenres.push(randomGenre);
      allGenres.splice(randomIndexGenre, 1);
    }

    return selectedGenres;
  },
  pathToEmotion() {
    const relativePart = `./images/emoji/`;
    const emotionNames = [
      `angry.png`,
      `puke.png`,
      `sleeping.png`,
      `smile.png`
    ];
    const randomEmotionNumber = faker.random.number({
      min: 0, max: emotionNames.length - 1
    });

    return `${relativePart}${emotionNames[randomEmotionNumber]}`;
  },
  human() {
    return faker.name.findName();
  },
  author() {
    return super.human();
  },
  date() {
    return faker.date.between(`2010-01-01`, new Date());
  },
  text() {
    const randomNumberParagraphs = faker.random.number({
      min: 1,
      max: 3
    });

    return faker.lorem.paragraphs(randomNumberParagraphs, `<br/>`);
  },
  scenarists() {
  },
  actors() {
  },
  country() {
  },
  ageRating() {
  },
};

const structureComment = {
  text: `string`,
  pathToEmotion: `string`,
  author: `string`,
  date: `object date`
};

const structureFilm = {
  pathToPosterImg: `string`,
  title: `string`,
  rate: `number`,
  prodDate: `object date`,
  duration: `number (minutes)`,
  genres: `array of strings`,
  description: `string`,
  comments: `array of objects`,
  director: `string`,
  scenarist: `array of strings`,
  actors: `array of strings`,
  country: `string`,
  ageRating: `string`
};


export const fakeCountWatchedFilms = dataFactory.countWatchedFilms();

export const fakeCountFilmsInDB = dataFactory.countFilmsInDB();

export const fakeFilteredFilms = dataFactory.filteredFilms();


/*
 let popUp = {
 pathToPosterImg:``,
 titleFilm:``,
 titleFilmOrig:``,
 rate:``,
 producer:``,
 scenarists:``,
 actors:``,
 prodDate:``,
 duration:``,
 country:``,
 genres:``,
 description:``,
 ageRating:``
 };
 */
