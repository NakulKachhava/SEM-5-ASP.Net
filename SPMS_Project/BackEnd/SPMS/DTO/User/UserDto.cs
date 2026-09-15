using System.ComponentModel.DataAnnotations;
using SPMS.Models;

namespace SPMS.DTO.User
{
    public class UserDto
    {
        public int UserID { get; set; }
        public int UserTypeID { get; set; }
        public string UserTypeName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string? UserCode { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string MobileNumber { get; set; } = string.Empty;
        public string ProfilePicturePath { get; set; } = string.Empty;
        public string? DocumentPath { get; set; }
        public bool IsActive { get; set; }
        public bool? IsDeleted { get; set; }

    }

    public class UserLoginDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class LoginResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public DateTime ExpiresAt { get; set; }

        // Return basic user context so the frontend doesn't have to decode the JWT immediately
        public string UserCode { get; set; } = string.Empty;
        public string UserTypeName { get; set; } = string.Empty;
    }

    // UserFileDto.cs
    public class UserDTO
    {
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

        // Maps to multipart/form-data input field
        public IFormFile? DocumentFile { get; set; }
    }

}
