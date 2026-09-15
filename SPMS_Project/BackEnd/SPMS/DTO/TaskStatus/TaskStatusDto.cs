using System.ComponentModel.DataAnnotations;

namespace SPMS.DTO.TaskStatus
{
    public class TaskStatusDto
    {
        public int TaskStatusID { get; set; }
        public string TaskStatusName { get; set; } = string.Empty;
        public string TaskStatusCssClass { get; set; } = string.Empty;
    }
}
