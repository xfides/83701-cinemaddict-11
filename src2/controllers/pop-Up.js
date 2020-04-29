import EventManager from '../event-manager';
import Model from '../models';
import PopUpComponent from '../components/pop-up/pop-up';
import {Event, FilmFilter, DomNode, FilmSection, SortKind} from '../consts';


export default class PopUpController {

  constructor() {
    this._modelInstance = Model.getInstance();
    this._eventManager = EventManager.getInstance();
    this._components = {
      [PopUpComponent.name]: new PopUpComponent()
    };
  }

  run() {
    this._eventManager.on(Event.newPopUpIdentifier, this.handlePopUp)
  }

  handlePopUp(){


    const filmsAll = this._modelInstance.newPopUpIdentifier();
    let film = filmsAll.find((oneFilm) => {
      return oneFilm.title.trim() === newPopUpIdentifier;
    });
    film = film ? cloneObj(film) : undefined;
  }

  renderPopUp(popUpFilm){
    this._components[PopUpComponent.name]
      .setPopUpFilm(popUpFilm)
      .render(DomNode.body);
  }

  removePopUp(){

  }


  updatePageMain() {
    const sortInfo = {
      curSortKind: this._modelInstance.getCurSortKind(),
      changeSortKindCB: this.handleNewSortKind
    };

    this.renderSort(sortInfo);
    this.renderFilms(this.getFilmsInfo());
  }

  handleNewSortKind(newSortKind) {
    const curSortKind = this._modelInstance.getCurSortKind();

    if (curSortKind !== newSortKind) {
      this._modelInstance.setCurSortKind(newSortKind);
    }
  }

  renderSort(sortInfo) {
    this._components[SortComponent.name]
      .setSortKind(sortInfo)
      .render(DomNode.blockMain);
  }




}


