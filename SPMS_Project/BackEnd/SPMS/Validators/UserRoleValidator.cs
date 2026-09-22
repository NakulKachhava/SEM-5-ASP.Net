using FluentValidation;
using SPMS.DTO.UserRole;

namespace SPMS.Validators
{
    public class UserRoleValidator : AbstractValidator<UserRoleDto>
    {
        public UserRoleValidator()
        {
            RuleFor(x => x.RoleID)
                .GreaterThan(0)
                .WithMessage("Role is required.");

            RuleFor(x => x.UserID)
                .GreaterThan(0)
                .WithMessage("User is required.");
        }
    }
}