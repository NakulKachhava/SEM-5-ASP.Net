using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPMS.Data;
using SPMS.DTO.ProjectAllocation;
using SPMS.Models;

namespace SPMS.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SPM_ProjectAllocationController : ControllerBase
    {
        private readonly SpmDbContext _context;

        public SPM_ProjectAllocationController(SpmDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProjectAllocations()
        {
            var ProjectAllocations = await _context.ProjectAllocations.Include(pa => pa.Project).Select(pa => new ProjectAllocationDto
            {
                ProjectAllocationID = pa.ProjectAllocationID,
                ProjectID = pa.ProjectID,
                ProjectTitle = pa.Project != null ? pa.Project.ProjectTitle : "No Title",
                StudentID = pa.StudentID,
                FacultyID = pa.FacultyID,
                AssignedDate = pa.AssignedDate,
                ProjectStartDate = pa.ProjectStartDate,
                ProjectEndDate = pa.ProjectEndDate,
                TotalTasksGiven = pa.TotalTasksGiven,
                TotalCompletedTasks = pa.TotalCompletedTasks,
                ProgressPercentage = pa.ProgressPercentage,
                OverAllGrade = pa.OverAllGrade,
            }).AsNoTracking().ToListAsync();
            return Ok(ProjectAllocations);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectAllocation(int id)
        {
            var ProjectAllocation = await _context.ProjectAllocations.FindAsync(id);

            if (ProjectAllocation == null)
            {
                return NotFound();
            }

            return Ok(ProjectAllocation);
        }

        [HttpPost]
        public async Task<IActionResult> Create(ProjectAllocationDto ProjectAllocation)
        {
            var ProjectAllocations = new SPM_ProjectAllocation
            {
                ProjectAllocationID = ProjectAllocation.ProjectAllocationID,
                ProjectID = ProjectAllocation.ProjectID,
                StudentID = ProjectAllocation.StudentID,
                FacultyID = ProjectAllocation.FacultyID,
                AssignedDate = ProjectAllocation.AssignedDate,
                ProjectStartDate = ProjectAllocation.ProjectStartDate,
                ProjectEndDate = ProjectAllocation.ProjectEndDate,
                TotalTasksGiven = ProjectAllocation.TotalTasksGiven,
                TotalCompletedTasks = ProjectAllocation.TotalCompletedTasks,
                ProgressPercentage = ProjectAllocation.ProgressPercentage,
                OverAllGrade = ProjectAllocation.OverAllGrade,
            };
            await _context.ProjectAllocations.AddAsync(ProjectAllocations);
            await _context.SaveChangesAsync();

            return Ok(ProjectAllocations);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, ProjectAllocationDto ProjectAllocation)
        {
            if (id != ProjectAllocation.ProjectAllocationID)
                return BadRequest("ID Mismatch.");

            var oldProjectAllocation = await _context.ProjectAllocations.FindAsync(id);

            if (oldProjectAllocation == null)
                return NotFound();

            oldProjectAllocation.ProjectID = ProjectAllocation.ProjectID;
            oldProjectAllocation.StudentID = ProjectAllocation.StudentID;
            oldProjectAllocation.FacultyID = ProjectAllocation.FacultyID;
            oldProjectAllocation.AssignedDate = ProjectAllocation.AssignedDate;
            oldProjectAllocation.ProjectStartDate = ProjectAllocation.ProjectStartDate;
            oldProjectAllocation.ProjectEndDate = ProjectAllocation.ProjectEndDate;
            oldProjectAllocation.TotalTasksGiven = ProjectAllocation.TotalTasksGiven;
            oldProjectAllocation.TotalCompletedTasks = ProjectAllocation.TotalCompletedTasks;
            oldProjectAllocation.ProgressPercentage = ProjectAllocation.ProgressPercentage;
            oldProjectAllocation.OverAllGrade = ProjectAllocation.OverAllGrade;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ProjectAllocation = await _context.ProjectAllocations.FindAsync(id);

            if (ProjectAllocation == null)
                return NotFound();

            _context.ProjectAllocations.Remove(ProjectAllocation);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
