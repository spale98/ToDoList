using System;
using System.Collections;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Todo.Api.Data;
using Todo.Api.Models;

namespace Todo.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TodoDbContext dbContext;

        public TasksController(TodoDbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(dbContext.Tasks as IEnumerable);
        }

        [HttpPost]
        public IActionResult Post(Task task) 
        {
            if(!ModelState.IsValid) 
            {
                return BadRequest();
            }

            dbContext.Add(task);
            return dbContext.SaveChanges() > 0 ? StatusCode(200) : StatusCode(500);
        }

        [HttpDelete]
        public IActionResult Delete(Guid id)
        {
            var task = dbContext.Tasks.FirstOrDefault(t => t.Id == id);

            if(task == null)
            {
                return NotFound();
            }

            dbContext.Remove(task);
            return dbContext.SaveChanges() > 0 ? StatusCode(200) : StatusCode(500);
        }
    }
}