const Notification = require('../models/Notification');
const asyncHandler = require('../utils/asyncHandler');

// 🔔 Create Notification (internal use)
exports.createNotification = asyncHandler(async ({ userId, message }) => {
  console.log("here...............", userId, message);
  
  if (!userId || !message) return;

  await Notification.create({
    user: userId,
    message
  });
  console.log("created successfully");
  
});

// 📥 Get My Notifications
exports.getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: notifications.length,
    notifications
  });
});

// ✅ Mark Notification as Read
exports.markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { isRead: true },
    { new: true }
  );

  if (!notification) {
    return res.status(404).json({ message: 'Notification not found' });
  }

  res.status(200).json({
    success: true,
    notification
  });
});

// ❌ Delete Notification
exports.deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });

  if (!notification) {
    return res.status(404).json({ message: 'Notification not found' });
  }

  res.status(200).json({
    success: true,
    message: 'Notification deleted'
  });
});
