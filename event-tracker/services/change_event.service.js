const base_event_model = require("../models/base_event.model");
const errorLogsModel = require("../models/errorLogs.model");
const dataScrapper = require("../services/scrapper");
const reportGeneration = require('../services/excelService')

const chkEventData = async (req, res) => {
  try {
    const newData = [];
    const notFoundScrappedData = [];
    const events = await base_event_model.find();
    await Promise.all(
      events.map(async (event) => {
        const scrappedData = await dataScrapper(event.url, event.fields);
        console.log("scrappedData", scrappedData);
        const latestEventExists = await base_event_model
          .findOne({ url: event.url })
          .sort({ version: -1 });
        if (
          Object.keys(scrappedData).length !== 0 &&
          Object.keys(latestEventExists).length !== 0
        ) {
          for (const key in scrappedData) {
            if (scrappedData[key] !== latestEventExists.scrappedData[key]) {
              const newEvent = new base_event_model({
                url: event.url,
                fields: event.fields,
                scrappedData: scrappedData,
                version: latestEventExists?.version
                  ? latestEventExists.version + 1
                  : 1,
              });
              await newEvent.save();
              newData.push({ "url": newEvent.url });
            }
          }
        } else {
          const errorEvent = new errorLogsModel({
            url: event.url,
            fields: event.fields,
            scrappedData: scrappedData,
          });
          await errorEvent.save();
          notFoundScrappedData.push(event.url);
        }
      })
    );
    if (newData.length !== 0) {
      res.send("new data stored successfully");
      console.log("newData",newData);
      await reportGeneration(newData)
      newData.splice(0, newData.length);
    } else {
      res.send("no new data found");
    }
  } catch (error) {
    console.log(`error while checking the data ${error.message}`);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { chkEventData };
