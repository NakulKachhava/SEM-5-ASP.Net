using FluentValidation;
using SPMS.DTO.ProjectAllocation;

namespace SPMS.Validators
{
    public class ProjectAllocationValidator : AbstractValidator<ProjectAllocationDto>
    {
        public ProjectAllocationValidator()
        {
            // Foreign Keys
            RuleFor(x => x.ProjectID)
                .GreaterThan(0)
                .WithMessage("Project is required.");

            RuleFor(x => x.StudentID)
                .GreaterThan(0)
                .WithMessage("Student is required.");

            RuleFor(x => x.FacultyID)
                .GreaterThan(0)
                .WithMessage("Faculty is required.");


            // Dates
            RuleFor(x => x.AssignedDate)
                .NotEmpty()
                .WithMessage("Assigned date is required.");

            RuleFor(x => x.ProjectStartDate)
                .NotEmpty()
                .WithMessage("Project start date is required.");

            RuleFor(x => x.ProjectEndDate)
                .NotEmpty()
                .WithMessage("Project end date is required.");

            RuleFor(x => x.ProjectEndDate)
                .GreaterThanOrEqualTo(x => x.ProjectStartDate)
                .WithMessage("Project end date must be greater than or equal to the project start date.");

            RuleFor(x => x.ProjectStartDate)
                .GreaterThanOrEqualTo(x => x.AssignedDate)
                .WithMessage("Project start date must be greater than or equal to the assigned date.");


            // Task Counts
            RuleFor(x => x.TotalTasksGiven)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Total tasks given cannot be negative.");

            RuleFor(x => x.TotalCompletedTasks)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Total completed tasks cannot be negative.");

            RuleFor(x => x.TotalCompletedTasks)
                .LessThanOrEqualTo(x => x.TotalTasksGiven)
                .WithMessage("Total completed tasks cannot exceed total tasks given.");


            // Progress
            RuleFor(x => x.ProgressPercentage)
                .InclusiveBetween(0, 100)
                .WithMessage("Progress percentage must be between 0 and 100.");


            // Overall Grade
            RuleFor(x => x.OverAllGrade)
                .MaximumLength(1)
                .WithMessage("Overall grade must be a single character.")
                .When(x => !string.IsNullOrWhiteSpace(x.OverAllGrade));
        }
    }
}