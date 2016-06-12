
var api_host = "../../Home/GetJson?url=http://www.yeelink.net";
    //每个传感器画一个chart
	var data_chart = new Array();
	//每个传感器判定是否重新加载数据
	var ischange = new Array();
	//每个传感器的数据
	var chart_data = new Array();
	//画图表
	function drawDataChart(chart_id) {
		ischange[chart_id] = false;
		//第一次加载数据，默认选中最近的1天显示
		$.ajax({
			url: api_host+'/user/chart_data_v2?sensor=' + chart_id + '>time=profile',
			type: 'GET',
			async: true,
			dataType: 'json',
			success: function(data, textStatus)
			{
				var now = Date.parse(new Date()) + 8 * 3600 * 1000;
				if(data.length == 0)
				{
					var begin = (1325347200 + 8 * 3600) * 1000;
					data=[[begin, 0], [now, 0]];
				}
				//$('#test').html(data[0].toString());
				data_chart[chart_id] = new Highcharts.StockChart({
					 chart: {
						renderTo: 'data_chart' + chart_id
					 },
					 credits: {
            		 	enabled: false
        			 },
					 tooltip: {
						formatter: function() {
							var s = Highcharts.dateFormat('%Y年%m月%d日 %H:%M:%S', this.x);
			
							$.each(this.points, function(i, point) {
								s += '<br/><b>数值： '+ point.y + ' ' + $("#data_chart" + chart_id).attr("unit") + ' </b>';
							});
						
							return s;
						}
					},
					
					 rangeSelector: {
						selected: 0,
						buttons: [
							{
								type: 'minute',
								count: 60,
								text: '1h'
							},{
								type: 'minute',
								count: 180,
								text: '3h'
							},{
								type: 'minute',
								count: 780,
								text: '12h'
							},{
								type: 'day',
								count: 1,
								text: '1d'
							},{
								type: 'day',
								count: 3,
								text: '3d'
							},{
								type: 'week',
								count: 1,
								text: '1w'
							},{
								type: 'month',
								count: 1,
								text: '1m'
							},{
								type: 'month',
								count: 3,
								text: '3m'
							},{
								type: 'month',
								count: 6,
								text: '6m'
							},{
								type: 'year',
								count: 1,
								text: '1y'
							},{
								type: 'all',
								text: 'All'
							}],
							inputEnabled: false
					 },
					 xAxis: {
						events: {
							setExtremes: function(e) {
								if(ischange[chart_id] == false)
								{
									e.max = Math.floor(e.max/1000) - 8 * 3600;
									e.min = Math.floor(e.min/1000) - 8 * 3600;
									
									var unixTimestamp = new Date(e.max * 1000);
									var time2 = new Date(e.min * 1000);
									//$('#test').html(unixTimestamp.toLocaleString());
									//$('#test2').html(time2.toLocaleString());
									
									var time_interval = (e.max - e.min)/3600;
									//alert(time_interval);

									if(time_interval <= 1)
									{
										req_1hr(chart_id, chart_data[chart_id], e.max, e.min);
									}
									if(1 < time_interval && time_interval <= 3)
									{
										req_3hrs(chart_id, chart_data[chart_id], e.max, e.min);
									}
									if(3 < time_interval && time_interval <= 12)
									{
										req_12hrs(chart_id, chart_data[chart_id], e.max, e.min);
									}
									if(12 < time_interval && time_interval <= 24)
									{
										req_1day(chart_id, chart_data[chart_id], e.max, e.min);
									}
									if(24 < time_interval && time_interval <= 72)
									{
										req_3days(chart_id, chart_data[chart_id], e.max, e.min);
									}
									if(72 < time_interval && time_interval <= 168)
									{
										req_1week(chart_id, chart_data[chart_id], e.max, e.min);
									}
									if(168 < time_interval && time_interval <= 720)
									{
										req_30days(chart_id, chart_data[chart_id], e.max, e.min);
									}
									if(720 < time_interval && time_interval <= 2160)
									{
										req_3mths(chart_id, chart_data[chart_id], e.max, e.min);
									}
									if(2160 < time_interval && time_interval <= 4320)
									{
										req_6mths(chart_id, chart_data[chart_id], e.max, e.min);
									}
									if(4320 < time_interval)
									{
										req_1year(chart_id, chart_data[chart_id], e.max, e.min);
									}									
								}
								else
								{
									ischange[chart_id] = false;
								}
							}
						},
						type:"datetime",
						tickPixelInterval : 150,
						ordinal: false,
						dateTimeLabelFormats: {
							second: '%Y年%m月%d日 %H:%M:%S',
							minute: '%Y年%m月%d日 %H:%M',
							hour: '%Y年%m月%d日 %H:%M',
							day: '<strong>%Y年%m月%d日</strong>',
							week: '%Y年%m月%d日',
							month: '<strong>%Y年%m</strong>',
							year: '<strong>%Y</strong>'
            			}
					 },
					 yAxis: {
						showLastLabel: true
					 },
					 series: [{
						name: 'Data Value',
						data: data,
						tooltip:{
							valueDecimals: 2
						}
					 }],
			 		 plotOptions: {
						 line: {
							 dataGrouping: {
								 enabled: false
							 }
						 }
					 }
			    });
				
				//加载最近一小时的详细数
				req_detial(chart_id, data);
			},
			
			error: function (data, textStatus)
			{
				console.log("Net Error");
			}
		});
		
	}
	
	//获取最近一小时详细数据加载
	function req_detial(chart_id, old_data)
	{
		var new_data = [];
		var end = Date.parse(new Date());
		var begin = end/1000 - 3600;
		end = end/1000;
		$.ajax({
			url: api_host+'/user/chart_data_v2?sensor=' + chart_id + '>time=1hr>begin=' + begin + '>end=' + end,
			type: 'GET',
			async: true,
			dataType: 'json',
			success: function(data, textStatus)
			{
				
				//$('#test').html(data.toString());
				//$('#test2').html(old_data.toString());
				
				new_data = create_new_data(old_data, data);
				chart_data[chart_id] =  new_data;
				ischange[chart_id] = true;
				data_chart[chart_id].series[0].setData(new_data);
				ischange[chart_id] = false;
				
			},
			
			error: function(data, textStatus)
			{
				console.log("Net Error");	
			}
		});		
	}
	
	//生成新数据
	function create_new_data(old_data, data)
	{
		
		function cmp(a, b)
		{
			return a[0] - b[0];	
		}
		
		var new_data = [];
		var flag_begin = 0;
		var flag_end = 0;
		if(data.length != 0)
		{
			for(var i = 0; i < old_data.length; i ++)
			{
				if(old_data[i][0] > data[0][0])
				{
					flag_begin = i;
					break;
				}
				if(flag_begin == 0)
				{
					flag_begin = old_data.length - 1; 
				}
			}
			for(var i = 0; i < old_data.length; i ++)
			{
				if(old_data[i][0] > data[data.length - 1][0])
				{
					flag_end = i;
					break;
				}
				if(i == old_data.length - 1)
				{
					flag_end = old_data.length -1;
				}
			}
			//alert(flag_begin);
			//删除
			old_data.splice(flag_begin, flag_end - flag_begin);
			//连接
			//alert(old_data.length);
			new_data = old_data.concat(data);
			//alert(new_data.length);
			//排序
			new_data = new_data.sort(cmp);
			return new_data;
		}
		new_data = old_data;
		return new_data;
	}
	
	
	
	
	//根据层级获取某一特定时间段的data
	//1hr
	function req_1hr(chart_id, old_data, max_time, min_time)
	{
		$.ajax({
			url: api_host+'/user/chart_data_v2?sensor=' + chart_id + '>time=1hr>begin=' + min_time + '>end=' + max_time,
			type: 'GET',
			async: true,
			dataType: 'json',
			success: function(data, textStatus)
			{
				new_data = create_new_data(old_data, data);
				chart_data[chart_id] = new_data;
				ischange[chart_id] = true;
				data_chart[chart_id].series[0].setData(new_data);
				ischange[chart_id] = false;
			},
			
			error: function(data, textStatus)
			{
				console.log("Net Error");	
			}
		});	
	}
	
	//3hrs
	function req_3hrs(chart_id, old_data, max_time, min_time)
	{
		$.ajax({
			url: api_host+'/user/chart_data_v2?sensor=' + chart_id + '>time=3hrs>begin=' + min_time + '>end=' + max_time,
			type: 'GET',
			async: true,
			dataType: 'json',
			success: function(data, textStatus)
			{
				new_data = create_new_data(old_data, data);
				chart_data[chart_id] = new_data;
				ischange[chart_id] = true;
				data_chart[chart_id].series[0].setData(new_data);
				ischange[chart_id] = false;
			},
			
			error: function(data, textStatus)
			{
				console.log("Net Error");	
			}
		});	
	}
	
	//12hrs
	function req_12hrs(chart_id, old_data, max_time, min_time)
	{
		$.ajax({
		    url: api_host + '/user/chart_data_v2?sensor=' + chart_id + '>time=12hrs>begin=' + min_time + '>end=' + max_time,
			type: 'GET',
			async: true,
			dataType: 'json',
			success: function(data, textStatus)
			{
				new_data = create_new_data(old_data, data);
				chart_data[chart_id] = new_data;
				ischange[chart_id] = true;
				data_chart[chart_id].series[0].setData(new_data);
				ischange[chart_id] = false;
			},
			
			error: function(data, textStatus)
			{
				console.log("Net Error");	
			}
		});	
	}
	
	//1day
	function req_1day(chart_id, old_data, max_time, min_time)
	{
		$.ajax({
		    url: api_host + '/user/chart_data_v2?sensor=' + chart_id + '>time=1day>begin=' + min_time + '>end=' + max_time,
			type: 'GET',
			async: true,
			dataType: 'json',
			success: function(data, textStatus)
			{
				new_data = create_new_data(old_data, data);
				chart_data[chart_id] = new_data;
				ischange[chart_id] = true;
				data_chart[chart_id].series[0].setData(new_data);
				ischange[chart_id] = false;
			},
			
			error: function(data, textStatus)
			{
				console.log("Net Error");	
			}
		});	
	}
	
	//3days
	function req_3days(chart_id, old_data, max_time, min_time)
	{
		$.ajax({
		    url: api_host + '/user/chart_data_v2?sensor=' + chart_id + '>time=3days>begin=' + min_time + '>end=' + max_time,
			type: 'GET',
			async: true,
			dataType: 'json',
			success: function(data, textStatus)
			{
				new_data = create_new_data(old_data, data);
				chart_data[chart_id] = new_data;
				ischange[chart_id] = true;
				data_chart[chart_id].series[0].setData(new_data);
				ischange[chart_id] = false;
			},
			
			error: function(data, textStatus)
			{
				console.log("Net Error");	
			}
		});	
	}
	
	//1week
	function req_1week(chart_id, old_data, max_time, min_time)
	{
		$.ajax({
		    url: api_host + '/user/chart_data_v2?sensor=' + chart_id + '>time=1week>begin=' + min_time + '>end=' + max_time,
			type: 'GET',
			async: true,
			dataType: 'json',
			success: function(data, textStatus)
			{
				new_data = create_new_data(old_data, data);
				chart_data[chart_id] = new_data;
				ischange[chart_id] = true;
				data_chart[chart_id].series[0].setData(new_data);
				ischange[chart_id] = false;
			},
			
			error: function(data, textStatus)
			{
				console.log("Net Error");	
			}
		});	
	}
	
	//30days
	function req_30days(chart_id, old_data, max_time, min_time)
	{
		$.ajax({
		    url: api_host + '/user/chart_data_v2?sensor=' + chart_id + '>time=30days>begin=' + min_time + '>end=' + max_time,
			type: 'GET',
			async: true,
			dataType: 'json',
			success: function(data, textStatus)
			{
				new_data = create_new_data(old_data, data);
				chart_data[chart_id] = new_data;
				ischange[chart_id] = true;
				data_chart[chart_id].series[0].setData(new_data);
				ischange[chart_id] = false;
			},
			
			error: function(data, textStatus)
			{
				console.log("Net Error");	
			}
		});	
	}
	
	//3mths
	function req_3mths(chart_id, old_data, max_time, min_time)
	{
		$.ajax({
		    url: api_host + '/user/chart_data_v2?sensor=' + chart_id + '>time=3mths>begin=' + min_time + '>end=' + max_time,
			type: 'GET',
			async: true,
			dataType: 'json',
			success: function(data, textStatus)
			{
				new_data = create_new_data(old_data, data);
				chart_data[chart_id] = new_data;
				ischange[chart_id] = true;
				data_chart[chart_id].series[0].setData(new_data);
				ischange[chart_id] = false;
			},
			
			error: function(data, textStatus)
			{
				console.log("Net Error");	
			}
		});	
	}
	
	//6mths
	function req_6mths(chart_id, old_data, max_time, min_time)
	{
		$.ajax({
		    url: api_host + '/user/chart_data_v2?sensor=' + chart_id + '>time=6mths>begin=' + min_time + '>end=' + max_time,
			type: 'GET',
			async: true,
			dataType: 'json',
			success: function(data, textStatus)
			{
				new_data = create_new_data(old_data, data);
				chart_data[chart_id] = new_data;
				ischange[chart_id] = true;
				data_chart[chart_id].series[0].setData(new_data);
				ischange[chart_id] = false;
			},
			
			error: function(data, textStatus)
			{
				console.log("Net Error");	
			}
		});	
	}
	
	//1year
	function req_1year(chart_id, old_data, max_time, min_time)
	{
		$.ajax({
			url: api_host+'/user/chart_data_v2?sensor=' + chart_id + '>time=1year>begin=' + min_time + '>end=' + max_time,
			type: 'GET',
			async: true,
			dataType: 'json',
			success: function(data, textStatus)
			{
				new_data = create_new_data(old_data, data);
				chart_data[chart_id] = new_data;
				ischange[chart_id] = true;
				data_chart[chart_id].series[0].setData(new_data);
				ischange[chart_id] = false;
			},
			
			error: function(data, textStatus)
			{
				console.log("Net Error");	
			}
		});	
	}