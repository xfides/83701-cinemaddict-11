import AbstractStore from './abstract-store.js';

export default class StoreLocalStorage extends AbstractStore {

  get() {
    try {
      return JSON.parse((this._store.getItem(this._key)) || {});
    } catch (error) {
      return {};
    }
  }

  set(data) {
    this._store.setItem(this._key, JSON.stringify(data));
  }

  remove() {
    this._store.removeItem(this._key);
  }

}
