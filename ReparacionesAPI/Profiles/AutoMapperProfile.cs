namespace ReparacionesAPI.Profiles
{
    using AutoMapper;
    using ReparacionesAPI.DTOs;
    using ReparacionesAPI.Models;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Cliente, ClienteDTO>().ReverseMap();
            CreateMap<Cliente, CrearClienteDTO>().ReverseMap();

            CreateMap<Orden, OrdenDTO>().ReverseMap();
            CreateMap<Orden, CrearOrdenDTO>().ReverseMap();

            CreateMap<Reparacion, ReparacionDTO>().ReverseMap();
            CreateMap<Reparacion, CrearReparacionDTO>().ReverseMap();
        }
    }

}
