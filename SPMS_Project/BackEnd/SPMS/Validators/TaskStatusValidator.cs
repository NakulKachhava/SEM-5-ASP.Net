using FluentValidation;
using SPMS.DTO.TaskStatus;

namespace SPMS.Validators
{
    public class SPM_TaskStatusValidator : AbstractValidator<TaskStatusDto>
    {
        public SPM_TaskStatusValidator()
        {
            RuleFor(x => x.TaskStatusName)
                .NotEmpty()
                .WithMessage("Task status name is required.")
                .MaximumLength(20)
                .WithMessage("Task status name cannot exceed 20 characters.");

            RuleFor(x => x.TaskStatusCssClass)
                .NotEmpty()
                .WithMessage("Task status CSS class is required.")
                .MaximumLength(100)
                .WithMessage("Task status CSS class cannot exceed 100 characters.");
        }
    }
}