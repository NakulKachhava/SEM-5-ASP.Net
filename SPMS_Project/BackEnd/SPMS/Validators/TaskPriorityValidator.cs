using FluentValidation;
using SPMS.DTO.TaskPriority;

namespace SPMS.Validators
{
    public class SPM_TaskPriorityValidator : AbstractValidator<TaskPriorityDto>
    {
        public SPM_TaskPriorityValidator()
        {
            RuleFor(x => x.TaskPriorityName)
                .NotEmpty()
                .WithMessage("Task priority name is required.")
                .MaximumLength(20)
                .WithMessage("Task priority name cannot exceed 20 characters.");

            RuleFor(x => x.TaskPriorityCssClass)
                .NotEmpty()
                .WithMessage("Task priority CSS class is required.")
                .MaximumLength(20)
                .WithMessage("Task priority CSS class cannot exceed 20 characters.");
        }
    }
}