const Student = require('../models/studentModel');
const { sendEmail } = require('../utils/index');
const CustomError = require('../utils/CustomError');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const { examResultEmailTemplate } = require('../utils/index');
const { multiUpload, singleUpload } = require('../middlewares/uploadFile');
const fs = require('fs');

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
  const { year, semester, major } = req.body;
  // const students = await Student.find({ year, semester, major });
  const students = [
    {
      email: 'chanminkhant@ucspyay.edu.mm',
      rollNo: '002200',
      section: 'A',
      year: 'First',
      semester: 'First',
      major: 'CST',
    },
    {
      email: 'nyeinchanaung@ucspyay.edu.mm',
      rollNo: '002201',
      section: 'A',
      year: 'First',
      semester: 'First',
      major: 'CST',
    },
  ];
  const missingFiles = [];
  students.forEach(async (student) => {
    const filePath = `./upload/results/allFiles/ucspyay/${student.rollNo}.jpg`;

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        missingFiles.push(student.rollNo);
      }
      console.log('file exist');
    });
  });

  console.log('Roll numbers of students with missing files:', missingFiles);
  if (missingFiles.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Some students are missing files for ${year} year ${semester} semester`,
      missingRollNumbers: missingFiles,
    });
  }
  //sent mail with attach file to student
  students.forEach(async (student) => {
    const filePath = `./upload/file/${student.rollNo}.txt`;
    const options = {
      email: student.studentEmail,
      subject: 'Exam result',
      message: examResultEmailTemplate(student),
      attachments: [
        {
          filename: `${student.rollNo}.txt`,
          path: filePath,
        },
      ],
    };

    await sendEmail(options);
  });
  res.status(200).json({
    success: true,
    message: `Email sent to students successfully for ${year} year ${semester} semester`,
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
