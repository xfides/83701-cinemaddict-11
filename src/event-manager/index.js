const singletonKey = Symbol();
const singletonVerification = Symbol();

export default class EventManager {

  constructor(verificationValue) {
    if (verificationValue !== singletonVerification) {
      throw new Error(
          `Please use ${this.constructor.name}.getInstance() to get instance`
      );
    }

    this._events = {};
    this._queueOfHandlers = [];
    this._isScheduleTriggerOnNextTick = false;
    this._processQueueOfHandlers = this._processQueueOfHandlers.bind(this);
  }

  on(name, handler, data = {}) {
    EventManager._checkDataForEvent(data);
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

  trigger(name, triggerData = {}) {
    if (!this._events[name]) {
      return;
    }

    EventManager._checkDataForEvent(triggerData);
    this._queueHandlers(name, triggerData);

    if (!this._isScheduleTriggerOnNextTick) {
      this._isScheduleTriggerOnNextTick = true;
      setTimeout(this._processQueueOfHandlers, 0);
    }
  }

  _queueHandlers(name, triggerData) {
    this._events[name].forEach((oneHandlerInfo) => {
      if (!this._isHandlerInQueue(oneHandlerInfo)) {
        const eventFullData = {
          name,
          triggerData,
          attachedData: oneHandlerInfo.data
        };
        const handlerForQueue = {
          handler: oneHandlerInfo.handler,
          data: eventFullData
        };

        this._queueOfHandlers.push(handlerForQueue);
      } else {
        this._updateHandlerInQueue(oneHandlerInfo, triggerData);
      }
    });
  }

  _isHandlerInQueue(oneHandlerInfo) {
    return this._queueOfHandlers.some((handlerInfoInQueue) => {
      return handlerInfoInQueue.handler === oneHandlerInfo.handler;
    });
  }

  _updateHandlerInQueue(oneHandlerInfo, triggerData) {
    const handlerInQueue = this._queueOfHandlers.find((oneHandlerInQueue) => {
      return oneHandlerInQueue.handler === oneHandlerInfo.handler;
    });

    if (!handlerInQueue) {
      return;
    }

    handlerInQueue.data.attachedData = Object.assign(
        handlerInQueue.data.attachedData, oneHandlerInfo.data
    );

    handlerInQueue.data.triggerData = Object.assign(
        handlerInQueue.data.triggerData, triggerData
    );
  }

  _processQueueOfHandlers() {
    this._isScheduleTriggerOnNextTick = false;
    const handlersForExecute = [...this._queueOfHandlers];
    this._queueOfHandlers = [];

    handlersForExecute.forEach((oneHandlerInfo) => {
      oneHandlerInfo.handler(oneHandlerInfo.data);
    });
  }

  static _checkDataForEvent(data) {
    if (data && (typeof data !== `object`)) {
      throw new Error(
        `event data must be type of object. You gave ${typeof data} 
      `);
    }
  }

  static getInstance() {
    if (!this[singletonKey]) {
      this[singletonKey] = new this(singletonVerification);
    }

    return this[singletonKey];
  }

}


