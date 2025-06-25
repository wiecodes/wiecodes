// 🛍️ routes/purchase.js
import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import Template from '../models/Template.js';
import User from '../models/User.js';

const router = express.Router();

/**
 * @route   POST /api/templates/:id/purchase
 * @desc    Simulate a template purchase (for now)
 * @access  Private
 */
router.post('/templates/:id/purchase', verifyToken, async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });

    // Prevent self-purchase
    if (template.uploadedBy.toString() === req.user.id) {
      return res.status(400).json({ message: 'You cannot purchase your own template' });
    }

    // Update Template sales count
    template.sales = (template.sales || 0) + 1;
    await template.save();

    // Update Seller's stats
    const seller = await User.findById(template.uploadedBy);
    if (seller) {
      seller.sales = (seller.sales || 0) + 1;
      if (!template.isFree && template.estimatedPrice) {
        seller.earnings = (seller.earnings || 0) + template.estimatedPrice;
      }
      await seller.save();
    }

    // Optionally: track buyer purchases (like adding to downloads or order history)

    res.json({
      success: true,
      message: 'Purchase recorded successfully',
      templateId: template._id,
    });
  } catch (err) {
    console.error('Purchase error:', err);
    res.status(500).json({ success: false, message: 'Purchase failed' });
  }
});

export default router;
