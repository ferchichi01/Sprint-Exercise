
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    

const SprintlistSchema = new Schema({
    name: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
    progress: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    notify: { type: Boolean, default: false, required: true},
    user: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now, required: true },
    startedAt: { type: Date, default: Date.now, required: true},
    finishedAt: { type: Date, required: true },
});

const SprintList = module.exports = mongoose.model('SprintList', SprintlistSchema);



module.exports.getAllLists = (callback) => {
    SprintList.find(callback);
}

//newList.save is used to insert the document into MongoDB
module.exports.addList = (newList, callback) => {
    newList.save(callback);
}


module.exports.deleteList = (callback) => {
	//let query = {_id: id};
	SprintList.remove(callback);
}
