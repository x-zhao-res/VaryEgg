'use strict';

const { Controller } = require('egg');

class eventController extends Controller {
  async createEvent() {
    const { ctx } = this;
    const resUse = await ctx.service.useEvent.eventCreate(ctx.request.body);
    if (resUse === -1) {
      ctx.body = {
        message: '存在重复',
        status: 200,
      };
    } else {
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
  async abadonEvent() {
    const { ctx } = this;
    const res = await ctx.service.useEvent.abandonEvent(ctx.query);
    if (res === true) {
      ctx.body = {
        message: '修改成功',
        status: 200,
      };
    } else {
      ctx.body = {
        message: '修改失败',
        status: 200,
      };
    }
  }
  async recordEvent() {
    const { ctx } = this;
    const res = await ctx.service.useEvent.inRecord(ctx.query);
    if (res === true) {
      ctx.body = {
        message: '录入成功',
        status: 200,
      };
    } else {
      ctx.body = {
        message: '录入失败',
        status: 200,
      };
    }
  }
  async changeTime() {
    const { ctx } = this;
    const res = await ctx.service.useEvent.changeTime(ctx.query);
    if (res === true) {
      ctx.body = {
        message: '修改成功',
        status: 200,
      };
    } else {
      ctx.body = {
        message: '修改失败',
        status: 200,
      };
    }
  }
}
module.exports = eventController;
