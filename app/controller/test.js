'use srtict';

const { Controller } = require('egg');

class JspangControl extends Controller {
  async personnew() {
    const { ctx } = this;
    ctx.body = '<h2>zhsdawd</h2>';
  }
  async getcanshu() {
    // 不严格传参模式
    const ctx = this.ctx;
    ctx.body = ctx.query;
  }
  async getyange() {
    const ctx = this.ctx;
    ctx.body = 'getyange:' + ctx.params;
  }
  // POST请求
  async add() {
    const ctx = this.ctx;
    ctx.body = {
      status: 200,
      data: ctx.request.body, // 这里可以拿到POST的所有数据
    };
  }
  // async noneID() {
  //   const ctx = this.ctx;
  //   const res = await ctx.service.organism.echo(ctx.request.body.id);
  //   ctx.body = res;
  // }
}

module.exports = JspangControl;
