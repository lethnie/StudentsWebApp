using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using StudentsWebApplication.Models;
using Newtonsoft.Json;

namespace StudentsWebApplication.Controllers
{
    public class CoursesController : ApiController
    {
        StudentsDbEntities dbContext = new StudentsDbEntities();

        public String GetAllCourses()
        {
            var courses = dbContext.Courses.Select(s => new { s.Id, s.Title, s.Lecturer });
            return JsonConvert.SerializeObject(courses);
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
