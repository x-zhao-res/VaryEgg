/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1664951758736_8771';

  // add your middleware config here
  config.middleware = [ 'counter' ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // config.session = { // 修改Session的COOKIE名称显示
  //   key: 'ZHAO_SESS',
  //   renew: true, // 自动无感刷新session
  //   maxAge: 1000 * 60, // 最大生效时间
  // };


  config.mysql = {
    app: true,
    agent: false,
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'zhaoxiang',
      password: 'zhao817300',
      database: 'arkvary',
    },
  };

  // 关闭CSRF防跨域
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };
  config.jwt = {
    secret: 'arkVary+6s',
    sign: {
      expiresIn: '3h',
    },
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  return {
    ...config,
    ...userConfig,
  };
};
