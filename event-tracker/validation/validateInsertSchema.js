const joi  = require('joi');

const eventSchema = joi.object({
    url: joi.string().required(),
    fields: joi.object().required(),
    type : joi.string().required(),
})


const validateInsertSchema = (req,res,next) => {
    const {error} = eventSchema.validate(req.body);
    if(error){
        return res.status(404).send({
            error : error.details[0].message
          
        })
    }else{
        next();
    }
}

module.exports = validateInsertSchema;