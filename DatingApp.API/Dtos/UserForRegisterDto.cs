using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required(ErrorMessage = "用户名为必填项")]
        public string Username { get; set; }
        [Required(ErrorMessage = "密码为必填项")]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "你的密码必须设置在4-8位")]
        public string Password { get; set; }
    }
}