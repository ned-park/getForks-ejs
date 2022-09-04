module.exports = {
  removeTrailingSlash: (req, res, next) => {
    if (req.path.length > 1 && req.path.substr(-1) == '/') {
      res.redirect(301, req.path.slice(0, -1) + req.url.slice(req.path.length))
    } else {
      next()
    }
  }
}