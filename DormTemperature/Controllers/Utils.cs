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
    /// <summary>
    /// 温度节点结构定义
    /// <Author>秦贤康</Author>
    /// <returns>
    ///     timestamp:节点的时间戳
    ///     value:节点的温度
    /// </returns>
    /// </summary>
    public struct temperature_data_point
    {
        public string timestamp;
        public double value;
    }

    /// <summary>
    /// 供其他类调用的工具类
    /// </summary>
    public class Utils
    {

        public static string get_json(string url)
        {
            string result = "";

            
            try
            {
                System.Diagnostics.Debug.WriteLine(url);
                
                url=url.Replace('>', '&');
                HttpWebRequest httpRequest = (HttpWebRequest)WebRequest.Create(url);
                httpRequest.Timeout = 2000;
                httpRequest.Method = "GET";

                HttpWebResponse httpResponse = (HttpWebResponse)httpRequest.GetResponse();
                StreamReader sr = new StreamReader(httpResponse.GetResponseStream(), System.Text.Encoding.GetEncoding("gb2312"));
                result = sr.ReadToEnd();
                result = result.Replace("\r", "").Replace("\n", "").Replace("\t", "");
                int status = (int)httpResponse.StatusCode;
                sr.Close();

                //Response.Write(result);
                if (status == 200)      //如果成功获取到最新温度
                {
                    
                }
                else
                {
                    result = "";
                }
            }
            catch (Exception ex)
            {
                result = ex.ToString();
            }

            //Response.Write(t.timestamp+" "+t.value);
            return result;
        }

        /// <summary>
        /// 获取最新温度
        /// </summary>
        public static temperature_data_point get_latest_temp()
        {
            temperature_data_point t;
            string url = "http://api.yeelink.net/v1.0/device/346588/sensor/390045/datapoints";
            HttpWebRequest httpRequest = (HttpWebRequest)WebRequest.Create(url);
            httpRequest.Timeout = 2000;
            httpRequest.Method = "GET";
            try
            {
                HttpWebResponse httpResponse = (HttpWebResponse)httpRequest.GetResponse();
                StreamReader sr = new StreamReader(httpResponse.GetResponseStream(), System.Text.Encoding.GetEncoding("gb2312"));
                string result = sr.ReadToEnd();
                result = result.Replace("\r", "").Replace("\n", "").Replace("\t", "");
                int status = (int)httpResponse.StatusCode;
                sr.Close();

                //Response.Write(result);
                if (status == 200)      //如果成功获取到最新温度
                {
                    JObject jo = (JObject)JsonConvert.DeserializeObject(result);
                    t.timestamp = jo["timestamp"].ToString();
                    t.value = Convert.ToDouble(jo["value"].ToString());
                }
                else
                {
                    t.timestamp = "获取温度失败";
                    t.value = -274;
                }
            }
            catch (Exception)
            {
                t.timestamp = "获取温度失败";
                t.value = 1;
            }

            //Response.Write(t.timestamp+" "+t.value);
            return t;
        }
    }

        
}