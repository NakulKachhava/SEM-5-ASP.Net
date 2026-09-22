using FluentValidation;
using SPMS.DTO.ProjectMaster;

namespace SPMS.Validators
{
    public class SPM_ProjectMasterValidator : AbstractValidator<ProjectMasterDto>
    {
        public SPM_ProjectMasterValidator()
        {
            RuleFor(x => x.ProjectTitle)
                .NotEmpty()
                .WithMessage("Project title is required.")
                .MaximumLength(200)
                .WithMessage("Project title cannot exceed 200 characters.");

            RuleFor(x => x.Description)
                .MaximumLength(500)
                .WithMessage("Description cannot exceed 500 characters.")
                .When(x => !string.IsNullOrWhiteSpace(x.Description));
        }
    }
}