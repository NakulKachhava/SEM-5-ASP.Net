using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPMS.Common;
using SPMS.Data;
using SPMS.DTO.ProjectMaster;
using SPMS.Models;

namespace SPMS.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SPM_ProjectMasterController : ControllerBase
    {
        private readonly SpmDbContext _context;
        private readonly IValidator<ProjectMasterDto> _validator;

        public SPM_ProjectMasterController(
            SpmDbContext context,
            IValidator<ProjectMasterDto> validator)
        {
            _context = context;
            _validator = validator;
        }

        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            var projects = await _context.ProjectMasters
                .Select(x => new ProjectMasterDto
                {
                    ProjectID = x.ProjectID,
                    ProjectTitle = x.ProjectTitle,
                    Description = x.Description
                })
                .AsNoTracking()
                .ToListAsync();

            return Ok(new ApiResponse<List<ProjectMasterDto>>
            {
                Success = true,
                Message = "Projects Retrieved Successfully",
                Data = projects
            });
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetProject([FromRoute] int id)
        {
            var project = await _context.ProjectMasters.AsNoTracking().FirstOrDefaultAsync(x => x.ProjectID == id);

            if (project == null)
            {
                return NotFound(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Project Not Found",
                    Errors = new List<string>
                    {
                        $"No project found with Id {id}"
                    }
                });
            }

            var projectDto = new ProjectMasterDto
            {
                ProjectID = project.ProjectID,
                ProjectTitle = project.ProjectTitle,
                Description = project.Description
            };

            return Ok(new ApiResponse<ProjectMasterDto>
            {
                Success = true,
                Message = "Project Retrieved Successfully",
                Data = projectDto
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(
            [FromBody] ProjectMasterDto project)
        {
            try
            {
                if (project == null)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Project Object Not Found",
                        Errors = new List<string>
                        {
                            "Given project object was not found."
                        }
                    });
                }

                var result = await _validator.ValidateAsync(project);

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
                                $"{x.Key}: {string.Join(", ",
                                    x.Select(e => e.ErrorMessage))}")
                            .ToList()
                    });
                }

                var newProject = new SPM_ProjectMaster
                {
                    ProjectTitle = project.ProjectTitle,
                    Description = project.Description
                };

                await _context.ProjectMasters.AddAsync(newProject);
                await _context.SaveChangesAsync();

                project.ProjectID = newProject.ProjectID;

                return Ok(new ApiResponse<ProjectMasterDto>
                {
                    Success = true,
                    Message = "Project Added Successfully",
                    Data = project
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while adding project",
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
            [FromBody] ProjectMasterDto project)
        {
            try
            {
                if (project == null)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Project Object Not Found",
                        Errors = new List<string>
                        {
                            "Given project object was not found."
                        }
                    });
                }

                var result = await _validator.ValidateAsync(project);

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
                                $"{x.Key}: {string.Join(", ",
                                    x.Select(e => e.ErrorMessage))}")
                            .ToList()
                    });
                }

                if (id != project.ProjectID)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Project ID Mismatch",
                        Errors = new List<string>
                        {
                            $"ProjectID does not match with Given Id {id}"
                        }
                    });
                }

                var oldProject =
                    await _context.ProjectMasters.FindAsync(id);

                if (oldProject == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Project Not Found",
                        Errors = new List<string>
                        {
                            $"No project found with Id {id}"
                        }
                    });
                }

                oldProject.ProjectTitle = project.ProjectTitle;
                oldProject.Description = project.Description;

                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<ProjectMasterDto>
                {
                    Success = true,
                    Message = "Project Updated Successfully",
                    Data = project
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while updating project",
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
                var project =
                    await _context.ProjectMasters.FindAsync(id);

                if (project == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Project Not Found",
                        Errors = new List<string>
                        {
                            $"No project found with Id {id}"
                        }
                    });
                }

                _context.ProjectMasters.Remove(project);
                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message =
                        $"Project with Id {id} Deleted Successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while deleting project",
                    Errors = new List<string>
                    {
                        ex.Message,
                        ex.InnerException?.Message ?? "No Inner Exception"
                    }
                });
            }
        }
    }
}