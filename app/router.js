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
  router.post('/creatGroup', controller.groupOrianism.createGroup);
};
