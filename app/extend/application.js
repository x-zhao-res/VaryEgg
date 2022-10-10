module.exports = {
  // EGG的方法扩展，只能在View里面用，可以说基本没用,而且这个类名是死的
  currentTime() {
    return getTime();
  },
  get timeprop() { // 属性扩展直接写出来就行，这个只能在View里面用
    return getTime();
  },
};

function getTime() {
  const a = new Date();
  const b = a.setFullYear;
  return b;
}
