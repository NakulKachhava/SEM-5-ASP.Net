using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPMS.Common;
using SPMS.Data;
using SPMS.DTO.TaskPriority;
using SPMS.Models;

namespace SPMS.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SPM_TaskPriorityController : ControllerBase
    {
        private readonly SpmDbContext _context;
        private readonly IValidator<TaskPriorityDto> _validator;

        public SPM_TaskPriorityController(
            SpmDbContext context,
            IValidator<TaskPriorityDto> validator)
        {
            _context = context;
            _validator = validator;
        }

        [HttpGet]
        public async Task<IActionResult> GetTaskPriorities()
        {
            var priorities = await _context.TaskPriorities
                .Select(x => new TaskPriorityDto
                {
                    TaskPriorityID = x.TaskPriorityID,
                    TaskPriorityName = x.TaskPriorityName,
                    TaskPriorityCssClass = x.TaskPriorityCssClass
                })
                .AsNoTracking()
                .ToListAsync();

            return Ok(new ApiResponse<List<TaskPriorityDto>>
            {
                Success = true,
                Message = "Task Priorities Retrieved Successfully",
                Data = priorities
            });
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetTaskPriority([FromRoute] int id)
        {
            var priority =
                await _context.TaskPriorities.FindAsync(id);

            if (priority == null)
            {
                return NotFound(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Task Priority Not Found",
                    Errors = new List<string>
                    {
                        $"No task priority found with Id {id}"
                    }
                });
            }

            var priorityDto = new TaskPriorityDto
            {
                TaskPriorityID = priority.TaskPriorityID,
                TaskPriorityName = priority.TaskPriorityName,
                TaskPriorityCssClass = priority.TaskPriorityCssClass
            };

            return Ok(new ApiResponse<TaskPriorityDto>
            {
                Success = true,
                Message = "Task Priority Retrieved Successfully",
                Data = priorityDto
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(
            [FromBody] TaskPriorityDto priority)
        {
            try
            {
                if (priority == null)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Task Priority Object Not Found",
                        Errors = new List<string>
                        {
                            "Given task priority object was not found."
                        }
                    });
                }

                var result =
                    await _validator.ValidateAsync(priority);

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

                var newPriority = new SPM_TaskPriority
                {
                    TaskPriorityName =
                        priority.TaskPriorityName,

                    TaskPriorityCssClass =
                        priority.TaskPriorityCssClass
                };

                await _context.TaskPriorities.AddAsync(newPriority);
                await _context.SaveChangesAsync();

                priority.TaskPriorityID =
                    newPriority.TaskPriorityID;

                return Ok(new ApiResponse<TaskPriorityDto>
                {
                    Success = true,
                    Message = "Task Priority Added Successfully",
                    Data = priority
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message =
                        "Error occurred while adding task priority",

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
            [FromBody] TaskPriorityDto priority)
        {
            try
            {
                if (priority == null)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Task Priority Object Not Found",
                        Errors = new List<string>
                        {
                            "Given task priority object was not found."
                        }
                    });
                }

                var result =
                    await _validator.ValidateAsync(priority);

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

                if (id != priority.TaskPriorityID)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Task Priority ID Mismatch",
                        Errors = new List<string>
                        {
                            $"TaskPriorityID does not match with Given Id {id}"
                        }
                    });
                }

                var oldPriority =
                    await _context.TaskPriorities.FindAsync(id);

                if (oldPriority == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Task Priority Not Found",
                        Errors = new List<string>
                        {
                            $"No task priority found with Id {id}"
                        }
                    });
                }

                oldPriority.TaskPriorityName =
                    priority.TaskPriorityName;

                oldPriority.TaskPriorityCssClass =
                    priority.TaskPriorityCssClass;

                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<TaskPriorityDto>
                {
                    Success = true,
                    Message = "Task Priority Updated Successfully",
                    Data = priority
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message =
                        "Error occurred while updating task priority",

                    Errors = new List<string>
                    {
                        ex.Message,
                        ex.InnerException?.Message ?? "No Inner Exception"
                    }
                });
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(
            [FromRoute] int id)
        {
            try
            {
                var priority =
                    await _context.TaskPriorities.FindAsync(id);

                if (priority == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Task Priority Not Found",
                        Errors = new List<string>
                        {
                            $"No task priority found with Id {id}"
                        }
                    });
                }

                _context.TaskPriorities.Remove(priority);
                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message =
                        $"Task Priority with Id {id} Deleted Successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message =
                        "Error occurred while deleting task priority",

                    Errors = new List<string>
                    {
                        ex.Message
                    }
                });
            }
        }
    }
}