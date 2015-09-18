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

        public IHttpActionResult GetAllCourses()
        {
            return Ok(dbContext.Courses.Select(s => new { s.Id, s.Title, s.Lecturer }));
        }

        public IHttpActionResult DeleteCourse(int id)
        {
            int c = dbContext.Courses.Where(s => s.Id == id).Delete();
            if (c == 0)
                return NotFound();
            else
                return Ok();
        }

        public IHttpActionResult UpdateCourse(int id, string title, string lecturer)
        {
            int c = dbContext.Courses.Where(s => s.Id == id).Update(s => new Course { Title = title, Lecturer = lecturer });
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
