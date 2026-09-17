using FluentValidation;
using SPMS.DTO.User;

namespace SPMS.Validators
{
    public class UserValidator : AbstractValidator<UserDto>
    {
        public UserValidator()
        {
            RuleFor(user => user.UserID)
                .GreaterThanOrEqualTo(1).WithMessage("User ID must be a valid positive integer.");

            RuleFor(user => user.UserTypeID)
                .NotEmpty().WithMessage("User Type is required.")
                .GreaterThan(0).WithMessage("Please select a valid User Type.");

            RuleFor(user => user.FullName)
                .NotEmpty().WithMessage("Full Name is required.")
                .MaximumLength(150).WithMessage("Full Name cannot exceed 150 characters.");

            RuleFor(user => user.UserCode)
                .MaximumLength(100).WithMessage("User Code cannot exceed 100 characters.")
                .When(user => !string.IsNullOrEmpty(user.UserCode));

            RuleFor(user => user.Email)
                .NotEmpty().WithMessage("Email address is required.")
                .MaximumLength(150).WithMessage("Email cannot exceed 150 characters.")
                .EmailAddress().WithMessage("Please enter a valid email address.");

            RuleFor(user => user.Password)
                .NotEmpty().WithMessage("Password is required.")
                .MinimumLength(8).WithMessage("Password must be at least 8 characters long.");

            RuleFor(user => user.MobileNumber)
                .NotEmpty().WithMessage("Mobile Number is required.")
                .MaximumLength(15).WithMessage("Mobile Number cannot exceed 15 characters.")
                .Matches(@"^\+?[0-9\s\-]+$").WithMessage("Please enter a valid mobile number format.");

            RuleFor(user => user.ProfilePicturePath)
                .NotEmpty().WithMessage("Profile picture path is required.")
                .MaximumLength(1000).WithMessage("Profile picture path cannot exceed 1000 characters.");

            RuleFor(user => user.DocumentPath)
                .MaximumLength(1000).WithMessage("Document path cannot exceed 1000 characters.")
                .When(user => !string.IsNullOrEmpty(user.DocumentPath));
        }
    }
}
