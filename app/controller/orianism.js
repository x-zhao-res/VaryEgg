'use strict';

const { Controller } = require('egg');
class orianism extends Controller {
  async createOrianism() {
    const { ctx } = this;
    const res = await ctx.service.oranism.OranismCreate(ctx.request.body);
    if (res === true) {
      ctx.body = {
        message: '创建成功',
        status: 200,
      };
    } else {
      ctx.body = {
        message: '创建失败',
        status: 200,
      };
    }
  }
  async getOriansim() {
    const { ctx } = this;
    const res = await ctx.service.oranism.OranismGet(ctx.query);
    ctx.body = {
      message: '查询成功',
      data: res,
      status: 200,

    };
  }

  async getOrianismName() {
    const { ctx } = this;
    const res = await ctx.service.oranism.OranismGetName(ctx.query);
    ctx.body = {
      message: '查询成功',
      data: res,
      status: 200,

    };
  }
  async updateOrianism() {
    const { ctx } = this;
    const res = await ctx.service.oranism.OranismUpdate(ctx.query);
    ctx.body = res;
  }
}
module.exports = orianism;
