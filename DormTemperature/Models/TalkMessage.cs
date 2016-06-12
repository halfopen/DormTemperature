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
    public class TalkMessage
    {
        public int ID { get; set; }

        [Required]
        [Display(Name = "时间戳")]
        public DateTime timestamp { get; set; }

        [Required]
        [Display(Name = "用户名")]
        public string username { get; set; }

        [Display(Name="内容")]
        public string content { get; set; }
    }

    public class TalkMessageDbContext : DbContext
    {
        public DbSet<TalkMessage> Messages { get; set; }
    }
}