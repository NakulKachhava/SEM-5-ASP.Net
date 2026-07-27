using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPMS.Models
{
    [Table("SPM_TaskPriority")]
    public class SPM_TaskPriority
    {
        [Key]
        public int TaskPriorityID { get; set; }

        [Required, MaxLength(20)]
        public string TaskPriorityName { get; set; } = string.Empty;

        [Required, MaxLength(20)]
        public string TaskPriortyCssClass { get; set; } = string.Empty;

        public virtual ICollection<SPM_Task> Tasks { get; set; } = new List<SPM_Task>();
    }
}
