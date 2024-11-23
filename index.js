const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const server = express();

server.use(bodyParser.json());

// Establish the database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password@123',
  database: 'school',
});

db.connect(function (error) {
  if (error) {
    console.log('Error Connecting to DB:', error.message);
  } else {
    console.log('Successfully Connected to DB');
  }
});

// Establish the port
server.listen(8085, function check(error) {
  if (error) {
    console.log('Error starting server!');
  } else {
    console.log('Server started on port 8085!');
  }
});

//
// STUDENTS CRUD
//
// Create a Student
server.post('/api/student/add', (req, res) => {
    const { first_name, last_name, date_of_birth, gender, grade_level, address, contact_number, email, enrollment_date } = req.body;
    const sql = 'INSERT INTO Students SET ?';
    const details = { first_name, last_name, date_of_birth, gender, grade_level, address, contact_number, email, enrollment_date };
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: 'Student creation failed' });
      } else {
        res.send({ status: true, message: 'Student created successfully' });
      }
    });
  });
  
// View All Students
server.get('/api/students', (req, res) => {
  const sql = 'SELECT * FROM Students';
  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: 'Error retrieving students' });
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// View a Specific Student
server.get('/api/student/:id', (req, res) => {
  const sql = 'SELECT * FROM Students WHERE student_id = ?';
  db.query(sql, [req.params.id], (error, result) => {
    if (error) {
      res.send({ status: false, message: 'Error retrieving student' });
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Update a Student
server.put('/api/student/update/:id', (req, res) => {
  const { first_name, last_name, date_of_birth, gender, grade_level, address, contact_number, email, enrollment_date } = req.body;
  const sql = `
    UPDATE Students 
    SET first_name = ?, last_name = ?, date_of_birth = ?, gender = ?, grade_level = ?, address = ?, contact_number = ?, email = ?, enrollment_date = ?
    WHERE student_id = ?`;
  db.query(sql, [first_name, last_name, date_of_birth, gender, grade_level, address, contact_number, email, enrollment_date, req.params.id], (error) => {
    if (error) {
      res.send({ status: false, message: 'Student update failed' });
    } else {
      res.send({ status: true, message: 'Student updated successfully' });
    }
  });
});

// Delete a Student
server.delete('/api/student/delete/:id', (req, res) => {
  const sql = 'DELETE FROM Students WHERE student_id = ?';
  db.query(sql, [req.params.id], (error) => {
    if (error) {
      res.send({ status: false, message: 'Student deletion failed' });
    } else {
      res.send({ status: true, message: 'Student deleted successfully' });
    }
  });
});

//
// TEACHERS CRUD
//

// Create a Teacher
server.post('/api/teacher/add', (req, res) => {
  const { first_name, last_name, date_of_birth, gender, specialization, address, contact_number, email, hire_date } = req.body;
  const sql = 'INSERT INTO Teachers SET ?';
  const details = { first_name, last_name, date_of_birth, gender, specialization, address, contact_number, email, hire_date };
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: 'Teacher creation failed' });
    } else {
      res.send({ status: true, message: 'Teacher created successfully' });
    }
  });
});

// View All Teachers
server.get('/api/teachers', (req, res) => {
  const sql = 'SELECT * FROM Teachers';
  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: 'Error retrieving teachers' });
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// View a Specific Teacher
server.get('/api/teacher/:id', (req, res) => {
  const sql = 'SELECT * FROM Teachers WHERE teacher_id = ?';
  db.query(sql, [req.params.id], (error, result) => {
    if (error) {
      res.send({ status: false, message: 'Error retrieving teacher' });
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Update a Teacher
server.put('/api/teacher/update/:id', (req, res) => {
  const { first_name, last_name, date_of_birth, gender, specialization, address, contact_number, email, hire_date } = req.body;
  const sql = `
    UPDATE Teachers 
    SET first_name = ?, last_name = ?, date_of_birth = ?, gender = ?, specialization = ?, address = ?, contact_number = ?, email = ?, hire_date = ?
    WHERE teacher_id = ?`;
  db.query(sql, [first_name, last_name, date_of_birth, gender, specialization, address, contact_number, email, hire_date, req.params.id], (error) => {
    if (error) {
      res.send({ status: false, message: 'Teacher update failed' });
    } else {
      res.send({ status: true, message: 'Teacher updated successfully' });
    }
  });
});

// Delete a Teacher
server.delete('/api/teacher/delete/:id', (req, res) => {
  const sql = 'DELETE FROM Teachers WHERE teacher_id = ?';
  db.query(sql, [req.params.id], (error) => {
    if (error) {
      res.send({ status: false, message: 'Teacher deletion failed' });
    } else {
      res.send({ status: true, message: 'Teacher deleted successfully' });
    }
  });
});

//
// COURSES CRUD
//

// Create a Course
server.post('/api/course/add', (req, res) => {
  const { course_name, description, grade_level, teacher_id } = req.body;
  const sql = 'INSERT INTO Courses SET ?';
  const details = { course_name, description, grade_level, teacher_id };
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: 'Course creation failed' });
    } else {
      res.send({ status: true, message: 'Course created successfully' });
    }
  });
});

