using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPMS.Common;
using SPMS.Data;
using SPMS.DTO.User;
using SPMS.Models;
using SPMS.Services;
using System.Data;

namespace SPMS.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class SPM_UserController : ControllerBase
    {
        private readonly SpmDbContext _context;
        private readonly IFileService _fileService;
        private readonly IValidator<UserDto> _validator;
        private readonly TokenService _tokenService;

        public SPM_UserController(SpmDbContext context, IValidator<UserDto> validator, TokenService tokenService, IFileService fileService)
        {
            _context = context;
            _validator = validator;
            _fileService = fileService;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost()]
        public async Task<IActionResult> Login([FromBody] UserLoginDto dto)
        {
            try
            {
                var user = await _context.Users.Include(u => u.UserType).SingleOrDefaultAsync(u => u.Email == dto.Email && u.Password == dto.Password);

                if (user == null)
                {
                    return Unauthorized("Invalid Email or password");
                }

                var token = _tokenService.GenerateToken(user);

                //var loginResult = new LoginResponseDto
                //{
                //    Token = token,
                //    ExpiresAt = DateTime.UtcNow.AddHours(2),
                //    UserCode = user.UserCode,
                //    UserType = "Admin"
                //};

                return Ok(new ApiResponse<string>
                {
                    Success = true,
                    Message = "User Logged In Successfully.",
                    Data = token, // loginResult
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while logging in the user.",
                    Errors = new List<string>
                    {
                        ex.Message,
                        ex.InnerException?.Message ?? "No Inner Exception"
                    }
                });
            }
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? fullName = null,
            [FromQuery] string? userCode = null,
            [FromQuery] string? email = null,
            [FromQuery] int? userTypeId = null,
            [FromQuery] bool? isActive = null,
            [FromQuery] bool? isDeleted = null)
        {
            try
            {
                // Validate pagination parameters
                if (pageNumber < 1)
                {
                    pageNumber = 1;
                }

                if (pageSize < 1)
                {
                    pageSize = 10;
                }

                // Optional maximum page size
                if (pageSize > 100)
                {
                    pageSize = 100;
                }

                // Start query
                var query = _context.Users
                    .Include(u => u.UserType)
                    .AsNoTracking()
                    .AsQueryable();

                // Filtering
                if (!string.IsNullOrWhiteSpace(fullName))
                {
                    query = query.Where(u =>
                        u.FullName != null &&
                        u.FullName.Contains(fullName));
                }

                if (!string.IsNullOrWhiteSpace(userCode))
                {
                    query = query.Where(u =>
                        u.UserCode != null &&
                        u.UserCode.Contains(userCode));
                }

                if (!string.IsNullOrWhiteSpace(email))
                {
                    query = query.Where(u =>
                        u.Email != null &&
                        u.Email.Contains(email));
                }

                if (userTypeId.HasValue)
                {
                    query = query.Where(u =>
                        u.UserTypeID == userTypeId.Value);
                }

                if (isActive.HasValue)
                {
                    query = query.Where(u =>
                        u.IsActive == isActive.Value);
                }

                if (isDeleted.HasValue)
                {
                    query = query.Where(u =>
                        u.IsDeleted == isDeleted.Value);
                }

                // Get total records BEFORE pagination
                var totalRecords = await query.CountAsync();

                // Calculate total pages
                var totalPages = (int)Math.Ceiling(
                    totalRecords / (double)pageSize);

                // Pagination
                var users = await query
                    .OrderBy(u => u.UserID)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .Select(u => new UserDto
                    {
                        UserID = u.UserID,
                        UserTypeID = u.UserTypeID,
                        UserTypeName = u.UserType != null
                            ? u.UserType.UserTypeName
                            : "No Department",
                        FullName = u.FullName,
                        UserCode = u.UserCode,
                        Email = u.Email,
                        MobileNumber = u.MobileNumber,
                        ProfilePicturePath = u.ProfilePicturePath,
                        IsActive = u.IsActive,
                        IsDeleted = u.IsDeleted,
                    })
                    .ToListAsync();

                var response = new PaginatedResponse<UserDto>
                {
                    Items = users,
                    PageNumber = pageNumber,
                    PageSize = pageSize,
                    TotalRecords = totalRecords,
                    TotalPages = totalPages
                };

                return Ok(new ApiResponse<PaginatedResponse<UserDto>>
                {
                    Success = true,
                    Message = "Users Retrieved Successfully",
                    Data = response
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while retrieving users.",
                    Errors = new List<string>
                    {
                        ex.Message,
                        ex.InnerException?.Message ?? "No Inner Exception"
                    }
                });
            }
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetUser([FromRoute] int id)
        {
            var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(x => x.UserID == id);

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

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UserDto user)
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

                var result = await _validator.ValidateAsync(user);

                if (!result.IsValid)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Validation Failed",
                        Data = null,
                        //Errors = result.Errors
                        //.Select(x => $"{x.PropertyName}: {x.ErrorMessage}")
                        //.ToList()

                        Errors = result.Errors
                        .GroupBy(x => x.PropertyName)
                        .Select(x => $"{x.Key}: {string.Join(", ", x.Select(e => e.ErrorMessage))}")
                        .ToList()
                    });
                }

                var users = new SPM_User
                {
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

                user.UserID = users.UserID;

                return Ok(new ApiResponse<UserDto>
                {
                    Success = true,
                    Message = "User Added Successfully",
                    Data = user,
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
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

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id,[FromBody] UserDto user)
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

                var result = await _validator.ValidateAsync(user);

                if (!result.IsValid)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Validation Failed",
                        Data = null,
                        //Errors = result.Errors
                        //.Select(x => $"{x.PropertyName}: {x.ErrorMessage}")
                        //.ToList()

                        Errors = result.Errors
                        .GroupBy(x => x.PropertyName)
                        .Select(x => $"{x.Key}: {string.Join(", ", x.Select(e => e.ErrorMessage))}")
                        .ToList()
                    });
                }

                if (id != user.UserID)
                    return BadRequest(new ApiResponse<object>
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
                return BadRequest(new ApiResponse<object>
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

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
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

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateFile([FromForm] UserDTO dto)
        {
            if (!ModelState.IsValid)
            {
                // Extract errors as a flat List<string>
                var errorList = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                return BadRequest(new ApiResponse<string>
                {
                    Success = false,
                    Message = "Validation failed.",
                    Errors = errorList
                });
            }
                
            string? uploadedPath = null;
            if (dto.DocumentFile != null)
            {
                uploadedPath = await _fileService.UploadFileAsync(dto.DocumentFile, "Users");
            }

            var user = new SPM_User
            {
                FullName = dto.UserName,
                Password = dto.Password,
                DocumentPath = uploadedPath // Save relative path to DB
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return Ok(new ApiResponse<SPM_User>
            {
                Success = true,
                Message = "File Uploaded Successfully",
                Data = user,
            });
        }

        [HttpPut("{id:int}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateFile(int id, [FromForm] UserDTO dto)
        {
            if (id != dto.UserId)
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "User ID Mismatch",
                    Errors = new List<string> { $"UserID does not match with Given Id {id}" }
                });

            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null)
                return NotFound(new ApiResponse<object>
                {
                    Success = false,
                    Message = "User Not Found",
                    Errors = new List<string> { $"No User found with Id {id}" }
                });

            if (dto.DocumentFile != null && dto.DocumentFile.Length > 0)
            {
                // 1. Delete physical file on disk
                _fileService.DeleteFile(existingUser.DocumentPath);

                // 2. Upload replacement file and update path
                existingUser.DocumentPath = await _fileService.UploadFileAsync(dto.DocumentFile, "Users");
            }

            existingUser.FullName = dto.UserName;
            if (!string.IsNullOrWhiteSpace(dto.Password))
            {
                existingUser.Password = dto.Password;
            }

            _context.Users.Update(existingUser);
            await _context.SaveChangesAsync();

            return Ok(new ApiResponse<SPM_User>
            {
                Success = true,
                Message = "File Updated Successfully",
                Data = existingUser
            });
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteFile(int id, [FromQuery] bool deleteFileOnly = false)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new ApiResponse<object>
                {
                    Success = false,
                    Message = "User Not Found",
                    Errors = new List<string> { $"No User found with Id {id}" }
                });

            if (deleteFileOnly)
            {
                if (string.IsNullOrEmpty(user.DocumentPath))
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "File Not Found.",
                        Errors = new List<string> { $"No Such File Exist For This User." }
                    });

                _fileService.DeleteFile(user.DocumentPath);
                user.DocumentPath = null;
                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<SPM_User>
                {
                    Success = true,
                    Message = "File Deleted Successfully"
                });
            }

            // Delete both physical file and DB record
            _fileService.DeleteFile(user.DocumentPath);
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new ApiResponse<object>
            {
                Success = true,
                Message = "User And File Both Deleted Successfully"
            });
        }
    }
}
