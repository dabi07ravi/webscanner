const eventListmodel = require("../models/eventList.model");
const dataScrapper = require("./scrapper");
const errorLogsModel = require("../models/errorLogs.model");

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

module.exports = { insertNewEvent , scrapEventData };
