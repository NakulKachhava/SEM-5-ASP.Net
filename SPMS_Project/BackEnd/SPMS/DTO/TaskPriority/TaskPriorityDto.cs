using System.ComponentModel.DataAnnotations;

namespace SPMS.DTO.TaskPriority
{
    public class TaskPriorityDto
    {
        public int TaskPriorityID { get; set; }
        public string TaskPriorityName { get; set; } = string.Empty;
        public string TaskPriorityCssClass { get; set; } = string.Empty;
    }
}
