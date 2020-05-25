import {Error} from '../consts';

export default class AbstractStore {

  constructor(key, store = window.localStorage) {
    this._store = store;
    this._key = key;
  }

  get() {
    throw new Error(Error.NO_INSTANTIATE);
  }

  set() {
    throw new Error(Error.NO_INSTANTIATE);
  }

  remove(){
    throw new Error(Error.NO_INSTANTIATE);
  }

  // clearAllStorage() {
  //   if (this._store.clear && typeof this._store.clear === `function`) {
  //     this._store.clear();
  //   } else {
  //     this._store.setData(this._key, null);
  //   }
  // }

}

