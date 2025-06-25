import express from 'express';
const router = express.Router();

// Example in-memory storage (replace with MongoDB later)
let settings = {
  autoApproval: false,
  maxTemplateSize: '50MB',
  commissionRate: '15%',
  emailNotifications: true,
  maintenanceMode: false,
};

// GET all settings
router.get('/', (req, res) => {
  res.status(200).json(settings);
});

// PUT update a specific setting
router.put('/:key', (req, res) => {
  const { key } = req.params;
  let { value } = req.body;

  // Check if the setting key exists
  if (!(key in settings)) {
    return res.status(400).json({ message: 'Invalid setting key' });
  }

  // Handle boolean conversion (since value comes from frontend as string sometimes)
  if (typeof settings[key] === 'boolean') {
    value = value === 'true' || value === true;
  }

  settings[key] = value;

  res.json({ message: 'Setting updated successfully', settings });
});

export default router;
