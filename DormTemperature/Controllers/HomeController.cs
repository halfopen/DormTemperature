using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;
using System.IO;
using Newtonsoft.Json.Linq; //json
using System.Web.Script.Serialization;
using Newtonsoft.Json;


namespace DormTemperature.Controllers
{
    public class HomeController : Controller
    {

        

        /// <summary>
        /// 首页
        /// </summary>
        public ActionResult Index()
        {
            

            temperature_data_point latest_temp = Utils.get_latest_temp();

            ViewBag.Message = "欢迎宿舍温度监测系统!--最新温度:" + latest_temp.value + "℃ 更新时间:" + latest_temp.timestamp;

            return View(latest_temp);
        }

        public ActionResult About()
        {
            ViewBag.Message = "你的应用程序说明页。";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "你的联系方式页。";

            return View();
        }

        public ActionResult Author()
        {
            ViewBag.Message = "作者信息";
            return View();
        }

        public ActionResult DormInfo()
        {
            ViewBag.Message = "查看宿舍信息";

            temperature_data_point latest_temp = Utils.get_latest_temp();

            ViewBag.timestamp = latest_temp.timestamp;
            ViewBag.value = latest_temp.value;
            return View();
        }

        public string GetJson(string url)
        {
            return Utils.get_json(url);
        }
    }
}
