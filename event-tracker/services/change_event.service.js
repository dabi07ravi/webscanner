const _ = require('lodash');
const eventListmodel = require("../models/eventList.model");
const errorLogsModel = require("../models/errorLogs.model");
const dataScrapper = require("../services/scrapper");
const reportGeneration = require('../services/excelService');

const chkEventData = async () => {
  const newData = [];
  const notFoundScrappedData = [];

  try {
    const events = await eventListmodel.find();

    const promises = events.map(async (event) => {
      const scrappedData = await dataScrapper(event.url, event.fields);

      if (!_.isEmpty(scrappedData)) {
        if (!_.isEqual(scrappedData, event.scrappedData)) {
          const newEvent = new eventListmodel({
            url: event.url,
            fields: event.fields,
            scrappedData,
            version: event.version ? event.version + 1 : 1,
          });
          await newEvent.save();
          newData.push({ url: newEvent.url });
        }
      } else {
        const errorEvent = new errorLogsModel({
          url: event.url,
          fields: event.fields,
          scrappedData,
        });
        await errorEvent.save();
        notFoundScrappedData.push(event.url);
      }
    });

    await Promise.all(promises);

    if (!_.isEmpty(newData)) {
      await reportGeneration(newData);
      return { success: true, message: "new data stored successfully" };
    } else {
      return { success: false, message: "no new data found" };
    }
  } catch (error) {
    console.log(`error while checking the data ${error.message}`);
    throw error;
  }
};

module.exports = { chkEventData };
