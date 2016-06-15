# DormTemperature
## C charp大作业
### 题目:宿舍温度检测系统

![index](https://raw.githubusercontent.com/halfopen/DormTemperature/master/DispPic/1.png)

| 组员        | 学号           |分工            | 
| ----------- |:--------------:|:--------------:|
| 秦贤康      | 2013301500100  |编码			|
| 郭晓鹏      | 2013301500114  |测试			|
| 王尧        | 2013301500101  |设计			|
## 1 系统设计

### 1.1 实验目的

能够使用已学到的数据库的知识开发一个完整的系统。能够从数据库系统的角度详细分析并讨论系统的设计。<br/>
通过该实验学会从数据库设计、查询性能、系统维护、备份方案设计等各 方面对整个系统进行分析和考虑。<br/>
增加了对C#的了解，提高自己的动手编程能力。

### 1.2 平台

- 项目框架：asp.net mvc 4.0
- 开发工具: vs2010
- 数据库管理系统：sql express
- 硬件:<br/>
1、树莓派（Raspberry Pi）一个<br/>
2、DS18B20温度传感器一个（淘宝大概5元左右）<br/>
- 使用了：
- python 
- git, pip, bootstrap, jquery


## 2 功能说明

基本功能如下<br/>

- 【温度采集】用嵌入式设备配合传感器实时上传温度到公网服务器
- 【室友交流】简单的用户系统，室友登录，发评论
- 【后台管理】对评论进行更新编辑等
- 【位置定位】查看宿舍信息

### 2.1 温度采集
#### 用嵌入式设备配合传感器实时上传温度到公网服务器


采集温度脚本 

    def read_temp_raw():
        #os.system('modprobe w1-gpio')
        #os.system('modprobe w1-therm')
     
        base_dir = '/sys/bus/w1/devices/'
        device_folder = glob.glob(base_dir + '28*')[0]
        device_file = device_folder + '/w1_slave'
    	
        f = open(device_file, 'r')
        lines = f.readlines()
        f.close()
        return lines
    
    def read_temp():
        lines = read_temp_raw()
        while lines[0].strip()[-3:] != 'YES':
            time.sleep(0.2)
            lines = read_temp_raw()
        equals_pos = lines[1].find('t=')
        if equals_pos != -1:
            temp_string = lines[1][equals_pos+2:]
            temp_c = float(temp_string) / 1000.0
            return temp_c


![pi](https://raw.githubusercontent.com/halfopen/DormTemperature/master/DormTemperature/Images/d1.JPG)

树莓派控制台
![console](https://raw.githubusercontent.com/halfopen/DormTemperature/master/DispPic/pi.png)
采集一定量的数据之后，进行批量上传<br/>
数据点格式为:<br/>
{timestamp:时间戳, value:温度}

图表显示可以选择所有，一年内，最近三个月，最近一个小时的温度数据等
![chart](https://raw.githubusercontent.com/halfopen/DormTemperature/master/DispPic/2.png)


### 2.2 室友交流
#### 简单的用户系统，室友登录，发评论
用户功能<br/>
登录
![login](https://raw.githubusercontent.com/halfopen/DormTemperature/master/DispPic/4.png)
注册
![register](https://raw.githubusercontent.com/halfopen/DormTemperature/master/DispPic/8.png)
更改密码
![passwords](https://raw.githubusercontent.com/halfopen/DormTemperature/master/DispPic/7.png)
登录之后可以进行简单的评论
![comment](https://raw.githubusercontent.com/halfopen/DormTemperature/master/DispPic/6.png)

### 2.3 后台管理
#### 对评论进行更新编辑等
利用mvc4自带的模板对评论进行操作，需要进行登录
![edit-comments](https://raw.githubusercontent.com/halfopen/DormTemperature/master/DispPic/5.png)

### 2.4 位置定位 
#### 百度地图api调用
![map](https://raw.githubusercontent.com/halfopen/DormTemperature/master/DispPic/3.png)
后期考虑加入图片实时拍照上传


## 3实验体会

本大作业前端代码套用的是我以前在自强后台写代码的模板，之前也被我用在大型应用软件，javaee大作业中。
![javaee](https://raw.githubusercontent.com/halfopen/java_ee_work/master/screen-shot.png)
![online-meal](https://raw.githubusercontent.com/halfopen/OlineOrderMealSystem/master/1.png)
可以说没在在前端花大多的时间<br/>
js代码是全部重写的，在此过程中了解到了js跨域jsonp解决方案<br/>
c#由于之前没接触过，在学习过程中遇到了很多问题。<br/>
在完成这个作业的过程中，大家都学到了很多。<br/>
在实际使用过程中，发现一个有趣的现象:其实宿舍不开门的话，虽然可以看出早晨5、6点左右温度最低，但是上下温差不超过一度，可以说是基本恒温的。
