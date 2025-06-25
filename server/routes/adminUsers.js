import express from 'express';
import User from '../models/User.js';
import verifyToken from '../middleware/verifyToken.js';
import isAdmin from '../middleware/isAdmin.js';
import admin from '../firebaseAdmin.js';
import Activity from '../models/Activity.js';

const router = express.Router();

/**
 * GET /api/admin/users
 * Get all users for admin
 */
router.get('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ success: false, message: 'Server error fetching users' });
  }
});

/**
 * PATCH /api/admin/users/:id/:action
 * Ban or unban a user (MongoDB + Firebase)
 */
router.patch('/:id/:action', verifyToken, isAdmin, async (req, res) => {
  const { id, action } = req.params;

  if (!['ban', 'unban'].includes(action)) {
    return res.status(400).json({ success: false, message: 'Invalid action' });
  }

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.status = action === 'ban' ? 'banned' : 'active';
    await user.save();

    if (user.firebaseUid) {
      await admin.auth().updateUser(user.firebaseUid, {
        disabled: action === 'ban',
      });
    }

    await Activity.create({
      description: `User ${action}ned: ${user.username}`,
      actor: req.user.id
    });

    res.json({
      success: true,
      message: `User ${action}ned successfully`,
      user,
    });
  } catch (err) {
    console.error('Error updating user status:', err);
    res.status(500).json({ success: false, message: 'Server error updating user status' });
  }
});

export default router;
