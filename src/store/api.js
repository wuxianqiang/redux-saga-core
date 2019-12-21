// 调取API接口
export default {
  login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve(username + Date.now())
        } else {
          reject('登录失败')
        }
      }, 1000);
    })
  }
}
