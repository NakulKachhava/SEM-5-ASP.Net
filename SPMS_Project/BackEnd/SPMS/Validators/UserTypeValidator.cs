using FluentValidation;
using SPMS.DTO.UserType;

namespace SPMS.Validators
{
    public class UserTypeValidator : AbstractValidator<UserTypeDto>
    {
        public UserTypeValidator()
        {
            RuleFor(type => type.UserTypeID)
                .GreaterThanOrEqualTo(0).WithMessage("User Type ID must be a valid positive integer.");

            RuleFor(type => type.UserTypeName)
                .NotEmpty().WithMessage("User Type Name is required.")
                .MaximumLength(50).WithMessage("User Type Name cannot exceed 50 characters.");

            RuleFor(type => type.Description)
                .MaximumLength(250).WithMessage("Description cannot exceed 250 characters.")
                .When(type => !string.IsNullOrEmpty(type.Description));
        }
    }
}
