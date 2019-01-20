const auth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    cb()
  },
  signout(cb) {
    this.isAuthenticated = false
    localStorage.removeItem('token')
    cb()
  }
}

export default auth
