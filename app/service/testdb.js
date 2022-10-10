'use strict';


const Service = require('egg').Service;
class testdb extends Service {
  async addGirl(params) {
    try {
      const app = this.app;
      const res = await app.mysql.insert('girl', params);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async delGirl() {}
  async changeGirl(params) {
    try {
      const app = this.app;
      const res = await app.mysql.update('girl', params);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async showGirl() {
    try {
      const app = this.app;
      const res = await app.mysql.select('girl');
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = testdb;
