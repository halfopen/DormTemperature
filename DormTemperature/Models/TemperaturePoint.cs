using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Web.Mvc;
using System.Web.Security;

namespace DormTemperature.Models
{
    public class TemperaturePoint
    {
        public int ID { get; set; }

        [Required]
        [Display(Name = "时间戳")]
        public DateTime  timestamp{get;set;}

        [Required]
        [Display(Name = "温度值")]
        public double value{get;set;}
    }

    public class MessagetDbContext : DbContext
    {
        public DbSet<TemperaturePoint> TemperaturePoints { get; set; }
    }
}