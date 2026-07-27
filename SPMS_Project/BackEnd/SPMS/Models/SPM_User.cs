using SPMS.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPMS.Models
{
    [Table("SPM_User")]
    public class SPM_User
    {
        [Key]
        public int UserID { get; set; }

        [ForeignKey("UserType")]
        public int UserTypeID { get; set; }
        public virtual SPM_UserType? UserType { get; set; }

        [Required, MaxLength(150)]
        public string FullName { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? UserCode { get; set; }

        [Required, MaxLength(150), EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        [Required, MaxLength(15)]
        public string MobileNumber { get; set; } = string.Empty;

        [Required, MaxLength(500)]
        public string ProfilePicturePath { get; set; } = string.Empty;

        public bool IsActive { get; set; }

        public bool? IsDeleted { get; set; }

        public virtual ICollection<SPM_UserRole> UserRoles { get; set; } = new List<SPM_UserRole>();

        [InverseProperty("Student")]
        public virtual ICollection<SPM_ProjectAllocation> StudentAllocations { get; set; } = new List<SPM_ProjectAllocation>();

        [InverseProperty("Faculty")]
        public virtual ICollection<SPM_ProjectAllocation> FacultyAllocations { get; set; } = new List<SPM_ProjectAllocation>();

    }
}
