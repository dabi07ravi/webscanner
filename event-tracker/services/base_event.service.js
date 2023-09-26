const eventListmodel = require("../models/base_event.model");
const dataScrapper = require("../services/scrapper");
const errorLogsModel = require("../models/errorLogs.model");

const insertEventData = async (req, res) => {
  try {
    const { url, fields } = req.body;
    const urlExist = await eventListmodel.find({ url: url });
    if (urlExist.length !== 0) {
      return res.send("url already exits");
    }
    const scrappedData = await dataScrapper(url, fields);
    if (Object.keys(scrappedData).length === 0) {
      const errorEvent = new errorLogsModel({
        url: url,
        fields: fields,
        scrappedData: scrappedData,
      });
      await errorEvent.save();
      return res.send("no data comes from this url");
    }
    const insertedEvent = await eventListmodel.create({
      url: url,
      fields: fields,
      scrappedData: scrappedData, // Spread the scrappedData object to insert its fields
    });
    return res.send(insertedEvent);
  } catch (error) {
    return res.send(`error while insert the base data ${error.message}`);
  }
};

module.exports = { insertEventData };
