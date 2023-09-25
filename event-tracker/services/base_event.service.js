const base_event_model = require('../models/base_event.model');
const dataScrapper = require('../services/scrapper');


const insertEventData = async (req,res) => {
    try {          
                const {url,fields} = req.body
                const urlExist = await base_event_model.find({url: url});
                if(urlExist.length !== 0){
                    return res.send("url already exits")
                }
               const scrappedData = await dataScrapper(url,fields);
                const insertedEvent = await base_event_model.create({
                    url: url,
                    fields : fields,
                    scrappedData : scrappedData // Spread the scrappedData object to insert its fields
                });
                //console.log("insertedEvent",insertedEvent)
               return res.send(insertedEvent)
    } catch (error) {
                return res.send(`error while insert the base data ${error.message}`)
    }
} 


module.exports = {insertEventData}