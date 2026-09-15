using SPMS.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPMS.DTO.Task
{
    public class TaskDto
    {
        public int TaskID { get; set; }
        public int ProjectAllocationID { get; set; }
        public virtual SPM_ProjectAllocation? ProjectAllocation { get; set; }
        public string TaskTitle { get; set; } = string.Empty;
        public string? TaskDescription { get; set; }
        public int TaskStatusID { get; set; }
        public virtual SPM_TaskStatus? TaskStatus { get; set; }
        public int TaskPriorityID { get; set; }
        public virtual SPM_TaskPriority? TaskPriority { get; set; }
        public decimal AssignedScore { get; set; }
        public decimal? EarnedScore { get; set; }

        public decimal ProgressPercentage { get; set; }

        public DateTime TaskAssignedDate { get; set; }

        public DateTime? TaskStartDate { get; set; }

        public DateTime? TaskDueDate { get; set; }

        public DateTime? TaskCompletedDate { get; set; }

        public DateTime? NextFollowUpDate { get; set; }

        public string? FacultyRemarks { get; set; }

        public string? StudentRemarks { get; set; }
    }
}
