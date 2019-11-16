const express = require('express');
const router = express.Router();

const Entry = require('../../models/entry');

//@route GET api/entries
//@desc Get all entries

router.get('/', (req, res) => {
    Entry.find()
        .sort({ userId: 1})
        .then(entries => res.json(entries));
});

//@route POST api/entries
//@desc Create new entry
//@access Public for now

router.post('/', (req, res) => {
    const newEntry = new Entry({
        entryId: req.body.entryId
    });

    newEntry.save()
        .then(entry => res.json(entry));
});

//@route DELETE api/entries/:entryId
//@desc Delete an entry
//@access Public for now

router.delete('/:entryId', (req, res) => {
    Entry.findById(req.params.entryId)
        .then(entry => entry.remove()
            .then(() =>  res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});


module.exports = router;

