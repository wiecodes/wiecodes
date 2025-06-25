import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String }, // 🔄 Made optional for Firebase users
  firebaseUid: { type: String }, // ✅ Store Firebase UID if applicable
  role: {
    type: String,
    enum: ['buyer', 'seller', 'admin'],
    default: 'buyer',
  },
  status: {
    type: String,
    enum: ['active', 'banned'],
    default: 'active',
  },
  bio: { type: String, default: '' },
  location: { type: String, default: '' },
  website: { type: String, default: '' },
  twitter: { type: String, default: '' },
  github: { type: String, default: '' },
  rating: { type: Number, default: 4.8 },
  reviewCount: { type: Number, default: 0 },

  cart: [
    {
      template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template',
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],

  templates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template'
  }],

  earnings: {
    type: Number,
    default: 0
  },

  sales: {
    type: Number,
    default: 0
  },

  freeTemplates: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

export default mongoose.model('User', UserSchema);
