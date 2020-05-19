import faker from 'faker';
import {FilmFilter, Emoji, Poster} from '../consts';

const createObjectByStructure = (structure, dataFactory) => {
  const structureKeys = Object.getOwnPropertyNames(structure);
  const newObj = {};

  try {
    structureKeys.forEach((structureKey) => {
      newObj[structureKey] = dataFactory[structureKey]();
    });
  } catch (err) {
    throw new Error(`
      Structure is not corresponds to dataFactory. Please check if
      object fields are strictly equal dataFactory fields!
    `);
  }

  return newObj;
};

const structureComment = {
  id: `string`,
  text: `string`,
  pathToEmotion: `string`,
  author: `string`,
  date: `number ms`,
  awaitConfirmDeletingComment: `bool`
};

const structureFilm = {
  id: `string`,
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
  [FilmFilter.SCHEDULED]: `bool`,
  [FilmFilter.WATCHED]: `bool`,
  [FilmFilter.FAVORITE]: `bool`,
  awaitConfirmChangingCategory: `string | null`,
  awaitConfirmAddingComment: `bool`,
  watchingDate: `number ms`
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
  id() {
    return faker.random.uuid();
  },
  text() {
    return faker.lorem.sentences();
  },
  pathToEmotion() {
    return this.randomPathToSmth(
        Emoji.RELATIVE_PATH,
        Object.values(Emoji.Images)
    );
  },
  author() {
    return this.human();
  },
  date() {
    return faker.date.between(`2010-01-01`, new Date()).getTime();
  },
  awaitConfirmDeletingComment() {
    return false;
  }
};

dataFactory.film = {
  __proto__: dataFactory,
  id() {
    return faker.random.uuid();
  },
  pathToPosterImg() {
    return this.randomPathToSmth(Poster.RELATIVE_PATH, Poster.IMAGES);
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
      new Array(faker.random.number({min: 0, max: 2})).fill(null);

    return commentsToFilm.map(
        () => createObjectByStructure(structureComment, this.comment)
    );

  },
  [FilmFilter.SCHEDULED]() {
    return faker.random.boolean() && faker.random.boolean();
  },
  [FilmFilter.WATCHED]() {
    return faker.random.boolean();
  },
  [FilmFilter.FAVORITE]() {
    return faker.random.boolean() && faker.random.boolean();
  },
  awaitConfirmChangingCategory() {
    return null;
  },
  awaitConfirmAddingComment() {
    return false;
  },
  watchingDate() {
    return faker.date.between(`2018-01-01`, `2020-05-15`).getTime();
  }
};

export const createFakeFilms = () => {
  const fakeFilms = new Array(faker.random.number({min: 7, max: 27}))
    .fill(null)
    .map(() => {
      return createObjectByStructure(structureFilm, dataFactory.film);
    });

  if (faker.random.boolean() && faker.random.boolean()) {
    if (faker.random.boolean()) {
      return [];
    }
    return undefined;
  }

  return fakeFilms;
};
