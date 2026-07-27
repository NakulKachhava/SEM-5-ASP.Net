using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPMS.Models
{
    [Table("SPM_TaskStatus")]
    public class SPM_TaskStatus
    {
        [Key]
        public int TaskStatusID { get; set; }

        [Required, MaxLength(20)]
        public string TaskStatusName { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string TaskStatusCssClass { get; set; } = string.Empty;

        public virtual ICollection<SPM_Task> Tasks { get; set; } = new List<SPM_Task>();
    }
}
