const express = require('express');
const router = express.Router();
const { insertNewEvent , scrapEventData} = require('../services/event.service');

router.post('/insert-new-event', async (req, res) => {
  try {
    const { url, fields } = req.body;
    const result = await insertNewEvent(url, fields);

    if (result.success) {
      res.send(result.data);
    } else {
      res.status(400).send(result.message);
    }

  } catch (error) {
    res.status(500).send(`error while insert the base data ${error.message}`);
  }
});


router.get('/scrap-data', async (req, res) => {
  try {
    const result = await scrapEventData();
    res.send(result.message);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
