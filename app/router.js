'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/home', controller.home.index);
  router.get('/cards', controller.home.cards);
  router.get('/battles', controller.home.battles);
};
