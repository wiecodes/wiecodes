import express from 'express';
import Template from '../models/Template.js';
import User from '../models/User.js';

const router = express.Router();

// GET /api/analytics/monthly-stats
router.get('/monthly-stats', async (req, res) => {
  try {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 5);

    // Fetch recent templates and users
    const templates = await Template.find({ createdAt: { $gte: sixMonthsAgo } });
    const users = await User.find({ createdAt: { $gte: sixMonthsAgo } });

    // Prepare 6 months data bucket
    const data = Array.from({ length: 6 }, (_, i) => {
      const monthIndex = (now.getMonth() - 5 + i + 12) % 12;
      return {
        month: months[monthIndex],
        sales: 0,
        templates: 0,
        users: 0,
        monthIndex: monthIndex + 1,
      };
    });

    // Count template uploads and revenue
    templates.forEach((t) => {
      const month = new Date(t.createdAt).getMonth();
      const match = data.find(d => d.monthIndex === month + 1);
      if (match) {
        match.templates += 1;
        if (!t.isFree) {
          match.sales += t.sales * (t.estimatedPrice || 0);
        }
      }
    });

    // Count user registrations
    users.forEach((u) => {
      const month = new Date(u.createdAt).getMonth();
      const match = data.find(d => d.monthIndex === month + 1);
      if (match) {
        match.users += 1;
      }
    });

    // Final response
    const finalData = data.map(({ month, sales, templates, users }) => ({
      month,
      sales,
      templates,
      users,
    }));

    res.json(finalData);
  } catch (err) {
    res.status(500).json({ message: "Error generating analytics", error: err.message });
  }
});

// GET /api/analytics/template-categories
router.get('/template-categories', async (req, res) => {
  try {
    const categories = await Template.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    const colorMap = {
      "E-commerce": "#8884d8",
      "Portfolio": "#82ca9d",
      "Dashboard": "#ffc658",
      "Landing Page": "#ff7300",
    };

    const result = categories.map((cat) => ({
      name: cat._id || "Other",
      value: cat.count,
      color: colorMap[cat._id] || "#00ff00",
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error fetching categories", error: err.message });
  }
});

export default router;
