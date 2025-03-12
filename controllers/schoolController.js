const SchoolModel = require("../models/schoolModel");

exports.addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // Check for duplicate address before inserting
    SchoolModel.checkDuplicateAddress(address, (err, results) => {
        if (err) {
            console.error("Error checking duplicate address:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length > 0) {
            return res.status(409).json({ error: "A school with this address already exists." });
        }

        // If no duplicate, insert the new school
        SchoolModel.addSchool(name, address, latitude, longitude, (err, result) => {
            if (err) {
                console.error("Error inserting school:", err);
                return res.status(500).json({ error: "Database error" });
            }
            res.status(201).json({ message: "School added successfully", id: result.insertId });
        });
    });
};

exports.listSchools = (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and longitude are required." });
    }

    SchoolModel.getAllSchoolsSorted(latitude, longitude, (err, results) => {
        if (err) {
            console.error("Error fetching schools:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
};
