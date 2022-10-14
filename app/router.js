'use strict';


/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // const counter = app.middleware.counter();
  const jwt = app.middleware.setJwt(app.config.jwt);
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.user.login);
  router.post('/testpage', jwt, controller.user.testusepage);// 不对外写
  // ↓是正式接口，测试环境不上jwt
  router.post('/refreshtoken', jwt, controller.user.refresh);
  router.post('/createOri', controller.orianism.createOrianism);
  router.get('/getOri', controller.orianism.getOriansim);
  router.get('upOri', controller.orianism.updateOrianism);
  router.get('/getOrianismName', controller.orianism.getOrianismName);
  router.get('/getGroup', controller.groupOrianism.getGroup);
  router.get('/delGroup', controller.groupOrianism.deleteGroup);
  router.post('/creatGroup', controller.groupOrianism.createGroup);
  router.post('/eventCreate', controller.useEvent.createEvent);
  router.get('/getEvent', controller.useEvent.getEvent);
  router.get('/getEventDetail', controller.useEvent.getEventDetail);
  router.get('/abadonEvent', controller.useEvent.abadonEvent);
  router.get('/recordEvent', controller.useEvent.recordEvent);
  router.get('/changeTime', controller.useEvent.changeTime);
};
