const express = require('express');
const path = require('path');
const xlsx = require('xlsx');
const cors = require('cors'); // Import cors middleware

const app = express();
const PORT = 3000;

// Middleware to enable CORS
app.use(cors());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to get data from the Excel file
app.get('/api/data', (req, res) => {
    const device = req.query.device || 'main';
    const workbook = xlsx.readFile('data.xlsx');
    const sheet = workbook.Sheets[device];
    const json = xlsx.utils.sheet_to_json(sheet);

    const response = {
        time: json.map(row => row.Time),
        power: json.map(row => row.Power)
    };

    res.json(response);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
