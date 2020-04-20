import {renderHTML, renderDOM, replaceDOM} from '../../utils/common.js';
import {createFooterStatisticsComponent} from '../footer-statistics/index.js';
import {createUserRankComponent} from '../user-rank/index.js';
import {ScreenMsg} from '../../consts/index.js';
// import CreateContentComponent from '../content/index.js';
import NavComponent from '../nav/index.js';


export default class Application {

  constructor(configApp = {}) {
    this._domNodes = {};
    this._instances = {};

    this._films = configApp.films;
    this._countCommonFilms = configApp.countCommonFilms;
    this._popUpId = null;
    this._curCategory = null;
    this._curFilterName = null;

    this.controlData = {
      getFilms: () => {
        return this._films;
      },
      setFilms: (newFilms) => {
        this._films = newFilms;
        this.renderHeader(this.controlData);
        this.renderContent(this.controlData)
      },

      getCountCommonFilms: () => {
        return this._countCommonFilms;
      },
      setCountCommonFilms: (newCountCommonFilms) => {
        this._countCommonFilms = newCountCommonFilms;
        this.renderContent(this.controlData)
      },

      getPopUpId: () => {
      },
      setPopUpId: (newPopUpId) => {
        /* run render\delete popUp */
      },

      getCurCategory: () => {
        return this._curCategory;
      },
      setCurCategory: (newCategory) => {
        this._curCategory = newCategory;
        this.renderNav();
      },

      getCurFilterName: () => {
        return this._curFilterName;
      },
      setCurFilterName: (newFilter) => {
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

    this.instantiateComponents(NavComponent);

    this.renderHeader();
    this.renderNav();
    this.renderFooter();
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


  renderContent() {
    contentInstance = new CreateContentComponent(this.controlData);

    renderDOM(this._domNodes.blockMain, contentInstance.getDomElement());
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

}

