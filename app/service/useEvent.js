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
      // ??????ID?????????????????????????????????0
      // ???????????????????????????
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
      const eventId = params.id; // ??????ID
      const numVary = params.varyNum; // ???????????????
      const orianismInf = await app.mysql.get('orianism', { id: orianismId });
      const groupInf = await app.mysql.get('group', { id: belongGroupId });
      const changeVaryNum = await app.mysql.update('orianism', {
        id: orianismId,
        varyAllNum: (orianismInf.varyAllNum + 1), // ??????????????????
      });
      const changeGroupInf = await app.mysql.update('group', {
        id: belongGroupId,
        fuckState: 0, // ??????????????????
        lastFuckTime: (new Date().getTime()).toString(), // ?????????????????????
        attributeNum: groupInf.attributeNum + parseInt(numVary), // ????????????
      });
      const changeEventInf = await app.mysql.update('event', {
        id: eventId,
        eventState: 1, // ??????????????????
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
