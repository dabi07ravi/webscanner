const router = require('express').Router();
const {chkEventData} = require('../services/change_event.service');

router.get('/chkdata', chkEventData);


module.exports = router;