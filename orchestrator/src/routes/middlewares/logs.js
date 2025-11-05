module.exports = (req, _res, next) => {
  console.log(`[LOG] ${req.method} ${req.path}`);
  next();
};
