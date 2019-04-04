const bcrypt = require('bcrypt');
const Joi = require('joi');
const Content = require('../models/content.model');

const contentSchema = Joi.object({
  sections: {
      about : {
          content : Joi.string()
      },
      quotes : {
          content : Joi.string()
      },
      contact : {
          content : Joi.string()
      },
      menuHeading : {
          content : Joi.string()
      },
      miniMenu : {
          content : Joi.string()
      },
      menu : {
          content : Joi.string()
      }
  }
});


module.exports = {
    insert,
    get
};

async function insert(content) {
  content = await Joi.validate(content, contentSchema, { abortEarly: false });
  return await new Content(content).save();
}

async function get() {
  return await Content.find({});
}
