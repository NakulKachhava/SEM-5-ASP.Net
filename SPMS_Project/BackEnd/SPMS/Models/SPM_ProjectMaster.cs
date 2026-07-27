using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPMS.Models
{
    [Table("SPM_ProjectMaster")]
    public class SPM_ProjectMaster
    {
        [Key]
        public int ProjectID { get; set; }

        [Required, MaxLength(200)]
        public string ProjectTitle { get; set; } = string.Empty;

        public string? Description { get; set; }

        public virtual ICollection<SPM_ProjectAllocation> Allocations { get; set; } = new List<SPM_ProjectAllocation>();
    }
}
