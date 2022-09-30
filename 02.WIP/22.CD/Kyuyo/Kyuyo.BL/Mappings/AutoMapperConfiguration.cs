using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.BL.Mappings
{
    public class AutoMapperConfiguration
    {
        public static void Configure()
        {
            Mapper.Initialize(x =>
            {
                x.AddProfile<EntityToDTOMappingProfile>();
                x.AddProfile<DTOToEntityMappingProfile>();
                x.AddProfile<StoredResultToDTOMappingProfile>();
                x.CreateMap<string, string>().ConvertUsing(s => string.IsNullOrEmpty(s) ? null : s);
            });
        }
    }
}