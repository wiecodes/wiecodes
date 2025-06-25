// 📜 templates.js

import express from 'express';
import multer from 'multer';
import path from 'path';
import Template from '../models/Template.js';
import Activity from '../models/Activity.js';
import verifyToken from '../middleware/verifyToken.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

// 🗓️ Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });
const uploadMiddleware = upload.fields([
  { name: 'zipFile', maxCount: 1 },
  { name: 'previewImage', maxCount: 1 }
]);

// 👤 Get Templates by Current User
router.get('/user/mine', verifyToken, async (req, res) => {
  try {
    const templates = await Template.find({ uploadedBy: req.user._id });
    res.json(templates);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching your templates', error: err.message });
  }
});

// 🟢 Upload New Template
router.post('/upload', verifyToken, uploadMiddleware, async (req, res) => {
  try {
    const {
      title, description, estimatedPrice, category,
      framework, platform, theme, githubRepo, uploadType,
      tags, features, techStack, codePreview, liveLink
    } = req.body;

    const zipFile = req.files?.zipFile?.[0]?.filename;
    const previewImage = req.files?.previewImage?.[0]?.filename;

    const templateData = {
      title,
      description,
      estimatedPrice,
      category,
      framework,
      platform,
      theme,
      githubRepo,
      uploadType,
      codePreview,
      liveLink,
      uploadedBy: req.user._id,
      status: 'pending',
      tags: JSON.parse(tags || '[]'),
      features: JSON.parse(features || '[]'),
      techStack: JSON.parse(techStack || '[]'),
      zipFileUrl: zipFile ? `uploads/${zipFile}` : null,
      previewImageUrl: previewImage ? `uploads/${previewImage}` : null,
    };

    const newTemplate = new Template(templateData);
    await newTemplate.save();

    // ✉️ Log activity
    await Activity.create({
      description: `New template submitted: "${title}"`,
      actor: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Template uploaded successfully.',
      template: newTemplate
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while uploading template.',
      error: err.message
    });
  }
});


// 🔵 Get All Approved Templates
router.get('/', async (req, res) => {
  try {
    const templates = await Template.find({ status: 'approved' });
    res.status(200).json(templates);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch templates.',
      error: err.message
    });
  }
});

// 🔍 Enhanced Search Route (Fixed)
router.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === '') {
    return res.status(400).json({ success: false, message: 'Query is required' });
  }

  try {
    const regex = new RegExp(query, 'i'); // case-insensitive

    const results = await Template.find({
      status: 'approved',
      $or: [
        { title: regex },
        { description: regex },
        { category: regex },
        { framework: regex },
        { platform: regex },
        { theme: regex },
        { tags: { $elemMatch: { $regex: regex } } },
        { features: { $elemMatch: { $regex: regex } } },
        { techStack: { $elemMatch: { $regex: regex } } },
      ]
    }).limit(20);

    res.status(200).json(results);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to search templates',
      error: err.message
    });
  }
});

router.put('/templates/:id/reject', verifyToken, async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });

    template.status = 'rejected';
    await template.save();

    await Activity.create({
      description: `Template rejected: "${template.title}"`,
      user: req.user._id
    });

    res.json({ success: true, message: 'Template rejected' });
  } catch (err) {
    console.error('Rejection failed:', err);
    res.status(500).json({ success: false, message: 'Rejection failed', error: err.message });
  }
});

// 📸 Upload Preview Image for Existing Template
router.post('/upload/preview/:id', verifyToken, upload.single('previewImage'), async (req, res) => {
  try {
    const { id } = req.params;
    const previewImage = req.file?.filename;

    if (!previewImage) {
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }

    const template = await Template.findByIdAndUpdate(
      id,
      { previewImageUrl: `uploads/${previewImage}` },
      { new: true }
    );

    if (!template) {
      return res.status(404).json({ success: false, message: 'Template not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Preview image updated',
      template
    });
  } catch (err) {
    console.error('Upload preview error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during preview upload',
      error: err.message
    });
  }
});



// 🟡 Get Template by ID
router.get('/:id', async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.json(template);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 🛠️ Update Template (Admin or Owner)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
      tags: Array.isArray(req.body.tags) ? req.body.tags.filter(tag => tag.trim()) : [],
      features: Array.isArray(req.body.features) ? req.body.features.filter(f => f.trim()) : [],
      techStack: Array.isArray(req.body.techStack) ? req.body.techStack.filter(t => t.trim()) : [],
    };

    const updated = await Template.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updated) return res.status(404).json({ message: 'Template not found' });

    res.json({ success: true, template: updated });
  } catch (err) {
    console.error('PUT update error:', err);
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});
// ✅ Minimal Route: Only Approve the Template
router.put('/:id/approve', verifyToken, isAdmin, async (req, res) => {
  try {
    const updated = await Template.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.json({ success: true, message: 'Template approved successfully', template: updated });
  } catch (err) {
    console.error('Approve template error:', err);
    res.status(500).json({ message: 'Failed to approve template', error: err.message });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deleted = await Template.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Template not found' });

    // 📝 Log activity (fixed field name)
    await Activity.create({
      description: `Template deleted: "${deleted.title}"`,
      actor: req.user?._id || null
    });

    res.json({ success: true, message: 'Template deleted' });
  } catch (err) {
    console.error('Delete failed:', err);
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
});


// 🔍 Get Suggested Templates Based on Theme or Framework
router.get('/:id/suggestions', async (req, res) => {
  try {
    const current = await Template.findById(req.params.id);
    if (!current) return res.status(404).json({ message: 'Template not found' });

    const filterCriteria = [
      current.theme ? { theme: current.theme } : null,
      current.framework ? { framework: current.framework } : null,
    ].filter(Boolean); // remove null values

    const suggestions = await Template.find({
      _id: { $ne: req.params.id },
      status: 'approved',
      $or: filterCriteria.length ? filterCriteria : [{}], // fallback to empty filter if both are missing
    })
      .select([
        'title',
        'previewImageUrl',
        'theme',
        'framework',
        'platform',
        'rating',
        'estimatedPrice',
        'tags',
        'features',
        'color'
      ])
      .limit(3);

    res.json(suggestions);
  } catch (err) {
    console.error('Suggestion route error:', err);
    res.status(500).json({ message: 'Failed to fetch suggestions', error: err.message });
  }
});



router.get('/filter/free', async (req, res) => {
  try {
    const templates = await Template.find({
      status: 'approved',
      isFree: true // Ensure we only get free templates
    }).limit(4);

    res.status(200).json(templates);
  } catch (err) {
    console.error('Error fetching free templates:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch free templates.',
      error: err.message
    });
  }
});
router.get('/filter/featured', async (req, res) => {
  try {
    const templates = await Template.find({
      status: 'approved',
      isFeatured: true // Ensure we only get featured templates
    }).limit(4);

    res.status(200).json(templates);
  } catch (err) {
    console.error('Error fetching featured templates:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured templates.',
      error: err.message
    });
  }
});

// PUT /api/admin/templates/:id/color
router.put('/templates/:id/color', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { color } = req.body;

  const allowedColors = ['green', 'blue', 'yellow', 'red'];
  if (!allowedColors.includes(color)) {
    return res.status(400).json({ success: false, message: 'Invalid color' });
  }

  try {
    await Template.findByIdAndUpdate(id, { color });
    res.json({ success: true, message: 'Color updated' });
  } catch (err) {
    console.error('Error updating color:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});




export default router;
