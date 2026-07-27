using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPMS.Data;
using SPMS.Models;

namespace SPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SPM_UserTypeController : ControllerBase
    {
        private readonly SpmDbContext _context;

        public SPM_UserTypeController(SpmDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserTypes()
        {
            var userTypes = await _context.UserTypes.ToListAsync();
            return Ok(userTypes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserType(int id)
        {
            var userType = await _context.UserTypes.FindAsync(id);

            if (userType == null)
            {
                return NotFound();
            }

            return Ok(userType);
        }

        [HttpPost]
        public async Task<IActionResult> Create(SPM_UserType userType)
        {
            _context.UserTypes.Add(userType);
            await _context.SaveChangesAsync();

            return Ok(userType);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, SPM_UserType userType)
        {
            if (id != userType.UserTypeID)
                return BadRequest("ID Mismatch.");

            var oldUserType = await _context.UserTypes.FindAsync(id);

            if (oldUserType == null)
                return NotFound();

            oldUserType.UserTypeName = userType.UserTypeName;
            oldUserType.Description = userType.Description;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userType = await _context.UserTypes.FindAsync(id);

            if (userType == null)
                return NotFound();

            _context.UserTypes.Remove(userType);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
