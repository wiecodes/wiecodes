const ReviewRequest = require('../models/ReviewRequest');
const slugify = require('slugify');

exports.uploadTemplate = async (req, res) => {
  try {
    const {
      title,
      description,
      githubRepo,
      estimatedPrice,
      category,
      framework,
      platform,
      theme,
      liveLink,
      tags,
      features,
      techStack,
      codePreview,
      uploadType,
    } = req.body;

    if (!title || !description || !estimatedPrice) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and estimated price are required',
      });
    }

    // Parse arrays
    let parsedTags = [], parsedFeatures = [], parsedTechStack = [];
    try {
      parsedTags = tags ? JSON.parse(tags) : [];
      parsedFeatures = features ? JSON.parse(features) : [];
      parsedTechStack = techStack ? JSON.parse(techStack) : [];
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: 'Invalid JSON in tags, features, or techStack',
      });
    }

    // Validate upload type
    return res.status(201).json({
      success: true,
      message: 'Template submitted for review',
      reviewRequest,
    });
  } catch (err) {
    console.error('Template upload error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error while uploading template',
      error: err.message,
    });
  }
  
};
