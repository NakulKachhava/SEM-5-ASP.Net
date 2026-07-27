using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SPMS.Data;
using SPMS.Models;
using System.Data;
using Microsoft.EntityFrameworkCore;

namespace SPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SPM_RoleController : ControllerBase
    {
        private readonly SpmDbContext _context;

        public SPM_RoleController(SpmDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _context.Roles.ToListAsync();
            return Ok(roles);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRole(int id)
        {
            var role = await _context.Roles.FindAsync(id);

            if (role == null)
            {
                return NotFound();
            }

            return Ok(role);
        }

        [HttpPost]
        public async Task<IActionResult> Create(SPM_Role role)
        {
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();

            return Ok(role);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, SPM_Role role)
        {
            if (id != role.RoleID)
                return BadRequest("ID Mismatch.");

            var oldRole = await _context.Roles.FindAsync(id);

            if (oldRole == null)
                return NotFound();

            oldRole.RoleName = role.RoleName;
            oldRole.Description = role.Description;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var role = await _context.Roles.FindAsync(id);

            if (role == null)
                return NotFound();

            _context.Roles.Remove(role);
            await _context.SaveChangesAsync();

            return Ok();
        }
    
    }
}
