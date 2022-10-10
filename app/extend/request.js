module.exports = {
  get token() {
    console.log(this.get('token'));
    return this.get('token'); // egg固有方法
  },
};
