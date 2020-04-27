import {createDomElement} from "../../utils";

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

    const templateTag = document.createElement(`template`);
    templateTag.innerHTML = this.getTemplate();
    this._domElement = templateTag.content.firstElementChild;

    return this._domElement;
  }

  removeDomElement() {
    this.getDomElement().remove();
    this._domElement = null;

    if (this.didAfterRemove && (typeof this.didAfterRemove) === `function`) {
      this.didAfterRemove();
    }
  }

  isRendered() {
    return (
      this._domElement
      && !(this._domElement.parentNode instanceof DocumentFragment)
    );
  }

  render(container) {
    if (!this.isRendered()) {
      container.append(this.getDomElement());
      return;
    }

    this.reRender();
  }

  reRender() {
    const oldDomElement = this.getDomElement();
    const parentOldDomElement = oldDomElement.parentElement;
    this.removeDomElement();
    const newDomElement = this.getDomElement();

    if (
      parentOldDomElement
      && oldDomElement
      && newDomElement
      && parentOldDomElement.contains(oldDomElement)
    ) {
      parentOldDomElement.replaceChild(newDomElement, oldDomElement);
    }
  }

}
