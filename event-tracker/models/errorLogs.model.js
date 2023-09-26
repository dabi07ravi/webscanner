const mongoose = require("mongoose");

const errorLogs = new mongoose.Schema(
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
  },
  { timestamps: true }
);

const errorLogsModel = mongoose.model("errorLogs", errorLogs);

module.exports = errorLogsModel;
