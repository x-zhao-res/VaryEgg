const Subscription = require('egg').Subscription;

class gettime extends Subscription {
  static get schedule() {
    return {
      interval: '3s',
      type: 'worker',
    };
  }
  async subscribe() {
    const a = 1;
  }
}


module.exports = gettime;
