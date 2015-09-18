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

        public IHttpActionResult GetStudents()
        {
            return Ok(dbContext.Students.Select(s => new { s.Id, s.Name, s.Age }));
        }

        public IHttpActionResult DeleteStudent(int id)
        {
            int st = dbContext.Students.Where(s => s.Id == id).Delete();
            if (st == 0)
                return NotFound();
            else
                return Ok();
        }

        public IHttpActionResult UpdateStudent(int id, string name, Nullable<int> age)
        {
            int st = dbContext.Students.Where(s => s.Id == id).Update(s => new Student { Name = name, Age = age });
            if (st == 0)
                return NotFound();
            else
                return Ok();
        }

        public IHttpActionResult GetStudent(int id)
        {
            var student = dbContext.Students.Where(s => s.Id == id).Select(s => new { s.Name, s.Age }).FirstOrDefault();
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
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
