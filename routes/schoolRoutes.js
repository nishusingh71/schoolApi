const express = require("express");
const { body, query, validationResult } = require("express-validator");
const router = express.Router();
const schoolController = require("../controllers/schoolController");

// Middleware to handle validation errors
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Add School Route with Validation
router.post(
    "/addSchool",
    [
        body("name").trim().notEmpty().withMessage("School name is required."),
        body("address").trim().notEmpty().withMessage("Address is required."),
        body("latitude")
            .isFloat({ min: -90, max: 90 })
            .withMessage("Latitude must be a valid float between -90 and 90."),
        body("longitude")
            .isFloat({ min: -180, max: 180 })
            .withMessage("Longitude must be a valid float between -180 and 180."),
    ],
    validateRequest,
    schoolController.addSchool
);

// List Schools Route with Validation
router.get(
    "/listSchools",
    [
        query("latitude")
            .isFloat({ min: -90, max: 90 })
            .withMessage("Latitude must be a valid float between -90 and 90."),
        query("longitude")
            .isFloat({ min: -180, max: 180 })
            .withMessage("Longitude must be a valid float between -180 and 180."),
    ],
    validateRequest,
    schoolController.listSchools
);

module.exports = router;
