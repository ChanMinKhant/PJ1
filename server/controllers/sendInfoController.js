const Student = require('../models/studentModel');
const { sendEmail } = require('../utils/index');
const CustomError = require('../utils/CustomError');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const { examResultEmailTemplate } = require('../utils/index');
const { multiUpload, singleUpload } = require('../middlewares/uploadFile');
const path = require('path');
const fs = require('fs').promises;
const stuData = require('../config/studentsDb.json');

exports.createStudent = asyncErrorHandler(async (req, res, next) => {
  const { studentName, studentEmail, rollNo, section, year, major } = req.body;
  const student = await Student.create({
    studentName,
    studentEmail,
    rollNo,
    section,
    year,
    major,
  });

  if (!student) {
    const err = new CustomError('Student data not saved', 500);
    return next(err);
  }

  const message = `Student data saved successfully`;
  res.status(201).json({
    success: true,
    message,
  });
});

exports.sendExamResult = asyncErrorHandler(async (req, res, next) => {
  const { year, semester, major, section } = req.body;
  const query = {};
  if (year) {
    query.year = year;
  }
  if (semester) {
    query.semester = semester;
  }
  if (major) {
    query.major = major;
  }
  if (section) {
    query.section = section;
  }
  console.log(query);
  // console.log(stuData);
  // const students = stuData.filter((student) => {
  //   if (year) {
  //     return student.year === year;
  //   }
  //   if (semester) {
  //     return student.semester === semester;
  //   }
  //   if (major) {
  //     return student.major === major;
  //   }
  //   if (section) {
  //     return student.section === section;
  //   }
  // });
  const students = await Student.find(query);
  console.log(students);
  const missingFiles = [];
  for (const student of students) {
    const filePath = path.join(
      __dirname,
      `../uploads/results/allFiles/ucspyay/${student.rollNo}.jpg`
    );

    try {
      await fs.access(filePath, fs.constants.F_OK);
      console.log('File exists');
    } catch (error) {
      console.error('File does not exist');
      missingFiles.push(student.rollNo);
    }
  }

  if (missingFiles.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Some students are missing files for ${year} year ${semester} semester`,
      missingRollNumbers: missingFiles,
    });
  }

  //sent mail with attach file to student
  students.forEach(async (student) => {
    const filePath = `./uploads/results/allFiles/ucspyay/${student.rollNo}.jpg`;
    const options = {
      email: student.studentEmail || 'nyeinchanaung@gmail.com',
      subject: 'Exam result',
      message: examResultEmailTemplate(student),

      attachments: [
        {
          filename: `${student.rollNo}.jpg`,
          path: filePath,
        },
      ],
    };
    try {
      await sendEmail(options);
    } catch (error) {
      console.log(error);
    }
  });
  res.status(200).json({
    success: true,
    message: `Email sent to students successfully for ${year} year ${semester} semester`,
  });
});

exports.sendExamResult1 = asyncErrorHandler(async (req, res, next) => {
  const { year, semester, major } = req.body;
  const query = {};
  if (year) query.year = year;
  if (semester) query.semester = semester;
  if (major) query.major = major;
  const students = await Student.find({
    studentEmail: 'student0022201@ucspyay.edu.mm',
  });
  if (students.length == 0) {
    return next(new CustomError('No student found', 404));
  }
  console.log(students);
  students.forEach((student) => {
    console.log(student.studentEmail);
  });
});

// 002283.jpg
exports.uploadFile = asyncErrorHandler(async (req, res, next) => {
  multiUpload('results', 'ucspyay', true)(req, res, async (err) => {
    if (err) {
      return next(err);
    }
  });
  console.log(req.files);
  res.status(200).json({
    success: true,
    message: 'File uploaded successfully',
  });
});

exports.sendInfomation = asyncErrorHandler(async (req, res, next) => {
  const { year, semester, major, section, message, subject } = req.body;
  let query = {};
  if (year) {
    query.year = year;
  }
  if (semester) {
    query.semester = semester;
  }
  if (major) {
    query.major = major;
  }
  if (section) {
    query.section = section;
  }
  const students = await Student.find(query);
  //sent meaasges to students
  students.forEach(async (student) => {
    const options = {
      email: student.studentEmail,
      subject: subject,
      message,
    };

    await sendEmail(options);
  });
});

exports.getStudents = asyncErrorHandler(async (req, res, next) => {
  const { year, semester, major, section } = req.body;
  let query = {};
  if (year) {
    query.year = year;
  }
  if (semester) {
    query.semester = semester;
  }
  if (major) {
    query.major = major;
  }
  if (section) {
    query.section = section;
  }
  const students = await Student.find(query);
  res.status(200).json({
    success: true,
    data: students,
  });
});

exports.deleteStudent = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const student = await Student.findByIdAndDelete(id);
  if (!student) {
    return next(new CustomError('Student not found', 404));
  }
  res.status(200).json({
    success: true,
    message: 'Student deleted successfully',
  });
});

exports.updateStudent = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { studentName, studentEmail, rollNo, section, year, major } = req.body;
  const studentToUpdate = {};
  if (studentName) {
    studentToUpdate.studentName = studentName;
  }
  if (studentEmail) {
    studentToUpdate.studentEmail = studentEmail;
  }
  if (rollNo) {
    studentToUpdate.rollNo = rollNo;
  }
  if (section) {
    studentToUpdate.section = section;
  }
  if (year) {
    studentToUpdate.year = year;
  }
  if (major) {
    studentToUpdate.major = major;
  }

  const student = await Student.findByIdAndUpdate(id, studentToUpdate);
  if (!student) {
    return next(new CustomError('Student not found', 404));
  }
  res.status(200).json({
    success: true,
    message: 'Student updated successfully',
  });
});
