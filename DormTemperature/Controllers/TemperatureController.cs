using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace DormTemperature.Controllers
{
    public class TemperatureController : Controller
    {

        public ActionResult showTemperature()
        {
            ViewBag.Message = "查看温度变化";

            temperature_data_point latest_temp = Utils.get_latest_temp();

            ViewBag.timestamp = latest_temp.timestamp;
            ViewBag.value = latest_temp.value;

            ViewBag.json = Utils.get_json("http://www.yeelink.net/user/chart_data_v2?sensor=390045&time=profile");

            return View();
        }

    }
}
