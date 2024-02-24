const Student = require('../models/studentModel');
const { sendEmail } = require('../utils/index');
const CustomError = require('../utils/CustomError');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const { examResultEmailTemplate } = require('../utils/index');
const { multiUpload, singleUpload } = require('../middlewares/uploadFile');
const path = require('path');
const fs = require('fs').promises;

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
  console.log(year);
  // const students = await Student.find({ year, semester, major });
  const students = [
    {
      email: 'sayagyi226@gmail.com',
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
  await Promise.all(
    students.map(async (student) => {
      const filePath = path.join(
        __dirname,
        `../uploads/results/allFiles/ucspyay/${student.rollNo}.jpg`,
      );

      try {
        await fs.access(filePath, fs.constants.F_OK);
        console.log('File exists');
      } catch (error) {
        console.error('File does not exist');
        missingFiles.push(student.rollNo);
      }
    }),
  );

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
      email: student.email,
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

// 002283.jpg
exports.uploadFile = asyncErrorHandler(async (req, res, next) => {
  multiUpload('results', 'ucspyay', true)(req, res, async (err) => {
    if (err) {
      return next(err);
    }
  });
  if (req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded',
    });
  }
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
