using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPMS.Common;
using SPMS.Data;
using SPMS.DTO.Task;
using SPMS.Models;

namespace SPMS.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SPM_TaskController : ControllerBase
    {
        private readonly SpmDbContext _context;
        private readonly IValidator<TaskDto> _validator;

        public SPM_TaskController(
            SpmDbContext context,
            IValidator<TaskDto> validator)
        {
            _context = context;
            _validator = validator;
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            var tasks = await _context.Tasks
                .Select(x => new TaskDto
                {
                    TaskID = x.TaskID,
                    ProjectAllocationID = x.ProjectAllocationID,
                    TaskTitle = x.TaskTitle,
                    TaskDescription = x.TaskDescription,
                    TaskStatusID = x.TaskStatusID,
                    TaskPriorityID = x.TaskPriorityID,

                    AssignedScore = x.AssignedScore,
                    EarnedScore = x.EarnedScore,
                    ProgressPercentage = x.ProgressPercentage,

                    TaskAssignedDate = x.TaskAssignedDate,
                    TaskStartDate = x.TaskStartDate,
                    TaskDueDate = x.TaskDueDate,
                    TaskCompletedDate = x.TaskCompletedDate,
                    NextFollowUpDate = x.NextFollowUpDate,

                    FacultyRemarks = x.FacultyRemarks,
                    StudentRemarks = x.StudentRemarks
                })
                .AsNoTracking()
                .ToListAsync();

            return Ok(new ApiResponse<List<TaskDto>>
            {
                Success = true,
                Message = "Tasks Retrieved Successfully",
                Data = tasks
            });
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetTask([FromRoute] int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Task Not Found",
                    Errors = new List<string>
                    {
                        $"No task found with Id {id}"
                    }
                });
            }

            var taskDto = new TaskDto
            {
                TaskID = task.TaskID,
                ProjectAllocationID = task.ProjectAllocationID,
                TaskTitle = task.TaskTitle,
                TaskDescription = task.TaskDescription,
                TaskStatusID = task.TaskStatusID,
                TaskPriorityID = task.TaskPriorityID,

                AssignedScore = task.AssignedScore,
                EarnedScore = task.EarnedScore,
                ProgressPercentage = task.ProgressPercentage,

                TaskAssignedDate = task.TaskAssignedDate,
                TaskStartDate = task.TaskStartDate,
                TaskDueDate = task.TaskDueDate,
                TaskCompletedDate = task.TaskCompletedDate,
                NextFollowUpDate = task.NextFollowUpDate,

                FacultyRemarks = task.FacultyRemarks,
                StudentRemarks = task.StudentRemarks
            };

            return Ok(new ApiResponse<TaskDto>
            {
                Success = true,
                Message = "Task Retrieved Successfully",
                Data = taskDto
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(
            [FromBody] TaskDto task)
        {
            try
            {
                if (task == null)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Task Object Not Found",
                        Errors = new List<string>
                        {
                            "Given task object was not found."
                        }
                    });
                }

                var result = await _validator.ValidateAsync(task);

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

                var newTask = new SPM_Task
                {
                    ProjectAllocationID = task.ProjectAllocationID,
                    TaskTitle = task.TaskTitle,
                    TaskDescription = task.TaskDescription,
                    TaskStatusID = task.TaskStatusID,
                    TaskPriorityID = task.TaskPriorityID,

                    AssignedScore = task.AssignedScore,
                    EarnedScore = task.EarnedScore,
                    ProgressPercentage = task.ProgressPercentage,

                    TaskAssignedDate = task.TaskAssignedDate,
                    TaskStartDate = task.TaskStartDate,
                    TaskDueDate = task.TaskDueDate,
                    TaskCompletedDate = task.TaskCompletedDate,
                    NextFollowUpDate = task.NextFollowUpDate,

                    FacultyRemarks = task.FacultyRemarks,
                    StudentRemarks = task.StudentRemarks
                };

                await _context.Tasks.AddAsync(newTask);
                await _context.SaveChangesAsync();

                task.TaskID = newTask.TaskID;

                return Ok(new ApiResponse<TaskDto>
                {
                    Success = true,
                    Message = "Task Added Successfully",
                    Data = task
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while adding task",
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
            [FromBody] TaskDto task)
        {
            try
            {
                if (task == null)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Task Object Not Found",
                        Errors = new List<string>
                        {
                            "Given task object was not found."
                        }
                    });
                }

                var result = await _validator.ValidateAsync(task);

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

                if (id != task.TaskID)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Task ID Mismatch",
                        Errors = new List<string>
                        {
                            $"TaskID does not match with Given Id {id}"
                        }
                    });
                }

                var oldTask = await _context.Tasks.FindAsync(id);

                if (oldTask == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Task Not Found",
                        Errors = new List<string>
                        {
                            $"No task found with Id {id}"
                        }
                    });
                }

                oldTask.ProjectAllocationID = task.ProjectAllocationID;
                oldTask.TaskTitle = task.TaskTitle;
                oldTask.TaskDescription = task.TaskDescription;
                oldTask.TaskStatusID = task.TaskStatusID;
                oldTask.TaskPriorityID = task.TaskPriorityID;

                oldTask.AssignedScore = task.AssignedScore;
                oldTask.EarnedScore = task.EarnedScore;
                oldTask.ProgressPercentage = task.ProgressPercentage;

                oldTask.TaskAssignedDate = task.TaskAssignedDate;
                oldTask.TaskStartDate = task.TaskStartDate;
                oldTask.TaskDueDate = task.TaskDueDate;
                oldTask.TaskCompletedDate = task.TaskCompletedDate;
                oldTask.NextFollowUpDate = task.NextFollowUpDate;

                oldTask.FacultyRemarks = task.FacultyRemarks;
                oldTask.StudentRemarks = task.StudentRemarks;

                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<TaskDto>
                {
                    Success = true,
                    Message = "Task Updated Successfully",
                    Data = task
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while updating task",
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
                var task = await _context.Tasks.FindAsync(id);

                if (task == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Task Not Found",
                        Errors = new List<string>
                        {
                            $"No task found with Id {id}"
                        }
                    });
                }

                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();

                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message =
                        $"Task with Id {id} Deleted Successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Error occurred while deleting task",
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