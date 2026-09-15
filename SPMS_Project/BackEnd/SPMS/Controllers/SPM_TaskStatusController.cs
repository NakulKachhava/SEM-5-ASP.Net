using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPMS.Common;
using SPMS.Data;
using SPMS.DTO.TaskStatus;
using SPMS.Models;

namespace SPMS.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SPM_TaskStatusController : ControllerBase
    {
        private readonly SpmDbContext _context;
        private readonly IValidator<TaskStatusDto> _validator;

        public SPM_TaskStatusController(
            SpmDbContext context,
            IValidator<TaskStatusDto> validator)
        {
            _context = context;
            _validator = validator;
        }

        [HttpGet]
        public async Task<IActionResult> GetTaskStatuses()
        {
            var statuses = await _context.TaskStatuses
                .Select(x => new TaskStatusDto
                {
                    TaskStatusID = x.TaskStatusID,
                    TaskStatusName = x.TaskStatusName,
                    TaskStatusCssClass = x.TaskStatusCssClass
                })
                .AsNoTracking()
                .ToListAsync();

            return Ok(new ApiResponse<List<TaskStatusDto>>
            {
                Success = true,
                Message = "Task Statuses Retrieved Successfully",
                Data = statuses
            });
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetTaskStatus([FromRoute] int id)
        {
            var status = await _context.TaskStatuses.FindAsync(id);

            if (status == null)
            {
                return NotFound(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Task Status Not Found",
                    Errors = new List<string>
                    {
                        $"No task status found with Id {id}"
                    }
                });
            }

            var statusDto = new TaskStatusDto
            {
                TaskStatusID = status.TaskStatusID,
                TaskStatusName = status.TaskStatusName,
                TaskStatusCssClass = status.TaskStatusCssClass
            };

            return Ok(new ApiResponse<TaskStatusDto>
            {
                Success = true,
                Message = "Task Status Retrieved Successfully",
                Data = statusDto
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(
            [FromBody] TaskStatusDto status)
        {
            try
            {
                if (status == null)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Task Status Object Not Found",
                        Errors = new List<string>
                        {
                            "Given task status object was not found."
                        }
                    });
                }

                var result = await _validator.ValidateAsync(status);

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

                var newStatus = new SPM_TaskStatus
                {
                    TaskStatusName = status.TaskStatusName,
                    TaskStatusCssClass = status.TaskStatusCssClass
                };

                await _context.TaskStatuses.AddAsync(newStatus);
                await _context.SaveChangesAsync();

                status.TaskStatusID = newStatus.TaskStatusID;

                return Ok(new ApiResponse<TaskStatusDto>
                {
                    Success = true,
                    Message = "Task Status Added Successfully",
                    Data = status
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while adding task status",
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
            [FromBody] TaskStatusDto status)
        {
            try
            {
                if (status == null)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Task Status Object Not Found",
                        Errors = new List<string>
                        {
                            "Given task status object was not found."
                        }
                    });
                }

                var result = await _validator.ValidateAsync(status);

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

                if (id != status.TaskStatusID)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Task Status ID Mismatch",
                        Errors = new List<string>
                        {
                            $"TaskStatusID does not match with Given Id {id}"
                        }
                    });
                }

                var oldStatus =
                    await _context.TaskStatuses.FindAsync(id);

                if (oldStatus == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Task Status Not Found",
                        Errors = new List<string>
                        {
                            $"No task status found with Id {id}"
                        }
                    });
                }

                oldStatus.TaskStatusName = status.TaskStatusName;
                oldStatus.TaskStatusCssClass = status.TaskStatusCssClass;

                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<TaskStatusDto>
                {
                    Success = true,
                    Message = "Task Status Updated Successfully",
                    Data = status
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while updating task status",
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
                var status =
                    await _context.TaskStatuses.FindAsync(id);

                if (status == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Task Status Not Found",
                        Errors = new List<string>
                        {
                            $"No task status found with Id {id}"
                        }
                    });
                }

                _context.TaskStatuses.Remove(status);
                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message =
                        $"Task Status with Id {id} Deleted Successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while deleting task status",
                    Errors = new List<string>
                    {
                        ex.Message
                    }
                });
            }
        }
    }
}