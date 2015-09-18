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

        public String GetAllStudentsCourses()
        {
            var studentCourses = dbContext.StudentCourses.Select(s => new { s.Id, s.IdCourse, s.IdStudent, s.Course.Title, s.Student.Name });
            return JsonConvert.SerializeObject(studentCourses);
        }

        public String DeleteStudentCourse(int id)
        {
            int st = dbContext.StudentCourses.Where(s => s.Id == id).Delete();
            string result;
            if (st < 0)
                result = "Указанный студент отсутствует в базе данных";
            else
                result = "Студент с идентификатором " + st + " удалён из базы данных";
            return result;
        }

        public String UpdateStudentCourse(int id, int courseId, int studId)
        {
            int c = dbContext.StudentCourses.Where(s => s.Id == id).Update(s => new StudentCourse { IdCourse = courseId, IdStudent = studId });
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
