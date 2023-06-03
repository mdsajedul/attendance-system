const router = require('express').Router()
const studentAttendanceRoute = require('../controller/student-attendance')


router.get('/status', studentAttendanceRoute.getAttendanceStatus)
router.get('/:id',studentAttendanceRoute.getAttendance)

module.exports = router