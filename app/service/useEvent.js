'use strict';

const Service = require('egg').Service;

class eventService extends Service {
  async eventCreate(params) {
    try {
      const app = this.app;
      const requestEvent = await app.mysql.select('event', {
        where: {
          belongGroupId: params.belongGroupId,
          belongOrianismId: params.belongOrianismId,
          belongTribe: params.belongTribe,
          eventState: 0,
        },
      });
      if (requestEvent.length) {
        return -1;
      }
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
        orders: [[ 'eventState', 'acs' ]],
      });
      for (let eveNum = 0; eveNum < res.length; eveNum++) {
        const group = await app.mysql.get('group', { id: res[eveNum].belongGroupId });
        const orianism = await app.mysql.get('orianism', { id: res[eveNum].belongOrianismId });
        transEvent.push({
          event: res[eveNum],
          belongTribe: group.belongTribe,
          groupItem: {
            name: group.groupName,
            id: group.id,
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
      // 只传ID，状态，变异点数默认为0
      // 废弃事件不计入次数
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

  async inRecord(params) {
    try {
      const app = this.app;
      const belongGroupId = params.groupId;
      const orianismId = params.orianismId;
      const eventId = params.id; // 事件ID
      const numVary = params.varyNum; // 变异增长点
      const orianismInf = await app.mysql.get('orianism', { id: orianismId });
      const groupInf = await app.mysql.get('group', { id: belongGroupId });
      const changeVaryNum = await app.mysql.update('orianism', {
        id: orianismId,
        varyAllNum: (orianismInf.varyAllNum + 1), // 增加变异次数
      });
      const changeGroupInf = await app.mysql.update('group', {
        id: belongGroupId,
        fuckState: 0, // 刷新贤者状态
        lastFuckTime: (new Date().getTime()).toString(), // 修改为当前时间
        attributeNum: groupInf.attributeNum + parseInt(numVary), // 增加属性
      });
      const changeEventInf = await app.mysql.update('event', {
        id: eventId,
        eventState: 1, // 修改变异状态
      });
      if (changeEventInf.affectedRows === 1 && changeGroupInf.affectedRows === 1 && changeVaryNum.affectedRows === 1) {
        return true;
      }
      return false;

    } catch (error) {
      console.log(error);
    }
  }
  async changeTime(params) {
    const app = this.app;
    const res = await app.mysql.update('event', {
      ...params,
    });
    if (res.affectedRows === 1) {
      return true;
    }
    return false;
  }
}

module.exports = eventService;
