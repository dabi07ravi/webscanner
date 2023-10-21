const eventListmodel = require("../models/eventList.model");
const dataScrapper = require("./scrapper");
const errorLogsModel = require("../models/errorLogs.model");
const _ = require("lodash");
const reportGeneration = require("../services/excelService");
const emailSend = require("../services/emailService");

const insertNewEvent = async (url, fields, type) => {
  try {
    const urlExist = await eventListmodel.findOne({ url });

    if (urlExist) {
      return { success: false, message: "URL already exists" };
    }

    let scrappedData = await dataScrapper(url, fields);
    if (Object.keys(scrappedData).length === 0) {
      const errorEvent = new errorLogsModel({
        url,
        fields,
        scrappedData,
      });

      await errorEvent.save();
      return { success: false, message: "No data from this URL" };
    }
    const insertedEvent = await eventListmodel.create({
      url,
      fields,
      scrappedData,
      type,
    });
    return { success: true, data: insertedEvent };
  } catch (error) {
    console.error(`Error while inserting the base data: ${error.message}`);
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
      $match: { processed: true },
    },
    {
      $sort: { url: 1, version: -1 }, // Sort by url (ascending) and version (descending)
    },
    {
      $group: {
        _id: "$url", // Group by url
        doc: { $first: "$$ROOT" }, // Take the first (highest version) document
      },
    },
    {
      $replaceRoot: { newRoot: "$doc" }, // Replace root with the actual document
    },
  ]);
};

/**
 * Handle scrapped data and decide on saving or error logging.
 * @param {Object} event
 * @param {Array} newData
 * @param {Array} notFoundScrappedData
 */
const handleScrappedData = async (event, newData, notFoundScrappedData) => {
  let oldUrl = event.url;
  if (
    event.type === "PATTERN" &&
    event.url.includes("2023") &&
    event.processed
  ) {
    event.url = event.url.replace("2023", "2024");
  }
  const scrappedData = await dataScrapper(event.url, event.fields);
  if (!_.isEmpty(scrappedData)) {
    if (event.type === "PATTERN") {
      const filter = { url: oldUrl };
      const update = {
        $set: {
          processed: false,
        },
      };
      await eventListmodel.updateOne(filter, update);
    }
    if (!_.isEqual(scrappedData, event.scrappedData)) {
      const newEvent = new eventListmodel({
        url: event.url,
        fields: event.fields,
        scrappedData,
        version: event.version ? event.version + 1 : 1,
        type: event.type,
      });
      await newEvent.save();
      newData.push({ url: newEvent.url, ...newEvent.scrappedData });
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
};

const scrapEventData = async () => {
  const newData = [];
  const notFoundScrappedData = [];

  try {
    let events = await fetchLatestEvents();
    // let patternEvents = [];
    // let uniqueEvents = [];
    // let finalevents = [];

    // // Use Promise.all to await all promises returned by map
    // await Promise.all(
    //   events.map(async (event) => {
    //     if (
    //       event.type === "PATTERN" &&
    //       event.url.includes("2023") &&
    //       event.processed
    //     ) {
    //       const filter = { url: event.url };
    //       const update = {
    //         $set: {
    //           processed: false,
    //         },
    //       };
    //       await eventListmodel.updateOne(filter, update);
    //       event.url = event.url.replace("2023", "2024");
    //       patternEvents.push(event);
    //     } else if (
    //       event.type === "PATTERN" &&
    //       event.url.includes("23") &&
    //       event.processed
    //     ) {
    //       const filter = { url: event.url };
    //       const update = {
    //         $set: {
    //           processed: false,
    //         },
    //       };
    //       await eventListmodel.updateOne(filter, update);
    //       event.url = event.url.replace("23", "24");
    //       patternEvents.push(event);
    //     } else {
    //       uniqueEvents.push(event);
    //     }
    //   })
    // );

    // finalevents = [...uniqueEvents, ...patternEvents];
    const promises = events.map((event) =>
      handleScrappedData(event, newData, notFoundScrappedData)
    );

    await Promise.all(promises);

    if (!_.isEmpty(newData)) {
      await reportGeneration(newData);
      await emailSend.sendEmail();
      return { success: true, message: "new data stored successfully" };
    } else {
      return { success: false, message: "no new data found" };
    }
  } catch (error) {
    console.log(`error while checking the data ${error.message}`);
    throw error;
  }
};

const updateEventData = async (body) => {
  const { url, fields } = body;
  try {
    const latestVersionDoc = await eventListmodel
      .aggregate([
        {
          $match: { url: url },
        },
        {
          $sort: { version: -1 },
        },
        {
          $limit: 1,
        },
      ])
      .exec();
    if (latestVersionDoc.length === 0) {
      return {
        success: false,
        message: "No matching document found for updation",
      };
    }
    const result = await eventListmodel.updateOne(
      { url: latestVersionDoc[0].url },
      { $set: { fields: fields } }
    );
    if (result.acknowledged) {
      return { success: true, message: "Updated fields successfully" };
    } else {
      return {
        success: false,
        message: "An error occurred while updating the fields",
      };
    }
  } catch (error) {
    console.error(`Error while updating the data: ${error.message}`);
    return {
      success: false,
      message: "An error occurred while updating the data",
    };
  }
};

const deleteEventsData = async (url) => {
  try {
    const result = await eventListmodel.deleteMany({ url: url });

    if (result.deletedCount > 0) {
      return { success: true, message: "Deleted event(s) successfully" };
    } else {
      return {
        success: false,
        message: "No matching documents found for deletion",
      };
    }
  } catch (error) {
    console.error(`Error while deleting the data: ${error.message}`);
    return {
      success: false,
      message: "An error occurred while deleting the data",
    };
  }
};

const getEventData = async (url) => {
  try {
    const event = await eventListmodel
      .aggregate([
        {
          $match: { url: url },
        },
        {
          $sort: { version: -1 },
        },
        {
          $limit: 1,
        },
      ])
      .exec();
    if (event.length !== 0) {
      return { success: true, data: event };
    } else {
      return { success: false, message: "no event found" };
    }
  } catch (error) {
    console.error(`Error while getting the data: ${error.message}`);
    return {
      success: false,
      message: "An error occurred while getting  the event data",
    };
  }
};

module.exports = {
  insertNewEvent,
  scrapEventData,
  updateEventData,
  deleteEventsData,
  getEventData,
};
