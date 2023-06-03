const router = require('express').Router()
const authenticate = require('../middleware/authenticate')
const authRoutes = require('./auth')
const usersRoutes = require('./users')
const adminAttendacneRoute = require('./admin-attendance')
const studentAttendanceRoute = require('./student-attendance')

router.use('/api/v1/auth',authRoutes)
router.use('/api/v1/users',authenticate, usersRoutes)
router.use('/api/v1/admin/attendance',authenticate, adminAttendacneRoute)
router.use('/api/v1/student/attendance', authenticate,studentAttendanceRoute)


module.exports = router