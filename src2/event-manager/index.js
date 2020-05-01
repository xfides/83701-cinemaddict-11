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

  on(name, handler, data = {}) {
    this.checkDataForEvent(data);
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

    this.checkDataForEvent(triggerData);
    this.queueHandlers(name, triggerData);

    if (!this._isScheduleTriggerOnNextTick) {
      this._isScheduleTriggerOnNextTick = true;
      setTimeout(this.processQueueOfHandlers, 0);
    }
  }

  queueHandlers(name, triggerData) {
    this._events[name].forEach((oneHandlerInfo) => {
      if (!this.isHandlerInQueue(oneHandlerInfo)) {
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
        this.updateHandlerInQueue(oneHandlerInfo, triggerData);
      }
    });
  }

  isHandlerInQueue(oneHandlerInfo) {
    return this._queueOfHandlers.some((handlerInfoInQueue) => {
      return handlerInfoInQueue.handler === oneHandlerInfo.handler
    });
  }

  updateHandlerInQueue(oneHandlerInfo, triggerData) {
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

  processQueueOfHandlers() {
    this._isScheduleTriggerOnNextTick = false;
    const handlersForExecute = [...this._queueOfHandlers];
    this._queueOfHandlers = [];

    handlersForExecute.forEach((oneHandlerInfo) => {
      oneHandlerInfo.handler(oneHandlerInfo.data);
    });
  }

  static getInstance() {
    if (!this[singletonKey]) {
      this[singletonKey] = new this(singletonVerification);
    }

    return this[singletonKey];
  }

  checkDataForEvent(data) {
    if (data && (typeof data !== `object`)) {
      throw new Error(
        `event data must be type of object. You gave ${typeof data} 
      `);
    }
  }

}


