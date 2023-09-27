const eventListmodel = require("../models/eventList.model");
const dataScrapper = require("./scrapper");
const errorLogsModel = require("../models/errorLogs.model");
const _ = require('lodash');
const reportGeneration = require('../services/excelService');

const insertNewEvent = async (url, fields) => {
  try {
    const urlExist = await eventListmodel.find({ url: url });
    if (urlExist.length !== 0) {
      return { success: false, message: "url already exits" };
    }

    const scrappedData = await dataScrapper(url, fields);

    if (Object.keys(scrappedData).length === 0) {
      const errorEvent = new errorLogsModel({
        url: url,
        fields: fields,
        scrappedData: scrappedData,
      });
      await errorEvent.save();
      return { success: false, message: "no data comes from this url" };
    }

    const insertedEvent = await eventListmodel.create({
      url: url,
      fields: fields,
      scrappedData: scrappedData,
    });

    return { success: true, data: insertedEvent };

  } catch (error) {
    console.error(`error while insert the base data ${error.message}`);
    throw error;
  }
};


/**
 * Fetch latest version of events.
 * @returns {Array} events
 */
const fetchLatestEvents = async () => {
  return await eventListmodel.aggregate([
    {
      $sort: { documentId: 1, version: -1 }  // Sort by documentId first, then by version
    },
    {
      $group: {
        _id: "$documentId", // Group by the document's unique identifier
        latestDocument: { $first: "$$ROOT" } // Get the first document of each group after sorting
      }
    },
    {
      $replaceRoot: { newRoot: "$latestDocument" }  // Replace root to have the structure of original document
    }
  ]);
}

/**
 * Handle scrapped data and decide on saving or error logging.
 * @param {Object} event
 * @param {Array} newData
 * @param {Array} notFoundScrappedData
 */
const handleScrappedData = async (event, newData, notFoundScrappedData) => {
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
}

const scrapEventData = async () => {
  const newData = [];
  const notFoundScrappedData = [];

  try {
    const events = await fetchLatestEvents();

    const promises = events.map(event => handleScrappedData(event, newData, notFoundScrappedData));

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

module.exports = { insertNewEvent , scrapEventData };
