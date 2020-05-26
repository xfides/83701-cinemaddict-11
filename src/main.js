import Application from './controllers/application.js';

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`./sw.js`);
});

new Application().run();

