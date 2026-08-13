using SPMS.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPMS.DTO.UserRole
{
    public class UserRoleDto
    {
        public int RolePermissionID { get; set; }
        public int RoleID { get; set; }
        public int UserID { get; set; }
    }
}
