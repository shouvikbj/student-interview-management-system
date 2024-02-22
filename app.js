// Import necessary modules
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const fs = require('fs');
const csvWriter = require('csv-writer').createObjectCsvWriter;
const Student = require("./models/Student");
const Interview = require("./models/Interview");

// Initialize Express app
const app = express();

// Database connection
const connectDB = require('./config/db');
connectDB();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session middleware
app.use(session({
  secret: 'secret-key',
  resave: true,
  saveUninitialized: true
}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine and views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// import auth middleware
const {isAuthenticated} = require("./middleware/authMiddleware");

// Define routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const resultRoutes = require('./routes/resultRoutes');

// Use routes
app.use('/auth', authRoutes);
app.use('/students', isAuthenticated, studentRoutes);
app.use('/interviews', isAuthenticated, interviewRoutes);
app.use('/results', isAuthenticated, resultRoutes);

// Define a simple route to render index.ejs
app.get('/', isAuthenticated, (req, res) => {
  res.render('index');
});

// download csv file
app.get('/download-csv', isAuthenticated, async (req, res) => {
    try {
        // Fetch data from your database or storage
        const students = await Student.find().lean().exec();
        const interviews = await Interview.find().lean().exec();

        // Format the data into CSV format
        const csvData = students.map(student => {
            const interview = interviews.find(interview => interview.studentId === student._id);

            return {
                'Student id': student._id,
                'Student name': student.name,
                'Student college': student.college,
                'Student status': student.status,
                'DSA Final Score': student.DSAFinalScore,
                'WebD Final Score': student.WebDFinalScore,
                'React Final Score': student.ReactFinalScore,
                'Interview date': interview ? interview.date : '',
                'Interview company': interview ? interview.company : ''
            };
        });

        // Set up CSV writer
        const writer = csvWriter({
            path: 'students_data.csv',
            header: [
                { id: 'Student id', title: 'Student id' },
                { id: 'Student name', title: 'Student name' },
                { id: 'Student college', title: 'Student college' },
                { id: 'Student status', title: 'Student status' },
                { id: 'DSA Final Score', title: 'DSA Final Score' },
                { id: 'WebD Final Score', title: 'WebD Final Score' },
                { id: 'React Final Score', title: 'React Final Score' },
                { id: 'Interview date', title: 'Interview date' },
                { id: 'Interview company', title: 'Interview company' }
            ]
        });

        // Write data to CSV file
        await writer.writeRecords(csvData);

        // Send the CSV file to the client for download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=students_data.csv');
        fs.createReadStream('students_data.csv').pipe(res);
    } catch (error) {
        console.error('Error generating CSV:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Define route to fetch jobs
app.get('/jobs', async (req, res) => {
    try {
        // Make API request to fetch job listings
        const response = await axios.get('https://jobs.github.com/positions.json', {
            params: {
                description: 'React',
                location: 'India'
            }
        });

        // Extract job listings from response data
        const jobs = response.data;

        // Render jobs page with fetched data
        res.render('jobs/jobs', { jobs });
    } catch (error) {
        console.error('Error fetching jobs');
        res.status(500).send('Internal Server Error');
    }
});

// Set up the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
