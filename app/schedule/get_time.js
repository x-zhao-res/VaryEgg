const Subscription = require('egg').Subscription;

class gettime extends Subscription {
  static get schedule() {
    return {
      interval: '120s',
      type: 'worker',
    };
  }
  async subscribe() {
    const app = this.app;
    const params = {};
    const now = new Date().getTime();
    console.log('start worker');
    const authGroupFuckState = await app.mysql.select('group', { ...params });
    for (let authNum = 0; authNum < authGroupFuckState.length; authNum++) {
      if ((parseInt(authGroupFuckState[authNum].lastFuckTime) + (parseInt(authGroupFuckState[authNum].fuckInterval) * 60000)) < now) {
        await app.mysql.update('group', {
          id: authGroupFuckState[authNum].id,
          fuckState: 1,
        });
      }
    }
  }
}


module.exports = gettime;
