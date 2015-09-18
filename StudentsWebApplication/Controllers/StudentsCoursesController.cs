using Newtonsoft.Json;
using StudentsWebApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace StudentsWebApplication.Controllers
{
    public class StudentsCoursesController : ApiController
    {
        StudentsDbEntities dbContext = new StudentsDbEntities();

        public String GetAllStudentsCourses()
        {
            var studentCourses = dbContext.StudentCourses.Select(s => new { s.Id, s.IdCourse, s.IdStudent, s.Course.Title, s.Student.Name });
            return JsonConvert.SerializeObject(studentCourses);
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
