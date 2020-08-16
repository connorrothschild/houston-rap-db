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
					type            : 'pie',
					backgroundColor : 'white'
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
					type            : 'scatter',
					zoomType        : 'xy',
					backgroundColor : 'white'
				},
				title       : {
					text : 'Actual vs Equitable Pledge Amounts'
				},
				subtitle    : {
					text : 'Tract level'
				},
				credits     : {
					enabled : false
				},
				tooltip     : {
					formatter : function() {
						return (
							'<span style="font-size:16px">Census Tract ' +
							this.point.tract +
							'</span><table><tr><td style="text-align:left;font-size:12px">' +
							'</b>Actual pledged amount:' +
							'<br>Equitable pledged amount: </td>' +
							'<td style="text-align:right;font-size:12px">' +
							dollarFormat(this.x) +
							'<br>' +
							dollarFormat(this.y) +
							'</td></tr></table>'
						);
					},
					useHTML   : true,
					shared    : true
				},

				// tooltip : {
				// 	// useHTML   : true,
				// 	formatter: function() {
				// 		return '<b>Census Tract ' + this.tract + '</b><br>Actual pledged amount: ' + this.x + '<br>Equitable pledged amount: ' + this.y + '</b>';
				// 	}
				// },
				xAxis       : {
					title         : {
						enabled : true,
						text    : 'Actual pledged amount ($)'
					},
					startOnTick   : true,
					endOnTick     : true,
					showLastLabel : true
				},
				yAxis       : {
					title : {
						text : 'Equitable pledge amount ($)'
					}
				},
				legend      : {
					enabled : true
				},
				plotOptions : {
					scatter : {
						marker : {
							radius : 5,
							symbol : 'circle',
							states : {
								hover : {
									enabled   : true,
									lineColor : 'rgb(100,100,100)'
								}
							}
						},
						states : {
							hover : {
								marker : {
									enabled : false
								}
							}
						}
					}
				},
				series      : [
					{
						name  : 'Other tracts',
						color : 'rgba(223, 83, 83, .5)',
						keys  : [ 'tract', 'x', 'y' ],
						data  : data
							.filter((d) => d.tract != tractLevelData.tract)
							.map((d) => [ d.tract, d.actual, d.equitable ])
					},
					{
						name   : 'Tract ' + tractLevelData.tract,
						color  : 'black',
						marker : {
							radius : 10
						},
						keys   : [ 'tract', 'x', 'y' ],
						data   : data
							.filter((d) => d.tract == tractLevelData.tract)
							.map((d) => [ d.tract, d.actual, d.equitable ])
					}
				]
			});
		});
	}
});
