//global variables
var w1,w2,nse_index,nse_high,nse_ch,nse_low,nse_low,ftse_index,ftse_ch,ftse_high,ftse_low;
var time = (new Date()).getTime();
var points = [[]];
var series0_point = 0;
var series1_point = 0;



//function to start the web worker
function startWorker()
{
  if (typeof(Worker)!="undefined")
  {
  if(typeof(w1)=="undefined")
  {
  w1=new Worker("./javascripts/chart_worker.js");
  w2=new Worker("./javascripts/IT_worker.js");
  }
  w1.onmessage = function (event) {

  	series0_point=event.data[0];
	series1_point=event.data[4];
	nse_index = event.data[0];
	nse_ch = event.data[1];
	nse_high = event.data[2];
	nse_low = event.data[3];
	ftse_index = event.data[4];
	ftse_ch = event.data[5];
	ftse_high = event.data[6];
	ftse_low = event.data[7];
	
	};

  w2.onmessage = function (event) {
	
	document.getElementById('HCL-price').textContent = event.data[0];
	document.getElementById('HCL-ch').textContent = event.data[1];
	document.getElementById('iGate-price').textContent = event.data[2];
	document.getElementById('iGate-ch').textContent = event.data[3];
	document.getElementById('Infosys-price').textContent = event.data[4];
	document.getElementById('Infosys-ch').textContent = event.data[5];
	document.getElementById('TCS-price').textContent = event.data[6];
	document.getElementById('TCS-ch').textContent = event.data[7];
	document.getElementById('TechMahindra-price').textContent = event.data[8];
	document.getElementById('TechMahindra-ch').textContent = event.data[9];

};
  }
else
  {
	$("#container").html("Sorry, your browser does not support Web Workers...");
  }
}



// highcharts theme

Highcharts.setOptions({
		global: {
			useUTC: false
		}
	});

