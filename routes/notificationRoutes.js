const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  getMyNotifications,
  markAsRead,
  deleteNotification
} = require('../controllers/notificationController');

router.get('/', auth, getMyNotifications);
router.put('/:id/read', auth, markAsRead);
router.delete('/:id', auth, deleteNotification);

module.exports = router;
