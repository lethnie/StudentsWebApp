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

        public String GetAllCourses()
        {
            var courses = dbContext.Courses.Select(s => new { s.Id, s.Title, s.Lecturer });
            return JsonConvert.SerializeObject(courses);
        }

        public String DeleteCourse(int id)
        {
            int st = dbContext.Courses.Where(s => s.Id == id).Delete();
            string result;
            if (st < 0)
                result = "Указанный студент отсутствует в базе данных";
            else
                result = "Студент с идентификатором " + st + " удалён из базы данных";
            return result;
        }

        public String UpdateCourse(int id, string title, string lecturer)
        {
            int c = dbContext.Courses.Where(s => s.Id == id).Update(s => new Course { Title = title, Lecturer = lecturer });
            string result;
            if (c < 0)
                result = "Указанный курс отсутствует в базе данных";
            else
                result = "Курс с идентификатором " + c + " изменён";
            return result;
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
