using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using StudentsWebApplication.Models;
using Newtonsoft.Json;
using EntityFramework.Extensions;

namespace StudentsWebApplication.Controllers
{
    public class CoursesController : ApiController
    {
        StudentsDbEntities dbContext = new StudentsDbEntities();

        [HttpGet]
        public IHttpActionResult GetAllCourses()
        {
            return Ok(dbContext.Courses.Select(s => new { s.Id, s.Title, s.Lecturer }));
        }

        [HttpDelete]
        public IHttpActionResult DeleteCourse(int id)
        {
            int c = dbContext.Courses.Where(s => s.Id == id).Delete();
            if (c == 0)
                return NotFound();
            else
                return Ok();
        }

        [HttpPut]
        public IHttpActionResult UpdateCourse(int id, Course course)
        {
            course.Id = id;

            dbContext.Courses.Attach(course);
            var entry = dbContext.Entry(course);
            entry.Property(s => s.Title).IsModified = true;
            entry.Property(s => s.Lecturer).IsModified = true;
            dbContext.SaveChanges();

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
