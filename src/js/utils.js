export default {
  // 生成唯一 id
  genUniqueId() {
    return new Date().getTime() + Math.floor(Math.random() * 100000000)
  }
}
