class EventManager {

  constructor() {
    this._events = {};
  }

  on(name, handler, data) {
    this._events[name] = this._events[name] ? this._events[name] : [];
    this._events[name].push({handler, data});
  }

  off(name, handler) {
    if (!this._events[name]) {
      return;
    }

    if (!handler) {
      delete this._events[name];
      return;
    }

    const handlersByName = this._events[name];
    const indexToDelete = handlersByName.findIndex((oneHandlerInfo) => {
      return oneHandlerInfo.handler === handler;
    });

    if (indexToDelete !== -1) {
      handlersByName.splice(indexToDelete, 1);
    }
  }

  trigger(name, triggerData) {
    const handlersByName = this._events[name];

    if (!handlersByName) {
      return;
    }

    handlersByName.forEach((oneHandlerInfo) => {
      const fullEventData = {name};

      if (oneHandlerInfo.data) {
        fullEventData.data = oneHandlerInfo.data;
      }

      if (triggerData) {
        fullEventData.triggerData = triggerData;
      }

      oneHandlerInfo.handler(fullEventData);
    });
  }

}

const eventManager = new EventManager();
Object.freeze(eventManager);

export {eventManager};