Highcharts.theme = {
   colors: ["#DDDF0D", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
   chart: {
      backgroundColor: {
         linearGradient: [0, 0, 250, 500],
         stops: [
            [0, 'rgb(48, 96, 48)'],
            [1, 'rgb(0, 0, 0)']
         ]
      },
      borderColor: '#000000',
      borderWidth: 2,
      className: 'dark-container',
      plotBackgroundColor: 'rgba(255, 255, 255, .1)',
      plotBorderColor: '#CCCCCC',
      plotBorderWidth: 1
   },
   title: {
      style: {
         color: '#C0C0C0',
         font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
      }
   },
   subtitle: {
      style: {
         color: '#666666',
         font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
      }
   },
   xAxis: {
      gridLineColor: '#333333',
      gridLineWidth: 1,
      labels: {
         style: {
            color: '#A0A0A0'
         }
      },
      lineColor: '#A0A0A0',
      tickColor: '#A0A0A0',
      title: {
         style: {
            color: '#CCC',
            fontWeight: 'bold',
            fontSize: '12px',
            fontFamily: 'Trebuchet MS, Verdana, sans-serif'

         }
      }
   },
   yAxis: {
      gridLineColor: '#333333',
      labels: {
         style: {
            color: '#A0A0A0'
         }
      },
      lineColor: '#A0A0A0',
      minorTickInterval: null,
      tickColor: '#A0A0A0',
      tickWidth: 1,
      title: {
         style: {
            color: '#CCC',
            fontWeight: 'bold',
            fontSize: '12px',
            fontFamily: 'Trebuchet MS, Verdana, sans-serif'
         }
      }
   },
   tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      style: {
         color: '#F0F0F0'
      }
   },
   toolbar: {
      itemStyle: {
         color: 'silver'
      }
   },
   plotOptions: {
      line: {
         dataLabels: {
            color: '#CCC'
         },
         marker: {
            lineColor: '#333'
         }
      },
      spline: {
         marker: {
            lineColor: '#333'
         }
      },
      scatter: {
         marker: {
            lineColor: '#333'
         }
      },
      candlestick: {
         lineColor: 'white'
      }
   },
   legend: {
      itemStyle: {
         font: '9pt Trebuchet MS, Verdana, sans-serif',
         color: '#A0A0A0'
      },
      itemHoverStyle: {
         color: '#FFF'
      },
      itemHiddenStyle: {
         color: '#444'
      }
   },
   credits: {
      style: {
         color: '#666'
      }
   },
   labels: {
      style: {
         color: '#CCC'
      }
   },

   navigation: {
      buttonOptions: {
         backgroundColor: {
            linearGradient: [0, 0, 0, 20],
            stops: [
               [0.4, '#606060'],
               [0.6, '#333333']
            ]
         },
         borderColor: '#000000',
         symbolStroke: '#C0C0C0',
         hoverSymbolStroke: '#FFFFFF'
      }
   },

   exporting: {
      buttons: {
         exportButton: {
            symbolFill: '#55BE3B'
         },
         printButton: {
            symbolFill: '#7797BE'
         }
      }
   },

   // scroll charts
   rangeSelector: {
      buttonTheme: {
         fill: {
            linearGradient: [0, 0, 0, 20],
            stops: [
               [0.4, '#888'],
               [0.6, '#555']
            ]
         },
         stroke: '#000000',
         style: {
            color: '#CCC',
            fontWeight: 'bold'
         },
         states: {
            hover: {
               fill: {
                  linearGradient: [0, 0, 0, 20],
                  stops: [
                     [0.4, '#BBB'],
                     [0.6, '#888']
                  ]
               },
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            },
            select: {
               fill: {
                  linearGradient: [0, 0, 0, 20],
                  stops: [
                     [0.1, '#000'],
                     [0.3, '#333']
                  ]
               },
               stroke: '#000000',
               style: {
                  color: 'yellow'
               }
            }
         }
      },
      inputStyle: {
         backgroundColor: '#333',
         color: 'silver'
      },
      labelStyle: {
         color: 'silver'
      }
   },

   navigator: {
      handles: {
         backgroundColor: '#666',
         borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(16, 16, 16, 0.5)',
      series: {
         color: '#7798BF',
         lineColor: '#A6C7ED'
      }
   },

   scrollbar: {
      barBackgroundColor: {
            linearGradient: [0, 0, 0, 20],
            stops: [
               [0.4, '#888'],
               [0.6, '#555']
            ]
         },
      barBorderColor: '#CCC',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: {
            linearGradient: [0, 0, 0, 20],
            stops: [
               [0.4, '#888'],
               [0.6, '#555']
            ]
         },
      buttonBorderColor: '#CCC',
      rifleColor: '#FFF',
      trackBackgroundColor: {
         linearGradient: [0, 0, 0, 10],
         stops: [
            [0, '#000'],
            [1, '#333']
         ]
      },
      trackBorderColor: '#666'
   },

   // special colors for some of the
   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
   legendBackgroundColorSolid: 'rgb(35, 35, 70)',
   dataLabelsColor: '#444',
   textColor: '#C0C0C0',
   maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
var highchartsOptions = Highcharts.setOptions(Highcharts.theme);





//function to get the initail point on the plots
$(document).ready(function(){
var xhr = new XMLHttpRequest();
    
	xhr.open('GET', "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D%27http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes.csv%3Fs%3D%255ENSEI%2c%255EFTSE%26f%3Dsl1d1t1c1ohgv%26e%3D.csv%27%20and%20columns%3D%27symbol%2Clast%2Cdate%2Ctime%2Cchange%2Ccol1%2Chigh%2Clow%2Ccol2%27&format=json&diagnostics=true&callback=", false);
   	xhr.send();
	
	var stockValues= eval("(" + xhr.response + ")");
	var p1 = parseFloat(stockValues.query.results.row[0].last);
	var p2 = parseFloat(stockValues.query.results.row[1].last);
	points1 = [[time-18000,p1],[time-16000,p1],[time-14000,p1],[time-12000,p1],[time-10000,p1],[time-8000,p1],[time-6000,p1],[time-4000,p1],[time-2000,p1],[time,p1]];
	points2 = [[time-18000,p2],[time-16000,p2],[time-14000,p2],[time-12000,p2],[time-10000,p2],[time-8000,p2],[time-6000,p2],[time-4000,p2],[time-2000,p2],[time,p2]];
	series0_point = p1;
	series1_point = p2;
	draw_chart();
	startWorker();
	
});






//function to draw chart
function draw_chart(){
var chart1 = new Highcharts.Chart({
	 chart: {
			renderTo: 'nse_container',
			type: 'spline',
			marginRight: 10,
			events: {
				load: function() {

					// set up the updating of the chart each second
					var series0 = this.series[0];

					setInterval(function() {
						$('#NSE-last').html(nse_index);
						$('#NSE-ch').html(nse_ch);
						$('#NSE-high').html(nse_high);
						$('#NSE-low').html(nse_low);

						var x = (new Date()).getTime(); // current time

						series0.addPoint([x, series0_point], true, true);	}, 2000);
				}
			}
		},
		title: {
			text: 'NSE Stock Index'
		},
		xAxis: {
			type: 'datetime',
			tickPixelInterval: 150,
			plotBands: [{ // visualize the weekend
                    from: 4.5,
                    to: 6.5,
                    color: 'rgba(68, 170, 213, .2)'
                }]

		},
		yAxis: {
			title: {
				text: 'Stock Value'
			},
			plotLines: [{
				value: 0,
				width: 1,
				color: '#808080'
			}],
			labels: {
                formatter: function() {
                    return this.value;
                }
            }
		},
		tooltip: {
			formatter: function() {
					return '<b>'+ this.series.name +'</b><br/>'+
					Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
					Highcharts.numberFormat(this.y, 2);
			}
		},
		legend: {
			enabled: true
		},
		exporting: {
			enabled: false
		},
		plotOptions: {
                areaspline: {
                    fillOpacity: 0.5
                }
            },
		series: [{
			name: 'NSE',
			data: points1
		}]

  });


var chart2 = new Highcharts.Chart({
	 chart: {
			renderTo: 'ftse_container',
			type: 'spline',
			marginRight: 10,
			events: {
				load: function() {

					// set up the updating of the chart each second
					var series0 = this.series[0];

					setInterval(function() {
						$('#FTSE-last').html(ftse_index);
						$('#FTSE-high').html(ftse_high);
						$('#FTSE-ch').html(ftse_ch);
						$('#FTSE-low').html(ftse_low);

						var x = (new Date()).getTime(); // current time

						series0.addPoint([x, series1_point], true, true);	}, 2000);
				}
			}
		},
		title: {
			text: 'FTSE Stock Index'
		},
		xAxis: {
			type: 'datetime',
			tickPixelInterval: 150

		},
		yAxis: {
			title: {
				text: 'Stock Value'
			},
			plotLines: [{
				value: 0,
				width: 1,
				color: '#808080'
			}],
			labels: {
                formatter: function() {
                    return this.value;
                }
            }
		},
		tooltip: {
			formatter: function() {
					return '<b>'+ this.series.name +'</b><br/>'+
					Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
					Highcharts.numberFormat(this.y, 2);
			}
		},
		legend: {
			enabled: true
		},
		exporting: {
			enabled: false
		},
		plotOptions: {
                areaspline: {
                    fillOpacity: 0.5
                }
            },
		series: [{
			name: 'FTSE',
			data: points2
		}]

  });


}


