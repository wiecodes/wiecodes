// middleware/isAdmin.js
const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied: Admins only' });
    }
    next();
  };
  
  export default isAdmin;
  