import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Route Imports
import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';
import templateRoutes from './routes/templates.js';
import usersRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js';
import purchaseRoutes from './routes/purchase.js';
import adminUserRoutes from './routes/adminUsers.js';
import adminMetrics from './routes/adminMetrics.js';
import adminActivityRoutes from './routes/adminActivity.js';
import notificationRoutes from './routes/notifications.js';
import analyticsRoutes from './routes/analytics.js';
import adminSettingsRoutes from './routes/adminSettings.js';

const app = express();

// 🛡️ Middleware
app.use(cors({
  origin: 'wiecodeslive.vercel.app', // update if your frontend is hosted elsewhere
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📂 Serve static uploads (e.g., preview images or ZIP files)
app.use('/uploads', express.static('uploads'));

// 🌐 Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

// 🚏 Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', purchaseRoutes);
app.use('/api/admin/users', adminUserRoutes);
app.use('/api/admin', adminMetrics);
app.use('/api/admin', adminActivityRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin-settings', adminSettingsRoutes);

// 🔖 Test Route
app.get('/', (req, res) => {
  res.send('🚀 Server is running');
});

// 🧿 Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`⚡ Server running on http://localhost:${PORT}`);
});
