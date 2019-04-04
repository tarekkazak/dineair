const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  sections: {
      updatedAt: {
          type: Date,
          default: Date.now
      },
      about : {
          content : { type: String, trim : true }
      },
      quotes : {
          content : { type: String, trim : true }
      },
      contact : {
          content : { type: String, trim : true }
      },
      menuHeading : {
          content : { type: String, trim : true }
      },
      miniMenu : {
          content : { type: String, trim : true }
      },
      menu : {
          content : { type: String, trim : true }
      }
  },
}, {
  versionKey: false
});


module.exports = mongoose.model('Content', ContentSchema);
