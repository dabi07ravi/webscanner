const router = require('express').Router();
const {insertEventData} = require('../services/base_event.service');

router.post('/insert', insertEventData);


module.exports = router;


