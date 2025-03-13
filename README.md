# School Management API

This is a **Node.js API** built with **Express.js** and **MySQL** to manage school data. It allows users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

## Features
✅ Add new schools with name, address, latitude, and longitude.  
✅ Retrieve a list of schools sorted by distance from a given location.  
✅ Validation to prevent duplicate addresses and ensure correct data format.  
✅ Hosted and tested with Postman collections.

---

## 📌 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Validation:** express-validator
- **Hosting:** (To be updated after deployment)

---

## 🚀 Installation & Setup
### **1. Clone the Repository**
```bash
git clone https://github.com/your-repo-url.git
cd SchoolManagementAPI
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up MySQL Database**
Create a `schools` table in MySQL:
```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) UNIQUE NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

### **4. Configure Database Connection**
Modify `config/db.js` with your MySQL credentials:
```javascript
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'school_management'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

module.exports = db;
```

### **5. Start the Server**
```bash
npm start
```

---

## 📌 API Endpoints

### **1️⃣ Add School**
**Endpoint:** `/api/addSchool`  
**Method:** `POST`  
**Request Body:**
```json
{
  "name": "XYZ Public School",
  "address": "New Delhi, India",
  "latitude": 28.7041,
  "longitude": 77.1025
}
```
**Response:**
```json
{
  "message": "School added successfully",
  "id": 1
}
```
**Validation Rules:**
- `name` & `address` **must not be empty**
- `latitude` should be **between -90 and 90**
- `longitude` should be **between -180 and 180**
- **Duplicate addresses are not allowed**

---

### **2️⃣ List Schools (Sorted by Distance)**
**Endpoint:** `/api/listSchools`  
**Method:** `GET`  
**Query Params:**
```json
{
  "latitude": 28.7041,
  "longitude": 77.1025
}
```
**Response:**
```json
[
  {
    "id": 1,
    "name": "XYZ Public School",
    "address": "New Delhi, India",
    "latitude": 28.7041,
    "longitude": 77.1025,
    "distance": 0.0
  }
]
```
**Validation Rules:**
- `latitude` should be **between -90 and 90**
- `longitude` should be **between -180 and 180**

---

## 🛠️ Testing with Postman
1. Import the **Postman Collection**: [Link to Collection]
2. Test the `/addSchool` and `/listSchools` endpoints.

---

## 🌍 Deployment (Optional)
1. **Deploy on Render/Vercel** or **Host on AWS/DigitalOcean**
2. Update the database credentials in the environment variables.

---

## 📌 Future Improvements
🔹 Add authentication (JWT) for secure access.  
🔹 Implement pagination for the list of schools.  
🔹 Add update & delete school endpoints.  

---

## 👨‍💻 Author
**Nish Singh**

