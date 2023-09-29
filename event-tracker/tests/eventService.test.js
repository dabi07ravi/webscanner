const {
    insertNewEvent,
    scrapEventData,
    updateEventData,
    deleteEventsData,
    getEventData,
  } = require("../services/event.service");

  const eventListModel = require('../models/eventList.model');


const chai = require('chai');
const expect = chai.expect;

const data = 
    {
        url: "https://www.imdb.com/list/ls527678168/mediaviewer/rm3198639361?ref_=hm_edcep_sw_pks_sept23_1_i",
        fields: {
            "title": ".fDTGTb",
            "year": ".sc-e226b0e3-3 ul li a:first",
            "director": "div.sc-dffc6c81-3 a.ipc-metadata-list-item__list-content-item:first"
        },
        type : "unique"
    }


describe("insertNewEvent", () => {
    
    const { url, fields, type } = data;
    describe("when user insert the new data", () => {
            it("it should return the message : success", async (done) => {
                const result = await insertNewEvent(url, fields, type.toUpperCase());
                console.log("result",result);
                done()
            })
    })
})

