﻿using AutoMapper;
using Domain.Dto;
using Domain.Dtos;
using Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Repository.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Utility;

namespace Repository.Repository.Services
{
    internal sealed class UserAuthenticationRepository : IUserAuthenticationRepository
    {
        private readonly UserManager<User> _userManager;
        RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private User? _user;

        public UserAuthenticationRepository(RoleManager<IdentityRole> roleManager, UserManager<User> userManager, IConfiguration configuration, IMapper mapper)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _configuration = configuration;
            _mapper = mapper;
        }

        public async Task<IdentityResult> RegisterUserAsync(UserRegistrationDto userRegistration)
        {
            var user = _mapper.Map<User>(userRegistration);
            user.RegistrationSecret = userRegistration.Secret;

            if (userRegistration.Roles == null)
                userRegistration.Roles = new List<string> { SD.Role_Customer };

            var result = await _userManager.CreateAsync(user, userRegistration.Password);
            if (result.Succeeded)
                await _userManager.AddToRolesAsync(user, userRegistration.Roles);

            return result;
        }

        public async Task<UserInfoDto> ValidateUserAsync(UserLoginDto loginDto)
        {

            _user = await _userManager.FindByEmailAsync(loginDto.Email!);
            var result = _user != null && await _userManager.CheckPasswordAsync(_user, loginDto.Password!);

			if (!result || _user == null)
				return new UserInfoDto { ErrorMessage = "Невірні облікові дані" };
			var roles = await _userManager.GetRolesAsync(_user);
			if (!(roles.Contains(SD.Role_Admin) || roles.Contains(SD.Role_Pharmacist) || roles.Contains(SD.Role_PharmaCompany)))
            {

				if (!_user.EmailConfirmed)
					return new UserInfoDto { ErrorMessage = "Ви не підтвердили свою електронну адресу" };
			}
			if (_user.LockoutEnd.HasValue && _user.LockoutEnd > DateTimeOffset.UtcNow)
				return new UserInfoDto { ErrorMessage = "Ваш аккаунт заблоковано" };


			return new UserInfoDto { Email = _user!.Email, };
        }
        public async Task<UserInfoDto> ValidateExternalUserAsync(UserLoginDto loginDto)
        {

            _user = await _userManager.FindByEmailAsync(loginDto.Email!);

            if (_user != null && _user.LockoutEnd.HasValue && _user.LockoutEnd > DateTimeOffset.UtcNow && _user.EmailConfirmed == true)
                return null;

            return new UserInfoDto { Email = _user!.Email, };
        }

        public async Task<string> CreateTokenAsync()
        {
            var signingCredentials = GetSigningCredentials();
            var claims = await GetClaims();
            var tokenOptions = GenerateTokenOptions(signingCredentials, claims);

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }

        public async Task<bool> ConfirmEmailAsync(string secret, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user != null && user.RegistrationSecret == secret)
            {
                user.EmailConfirmed = true;
                var result = await _userManager.UpdateAsync(user);
                return result.Succeeded;
            }

            return false;
        }

        public async Task<IdentityResult> ChangePasswordAsync(string email, string currentPassword, string newPassword)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "User not found." });
            }

            var result = await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);

            return result;
        }
        public async Task<IdentityResult> ChangePasswordAsync(string email, string newPassword)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "User not found." });
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var result = await _userManager.ResetPasswordAsync(user, token, newPassword);

            return result;
        }

        private SigningCredentials GetSigningCredentials()
        {
            var jwtConfig = _configuration.GetSection("JwtConfig");
            var key = Encoding.UTF8.GetBytes(jwtConfig["secret"]);
            var secret = new SymmetricSecurityKey(key);

            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private async Task<List<Claim>> GetClaims()
        {
            var claims = new List<Claim> { new Claim(ClaimTypes.Name, _user!.UserName!) };
            var roles = await _userManager.GetRolesAsync(_user);
            foreach (var role in roles)
                claims.Add(new Claim(ClaimTypes.Role, role));

            return claims;
        }

        private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
        {
            var jwtSettings = _configuration.GetSection("JwtConfig");
            var tokenOptions = new JwtSecurityToken
            (
            issuer: jwtSettings["validIssuer"],
            audience: jwtSettings["validAudience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings["expiresIn"])),
            signingCredentials: signingCredentials
            );
            return tokenOptions;
        }

    }
}
