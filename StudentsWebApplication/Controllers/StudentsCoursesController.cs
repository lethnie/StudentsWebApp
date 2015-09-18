using Newtonsoft.Json;
using StudentsWebApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EntityFramework.Extensions;

namespace StudentsWebApplication.Controllers
{
    public class StudentsCoursesController : ApiController
    {
        StudentsDbEntities dbContext = new StudentsDbEntities();

        public IHttpActionResult GetAllStudentsCourses()
        {
            return Ok(dbContext.StudentCourses.Select(s => new { s.Id, s.IdCourse, s.IdStudent, s.Course.Title, s.Student.Name }));
        }

        public IHttpActionResult DeleteStudentCourse(int id)
        {
            int c = dbContext.StudentCourses.Where(s => s.Id == id).Delete();
            if (c == 0)
                return NotFound();
            else
                return Ok();
        }

        public IHttpActionResult UpdateStudentCourse(int id, int courseId, int studId)
        {
            int c = dbContext.StudentCourses.Where(s => s.Id == id).Update(s => new StudentCourse { IdCourse = courseId, IdStudent = studId });
            if (c == 0)
                return NotFound();
            else
                return Ok();
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
