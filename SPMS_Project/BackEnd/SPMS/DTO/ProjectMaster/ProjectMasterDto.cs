using System.ComponentModel.DataAnnotations;

namespace SPMS.DTO.ProjectMaster
{
    public class ProjectMasterDto
    {
        public int ProjectID { get; set; }
        public string ProjectTitle { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}
