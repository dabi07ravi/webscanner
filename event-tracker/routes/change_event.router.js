const express = require('express');
const router = express.Router();
const { chkEventData } = require('../services/change_event.service');

router.get('/chkdata', async (req, res) => {
  try {
    const result = await chkEventData();
    res.send(result.message);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
