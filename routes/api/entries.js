const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Entry = require('../../models/entry');

//@route GET api/entries
//@desc Get all entries

router.get('/:userId', (req, res) => {
    Entry.find({ userId: req.params.userId })
        .sort({ added_date: -1})
        .then(entries => res.json(entries));
});

//@route POST api/entries
//@desc Create new entry
//@access Private

router.post('/', auth, (req, res) => {
    const newEntry = new Entry({
        entryId: req.body.entryId,
        userId: req.body.userId
    });

    newEntry.save()
        .then(entry => res.json(entry));
});

//@route DELETE api/entries/:entryId
//@desc Delete an entry
//@access Private

router.delete('/:entryId', auth, (req, res) => {
    Entry.findById(req.params.entryId)
        .then(entry => entry.remove()
            .then(() =>  res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;

