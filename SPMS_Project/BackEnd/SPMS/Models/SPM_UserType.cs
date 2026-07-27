using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPMS.Models
{
    [Table("SPM_UserType")]
    public class SPM_UserType
    {
        [Key]
        public int UserTypeID { get; set; }

        [Required, MaxLength(50)]
        public string UserTypeName { get; set; } = string.Empty;

        [MaxLength(250)]
        public string? Description { get; set; }

        public virtual ICollection<SPM_User> Users { get; set; } = new List<SPM_User>();
    }
}