// View All Courses
server.get('/api/courses', (req, res) => {
  const sql = 'SELECT * FROM Courses';
  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: 'Error retrieving courses' });
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// View a Specific Course
server.get('/api/course/:id', (req, res) => {
  const sql = 'SELECT * FROM Courses WHERE course_id = ?';
  db.query(sql, [req.params.id], (error, result) => {
    if (error) {
      res.send({ status: false, message: 'Error retrieving course' });
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Update a Course
server.put('/api/course/update/:id', (req, res) => {
  const { course_name, description, grade_level, teacher_id } = req.body;
  const sql = `
    UPDATE Courses 
    SET course_name = ?, description = ?, grade_level = ?, teacher_id = ?
    WHERE course_id = ?`;
  db.query(sql, [course_name, description, grade_level, teacher_id, req.params.id], (error) => {
    if (error) {
      res.send({ status: false, message: 'Course update failed' });
    } else {
      res.send({ status: true, message: 'Course updated successfully' });
    }
  });
});

// Delete a Course
server.delete('/api/course/delete/:id', (req, res) => {
  const sql = 'DELETE FROM Courses WHERE course_id = ?';
  db.query(sql, [req.params.id], (error) => {
    if (error) {
      res.send({ status: false, message: 'Course deletion failed' });
    } else {
      res.send({ status: true, message: 'Course deleted successfully' });
    }
  });
});
//
//Classroom CRUD
//
// Create a Classroom
server.post('/api/classroom/add', (req, res) => {
    const { name, capacity, grade_level } = req.body;
    const sql = 'INSERT INTO Classrooms SET ?';
    const details = { name, capacity, grade_level };
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: 'Classroom creation failed' });
      } else {
        res.send({ status: true, message: 'Classroom created successfully' });
      }
    });
  });
  
  // View All Classrooms
  server.get('/api/classrooms', (req, res) => {
    const sql = 'SELECT * FROM Classrooms';
    db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: 'Error retrieving classrooms' });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
  
  // View a Specific Classroom
  server.get('/api/classroom/:id', (req, res) => {
    const sql = 'SELECT * FROM Classrooms WHERE classroom_id = ?';
    db.query(sql, [req.params.id], (error, result) => {
      if (error) {
        res.send({ status: false, message: 'Error retrieving classroom' });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
  
  // Update a Classroom
  server.put('/api/classroom/update/:id', (req, res) => {
    const { name, capacity, grade_level } = req.body;
    const sql = 'UPDATE Classrooms SET name = ?, capacity = ?, grade_level = ? WHERE classroom_id = ?';
    db.query(sql, [name, capacity, grade_level, req.params.id], (error) => {
      if (error) {
        res.send({ status: false, message: 'Classroom update failed' });
      } else {
        res.send({ status: true, message: 'Classroom updated successfully' });
      }
    });
  });
  
  // Delete a Classroom
  server.delete('/api/classroom/delete/:id', (req, res) => {
    const sql = 'DELETE FROM Classrooms WHERE classroom_id = ?';
    db.query(sql, [req.params.id], (error) => {
      if (error) {
        res.send({ status: false, message: 'Classroom deletion failed' });
      } else {
        res.send({ status: true, message: 'Classroom deleted successfully' });
      }
    });
  });
  

//
//Enrollment CRUD
//
// Create an Enrollment
server.post('/api/enrollment/add', (req, res) => {
    const { student_id, classroom_id, enrollment_date } = req.body;
    const sql = 'INSERT INTO Enrollments SET ?';
    const details = { student_id, classroom_id, enrollment_date };
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: 'Enrollment creation failed' });
      } else {
        res.send({ status: true, message: 'Enrollment created successfully' });
      }
    });
  });
  
  // View All Enrollments
  server.get('/api/enrollments', (req, res) => {
    const sql = 'SELECT * FROM Enrollments';
    db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: 'Error retrieving enrollments' });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
  
  // Delete an Enrollment
  server.delete('/api/enrollment/delete/:id', (req, res) => {
    const sql = 'DELETE FROM Enrollments WHERE enrollment_id = ?';
    db.query(sql, [req.params.id], (error) => {
      if (error) {
        res.send({ status: false, message: 'Enrollment deletion failed' });
      } else {
        res.send({ status: true, message: 'Enrollment deleted successfully' });
      }
    });
  });
  
  //
  //Attendance CRUD
  //
