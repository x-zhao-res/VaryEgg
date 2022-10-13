'use strict';

const Service = require('egg').Service;

class GroupOrianismService extends Service {
  async getGroup(params) {
    try {
      const app = this.app;
      const res = await app.mysql.select('group', {
        where: {
          ...params,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteGroup(params) {
    try {
      const app = this.app;
      const res = await app.mysql.delete('group', {
        ...params,
      });
      if (res.affectedRows !== 0) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }
  async createGroup(data) {
    try {
      const app = this.app;
      const res = await app.mysql.insert('group', {
        ...data,
      });
      if (res.protocol41 === true) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = GroupOrianismService;
