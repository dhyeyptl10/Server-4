const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-Memory JSON Database
const students = [
  { id: 1, name: "Aarav Sharma", branch: "CSE", semester: 8, cgpa: 9.3 },
  { id: 2, name: "Ishita Verma", branch: "IT", semester: 7, cgpa: 8.9 },
  { id: 3, name: "Rohan Kulkarni", branch: "ECE", semester: 6, cgpa: 8.4 },
  { id: 4, name: "Meera Iyer", branch: "CSE", semester: 8, cgpa: 9.1 },
  { id: 5, name: "Kunal Deshmukh", branch: "IT", semester: 5, cgpa: 7.8 },
  { id: 6, name: "Ananya Reddy", branch: "CSE", semester: 6, cgpa: 8.7 },
  { id: 7, name: "Vikram Patil", branch: "ECE", semester: 7, cgpa: 8.2 },
  { id: 8, name: "Priyanka Nair", branch: "AI", semester: 4, cgpa: 8.8 },
  { id: 9, name: "Harsh Mehta", branch: "Data Science", semester: 5, cgpa: 8.0 },
  { id: 10, name: "Neha Gupta", branch: "CSE", semester: 6, cgpa: 7.9 }
];

// --- STATIC ROUTES ---

// 1. GET /students - Return all students
app.get('/students', (req, res) => {
  res.status(200).json(students);
});

// 2. GET /students/topper - Return student with highest CGPA
app.get('/students/topper', (req, res) => {
  if (students.length === 0) {
    return res.status(404).json({ message: "No students found" });
  }
  const topper = students.reduce((prev, current) => (prev.cgpa > current.cgpa) ? prev : current);
  res.status(200).json(topper);
});

// 3. GET /students/average - Return average CGPA
app.get('/students/average', (req, res) => {
  if (students.length === 0) return res.status(200).json({ averageCGPA: 0 });
  
  const sum = students.reduce((acc, curr) => acc + curr.cgpa, 0);
  const average = sum / students.length;
  res.status(200).json({ averageCGPA: Number(average.toFixed(2)) });
});

// 4. GET /students/count - Return total number of students
app.get('/students/count', (req, res) => {
  res.status(200).json({ totalStudents: students.length });
});

// --- DYNAMIC ROUTES ---

// 5. GET /students/:id - Return student by ID
app.get('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: `Student with ID ${studentId} not found` });
  }
  res.status(200).json(student);
});

// 6. GET /students/branch/:branchName - Return students by branch
app.get('/students/branch/:branchName', (req, res) => {
  const branchName = req.params.branchName.toUpperCase();
  const filteredStudents = students.filter(s => s.branch.toUpperCase() === branchName);

  
  if (filteredStudents.length === 0) {
    return res.status(404).json({ message: `No students found in branch: ${branchName}` });
  }
  res.status(200).json(filteredStudents);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});