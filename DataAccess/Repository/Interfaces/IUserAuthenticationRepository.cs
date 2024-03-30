using Domain.Dto;
using Domain.Dtos;
using Domain.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repository.Interfaces
{
    public interface IUserAuthenticationRepository
    {
        Task<IdentityResult> RegisterUserAsync(UserRegistrationDto userForRegistration);
        Task<UserInfoDto> ValidateUserAsync(UserLoginDto loginDto);
        Task<string> CreateTokenAsync();
        Task<bool> ConfirmEmailAsync(string email);
        Task<IdentityResult> ChangePasswordAsync(string email, string currentPassword, string newPassword);
    }
}
