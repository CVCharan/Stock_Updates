

function timedCount()
{
   	var xhr = new XMLHttpRequest();
    
	xhr.open('GET', "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D%27http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes.csv%3Fs%3DHCLTECH.NS%2CIGS.NS%2CINFY.NS%2CTCS.NS%2CTECHM.NS%26f%3Dsl1d1t1c1ohgv%26e%3D.csv%27%20and%20columns%3D%27symbol%2Cprice%2Cdate%2Ctime%2Cchange%2Ccol1%2Chigh%2Clow%2Ccol2%27&format=json&diagnostics=true&callback=", false);
   	xhr.send();
	//var res=xhr.response;
	
	var stockValues= eval("(" + xhr.response + ")"); 
	var i=0;
	var j=0;
	var data = [];
	
	while (i<5) {
		data[j] = parseFloat(stockValues.query.results.row[i].price);
		j++;
		data[j]= parseFloat(stockValues.query.results.row[i].change);
		j++;
		i++; 
	}
	
	

	postMessage(data);
     setTimeout("timedCount()",5000);
}

timedCount();

