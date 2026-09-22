using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPMS.Common;
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
        private readonly IValidator<ProjectAllocationDto> _validator;

        public SPM_ProjectAllocationController(
            SpmDbContext context,
            IValidator<ProjectAllocationDto> validator)
        {
            _context = context;
            _validator = validator;
        }


        [HttpGet]
        public async Task<IActionResult> GetProjectAllocations()
        {
            var projectAllocations = await _context.ProjectAllocations
                .Select(pa => new ProjectAllocationDto
                {
                    ProjectAllocationID = pa.ProjectAllocationID,
                    ProjectID = pa.ProjectID,
                    ProjectTitle = pa.Project != null
                        ? pa.Project.ProjectTitle
                        : "No Title",
                    StudentID = pa.StudentID,
                    FacultyID = pa.FacultyID,
                    AssignedDate = pa.AssignedDate,
                    ProjectStartDate = pa.ProjectStartDate,
                    ProjectEndDate = pa.ProjectEndDate,
                    TotalTasksGiven = pa.TotalTasksGiven,
                    TotalCompletedTasks = pa.TotalCompletedTasks,
                    ProgressPercentage = pa.ProgressPercentage,
                    OverAllGrade = pa.OverAllGrade
                })
                .AsNoTracking()
                .ToListAsync();

            return Ok(new ApiResponse<List<ProjectAllocationDto>>
            {
                Success = true,
                Message = "Project Allocations Retrieved Successfully",
                Data = projectAllocations
            });
        }


        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetProjectAllocation([FromRoute] int id)
        {
            var projectAllocation = await _context.ProjectAllocations
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.ProjectAllocationID == id);

            if (projectAllocation == null)
            {
                return NotFound(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Project Allocation Not Found",
                    Errors = new List<string>
                    {
                        $"No project allocation found with Id {id}"
                    }
                });
            }

            var projectAllocationDto = new ProjectAllocationDto
            {
                ProjectAllocationID = projectAllocation.ProjectAllocationID,
                ProjectID = projectAllocation.ProjectID,
                StudentID = projectAllocation.StudentID,
                FacultyID = projectAllocation.FacultyID,
                AssignedDate = projectAllocation.AssignedDate,
                ProjectStartDate = projectAllocation.ProjectStartDate,
                ProjectEndDate = projectAllocation.ProjectEndDate,
                TotalTasksGiven = projectAllocation.TotalTasksGiven,
                TotalCompletedTasks = projectAllocation.TotalCompletedTasks,
                ProgressPercentage = projectAllocation.ProgressPercentage,
                OverAllGrade = projectAllocation.OverAllGrade
            };

            return Ok(new ApiResponse<ProjectAllocationDto>
            {
                Success = true,
                Message = "Project Allocation Retrieved Successfully",
                Data = projectAllocationDto
            });
        }


        [HttpPost]
        public async Task<IActionResult> Create(
            [FromBody] ProjectAllocationDto projectAllocation)
        {
            try
            {
                if (projectAllocation == null)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Project Allocation Object Not Found",
                        Errors = new List<string>
                        {
                            "Given project allocation object was not found."
                        }
                    });
                }

                var result = await _validator.ValidateAsync(projectAllocation);

                if (!result.IsValid)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Validation Failed",
                        Data = null,
                        Errors = result.Errors
                            .GroupBy(x => x.PropertyName)
                            .Select(x =>
                                $"{x.Key}: {string.Join(", ", x.Select(e => e.ErrorMessage))}")
                            .ToList()
                    });
                }

                var newProjectAllocation = new SPM_ProjectAllocation
                {
                    ProjectID = projectAllocation.ProjectID,
                    StudentID = projectAllocation.StudentID,
                    FacultyID = projectAllocation.FacultyID,
                    AssignedDate = projectAllocation.AssignedDate,
                    ProjectStartDate = projectAllocation.ProjectStartDate,
                    ProjectEndDate = projectAllocation.ProjectEndDate,
                    TotalTasksGiven = projectAllocation.TotalTasksGiven,
                    TotalCompletedTasks = projectAllocation.TotalCompletedTasks,
                    ProgressPercentage = projectAllocation.ProgressPercentage,
                    OverAllGrade = projectAllocation.OverAllGrade
                };

                await _context.ProjectAllocations.AddAsync(newProjectAllocation);
                await _context.SaveChangesAsync();

                projectAllocation.ProjectAllocationID =
                    newProjectAllocation.ProjectAllocationID;

                return Ok(new ApiResponse<ProjectAllocationDto>
                {
                    Success = true,
                    Message = "Project Allocation Added Successfully",
                    Data = projectAllocation
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while adding project allocation",
                    Errors = new List<string>
                    {
                        ex.Message,
                        ex.InnerException?.Message ?? "No Inner Exception"
                    }
                });
            }
        }


        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(
            [FromRoute] int id,
            [FromBody] ProjectAllocationDto projectAllocation)
        {
            try
            {
                if (projectAllocation == null)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Project Allocation Object Not Found",
                        Errors = new List<string>
                        {
                            "Given project allocation object was not found."
                        }
                    });
                }

                var result = await _validator.ValidateAsync(projectAllocation);

                if (!result.IsValid)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Validation Failed",
                        Data = null,
                        Errors = result.Errors
                            .GroupBy(x => x.PropertyName)
                            .Select(x =>
                                $"{x.Key}: {string.Join(", ", x.Select(e => e.ErrorMessage))}")
                            .ToList()
                    });
                }

                if (id != projectAllocation.ProjectAllocationID)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Project Allocation ID Mismatch",
                        Errors = new List<string>
                        {
                            $"ProjectAllocationID does not match with Given Id {id}"
                        }
                    });
                }

                var oldProjectAllocation =
                    await _context.ProjectAllocations.FindAsync(id);

                if (oldProjectAllocation == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Project Allocation Not Found",
                        Errors = new List<string>
                        {
                            $"No project allocation found with Id {id}"
                        }
                    });
                }

                oldProjectAllocation.ProjectID = projectAllocation.ProjectID;
                oldProjectAllocation.StudentID = projectAllocation.StudentID;
                oldProjectAllocation.FacultyID = projectAllocation.FacultyID;
                oldProjectAllocation.AssignedDate = projectAllocation.AssignedDate;
                oldProjectAllocation.ProjectStartDate = projectAllocation.ProjectStartDate;
                oldProjectAllocation.ProjectEndDate = projectAllocation.ProjectEndDate;
                oldProjectAllocation.TotalTasksGiven =
                    projectAllocation.TotalTasksGiven;
                oldProjectAllocation.TotalCompletedTasks =
                    projectAllocation.TotalCompletedTasks;
                oldProjectAllocation.ProgressPercentage =
                    projectAllocation.ProgressPercentage;
                oldProjectAllocation.OverAllGrade =
                    projectAllocation.OverAllGrade;

                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<ProjectAllocationDto>
                {
                    Success = true,
                    Message = "Project Allocation Updated Successfully",
                    Data = projectAllocation
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while updating project allocation",
                    Errors = new List<string>
                    {
                        ex.Message,
                        ex.InnerException?.Message ?? "No Inner Exception"
                    }
                });
            }
        }


        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                var projectAllocation =
                    await _context.ProjectAllocations.FindAsync(id);

                if (projectAllocation == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Project Allocation Not Found",
                        Errors = new List<string>
                        {
                            $"No project allocation found with Id {id}"
                        }
                    });
                }

                _context.ProjectAllocations.Remove(projectAllocation);

                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message = $"Project Allocation with Id {id} Deleted Successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while deleting project allocation",
                    Errors = new List<string>
                    {
                        ex.Message
                    }
                });
            }
        }
    }
}