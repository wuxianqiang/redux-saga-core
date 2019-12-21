// 调取API接口
export default {
  login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(username + Date.now())
      }, 1000);
    })
  },
  authorize (username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let token = Math.random()
        resolve(token)
      }, 1000);
    })
  },
  storeItem (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  clearItem (key) {
    localStorage.removeItem(key)
  }
}
