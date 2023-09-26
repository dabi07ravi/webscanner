const express = require('express');
const router = express.Router();
const { insertEventData } = require('../services/event.service');

router.post('/insert', async (req, res) => {
  try {
    const { url, fields } = req.body;
    const result = await insertEventData(url, fields);

    if (result.success) {
      res.send(result.data);
    } else {
      res.status(400).send(result.message);
    }

  } catch (error) {
    res.status(500).send(`error while insert the base data ${error.message}`);
  }
});

module.exports = router;
