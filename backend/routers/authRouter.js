const express = require('express')
const { authController } = require('../controllers/index')
const router = express.Router()

router.post('/', authController.register)
router.get('/', authController.login)
router.get('/users', authController.fetchUsers)

module.exports = router