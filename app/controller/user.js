'use srtict';
// 用户登陆接口
const { Controller } = require('egg');

class userController extends Controller {
  async refresh() {
    const { ctx, app } = this;
    const res = ctx.request.body;
    if (res.userId) {
      const token = app.jwt.sign({
        userId: res.userId,
      }, app.config.jwt.secret);
      ctx.body = {
        token,
        time: ctx.app.jwt.verify(token, app.config.jwt).exp * 1000,
        code: 524,
      };
    }
  }

  async login() {
    const { ctx, app } = this;
    const res = await ctx.service.login.authLogin(ctx.request.body);
    if (res === 0) {
      ctx.body = {
        message: '没有此用户',
        status: 200,
      };
    } else {
      if (res.passwordAuth === true) {
        delete res.passwordAuth;
        delete res.password;
        const token = app.jwt.sign({
          userId: res.id,
        }, app.config.jwt.secret);
        ctx.body = {
          code: 524,
          time: ctx.app.jwt.verify(token, app.config.jwt).exp * 1000,
          token,
          user: {
            ...res,
          },
        };
      } else if (res.passwordAuth === false) {
        ctx.body = {
          message: '密码错误',
          status: 200,
        };
      }
    }
  }

  // 测试用，暂时不删
  async testusepage() {
    const { ctx } = this;
    const res = await ctx.service.login.testpage();
    ctx.body = {
      ...res,
      status: 200,
      message: '操作成功',
    };
  }

}

module.exports = userController;
