using System.ComponentModel.DataAnnotations;

namespace SPMS.DTO.UserType
{
    public class UserTypeDto
    {
        public int UserTypeID { get; set; }
        public string UserTypeName { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}
