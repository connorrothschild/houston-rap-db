Papa.parse('./data/sample.csv', {
	header        : true,
	download      : true,
	dynamicTyping : true,
	complete      : function(results) {
		data = results.data;

		var tractArray = [ ...new Set(data.map((item) => item.tract)) ];
		for (var i = 0; i < tractArray.length; i++) {
			$('#tractDropdownList').append("<option value='" + tractArray[i] + "'></option>");
		}

		Highcharts.setOptions({
			colors : [ '#ccedfd', '#e5fcb3', '#fccab3', '#cab3fc', '#fcefb3' ]
		});
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const tractInputValue = urlParams.get('tract');

		tractLevelData = data.filter((d) => d.tract == tractInputValue)[0];

		$(function() {
			$('#subtitle').text('Census Tract ' + tractLevelData.tract);
			$('.card-text-subtext').text('Census Tract ' + tractLevelData.tract);
			$('#equitable-card .number').text(dollarFormat(tractLevelData.equitable));
			$('#actual-card .number').text(dollarFormat(tractLevelData.actual));
			$('#difference-card .number').text(dollarFormat(tractLevelData.difference));

			$('#chart1').highcharts({
				chart       : {
					type        : 'pie',
					borderColor : 'black',
					borderWidth : 1.5
				},
				title       : {
					text  : 'Arbitrary Pie Chart',
					style : {
						fontSize : '15'
					}
				},
				credits     : {
					enabled : false
				},
				legend      : {
					enabled : false
				},
				tooltip     : {
					pointFormat : ' <b>{point.y}</b>'
				},
				plotOptions : {
					pie : {
						showInLegend : true,
						dataLabels   : {
							enabled   : false,
							distance  : -14,
							color     : 'white',
							style     : {
								fontweight : 'bold',
								fontsize   : 50
							},
							formatter : function() {
								return Highcharts.numberFormat(this.percentage) + '%';
							}
						}
					}
				},
				series      : [
					{
						name      : '',
						innerSize : '60%',
						data      : [
							{
								name : 'Value 1',
								y    : 3074
							},
							{
								name : 'Value 2',
								y    : 1338
							},
							{
								name : 'Value 3',
								y    : 761
							},
							{
								name : 'Value 4',
								y    : 720
							}
						]
					}
				]
			});

			$('#chart2').highcharts({
				chart       : {
					type        : 'scatter',
					zoomType    : 'xy',
					borderColor : 'black',
					borderWidth : 1.5
				},
				title       : {
					text : 'Actual vs Equitable Pledge Amounts'
				},
				subtitle    : {
					text : 'Tract level'
				},
				xAxis       : {
					title         : {
						enabled : true,
						text    : 'Height (cm)'
					},
					startOnTick   : true,
					endOnTick     : true,
					showLastLabel : true
				},
				yAxis       : {
					title : {
						text : 'Weight (kg)'
					}
				},
				legend      : {
					enabled         : false,
					layout          : 'vertical',
					align           : 'left',
					verticalAlign   : 'top',
					x               : 100,
					y               : 70,
					floating        : true,
					backgroundColor : Highcharts.defaultOptions.chart.backgroundColor,
					borderWidth     : 1
				},
				plotOptions : {
					scatter : {
						showInLegend : true,
						dataLabels   : {
							enabled   : false,
							distance  : -14,
							color     : 'black',
							style     : {
								fontweight : 'bold',
								fontsize   : 50
							},
							formatter : function() {
								return Highcharts.numberFormat(this.percentage) + '%';
							}
						},
						marker       : {
							radius : 5,
							states : {
								hover : {
									enabled   : true,
									lineColor : 'rgb(100,100,100)'
								}
							}
						},
						states       : {
							hover : {
								marker : {
									enabled : false
								}
							}
						},
						tooltip      : {
							headerFormat : null,
							pointFormat  :
								'<b>Census Tract {point.name}</b><br>Actual pledged amount: {point.x}<br>Equitable pledged amount: {point.y}'
						}
					}
				},
				series      : [
					{
						// name  : data.map((d) => d.tract),
						color : 'rgba(223, 83, 83, .5)',
						keys  : [ 'name', 'x', 'y' ],
						data  : data.map((d) => [ d.tract, d.actual, d.equitable ])
					}
				]
			});
		});
	}
});
