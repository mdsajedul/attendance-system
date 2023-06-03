const router = require('express').Router()
const adminAttendance = require('../controller/admin-attendance');

router.get('/enable', adminAttendance.getEnable);
router.get('/disable', adminAttendance.getDisable);
router.get('/status',adminAttendance.getStatus);

module.exports = router