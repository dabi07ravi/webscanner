const mongoose = require("mongoose");

const eventListSchema = new mongoose.Schema(
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
    type : {
      type : String,
      default : "UNIQUE"
    },
    version: {
      type: Number,
      default : 1
    },
  },
  { timestamps: true }
);

const eventListModel = mongoose.model("eventList", eventListSchema);

module.exports = eventListModel;
