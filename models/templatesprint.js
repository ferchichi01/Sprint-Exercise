//Require mongoose package
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    

const TemplatesprintlistSchema = new Schema({
    name: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    status: { type: boolean, required: true },

});

const Templatesprintlist = module.exports = mongoose.model('Templatesprintlist', TemplatesprintlistSchema);