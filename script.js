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
	}
});

Highcharts.setOptions({
	colors : [ '#ccedfd', '#e5fcb3', '#fccab3', '#cab3fc', '#fcefb3' ]
});

$(function() {
	$('#chart1').highcharts({
		chart       : {
			type        : 'pie',
			borderColor : 'black',
			borderWidth : 1.5
		},
		title       : {
			text  : 'Health expenditure per capita (2015)',
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
			pointFormat : ' <b>{point.y} $ millions</b>'
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
						name : 'Public',
						y    : 3074
					},
					{
						name : 'Hospital',
						y    : 1338
					},
					{
						name : 'Drug',
						y    : 761
					},
					{
						name : 'Physician',
						y    : 720
					}
				]
			}
		]
	});

	$('#chart2').highcharts({
		chart       : {
			type        : 'pie',
			borderColor : 'black',
			borderWidth : 1.5
		},
		title       : {
			text  : 'Health Services spending (2014/15) ',
			style : {
				fontSize : '15'
			}
		},
		credits     : {
			enabled : false
		},
		legend      : {
			enabled : true
		},
		tooltip     : {
			pointFormat : ' <b>{point.y} $ millions</b>'
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
						name : 'First Nations and Inuit Health',
						y    : 2563
					},
					{
						name : 'Veterans Affairs',
						y    : 1100
					},
					{
						name : 'National Defence',
						y    : 537
					},
					{
						name : 'Correctional Service of Canada',
						y    : 189
					},
					{
						name : 'Citizenship and Immigration',
						y    : 58
					}
				]
			}
		]
	});

	$('#longchart').highcharts({
		chart       : {
			borderColor : 'black',
			borderWidth : 1.5,
			type        : 'areaspline',
			marginRight : 25
		},
		credits     : {
			enabled : false
		},
		title       : {
			text  : 'Cash Health Transfer as a % of PT Government Sector Health Expenditures (Total Canada)',
			style : {
				fontSize : '15'
			}
		},
		plotOptions : {
			areaspline : {
				fillColor : {
					linearGradient : {
						x1 : 0,
						y1 : 0,
						x2 : 0,
						y2 : 1
					},
					stops          : [
						[ 0, Highcharts.getOptions().colors[0] ],
						[ 1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba') ]
					]
				},
				marker    : {
					enabled : false
				},
				lineWidth : 1,
				states    : {
					hover : {
						lineWidth : 1
					}
				},
				threshold : null
			}
		},
		xAxis       : {
			labels     : {
				step : 5
			},
			categories : [
				'1974-75',
				'1975-76',
				'1976-77',
				'1977-78',
				'1978-79',
				'1979-80',
				'1980-81',
				'1981-82',
				'1982-83',
				'1983-84',
				'1984-85',
				'1985-86',
				'1986-87',
				'1987-88',
				'1988-89',
				'1989-90',
				'1990-91',
				'1991-92',
				'1992-93',
				'1993-94',
				'1994-95',
				'1995-96',
				'1996-97',
				'1997-98',
				'1998-99',
				'1999-00',
				'2000-01',
				'2001-02',
				'2002-03',
				'2003-04',
				'2004-05',
				'2005-06',
				'2006-07',
				'2007-08',
				'2008-09',
				'2009-10',
				'2010-11',
				'2011-12',
				'2012-13',
				'2013-14',
				'2014-15'
			]
		},
		yAxis       : {
			title     : {
				text : 'Percentage %'
			},
			plotLines : [
				{
					value : 0,
					width : 1,
					color : '#808080'
				}
			]
		},
		tooltip     : {
			valueSuffix : ' %',
			pointFormat : ' <b>{point.y} </b>'
		},
		legend      : {
			enabled : false
		},
		series      : [
			{
				name : '',
				data : [
					35.3,
					34.7,
					35.6,
					24.9,
					25.7,
					26.1,
					24.6,
					23.2,
					22.1,
					23.4,
					23.7,
					23.4,
					22.5,
					21.2,
					19.9,
					18.7,
					17.5,
					16.7,
					16.8,
					16.9,
					16.5,
					16.2,
					18.4,
					15,
					14,
					15.1,
					14.8,
					16.3,
					15.9,
					17.2,
					19.6,
					22.1,
					20.5,
					20.6,
					20,
					20.3,
					20.1,
					20.5,
					21.1,
					21.8,
					22.7
				]
			}
		]
	});
});
