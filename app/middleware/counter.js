module.exports = options => {
  return async (ctx, next) => {
    if (ctx.session.counter) {
      ctx.session.counter++;
    } else {
      ctx.session.counter = 1;
    }
    if (options) { console.log(''); }
    await next();
  };
};

// 中间件作为计数器
