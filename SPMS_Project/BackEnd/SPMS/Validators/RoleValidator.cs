using FluentValidation;
using SPMS.DTO.Role;

namespace SPMS.Validators
{
    public class RoleValidator : AbstractValidator<RoleDto>
    {
        public RoleValidator()
        {
            RuleFor(r => r.RoleName)

                // Name is mandatory
                .NotEmpty()
                .WithMessage("Role Name is required")

                // Name should not contain only whitespace characters
                .Must(rname => !string.IsNullOrWhiteSpace(rname))
                .WithMessage("Role Name cannot be empty or whitespace")

                // Name cannot contain numbers
                .Must(rname => !rname.Any(char.IsDigit))
                .WithMessage("Role Name cannot contain Digits")

                // Name length must not exceed 50 characters
                .MaximumLength(50)
                .WithMessage("Role Name cannot exceed 50 characters");

            RuleFor(r => r.Description)

                // Description length must not exceed 250 characters
                .MaximumLength(250)
                .WithMessage("Description cannot exceed 250 characters");
        }
    }
}
