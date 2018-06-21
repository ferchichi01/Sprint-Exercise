//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const sprintlist = require('../models/sprintlist');


//GET HTTP method to /bucketlist
router.get('/', (req, res) => {
    sprintlist.getAllLists((err, lists) => {
        if (err) {
            res.json({ success: false, message: `Failed to load all lists. Error: ${err}` });
        }
        else {
            res.write(JSON.stringify({ success: true, lists: lists }, null, 2));
            res.end();

        }
    });
});


//POST HTTP method to /sprintlist

router.post('/', (req, res, next) => {
    console.log(req.body);
    let newList = new sprintlist({
        name: req.body.name,
        duration: req.body.duration,
        status: req.body.status,
        progress: req.body.progress,
        description: req.body.description,
        notify: req.body.notify,
        user: req.body.user,
        createdAt: req.body.createdAt,
        startedAt: req.body.startedAt,
        finishedAt: req.body.finishedAt,
       
    });
    sprintlist.addList(newList, (err, list) => {
        if (err) {
            res.json({ success: false, message: `Failed to create a new list. Error: ${err}` });

        }
        else
            res.json({ success: true, message: "Added successfully." });

    });
});


//DELETE HTTP method to /sprintlist.
router.delete('/', (req, res) => {
    //let id = req.params.id;
    //console.log(id);
    sprintlist.deleteList((err, list) => {
        if (err) {
            res.json({ success: false, message: `Failed to delete the list. Error: ${err}` });
        }
        else if (list) {
            res.json({ success: true, message: "Deleted successfully" });
        }
        else
            res.json({ success: false });
    })
});

module.exports = router;
