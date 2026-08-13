using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPMS.Common;
using SPMS.Data;
using SPMS.DTO.Role;
using SPMS.DTO.User;
using SPMS.Models;
using System.Data;

namespace SPMS.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SPM_UserController : ControllerBase
    {
        private readonly SpmDbContext _context;

        public SPM_UserController(SpmDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.Include(u => u.UserType).Select(u => new UserDto
            {
                UserID = u.UserID,
                UserTypeID = u.UserTypeID,
                UserTypeName = u.UserType != null ? u.UserType.UserTypeName : "No Department",
                FullName = u.FullName,
                UserCode = u.UserCode,
                Email = u.Email,
                Password = u.Password,
                MobileNumber = u.MobileNumber,
                ProfilePicturePath = u.ProfilePicturePath,
                IsActive = u.IsActive,
                IsDeleted = u.IsDeleted,
            }).AsNoTracking().ToListAsync();
            return Ok(new ApiResponse<List<UserDto>>
            {
                Success = true,
                Message = "Users Retrieved Successfully",
                Data = users,
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound(new ApiResponse<object>
                {
                    Success = false,
                    Message = "User Not Found",
                    Errors = new List<string> { $"No User found with Id {id}" }
                });
            }

            var newUser = new UserDto
            {
                UserID = user.UserID,
                UserTypeID = user.UserTypeID,
                FullName = user.FullName,
                UserCode = user.UserCode,
                Email = user.Email,
                Password = user.Password,
                MobileNumber = user.MobileNumber,
                ProfilePicturePath = user.ProfilePicturePath,
                IsActive = user.IsActive,
                IsDeleted = user.IsDeleted,
            };

            return Ok(new ApiResponse<UserDto>
            {
                Success = true,
                Message = "User Retrieved Successfully",
                Data = newUser,
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(UserDto user)
        {
            try
            {
                if (user == null)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "User Object Not Found",
                        Errors = new List<string> { $"Given user object was not found." }
                    });
                }

                var users = new SPM_User
                {
                    UserID = user.UserID,
                    UserTypeID = user.UserTypeID,
                    FullName = user.FullName,
                    UserCode = user.UserCode,
                    Email = user.Email,
                    Password = user.Password,
                    MobileNumber = user.MobileNumber,
                    ProfilePicturePath = user.ProfilePicturePath,
                    IsActive = user.IsActive,
                    IsDeleted = user.IsDeleted,

                };
                await _context.Users.AddAsync(users);
                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<UserDto>
                {
                    Success = true,
                    Message = "User Added Successfully",
                    Data = user,
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<Object>
                {
                    Success = false,
                    Message = "Error occurred while adding user",
                    Errors = new List<string>
                    {
                        ex.Message,
                        ex.InnerException?.Message ?? "No Inner Exception"
                    }
                });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UserDto user)
        {
            try
            {
                if (id != user.UserID)
                    return BadRequest(new ApiResponse<Object>
                    {
                        Success = false,
                        Message = "User ID Mismatch",
                        Errors = new List<string> { $"UserID does not match with Given Id {id}" }
                    });

                var oldUser = await _context.Users.FindAsync(id);

                if (oldUser == null)
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "User Not Found",
                        Errors = new List<string> { $"No User found with Id {id}" }
                    });

                oldUser.UserTypeID = user.UserTypeID;
                oldUser.FullName = user.FullName;
                oldUser.UserCode = user.UserCode;
                oldUser.MobileNumber = user.MobileNumber;
                oldUser.Email = user.Email;
                oldUser.Password = user.Password;
                oldUser.ProfilePicturePath = user.ProfilePicturePath;
                oldUser.IsActive = user.IsActive;
                oldUser.IsDeleted = user.IsDeleted;
                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<UserDto>
                {
                    Success = true,
                    Message = "User Updated Successfully",
                    Data = user
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<Object>
                {
                    Success = false,
                    Message = "Error occurred while updating user",
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
                var user = await _context.Users.FindAsync(id);

                if (user == null)
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "User Not Found",
                        Errors = new List<string> { $"No User found with Id {id}" }
                    });

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message = $"User with Id {id} Deleted Successfully",
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while deleting user",
                    Errors = new List<string> { ex.Message }
                });
            }
        }
    }
}
