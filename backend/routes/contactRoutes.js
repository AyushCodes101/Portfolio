const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact")

// POST Contact form
router.post("/", async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({message: "Message Sent Sucessfully"});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

module.exports = router;