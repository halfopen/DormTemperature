# DormTemperature
##C charp大作业
###题目:宿舍温度检测系统

![index](https://raw.githubusercontent.com/halfopen/DormTemperature/master/DispPic/1.png)

| 组员        | 学号           | 
| ----------- |:--------------:|
| 秦贤康      | 2013301500100  |
| 郭晓鹏      | 2013301500114  |
| 王尧        | 2013301500101  |
##1 系统设计

###1.1 实验目的

能够使用已学到的数据库的知识开发一个完整的系统。能够从数据库系统的角度详细分析并讨论系统的设计。通过该实验学会从数据库设计、查询性能、系统维护、备份方案设计等各 方面对整个系统进行分析和考虑。增加对C#的了解，提高自己的动手编程能力。

###1.2 平台

- 项目框架：asp.net mvc 4.0
- 数据库管理系统：sql express
- 硬件:
1、树莓派（Raspberry Pi）一个<br/>
2、DS18B20温度传感器一个（淘宝大概5元左右）<br/>
- 使用了：
- python 
- git, pip, bootstrap, jquery


##2 功能说明

基本功能如下
-【温度采集】用嵌入式设备配合传感器实时上传温度到公网服务器
-【室友交流】简单的用户系统，室友登录，发评论
-【后台管理】对评论进行更新编辑等
-【位置定位】

###2.1 温度采集
####用嵌入式设备配合传感器实时上传温度到公网服务器
利用树莓派，使用DS18b20温度传感器模块，每过2分钟进行一次采样，上传温度数据到服务器
![soft](https://raw.githubusercontent.com/halfopen/DormTemperature/master/DormTemperature/Images/d1.JPG)
树莓派控制台
![soft](https://raw.githubusercontent.com/halfopen/DormTemperature/master/DormTemperature/Images/pi.JPG)

图表显示可以选择所有，一年内，最近三个月，最近一个小时的温度数据等
![index](https://raw.githubusercontent.com/halfopen/DormTemperature/master/DispPic/2.png)


###2.2 室友交流
####简单的用户系统，室友登录，发评论
用户功能
登录
![index](https://raw.githubusercontent.com/halfopen/DormTemperature/master/DispPic/4.png)
注册
![index](https://raw.githubusercontent.com/halfopen/DormTemperature/master/DispPic/8.png)
更改密码
![index](https://raw.githubusercontent.com/halfopen/DormTemperature/master/DispPic/7.png)
登录之后可以进行简单的评论
![index](https://raw.githubusercontent.com/halfopen/DormTemperature/master/DispPic/6.png)

###2.3 后台管理
####对评论进行更新编辑等
利用mvc4自带的模板对评论进行操作，需要进行登录
![index](https://raw.githubusercontent.com/halfopen/DormTemperature/master/DispPic/5.png)

###2.4 位置定位 
####百度地图api调用
![index](https://raw.githubusercontent.com/halfopen/DormTemperature/master/DispPic/3.png)


##3实验体会

本大作业前端代码套用的是我以前在自强后台写代码的模板，之前也被我用在大型应用软件，javaee大作业中。
![javaee](https://raw.githubusercontent.com/halfopen/java_ee_work/master/screen-shot.png)
![soft](https://raw.githubusercontent.com/halfopen/OlineOrderMealSystem/master/1.png)
可以说没在在前端花大多的时间
js代码是全部重写的，在此过程中了解到了js跨域jsonp解决方案
在完成这个作业的过程中，大家都学到了很多。
