const controller = require('../controllers/feedback')
const express = require('express')
const router = express.Router()

/*
 * Get items route
 */
router.get('/', controller.getItems)

/*
 * Create new item route
 */
router.post(
  '/',
  controller.createItem
)


module.exports = router
