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
    public class StudentsController : ApiController
    {
        StudentsDbEntities dbContext = new StudentsDbEntities();

        public String GetAllStudents()
        {
            var students = dbContext.Students.Select(s => new { s.Name, s.Age });
            return JsonConvert.SerializeObject(students);
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
