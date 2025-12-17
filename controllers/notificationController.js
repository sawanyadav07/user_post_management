const Notification = require('../models/Notification');
const asyncHandler = require('../utils/asyncHandler');

// 🔔 Create Notification (internal use)
exports.createNotification = asyncHandler(async ({ userId, message }) => {

  if (!userId || !message) return;

  await Notification.create({
    user: userId,
    message
  });

});

// 📥 Get My Notifications
exports.getMyNotifications = asyncHandler(async (req, res) => {
  
  const notifications = await Notification.find({ user: req.user._id })
    .sort({ createdAt: -1 });

  const unreadCount = await Notification.countDocuments({
    user: req.user._id,
    isRead: false
  });

  res.status(200).json({
    success: true,
    count: notifications.length,
    unreadCount,
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

// ✅ Mark ALL Notifications as Read (NEW)
exports.markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    {
      user: req.user._id,
      isRead: false
    },
    { isRead: true }
  );

  res.status(200).json({
    success: true,
    message: 'All notifications marked as read'
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
