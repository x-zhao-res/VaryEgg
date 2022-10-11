'use strict';

const { Controller } = require('egg');

class eventController extends Controller {
  async createEvent() {
    const { ctx } = this;
    const resUse = await ctx.service.useEvent.eventCreate(ctx.request.body);
    if (resUse === true) {
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
  async getEvent() {
    const { ctx } = this;
    const res = await ctx.service.useEvent.getEvent(ctx.query);
    ctx.body = res;
  }
  async getEventDetail() {
    const { ctx } = this;
    const res = await ctx.service.useEvent.getEventDetail(ctx.query);
    ctx.body = res;
  }
}
module.exports = eventController;
