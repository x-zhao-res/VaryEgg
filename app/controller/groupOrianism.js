'use strict';

const { Controller } = require('egg');

class groupOrianism extends Controller {
  async getGroup() {
    const { ctx } = this;
    const res = await ctx.service.groupOrianism.getGroup(ctx.query);
    ctx.body = res;
  }

  async createGroup() {
    const { ctx } = this;
    const res = await ctx.service.groupOrianism.createGroup(ctx.request.body);
    if (res === true) {
      ctx.body = {
        message: '创建成功',
        status: 200,
      };
    } else {
      ctx.body = {
        message: '创建失败,请检查参数',
        status: 200,
      };
    }
  }
}
module.exports = groupOrianism;