// Mark Attendance
server.post('/api/attendance/add', (req, res) => {
    const { student_id, date, status } = req.body;
    const sql = 'INSERT INTO Attendance SET ?';
    const details = { student_id, date, status };
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: 'Attendance marking failed' });
      } else {
        res.send({ status: true, message: 'Attendance marked successfully' });
      }
    });
  });
  
  // View Attendance Records
  server.get('/api/attendance', (req, res) => {
    const sql = 'SELECT * FROM Attendance';
    db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: 'Error retrieving attendance records' });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });

  //
  //Exams CRUD
  //
// Add an Exam
server.post('/api/exam/add', (req, res) => {
    const { name, date, subject_id } = req.body;
    const sql = 'INSERT INTO Exams SET ?';
    const details = { name, date, subject_id };
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: 'Exam creation failed' });
      } else {
        res.send({ status: true, message: 'Exam created successfully' });
      }
    });
  });
  
  // View All Exams
  server.get('/api/exams', (req, res) => {
    const sql = 'SELECT * FROM Exams';
    db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: 'Error retrieving exams' });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });

  //
  //Exam Results CRUD
  //
// Add Exam Result
server.post('/api/result/add', (req, res) => {
    const { student_id, exam_id, score } = req.body;
    const sql = 'INSERT INTO ExamResults SET ?';
    const details = { student_id, exam_id, score };
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: 'Exam result addition failed' });
      } else {
        res.send({ status: true, message: 'Exam result added successfully' });
      }
    });
  });
  
  // View Exam Results
  server.get('/api/results', (req, res) => {
    const sql = 'SELECT * FROM ExamResults';
    db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: 'Error retrieving exam results' });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });

  //
  //Subjects CRUD
  //
// Add a Subject
server.post('/api/subject/add', (req, res) => {
    const { name, description } = req.body;
    const sql = 'INSERT INTO Subjects SET ?';
    const details = { name, description };
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: 'Subject creation failed' });
      } else {
        res.send({ status: true, message: 'Subject created successfully' });
      }
    });
  });
  
  // View All Subjects
  server.get('/api/subjects', (req, res) => {
    const sql = 'SELECT * FROM Subjects';
    db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: 'Error retrieving subjects' });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });

  //
  //Staff CRUD
  //
// Add Staff
server.post('/api/staff/add', (req, res) => {
    const { first_name, last_name, position, hire_date } = req.body;
    const sql = 'INSERT INTO Staff SET ?';
    const details = { first_name, last_name, position, hire_date };
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: 'Staff creation failed' });
      } else {
        res.send({ status: true, message: 'Staff created successfully' });
      }
    });
  });
  
  // View All Staff
  server.get('/api/staff', (req, res) => {
    const sql = 'SELECT * FROM Staff';
    db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: 'Error retrieving staff' });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });

  //
  //Fee Payments CRUD
  //
// Add Fee Payment
server.post('/api/fee/add', (req, res) => {
    const { student_id, amount, payment_date, payment_method } = req.body;
    const sql = 'INSERT INTO FeePayments SET ?';
    const details = { student_id, amount, payment_date, payment_method };
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: 'Fee payment failed' });
      } else {
        res.send({ status: true, message: 'Fee payment recorded successfully' });
      }
    });
  });
  
  // View All Fee Payments
  server.get('/api/fees', (req, res) => {
    const sql = 'SELECT * FROM FeePayments';
    db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: 'Error retrieving fee payments' });
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
  


