'use strict';

const Service = require('egg').Service;

class loginServices extends Service {
  async authLogin(params) {
    try {
      const app = this.app;
      const res = await app.mysql.get('user', {
        name: params.name,
      });
      if (!res) {
        return 0;
      }
      if (res.password === params.password) {
        res.passwordAuth = true;
        return res;
      }
      res.passwordAuth = false;
      return res;


    } catch (error) {
      console.log(error);
    }
  }

  async testpage() {
    try {
      const app = this.app;
      const res = await app.mysql.select('user');
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = loginServices;
