// title,description,tag,createdby
const mongoose = require('mongoose')

const webSchema = new mongoose.Schema({
    title: {
   type: String,
 required: [true, 'please provide a web title'],
    },
    description: {
  type: String,
  required: [true, 'please provide a web description'],
    },
    tag : {
        type: String,
  enum: ['Sport', 'Lifestyle', 'Gossip'],
    },
    createdby: {
        type :mongoose.Types.ObjectId,
        ref: 'User',
        required:[true, "please provide a writer"],
    },
},
{ timestamps: true}
);

module.exports = mongoose.model('Web', webSchema);