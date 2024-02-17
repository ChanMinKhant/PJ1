const Student = require('../models/studentModel');
const { sendEmail } = require('../utils/index');
const CustomError = require('../utils/CustomError');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const { examResultEmailTemplate } = require('../utils/index');
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

exports.sendStudentEmail = asyncErrorHandler(async (req, res, next) => {
  const { year, semester, major } = req.body;
  const students = await Student.find({ year, semester, major });
  const missingFiles = [];
  if (!req.user.isAdmin) {
    return next(
      new CustomError('You are not authorized to access this route', 401)
    );
  }
  students.forEach(async (student) => {
    const filePath = `./upload/file/${student.rollNo}.txt`;

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        missingFiles.push(student.rollNo);
      }
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
    const message = `Dear ${student.studentName},\n\nPlease find the attached file for your ${student.year} ${student.semester} ${student.major} semester.\n\nBest Regards,\nAdmin`;
    const options = {
      email: student.studentEmail,
      subject: 'Semester File',
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

exports.uploadFile = asyncErrorHandler(async (req, res, next) => {
  multiUpload('results', 'ucspyay', true)(req, res, async (err) => {
    if (err) {
      return next(err);
    }
  });
  res.status(200).json({
    success: true,
    message: 'File uploaded successfully',
  });
});
