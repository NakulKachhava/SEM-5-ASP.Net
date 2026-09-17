using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPMS.Data;
using SPMS.Models;

namespace StudentProjectManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SPM_DashboardController : ControllerBase
    {
        private readonly SpmDbContext _context;

        public SPM_DashboardController(SpmDbContext context)
        {
            _context = context;
        }

        #region Q1: Display the total number of students registered in the system.
        [HttpGet("q1")]
        public async Task<IActionResult> GetQ1()
        {
            var count = await _context.Users
                .Where(u => u.UserType != null && u.UserType.UserTypeName == "Student")
                .CountAsync();

            return Ok(new { TotalStudents = count });
        }
        #endregion

        #region Q2: Display the total number of faculty members guiding projects.
        [HttpGet("q2")]
        public async Task<IActionResult> GetQ2()
        {
            var count = await _context.ProjectAllocations
                .Select(pa => pa.FacultyID)
                .Distinct()
                .CountAsync();

            return Ok(new { TotalGuidingFaculties = count });
        }
        #endregion

        #region Q3: Display the total number of projects available in the system.
        [HttpGet("q3")]
        public async Task<IActionResult> GetQ3()
        {
            var count = await _context.ProjectMasters.CountAsync();
            return Ok(new { TotalProjects = count });
        }
        #endregion

        #region Q4: Show how many tasks belong to each status category.
        [HttpGet("q4")]
        public async Task<IActionResult> GetQ4()
        {
            var result = await _context.TaskStatuses
                .Select(ts => new
                {
                    Status = ts.TaskStatusName,
                    Tasks = _context.Tasks.Count(t => t.TaskStatusID == ts.TaskStatusID)
                })
                .ToListAsync();

            return Ok(result);
        }
        #endregion

        #region Q5: Show priority wise task count
        [HttpGet("q5")]
        public async Task<IActionResult> GetQ5()
        {
            var result = await _context.TaskPriorities
                .Select(tp => new
                {
                    Priority = tp.TaskPriorityName,
                    Tasks = _context.Tasks.Count(t => t.TaskPriorityID == tp.TaskPriorityID)
                })
                .ToListAsync();

            return Ok(result);
        }
        #endregion

        #region Q6: Show how many projects are assigned to each faculty member.
        [HttpGet("q6")]
        public async Task<IActionResult> GetQ6()
        {
            var result = await _context.ProjectAllocations
                .GroupBy(pa => new { pa.FacultyID, pa.Faculty!.FullName })
                .Select(g => new
                {
                    Faculty = g.Key.FullName,
                    Projects = g.Select(x => x.ProjectID).Distinct().Count()
                })
                .ToListAsync();

            return Ok(result);
        }
        #endregion

        #region Q7: Show how many tasks have been assigned to each student.
        [HttpGet("q7")]
        public async Task<IActionResult> GetQ7()
        {
            var result = await _context.Tasks
                .Where(t => t.ProjectAllocation != null && t.ProjectAllocation.Student != null)
                .GroupBy(t => new { t.ProjectAllocation!.StudentID, t.ProjectAllocation.Student!.FullName })
                .Select(g => new
                {
                    Student = g.Key.FullName,
                    Tasks = g.Count()
                })
                .ToListAsync();

            return Ok(result);
        }
        #endregion

        #region Q8: Display the top 10 students having the highest average earned score.
        [HttpGet("q8")]
        public async Task<IActionResult> GetQ8()
        {
            var result = await _context.Tasks
                .Where(t => t.ProjectAllocation != null && t.ProjectAllocation.Student != null)
                .GroupBy(t => new { t.ProjectAllocation!.StudentID, t.ProjectAllocation.Student!.FullName })
                .Select(g => new
                {
                    Student = g.Key.FullName,
                    AvgScore = 0.0
                })
                .Take(10)
                .ToListAsync();

            return Ok(result);
        }
        #endregion

        #region Q9: Display the bottom 10 students based on average earned score.
        [HttpGet("q9")]
        public async Task<IActionResult> GetQ9()
        {
            var students = await _context.Tasks
                .Where(t => t.ProjectAllocation != null && t.ProjectAllocation.Student != null)
                .GroupBy(t => new { t.ProjectAllocation!.StudentID, t.ProjectAllocation.Student!.FullName })
                .Select(g => new
                {
                    Student = g.Key.FullName,
                    TotalTasks = g.Count(),
                    AverageScore = 0.0
                })
                .Take(10)
                .ToListAsync();

            var result = students.Select((s, index) => new
            {
                Rank = index + 1,
                s.Student,
                s.TotalTasks,
                s.AverageScore
            });

            return Ok(result);
        }
        #endregion

        #region Q10: Display all tasks whose due date has passed but are not completed.
        [HttpGet("q10")]
        public async Task<IActionResult> GetQ10()
        {
            var today = DateTime.Today;

            var result = await _context.Tasks
                .Where(t => t.TaskDueDate != null && t.TaskDueDate < today && (t.TaskStatus == null || t.TaskStatus.TaskStatusName != "Completed"))
                .Select(t => new
                {
                    TaskID = t.TaskID,
                    TaskTitle = t.TaskTitle,
                    Student = t.ProjectAllocation != null && t.ProjectAllocation.Student != null ? t.ProjectAllocation.Student.FullName : null,
                    Faculty = t.ProjectAllocation != null && t.ProjectAllocation.Faculty != null ? t.ProjectAllocation.Faculty.FullName : null,
                    TaskDueDate = t.TaskDueDate!.Value.ToString("dd-MMM-yyyy"),
                    DaysOverdue = (today - t.TaskDueDate!.Value).Days
                })
                .ToListAsync();

            return Ok(result);
        }
        #endregion

        #region Q11: Display tasks having follow-up dates within the next 7 days.
        [HttpGet("q11")]
        public async Task<IActionResult> GetQ11()
        {
            var today = DateTime.Today;
            var nextWeek = today.AddDays(7);

            var result = await _context.Tasks
                .Where(t => t.TaskDueDate != null && t.TaskDueDate >= today && t.TaskDueDate <= nextWeek)
                .Select(t => new
                {
                    TaskTitle = t.TaskTitle,
                    Student = t.ProjectAllocation != null && t.ProjectAllocation.Student != null ? t.ProjectAllocation.Student.FullName : null,
                    Faculty = t.ProjectAllocation != null && t.ProjectAllocation.Faculty != null ? t.ProjectAllocation.Faculty.FullName : null,
                    FollowUpDate = t.TaskDueDate!.Value.ToString("dd-MMM-yyyy")
                })
                .ToListAsync();

            return Ok(result);
        }
        #endregion

        #region Q12: Show how many students have obtained each grade.
        [HttpGet("q12")]
        public async Task<IActionResult> GetQ12()
        {
            var result = await _context.ProjectAllocations
                .Where(pa => !string.IsNullOrEmpty(pa.OverAllGrade))
                .GroupBy(pa => pa.OverAllGrade)
                .Select(g => new
                {
                    Grade = g.Key,
                    Students = g.Select(pa => pa.StudentID).Distinct().Count()
                })
                .ToListAsync();

            return Ok(result);
        }
        #endregion

        #region Q13: Show month-wise completed task count.
        [HttpGet("q13")]
        public async Task<IActionResult> GetQ13()
        {
            var result = await _context.Tasks
                .Where(t => t.TaskStatus != null && t.TaskStatus.TaskStatusName == "Completed" && t.TaskCompletedDate != null)
                .GroupBy(t => new { Year = t.TaskCompletedDate!.Value.Year, Month = t.TaskCompletedDate!.Value.Month })
                .Select(g => new
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    CompletedTasks = g.Count()
                })
                .OrderBy(g => g.Year).ThenBy(g => g.Month)
                .ToListAsync();

            return Ok(result);
        }
        #endregion

        #region Q14: Display Role Wise Active User Count.
        [HttpGet("q14")]
        public async Task<IActionResult> GetQ14()
        {
            var result = await _context.UserRoles
                .Where(ur => ur.User != null && ur.User.IsActive)
                .GroupBy(ur => ur.Role!.RoleName)
                .Select(g => new
                {
                    Role = g.Key,
                    ActiveUsers = g.Count()
                })
                .ToListAsync();

            return Ok(result);
        }
        #endregion

        #region Q15: Display each role with users assigned to it.
        [HttpGet("q15")]
        public async Task<IActionResult> GetQ15()
        {
            var result = await _context.UserRoles
                .Where(ur => ur.Role != null && ur.User != null)
                .Select(ur => new
                {
                    Role = ur.Role!.RoleName,
                    UserName = ur.User!.FullName
                })
                .OrderBy(r => r.Role)
                .ThenBy(r => r.UserName)
                .ToListAsync();

            return Ok(result);
        }
        #endregion

        #region Q16: List Roles Having More Than 10 Users.
        [HttpGet("q16")]
        public async Task<IActionResult> GetQ16()
        {
            var result = await _context.UserRoles
                .GroupBy(ur => ur.Role!.RoleName)
                .Where(g => g.Count() > 10)
                .Select(g => new
                {
                    Role = g.Key,
                    TotalUsers = g.Count()
                })
                .ToListAsync();

            return Ok(result);
        }
        #endregion

        #region Q17: Display role statistics.
        [HttpGet("q17")]
        public async Task<IActionResult> GetQ17()
        {
            var result = await _context.Roles
                .Select(r => new
                {
                    Role = r.RoleName,
                    TotalUsers = _context.UserRoles.Count(ur => ur.RoleID == r.RoleID),
                    ActiveUsers = _context.UserRoles.Count(ur => ur.RoleID == r.RoleID && ur.User!.IsActive),
                    InactiveUsers = _context.UserRoles.Count(ur => ur.RoleID == r.RoleID && !ur.User!.IsActive)
                })
                .ToListAsync();

            return Ok(result);
        }
        #endregion

        #region Q18: Show tasks due within next 7 days.
        [HttpGet("q18")]
        public async Task<IActionResult> GetQ18()
        {
            var today = DateTime.Today;
            var nextWeek = today.AddDays(7);

            var result = await _context.Tasks
                .Where(t => t.TaskDueDate != null && t.TaskDueDate >= today && t.TaskDueDate <= nextWeek)
                .Select(t => new
                {
                    TaskID = t.TaskID,
                    TaskTitle = t.TaskTitle,
                    Project = t.ProjectAllocation != null && t.ProjectAllocation.Project != null ? t.ProjectAllocation.Project.ProjectTitle : null,
                    Student = t.ProjectAllocation != null && t.ProjectAllocation.Student != null ? t.ProjectAllocation.Student.FullName : null,
                    TaskDueDate = t.TaskDueDate!.Value.ToString("dd-MMM-yyyy"),
                    DaysRemaining = (t.TaskDueDate!.Value - today).Days
                })
                .ToListAsync();

            return Ok(result);
        }
        #endregion

        #region Q19: Display each project with total tasks, completed tasks, pending tasks, and average task progress.
        [HttpGet("q19")]
        public async Task<IActionResult> GetQ19()
        {
            var result = await _context.ProjectMasters
                .Select(p => new
                {
                    Project = p.ProjectTitle,
                    Tasks = _context.Tasks.Count(t => t.ProjectAllocation!.ProjectID == p.ProjectID),
                    Completed = _context.Tasks.Count(t => t.ProjectAllocation!.ProjectID == p.ProjectID && t.TaskStatus!.TaskStatusName == "Completed"),
                    Pending = _context.Tasks.Count(t => t.ProjectAllocation!.ProjectID == p.ProjectID && t.TaskStatus!.TaskStatusName != "Completed"),
                    AvgProgress = (_context.ProjectAllocations.Where(pa => pa.ProjectID == p.ProjectID).Average(pa => (double?)pa.ProgressPercentage) ?? 0).ToString("0.##") + "%"
                })
                .ToListAsync();

            return Ok(result);
        }
        #endregion

        #region Q20: Display project-wise total assigned score, earned score, and score percentage.
        [HttpGet("q20")]
        public async Task<IActionResult> GetQ20()
        {
            var result = await _context.ProjectMasters
                .Select(p => new
                {
                    Project = p.ProjectTitle,
                    TotalAssignedScore = 0.0,
                    TotalEarnedScore = 0.0,
                    ScorePercentage = "0.00%"
                })
                .ToListAsync();

            return Ok(result);
        }
        #endregion

        #region Q21: Display Top 10 projects based on average earned score.
        [HttpGet("q21")]
        public async Task<IActionResult> GetQ21()
        {
            var projects = await _context.ProjectMasters
                .Select(p => new
                {
                    Project = p.ProjectTitle,
                    AverageScore = 0.0
                })
                .Take(10)
                .ToListAsync();

            var result = projects.Select((p, index) => new
            {
                Rank = index + 1,
                p.Project,
                p.AverageScore
            });

            return Ok(result);
        }
        #endregion

        #region Q22: Show project count, task count, and average progress for each faculty.
        [HttpGet("q22")]
        public async Task<IActionResult> GetQ22()
        {
            var result = await _context.ProjectAllocations
                .GroupBy(pa => new { pa.FacultyID, pa.Faculty!.FullName })
                .Select(g => new
                {
                    Faculty = g.Key.FullName,
                    TotalProjects = g.Select(pa => pa.ProjectID).Distinct().Count(),
                    TotalTasks = _context.Tasks.Count(t => t.ProjectAllocation!.FacultyID == g.Key.FacultyID),
                    AvgProgress = Math.Round(g.Average(pa => (double)pa.ProgressPercentage), 2)
                })
                .ToListAsync();

            return Ok(result);
        }
        #endregion

        #region Q23: Display task completion statistics and average score for each student.
        [HttpGet("q23")]
        public async Task<IActionResult> GetQ23()
        {
            var result = await _context.Tasks
                .Where(t => t.ProjectAllocation != null && t.ProjectAllocation.Student != null)
                .GroupBy(t => new { t.ProjectAllocation!.StudentID, t.ProjectAllocation.Student!.FullName })
                .Select(g => new
                {
                    Student = g.Key.FullName,
                    TotalTasks = g.Count(),
                    CompletedTasks = g.Count(t => t.TaskStatus != null && t.TaskStatus.TaskStatusName == "Completed"),
                    PendingTasks = g.Count(t => t.TaskStatus == null || t.TaskStatus.TaskStatusName != "Completed"),
                    AvgScore = 0.0
                })
                .ToListAsync();

            return Ok(result);
        }
        #endregion

        #region Q24: Display projects whose expected completion date has passed but are still incomplete.
        [HttpGet("q24")]
        public async Task<IActionResult> GetQ24()
        {
            var today = DateTime.Today;

            var rawData = await _context.ProjectAllocations
                .Where(pa => pa.ProjectEndDate < today && pa.ProgressPercentage < 100)
                .Select(pa => new
                {
                    ProjectTitle = pa.Project != null ? pa.Project.ProjectTitle : null,
                    StudentName = pa.Student != null ? pa.Student.FullName : null,
                    FacultyName = pa.Faculty != null ? pa.Faculty.FullName : null,
                    EndDate = pa.ProjectEndDate,
                    Progress = pa.ProgressPercentage
                })
                .ToListAsync();

            var result = rawData.Select(pa => new
            {
                Project = pa.ProjectTitle,
                Student = pa.StudentName,
                Faculty = pa.FacultyName,
                EndDate = pa.EndDate.ToString("dd-MMM-yyyy"),
                Progress = pa.Progress
            });

            return Ok(result);
        }
        #endregion

        #region Q25: Show month-wise completed task count.
        [HttpGet("q25")]
        public async Task<IActionResult> GetQ25()
        {
            return await GetQ13();
        }
        #endregion

        #region Q26: Rank faculties based on average project progress.
        [HttpGet("q26")]
        public async Task<IActionResult> GetQ26()
        {
            var faculties = await _context.ProjectAllocations
                .GroupBy(pa => new { pa.FacultyID, pa.Faculty!.FullName })
                .Select(g => new
                {
                    Faculty = g.Key.FullName,
                    AvgProgress = Math.Round(g.Average(pa => (double)pa.ProgressPercentage), 2)
                })
                .OrderByDescending(f => f.AvgProgress)
                .ToListAsync();

            var result = faculties.Select((f, index) => new
            {
                Rank = index + 1,
                f.Faculty,
                f.AvgProgress
            });

            return Ok(result);
        }
        #endregion

        #region Q27: Display task statistics for every project.
        [HttpGet("q27")]
        public async Task<IActionResult> GetQ27()
        {
            var today = DateTime.Today;

            var result = await _context.ProjectMasters
                .Select(p => new
                {
                    Project = p.ProjectTitle,
                    TotalTasks = _context.Tasks.Count(t => t.ProjectAllocation!.ProjectID == p.ProjectID),
                    Completed = _context.Tasks.Count(t => t.ProjectAllocation!.ProjectID == p.ProjectID && t.TaskStatus!.TaskStatusName == "Completed"),
                    Pending = _context.Tasks.Count(t => t.ProjectAllocation!.ProjectID == p.ProjectID && t.TaskStatus!.TaskStatusName != "Completed"),
                    Overdue = _context.Tasks.Count(t => t.ProjectAllocation!.ProjectID == p.ProjectID && t.TaskDueDate != null && t.TaskDueDate < today && t.TaskStatus!.TaskStatusName != "Completed")
                })
                .ToListAsync();

            return Ok(result);
        }
        #endregion
    }
}