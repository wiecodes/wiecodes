import express from 'express';
import Template from '../models/Template.js';
import User from '../models/User.js';
import Activity from '../models/Activity.js';

const router = express.Router();

router.get('/activity', async (req, res) => {
  try {
    const activities = [];

    const [recentTemplates, recentUsers, manualActivities] = await Promise.all([
      Template.find({}).sort({ createdAt: -1 }).limit(20),
      User.find({}).sort({ createdAt: -1 }).limit(10),
      Activity.find({}).sort({ createdAt: -1 }).limit(30).populate('actor', 'username')
    ]);

    // Templates
    recentTemplates.forEach(t => {
      let action = '';
      if (t.status === 'pending') action = 'submitted';
      else if (t.status === 'approved') action = 'approved';
      else if (t.status === 'rejected') action = 'rejected';

      activities.push({
        description: `Template ${action}: "${t.title}"`,
        createdAt: t.createdAt
      });
    });

    // Users
    recentUsers.forEach(u => {
      const desc = u.status === 'banned'
        ? `User banned: ${u.username}`
        : `New ${u.role} registered: ${u.username}`;

      activities.push({
        description: desc,
        createdAt: u.createdAt
      });
    });

    // Manual Activity Logs
    manualActivities.forEach(a => {
      activities.push({
        description: a.description,
        createdAt: a.createdAt,
        actor: a.actor?.username || 'System'
      });
    });

    // Sort all activities by time
    activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      activities: activities.map(a => ({
        description: a.actor ? `[${a.actor}] ${a.description}` : a.description,
        createdAt: a.createdAt
      }))
    });
  } catch (error) {
    console.error('Activity fetch error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch activity' });
  }
});

export default router;
