const express = require('express')
const { authController } = require('../controllers/index')
const router = express.Router()

router.post('/', authController.register)
router.post('/login', authController.login)
router.get('/users', authController.fetchUsers)

module.exports = router