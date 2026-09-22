using FluentValidation;
using SPMS.DTO.Task;

namespace SPMS.Validators
{
    public class SPM_TaskValidator : AbstractValidator<TaskDto>
    {
        public SPM_TaskValidator()
        {
            // Foreign Keys
            RuleFor(x => x.ProjectAllocationID)
                .GreaterThan(0)
                .WithMessage("Project allocation is required.");

            RuleFor(x => x.TaskStatusID)
                .GreaterThan(0)
                .WithMessage("Task status is required.");

            RuleFor(x => x.TaskPriorityID)
                .GreaterThan(0)
                .WithMessage("Task priority is required.");


            // Task Title
            RuleFor(x => x.TaskTitle)
                .NotEmpty()
                .WithMessage("Task title is required.")
                .MaximumLength(200)
                .WithMessage("Task title cannot exceed 200 characters.");


            // Task Description
            RuleFor(x => x.TaskDescription)
                .MaximumLength(500)
                .WithMessage("Task description cannot exceed 500 characters.")
                .When(x => !string.IsNullOrWhiteSpace(x.TaskDescription));


            // Scores
            RuleFor(x => x.AssignedScore)
                .InclusiveBetween(0, 100)
                .WithMessage("Assigned score must be between 0 and 100.");

            RuleFor(x => x.EarnedScore)
                .InclusiveBetween(0, 100)
                .WithMessage("Earned score must be between 0 and 100.")
                .When(x => x.EarnedScore.HasValue);


            // Progress
            RuleFor(x => x.ProgressPercentage)
                .InclusiveBetween(0, 100)
                .WithMessage("Progress percentage must be between 0 and 100.");


            // Dates
            RuleFor(x => x.TaskAssignedDate)
                .NotEmpty()
                .WithMessage("Task assigned date is required.");

            RuleFor(x => x.TaskStartDate)
                .GreaterThanOrEqualTo(x => x.TaskAssignedDate)
                .WithMessage("Task start date cannot be earlier than the assigned date.")
                .When(x => x.TaskStartDate.HasValue);

            RuleFor(x => x.TaskDueDate)
                .GreaterThanOrEqualTo(x => x.TaskStartDate)
                .WithMessage("Task due date cannot be earlier than the task start date.")
                .When(x => x.TaskDueDate.HasValue && x.TaskStartDate.HasValue);

            RuleFor(x => x.TaskDueDate)
                .GreaterThanOrEqualTo(x => x.TaskAssignedDate)
                .WithMessage("Task due date cannot be earlier than the assigned date.")
                .When(x => x.TaskDueDate.HasValue);

            RuleFor(x => x.TaskCompletedDate)
                .GreaterThanOrEqualTo(x => x.TaskStartDate)
                .WithMessage("Task completed date cannot be earlier than the task start date.")
                .When(x => x.TaskCompletedDate.HasValue && x.TaskStartDate.HasValue);

            RuleFor(x => x.TaskCompletedDate)
                .GreaterThanOrEqualTo(x => x.TaskAssignedDate)
                .WithMessage("Task completed date cannot be earlier than the assigned date.")
                .When(x => x.TaskCompletedDate.HasValue);

            RuleFor(x => x.TaskCompletedDate)
                .LessThanOrEqualTo(x => x.TaskDueDate)
                .WithMessage("Task completed date cannot be later than the task due date.")
                .When(x => x.TaskCompletedDate.HasValue && x.TaskDueDate.HasValue);

            RuleFor(x => x.NextFollowUpDate)
                .GreaterThanOrEqualTo(x => x.TaskAssignedDate)
                .WithMessage("Next follow-up date cannot be earlier than the assigned date.")
                .When(x => x.NextFollowUpDate.HasValue);


            // Remarks
            RuleFor(x => x.FacultyRemarks)
                .MaximumLength(500)
                .WithMessage("Faculty remarks cannot exceed 500 characters.")
                .When(x => !string.IsNullOrWhiteSpace(x.FacultyRemarks));

            RuleFor(x => x.StudentRemarks)
                .MaximumLength(500)
                .WithMessage("Student remarks cannot exceed 500 characters.")
                .When(x => !string.IsNullOrWhiteSpace(x.StudentRemarks));
        }
    }
}