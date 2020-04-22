import {createUserRankComponent} from '../user-rank/index.js';
import {createFooterStatisticsComponent} from '../footer-statistics/index.js';
import NavComponent from '../nav/index.js';
import SortComponent from '../sort/index.js';
import ContentComponent from '../content/index.js';
import PopUpComponent from '../pop-up/index.js';
import {SortKind, FilmFilter} from '../../consts/index.js';
import {
  renderHTML,
  renderDOM,
  replaceDOM,
  removeDom
} from '../../utils/common.js';

export default class Application {
  constructor(configApp = {}) {
    this._domNodes = {};
    this._instances = {};

    this._films = configApp.films;
    this._countCommonFilms = configApp.countCommonFilms;
    this._popUpIdentifier = null;
    this._curCategory = FilmFilter.ALL;
    this._curSortKind = SortKind.DEFAULT;

    this.controlData = {
      getFilms: () => {
        return this._films;
      },
      setFilms: (newFilms) => {
        this._films = newFilms;
      },

      getCountCommonFilms: () => {
        return this._countCommonFilms;
      },
      setCountCommonFilms: (newCountCommonFilms) => {
        const oldCountCommonFilms = this._countCommonFilms;
        this._countCommonFilms = newCountCommonFilms;
        if (newCountCommonFilms > oldCountCommonFilms) {
          this.renderClassComponent(ContentComponent, this._domNodes.blockMain);
        }
      },

      getPopUpIdentifier: () => {
        return this._popUpIdentifier;
      },
      setPopUpIdentifier: (newPopUpIdentifier) => {

        if (newPopUpIdentifier === null) {
          const popUpInstance = this._instances[PopUpComponent.name];
          if (!popUpInstance || !popUpInstance.isRendered()) {
            return;
          }

          removeDom(popUpInstance);
          this._popUpIdentifier = newPopUpIdentifier;
          return;
        }

        this._popUpIdentifier = newPopUpIdentifier;
        this.renderClassComponent(PopUpComponent, this._domNodes.body);
      },

      getCurCategory: () => {
        return this._curCategory;
      },
      setCurCategory: (newCategory) => {
        this._curCategory = newCategory;

        this.renderClassComponent(NavComponent, this._domNodes.blockMain);
        this.renderClassComponent(ContentComponent, this._domNodes.blockMain);
      },

      getCurSortKind: () => {
        return this._curSortKind;
      },
      setCurSortKind: (newSortKind) => {
        this._curSortKind = newSortKind;

        this.renderClassComponent(SortComponent, this._domNodes.blockMain);
        this.renderClassComponent(ContentComponent, this._domNodes.blockMain);
      }
    }
  }

  instantiateClassComponents(...componentConstructors) {
    componentConstructors.forEach((Constructor) => {
      this._instances[Constructor.name] = new Constructor(this.controlData);
    });
  }

  renderClassComponent(nameOfClass, container) {
    const instance = this._instances[nameOfClass.name];

    if (instance.isRendered()) {
      const oldDomElement = instance.getDomElement();
      instance.removeDomElement();
      const newDomElement = instance.getDomElement();

      replaceDOM(oldDomElement, newDomElement);
      return;
    }

    renderDOM(container, instance.getDomElement());
  }

  renderFunctionComponent(nameOfFunction, container) {
    renderHTML(container, nameOfFunction(this.controlData));
  }

  run() {
    this._domNodes = {
      body: document.body,
      blockHeader: document.querySelector(`.header`),
      blockMain: document.querySelector(`.main`),
      blockFooterStatistics: document.querySelector(
        `.footer__statistics`
      )
    };

    this.instantiateClassComponents(
      NavComponent,
      SortComponent,
      ContentComponent,
      PopUpComponent
    );

    this.renderFunctionComponent(
      createUserRankComponent, this._domNodes.blockHeader
    );
    this.renderClassComponent(NavComponent, this._domNodes.blockMain);
    this.renderClassComponent(SortComponent, this._domNodes.blockMain);
    this.renderClassComponent(ContentComponent, this._domNodes.blockMain);
    this.renderFunctionComponent(
      createFooterStatisticsComponent, this._domNodes.blockFooterStatistics
    );
  }
}

