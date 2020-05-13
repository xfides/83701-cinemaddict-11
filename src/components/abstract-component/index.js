export default class AbstractComponent {

  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._domElement = null;
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
      // container.append(this.getDomElement());
      container.append(this._domElement);
      return;
    }

    this.reRender();
  }

  reRender() {
    // const oldDomElement = this.getDomElement();
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
