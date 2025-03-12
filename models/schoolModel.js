const db = require("../config/db");

class SchoolModel {
    static checkDuplicateAddress(address, callback) {
        const query = "SELECT id FROM schools WHERE address = ?";
        db.query(query, [address], callback);
    }

    static addSchool(name, address, latitude, longitude, callback) {
        const query = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
        db.query(query, [name, address, latitude, longitude], callback);
    }

    static getAllSchoolsSorted(userLat, userLon, callback) {
        const query = `
            SELECT id, name, address, latitude, longitude,
            (6371 * ACOS(
                COS(RADIANS(?)) * COS(RADIANS(latitude)) * 
                COS(RADIANS(longitude) - RADIANS(?)) + 
                SIN(RADIANS(?)) * SIN(RADIANS(latitude))
            )) AS distance
            FROM schools
            ORDER BY distance ASC;
        `;
        db.query(query, [userLat, userLon, userLat], callback);
    }
}

module.exports = SchoolModel;
