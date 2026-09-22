using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPMS.Common;
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
        private readonly IValidator<UserRoleDto> _validator;

        public SPM_UserRoleController(
            SpmDbContext context,
            IValidator<UserRoleDto> validator)
        {
            _context = context;
            _validator = validator;
        }


        [HttpGet]
        public async Task<IActionResult> GetUserRoles()
        {
            var userRoles = await _context.UserRoles
                .Select(ur => new UserRoleDto
                {
                    RolePermissionID = ur.RolePermissionID,
                    RoleID = ur.RoleID,
                    UserID = ur.UserID
                })
                .AsNoTracking()
                .ToListAsync();

            return Ok(new ApiResponse<List<UserRoleDto>>
            {
                Success = true,
                Message = "User Roles Retrieved Successfully",
                Data = userRoles
            });
        }


        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetUserRole([FromRoute] int id)
        {
            var userRole = await _context.UserRoles
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.RolePermissionID == id);

            if (userRole == null)
            {
                return NotFound(new ApiResponse<object>
                {
                    Success = false,
                    Message = "User Role Not Found",
                    Errors = new List<string>
                    {
                        $"No user role found with Id {id}"
                    }
                });
            }

            var userRoleDto = new UserRoleDto
            {
                RolePermissionID = userRole.RolePermissionID,
                RoleID = userRole.RoleID,
                UserID = userRole.UserID
            };

            return Ok(new ApiResponse<UserRoleDto>
            {
                Success = true,
                Message = "User Role Retrieved Successfully",
                Data = userRoleDto
            });
        }


        [HttpPost]
        public async Task<IActionResult> Create(
            [FromBody] UserRoleDto userRole)
        {
            try
            {
                if (userRole == null)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "User Role Object Not Found",
                        Errors = new List<string>
                        {
                            "Given user role object was not found."
                        }
                    });
                }

                var result = await _validator.ValidateAsync(userRole);

                if (!result.IsValid)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Validation Failed",
                        Data = null,
                        Errors = result.Errors
                            .GroupBy(x => x.PropertyName)
                            .Select(x =>
                                $"{x.Key}: {string.Join(", ", x.Select(e => e.ErrorMessage))}")
                            .ToList()
                    });
                }

                var newUserRole = new SPM_UserRole
                {
                    RoleID = userRole.RoleID,
                    UserID = userRole.UserID
                };

                await _context.UserRoles.AddAsync(newUserRole);
                await _context.SaveChangesAsync();

                userRole.RolePermissionID = newUserRole.RolePermissionID;

                return Ok(new ApiResponse<UserRoleDto>
                {
                    Success = true,
                    Message = "User Role Added Successfully",
                    Data = userRole
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while adding user role",
                    Errors = new List<string>
                    {
                        ex.Message,
                        ex.InnerException?.Message ?? "No Inner Exception"
                    }
                });
            }
        }


        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(
            [FromRoute] int id,
            [FromBody] UserRoleDto userRole)
        {
            try
            {
                if (userRole == null)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "User Role Object Not Found",
                        Errors = new List<string>
                        {
                            "Given user role object was not found."
                        }
                    });
                }

                var result = await _validator.ValidateAsync(userRole);

                if (!result.IsValid)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Validation Failed",
                        Data = null,
                        Errors = result.Errors
                            .GroupBy(x => x.PropertyName)
                            .Select(x =>
                                $"{x.Key}: {string.Join(", ", x.Select(e => e.ErrorMessage))}")
                            .ToList()
                    });
                }

                if (id != userRole.RolePermissionID)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "User Role ID Mismatch",
                        Errors = new List<string>
                        {
                            $"RolePermissionID does not match with Given Id {id}"
                        }
                    });
                }

                var oldUserRole =
                    await _context.UserRoles.FindAsync(id);

                if (oldUserRole == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "User Role Not Found",
                        Errors = new List<string>
                        {
                            $"No user role found with Id {id}"
                        }
                    });
                }

                oldUserRole.RoleID = userRole.RoleID;
                oldUserRole.UserID = userRole.UserID;

                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<UserRoleDto>
                {
                    Success = true,
                    Message = "User Role Updated Successfully",
                    Data = userRole
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while updating user role",
                    Errors = new List<string>
                    {
                        ex.Message,
                        ex.InnerException?.Message ?? "No Inner Exception"
                    }
                });
            }
        }


        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                var userRole =
                    await _context.UserRoles.FindAsync(id);

                if (userRole == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "User Role Not Found",
                        Errors = new List<string>
                        {
                            $"No user role found with Id {id}"
                        }
                    });
                }

                _context.UserRoles.Remove(userRole);

                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message = $"User Role with Id {id} Deleted Successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while deleting user role",
                    Errors = new List<string>
                    {
                        ex.Message
                    }
                });
            }
        }
    }
}