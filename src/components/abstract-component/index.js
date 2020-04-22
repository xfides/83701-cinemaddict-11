import {createDomElement} from "../../utils/common.js";

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getDomElement() {
    if (this._domElement) {
      return this._domElement;
    }
    this._domElement = createDomElement(this.getTemplate());

    return this._domElement;
  }

  isRendered() {
    return (
      this._domElement
      && !(this._domElement.parentNode instanceof DocumentFragment)
    );
  }

  removeDomElement() {
    this._domElement = null;
  }
}
