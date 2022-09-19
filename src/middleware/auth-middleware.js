const requireAuth = (req, res, next) => {
    console.log(req.headers.authorization);
  
    // Vykdyti sekantį request grandinėje
    next();
  }
  
  const requireUser = (req, res, next) => {
    requireAuth(req, res, () => {
  
      // Vykdyti sekantį request grandinėje
      next();
    })
  }
  
  const requireAdmin = (req, res, next) => {
    requireAuth(req, res, () => {
  
      // Vykdyti sekantį request grandinėje
      next();
    })
  }
  
  module.exports = {
    requireAuth,
    requireUser,
    requireAdmin,
  }