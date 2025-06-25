export const authenticate = (req, res, next) => {
  // your authentication logic here
  const user = req.user; // or however you're attaching user
  if (!user) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Forbidden: Admins only' });
  }
  next();
};
