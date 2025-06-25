import mongoose from 'mongoose';

const TemplateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  estimatedPrice: { type: Number, required: true },

  // Categorization
  category: String,
  framework: String,
  platform: String,
  theme: String,

  // Upload Info
  githubRepo: String,
  uploadType: { type: String, enum: ['github', 'zip'], required: true },
  zipFilePath: String,        // ZIP file path (if applicable)
  previewImageUrl: String,    // Screenshot of template

  // Metadata
  tags: [String],
  features: [String],
  techStack: [String],
  codePreview: String,        // Short code snippet
  liveLink: String,           // Live deployed version

  // Quality Color Badge (added by admin)
  color: {
    type: String,
    enum: ['#FFD700', '#4169E1', '#50C878', '#FFA500'], // Example: green = excellent, red = poor
    default: null
  },

  // Status
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },

  // Sales Count
  sales: {
    type: Number,
    default: 0
  },

  // Featured flag
  isFeatured: {
    type: Boolean,
    default: false
  },

  // Free/Paid flag
  isFree: {
    type: Boolean,
    default: false
  },

  // Relational
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Template = mongoose.model('Template', TemplateSchema);

export default Template;
