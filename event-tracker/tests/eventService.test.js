require("../server");
const {
  insertNewEvent,
  scrapEventData,
  updateEventData,
  deleteEventsData,
  getEventData,
} = require("../services/event.service");

const eventListModel = require("../models/eventList.model");

const chai = require("chai");
const expect = chai.expect;

const data = {
  url: "https://www.imdb.com/title/tt20863760/?ref_=hm_tpks_tt_i_2_pd_tp1_pbr_ic",
  fields: {
    title: ".fDTGTb",
    year: ".sc-e226b0e3-3 ul li a:first",
    director:
      "div.sc-dffc6c81-3 a.ipc-metadata-list-item__list-content-item:first",
  },
  type: "unique",
};

describe("insertNewEvent", () => {
  const { url, fields, type } = data;
 
  describe("when user insert the new data", () => {
    before(async () => {
        // Perform the deletion operation here, e.g., using deleteEventsData
        await deleteEventsData(data.url);
      });
    it.only("it should return the message : success", async () => {
      const result = await insertNewEvent(url, fields, type.toUpperCase());
      expect(result.success).to.equal(true);
    });
  });

  describe("when user insert the same data", () => {
    it("it should throw the error 'url already exists'", async () => {
      const result = await insertNewEvent(url, fields, type.toUpperCase());
      expect(result.success).to.equal(false);
      expect(result.message).to.equal("URL already exists");
    });
  });

  describe("when there is no data comes from the url", () => {
    it("it should throw the error 'No data from this URL'", async () => {
      let inputUrl = "https://www.imd";
      const result = await insertNewEvent(inputUrl, fields, type.toUpperCase());
      expect(result.success).to.equal(false);
      expect(result.message).to.equal("No data from this URL");
    });
  });
});

describe("getEventData", () => {
  describe("when user get the single data", () => {
    it("it should return the single data", async () => {
      const result = await getEventData(data.url);
      expect(result.success).to.equal(true);
    });
  });

  describe("when user not get the single data", () => {
    const url = "https://www.youtube.com/watch?v=4tywp83zkmk";
    it("it should not return the single data", async () => {
      const result = await getEventData(url);
      expect(result.success).to.equal(false);
      expect(result.message).to.equal("no event found");
    });
  });
});

describe("updateEventData", () => {
  describe("when user update the event fields", () => {
    it("it should update the fields", async () => {
      const body = {
        url: data.url,
        fields: {
          title: ".fDTGTb",
          year: ".sc-e226b0e3-3 ul li a:first",
          director:
            "div.sc-dffc6c81-3 a.ipc-metadata-list-item__list-content-item:first",
          writer: ".fggthdstyghbbc",
        },
      };

      const result = await updateEventData(body);
      expect(result.success).to.equal(true);
      expect(result.message).to.equal("Updated latest version successfully");
    });
  });

  describe("error occur while updating the fields", () => {
    it("it should throw the error url not match", async () => {
      const body = {
        url: "https://www.youtube.com/watch?v=4tywp83zkmk",
        fields: {
          title: ".fDTGTb",
          year: ".sc-e226b0e3-3 ul li a:first",
          director:
            "div.sc-dffc6c81-3 a.ipc-metadata-list-item__list-content-item:first",
          writer: ".fggthdstyghbbc",
        },
      };
      const result = await updateEventData(body);
      expect(result.success).to.equal(false);
      expect(result.message).to.equal(
        "No matching document found for updation"
      );
    });
  });
});

describe("deleteEventsData", () => {
  describe("when user delete the events", () => {
    it("it should delete the data", async () => {
      const result = await deleteEventsData(data.url);
      expect(result.success).to.equal(true);
      expect(result.message).to.equal("Deleted event(s) successfully");
      await insertNewEvent(data.url, data.fields, data.type.toUpperCase());
    });
  });

  describe("when user enter the wrong url", () => {
    it("it should not delete the data and throw the error", async () => {
      const wrongUrl = "https://www.youtube.com/watch?v=4tywp83zkmk";
      const result = await deleteEventsData(wrongUrl);
      expect(result.success).to.equal(false);
      expect(result.message).to.equal(
        "No matching documents found for deletion"
      );
    });
  });
});

describe("scrapEventData", () => {
  describe("when no new data stored in the db", () => {
    it("it should give the message no new data stored", async () => {
      const result = await scrapEventData();
      expect(result.success).to.equal(false);
      expect(result.message).to.equal("no new data found");
    }).timeout(10000);
  });
});
