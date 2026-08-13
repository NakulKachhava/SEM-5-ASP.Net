using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPMS.Common;
using SPMS.Data;
using SPMS.DTO.Role;
using SPMS.Models;
using System.Data;

namespace SPMS.Controllers
{
    [Route("api/[controller]/[action]")]
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
            var roles = await _context.Roles.Select(x=> new RoleDto() {
                RoleID = x.RoleID,
                RoleName = x.RoleName,
                Description = x.Description,
            }).AsNoTracking().ToListAsync();
            return Ok(new ApiResponse<List<RoleDto>>
            {
                Success = true,
                Message = "Roles Retrieved Successfully",
                Data = roles,
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRole(int id)
        {
            var role = await _context.Roles.FindAsync(id);

            if (role == null)
            {
                return NotFound(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Role Not Found",
                    Errors = new List<string> { $"No role found with Id {id}" }
                });
            }

            var newRole = new RoleDto
            {
                RoleID = role.RoleID,
                RoleName = role.RoleName,
                Description = role.Description,
            };

            return Ok(new ApiResponse<RoleDto>
            {
                Success = true,
                Message = "Role Retrieved Successfully",
                Data = newRole,
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(RoleDto role)
        {
            try
            {
                if (role == null)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Role Object Not Found",
                        Errors = new List<string> { $"Given role object was not found." }
                    });
                }

                var roles = new SPM_Role()
                {
                    RoleID = role.RoleID,
                    RoleName = role.RoleName,
                    Description = role.Description
                };

                await _context.Roles.AddAsync(roles);
                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<RoleDto>
                {
                    Success = true,
                    Message = "Role Added Successfully",
                    Data = role,
                });
            }
            catch (Exception ex) 
            {
                return BadRequest(new ApiResponse<Object>
                {
                    Success = false,
                    Message = "Error occurred while adding role",
                    Errors = new List<string>
                    {
                        ex.Message,
                        ex.InnerException?.Message ?? "No Inner Exception"
                    }
                });
            }
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, RoleDto role)
        {
            try
            {
                if (id != role.RoleID)
                    return BadRequest(new ApiResponse<Object>
                    {
                        Success = false,
                        Message = "Role ID Mismatch",
                        Errors = new List<string> { $"RoleID does not match with Given Id {id}" }
                    });

                var oldRole = await _context.Roles.FindAsync(id);

                if (oldRole == null)
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Role Not Found",
                        Errors = new List<string> { $"No role found with Id {id}" }
                    });

                oldRole.RoleName = role.RoleName;
                oldRole.Description = role.Description;
                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<RoleDto>
                {
                    Success = true,
                    Message = "Role Updated Successfully",
                    Data = role
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<Object>
                {
                    Success = false,
                    Message = "Error occurred while updating role",
                    Errors = new List<string>
                    {
                        ex.Message,
                        ex.InnerException?.Message ?? "No Inner Exception"
                    }
                });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var role = await _context.Roles.FindAsync(id);

                if (role == null)
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Role Not Found",
                        Errors = new List<string> { $"No role found with Id {id}" }
                    });

                _context.Roles.Remove(role);
                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message = $"Role with Id {id} Deleted Successfully",
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while deleting role",
                    Errors = new List<string> { ex.Message }
                });
            }
        }
    }
}
