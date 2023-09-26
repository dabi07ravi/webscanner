const router = require('express').Router();
const {insertEventData} = require('../services/event.service');

router.post('/insert', insertEventData);


module.exports = router;


