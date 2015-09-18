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
    public class StudentsController : ApiController
    {
        StudentsDbEntities dbContext = new StudentsDbEntities();

        public String GetAllStudents()
        {
            var students = dbContext.Students.Select(s => new { s.Id, s.Name, s.Age });
            return JsonConvert.SerializeObject(students);
        }

        public String DeleteStudent(int id)
        {
            int st = dbContext.Students.Where(s => s.Id == id).Delete();
            string result;
            if (st < 0)
                result = "Указанный студент отсутствует в базе данных";
            else
                result = "Студент с идентификатором " + st + " удалён из базы данных";
            return result;
        }

        public String UpdateStudent(int id, string name, Nullable<int> age)
        {
            int st = dbContext.Students.Where(s => s.Id == id).Update(s => new Student { Name = name, Age = age });
            string result;
            if (st < 0)
                result = "Указанный студент отсутствует в базе данных";
            else
                result = "Студент с идентификатором " + st + " изменён";
            return result;
        }

        public IHttpActionResult GetStudent(int id)
        {
            var student = dbContext.Students.Where(s => s.Id == id).Select(s => new { s.Name, s.Age }).FirstOrDefault();
            if (student == null)
            {
                return NotFound();
            }
            return Ok(JsonConvert.SerializeObject(student));
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
