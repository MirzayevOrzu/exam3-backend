const jwt =  require('jsonwebtoken')

const hasRole = (roles) => {
  return (req, res, next) => {
    const  token  = req.headers?.authorization;
    const user = jwt.decode(token , {complete :true})
    console.log(user.payload.role);
    
    if (!roles.includes(user.payload.role)) {
      return res.status(403).json({
        error: 'Ruxsat berilmagan.',
      });
    }

    next();
  };
};

module.exports = hasRole;
