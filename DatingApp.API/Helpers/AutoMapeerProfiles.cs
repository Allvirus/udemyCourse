using AutoMapper;
using DatingApp.API.Model;
using DatingApp.API.Dtos;
using System.Linq;

namespace DatingApp.API.Helpers
{
    //预设AutoMapper映射类
    public class AutoMapeerProfiles : Profile
    {
        public AutoMapeerProfiles()
        {

            //配置photo Url映射
            CreateMap<User, UserForListDto>()
            .ForMember(dest => dest.PhotoUrl, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            })
            .ForMember(dest => dest.Age, opt =>
            {
                opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
            });
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            })
            .ForMember(dest => dest.Age, opt =>
            {
                opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
            });

            CreateMap<Photo, PhotoForDetailDto>();

            CreateMap<UserForUpdateDto, User>();

            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();

            CreateMap<UserForRegisterDto, User>();

            CreateMap<MessageForCreationDto,Message>().ReverseMap();

            CreateMap<Message,MessageToReturnDto>()
                .ForMember(m => m.SenderPhotoUrl,opt => opt
                    .MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(m => m.RecipientPhotoUrl,opt => opt
                    .MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));
        }
    }
}