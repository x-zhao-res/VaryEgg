module.exports = {
  params(key) { // 这个扩展部分就是对于ctx中应用的扩展，这里的query可以获得里面的某些属性，这里可以作为封装函数暴露出去
    const method = this.request.method;
    if (method === 'GET') {
      return key ? this.query[key] : this.query;
    }
    return key ? this.request.body[key] : this.request.body;

  },
  usesless() {
    return 1;
  },
};
