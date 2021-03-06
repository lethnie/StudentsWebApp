﻿using Newtonsoft.Json;
using StudentsWebApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EntityFramework.Extensions;
using System.Data.Entity;

namespace StudentsWebApplication.Controllers
{
    public class StudentsCoursesController : ApiController
    {
        StudentsDbEntities dbContext = new StudentsDbEntities();

        [HttpGet]
        public IHttpActionResult GetAllStudentsCourses()
        {
            return Ok(dbContext.StudentCourses.Select(s => new { s.Id, s.IdCourse, s.IdStudent, s.Course.Title, s.Student.Name }));
        }

        [HttpDelete]
        public IHttpActionResult DeleteStudentCourse(int id)
        {
            int c = dbContext.StudentCourses.Where(s => s.Id == id).Delete();
            if (c == 0)
                return NotFound();
            else
                return Ok();
        }

        [HttpPut]
        public IHttpActionResult UpdateStudentCourse(int id, StudentCourse sc)
        {
            sc.Id = id;

            sc.Student = dbContext.Students.Where(s => s.Id == sc.IdStudent).First();
            sc.Course = dbContext.Courses.Where(s => s.Id == sc.IdCourse).First();

            dbContext.StudentCourses.Attach(sc);
            var entry = dbContext.Entry(sc);
            //entry.Property(s => s.IdCourse).IsModified = true;
            //entry.Property(s => s.IdStudent).IsModified = true;
            entry.State = EntityState.Modified;
            dbContext.SaveChanges();

            return Ok(new { sc.Id, sc.IdCourse, sc.IdStudent, sc.Course.Title, sc.Student.Name });
        }

        [HttpPost]
        public IHttpActionResult AddStudentCourse(StudentCourse sc)
        {
            sc.Student = dbContext.Students.Where(s => s.Id == sc.IdStudent).First();
            sc.Course = dbContext.Courses.Where(s => s.Id == sc.IdCourse).First();
            dbContext.StudentCourses.Add(sc);
            dbContext.SaveChanges();
            return Ok(new { sc.Id, sc.IdCourse, sc.IdStudent, sc.Course.Title, sc.Student.Name });
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                this.dbContext.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
