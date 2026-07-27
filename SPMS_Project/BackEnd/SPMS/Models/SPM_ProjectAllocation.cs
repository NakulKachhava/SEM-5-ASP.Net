using SPMS.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPMS.Models
{
    [Table("SPM_ProjectAllocation")]
    public class SPM_ProjectAllocation
    {
        [Key]
        public int ProjectAllocationID { get; set; }

        [ForeignKey("Project")]
        public int ProjectID { get; set; }
        public virtual SPM_ProjectMaster? Project { get; set; }

        [ForeignKey("Student")]
        public int StudentID { get; set; }

        [InverseProperty("StudentAllocations")]
        public virtual SPM_User? Student { get; set; }

        [ForeignKey("Faculty")]
        public int FacultyID { get; set; }

        [InverseProperty("FacultyAllocations")]
        public virtual SPM_User? Faculty { get; set; }


        public DateTime AssignedDate { get; set; }

        public DateTime ProjectStartDate { get; set; }

        public DateTime ProjectEndDate { get; set; }

        public int TotalTasksGiven { get; set; }

        public int TotalCompletedTasks { get; set; }

        [Column(TypeName = "decimal(5,2)")]
        public decimal ProgressPercentage { get; set; }

        [MaxLength(1)]
        public string? OverAllGrade { get; set; }

        public virtual ICollection<SPM_Task> Tasks { get; set; } = new List<SPM_Task>();
    }
}
