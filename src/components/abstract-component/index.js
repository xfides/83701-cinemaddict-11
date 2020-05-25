import {Error} from '../../consts';

export default class AbstractComponent {

  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(Error.NO_INSTANTIATE);
    }

    this._domElement = null;
  }

  getTemplate() {
    throw new Error(Error.NO_INSTANTIATE);
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
    if (!this.isRendered()) {
      return;
    }

    this.getDomElement().remove();
    this._domElement = null;

    if (
      this.executeAfterRemove
      && (typeof this.executeAfterRemove) === `function`
    ) {
      this.executeAfterRemove();
    }
  }

  isRendered() {
    return !!(
      this._domElement
      && !(this._domElement.parentNode instanceof DocumentFragment)
    );
  }

  render(container) {
    if (!this.getDomElement()) {
      return;
    }

    if (!this.isRendered()) {
      container.append(this._domElement);
      return;
    }

    this.reRender();
  }

  reRender() {
    const oldDomElement = this._domElement;
    const parentOldDomElement = oldDomElement.parentElement;
    this._domElement = null;
    const newDomElement = this.getDomElement();

    if (
      parentOldDomElement
      && oldDomElement
      && newDomElement
    ) {
      parentOldDomElement.replaceChild(newDomElement, oldDomElement);
    }
  }

}
