using SPMS.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPMS.DTO.ProjectAllocation
{
    public class ProjectAllocationDto
    {
        public int ProjectAllocationID { get; set; }
        public int ProjectID { get; set; }
        public string ProjectTitle { get; set; } = string.Empty;
        public int StudentID { get; set; }
        public int FacultyID { get; set; }
        public DateTime AssignedDate { get; set; }
        public DateTime ProjectStartDate { get; set; }
        public DateTime ProjectEndDate { get; set; }
        public int TotalTasksGiven { get; set; }
        public int TotalCompletedTasks { get; set; }
        public decimal ProgressPercentage { get; set; }
        public string? OverAllGrade { get; set; }
    }
}
