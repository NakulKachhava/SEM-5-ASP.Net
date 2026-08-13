using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPMS.Data;
using SPMS.DTO.UserRole;
using SPMS.Models;

namespace SPMS.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SPM_UserRoleController : ControllerBase
    {
        private readonly SpmDbContext _context;

        public SPM_UserRoleController(SpmDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserRoles()
        {
            var userRoles = await _context.UserRoles.Select(ur => new UserRoleDto
            {
                RolePermissionID = ur.RolePermissionID,
                RoleID = ur.RoleID,
                UserID = ur.UserID,
            }).AsNoTracking().ToListAsync();
            return Ok(userRoles);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserRole(int id)
        {
            var userRole = await _context.UserRoles.FindAsync(id);

            if (userRole == null)
            {
                return NotFound();
            }

            return Ok(userRole);
        }

        [HttpPost]
        public async Task<IActionResult> Create(UserRoleDto userRole)
        {
            var userRoles = new SPM_UserRole
            {
                RolePermissionID = userRole.RolePermissionID,
                RoleID = userRole.RoleID,
                UserID = userRole.UserID,
            };
            await _context.UserRoles.AddAsync(userRoles);
            await _context.SaveChangesAsync();

            return Ok(userRoles);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UserRoleDto userRole)
        {
            if (id != userRole.RolePermissionID)
                return BadRequest("ID Mismatch.");

            var oldUserRole = await _context.UserRoles.FindAsync(id);

            if (oldUserRole == null)
                return NotFound();

            oldUserRole.RoleID = userRole.RoleID;
            oldUserRole.UserID = userRole.UserID;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userRole = await _context.UserRoles.FindAsync(id);

            if (userRole == null)
                return NotFound();

            _context.UserRoles.Remove(userRole);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
