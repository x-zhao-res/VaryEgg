'use strict';

const Service = require('egg').Service;

class eventService extends Service {
  async eventCreate(params) {
    try {
      const app = this.app;
      const res = await app.mysql.insert('event', {
        ...params,
      });
      if (res.protocol41 === true) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }
  async getEvent(params) {
    try {
      const app = this.app;
      const transEvent = [];
      const res = await app.mysql.select('event', {
        where: {
          ...params,
        },
      });
      for (let eveNum = 0; eveNum < res.length; eveNum++) {
        const group = await app.mysql.get('group', { id: res[eveNum].belongGroupId });
        const orianism = await app.mysql.get('orianism', { id: res[eveNum].belongOrianismId });
        transEvent.push({
          event: res[eveNum],
          belongTribe: group.belongTribe,
          groupItem: {
            name: group.groupName,
            attributeNum: group.attributeNum,
            attribute: group.varyAttribute,
            fuckState: group.fuckState,
          },
          orianismItem: {
            ...orianism,
          },
        });
      }
      return transEvent;
    } catch (error) {
      console.log(error);
    }
  }
  async getEventDetail(params) {
    try {
      const app = this.app;
      const res = await app.mysql.select('event', {
        where: {
          ...params,
        },
      });
      const group = await app.mysql.select('group', {
        where: {
          id: res[0].belongGroupId,
        },
      });
      const orianism = await app.mysql.select('orianism', {
        where: {
          id: res[0].belongOrianismId,
        },
      });
      return {
        event: res[0],
        group: group[0],
        orianism: orianism[0],
      };
    } catch (error) {
      console.log(error);
    }
  }
  async abandonEvent(params) {
    try {
      const app = this.app;
      // 只传ID，状态
      const res = await app.mysql.update('event', {
        ...params,
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

module.exports = eventService;
