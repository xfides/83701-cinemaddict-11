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
    this.processQueueOfHandlers = this.processQueueOfHandlers.bind(this);
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

  processQueueOfHandlers() {
    this._queueOfHandlers.forEach((oneHandlerInfo) => {
      oneHandlerInfo.handler(oneHandlerInfo.data);
    });
    this._isScheduleTriggerOnNextTick = false;
    this._queueOfHandlers = [];
  }

  trigger(name, triggerData) {
    if (!this._events[name]) {
      return;
    }

    this.queueHandlers(name, triggerData);

    if (!this._isScheduleTriggerOnNextTick) {
      this._isScheduleTriggerOnNextTick = true;
      setTimeout(this.processQueueOfHandlers, 0);
    }
  }

  queueHandlers(name, triggerData) {
    this._events[name].forEach((oneHandlerInfo) => {
      if (!this.isHandlerInQueue(oneHandlerInfo)) {
        oneHandlerInfo.data = {
          name,
          triggerData,
          data: oneHandlerInfo.data
        };

        this._queueOfHandlers.push(oneHandlerInfo);
      }
    });
  }

  isHandlerInQueue(oneHandlerInfo) {
    return this._queueOfHandlers.some((handlerInfoInQueue) => {
      return handlerInfoInQueue.handler === oneHandlerInfo.handler
    });
  }

  static getInstance() {
    if (!this[singletonKey]) {
      this[singletonKey] = new this(singletonVerification);
    }

    return this[singletonKey];
  }

}


