'use strict';

const Service = require('egg').Service;

class oranismService extends Service {
  async OranismCreate(params) {
    try {
      const app = this.app;
      const res = await app.mysql.insert('orianism', {
        ...params,
      });
      if (res.protocol41 === true) {
        // 创建的判断放到前端
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }


  async OranismGet(params) {
    try {
      const app = this.app;
      const res = await app.mysql.select('orianism', {
        where: {
          ...params,
          // 模糊查询
        },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async OranismGetName(params) {
    try {
      const app = this.app;
      const res = await app.mysql.select('orianism', {
        where: {
          ...params,
        },
        columns: [ 'oriName', 'id' ],
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }


  async OranismDel(params) {
    try {
      const app = this.app;
    } catch (error) {
      console.log(error);
    }
  }


  async OranismUpdate(params) {
    try {
      const app = this.app;
      const res = await app.mysql.update('orianism', {
        ...params,
        // 为了正则，直接把orianism所有属性导入
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }


}

module.exports = oranismService;
