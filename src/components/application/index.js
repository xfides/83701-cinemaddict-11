import {
  renderHTML,
  renderDOM,
  replaceDOM,
  removeDom
} from '../../utils/common.js';
import {createFooterStatisticsComponent} from '../footer-statistics/index.js';
import {createUserRankComponent} from '../user-rank/index.js';
import {SortKind, FilmFilter} from '../../consts/index.js';
import NavComponent from '../nav/index.js';
import SortComponent from '../sort/index.js';
import ContentComponent from '../content/index.js';
import PopUpComponent from '../pop-up/index.js';

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
        this.renderHeader();
        this.renderNav();
        this.renderContent();
      },

      getCountCommonFilms: () => {
        return this._countCommonFilms;
      },
      setCountCommonFilms: (newCountCommonFilms) => {
        const oldCountCommonFilms = this._countCommonFilms;
        this._countCommonFilms = newCountCommonFilms;
        if (newCountCommonFilms > oldCountCommonFilms) {
          this.renderContent(this.controlData)
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
        this.renderPopUp();
      },

      getCurCategory: () => {
        return this._curCategory;
      },
      setCurCategory: (newCategory) => {
        this._curCategory = newCategory;
        this.renderNav();
        this.renderContent();
      },

      getCurSortKind: () => {
        return this._curSortKind;
      },
      setCurSortKind: (newSortKind) => {
        this._curSortKind = newSortKind;
        this.renderSort();
        this.renderContent();
      }
    }
  }

  instantiateComponents(...componentConstructors) {
    componentConstructors.forEach((Constructor) => {
      this._instances[Constructor.name] = new Constructor(this.controlData);
    });
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

    this.instantiateComponents(
      NavComponent,
      SortComponent,
      ContentComponent,
      PopUpComponent
    );

    this.renderHeader();
    this.renderNav();
    this.renderSort();
    this.renderContent();
    this.renderFooter();
  }

  renderHeader() {
    renderHTML(
      this._domNodes.blockHeader,
      createUserRankComponent(this.controlData.getFilms())
    );
  }

  renderFooter() {
    renderHTML(
      this._domNodes.blockFooterStatistics,
      createFooterStatisticsComponent(this.controlData.getFilms())
    );
  }

  renderNav() {
    const navInstance = this._instances[NavComponent.name];
    const domContainer = this._domNodes.blockMain;

    if (navInstance.isRendered()) {
      const oldDomElement = navInstance.getDomElement();
      navInstance.removeDomElement();
      const newDomElement = navInstance.getDomElement();

      replaceDOM(oldDomElement, newDomElement);
      return;
    }

    renderDOM(domContainer, navInstance.getDomElement());
  }

  renderSort() {
    const sortInstance = this._instances[SortComponent.name];
    const domContainer = this._domNodes.blockMain;

    if (sortInstance.isRendered()) {
      const oldDomElement = sortInstance.getDomElement();
      sortInstance.removeDomElement();
      const newDomElement = sortInstance.getDomElement();

      replaceDOM(oldDomElement, newDomElement);
      return;
    }

    renderDOM(domContainer, sortInstance.getDomElement());
  }

  renderContent() {
    const contentInstance = this._instances[ContentComponent.name];
    const domContainer = this._domNodes.blockMain;

    if (contentInstance.isRendered()) {
      const oldDomElement = contentInstance.getDomElement();
      contentInstance.removeDomElement();
      const newDomElement = contentInstance.getDomElement();

      replaceDOM(oldDomElement, newDomElement);
      return;
    }

    renderDOM(domContainer, contentInstance.getDomElement());
  }

  renderPopUp() {
    const popUpInstance = this._instances[PopUpComponent.name];
    const domContainer = this._domNodes.body;

    if (popUpInstance.isRendered()) {
      const oldDomElement = popUpInstance.getDomElement();
      popUpInstance.removeDomElement();
      const newDomElement = popUpInstance.getDomElement();

      replaceDOM(oldDomElement, newDomElement);
      return;
    }

    renderDOM(domContainer, popUpInstance.getDomElement());
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

}

