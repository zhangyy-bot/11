class LocalCach {
  setCache(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  getCache(key) {
    if (typeof localStorage.getItem(key) === 'object') {
      const value = JSON.parse(localStorage.getItem(key))
      return value
    } else {
      return localStorage.getItem(key)
    }
  }

  deleteCache(key) {
    window.localStorage.removeItem(key)
  }

  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCach()
