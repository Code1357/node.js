"use strict";

const Course = require("../models/course");
const httpStatus = require("http-status-codes"); // API、JSONレスポンスのstatusに必要

const getCourseParams = body => {
  return {
    title: body.title,
    description: body.description,
    maxStudents: body.maxStudents,
    cost: body.cost
  };
};

module.exports = {
  index: (req, res, next) => {
    Course.find()
      .then(courses => {
        res.locals.courses = courses;
        next();
      })
      .catch(error => {
        console.log(`Error fetching courses: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    /* if (req.query.format === 'json') { // formatクエリパラメータがjsonと等しければ、,JSONでレスポンスする,参考：http://expressjs.com/en/5x/api.html#req.query(クエリパラメータを追加して、HTTPリクエストを判定しいている)
      res.json(res.locals.courses); // http://localhost:3000/courses?format=json でアクセスするとjson形式で表示される
    } else {
      res.render("courses/index"); // それ以外は、EJSでレスポンスする(http://localhost:3000/coursesでアクセスすると表示)
    } */
    res.render('courses/index');
  },
  new: (req, res) => {
    res.render("courses/new");
  },

  create: (req, res, next) => {
    let courseParams = getCourseParams(req.body);
    Course.create(courseParams)
      .then(course => {
        res.locals.redirect = "/courses";
        res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Error saving course: ${error.message}`);
        next(error);
      });
  },

  show: (req, res, next) => {
    let courseId = req.params.id;
    Course.findById(courseId)
      .then(course => {
        res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("courses/show");
  },

  edit: (req, res, next) => {
    let courseId = req.params.id;
    Course.findById(courseId)
      .then(course => {
        res.render("courses/edit", {
          course: course
        });
      })
      .catch(error => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let courseId = req.params.id;
    let courseParams = getCourseParams(req.body);
    Course.findByIdAndUpdate(courseId, {
      $set: courseParams
    })
      .then(course => {
        res.locals.redirect = `/courses/${courseId}`;
        res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Error updating course by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let courseId = req.params.id;
    Course.findByIdAndRemove(courseId)
      .then(() => {
        res.locals.redirect = "/courses";
        next();
      })
      .catch(error => {
        console.log(`Error deleting course by ID: ${error.message}`);
        next();
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

   // 前のミドルウェア(index)からのリクエストを処理してレスポンスを返す
  respondJSON: (req, res) => {
    res.json({ // JSON形式でレスポンスを送信する(参考：http://expressjs.com/en/5x/api.html#res.json)
      status: httpStatus.OK,　// http-status-codesを使用
      data: res.locals
    });
  },
  errorJSON: (error, req, res, next) => {
    let errorObject; // 変数の宣言(下記errorに合わせて変数に入れる内容を区別して表示する)
    if (error) { 
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR, // status500でエラーを返す(Internetサーバーエラー)
        message: error.message
      };
    } else {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Unknown Error."
      };
    }
    res.json(errorObject); // 該当するエラーをJSON形式でレスポンス
  },
};
