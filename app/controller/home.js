'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hello';
  }
  async zhaoxiang() { // 函数写接口就行
    const { ctx } = this;
    // ctx.body = 'zhaoxianghhhhh';
  }
  async cookieadd() {
    const ctx = this.ctx;
    ctx.session.username = 'zhaoxiang'; // 自动给你增加Session
    const zhaoname = ctx.session.username; // 这里可以获得拿到的Session属性，修改就是直接修改就好
    ctx.cookies.set('user', 'zhaoxiang.com', {
      encrypt: true,
    });
    // 前面的这个是名字，后面的这个是STRING会随机给一个，想删除就爬
    ctx.body = {
      status: 200,
      data: 'Cookie添加成功',
    };
  }
  async cookieeditor() {
    const ctx = this.ctx;
    ctx.cookies.set('user', 'bilibili');
    ctx.body = {
      status: 200,
      data: '修改成功',
    };
  }
  async cookiedelete() {
    const ctx = this.ctx;
    ctx.cookies.set('user', null);
    ctx.body = {
      status: 200,
      data: '删除成功',
    };
  }
  async cookieshow() {
    const ctx = this.ctx;
    const cookieuer = ctx.cookies.get('user', {
      encrypt: true,
    });
    console.log(cookieuer);
    ctx.body = {
      status: 200,
      cookie: cookieuer,
    };
  }

  async middlewareuse() {
    const ctx = this.ctx;
    console.log(ctx.session.counter);// 当前中间件是全局生效
    ctx.body = {
      status: 200,
    };
  }

  async newContext() {
    const ctx = this.ctx;
    const parmas = ctx.params('key'); // 这个获取是直接按照JSON类型获取的
    console.log(parmas);
    ctx.body = 'newContext';
  }

  async newRequest() {
    const ctx = this.ctx;
    const token = ctx.request.token; // 获取request的token扩展
    ctx.body = {
      status: 200,
      body: token,
    };
  }

  async newresponst() {
    const ctx = this.ctx;
    ctx.response.token = 'zhaoxiang.com'; // 这里可以新设置Token，然后对传送出去
    ctx.body = 'newresponse';
  }

  async addGirlUse() {
    const ctx = this.ctx;
    const res = await ctx.service.testdb.addGirl(ctx.request.body);
    ctx.body = res;
  }
  async delGirl() {
    const ctx = this.ctx;
    ctx.body = '';
  }

  async updateGirl() {
    const ctx = this.ctx;
    const res = await ctx.service.testdb.changeGirl(ctx.query);
    // GET的参数可以直接从query这里获得
    ctx.body = res;
  }

  async showGirl() {
    const ctx = this.ctx;
    const res = await ctx.service.testdb.showGirl();
    ctx.body = res;
  }

}

// services 封装的一个抽象从，数据库交互的代码都放在里面,后面会使用MYsql
// 保持Controller 逻辑更加简单 独立性，Service
// 写测试用例简单

module.exports = HomeController;
