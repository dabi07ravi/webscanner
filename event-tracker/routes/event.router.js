const express = require("express");
const router = express.Router();
const {
  insertNewEvent,
  scrapEventData,
  updateEventData,
  deleteEventsData,
  getEventData,
} = require("../services/event.service");
const validateInsertSchema = require("../validation/validateInsertSchema");
const validateUpdateSchema = require("../validation/validateUpdateschema");


router.post("/insert-new-event", validateInsertSchema, async (req, res) => {
  try {
    const { url, fields, type } = req.body;
    const result = await insertNewEvent(url, fields, type.toUpperCase());

    if (result.success) {
      res.send(result.data);
    } else {
      res.status(400).send(result.message);
    }
  } catch (error) {
    res.status(500).send(`error while insert the base data ${error.message}`);
  }
});

router.get("/scrap-data", async (req, res) => {
  try {
    const result = await scrapEventData();
    res.send(result.message);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.put("/update", validateUpdateSchema, async (req, res) => {
  try {
    const result = await updateEventData(req.body);
    if (result.success) {
      res.send(result.message);
    } else {
      res.send(result.message);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete-all", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.send("please enter the url");
    }
    const result = await deleteEventsData(url);
    if (result.success) {
      res.send(result.message);
    } else {
      res.send(result.message);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/get", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.send("please enter the url");
    }
    const result = await getEventData(url);
    if (result.success) {
      res.send(result.data);
    } else {
      res.send(result.message);
    }
  } catch (error) {
    console.log("eror",error.message)
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
