using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPMS.Common;
using SPMS.Data;
using SPMS.DTO.UserType;
using SPMS.Models;

namespace SPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SPM_UserTypeController : ControllerBase
    {
        private readonly SpmDbContext _context;
        private readonly IValidator<UserTypeDto> _validator;

        public SPM_UserTypeController(
            SpmDbContext context,
            IValidator<UserTypeDto> validator)
        {
            _context = context;
            _validator = validator;
        }


        [HttpGet]
        public async Task<IActionResult> GetUserTypes()
        {
            var userTypes = await _context.UserTypes
                .Select(ut => new UserTypeDto
                {
                    UserTypeID = ut.UserTypeID,
                    UserTypeName = ut.UserTypeName,
                    Description = ut.Description
                })
                .AsNoTracking()
                .ToListAsync();

            return Ok(new ApiResponse<List<UserTypeDto>>
            {
                Success = true,
                Message = "User Types Retrieved Successfully",
                Data = userTypes
            });
        }


        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetUserType([FromRoute] int id)
        {
            var userType = await _context.UserTypes
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.UserTypeID == id);

            if (userType == null)
            {
                return NotFound(new ApiResponse<object>
                {
                    Success = false,
                    Message = "User Type Not Found",
                    Errors = new List<string>
                    {
                        $"No user type found with Id {id}"
                    }
                });
            }

            var userTypeDto = new UserTypeDto
            {
                UserTypeID = userType.UserTypeID,
                UserTypeName = userType.UserTypeName,
                Description = userType.Description
            };

            return Ok(new ApiResponse<UserTypeDto>
            {
                Success = true,
                Message = "User Type Retrieved Successfully",
                Data = userTypeDto
            });
        }


        [HttpPost]
        public async Task<IActionResult> Create(
            [FromBody] UserTypeDto userType)
        {
            try
            {
                if (userType == null)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "User Type Object Not Found",
                        Errors = new List<string>
                        {
                            "Given user type object was not found."
                        }
                    });
                }

                var result = await _validator.ValidateAsync(userType);

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

                var newUserType = new SPM_UserType
                {
                    UserTypeName = userType.UserTypeName,
                    Description = userType.Description
                };

                await _context.UserTypes.AddAsync(newUserType);
                await _context.SaveChangesAsync();

                userType.UserTypeID = newUserType.UserTypeID;

                return Ok(new ApiResponse<UserTypeDto>
                {
                    Success = true,
                    Message = "User Type Added Successfully",
                    Data = userType
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while adding user type",
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
            [FromBody] UserTypeDto userType)
        {
            try
            {
                if (userType == null)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "User Type Object Not Found",
                        Errors = new List<string>
                        {
                            "Given user type object was not found."
                        }
                    });
                }

                var result = await _validator.ValidateAsync(userType);

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

                if (id != userType.UserTypeID)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "User Type ID Mismatch",
                        Errors = new List<string>
                        {
                            $"UserTypeID does not match with Given Id {id}"
                        }
                    });
                }

                var oldUserType =
                    await _context.UserTypes.FindAsync(id);

                if (oldUserType == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "User Type Not Found",
                        Errors = new List<string>
                        {
                            $"No user type found with Id {id}"
                        }
                    });
                }

                oldUserType.UserTypeName = userType.UserTypeName;
                oldUserType.Description = userType.Description;

                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<UserTypeDto>
                {
                    Success = true,
                    Message = "User Type Updated Successfully",
                    Data = userType
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while updating user type",
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
                var userType =
                    await _context.UserTypes.FindAsync(id);

                if (userType == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "User Type Not Found",
                        Errors = new List<string>
                        {
                            $"No user type found with Id {id}"
                        }
                    });
                }

                _context.UserTypes.Remove(userType);

                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message = $"User Type with Id {id} Deleted Successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while deleting user type",
                    Errors = new List<string>
                    {
                        ex.Message
                    }
                });
            }
        }
    }
}