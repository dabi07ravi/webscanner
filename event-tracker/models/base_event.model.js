const mongoose = require("mongoose");

const base_event_Schema = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    fields: {
      type: Object,
    },
    scrappedData : {
      type: Object,
    },
    version: {
      type: Number,
      default : 0
    },
  },
  { timestamps: true }
);

const base_event_Model = mongoose.model("eventList", base_event_Schema);

module.exports = base_event_Model;
