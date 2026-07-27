using SPMS.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPMS.Models
{
    [Table("SPM_UserRole")]
    public class SPM_UserRole
    {
        [Key]
        public int RolePermissionID { get; set; }

        [ForeignKey("Role")]
        public int RoleID { get; set; }
        public virtual SPM_Role? Role { get; set; }

        [ForeignKey("User")]
        public int UserID { get; set; }
        public virtual SPM_User? User { get; set; }
    }
}
