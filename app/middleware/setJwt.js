module.exports = options => {
  return async function jwt(ctx, next) {
    const token = ctx.request.header.authorization;
    let decode;
    if (token) {
      try {
        // 解码token
        decode = ctx.app.jwt.verify(token, options.secret);
        await next();
        console.log(decode);
      } catch (error) {
        if (error.message === 'jwt expired') {
          ctx.body = {
            message: 'token过期',
            code: 525,
          };
        }
        console.log(error);
        return;
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        message: '没有token',
        code: 526,
      };
      return;
    }
  };
};
