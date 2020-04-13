import {default as faker} from 'faker';
import {FilmFilters} from '../consts/index.js';

const createObjectByStructure = (structure, dataFactory) => {
  const structureKeys = Object.getOwnPropertyNames(structure);
  const newObj = {};

  try {
    structureKeys.forEach((structureKey) => {
      newObj[structureKey] = dataFactory[structureKey]();
    });
  } catch (err) {
    throw new Error(
      `Structure is not corresponds to dataFactory. Please check if
      object fields are strictly equal dataFactory fields!`
    );
  }

  return newObj;
};

const structureComment = {
  text: `string`,
  pathToEmotion: `string`,
  author: `string`,
  date: `number ms`
};

const structureFilm = {
  pathToPosterImg: `string`,
  title: `string`,
  titleOrig: `string`,
  rate: `number`,
  director: `string`,
  scenarists: `array of strings`,
  actors: `array of strings`,
  prodDate: `number ms`,
  duration: `number (minutes)`,
  country: `string`,
  genres: `array of strings`,
  description: `string`,
  ageRating: `string`,
  comments: `array of objects`,
  [FilmFilters.SCHEDULED]: `bool`,
  [FilmFilters.WATCHED]: `bool`,
  [FilmFilters.FAVORITE]: `bool`
};

const dataFactory = {
  human() {
    return faker.name.findName();
  },
  randomPathToSmth(relativePartOfPath, endNames = []) {
    const randomIndexOfEndName = faker.random.number({
      min: 0, max: endNames.length - 1
    });

    return `${relativePartOfPath}${endNames[randomIndexOfEndName]}`;
  }
};

dataFactory.comment = {
  __proto__: dataFactory,
  text() {
    return faker.lorem.sentences();
  },
  pathToEmotion() {
    const relativePart = `./images/emoji/`;
    const emotionNames = [
      `angry.png`,
      `puke.png`,
      `sleeping.png`,
      `smile.png`
    ];

    return this.randomPathToSmth(relativePart, emotionNames);
  },
  author() {
    return this.human();
  },
  date() {
    return faker.date.between(`2010-01-01`, new Date()).getTime();
  }
};

dataFactory.film = {
  __proto__: dataFactory,
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

    return this.randomPathToSmth(relativePart, posterNames);
  },
  title() {
    return faker.lorem.sentence();
  },
  titleOrig() {
    return `~ORIGINAL~ ${faker.lorem.sentence()} ~ORIGINAL~`;
  },
  rate() {
    return faker.random.number({min: 11, max: 100}) / 10;
  },
  director() {
    return this.human();
  },
  scenarists() {
    const numberOfScenarists = faker.random.number({min: 2, max: 5});

    return new Array(numberOfScenarists).fill(null).map(this.human);
  },
  actors() {
    const numberOfActors = faker.random.number({min: 3, max: 10});

    return new Array(numberOfActors).fill(null).map(this.human);
  },
  prodDate() {
    return faker.date.between(`1989-01-01`, `2020-01-01`).getTime();
  },
  duration() {
    return faker.random.number({min: 80, max: 180});
  },
  country() {
    return faker.address.country();
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
  description() {
    return faker.lorem.sentences(faker.random.number({min: 1, max: 6}));
  },
  ageRating() {
    const ageRatings = [
      `0+`,
      `6+`,
      `12+`,
      `16+`,
      `18+`,
    ];

    const randomIndexOfAgeRatings = faker.random.number({
      min: 0, max: ageRatings.length - 1
    });

    return ageRatings[randomIndexOfAgeRatings];
  },
  comments() {
    const commentsToFilm =
      new Array(faker.random.number({min: 0, max: 17})).fill(null);

    return commentsToFilm.map(
      () => createObjectByStructure(structureComment, this.comment)
    );

  },
  [FilmFilters.SCHEDULED]() {
    return faker.random.boolean() && faker.random.boolean();
  },
  [FilmFilters.WATCHED]() {
    return faker.random.boolean();
  },
  [FilmFilters.FAVORITE]() {
    return faker.random.boolean() && faker.random.boolean();
  }
};

export const createFakeFilms = () => {
  const countFakeFilms = faker.random.number({min: 7, max: 27});
  const fakeFilms = [];

  for (let indexFakeFilm = 0; indexFakeFilm < countFakeFilms; indexFakeFilm++) {
    fakeFilms.push(createObjectByStructure(structureFilm, dataFactory.film));
  }

  if (faker.random.boolean() && faker.random.boolean()) {
    if (faker.random.boolean()) {
      return [];
    }
    return undefined;
  }

  return fakeFilms;
};

